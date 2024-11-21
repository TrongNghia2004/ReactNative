import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function Register() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const navigation = useNavigation();

    const handleAuth = async () => {
        setLoading(true);
        setError('');
        setSuccessMessage(''); // Reset success message before making the request

        if (password !== passwordConfirmation) {
            setError('Password confirmation does not match.');
            setLoading(false);
            return;
        }

        const url = 'http://10.17.11.140:8000/api/user/register';
        const payload = { name, username, email, phone, address, gender, password, password_confirmation: passwordConfirmation };

        try {
            const response = await axios.post(url, payload);
            if (response.status === 201) {
                setSuccessMessage('Registration successful!'); // Show success message
                setTimeout(() => setSuccessMessage(''), 3000); // Hide after 3 seconds
                navigation.navigate('Login');  
            } else {
                setError(response.data.message || 'Error occurred from the API');
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || 'Please try again.';
            setError(`Error occurred: ${errorMsg}`);
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

            <Text style={styles.title}>Register</Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Gender"
                value={gender}
                onChangeText={setGender}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={passwordConfirmation}
                onChangeText={setPasswordConfirmation}
            />

            <TouchableOpacity style={styles.button} onPress={handleAuth} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Register</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: '#F0F4F8',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
        marginBottom: 24,
    },
    errorText: {
        color: '#E74C3C',
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 12,
        backgroundColor: '#FFEBEE',
        padding: 8,
        borderRadius: 4,
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 18,
        marginBottom: 14,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#CED4DA',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
    loginLink: {
        marginTop: 24,
        alignItems: 'center',
    },
    linkText: {
        color: '#007BFF',
        fontSize: 16,
        textDecorationLine: 'underline',
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

export default Register;
