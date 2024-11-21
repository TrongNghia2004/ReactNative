import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    Alert,
    Image
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartService from './../service/CartService';
import { ApiImage } from './../api/ApiImage';
import { Swipeable } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const navigation = useNavigation();
    const [selectedItems, setSelectedItems] = useState({}); 

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await AsyncStorage.getItem('userId');
            setUserId(id);
        };

        fetchUserId();
    }, []);

    // Refetch cart items whenever the cart screen is focused
    useFocusEffect(
        React.useCallback(() => {
            const fetchCartItems = async () => {
                if (userId) {
                    setLoading(true);
                    try {
                        const response = await CartService.getList(userId);
                        if (response.status && response.cart) {
                            setCartItems(response.cart);
                        } else {
                            setCartItems([]);
                        }
                    } catch (error) {
                        console.error("Error fetching cart items:", error);
                        Alert.alert("Error", "Failed to fetch cart items.");
                        setCartItems([]);  // Default to empty array if there's an error
                    } finally {
                        setLoading(false);
                    }
                } else {
                    setLoading(false);
                    setCartItems([]); // Handle case where there's no userId
                }
            };

            fetchCartItems();
        }, [userId])
    );

    const handleQuantityChange = async (id, newQuantity) => {
        if (newQuantity < 1) return;
        const updatedItems = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, qty: newQuantity };
            }
            return item;
        });

        setCartItems(updatedItems);

        try {
            await CartService.update(id, { qty: newQuantity });
            await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Save to AsyncStorage
        } catch (error) {
            console.error("Error updating quantity:", error);
            Alert.alert("Error", "Failed to update quantity.");
            setCartItems(cartItems); // Reset to previous state on error
        }
    };

    const handleDelete = async (itemId) => {
        try {
            await CartService.delete(itemId);
            const updatedCartItems = cartItems.filter(item => item.id !== itemId);
            setCartItems(updatedCartItems);
            await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Save updated cart to AsyncStorage
        } catch (error) {
            console.error('Error deleting item:', error.response?.data || error.message);
            Alert.alert("Error", "Failed to delete item.");
        }
    };

    const calculateTotal = () => {
        const totalAmount = cartItems.reduce((total, item) => {
            const priceToShow = item.pricesale ? item.pricesale : item.pricebuy;
            return total + priceToShow * item.qty;
        }, 0);

        return totalAmount.toFixed(2);
    };

    const handleProceedToCheckout = async () => {
        // Remove the selectedProducts filter since you want to pass all items in the cart
        const selectedProducts = cartItems;  // Now this contains all items

        await AsyncStorage.setItem('selectedItemsForCheckout', JSON.stringify(selectedProducts));
        navigation.navigate('Checkout', { selectedProducts });
    };

    const renderItem = ({ item }) => {
        const renderRightActions = (progress, dragX) => {
            return (
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            );
        };

        const priceToShow = item.pricesale ? item.pricesale : item.pricebuy;

        return (
            <Swipeable renderRightActions={renderRightActions}>
                <View style={styles.cartItem}>
                    <View style={styles.itemContent}>
                        <Image
                            source={{ uri: `${ApiImage}/images/product/${item.thumbnail}` }}
                            style={styles.itemImage}
                        />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>{item.product_name}</Text>

                            <View style={styles.itemRow}>
                                <Text style={styles.itemLabel}>Price</Text>
                                <Text style={styles.itemValue}>${priceToShow}</Text>
                            </View>

                            <View style={styles.itemRow}>
                                <Text style={styles.itemLabel}>Quantity</Text>
                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity onPress={() => handleQuantityChange(item.id, item.qty - 1)} disabled={item.qty <= 1}>
                                        <Text style={styles.quantityButton}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.quantityText}>{item.qty}</Text>
                                    <TouchableOpacity onPress={() => handleQuantityChange(item.id, item.qty + 1)}>
                                        <Text style={styles.quantityButton}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.itemRow}>
                                <Text style={styles.itemLabel}>Total</Text>
                                <Text style={styles.itemValue}>${(priceToShow * item.qty).toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Swipeable>
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.header}>Your Shopping Cart</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
                ) : cartItems.length === 0 ? (
                    <Text style={styles.emptyMessage}>Your cart is empty.</Text> // Display when there are no items in the cart
                ) : (
                    <FlatList
                        data={cartItems}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={styles.cartContent}
                    />
                )}
                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryText}>Total All: ${calculateTotal()}</Text>
                    <TouchableOpacity onPress={handleProceedToCheckout} style={styles.checkoutButton}>
                        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f4f8',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: '#333',
    },
    emptyMessage: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 18,
    },
    loader: {
        marginTop: 20,
    },
    cartContent: {
        paddingBottom: 80, // Ensure enough space at the bottom for the checkout button
    },
    cartItem: {
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 16,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontWeight: '600',
        color: '#333',
        fontSize: 16,
        marginBottom: 8,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        alignItems: 'center', // Align items to be vertically centered
    },
    itemLabel: {
        fontWeight: '500',
        color: '#555',
        fontSize: 14,
    },
    itemValue: {
        fontSize: 16,
        color: '#333',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        fontSize: 18,
        padding: 8,
        color: '#007bff',
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    deleteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff4d4d',
        height: '100%',
        width: 80,
        borderRadius: 8,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    summaryContainer: {
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 20,
        borderRadius: 8,
        elevation: 4,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    summaryText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    checkoutButton: {
        backgroundColor: '#007bff',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 6,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Cart;
