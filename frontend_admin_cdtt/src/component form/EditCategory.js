import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiImage } from '../api/ApiImage';
import CategoryService from '../service/CategorySevice';

function EditCategory() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [slug, setSlug] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const { id } = useParams(); // Lấy id từ URL
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // Nếu có id, tải thông tin danh mục hiện tại
            const fetchCategory = async () => {
                try {
                    const response = await CategoryService.getId(id);
                    const category = response.category;
                    console.log(category); // Kiểm tra dữ liệu trả về từ API
                    setName(category.name);
                    setDescription(category.description);
                    setSlug(category.slug);
                    setThumbnail(category.thumbnail);
                } catch (error) {
                    console.error('Lỗi khi tải danh mục:', error);
                }
            };

            fetchCategory();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('slug', slug);
            if (thumbnail instanceof File) {
                formData.append('thumbnail', thumbnail);
            }

            const response = await CategoryService.update(id, formData);
            if (response.status) {
                alert('Cập nhật danh mục thành công');
                navigate('/category');
            } else {
                alert('Cập nhật danh mục thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật danh mục:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    return (
        <div className="max-w-lg p-8 mx-auto bg-white rounded-lg shadow-lg">
            <h1 className="mb-6 text-2xl font-bold text-center text-indigo-600">Chỉnh Sửa Danh Mục</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Tên danh mục</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Mô tả</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Slug</label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Thumbnail</label>
                    <input
                        type="file"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {/* Hiển thị ảnh thumbnail nếu đã có */}
                   
                </div>
                <button type="submit" className="flex items-center justify-center w-full px-4 py-2 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700">
                    Cập nhật
                </button>
            </form>
        </div>
    );
}

export default EditCategory;
