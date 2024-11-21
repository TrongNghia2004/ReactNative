import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../asset/images/logo4.png')}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.menuContainer}>
  <MenuItem icon="account" title="My Information" onPress={() => navigation.navigate('MyInformation')} />
  <MenuItem icon="phone" title="Contact" onPress={() => navigation.navigate('Contact')} />
  <MenuItem icon="map-marker" title="Address" onPress={() => navigation.navigate('Map')} />
  <MenuItem icon="lifebuoy" title="Support" onPress={() => navigation.navigate('Support')} />
  <MenuItem icon="cog" title="Settings" onPress={() => navigation.navigate('ForgotPass')} />

      </View>
    </ScrollView>
  );
};

const MenuItem = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={24} color="#4a90e2" style={styles.icon} />
      </View>
      <Text style={styles.menuText}>{title}</Text>
      <Icon name="chevron-right" size={24} color="#c4c4c4" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  header: {
    backgroundColor: '#87ceeb',
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  menuContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: '#e0f3ff',
    borderRadius: 10,
    padding: 8,
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
});

export default Profile;
