import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="p-6 overflow-x-auto">
      {/* Tiêu đề trang */}
      <div className='mb-8 text-4xl font-bold'>
        Menu Page
      </div>

      {/* Nút thêm mới */}
      <div className="px-4 mb-6">
        <Link to="/menuform">
          <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
            Add Menu
          </button>
        </Link>
      </div>

      {/* Bảng quản lý */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className='bg-gray-100 border-b border-gray-300'>
          <tr>
            <th className="px-4 py-2 border-r border-gray-300">ID</th>
            <th className="px-4 py-2 border-r border-gray-300">Name</th>
            <th className="px-4 py-2 border-r border-gray-300">Link</th>
            <th className="px-4 py-2 border-r border-gray-300">Table ID</th>
            <th className="px-4 py-2 border-r border-gray-300">Type</th>
            <th className="px-4 py-2 border-r border-gray-300">Position</th>
            <th className="px-4 py-2 border-r border-gray-300">Parent ID</th>
            <th className="px-4 py-2 border-r border-gray-300">Sort Order</th>
            <th className="px-4 py-2 border-r border-gray-300">Description</th>
            <th className="px-4 py-2 border-r border-gray-300">Created At</th>
            <th className="px-4 py-2 border-r border-gray-300">Created By</th>
            <th className="px-4 py-2 border-r border-gray-300">Updated At</th>
            <th className="px-4 py-2 border-r border-gray-300">Updated By</th>
            <th className="px-4 py-2 border-r border-gray-300">Status</th>
            <th className="px-4 py-2 border-r border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Dữ liệu mẫu */}
          <tr>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">Sample Menu</td>
            <td className="px-4 py-2 border">https://example.com</td>
            <td className="px-4 py-2 border">2</td>
            <td className="px-4 py-2 border">Category</td>
            <td className="px-4 py-2 border">mainmenu</td>
            <td className="px-4 py-2 border">0</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">Sample description</td>
            <td className="px-4 py-2 border">2024-09-18</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">2024-09-18</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">Active</td>
            <td className="px-4 py-2 text-center border">
              <div className="flex justify-center space-x-2">
                <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Edit
                </button>
                <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">2</td>
            <td className="px-4 py-2 border">Sample Menu</td>
            <td className="px-4 py-2 border">https://example.com</td>
            <td className="px-4 py-2 border">2</td>
            <td className="px-4 py-2 border">Category</td>
            <td className="px-4 py-2 border">mainmenu</td>
            <td className="px-4 py-2 border">0</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">Sample description</td>
            <td className="px-4 py-2 border">2024-09-18</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">2024-09-18</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">Active</td>
            <td className="px-4 py-2 text-center border">
              <div className="flex justify-center space-x-2">
                <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Edit
                </button>
                <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">3</td>
            <td className="px-4 py-2 border">Sample Menu</td>
            <td className="px-4 py-2 border">https://example.com</td>
            <td className="px-4 py-2 border">2</td>
            <td className="px-4 py-2 border">Category</td>
            <td className="px-4 py-2 border">mainmenu</td>
            <td className="px-4 py-2 border">0</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">Sample description</td>
            <td className="px-4 py-2 border">2024-09-18</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">2024-09-18</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">Active</td>
            <td className="px-4 py-2 text-center border">
              <div className="flex justify-center space-x-2">
                <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Edit
                </button>
                <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">4</td>
            <td className="px-4 py-2 border">Sample Menu</td>
            <td className="px-4 py-2 border">https://example.com</td>
            <td className="px-4 py-2 border">2</td>
            <td className="px-4 py-2 border">Category</td>
            <td className="px-4 py-2 border">mainmenu</td>
            <td className="px-4 py-2 border">0</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">Sample description</td>
            <td className="px-4 py-2 border">2024-09-18</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">2024-09-18</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">Active</td>
            <td className="px-4 py-2 text-center border">
              <div className="flex justify-center space-x-2">
                <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Edit
                </button>
                <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">5</td>
            <td className="px-4 py-2 border">Sample Menu</td>
            <td className="px-4 py-2 border">https://example.com</td>
            <td className="px-4 py-2 border">2</td>
            <td className="px-4 py-2 border">Category</td>
            <td className="px-4 py-2 border">mainmenu</td>
            <td className="px-4 py-2 border">0</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">Sample description</td>
            <td className="px-4 py-2 border">2024-09-18</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">2024-09-18</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">Active</td>
            <td className="px-4 py-2 text-center border">
              <div className="flex justify-center space-x-2">
                <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Edit
                </button>
                <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">6</td>
            <td className="px-4 py-2 border">Sample Menu</td>
            <td className="px-4 py-2 border">https://example.com</td>
            <td className="px-4 py-2 border">2</td>
            <td className="px-4 py-2 border">Category</td>
            <td className="px-4 py-2 border">mainmenu</td>
            <td className="px-4 py-2 border">0</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">Sample description</td>
            <td className="px-4 py-2 border">2024-09-18</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">2024-09-18</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">Active</td>
            <td className="px-4 py-2 text-center border">
              <div className="flex justify-center space-x-2">
                <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Edit
                </button>
                <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">7</td>
            <td className="px-4 py-2 border">Sample Menu</td>
            <td className="px-4 py-2 border">https://example.com</td>
            <td className="px-4 py-2 border">2</td>
            <td className="px-4 py-2 border">Category</td>
            <td className="px-4 py-2 border">mainmenu</td>
            <td className="px-4 py-2 border">0</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">Sample description</td>
            <td className="px-4 py-2 border">2024-09-18</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">2024-09-18</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">Active</td>
            <td className="px-4 py-2 text-center border">
              <div className="flex justify-center space-x-2">
                <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Edit
                </button>
                <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Menu;
