import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConfigService from '../service/ConfigService';

const EditConfig = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        site_name: '',
        email: '',
        address: '',
        hotline: '',
        phone: '',
        author: '',
        status: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [config, setConfig] = useState([]); // Khởi tạo config với một mảng rỗng

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                setLoading(true);
                const response = await ConfigService.getId(id);
                if (response.data) {
                    setFormData({
                        id: response.data.id,
                        site_name: response.data.site_name || '',
                        email: response.data.email || '',
                        address: response.data.address || '',
                        hotline: response.data.hotline || '',
                        phone: response.data.phone || '',
                        author: response.data.author || '',
                        status: response.data.status || 0,
                    });
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin cấu hình:", error);
                setError("Không thể tải thông tin cấu hình. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchConfig();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Gọi API để cập nhật thông tin cấu hình
            await ConfigService.update(formData.id, formData); // Gọi đúng hàm update
            
            // Cập nhật danh sách cấu hình
            setConfig(config.map(c => (c.id === formData.id ? formData : c))); 
            
            // Hiển thị thông báo thành công
            alert('Cập nhật cấu hình thành công!');
    
        } catch (error) {
            console.error("Có lỗi xảy ra khi cập nhật dữ liệu:", error);
            
            // Hiển thị thông báo lỗi
            alert('Có lỗi xảy ra khi cập nhật dữ liệu. Vui lòng thử lại sau.');
        }
    };
    

    if (loading) {
        return <div className="py-4 text-center">Đang tải thông tin...</div>;
    }

    if (error) {
        return <div className="py-4 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="container px-4 py-6 mx-auto">
            <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-bold text-center">Chỉnh Sửa Cấu Hình</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Tên</label>
                        <input
                            type="text"
                            value={formData.site_name}
                            onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Địa Chỉ</label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Hotline</label>
                        <input
                            type="text"
                            value={formData.hotline}
                            onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Số Điện Thoại</label>
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Tác Giả</label>
                        <input
                            type="text"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Trạng Thái</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: parseInt(e.target.value) })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        >
                            <option value={0}>Không Hoạt Động</option>
                            <option value={1}>Hoạt Động</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            Cập Nhật
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/config')}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditConfig;
