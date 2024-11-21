import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoMdAddCircleOutline } from 'react-icons/io';
import BrandService from '../service/BrandService';
import { ApiImage } from '../api/ApiImage';

const Brand = () => {
    const [brands, setBrands] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const result = await BrandService.getList();
                setBrands(result.brands);
            } catch (err) {
                console.error("Error fetching brands:", err);
                setError(err);
            }
        };

        fetchBrands();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa thương hiệu với ID: ${id}?`)) {
            try {
                await BrandService.delete(id);
                setBrands(brands.filter((brand) => brand.id !== id));
                alert('Xóa thương hiệu thành công! Đã chuyển vào thùng rác.');
            } catch (error) {
                console.error('Lỗi khi xóa thương hiệu:', error);
                alert('Có lỗi xảy ra khi xóa thương hiệu.');
            }
        }
    };

    return (
        <div className="container p-6 mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Quản lý Thương hiệu</h1>
                <Link
                    to="/brand/add"
                    className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition duration-200"
                >
                    <IoMdAddCircleOutline className="mr-2" />
                    Thêm Thương hiệu
                </Link>
            </div>
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full table-auto leading-normal">
                    <thead>
                        <tr className="text-sm text-gray-700 uppercase bg-gray-100">
                            <th className="px-6 py-4 font-medium text-left border-b border-gray-200">STT</th>
                            <th className="px-6 py-4 font-medium text-left border-b border-gray-200">Id</th>
                            <th className="px-6 py-4 font-medium text-left border-b border-gray-200">Tên</th>
                            <th className="px-6 py-4 font-medium text-left border-b border-gray-200">Hình ảnh</th>
                            <th className="px-6 py-4 font-medium text-center border-b border-gray-200">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.length > 0 ? (
                            brands.map((brand, index) => (
                                <tr key={brand.id} className="transition duration-200 ease-in-out hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-center text-gray-900 border-b border-gray-200">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-200">{brand.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-200">{brand.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-200">
                                        {brand.thumbnail && (
                                            <img src={`${ApiImage}/images/brand/${brand.thumbnail}`} alt={brand.name} className="object-cover w-16 h-16 rounded-md shadow" />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-200">
                                        <div className="flex justify-center items-center space-x-4">
                                            <Link
                                                to={`/brand/edit/${brand.id}`}
                                                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                                                aria-label={`Edit ${brand.name}`}
                                            >
                                                <FaEdit size={18} />
                                                <span className="ml-2">Sửa</span>
                                            </Link>
                                            <button
                                                className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                                                onClick={() => handleDelete(brand.id)}
                                                aria-label={`Delete ${brand.name}`}
                                            >
                                                <FaTrash size={18} />
                                                <span className="ml-2">Xóa</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-sm text-center text-gray-500 border-b border-gray-200">
                                    Không có thương hiệu nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {error && <p className="mt-4 text-red-500 text-center">{error.message}</p>}
        </div>
    );
};

export default Brand;
