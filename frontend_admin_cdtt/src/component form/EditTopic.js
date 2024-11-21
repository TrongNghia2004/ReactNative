import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";

import TopicService from '../service/TopicService';

export default function EditTopic() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [topic, setTopic] = useState({
        name: '',
        description: '',
        slug: '',
        sort_order: '',
        status: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await TopicService.getId(id);
                const dataUser = response.topic;
                if (dataUser) {
                    setTopic({
                        name: dataUser.name || '',
                        slug: dataUser.slug || '',
                        description: dataUser.description || '',
                        sort_order: dataUser.sort_order || '',
                        status: dataUser.status || '',
                    });
                } else {
                    throw new Error('Không tìm thấy chủ đề');
                }
            } catch (err) {
                console.error("Lỗi khi lấy thông tin chủ đề:", err);
                setError('Không thể tải thông tin chủ đề.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTopic(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', topic.name);
        formData.append('slug', topic.slug);
        formData.append('description', topic.description);
        formData.append('sort_order', topic.sort_order);
        formData.append('status', topic.status);

        try {
            await TopicService.update(id, formData); // Gửi FormData lên backend
            navigate('/topic'); // Chuyển hướng đến danh sách chủ đề
        } catch (err) {
            console.error("Lỗi khi cập nhật chủ đề:", err.response ? err.response.data : err.message);
            setError('Không thể cập nhật chủ đề.');
        }
    };

    if (loading) return <div className="text-center">Đang tải...</div>;
    if (error) return <div className="text-center text-red-600">{error}</div>;

    return (
        <div className="container px-4 py-6 mx-auto">
            <h1 className="mb-8 text-3xl font-bold text-center">Chỉnh Sửa Chủ Đề</h1>
            <form onSubmit={handleUpdateUser} className="flex flex-col max-w-xl p-4 mx-auto mb-6 space-y-4 bg-white rounded-lg shadow-md">
                <label className="font-semibold">Tên</label>
                <input
                    type="text"
                    name="name"
                    value={topic.name}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tên chủ đề"
                    required
                />

                <label className="font-semibold">Slug</label>
                <input
                    type="text"
                    name="slug"
                    value={topic.slug}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập slug"
                    required
                />

                <label className="font-semibold">Mô Tả</label>
                <textarea
                    name="description"
                    value={topic.description}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập mô tả"
                    required
                />

<div className="form-group">
                    <label className="block mb-1 text-gray-600">Thứ tự:</label>
                    <input
                        type="number"
                        name="sort_order"
                        value={topic.sort_order}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <label className="font-semibold">Trạng Thái</label>
                <select
                    name="status"
                    value={topic.status}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Chọn trạng thái</option>
                    <option value="1">Hoạt động</option>
                    <option value="0">Không hoạt động</option>
                </select>

                <button type="submit" className="flex items-center justify-center px-4 py-2 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600">
                    <FaEdit className="mr-2" /> Cập Nhật
                </button>
            </form>
        </div>
    );
}