import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { ApiImage } from '../api/ApiImage';
import ProductService from '../service/ProductService';
import { useNavigation } from '@react-navigation/native';

const ProductBestseller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 4;
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        const result = await ProductService.product_bestseller(productsPerPage);
        if (result && result.products) {
          setProducts(result.products);
          setTotalProducts(result.total || 1);
        }
      } catch (error) {
        console.error("Error fetching bestseller products:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    })();
  }, [currentPage]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image
        source={{ uri: `${ApiImage}/images/product/${item.product_images[0]?.thumbnail}` }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.priceQuantityContainer}>
          <Text style={styles.productPrice}>${item.pricebuy}</Text>
          <Text style={styles.productQuantity}>x{item.qty}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ProductView', { id: item.id })}
      >
        <Text style={styles.addButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
  

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sản phẩm bán chạy</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={prevPage}
          disabled={currentPage === 1}
          style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
        >
          <Text style={styles.pageButtonText}>Trang trước</Text>
        </TouchableOpacity>
        <Text style={styles.pageText}>
          Trang {currentPage} trên {totalPages}
        </Text>
        <TouchableOpacity
          onPress={nextPage}
          disabled={currentPage === totalPages}
          style={[styles.pageButton, currentPage === totalPages && styles.disabledButton]}
        >
          <Text style={styles.pageButtonText}>Trang sau</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#2C3E50',
  },
  productList: {
    justifyContent: 'space-between',
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    elevation: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    height: 320,  // Maintain the height of each container
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 5,
  },
  productInfo: {
    marginTop: 10,
    width: '100%',
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  productQuantity: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888',
    marginLeft: 10,
  },
  addButton: {
    marginTop: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },
  pageButton: {
    backgroundColor: '#0066cc',
    padding: 10,
    borderRadius: 5,
  },
  pageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#B0B0B0',
  },
  pageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
});

export default ProductBestseller;
