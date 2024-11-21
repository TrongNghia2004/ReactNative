import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductService from './../service/ProductService';
import { ApiImage } from '../api/ApiImage';

const ProductNew = () => {
    const [productNew, setProductNew] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;
    const navigation = useNavigation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const limit = 20;
                const result = await ProductService.product_new(limit);

                if (result && result.products) {
                    setProductNew(result.products);
                    if (currentPage > Math.ceil(result.products.length / productsPerPage)) {
                        setCurrentPage(1);
                    }
                }
            } catch (error) {
                console.error("Error fetching new products:", error);
            }
        };

        fetchProducts();
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productNew.slice(indexOfFirstProduct, indexOfLastProduct);

    const nextPage = () => {
        if (currentPage < Math.ceil(productNew.length / productsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <FlatList
            data={currentProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.productCard}>
                    <Image
                        source={{ uri: item.product_images[0]?.thumbnail ? `${ApiImage}/images/product/${item.product_images[0].thumbnail}` : 'default_image_uri' }}
                        style={styles.productImage}
                    />
                    <View style={styles.productInfo}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.priceBuy}>${item.pricebuy}</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.cartButton} 
                        onPress={() => navigation.navigate('ProductView', { id: item.id })}>
                        <Text style={styles.cartButtonText}>View Details</Text>
                    </TouchableOpacity>
                </View>
            )}
            numColumns={2}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Text style={styles.title}>Sản phẩm mới nhất</Text>}
            ListFooterComponent={
                <View style={styles.pagination}>
                    <Button title="Trang trước" onPress={prevPage} disabled={currentPage === 1} />
                    <Text style={styles.pageInfo}>Trang {currentPage} trên {Math.ceil(productNew.length / productsPerPage)}</Text>
                    <Button title="Trang sau" onPress={nextPage} disabled={currentPage === Math.ceil(productNew.length / productsPerPage)} />
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    row: {
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        height: 300,
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    productInfo: {
        alignItems: 'flex-start',
        width: '100%',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 5,
    },
    priceBuy: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    cartButton: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        width: '100%',
    },
    cartButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 10,
    },
    pageInfo: {
        fontSize: 16,
    },
});

export default ProductNew;
