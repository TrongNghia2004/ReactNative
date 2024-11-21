<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductSaleController;
use App\Http\Controllers\ProductStoreController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


// Trang người dùng
// UC1: Cấu hình web
Route::get('config_web', [ConfigController::class, 'config_web']);

// UC2: Menu (menu list, vị trí, cấp, giới hạn)
Route::get('menu_list/{position}/{parentid?}/{limit?}', [MenuController::class, 'menu_list']);

// UC3: Slideshow (slider list, vị trí, giới hạn)
Route::get('slider_list/{position}/{limit?}', [BannerController::class, 'slider_list']);

// UC4: Sản phẩm mới (giới hạn)
Route::get('product_new/{limit}', [ProductController::class, 'product_new']);

// UC5: Sản phẩm khuyến mãi (giới hạn)
Route::get('product_sale/{limit}', [ProductController::class, 'product_sale']);

// UC6: Sản phẩm bán chạy (giới hạn)
Route::get('product_bestseller/{limit}', [ProductController::class, 'product_bestseller']);

// UC7-1: Danh mục (cấp)
Route::get('category_list/{parentid?}', [CategoryController::class, 'category_list']);

// UC7-2: Sản phẩm theo danh mục (mã danh mục, giới hạn)
Route::get('product_category/{categoryid}/{limit}', [ProductController::class, 'product_category']);

// UC8: Bài viết mới nhất (giới hạn)
Route::get('post_new/{limit}', [PostController::class, 'post_new']);

// UC9: Trang đơn (slug)
Route::get('post_page/{slug}', [PostController::class, 'post_page']);

// UC10: Sản phẩm (mã danh mục, giới hạn)
Route::get('product_all/{categoryid}/{limit}', [ProductController::class, 'product_all']);// UC: Đăng nhập và quên mật khẩu
Route::get("admin/login", [UserController::class, "login"]);
Route::get("admin/forget", [UserController::class, "getforget"]);
Route::post("admin/forget", [UserController::class, "postforget"]);

// UC: Cập nhật cấu hình
// Route::get("config", [ConfigController::class, "index"]);
// Route::post("config/update/{id}", [ConfigController::class, "update"]);
Route::prefix("config")->group(function() {
    Route::get("/", [ConfigController::class, "index"]);  // Lấy danh sách cấu hình
    Route::get("/trash", [ConfigController::class, "trash"]);  // Lấy danh sách cấu hình đã bị xóa (soft delete)
    Route::get("/show/{id}", [ConfigController::class, "show"]);  // Hiển thị thông tin cấu hình theo ID
    Route::post("/store", [ConfigController::class, "store"]);  // Tạo mới một cấu hình
    Route::post("/update/{id}", [ConfigController::class, "update"]);  // Cập nhật cấu hình theo ID
    Route::get("/status/{id}", [ConfigController::class, "status"]);  // Thay đổi trạng thái của cấu hình (kích hoạt hoặc vô hiệu hóa)
    Route::get("/delete/{id}", [ConfigController::class, "delete"]);  // Xóa mềm một cấu hình theo ID
    Route::get("/restore/{id}", [ConfigController::class, "restore"]);  // Khôi phục cấu hình đã bị xóa mềm theo ID
    Route::delete("/destroy/{id}", [ConfigController::class, "destroy"]);  // Xóa vĩnh viễn một cấu hình
});



use App\Http\Controllers\ProductImageController;
use ProductImageController as GlobalProductImageController;

// //login
// Route::get("/login",[LoginController::class, "show_login"])->name('login');
// //Admin
// Route::get('/admin',function(){
//     return view();

// })->middleware(('auth'));
// UC: Quản lý banner
Route::prefix("banner")->group(function() {
    Route::get("/", [BannerController::class, "index"]);
    Route::get("/trash", [BannerController::class, "trash"]);
    Route::get("/show/{id}", [BannerController::class, "show"]);
    Route::post("/store", [BannerController::class, "store"]);
    Route::post("/update/{id}", [BannerController::class, "update"]);
    Route::get("/status/{id}", [BannerController::class, "status"]);
    Route::get("/delete/{id}", [BannerController::class, "delete"]);
    Route::get("/restore/{id}", [BannerController::class, "restore"]);
    Route::delete("/destroy/{id}", [BannerController::class, "destroy"]);
});

// UC: Quản lý thương hiệu
Route::prefix("brand")->group(function() {
    Route::get("/", [BrandController::class, "index"]);
    Route::get("/trash", [BrandController::class, "trash"]);
    Route::get("/show/{id}", [BrandController::class, "show"]);
    Route::post("/store", [BrandController::class, "store"]);
    Route::post("/update/{id}", [BrandController::class, "update"]);
    Route::get("/status/{id}", [BrandController::class, "status"]);
    Route::get("/delete/{id}", [BrandController::class, "delete"]);
    Route::get("/restore/{id}", [BrandController::class, "restore"]);
    Route::delete("/destroy/{id}", [BrandController::class, "destroy"]);
});

// UC: Quản lý danh mục
Route::prefix("category")->group(function() {
    Route::get("/", [CategoryController::class, "index"]);
    Route::get("/trash", [CategoryController::class, "trash"]);
    Route::get("/show/{id}", [CategoryController::class, "show"]);
    Route::post("/store", [CategoryController::class, "store"]);
    Route::post("/update/{id}", [CategoryController::class, "update"]);
    Route::get("/status/{id}", [CategoryController::class, "status"]);
    Route::get("/delete/{id}", [CategoryController::class, "delete"]);
    Route::get("/restore/{id}", [CategoryController::class, "restore"]);
    Route::delete("/destroy/{id}", [CategoryController::class, "destroy"]);
});

// UC: Quản lý menu
Route::prefix("menu")->group(function() {
    Route::get("/", [MenuController::class, "index"]);
    Route::get("/trash", [MenuController::class, "trash"]);
    Route::get("/show/{id}", [MenuController::class, "show"]);
    Route::post("/store", [MenuController::class, "store"]);
    Route::post("/update/{id}", [MenuController::class, "update"]);
    Route::get("/status/{id}", [MenuController::class, "status"]);
    Route::get("/delete/{id}", [MenuController::class, "delete"]);
Route::get("/restore/{id}", [MenuController::class, "restore"]);
    Route::delete("/destroy/{id}", [MenuController::class, "destroy"]);
});

// UC: Quản lý liên hệ
Route::prefix("contact")->group(function() {
    Route::get("/", [ContactController::class, "index"]);
    Route::get("/trash", [ContactController::class, "trash"]);
    Route::get("/show/{id}", [ContactController::class, "show"]);
    Route::post("/reply/{id}", [ContactController::class, "reply"]);
    Route::get("/status/{id}", [ContactController::class, "status"]);
    Route::get("/delete/{id}", [ContactController::class, "delete"]);
    Route::get("/restore/{id}", [ContactController::class, "restore"]);
    Route::delete("/destroy/{id}", [ContactController::class, "destroy"]);
});

// UC: Quản lý bài viết
Route::prefix("post")->group(function() {
    Route::get("/", [PostController::class, "index"]);
    Route::get("/trash", [PostController::class, "trash"]);
    Route::get("/show/{id}", [PostController::class, "show"]);
    Route::post("/store", [PostController::class, "store"]);
    Route::post("/update/{id}", [PostController::class, "update"]);
    Route::get("/status/{id}", [PostController::class, "status"]);
    Route::get("/delete/{id}", [PostController::class, "delete"]);
    Route::get("/restore/{id}", [PostController::class, "restore"]);
    Route::delete("/destroy/{id}", [PostController::class, "destroy"]);
    Route::get('/topic/{topicId}', [PostController::class, 'getPostsByTopic']);
});

// UC: Quản lý chủ đề bài viết
Route::prefix("topic")->group(function() {
    Route::get("/", [TopicController::class, "index"]);
    Route::get("/trash", [TopicController::class, "trash"]);
    Route::get("/show/{id}", [TopicController::class, "show"]);
    Route::post("/store", [TopicController::class, "store"]);
    Route::post("/update/{id}", [TopicController::class, "update"]);
    Route::get("/status/{id}", [TopicController::class, "status"]);
    Route::get("/delete/{id}", [TopicController::class, "delete"]);
    Route::get("/restore/{id}", [TopicController::class, "restore"]);
    Route::delete("/destroy/{id}", [TopicController::class, "destroy"]);
});

// UC: Quản lý thành viên
Route::prefix("user")->group(function() {
    Route::controller(UserController::class)->group(function () {
        Route::post("/login", [UserController::class, "login"]);
        Route::post("/register", [UserController::class, "register"]);
    });
    Route::get("/", [UserController::class, "index"]);
    Route::get("/trash", [UserController::class, "trash"]);
    Route::get("/show/{id}", [UserController::class, "show"]);
    Route::delete('/{id}', [UserController::class, 'destroy']);
    // Route::post("/update/{id}", [UserController::class, "update"]);

    Route::put("/update/{id}", [UserController::class, "update"]);
    Route::post("admin/login", [UserController::class, "login"]);
    Route::get("admin/forget", [UserController::class, "getforget"]);
    Route::post("admin/forget", [UserController::class, "postforget"]);
    Route::put('/change-password/{id}', [UserController::class, 'changePassword']);
    Route::get("/status/{id}", [UserController::class, "status"]);
    Route::get("/delete/{id}", [UserController::class, "delete"]);
    Route::get("/restore/{id}", [UserController::class, "restore"]);
    Route::delete("/destroy/{id}", [UserController::class, "destroy"]);
    Route::put('/update-password/{id}', [UserController::class, 'updatePassword']);
    // Routes cho xác thực

    Route::middleware('auth:api')->group(function () {
            Route::get('user/profile', [UserController::class, 'getUserProfile']);
            Route::put('/user/profile/{id}', [UserController::class, 'update']);
        Route::post("/logout", [UserController::class, "logout"]);
    });
});
// UC: Quản lý đơn hàng
Route::prefix('order')->group(function() {
    Route::get('/', [OrderController::class, 'index']); // Danh sách đơn hàng
    Route::get('/show/{id}', [OrderController::class, 'show']); // Hiển thị đơn hàng
    Route::get('/trash', [OrderController::class, 'trash']); // Đơn hàng trong thùng rác
    Route::get('/status/{id}', [OrderController::class, 'status']); // Thay đổi trạng thái đơn hàng
    Route::post('/store', [OrderController::class, 'store']); // Tạo đơn hàng mới
    Route::delete('/destroy/{id}', [OrderController::class, 'destroy']); // Xóa đơn hàng
});


Route::prefix('orderdetail')->group(function() {
    Route::get('/show/{orderId}', [OrderDetailController::class, 'show']); // Hiển thị chi tiết đơn hàng
    Route::delete('/destroy/{id}', [OrderDetailController::class, 'destroy']); // Xóa chi tiết đơn hàng
});

// UC: Quản lý sản phẩm
Route::prefix("product")->group(function() {
    Route::get("/", [ProductController::class, "index"]);
    Route::get("/trash", [ProductController::class, "trash"]);
    Route::get("/show/{id}", [ProductController::class, "show"]);
    Route::post("/store", [ProductController::class, "store"]);
    Route::post("/update/{id}", [ProductController::class, "update"]);
    Route::get("/status/{id}", [ProductController::class, "status"]);
    Route::delete("/delete/{id}", [ProductController::class, "delete"]);
    Route::post("/restore/{id}", [ProductController::class, "restore"]);
    Route::delete("/destroy/{id}", [ProductController::class, "destroy"]);
    Route::get("/indexpro", [ProductController::class, "indexFrontend"]);
    Route::get('product_all/{category_id?}/{brand_id?}/{price_min?}/{price_max?}', [ProductController::class, 'product_all']);
    Route::get("/bestseller/{limit}", [ProductController::class, "product_bestseller"]);
    Route::get('/related/{id}', [ProductController::class, 'getRelatedProducts']);
});

// UC: Quản lý sản phẩm khuyến mãi
Route::prefix("productsale")->group(function() {
    Route::get("/", [ProductSaleController::class, "index"]);
    Route::get("/trash", [ProductSaleController::class, "trash"]);
    Route::get("/show/{id}", [ProductSaleController::class, "show"]);
    Route::post("/store", [ProductSaleController::class, "store"]);
    Route::post("/update/{id}", [ProductSaleController::class, "update"]);
    Route::get("/status/{id}", [ProductSaleController::class, "status"]);
    Route::get("/delete/{id}", [ProductSaleController::class, "delete"]);
    Route::get("/restore/{id}", [ProductSaleController::class, "restore"]);
    Route::delete("/destroy/{id}", [ProductSaleController::class, "destroy"]);
});

// UC: Quản lý nhập kho
Route::prefix("productstore")->group(function() {
    Route::get("/", [ProductStoreController::class, "index"]);
    Route::get("/trash", [ProductStoreController::class, "trash"]);
    Route::get("/show/{id}", [ProductStoreController::class, "show"]);
    Route::post("/store", [ProductStoreController::class, "store"]);
    Route::post("/update/{id}", [ProductStoreController::class, "update"]);
    Route::get("/status/{id}", [ProductStoreController::class, "status"]);
    Route::delete("/delete/{id}", [ProductStoreController::class, "delete"]);
    Route::post("/restore/{id}", [ProductStoreController::class, "restore"]);
    Route::delete("/destroy/{id}", [ProductStoreController::class, "destroy"]);
});


//Cart
// Định tuyến cho giỏ hàng
Route::prefix('cart')->group(function () {
    // Thêm sản phẩm vào giỏ hàng
    Route::post('/', [CartController::class, 'store']);

    // Hiển thị giỏ hàng của một người dùng
    Route::get('/{user_id}', [CartController::class, 'showCart']);

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    Route::put('/{id}', [CartController::class, 'update']);

    // Xóa sản phẩm khỏi giỏ hàng
    Route::delete('/{id}', [CartController::class, 'destroy']);
});

Route::post('user/login/admin', [UserController::class, 'login_admin']);

Route::prefix('checkout')->group(function () {
    Route::post('/store', [CheckoutController::class, 'checkout']);
    });