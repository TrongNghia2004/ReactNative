import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import Login from './login/Login';
import Register from './login/Register';
import HomeScreen from './HomeScreen';
import Header from './home/Header';
import Slideshow from './home/Banner';
import ProductNew from './home/ProductNew';
import ProductSale from './home/ProductSale';
import Sidebar from './home/Category';
import ProductView from './home/ProductView';
import Home from './tab/Home';
import Cart from './cart/Cart';
import Product from './tab/Product';
import Profile from './tab/Profile';
import MyInformation from './setting/MyInformation';
import Checkout from './cart/Checkout';
import Map from './setting/Map';
import Contact from './setting/Contact';
import Support from './setting/Support';
import ForgetPass from './setting/ForgotPass';
import ProductBestseller from './home/ProductBestseller';

const Stack = createNativeStackNavigator();

const MyApp = () => {
  return (

<Stack.Navigator initialRouteName="Login">
<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Header" component={Header} options={{ headerShown: false }} />
          <Stack.Screen name="Banner" component={Slideshow} options={{ headerShown: false }} />
          <Stack.Screen name="Product" component={Product} options={{ headerShown: false }} />
          <Stack.Screen name="Category" component={Sidebar} options={{ headerShown: false }} />
          <Stack.Screen name="ProductNew" component={ProductNew} options={{ headerShown: false }} />
          <Stack.Screen name="ProductSale" component={ProductSale} options={{ headerShown: false }} />
          <Stack.Screen name="ProductBestseller" component={ProductBestseller} options={{ headerShown: false }} />
          <Stack.Screen name="ProductView" component={ProductView} options={{ headerShown: false }} />
          <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
          <Stack.Screen name="AllProduct" component={Product} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <Stack.Screen name="MyInformation" component={MyInformation} options={{ headerShown: false }} />
          <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false }} />
          <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
          <Stack.Screen name="Map" component={Map} options={{ headerShown: false }} />
          <Stack.Screen name="Support" component={Support} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPass" component={ForgetPass} options={{ headerShown: false }} />
        </Stack.Navigator>
  );
};

export default MyApp;

const styles = StyleSheet.create({});
