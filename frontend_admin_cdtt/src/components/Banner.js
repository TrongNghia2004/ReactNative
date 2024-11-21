import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ApiImage } from '../api/ApiImage';
import { Link } from 'react-router-dom';
import { IoMdAddCircleOutline } from 'react-icons/io';
import BannerService from '../service/BannerSevice';

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const result = await BannerService.getList();
                setBanners(result.banners);
            } catch (err) {
                console.error("Error fetching banners:", err);
                setError(err);
            }
        };

        fetchBanners();
    }, []);

    const handleDeleteBanner = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa banner này không?")) {
            try {
                await BannerService.delete(id);
                setBanners(prevBanners => prevBanners.filter(banner => banner.id !== id));
            } catch (err) {
                console.error("Error deleting banner:", err);
                setError(err);
            }
        }
    };

    return (
        <div className="container p-6 mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Quản lý Quảng cáo</h1>
                <Link
                    to="/banner/add"
                    className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition duration-200"
                >
                    <IoMdAddCircleOutline className="mr-2" />
                    Thêm quảng cáo
                </Link>
            </div>
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full table-auto leading-normal">
                    <thead>
                        <tr className="text-sm text-gray-700 uppercase bg-gray-100">
                            <th className="px-6 py-4 font-medium text-left border-b border-gray-200">STT</th>
                            <th className="px-6 py-4 font-medium text-left border-b border-gray-200">Id</th>
                            <th className="px-6 py-4 font-medium text-left border-b border-gray-200">Tên</th>
                            <th className="px-6 py-4 font-medium text-left border-b border-gray-200">Hình ảnh</th>
                            <th className="px-6 py-4 font-medium text-left border-b border-gray-200">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {banners.length > 0 ? (
                            banners.map((banner, index) => (
                                <tr key={banner.id} className="transition duration-200 ease-in-out hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-center text-gray-900 border-b border-gray-200">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-200">{banner.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-200">{banner.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-200">
                                        {banner.image && (
                                            <img src={`${ApiImage}/images/banner/${banner.image}`} alt={banner.name} className="object-cover w-16 h-16 rounded-md shadow" />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-200">
                                        <div className="flex justify-center items-center space-x-4">
                                            <Link
                                                to={`/banner/edit/${banner.id}`}
                                                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                                                aria-label={`Edit banner ${banner.name}`}
                                            >
                                                <FaEdit size={18} />
                                                <span className="ml-2">Sửa</span>
                                            </Link>
                                            <button
                                                className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                                                onClick={() => handleDeleteBanner(banner.id)}
                                                aria-label={`Delete banner ${banner.name}`}
                                            >
                                                <FaTrash size={18} />
                                                <span className="ml-2">Xóa</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500 border-b border-gray-200">
                                    Không có quảng cáo nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {error && <p className="mt-4 text-red-500 text-center">{error.message}</p>}
        </div>
    );
};

export default Banner;
