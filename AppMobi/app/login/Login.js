import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from '../service/UserService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');  // State for success message
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMessage('Please enter your email and password.');
            return;
        }

        setLoading(true);

        try {
            const response = await UserService.login({ email, password });
            const { token, user } = response;
            const { id: userId, name } = user;

            await AsyncStorage.setItem('authToken', token);
            await AsyncStorage.setItem('userId', userId.toString());
            await AsyncStorage.setItem('name', name);
            
            setSuccessMessage('Login successful!');  // Show success message
            setTimeout(() => setSuccessMessage(''), 3000);  // Hide after 3 seconds
            
            Alert.alert("Login successful");
            navigation.navigate('HomeScreen');
        } catch (error) {
            setErrorMessage('Login failed. Please check your credentials.');
            console.error('Error logging in:', error);
            Alert.alert("Login Failed", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {successMessage ? (
                <View style={styles.successMessage}>
                    <Text style={styles.successMessageText}>{successMessage}</Text>
                </View>
            ) : null}

            <Text style={styles.title}>Welcome Back</Text>

            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity
                style={[styles.button, loading ? styles.buttonDisabled : null]}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.signUp} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkText}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 32,
        backgroundColor: '#E8EEF1',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#34495E',
        textAlign: 'center',
        marginBottom: 24,
    },
    input: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 12,
        borderColor: '#BDC3C7',
        borderWidth: 1,
        marginBottom: 16,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    error: {
        color: '#E74C3C',
        textAlign: 'center',
        marginBottom: 12,
        fontSize: 14,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    linkText: {
        color: '#007AFF',
        textDecorationLine: 'underline',
        fontSize: 16,
    },
    signUp: {
        marginTop: 20,
        alignItems: 'center',
    },
    successMessage: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    successMessageText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Login;
