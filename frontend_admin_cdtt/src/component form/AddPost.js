import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostService from '../service/PostService';
import TopicService from '../service/TopicService';

function AddPost() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [topicId, setTopicId] = useState('');
    const [status, setStatus] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [topics, setTopics] = useState([]);

    const handleThumbnailChange = (e) => {
        setThumbnail(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('content', content);
        formData.append('topic_id', topicId);
        formData.append('status', status);
        formData.append('thumbnail', thumbnail);

        try {
            const response = await PostService.add(formData);
            if (response.status) {
                alert('Thêm bài viết thành công!');
                navigate('/post');
            } else {
                alert('Thêm bài viết thất bại.');
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu:', error);
            alert('Đã xảy ra lỗi khi thêm bài viết.');
        }
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await TopicService.getList();
                setTopics(response.topics);
            } catch (err) {
                console.error('Lỗi khi lấy topic:', err);
            }
        };
        fetchTopics();
    }, []);

    return (
        <div className="max-w-xl p-6 mx-auto mt-10 bg-gray-100 rounded-lg shadow-md">
            <h1 className="mb-6 text-3xl font-semibold text-center">Thêm Bài viết mới</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                    <input
                        type="text"
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Slug</label>
                    <input
                        type="text"
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Nội dung</label>
                    <textarea
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                        rows="6"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Chủ đề </label>
                    <select
                        value={topicId}
                        onChange={(e) => setTopicId(e.target.value)}
                        required
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="">Chọn danh mục</option>
                        {topics.map((topic) => (
                            <option key={topic.id} value={topic.id}>
                                {topic.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 text-gray-600">Trạng thái:</label>
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Chọn trạng thái</option>
                        <option value="1">Hoạt động</option>
                        <option value="0">Không hoạt động</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Hình ảnh</label>
                    <input
                        type="file"
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                        onChange={handleThumbnailChange}
                        accept="image/*"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                    Thêm bài viết
                </button>
            </form>
        </div>
    );
}

export default AddPost;
