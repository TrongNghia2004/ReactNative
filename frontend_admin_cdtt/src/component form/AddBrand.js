import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandService from './../service/BrandService';

function AddBrand() {
    const [brand, setBrand] = useState({
        name: '',
        slug: '',
        description: '',
        thumbnail: null, // Đổi từ image sang thumbnail
        sort_order: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBrand({
            ...brand,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setBrand({
            ...brand,
            thumbnail: e.target.files[0], // Đổi từ image sang thumbnail
        });
    };

    const handleAddBrand = async (e) => {
        e.preventDefault();

        const formData = new FormData(); // Tạo form data để gửi kèm hình ảnh
        formData.append('name', brand.name);
        formData.append('slug', brand.slug);
        formData.append('description', brand.description);
        formData.append('thumbnail', brand.thumbnail); // Gửi hình ảnh với tên thumbnail
        formData.append('sort_order', brand.sort_order);

        try {
            await BrandService.add(formData); // Gọi API thêm brand
            navigate('/brand'); // Điều hướng về trang danh sách thương hiệu sau khi thêm thành công
        } catch (error) {
            setError('Có lỗi xảy ra khi thêm thương hiệu');
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl p-6 mx-auto mt-10 bg-gray-100 rounded-lg shadow-md">
            <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">Thêm Thương Hiệu</h2>
            {error && <p className="mb-4 text-center text-red-500">{error}</p>}
            <form onSubmit={handleAddBrand} className="space-y-4">
                <div className="form-group">
                    <label className="block mb-1 text-gray-600">Tên thương hiệu:</label>
                    <input
                        type="text"
                        name="name"
                        value={brand.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block mb-1 text-gray-600">Slug:</label>
                    <input
                        type="text"
                        name="slug"
                        value={brand.slug}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block mb-1 text-gray-600">Mô tả:</label>
                    <textarea
                        name="description"
                        value={brand.description}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block mb-1 text-gray-600">Hình ảnh:</label>
                    <input
                        type="file"
                        name="thumbnail" // Đổi tên trường từ image thành thumbnail
                        accept="images/brand/*"
                        onChange={handleFileChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                

                <button
                    type="submit"
                    className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Thêm Thương Hiệu
                </button>
            </form>
        </div>
    );
}

export default AddBrand;
