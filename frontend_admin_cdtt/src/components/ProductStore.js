import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';


import { Link } from 'react-router-dom';
import ProductStoreService from '../service/ProductStoreService';


function ProductStore() {
    const [productstore, setProductstore] = useState([]);
    useEffect(() => {

        (async () => {
            const result = await ProductStoreService.getList();
            setProductstore(result);
        })();
    }, []);
    // Hàm xử lý xóa
    const handleDelete = (id) => {
        alert(`Xóa sản phẩm với ID: ${id}`);
        // Logic xóa sản phẩm tại đây
    };

    // Hàm xử lý chỉnh sửa
    const handleEdit = (id) => {
        alert(`Chỉnh sửa sản phẩm với ID: ${id}`);
        // Logic chỉnh sửa sản phẩm tại đây
    };
    console.log(productstore)
    return (
        <div>
            <div className="w-full">
                <table id="example1" className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-sm font-medium text-left text-gray-900 border-b">STT</th>
                            <th className="px-6 py-3 text-sm font-medium text-left text-gray-900 border-b">Id</th>
                            <th className="px-6 py-3 text-sm font-medium text-left text-gray-900 border-b">Tên sản phẩm</th>
                            <th className="px-6 py-3 text-sm font-medium text-left text-gray-900 border-b">Hình ảnh</th>
                            <th className="px-6 py-3 text-sm font-medium text-left text-gray-900 border-b">Giá</th>
                            <th className="px-6 py-3 text-sm font-medium text-left text-gray-900 border-b">Số lượng</th>

                            <th className="px-6 py-3 text-sm font-medium text-left text-gray-900 border-b">Ngày nhập</th>
                            <th className="px-6 py-3 text-sm font-medium text-left text-gray-900 border-b">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productstore && productstore.length > 0 && productstore.map((productstore, index) => (
                            <tr key={productstore.id}>
                                <td className="px-6 py-4 text-sm text-gray-900 border-b">{index + 1}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 border-b">{productstore.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 border-b">{productstore.name}</td>
                                <td className="w-10 h-10 text-sm text-gray-900 border-b">
                                    {productstore.thumbnail && (
                                        <>
                                            <img src={productstore.thumbnail} alt={productstore.name} className="object-cover w-16 h-16" />
                                            {/* Debugging */}

                                        </>
                                    )}
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-900 border-b">{productstore.priceroot}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 border-b">{productstore.qty}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 border-b">{productstore.dateimport}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 border-b">
    <div className="flex justify-center space-x-4">
        <Link
            to={`/productstore/edit/${productstore.id}`}
            className="flex items-center justify-center px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => handleEdit(productstore.id)}
        >
            <FaEdit className="mr-1" />
            Edit
        </Link>
        <button
            className="flex items-center justify-center px-4 py-2 text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={() => handleDelete(productstore.id)}
        >
            <FaTrash className="mr-1" />
            Delete
        </button>
    </div>
</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductStore;
