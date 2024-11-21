import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage
import { ApiImage } from '../api/ApiImage';
import OrderService from '../service/OrderService';

function Checkout() {
  const [deliveryMethod, setDeliveryMethod] = useState('MS Delivery');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    const fetchSelectedItems = async () => {
      const items = JSON.parse(await AsyncStorage.getItem('selectedItemsForCheckout')) || [];
      setSelectedItems(items);
    };
    fetchSelectedItems();
  }, []);

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => {
      const price = item.pricesale ? item.pricesale : item.pricebuy;
      return total + price * item.qty;
    }, 0).toFixed(2);
  };

  const handlePayment = async () => {
    try {
      const userId = selectedItems[0]?.user_id;
      const orderItems = selectedItems.map(item => ({
        product_id: item.product_id,
        qty: item.qty,
      }));

      await OrderService.createOrder(userId, userName, userPhone, userEmail, deliveryAddress, note, orderItems);
      setPaymentStatus('Payment successful!');
      setSelectedItems([]);
      await AsyncStorage.removeItem('selectedItemsForCheckout');  // Clear items from AsyncStorage
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('Payment failed. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Order Information</Text>

        <View style={styles.section}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={userName}
            onChangeText={setUserName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={userEmail}
            onChangeText={setUserEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={userPhone}
            onChangeText={setUserPhone}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Delivery Address"
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Note (optional)"
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Total Items ({selectedItems.length})</Text>
          {selectedItems.map((item) => {
            const price = item.pricesale ? item.pricesale : item.pricebuy;
            return (
              <View key={item.product_id} style={styles.item}>
                <Image
                  source={{ uri: `${ApiImage}/images/product/${item.thumbnail}` }}
                  style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.product_name}</Text>
                  <Text style={styles.itemQty}>x{item.qty}</Text>
                </View>
                <Text style={styles.itemPrice}>${(price * item.qty).toFixed(2)}</Text>
              </View>
            );
          })}
          <View style={styles.total}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalPrice}>${calculateTotal()}</Text>
          </View>
        </View>

        <Button title="Proceed to Payment" onPress={handlePayment} color="#007bff" />

        {paymentStatus && (
          <View style={[styles.statusMessage, paymentStatus === 'Payment successful!' ? styles.success : styles.error]}>
            <Text style={styles.statusText}>{paymentStatus}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f0f4f8',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  section: {
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemQty: {
    fontSize: 14,
    color: '#555',
  },
  itemPrice: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007bff',
  },
  statusMessage: {
    marginTop: 16,
    padding: 12,
    borderRadius: 6,
    textAlign: 'center',
  },
  success: {
    backgroundColor: '#e0f9e0',
    borderColor: '#4caf50',
    borderWidth: 1,
  },
  error: {
    backgroundColor: '#f8d7da',
    borderColor: '#f44336',
    borderWidth: 1,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Checkout;
