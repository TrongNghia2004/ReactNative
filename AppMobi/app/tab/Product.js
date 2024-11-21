import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductService from '../service/ProductService'; // Assuming this handles fetching products

const Product = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(3);
    const [priceAlert, setPriceAlert] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productResult = await ProductService.getList();
                setProducts(productResult.products || []);
                setFilteredProducts(productResult.products || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let filtered = products;

        // Filter by price range
        if (minPrice !== '' && maxPrice !== '') {
            filtered = filtered.filter(product => product.pricebuy >= minPrice && product.pricebuy <= maxPrice);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    }, [minPrice, maxPrice, searchQuery, products]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleSearchChange = (text) => {
        setSearchQuery(text);
        setCurrentPage(1);
    };

    const handlePriceChange = (e, type) => {
        if (type === 'minPrice') {
            setMinPrice(e);
            if (maxPrice && parseFloat(e) > parseFloat(maxPrice)) {
                setPriceAlert('Minimum price cannot be greater than maximum price!');
            } else {
                setPriceAlert('');
            }
        } else if (type === 'maxPrice') {
            setMaxPrice(e);
            if (minPrice && parseFloat(e) < parseFloat(minPrice)) {
                setPriceAlert('Maximum price cannot be less than minimum price!');
            } else {
                setPriceAlert('');
            }
        }
    };

    const renderProductItem = ({ item }) => {
        return (
            <View style={styles.productItem}>
                <View style={styles.productInfoContainer}>
                    <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
                    <View style={styles.productDetails}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productPrice}>${item.pricebuy}</Text>
                        <TouchableOpacity
                            style={styles.viewDetailsButton}
                            onPress={() => navigation.navigate('ProductView', { id: item.id })}
                        >
                            <Text style={styles.buttonText}>View Details</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search products..."
                value={searchQuery}
                onChangeText={handleSearchChange}
            />
            <View style={styles.priceFilterContainer}>
                <TextInput
                    style={styles.priceInput}
                    placeholder="Min Price"
                    keyboardType="numeric"
                    value={minPrice}
                    onChangeText={(e) => handlePriceChange(e, 'minPrice')}
                />
                <TextInput
                    style={styles.priceInput}
                    placeholder="Max Price"
                    keyboardType="numeric"
                    value={maxPrice}
                    onChangeText={(e) => handlePriceChange(e, 'maxPrice')}
                />
            </View>
            {priceAlert && <Text style={styles.alertText}>{priceAlert}</Text>}

            <FlatList
                data={currentProducts}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text>No products found.</Text>}
            />

            <View style={styles.paginationContainer}>
                <TouchableOpacity
                    onPress={prevPage}
                    disabled={currentPage === 1}
                    style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
                >
                    <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>
                <Text style={styles.pageText}>Page {currentPage} of {totalPages}</Text>
                <TouchableOpacity
                    onPress={nextPage}
                    disabled={currentPage === totalPages}
                    style={[styles.pageButton, currentPage === totalPages && styles.disabledButton]}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f4f4f4',
        flex: 1,
    },
    searchInput: {
        height: 40,
        borderColor: '#007bff',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 20,
        borderRadius: 4,
        backgroundColor: 'white',
        fontSize: 16,
    },
    priceFilterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    priceInput: {
        width: '48%',
        height: 40,
        borderColor: '#007bff',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 4,
        backgroundColor: 'white',
        fontSize: 16,
    },
    productItem: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    productInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
        marginRight: 15,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
        marginVertical: 5,
    },
    viewDetailsButton: {
        marginTop: 10,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    pageButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    pageText: {
        fontSize: 16,
    },
    alertText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
});

export default Product;
