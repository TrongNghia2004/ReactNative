import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import ConfigService from '../service/ConfigService'; // Adjust path as needed
import MapView, { Marker } from 'react-native-maps';

export default function Contact() {
  const [formData, setFormData] = useState({
    site_name: '',
    email: '',
    phone: '',
    address: '',
    hotline: '',
    author: '',
    status: true,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    // Format the phone number (remove non-numeric characters)
    const formattedPhone = formData.phone.replace(/\D/g, '');
    const updatedFormData = { ...formData, phone: formattedPhone };

    try {
      await ConfigService.add(updatedFormData);
      setSuccessMessage('Configuration added successfully!');
      setFormData({
        site_name: '',
        email: '',
        phone: '',
        address: '',
        hotline: '',
        author: '',
        status: true,
      });
    } catch (error) {
      console.error('Error adding configuration:', error);
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Map on top */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.847519,
          longitude: 106.777414,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: 10.847519, longitude: 106.777414 }}
          title="Your Location"
          description="Some description"
        />
      </MapView>

      {/* Form Container */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Add Configuration</Text>
        
        <TextInput
          placeholder="Site Name"
          value={formData.site_name}
          onChangeText={(text) => handleInputChange('site_name', text)}
          style={styles.input}
        />
        
        <TextInput
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          style={styles.input}
          keyboardType="email-address"
        />
        
        <TextInput
          placeholder="Phone"
          value={formData.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
          style={styles.input}
          keyboardType="phone-pad"
        />
        
        <TextInput
          placeholder="Address"
          value={formData.address}
          onChangeText={(text) => handleInputChange('address', text)}
          style={styles.input}
        />
        
        <TextInput
          placeholder="Hotline"
          value={formData.hotline}
          onChangeText={(text) => handleInputChange('hotline', text)}
          style={styles.input}
        />
        
        <TextInput
          placeholder="Author"
          value={formData.author}
          onChangeText={(text) => handleInputChange('author', text)}
          style={styles.input}
        />

        {/* Add Configuration Button */}
        <Button
          title={loading ? 'Adding...' : 'Add Configuration'}
          onPress={handleSubmit}
          disabled={loading}
        />

        {/* Loading indicator */}
        {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />}
        
        {/* Success/Error Messages */}
        {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  map: {
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  loadingIndicator: {
    marginTop: 16,
  },
  successMessage: {
    color: 'green',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
});
