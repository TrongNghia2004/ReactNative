import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from './../service/UserService';

const MyInformation = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const response = await UserService.show(userId);
          if (response) {
            setUserData(response);
            setFormData(response);
          } else {
            setError('User data not found');
          }
        } else {
          setError('User ID not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(userData);
  };

  const handleSave = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) throw new Error('User ID not found.');

      await UserService.update(userId, formData);

      setUserData(formData);
      setIsEditing(false);
      setSuccessMessage('User data updated successfully!');
      Alert.alert('Success', successMessage);
    } catch (error) {
      console.error('Error updating user data:', error);
      setError('Error updating user data');
      Alert.alert('Error', error.message || 'Error updating user data');
    }
  };

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4B9CD3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Information</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      {isEditing ? (
        <View>
          {['name', 'username', 'email', 'phone', 'gender', 'address'].map((field, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field] || ''}
              onChangeText={(value) => handleChange(field, value)}
            />
          ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          {['Name', 'Username', 'Email', 'Phone', 'Gender', 'Address'].map((field, index) => (
            <Text style={styles.infoText} key={index}>
              <Text style={styles.label}>{field}: </Text>
              {userData[field.toLowerCase()]}
            </Text>
          ))}
          <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f6fc',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#4B9CD3',
  },
  input: {
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  infoText: {
    fontSize: 18,
    marginVertical: 6,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    color: '#4B9CD3',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#888',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4B9CD3',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    padding: 14,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default MyInformation;
