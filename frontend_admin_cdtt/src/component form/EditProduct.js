import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import ProductService from '../service/ProductService';

export default function EditProduct() {
    const { id } = useParams(); // Get ID from URL

    // State to store product information
    const [product, setProduct] = useState({
        name: '',
        pricebuy: '',
        description: '',
        slug: '',
        category_id: '',
        brand_id: '',
        content: '',
    });

    const [image, setImage] = useState(null); // State for image
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch product information from API on component mount
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await ProductService.getId(id);
                const dapro = response.product;
                if (dapro) {
                    setProduct({ ...dapro });
                    setImage(dapro.image); // Set existing image path
                } else {
                    throw new Error('Product not found');
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                setError('Failed to load product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({ ...prevState, [name]: value }));
    };

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file); // Update image state
    };

    // Handle form submission for updating product
    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(product).forEach(([key, value]) => {
            formData.append(key, value); // Append product data
        });
        if (image) {
            formData.append('image', image); // Attach image file if present
        }

        try {
            await ProductService.update(id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/product'); // Navigate back to product list after update
        } catch (err) {
            console.error("Error updating product:", err.response ? err.response.data : err.message);
            setError('Failed to update product.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-lg p-6 mx-auto bg-white rounded shadow-md">
            <h1 className="mb-4 text-2xl font-bold text-center">Chỉnh Sửa Sản Phẩm</h1>
            <form onSubmit={handleUpdateProduct} className="mb-6 space-y-4">
                {['name', 'slug', 'pricebuy', 'description', 'category_id', 'brand_id', 'content'].map((field, index) => (
                    <div key={index}>
                        <label className="block text-sm font-medium text-gray-700" htmlFor={field}>
                            {field === 'pricebuy' ? 'Giá mua' : field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        {field === 'description' || field === 'content' ? (
                            <textarea
                                name={field}
                                value={product[field]}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder={`Nhập ${field === 'description' ? 'mô tả' : 'nội dung'}`}
                                required
                            />
                        ) : (
                            <input
                                type={field === 'pricebuy' ? 'number' : 'text'}
                                name={field}
                                value={product[field]}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder={`Nhập ${field === 'category_id' ? 'ID danh mục' : field === 'brand_id' ? 'ID thương hiệu' : field}`}
                                required
                            />
                        )}
                    </div>
                ))}

                <div>
                    <label className="block text-sm font-medium text-gray-700">Hình ảnh sản phẩm</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                <button type="submit" className="flex items-center px-4 py-2 font-medium text-white bg-blue-500 rounded-lg">
                    <FaEdit className="mr-2" /> Cập Nhật
                </button>
            </form>
        </div>
    );
}
