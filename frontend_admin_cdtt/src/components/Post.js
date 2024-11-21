import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import PostService from '../service/PostService';
import { ApiImage } from '../api/ApiImage';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await PostService.getList();
                console.log('Response từ API:', response);

                if (response.status) {
                    if (Array.isArray(response.posts)) {
                        setPosts(response.posts);
                    } else {
                        console.error('Posts không phải là một mảng:', response.posts);
                        setError('Không có bài viết nào.');
                    }
                } else {
                    setError(response.message);
                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
                setError('Đã xảy ra lỗi khi gọi API.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?');
        if (confirmDelete) {
            try {
                const response = await PostService.delete(id);
                if (response.status) {
                    // Xóa thành công, cập nhật lại danh sách bài viết
                    setPosts(posts.filter(post => post.id !== id));
                    alert('Bài viết đã được đưa vào thùng rác.');
                } else {
                    alert('Xóa thất bại: ' + response.message);
                }
            } catch (error) {
                console.error('Lỗi khi xóa bài viết:', error);
                alert('Đã xảy ra lỗi khi xóa bài viết.');
            }
        }
    };

   

    if (loading) {
        return <div className="text-lg text-center text-gray-600">Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div className="text-lg text-center text-red-500">{error}</div>;
    }

    return (
        <div className="container min-h-screen p-6 mx-auto bg-gray-50">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">Quản lý Bài viết</h1>
                <Link
                    to="/post/add"
                    className="flex items-center gap-2 px-4 py-2 mb-4 text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-700"
                >
                    <IoMdAddCircleOutline size={20} />
                    Thêm bài viết
                </Link>
            </div>
            {posts.length === 0 ? (
                <div className="text-lg text-center text-gray-500">Không có bài viết nào để hiển thị.</div>
            ) : (
                <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">ID</th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Hình ảnh</th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Tiêu đề</th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Slug</th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Nội dung</th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {posts.map(post => (
                                <tr key={post.id} className="transition duration-150 ease-in-out hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{post.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img
                                            src={`${ApiImage}/images/post/${post.thumbnail}`}
                                            alt={post.title}
                                            className="object-cover w-24 h-24 rounded-lg"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                        {post.title.length > 30 ? `${post.title.substring(0, 30)}...` : post.title}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{post.slug}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                        {post.content.length > 50 ? `${post.content.substring(0, 50)}...` : post.content}
                                    </td>
                                   
                                    <td className="flex px-6 py-4 mt-8 space-x-4 text-sm font-medium whitespace-nowrap">
                                        <Link
                                            to={`/post/edit/${post.id}`}
                                            className="flex items-center justify-center p-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
                                        >
                                            <FaEdit className="inline" />
                                            <span>Edit</span>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="flex items-center justify-center p-2 text-white transition duration-200 bg-red-500 rounded hover:bg-red-600"
                                        >
                                            <FaTrash className="mr-2" />
                                            <span>Delele</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Post;