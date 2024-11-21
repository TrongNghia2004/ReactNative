<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function checkout(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:user,id',
            'name' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email',
            'address' => 'required|string',
            'note' => 'nullable|string',
            'cart_items' => 'required|array',
            'cart_items.*.product_id' => 'required|exists:product,id',
            'cart_items.*.qty' => 'required|integer|min:1',
        ]);

        // Bắt đầu giao dịch DB
        DB::beginTransaction();

        try {
            // Lấy tất cả các sản phẩm trong giỏ hàng của người dùng
            $cartItems = Cart::where('user_id', $request->user_id)->get();

            if ($cartItems->isEmpty()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Giỏ hàng trống.'
                ], 404);
            }

            // Tạo đơn hàng mới
            $order = Order::create([
                'user_id' => $request->user_id,
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'address' => $request->address,
                'note' => $request->note,
                'status' => 0,
            ]);

            // Lưu chi tiết đơn hàng
            foreach ($request->cart_items as $item) {
                $product = Product::find($item['product_id']);
                if ($product) {
                    OrderDetail::create([
                        'order_id' => $order->id,
                        'product_id' => $item['product_id'],
                        'qty' => $item['qty'],
                        'price' => $product->pricebuy
                    ]);

                    // Xóa sản phẩm đã thanh toán khỏi giỏ hàng
                    Cart::where('user_id', $request->user_id)
                        ->where('product_id', $item['product_id'])
                        ->delete();
                }
            }

            // Commit giao dịch DB
            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Checkout thành công!',
                'order' => $order
            ], 200);

        } catch (\Exception $e) {
            // Rollback nếu có lỗi xảy ra
            DB::rollback();

            return response()->json([
                'status' => false,
                'message' => 'Có lỗi xảy ra trong quá trình checkout.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}