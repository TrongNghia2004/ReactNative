import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BannerService from '../service/BannerSevice';

function AddBanner() {
    const [banner, setBanner] = useState({
        name: '',       // Thêm trường name
        link: '',       // Thêm trường link
        description: '', // Thêm trường description
        image: null,
        position: '',
        sort_order: '',  // Thêm trường sort_order
        status: '',      // Có thể là 'active' hoặc 'inactive'
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBanner({
            ...banner,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setBanner({
            ...banner,
            image: e.target.files[0], // Đổi từ thumbnail sang image
        });
    };

    const handleAddBanner = async (e) => {
        e.preventDefault();

        const formData = new FormData(); // Tạo form data để gửi kèm hình ảnh
        formData.append('name', banner.name);  // Gửi trường name
        formData.append('link', banner.link);  // Gửi trường link
        formData.append('description', banner.description);  // Gửi trường description
        formData.append('image', banner.image); // Gửi hình ảnh với tên image
        formData.append('position', banner.position);
        formData.append('sort_order', banner.sort_order);  // Gửi trường sort_order
        formData.append('status', banner.status);

        try {
            await BannerService.add(formData); // Gọi API thêm banner
            navigate('/banner'); // Điều hướng về trang danh sách banner sau khi thêm thành công
        } catch (error) {
            setError('Có lỗi xảy ra khi thêm banner');
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl p-6 mx-auto mt-10 bg-gray-100 rounded-lg shadow-md">
            <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">Thêm Banner</h2>
            {error && <p className="mb-4 text-center text-red-500">{error}</p>}
            <form onSubmit={handleAddBanner} className="space-y-4">

                <div className="form-group">
                    <label className="block mb-1 text-gray-600">Tên banner:</label>
                    <input
                        type="text"
                        name="name"
                        value={banner.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block mb-1 text-gray-600">Link:</label>
                    <input
                        type="text"
                        name="link"
                        value={banner.link}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block mb-1 text-gray-600">Mô tả:</label>
                    <textarea
                        name="description"
                        value={banner.description}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block mb-1 text-gray-600">Hình ảnh:</label>
                    <input
                        type="file"
                        name="image" // Sử dụng tên image
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block mb-1 text-gray-600">Vị trí:</label>
                    <input
                        type="text"
                        name="position"
                        value={banner.position}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block mb-1 text-gray-600">Thứ tự:</label>
                    <input
                        type="number"
                        name="sort_order"
                        value={banner.sort_order}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block mb-1 text-gray-600">Trạng thái:</label>
                    <select
                        name="status"
                        value={banner.status}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Chọn trạng thái</option>
                        <option value="1">Hoạt động</option>
                        <option value="0">Không hoạt động</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Thêm Banner
                </button>
            </form>
        </div>
    );
}

export default AddBanner;