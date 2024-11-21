<?php

namespace App\Http\Controllers;

use App\Models\OrderDetail;
use Illuminate\Http\Request;

class OrderDetailController extends Controller
{
    // Hiển thị chi tiết đơn hàng theo ID đơn hàng
    public function show($id)
{
    // Make sure the column name is correct
    $orderDetails = OrderDetail::where('order_id', $id)->get();

    return response()->json($orderDetails);
}


    // Xóa chi tiết đơn hàng
    public function destroy($id)
    {
        $orderDetail = OrderDetail::findOrFail($id);
        $orderDetail->delete();

        return response()->json(['message' => 'Chi tiết đơn hàng đã được xóa']);
    }
}