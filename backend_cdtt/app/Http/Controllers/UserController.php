<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Carbon\Carbon;

class UserController extends Controller
{
    public function register(Request $request) {
        $validator = Validator::make($request->json()->all(), [
            'name' => 'required|string|max:1000',
            'email' => 'required|string|email|max:100|unique:user',
            'phone' => 'nullable|string|max:13',
            'address' => 'nullable|string|max:1000',
            'gender' => 'nullable|string|max:10',
            'username' => 'required|string|max:255|unique:user',
            'password' => 'required|string|min:6|confirmed',
            'roles' => 'nullable|in:customer,admin',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'name' => $request->json()->get('name'),
            'email' => $request->json()->get('email'),
            'phone' => $request->json()->get('phone'),
            'address' => $request->json()->get('address'),
            'gender' => $request->json()->get('gender'),
            'thumbnail' => $request->json()->get('thumbnail'),
            'roles' => $request->json()->get('roles', 'customer'),
            'username' => $request->json()->get('username'),
            'password' => Hash::make($request->json()->get('password')),
            'status' => 1,
            'created_at' => Carbon::now(),
            'created_by' => 1,
        ]);

        // Generate JWT token
        $token = JWTAuth::fromUser($user);

        // Fix: Return 'user' instead of 'users'
        return response()->json(compact('user', 'token'), 201);
    }


    // // Đăng nhập user


    public function login(Request $request) {
        // Lấy thông tin đăng nhập
        $credentials = $request->only('email', 'password');


        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = JWTAuth::user();


        if ($user->roles ==='admin' ) {

            $roles = 'admin';
        } else {

            $roles = 'user';
        }


        return response()->json([
            'token' => $token,
            'user' => $user,
            'role' => $roles,
        ], 200);
    }


    // Lấy thông tin user đang đăng nhập
    public function getAuthenticatedUser() {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }

        return response()->json(compact('user'));
    }

    public function index()
    {
        $users = User::where('status','!=',0)
            ->select("id","name","email","phone","address","gender","created_at","status")
            ->get();
            if($users->isEmpty()) {
                $result = [
                    'status' => false,
                    'message' => 'Không tìm thấy dữ liệu',
                    'users' => null
                ];
            }
            else {
                $result =[
                    'status'=>true,
                    'message'=>'Tải dữ liệu thành công',
                    'users'=>$users
                ];
            }
        return response()->json($result);
    }
    public function show($id)
    {
        // Tìm người dùng theo ID
        $user = User::find($id);

        // Kiểm tra xem người dùng có tồn tại hay không
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Trả về thông tin người dùng, including 'username' and 'roles'
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'address' => $user->address,
            'gender' => $user->gender,
            'username' => $user->username,  // Add username here
            'roles' => $user->roles,        // Add roles here
        ]);
    }


    public function getUserProfile()
{
    $user = auth()->user();

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    return response()->json($user);

}

public function update(Request $request, $id)
{
    // Find user by ID
    $user = User::find($id);

    // Check if user exists
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    // Validate request data
    $validator = Validator::make($request->json()->all(), [
        'name' => 'sometimes|string|max:1000',
        'email' => 'sometimes|string|email|max:100|unique:user,email,'.$id,
        'phone' => 'sometimes|string|max:13',
        'address' => 'sometimes|string|max:1000',
        'gender' => 'sometimes|string|max:10',
        'username' => 'sometimes|string|max:255|unique:user,username,'.$id,
        'roles' => 'sometimes|in:customer,admin',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 400);
    }

    // Update user details, including 'username' and 'roles'
    $user->update($request->only('name', 'email', 'phone', 'address', 'gender', 'username', 'roles'));

    return response()->json(['message' => 'User updated successfully', 'user' => $user]);
}


public function destroy($id)
{
    // Tìm người dùng theo ID
    $user = User::find($id);

    // Kiểm tra xem người dùng có tồn tại không
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    // Xóa người dùng vĩnh viễn khỏi cơ sở dữ liệu
    $user->delete();

    return response()->json(['message' => 'User deleted successfully']);
}
public function login_admin(Request $request) {
    $credentials = $request->only('username', 'password');

    try {
        // Attempt to authenticate the user
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 400);
        }

        // Get authenticated user
        $user = auth()->user();

        // Check if the user has 'admin' role
        if ($user->roles !== 'admin') {
            return response()->json(['error' => 'Unauthorized, admin access required'], 403);
        }

        // Set the user's status to 2 (for admin)
        $user->status = 2;
        $user->save(); // Save the updated status to the database

        // Return the token and user info including the status
        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'roles' => $user->roles,
                'status' => $user->status, // Include the status in the response
            ]
        ]);
    } catch (JWTException $e) {
        return response()->json(['error' => 'Could not create token'], 500);
    }
}
public function changePassword(Request $request, $id)
{
    // Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu không
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'Người dùng không tồn tại'], 404);
    }

    // Validate dữ liệu yêu cầu
    $validator = Validator::make($request->all(), [
        'current_password' => 'required|string',
        'new_password' => 'required|string|min:8|confirmed',
    ]);

    // Kiểm tra lỗi xác thực
    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 400);
    }

    // Kiểm tra mật khẩu hiện tại có chính xác không
    if (!Hash::check($request->current_password, $user->password)) {
        return response()->json(['message' => 'Mật khẩu hiện tại không chính xác'], 400);
    }

    // Cập nhật mật khẩu mới
    $user->password = Hash::make($request->new_password);
    $user->save();

    return response()->json(['message' => 'Đổi mật khẩu thành công'], 200);
}

public function updatePassword(Request $request, $id)
{
    // Xác thực các trường cần thiết
    $request->validate([
        'password' => 'required|string|min:1'
    ]);

    // Tìm user theo ID
    $user = User::find($id);

    if ($user) {
        // Cập nhật mật khẩu mới (mã hóa trước khi lưu)
        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật mật khẩu thành công',
            'user_id' => $user->id
        ]);
    } else {
        return response()->json([
            'status' => false,
            'message' => 'Không tìm thấy người dùng với ID này',
        ], 404);
    }
}





}