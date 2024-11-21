import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';


import ProductSaleService from '../service/ProductSaleService';
import { Link } from 'react-router-dom';


function ProductSale() {
    const [productsale, setProductsale] = useState([]);
    useEffect(() => {

        (async () => {
            const result = await ProductSaleService.getList();
            setProductsale(result);
        })();
    }, []);
    const handleDelete = (id) => {
        alert(`Xóa sản phẩm với ID: ${id}`);
    };

    const handleEdit = (id) => {
        alert(`Chỉnh sửa sản phẩm với ID: ${id}`);
    };
    console.log(productsale)
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
                            <th className="px-6 py-3 text-sm font-medium text-left text-gray-900 border-b">Giá Sale</th>
                            <th className="px-6 py-3 text-sm font-medium text-left text-gray-900 border-b">Ngày bắt đầu</th>
                            <th className="px-6 py-3 text-sm font-medium text-left text-gray-900 border-b">Ngày kết thúc</th>
                            <th className="px-6 py-3 text-sm font-medium text-left text-gray-900 border-b">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsale && productsale.length > 0 && productsale.map((productsale, index) => (
                            <tr key={productsale.id}>
                                <td className="px-6 py-4 text-sm text-gray-900 border-b">{index + 1}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 border-b">{productsale.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 border-b">{productsale.name}</td>
                                <td className="w-10 h-10 text-sm text-gray-900 border-b">
                                    {productsale.thumbnail && (
                                        <>
                                            <img src={productsale.thumbnail} alt={productsale.name} className="object-cover w-16 h-16" />
                                            {/* Debugging */}

                                        </>
                                    )}
                                </td>
                               
                                <td className="px-6 py-4 text-sm text-gray-900 border-b">{productsale.pricesale}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 border-b">{productsale.datebegin}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 border-b">{productsale.dateend}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 border-b">
    <div className="flex justify-center space-x-4">
        <Link
            to={`/productsale/edit/${productsale.id}`}
            className="flex items-center justify-center px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => handleEdit(productsale.id)}
        >
            <FaEdit className="mr-1" />
            Edit
        </Link>
        <button
            className="flex items-center justify-center px-4 py-2 text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={() => handleDelete(productsale.id)}
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

export default ProductSale;
