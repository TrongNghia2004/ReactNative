import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../home/Header';
import Slideshow from './../home/Banner';
import ProductNew from './../home/ProductNew';
import ProductSale from './../home/ProductSale';
import Sidebar from './../home/Category';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartService from './../service/CartService'; // Assuming CartService handles cart operations
import ProductBestseller from '../home/ProductBestseller';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [cartItems, setCartItems] = useState([]); // State to hold cart items
  const navigation = useNavigation();
  // Fetch the updated cart items from AsyncStorage or API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const savedCartItems = await AsyncStorage.getItem('cartItems');
        if (savedCartItems) {
          setCartItems(JSON.parse(savedCartItems)); // Set cart items from storage
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []); // Empty dependency to fetch once when the component mounts

  // Pull-to-refresh logic
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    navigation.navigate('HomeScreen');
  };

  // Handle cart update (add, delete, or update quantity)
  const updateCart = async (updatedCartItems) => {
    try {
      setCartItems(updatedCartItems); // Update the state
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Save updated cart items to AsyncStorage
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.separator} />
  );

  return (
    <FlatList
      style={styles.container}
      data={[1]} // Use an array with one item to keep header + slideshow outside of VirtualizedList
      keyExtractor={(item) => item.toString()}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      ListHeaderComponent={
        <>
          <View style={styles.bordered}>
          <Header cartItems={cartItems} />
          </View>
          <View style={[ styles.bordered]}>
            <Slideshow />
          </View>
          <View style={styles.bordered}>
            <Sidebar />
          </View>
        </>
      }
      renderItem={renderItem}
      ListFooterComponent={
        <>
          <View style={styles.bordered}>
            <ProductNew updateCart={updateCart} />
          </View>
          <View style={styles.bordered}>
            <ProductSale updateCart={updateCart} />
          </View>
          <View style={styles.bordered}>
            <ProductBestseller updateCart={updateCart} />
          </View>
        </>
      }
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FFFFFF',
  },
  banner: {
    height: 200,
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#aca9a9',
    marginVertical: 10,
  },
  bordered: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
});
