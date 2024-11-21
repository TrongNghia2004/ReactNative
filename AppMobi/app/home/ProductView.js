import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProductService from '../service/ProductService';
import CartService from '../service/CartService';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductView() {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await ProductService.getId(id);
        if (result && result.status) {
          setProduct(result.product);
        } else {
          setError(result.message || 'Failed to fetch product data.');
        }
      } catch (error) {
        setError('Cannot retrieve product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const userId = await AsyncStorage.getItem('userId'); 
    if (!userId) {
      setError('You need to log in to add products to the cart.');
      return;
    }

    const cartItem = {
      user_id: userId,
      product_id: product.id,
      qty: quantity
    };

    try {
      const response = await CartService.add(cartItem);
      setSuccessMessage('Product added to cart successfully!');
      setError('');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setError('Error adding product to cart.');
      setSuccessMessage('');
    }
  };

  const incrementQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
  const decrementQuantity = () => setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));

  if (loading) {
    return <ActivityIndicator size="large" color="#4a90e2" style={styles.centered} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (!product) {
    return <Text style={styles.centered}>Product not found.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Section with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Detail</Text>
      </View>

      {/* Success Message */}
      {successMessage && (
        <View style={styles.successMessage}>
          <Text style={styles.successMessageText}>{successMessage}</Text>
        </View>
      )}

      <View style={styles.productContainer}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.thumbnail }} style={styles.productImage} />
        </View>

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.category}>{product.category_name}</Text>

          {/* Price Section */}
          <View style={styles.priceContainer}>
            {product.pricesale ? (
              <Text style={styles.salePrice}>${product.pricesale}<Text style={styles.salePrice1}>  (pricesale)</Text></Text>
            ) : (
              <Text style={styles.regularPrice}>${product.pricebuy}</Text>
            )}
          </View>

          {/* Description Section */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>

          {/* Quantity Control */}
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#3f51b5',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    padding: 12,
    backgroundColor: '#1976d2',
    borderRadius: 50,
    elevation: 3,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  successMessage: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#4caf50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    zIndex: 1000,
    elevation: 5,
    opacity: 0.9,
  },
  successMessageText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  productContainer: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  productImage: {
    width: '100%',
    height: 350,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  productName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  category: {
    fontSize: 18,
    color: '#757575',
    marginBottom: 12,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  salePrice1: {
    fontSize: 14,
    fontWeight: '700',
    color: '#e74c3c',
    marginRight: 8,
  },
  salePrice: {
    fontSize: 34,
    fontWeight: '700',
    color: '#e74c3c',
    marginRight: 8,
  },
  regularPrice: {
    fontSize: 34,
    fontWeight: '700',
    color: '#e74c3c',
    marginRight: 8,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  quantityContainer: {
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    backgroundColor: '#3f51b5',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 50,
    marginHorizontal: 12,
    elevation: 3,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#ff7043',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 7,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  errorText: {
    color: '#e74c3c',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 40,
  },
});
