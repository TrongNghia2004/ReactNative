import React, { useState, useEffect } from 'react';
import { FaUndoAlt, FaTrash } from 'react-icons/fa'; // Import the trash icon
import CategoryService from './../service/CategorySevice';
import BrandService from './../service/BrandService';
import BannerService from './../service/BannerSevice';
import TopicService from './../service/TopicService';
import PostService from './../service/PostService';
import ProductService from './../service/ProductService'; // Assuming you have this service for products
import ProductStoreService from './../service/ProductStoreService'; // Import your product store service

const RecycleBin = () => {
  const [activeTab, setActiveTab] = useState('categories'); // State to track the selected tab
  const [deletedItems, setDeletedItems] = useState([]); // State to store deleted items

  // Fetch deleted items when the active tab changes
  useEffect(() => {
    fetchDeletedItems();
  }, [activeTab]);

  const fetchDeletedItems = async () => {
    try {
      let result;
      switch (activeTab) {
        case 'categories':
          result = await CategoryService.getDeleted();
          break;
        case 'brands':
          result = await BrandService.getDeleted();
          break;
        case 'banners':
          result = await BannerService.getDeleted();
          break;
        case 'topics':
          result = await TopicService.getDeleted();
          break;
        case 'post':
          result = await PostService.getDeleted();
          break;
        case 'products': // Handle deleted products
          result = await ProductService.getDeleted(); // Fetch deleted products
          break;
        case 'productstore': // Added productstore handling
          result = await ProductStoreService.getDeleted(); // Fetch deleted productstore items
          break;
        default:
          result = { categories: [] };
      }

      // Set deleted items based on the response
      if (result && result.categories) {
        setDeletedItems(result.categories);
      } else if (result && result.brands) {
        setDeletedItems(result.brands);
      } else if (result && result.banners) {
        setDeletedItems(result.banners);
      } else if (result && result.topics) {
        setDeletedItems(result.topics);
      } else if (result && result.posts) {
        setDeletedItems(result.posts);
      } else if (result && result.products) { // Handle products
        setDeletedItems(result.products);
      } else if (result && result.productstore) { // Handle productstore
        setDeletedItems(result.productstore);
      } else {
        setDeletedItems([]);
        console.error('No deleted items found');
      }
    } catch (error) {
      console.error('Error fetching deleted items:', error);
    }
  };

  // Restore item from the trash
  const handleRestoreItem = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục mục này không?')) {
      try {
        switch (activeTab) {
          case 'categories':
            await CategoryService.restore(id);
            break;
          case 'brands':
            await BrandService.restore(id);
            break;
          case 'banners':
            await BannerService.restore(id);
            break;
          case 'topics':
            await TopicService.restore(id);
            break;
          case 'post':
            await PostService.restore(id);
            break;
          case 'products':
            await ProductService.restore(id); // Restore product
            break;
          case 'productstore': // Restore productstore
            await ProductStoreService.restore(id); // Restore productstore item
            break;
          default:
            break;
        }
        setDeletedItems(deletedItems.filter((item) => item.id !== id));
        alert('Khôi phục thành công.');
      } catch (error) {
        console.error('Error restoring item:', error);
        alert('Khôi phục không thành công.');
      }
    }
  };

  // Permanently delete item from the trash
  const handlePermanentDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa vĩnh viễn mục này không?')) {
      try {
        switch (activeTab) {
          case 'categories':
            await CategoryService.forceDelete(id);
            break;
          case 'brands':
            await BrandService.forceDelete(id);
            break;
          case 'banners':
            await BannerService.forceDelete(id);
            break;
          case 'topics':
            await TopicService.destroy(id);
            break;
          case 'post':
            await PostService.destroy(id);
            break;
          case 'products': // Permanent delete for products
            await ProductService.forceDelete(id);
            break;
          case 'productstore': // Permanent delete for productstore
            await ProductStoreService.forceDelete(id); // Force delete productstore item
            break;
          default:
            break;
        }
        setDeletedItems(deletedItems.filter((item) => item.id !== id));
        alert('Xóa vĩnh viễn thành công.');
      } catch (error) {
        console.error('Error deleting item permanently:', error);
        alert('Xóa vĩnh viễn không thành công.');
      }
    }
  };

  // Move product to trash
  const handleMoveToTrash = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn chuyển sản phẩm này vào thùng rác không?')) {
      try {
        await ProductService.moveToTrash(id); // Assuming `moveToTrash` method in the ProductService
        alert('Sản phẩm đã được chuyển vào thùng rác.');
        fetchDeletedItems(); // Refresh the deleted items after moving the product to trash
      } catch (error) {
        console.error('Error moving product to trash:', error);
        alert('Không thể chuyển sản phẩm vào thùng rác.');
      }
    }
  };

  return (
    <div className="container px-4 py-6 mx-auto">
      <h1 className="mb-6 text-3xl font-semibold text-gray-800">Thùng Rác</h1>
      <div className="flex mb-6 space-x-4 tabs">
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 rounded ${activeTab === 'categories' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Category
        </button>
        <button
          onClick={() => setActiveTab('brands')}
          className={`px-4 py-2 rounded ${activeTab === 'brands' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Brand
        </button>
        <button
          onClick={() => setActiveTab('banners')}
          className={`px-4 py-2 rounded ${activeTab === 'banners' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Banner
        </button>
        <button
          onClick={() => setActiveTab('topics')}
          className={`px-4 py-2 rounded ${activeTab === 'topics' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Topic
        </button>
        <button
          onClick={() => setActiveTab('post')}
          className={`px-4 py-2 rounded ${activeTab === 'post' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Post
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Product
        </button>
        <button
          onClick={() => setActiveTab('productstore')}
          className={`px-4 py-2 rounded ${activeTab === 'productstore' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          ProductStore
        </button>
      </div>

      {deletedItems.length === 0 ? (
        <p className="text-gray-600">Không có mục nào trong thùng rác cho danh mục đã chọn.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {deletedItems.map((item) => (
            <div key={item.id} className="p-5 bg-white border border-gray-200 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-800">{item.name || item.title}</h2>
              <p className="text-gray-600">{item.description || item.slug}</p>
              <div className="flex mt-4 space-x-2">
                <button
                  onClick={() => handleRestoreItem(item.id)}
                  className="flex items-center px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                >
                  <FaUndoAlt className="mr-2" /> Khôi Phục
                </button>
                <button
                  onClick={() => handlePermanentDelete(item.id)}
                  className="flex items-center px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  <FaTrash className="mr-2" /> Xóa Vĩnh Viễn
                </button>
                {/* {activeTab === 'products' && (
                  <button
                    onClick={() => handleMoveToTrash(item.id)}
                    className="flex items-center px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
                  >
                    <FaTrash className="mr-2" /> Chuyển vào Thùng Rác
                  </button>
                )} */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecycleBin;
