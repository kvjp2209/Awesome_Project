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
Mapbox.setAccessToken(
  'sk.eyJ1Ijoia3ZqcDIwMDEiLCJhIjoiY2xwa3p3bjB4MDF2bTJzbXFsbngwbGwyZCJ9.6Z1iRMXeuWcX4Gp1q-Ibbw',
);

const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [startCoordinate, setStartCoordinate] = useState(null);
  const [endCoordinate, setEndCoordinate] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (startCoordinate && endCoordinate) {
      const getDirections = async () => {
        const mapboxToken =
          'sk.eyJ1Ijoia3ZqcDIwMDEiLCJhIjoiY2xwa3p3bjB4MDF2bTJzbXFsbngwbGwyZCJ9.6Z1iRMXeuWcX4Gp1q-Ibbw';
        const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${startCoordinate[0]},${startCoordinate[1]};${endCoordinate[0]},${endCoordinate[1]}?geometries=geojson&access_token=${mapboxToken}`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          if (data.routes && data.routes.length > 0) {
            const route = data.routes[0].geometry.coordinates;
            setDirections(route);
          }
        } catch (error) {
          console.error('Error fetching directions:', error);
        }
      };

      getDirections();
    }
  }, [startCoordinate, endCoordinate]);

  const handleMapClick = event => {
    const {geometry} = event;
    setSelectedCoordinate(geometry.coordinates);
    setModalVisible(true);
  };

  const handleSelectCoordinate = (coordinate, isStart) => {
    setModalVisible(false);

    if (isStart) {
      setStartCoordinate(coordinate);
    } else {
      // Chỉ gán điểm đích mới nếu không có điểm start hoặc không giống với điểm start hiện tại
      if (
        !startCoordinate ||
        JSON.stringify(coordinate) !== JSON.stringify(startCoordinate)
      ) {
        setEndCoordinate(coordinate);
      }
    }
  };

  return (
    <View style={styles.page}>
      <Mapbox.MapView
        style={styles.map}
        onPress={handleMapClick}
        zoomEnabled="true">
        <Mapbox.Camera zoomLevel={14} centerCoordinate={currentLocation} />
        <Mapbox.PointAnnotation id="start" coordinate={startCoordinate}>
          <View style={[styles.annotationContainer, {backgroundColor: 'red'}]}>
            <View style={styles.annotationFill} />
          </View>
        </Mapbox.PointAnnotation>
        <Mapbox.PointAnnotation id="end" coordinate={endCoordinate}>
          <View
            style={[styles.annotationContainer, {backgroundColor: 'green'}]}>
            <View style={styles.annotationFill} />
          </View>
        </Mapbox.PointAnnotation>
        {directions && (
          <Mapbox.ShapeSource
            id="routeSource"
            shape={{type: 'LineString', coordinates: directions}}>
            <Mapbox.LineLayer
              id="routeFill"
              style={{lineColor: 'blue', lineWidth: 3}}
            />
          </Mapbox.ShapeSource>
        )}
      </Mapbox.MapView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.inputButton}
              onPress={() => handleSelectCoordinate(selectedCoordinate, true)}>
              <Text>Select Start</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.inputButton}
              onPress={() => handleSelectCoordinate(selectedCoordinate, false)}>
              <Text>Select End</Text>
            </TouchableOpacity>
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
  inputButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
});
