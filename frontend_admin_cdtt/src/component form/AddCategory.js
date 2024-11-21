import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryService from '../service/CategorySevice';

function AddCategory() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [slug, setSlug] = useState('');
    const [thumbnail, setThumbnail] = useState(null); // Thêm state cho thumbnail
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('slug', slug);
            if (thumbnail) {
                formData.append('thumbnail', thumbnail); // Thêm ảnh vào formData
            }

            const response = await CategoryService.add(formData); // Sử dụng formData thay vì object
            if (response.status) {
                alert('Thêm danh mục thành công');
                navigate('/category');
            } else {
                alert('Thêm danh mục thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi thêm danh mục:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    return (
        <div className="container p-6 mx-auto">
            <h1 className="mb-4 text-2xl font-bold">Thêm danh mục mới</h1>
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tên danh mục</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Slug</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full p-2 border border-gray-300 rounded"
                        onChange={(e) => setThumbnail(e.target.files[0])} // Lưu tệp ảnh vào state
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                        Thêm danh mục
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddCategory;
