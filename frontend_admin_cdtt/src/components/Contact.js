import React from 'react';
import { FaEdit, FaTrash, FaReply } from 'react-icons/fa'; // Nhớ cài đặt react-icons nếu chưa có

const Contact = () => {
  return (
    <div className="p-6 overflow-x-auto">
      {/* Tiêu đề trang */}
      <div className="mb-8 text-4xl font-bold text-center">
        Trang Liên Hệ
      </div>

      {/* Bảng quản lý */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="px-4 py-2 border-r border-gray-300">ID</th>
            <th className="px-4 py-2 border-r border-gray-300">ID Người Dùng</th>
            <th className="px-4 py-2 border-r border-gray-300">Tiêu Đề</th>
            <th className="px-4 py-2 border-r border-gray-300">Nội Dung</th>
            <th className="px-4 py-2 border-r border-gray-300">ID Phản Hồi</th>
            <th className="px-4 py-2 border-r border-gray-300">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {/* Dữ liệu mẫu */}
          <tr>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">123</td>
            <td className="px-4 py-2 border">Tiêu Đề 1 </td>
            <td className="px-4 py-2 border">hello</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 text-center border">
              <div className="flex justify-center space-x-2">
                <button className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <FaEdit />
                </button>
                <button className="p-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                  <FaTrash />
                </button>
                <button className="p-2 text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  <FaReply />
                </button>
              </div>
            </td>
          </tr>
          {/* Thêm các hàng khác ở đây */}
          <tr>
            <td className="px-4 py-2 border">2</td>
            <td className="px-4 py-2 border">2</td>
            <td className="px-4 py-2 border">Tiêu Đề 2 </td>
            <td className="px-4 py-2 border">hello</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 text-center border">
              <div className="flex justify-center space-x-2">
                <button className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <FaEdit />
                </button>
                <button className="p-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                  <FaTrash />
                </button>
                <button className="p-2 text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  <FaReply />
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">3</td>
            <td className="px-4 py-2 border">3</td>
            <td className="px-4 py-2 border">Tiêu Đề 3 </td>
            <td className="px-4 py-2 border">hello</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 text-center border">
              <div className="flex justify-center space-x-2">
                <button className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <FaEdit />
                </button>
                <button className="p-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                  <FaTrash />
                </button>
                <button className="p-2 text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  <FaReply />
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">4</td>
            <td className="px-4 py-2 border">4</td>
            <td className="px-4 py-2 border">Tiêu Đề 4 </td>
            <td className="px-4 py-2 border">hello</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 text-center border">
              <div className="flex justify-center space-x-2">
                <button className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <FaEdit />
                </button>
                <button className="p-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                  <FaTrash />
                </button>
                <button className="p-2 text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  <FaReply />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Contact;
