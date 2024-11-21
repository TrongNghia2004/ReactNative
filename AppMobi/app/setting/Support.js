import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView, Animated, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Support = () => {
  const [scale, setScale] = useState(new Animated.Value(1)); // Initial scale value
  const moveText = new Animated.Value(300); // Initial position off-screen to the right
  const [address, setAddress] = useState(''); // Address input state

  // Function to handle scaling effect on press
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 1.2, // Scale up the icon
      useNativeDriver: true,
    }).start();
  };

  // Function to reset the scale effect after press
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1, // Reset scale back to original size
      useNativeDriver: true,
    }).start();
  };

  // Start the animation for the "Contact" text when the component is mounted
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        // Move the text from right to left off-screen
        Animated.timing(moveText, {
          toValue: -300, // Move to the left off-screen
          duration: 5000, // Slow down the animation to 5 seconds
          useNativeDriver: true,
        }),
        // Reset position to start from the right again
        Animated.timing(moveText, {
          toValue: 300, // Move it back off-screen to the right
          duration: 0, // No animation time for resetting
          useNativeDriver: true,
        }),
      ])
    );
    animation.start(); // Start the looping animation
  }, []);

  // Function to open Google Maps with the entered address
  const openMapWithAddress = () => {
    const encodedAddress = encodeURIComponent(address); // Encode the address
    const url = `https://www.google.com/maps?q=${encodedAddress}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {/* Animated Contact Title */}
      <Animated.View style={[styles.titleContainer, { transform: [{ translateX: moveText }, { scale }] }]}>
        <Text style={styles.title}>Support</Text>
      </Animated.View>

      <View style={styles.iconsContainer}>
        {/* Facebook Icon */}
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => Linking.openURL('https://www.facebook.com/trongnghia.luong.7543/')}
          style={styles.icon}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <Ionicons name="logo-facebook" size={100} color="#3b5998" />
          </Animated.View>
        </TouchableOpacity>

        {/* Instagram Icon */}
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => Linking.openURL('https://www.instagram.com/_trongnghia_203/')}
          style={styles.icon}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <Ionicons name="logo-instagram" size={100} color="#e1306c" />
          </Animated.View>
        </TouchableOpacity>

        {/* Zalo Icon */}
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => Linking.openURL('https://zalo.me/0901399485')}
          style={styles.icon}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <Ionicons name="logo-whatsapp" size={100} color="#25d366" />
          </Animated.View>
        </TouchableOpacity>

        {/* Phone Call Icon */}
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => Linking.openURL('tel:0901399485')}
          style={styles.icon}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <Ionicons name="call" size={100} color="#4CAF50" />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Address Input Field */}
      <View style={styles.addressContainer}>
        <TextInput
          style={styles.addressInput}
          placeholder="Enter an address"
          value={address}
          onChangeText={setAddress}
        />
        <TouchableOpacity onPress={openMapWithAddress} style={styles.mapButton}>
          <Text style={styles.mapButtonText}>Open in Google Maps</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fafafa', // Light background color for better contrast
    flex: 1,
    alignItems: 'center', // Center content horizontally
  },
  title: {
    fontSize: 36, // Increased font size for better visibility
    fontWeight: '700', // Bold font weight for emphasis
    color: '#333', // Dark text color
    textAlign: 'center', // Centers the title
    textShadowColor: '#bbb', // Subtle shadow for text
    textShadowOffset: { width: 2, height: 2 }, // Slight shadow offset
    textShadowRadius: 5, // Shadow blur radius
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30, // Increased margin to separate from icons
  },
  scrollViewContainer: {
    flexGrow: 1, // Ensures that content can scroll if necessary
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  iconsContainer: {
    flexDirection: 'column', // Stacks icons vertically
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%', // Keeps width limited
    marginBottom: 50, // Adds bottom margin for spacing
  },
  icon: {
    padding: 20, // Adjusted padding for better tap area
    borderRadius: 60, // Increased circular border radius for better rounded corners
    backgroundColor: '#fff', // White background to make icons pop
    marginVertical: 25, // Adds more spacing between icons
    elevation: 10, // Stronger shadow effect for depth on Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow intensity
    shadowRadius: 6, // Shadow blur radius
    transition: 'transform 0.2s ease-in-out', // Smooth scale transition
  },
  addressContainer: {
    marginTop: 30,
    width: '80%', // Limit width of input
    alignItems: 'center', // Center the input and button
  },
  addressInput: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  mapButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Support;
