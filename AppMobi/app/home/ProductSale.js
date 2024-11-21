import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Button, Animated, Pressable, TouchableOpacity } from 'react-native';
import ProductService from '../service/ProductService';
import { ApiImage } from '../api/ApiImage';
import { useNavigation } from '@react-navigation/native';

const ProductSale = () => {
    const [productsale, setProductsale] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;
    const limit = 20;
    const navigation = useNavigation();

    const animatedValues = productsale.map(() => new Animated.Value(1));

    useEffect(() => {
        (async () => {
            try {
                const result = await ProductService.product_sale(limit);
                if (result && result.products) {
                    setProductsale(result.products);
                }
            } catch (error) {
                console.error("Error fetching sale products:", error);
            }
        })();
    }, [limit]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productsale.slice(indexOfFirstProduct, indexOfLastProduct);

    const nextPage = () => {
        if (currentPage < Math.ceil(productsale.length / productsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePressIn = (index) => {
        Animated.spring(animatedValues[index], {
            toValue: 1.05,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = (index) => {
        Animated.spring(animatedValues[index], {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <FlatList
            data={currentProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
                <Animated.View style={[styles.productCard, { transform: [{ scale: animatedValues[index] }] }]}>
                    <Pressable 
                        onPressIn={() => handlePressIn(index)} 
                        onPressOut={() => handlePressOut(index)}
                        onPress={() => navigation.navigate('ProductView', { id: item.id })}
                    >
                        <Image
                            source={{ uri: `${ApiImage}/images/product/${item.product_images[0]?.thumbnail}` }}
                            style={styles.productImage}
                        />
                        <Text style={styles.productName}>{item.name}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.salePrice}>${item.pricesale}</Text>
                            {item.pricebuy && <Text style={styles.originalPrice}>${item.pricebuy}</Text>}
                        </View>
                       
                    </Pressable>
                    <TouchableOpacity 
                            style={styles.cartButton} 
                            onPress={() => navigation.navigate('ProductView', { id: item.id })}
                        >
                            <Text style={styles.cartButtonText}>View Details</Text>
                        </TouchableOpacity>
                </Animated.View>
            )}
            numColumns={2}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Text style={styles.title}>Sản phẩm giảm giá</Text>}
            ListFooterComponent={
                <View style={styles.pagination}>
                    <Button 
                        title="Trang trước" 
                        onPress={prevPage} 
                        disabled={currentPage === 1} 
                    />
                    <Text style={styles.pageInfo}>Trang {currentPage} trên {Math.ceil(productsale.length / productsPerPage)}</Text>
                    <Button 
                        title="Trang sau" 
                        onPress={nextPage} 
                        disabled={currentPage === Math.ceil(productsale.length / productsPerPage)} 
                    />
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
        height: 320,
    },
   
    productImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
        resizeMode: 'cover',
    },
    // productImage: {
    //     width: '50%',
    //     height: 100,
    //     borderRadius: 10,
    //     marginBottom: 10,
    // },
    productName: {
        marginLeft:15,
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
    // cartButton: {
    //     backgroundColor: '#007BFF',
    //     borderRadius: 5,
    //     padding: 10,
    //     alignItems: 'center',
    //     width: '100%',
    // },
    priceContainer: {
        marginLeft:15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    salePrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    originalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF0000',
        textDecorationLine: 'line-through',
        marginLeft: 10,
    },
    cartButton: {
        marginTop:15,
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

export default ProductSale;
