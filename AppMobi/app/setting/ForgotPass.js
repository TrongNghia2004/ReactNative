import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const ForgetPass = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu mới và xác nhận mật khẩu không khớp!');
      return;
    }

    setLoading(true);
    const token = await AsyncStorage.getItem('authToken');
    const userId = await AsyncStorage.getItem('userId');

    if (!token || !userId) {
      Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng!');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        `http://10.17.11.140:8000/api/user/change-password/${userId}`,
        {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('Thành công', 'Đổi mật khẩu thành công!');
      navigation.goBack();
    } catch (error) {
      console.log('Lỗi khi đổi mật khẩu:', error.response?.data || error.message);
      Alert.alert('Lỗi', error.response?.data.message || 'Lỗi khi đổi mật khẩu!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Nút quay lại trang trước */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Đổi Mật Khẩu</Text>

      <TextInput
        value={currentPassword}
        onChangeText={setCurrentPassword}
        placeholder="Mật khẩu hiện tại"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="Mật khẩu mới"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Xác nhận mật khẩu"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#A9A9A9"
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleChangePassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Đổi mật khẩu</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',  // Nền sáng, thanh thoát
    paddingHorizontal: 40,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 12,
    zIndex: 1,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',  // Màu chữ chính
    fontFamily: 'System',  // Phông chữ đẹp và dễ đọc
  },
  input: {
    height: 55,
    borderColor: '#ddd',
    borderWidth: 1.5,
    borderRadius: 30,
    marginBottom: 20,
    paddingLeft: 20,
    fontSize: 16,
    color: '#333',
    width: '100%',
    backgroundColor: '#fff',  // Nền trắng cho ô input
    elevation: 2,  // Bóng đổ nhẹ cho ô input
  },
  inputFocus: {
    borderColor: '#0066cc',  // Màu sắc khi ô input được chọn
  },
  button: {
    backgroundColor: '#0066cc',  // Màu xanh biển đẹp mắt cho nút
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
    elevation: 6,  // Bóng đổ nổi bật
    shadowColor: '#0066cc', // Bóng đổ màu xanh
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: '#B0B0B0',  // Màu xám khi nút bị disable
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForgetPass;
