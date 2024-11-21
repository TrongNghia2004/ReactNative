import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import CategoryService from './../service/CategoryService';
import ProductService from './../service/ProductService';

const Sidebar = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const productsPerPage = 2;

    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const productResult = await ProductService.getList();
                setProducts(productResult.products || []);
                setFilteredProducts(productResult.products || []);

                const categoriesResponse = await CategoryService.getList();
                setCategories([{ id: 'all', name: 'All' }, ...(categoriesResponse.categories || [])]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filtered = products;
        if (selectedCategory !== 'all') {
            filtered = products.filter(product => String(product.category_id) === selectedCategory);
        }
        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset to page 1 on category change
    }, [selectedCategory, products]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handleProductClick = (id) => {
        navigation.navigate('ProductView', { productId: id });
    };

    const handleCategoryChange = (categoryId) => {
        console.log('Changing category to:', categoryId);
        setSelectedCategory(String(categoryId));
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.sidebar}>
                <Text style={styles.categoryTitle}>Danh mục</Text>
                {categories.map((category) => (
                    <TouchableOpacity key={category.id} onPress={() => handleCategoryChange(category.id)} style={styles.categoryItem}>
                        <RadioButton
                            value={category.id}
                            status={selectedCategory === String(category.id) ? 'checked' : 'unchecked'}
                        />
                        <Text style={styles.categoryText}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.productsContainer}>
                <FlatList
                    data={currentProducts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.productCard}>
                            <TouchableOpacity onPress={() => handleProductClick(item.id)} style={styles.productContent}>
                                <Image
                                    source={{ uri: item.thumbnail }}
                                    style={styles.productImage}
                                />
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.productCategory}>{item.category_name}</Text>
                                <Text style={styles.productPrice}>${item.pricebuy}</Text>
                                <TouchableOpacity 
                            style={styles.addButton} 
                            onPress={() => navigation.navigate('ProductView', { id: item.id })}
                        >
                            <Text style={styles.addButtonText}>View Details</Text>
                        </TouchableOpacity>
                            </TouchableOpacity>
                        </View>
                    )}
                    numColumns={1}
                    showsVerticalScrollIndicator={false}
                />

                <View style={styles.pagination}>
                    <Button
                        title="Trước"
                        onPress={prevPage}
                        disabled={currentPage === 1}
                    />
                    <Text style={styles.paginationText}>Trang {currentPage} trên {totalPages}</Text>
                    <Button
                        title="Sau"
                        onPress={nextPage}
                        disabled={currentPage === totalPages}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#fff',
    },
    sidebar: {
        width: '40%',
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginRight: 10,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        paddingVertical: 4,
    },
    categoryText: {
        fontSize: 16,
        marginLeft: 3,
    },
    productsContainer: {
        width: '60%',
        padding: 10,
    },
    productCard: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 16,
        elevation: 3,
        borderWidth: 1, // Thêm đường viền
        borderColor: '#ddd', // Màu sắc của đường viền
        shadowColor: '#000', // Màu của bóng
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1, // Độ mờ của bóng
        shadowRadius: 4, // Bán kính của bóng
        height: 300, // Đặt chiều cao cố định để các khung bằng nhau
    },
    productContent: {
        alignItems: 'center',
    },
    productImage: {
        width: '80%',
        height: 140,
        borderRadius: 10,
        marginBottom: 10,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    productCategory: {
        fontSize: 12,
        color: '#555',
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    addButton: {
        backgroundColor: '#007BFF',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 5,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    paginationText: {
        fontSize: 14,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default Sidebar;
