import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken(
  'sk.eyJ1Ijoia3ZqcDIwMDEiLCJhIjoiY2xwa3p3bjB4MDF2bTJzbXFsbngwbGwyZCJ9.6Z1iRMXeuWcX4Gp1q-Ibbw',
);

const MapScreen = () => {
  return (
    <View style={styles.page}>
      <Mapbox.MapView style={styles.map} />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  page: {
    borderWidth: 5,
    borderColor: 'red',
    flex: 1,
  },
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
});
