import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Config from './components/Config';
import Banner from './components/Banner';
import Brand from './components/Brand';
import Category from './components/Category';
import Contact from './components/Contact';
import Menu from './components/Menu';
import Post from './components/Post';
import Topic from './components/Topic';
import User from './components/User';
import Product from './components/Product';
import Order from './components/Order';
import AddBrand from './component form/AddBrand';
import ProductSale from './components/ProductSale';
import ProductStore from './components/ProductStore';
import EditProductSale from './component form/EditProductSale';
import EditProductStore from './component form/EditProductStore';
import EditProduct from './component form/EditProduct';
import AddProduct from './component form/AddProduct';
import AddCategory from './component form/AddCategory';
import EditCategory from './component form/EditCategory';
import EditBrand from './component form/EditBrand';
import AddBanner from './component form/AddBanner';
import EditBanner from './component form/EditBanner';
import RecycleBin from './components/RecycleBin';
import AddTopic from './component form/AddTopic';
import EditTopic from './component form/EditTopic';
import EditConfig from './component form/EditConfig';
import AddPost from './component form/AddPost';
import EditPost from './component form/EditPost';
// import OrderDetail from './components/OrderDetail';
import Login from './components/Login';


function App() {
  return (
    
    <Router>
      <Routes>
      {/* <Route path="/" element={<Navigate to="/admin/login" />} />
            <Route path="/admin/login" element={<Login/>} /> */}
      </Routes>
      
      <div className="flex">
      <Sidebar/>


        <div className="flex-grow p-6">
          <Routes>

            {/* Chuyển hướng từ root (/) đến /dashboard */}
            
            <Route path="/dashboard" element={<Dashboard/>} />

            <Route path="/config" element={<Config/>} />
            <Route path="/config/edit/:id" element={<EditConfig/>} />
            
            <Route path="/banner" element={<Banner/>} />
            <Route path="/banner/add" element={<AddBanner/>} />
            <Route path="/banner/edit/:id" element={<EditBanner/>} />

            
            <Route path="/brand" element={<Brand/>} />
            <Route path="/brand/edit/:id" element={<EditBrand/>} />
            <Route path="/brand/add" element={<AddBrand/>} />

            
            <Route path="/category" element={<Category/>} />
            <Route path="/category/add" element={<AddCategory/>} />
            <Route path="/category/edit/:id" element={<EditCategory/>} />

            
            <Route path="/menu" element={<Menu/>} />

            
            <Route path="/contact" element={<Contact/>} />

            
            <Route path="/post" element={<Post/>} />
            <Route path="/post/add" element={<AddPost/>} />
            <Route path="/post/edit/:id" element={<EditPost/>} />
            

            <Route path="/topic" element={<Topic/>} />
            <Route path="/topic/add" element={<AddTopic/>} />
            <Route path="/topic/edit/:id" element={<EditTopic/>} />
            
            <Route path="/user" element={<User/>} />

            
            <Route path="/order" element={<Order/>} />
            {/* <Route path="/orderdetail" element={<OrderDetail/>} /> */}
            
            <Route path="/product" element={<Product />} />
            <Route path="/product/add" element={<AddProduct />} />
            <Route path="/product/edit/:id" element={<EditProduct />} />


              <Route path="/productsale" element={<ProductSale />} />
              <Route path="/productsale/edit/:id" element={<EditProductSale />} />


                <Route path="/productstore" element={<ProductStore />} />
                <Route path="/productstore/edit/:id" element={<EditProductStore />} />
                

                <Route path="/recyclebin" element={<RecycleBin />} />
          </Routes>
        </div>
      </div>

      </Router>
  );
}

export default App;