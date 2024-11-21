// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-800">
      <div className="container flex flex-col justify-start h-full mx-auto">
        <div className="p-6">
          <Link to="/dashboard"><h1 className="text-3xl font-semibold text-white">Admin Dashboard</h1></Link>
        </div>
        <nav className="mt-0">
          <ul>
            
            <Link to="/config">
            <li className="block py-2.5 px-6 hover:bg-gray-700 text-white w-full">
              Config
            </li>
            </Link>
            
            <Link to="/banner">
            <li className="block py-2.5 px-6 hover:bg-gray-700 text-white">
              Banner
            </li>
            </Link>
            
            <Link to="/brand">
            <li className="block py-2.5 px-6 hover:bg-gray-700 text-white">
              Brand
            </li>
            </Link>

            <Link to="/category">
            <li className="block py-2.5 px-6 hover:bg-gray-700 text-white">
              Category
            </li>
            </Link>

            {/* <Link to="/menu">
            <li className="block py-2.5 px-6 hover:bg-gray-700 text-white">
              Menu
            </li>
            </Link> */}
            
            {/* <Link to="/contact">
            <li className="block py-2.5 px-6 hover:bg-gray-700 text-white">
              Contact
            </li>
            </Link> */}

            <Link to="/post">
            <li className="block py-2.5 px-6 hover:bg-gray-700 text-white">
              Post
            </li>
            </Link>

            <Link to="/topic">
            <li className="block py-2.5 px-6 hover:bg-gray-700 text-white">
              Topic
            </li>
            </Link>
            
            <Link to="/user">
            <li className="block py-2.5 px-6 hover:bg-gray-700 text-white">
              User
            </li>
            </Link>

            <Link to="/order">
            <li className="block py-2.5 px-6 hover:bg-gray-700 text-white">
              Order
            </li>
            </Link>

            <Link to="/orderdetail">
            <li className="block py-2.5 px-6 hover:bg-gray-700 text-white">
              OrderDetail
            </li>
            </Link>

            <Link to="/product">
            <li className="block py-2.5 px-6 hover:bg-gray-700 text-white">
              Product
            </li>
            </Link>


            <Link to="/productsale">
            <li className="block py-2.5 px-6 hover:bg-gray-700 text-white">
              ProductSale
            </li>
            </Link>
            
            <Link to="/productstore">
            <li className="block py-2.5 px-6 hover:bg-gray-700 text-white">
              ProductStore
            </li>
            </Link>

            <Link to="/recyclebin">
            <li className="block py-2.5 px-6 hover:bg-gray-700 text-white">
              RecycleBin
            </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
