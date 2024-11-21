import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { ApiImage } from '../api/ApiImage';
import CategoryService from '../service/CategorySevice';

function Category() {
    const [categories, setCategories] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await CategoryService.getList({ limit: 20 });
                setCategories(result.categories);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách danh mục:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa danh mục với ID: ${id}?`)) {
            try {
                const response = await CategoryService.delete(id);
                if (response.status) {
                    setCategories(categories.filter(category => category.id !== id));
                    alert(`Đã xóa danh mục với ID: ${id}`);
                }
            } catch (error) {
                console.error('Lỗi khi xóa danh mục:', error);
                alert('Không thể xóa danh mục. Vui lòng thử lại.');
            }
        }
    };
    const handleEditCategory = (category) => {
        setEditCategoryId(category.id);
        setIsFormVisible(true);
    };

    return (
        <div className="container p-4 mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="mb-4 text-2xl font-bold">Danh Sách Danh Mục</h1>
                <Link
                    to="/category/add"
                    className="flex items-center gap-2 px-4 py-2 mb-4 text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-700"
                >
                    <IoMdAddCircleOutline size={20} />
                    Thêm danh mục
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full overflow-hidden bg-white rounded-lg shadow-md">
                    <thead>
                        <tr className="text-gray-700 bg-gray-200">
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">STT</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">ID</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Tên danh mục</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Hình ảnh</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Slug</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Mô tả</th>
                            <th className="px-4 py-3 text-sm font-medium text-left border-b">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories && categories.length > 0 ? (
                            categories.map((category, index) => (
                                <tr key={category.id} className="transition duration-200 hover:bg-gray-100">
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{index + 1}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{category.id}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{category.name}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">
                                    {category.thumbnail && (
                                            <img
                                            src={`${ApiImage}/images/category/${category.thumbnail}`}
                                            alt={category.name}
                                            className="object-cover w-24 h-24 mr-4 rounded"
                                        />
                                        )}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{category.slug}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">{category.description}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 border-b">
                                        <div className="flex justify-center space-x-4">
                                            <Link
                                                to={`/category/edit/${category.id}`}
                                                className="flex items-center justify-center px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            >
                                                <FaEdit className="mr-1" />
                                                Edit
                                            </Link>
                                            <button
                                                className="flex items-center justify-center px-4 py-2 text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                                                onClick={() => handleDelete(category.id)}
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
                                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">Không có danh mục nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Category;
