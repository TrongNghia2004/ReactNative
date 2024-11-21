import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartService from './../service/CartService';

const Header = () => {
  const [username, setUsername] = useState(null);
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const [orderCount, setOrderCount] = useState(0); // State for order count
  const [opacity] = useState(new Animated.Value(1)); // Animation value for text opacity
  const navigation = useNavigation();

  useEffect(() => {
    const fetchStoredData = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const storedUsername = await AsyncStorage.getItem('name');
      setUsername(token && storedUsername ? storedUsername : null);
    };

    fetchStoredData();
  }, []);

  const fetchCartItems = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (userId) {
      try {
        const response = await CartService.getList(userId);
        if (response.cart) {
          setCartItems(response.cart);
        } else {
          setCartItems([]);  // Giỏ hàng trống
        }
      } catch (error) {
        console.error('Error fetching cart items:', error.response?.data || error.message);
        setCartItems([]);  // Giỏ hàng trống khi có lỗi
      }
    } else {
      setCartItems([]);  // Trường hợp không có userId
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    setOrderCount(cartItems.length);
  }, [cartItems]);

  // Blinking effect for the welcome text
  useEffect(() => {
    const blinkAnimation = Animated.loop(
      Animated.sequence([        
        // Fade out (opacity 0)
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        // Fade in (opacity 1)
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    blinkAnimation.start(); // Start the blinking animation
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['authToken', 'name', 'userId']);
    setUsername(null);
    navigation.navigate('Login');
  };

  const handleCartChange = () => {
    fetchCartItems(); // Fetch cart items when there's a change
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
    handleCartChange(); // Update cart when navigating to it
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        <Text style={styles.hotlineText}>Hotline:</Text>
        <Text style={styles.phoneText}>0901-399-485</Text>
      </View>
      <View style={styles.authContainer}>
        {username ? (
          <>
            <Text style={styles.greetingText}>Hello, {username}</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.authButton} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttonText}>Đăng Ký</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authButton} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Đăng Nhập</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Welcome text with blinking effect */}
      <View style={styles.navBar}>
        <Animated.View style={[styles.welcomeContainer, { opacity }]}>
          <Text style={styles.welcomeText}>Welcome to My Shop</Text>
        </Animated.View>

        <TouchableOpacity onPress={handleCartPress} style={styles.cartIconContainer}>
          <Icon name="shopping-cart" size={30} color="#42a5f5" />
          {orderCount > 0 && (
            <View style={styles.bubble}>
              <Text style={styles.bubbleText}>{orderCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#f1f8e9',
    paddingVertical: 15,  // Reduced vertical padding for a more compact layout
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#c8e6c9',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,  // Slight margin to separate from the next section
  },
  hotlineText: {
    fontSize: 14,  // Smaller font size
    color: '#4caf50',
    fontWeight: 'bold',
  },
  phoneText: {
    fontSize: 14,  // Smaller font size
    color: '#2e7d32',
    fontWeight: '600',
  },
  authContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // Spread out buttons
    alignItems: 'center', 
    marginTop: 10,
  },
  greetingText: {
    fontSize: 16,  // Slightly smaller font size
    color: '#37474f',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
  },
  logoutButton: {
    backgroundColor: '#ff7043',
    paddingVertical: 6,  // Reduced padding
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  authButton: {
    backgroundColor: '#42a5f5',
    paddingVertical: 6,  // Reduced padding
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,  // Smaller button text
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,  // Slight margin for spacing
  },
  welcomeContainer: {
    marginTop:5,
    paddingVertical: 12,  // Reduced padding
    paddingHorizontal: 16,
    backgroundColor: '#e1f5fe',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    marginBottom: 10,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 15,  // Slightly smaller font size
    fontWeight: 'bold',
    color: '#37474f',
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  cartIconContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  bubble: {
    position: 'absolute',
    right: -6,  // Adjusted to fit better
    top: -4,
    backgroundColor: '#e53935',
    borderRadius: 10,
    width: 18,  // Smaller bubble size
    height: 18,  // Smaller bubble size
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleText: {
    color: '#ffffff',
    fontSize: 10,  // Smaller font size for the bubble text
    fontWeight: 'bold',
  },
});

export default Header;
