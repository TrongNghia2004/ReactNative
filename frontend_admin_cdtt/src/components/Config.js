import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ConfigService from '../service/ConfigService';

const Config = () => {
  const [configs, setConfigs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await ConfigService.getList();
        console.log("Kết quả từ API:", result);

        if (Array.isArray(result)) {
          setConfigs(result);
        } else {
          console.error("Kết quả không phải là một mảng hoặc không có cấu hình:", result);
          setConfigs([]);
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu:", error);
        setConfigs([]);
      }
    })();
  }, []);

  return (
    <div className="container p-6 mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 flex items-center justify-between mb-6">Quản Lý Cấu Hình</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto leading-normal">
          <thead>
            <tr className="text-sm text-gray-700 uppercase bg-gray-100">
              <th className="px-6 py-4 font-medium text-left border-b border-gray-200">STT</th>
              <th className="px-6 py-4 font-medium text-left border-b border-gray-200">ID</th>
              <th className="px-6 py-4 font-medium text-left border-b border-gray-200">Tên</th>
              <th className="px-6 py-4 font-medium text-left border-b border-gray-200">Email</th>
              <th className="px-6 py-4 font-medium text-left border-b border-gray-200">Địa Chỉ</th>
              <th className="px-6 py-4 font-medium text-left border-b border-gray-200">Hotline</th>
              <th className="px-6 py-4 font-medium text-left border-b border-gray-200">Số Điện Thoại</th>
              <th className="px-6 py-4 font-medium text-left border-b border-gray-200">Tác Giả</th>
              {/* <th className="px-6 py-4 font-medium text-left border-b border-gray-200">Trạng Thái</th> */}
              <th className="px-6 py-4 font-medium text-left border-b border-gray-200">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {configs && configs.length > 0 ? (
              configs.map((config, index) => (
                <tr key={config.id} className="transition duration-200 ease-in-out hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{index + 1}</td>
                  <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{config.id}</td>
                  <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{config.site_name}</td>
                  <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{config.email}</td>
                  <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{config.address}</td>
                  <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{config.hotline}</td>
                  <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{config.phone}</td>
                  <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{config.author}</td>
                  {/* <td className="px-6 py-4 text-gray-800 border-b border-gray-200">{config.status}</td> */}
                  <td className="px-6 py-4 flex justify-center items-center space-x-2">
                    <Link
                      to={`/config/edit/${config.id}`}
                      className="p-2 mt-5 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                      title="Chỉnh sửa"
                    >
                      <FaEdit />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-6 py-4 text-center text-gray-500 border-b">
                  Không có cấu hình nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Config;
