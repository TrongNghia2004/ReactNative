import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import { IoMdAddCircleOutline } from 'react-icons/io';
import TopicService from '../service/TopicService';

const Topic = () => {
    const [topics, setTopics] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const result = await TopicService.getList();
                setTopics(result.topics);
            } catch (err) {
                console.error("Error fetching topics:", err);
                setError(err);
            }
        })();
    }, []);

    const handleDeleteTopic = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa chủ đề này không?")) {
            try {
                await TopicService.delete(id);
                setTopics(topics.filter(topic => topic.id !== id));
            } catch (err) {
                console.error("Error deleting topic:", err);
                setError(err);
            }
        }
    };

    return (
        <div className="container px-4 py-8 mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-700">Quản lý Chủ Đề Bài Viết</h1>
                <Link
                    to="/topic/add"
                    className="flex items-center px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-lg shadow hover:bg-blue-600"
                >
                    <IoMdAddCircleOutline className="mr-2" /> Thêm chủ đề bài viết
                </Link>
            </div>
            <div className="overflow-hidden bg-white rounded-lg shadow-md">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">STT</th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Tên</th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Mô tả</th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topics.length > 0 ? (
                            topics.map((topic, index) => (
                                <tr key={topic.id} className="transition border-t border-gray-200 hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{topic.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{topic.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{topic.description}</td>
                                    <td className="flex px-6 py-4 space-x-2 text-sm text-gray-700">
                                        <Link
                                            to={`/topic/edit/${topic.id}`}
                                            className="flex items-center justify-center p-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
                                        >
                                            <FaEdit size={20} />
                                            <span className="ml-2">Edit</span>
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteTopic(topic.id)}
                                            className="flex items-center justify-center p-2 text-white transition duration-200 bg-red-500 rounded hover:bg-red-600"
                                        >
                                            <FaTrash size={20} />
                                            <span className="ml-2">Delete</span>
                                        </button>
                                       
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-6 text-center text-gray-500">Không có chủ đề nào để hiển thị.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Topic;
