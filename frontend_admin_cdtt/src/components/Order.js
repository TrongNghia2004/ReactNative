import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import OrderService from '../service/OrderService';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await OrderService.getList();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError("Có lỗi xảy ra khi tải danh sách đơn hàng");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn chuyển đơn hàng này vào thùng rác không?")) {
      try {
        // Cập nhật trạng thái của đơn hàng thành 2
        await OrderService.delete(id, 2);

        // Cập nhật danh sách đơn hàng bằng cách lọc đơn hàng đã xóa
        setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
      } catch (error) {
        alert("Có lỗi xảy ra khi chuyển đơn hàng vào thùng rác");
      }
    }
  };

  if (loading) return <p className="text-center text-gray-500">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container p-6 mx-auto bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Quản lý Đơn hàng</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray-100">
              <th className="px-6 py-3 font-semibold text-left border-b-2 border-gray-200">Order ID</th>
              <th className="px-6 py-3 font-semibold text-left border-b-2 border-gray-200">Tên Người dùng</th>
              <th className="px-6 py-3 font-semibold text-left border-b-2 border-gray-200">SĐT</th>
              <th className="px-6 py-3 font-semibold text-left border-b-2 border-gray-200">Địa chỉ</th>
              <th className="px-6 py-3 font-semibold text-left border-b-2 border-gray-200">Trạng thái</th>
              <th className="px-6 py-3 font-semibold text-left border-b-2 border-gray-200">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map(order => (
              <tr key={order.id} className="transition duration-200 ease-in-out hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{order.id}</td>
                <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{order.name}</td>
                <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{order.phone}</td>
                <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{order.address}</td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${order.status === 1
                        ? 'bg-yellow-200 text-yellow-800'     // Chưa xử lý
                        : order.status === 0
                          ? 'bg-green-200 text-green-800'     // Đã xử lý
                          : order.status === 3
                            ? 'bg-red-200 text-red-800'       // Đơn hàng đã hủy
                            : 'bg-blue-200 text-blue-800'     // Đã giao
                      }`}
                  >
                    {order.status === 1
                      ? "Chưa xử lý"
                      : order.status === 0
                        ? "Đã xử lý"
                        : order.status === 3
                          ? "Đơn hàng đã hủy"
                          : "Đã giao"}
                  </span>
                </td>
                <td className="flex px-6 py-4 space-x-4 text-gray-800 border-b border-gray-200">
                  <Link
                    to={`/order/${order.id}`}
                    className="flex items-center justify-center px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    title="Chỉnh sửa"
                  >
                    <FaEdit size={18} />
                    Edit
                  </Link>

                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteOrder(order.id); }}
                    className="flex items-center justify-center px-4 py-2 text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    title="Xóa"
                  >
                    <FaTrash size={18} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="px-4 py-2 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="font-semibold text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Order;
