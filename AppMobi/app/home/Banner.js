import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import BannerService from './../service/BannerService';
import { ApiImage } from '../api/ApiImage';

const Slideshow = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const windowWidth = Dimensions.get('window').width; // Lấy chiều rộng màn hình
  const slideHeight = 200; // Chiều cao cố định cho slideshow

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const result = await BannerService.getList();
        const filteredSlides = result.banners.filter(banner =>
          banner.position === 'slideshow' && banner.status === 1
        );
        setSlides(filteredSlides);
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides]);

  return (
    <View style={styles.container}>
      <View style={[styles.slideshow, { width: windowWidth, height: slideHeight, transform: [{ translateX: -currentSlide * windowWidth }] }]}>
        {slides.length > 0 ? (
          slides.map((slide, index) => (
            <View style={styles.slide} key={index}>
              {slide.image && (
                <Image
                  source={{ uri: `${ApiImage}/images/banner/${slide.image}` }}
                  style={styles.image}
                  resizeMode="cover"
                />
              )}
            </View>
          ))
        ) : (
          <View style={styles.center}>
            <Text>No slides available.</Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={[styles.button, styles.leftButton]}
        onPress={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
      >
        <Text style={styles.buttonText}>‹</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.rightButton]}
        onPress={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
      >
        <Text style={styles.buttonText}>›</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    marginBottom:10,
  },
  slideshow: {
    flexDirection: 'row',
    transition: 'transform 0.5s ease-in-out',
  },
  slide: {
    width: Dimensions.get('window').width,
    height: '100%', // Chiều cao được xác định trong slideshow
  },
  image: {
    width: '100%',
    height: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    top: '60%', // Căn giữa theo chiều dọc
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  leftButton: {
    left: 20,
    transform: [{ translateY: -50 }], // Căn giữa nút
  },
  rightButton: {
    right: 20,
    transform: [{ translateY: -50 }], // Căn giữa nút
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Slideshow;
