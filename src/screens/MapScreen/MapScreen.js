import {
  Modal,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Mapbox from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken(
  'sk.eyJ1Ijoia3ZqcDIwMDEiLCJhIjoiY2xwa3p3bjB4MDF2bTJzbXFsbngwbGwyZCJ9.6Z1iRMXeuWcX4Gp1q-Ibbw',
);

const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [annotationCoordinate, setAnnotationCoordinate] = useState(null);

  const handleMapClick = event => {
    const {geometry} = event;
    setSelectedCoordinate(geometry.coordinates);
    setModalVisible(true);
    setAnnotationCoordinate(geometry.coordinates);
  };

  useEffect(() => {
    const requestLocationPermission = () => {
      Geolocation.requestAuthorization();
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setCurrentLocation([longitude, latitude]);
        },
        error => {
          console.error('Error getting current location:', error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.page}>
      <Mapbox.MapView style={styles.map} onPress={handleMapClick}>
        <Mapbox.Camera zoomLevel={14} centerCoordinate={currentLocation} />
        {currentLocation && (
          <Mapbox.PointAnnotation
            id="marker"
            coordinate={annotationCoordinate || currentLocation}>
            <View style={styles.annotationContainer}>
              <View style={styles.annotationFill} />
            </View>
          </Mapbox.PointAnnotation>
        )}
      </Mapbox.MapView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text>
              Coordinate:{' '}
              {selectedCoordinate ? JSON.stringify(selectedCoordinate) : ''}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    transform: [{scale: 0.6}],
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
});
