import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map() {
  const region = {
    latitude: 10.847518989305623, 
    longitude: 106.77741397480592,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={region}
        provider="google"
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: 10.847518989305623,
            longitude: 106.77741397480592,
          }}
          title="Location Title"
          description="Location Description"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Ensures the map fills the container
    borderRadius: 10,
  },
});
