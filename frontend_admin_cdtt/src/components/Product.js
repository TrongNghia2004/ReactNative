import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import ProductService from '../service/ProductService';

function Product() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await ProductService.getList({ limit: 20 });
                console.log(result);
                setProducts(result.products);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa danh mục với ID: ${id}?`)) {
            try {
                const response = await ProductService.delete(id);
                if (response.status) {
                    setProducts(products.filter(product => product.id !== id));
                    alert(`Đã xóa sản phẩm với ID: ${id}`);
                }
            } catch (error) {
                console.error('Lỗi khi xóa sản phẩm:', error);
                alert('Không thể xóa sản phẩm. Vui lòng thử lại.');
            }
        }
    };
    

    const handleEdit = (id) => {
        alert(`Chỉnh sửa sản phẩm với ID: ${id}`);
    };

    return (
        <div className="container p-4 mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="mb-4 text-2xl font-bold">Danh Sách Sản Phẩm</h1>
                <Link
                    to="/product/add"
                    className="flex items-center gap-2 px-4 py-2 mb-4 text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-700"
                >
                    <IoMdAddCircleOutline size={20} />
                    Thêm sản phẩm
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full overflow-hidden bg-white rounded-lg shadow-md">
                    <thead>
                        <tr className="text-gray-700 bg-gray-200">
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">STT</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">ID</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Tên sản phẩm</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Hình ảnh</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Thương hiệu</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Giá giảm</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Giá nhập</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Giá mua</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Mô tả</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Danh mục</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Số lượng</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Slug</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Nội dung</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={product.id} className="transition duration-200 hover:bg-gray-100">
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{index + 1}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{product.id}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{product.name}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">
                                        {product.thumbnail && (
                                            <img src={product.thumbnail} alt={product.name} className="object-cover w-16 h-16 rounded" />
                                        )}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{product.brand_name}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{product.pricesale}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{product.priceroot}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{product.pricebuy}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{product.description}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{product.category_name}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{product.qty}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{product.slug}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{product.content}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">
                                        <div className="flex justify-center space-x-4">
                                            <Link
                                                to={`/product/edit/${product.id}`}
                                                className="flex items-center justify-center px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                onClick={() => handleEdit(product.id)}
                                            >
                                                <FaEdit className="mr-1" />
                                                Edit
                                            </Link>
                                            <button
                                                className="flex items-center justify-center px-4 py-2 text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                <FaTrash className="mr-1" />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="13" className="px-4 py-4 text-center text-gray-500">Không có sản phẩm nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Product;
