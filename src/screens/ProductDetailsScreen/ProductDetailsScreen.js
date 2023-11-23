import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';

const productDetailsData = {
  1: {
    name: 'Dorothy Perkins',
    type: 'Evening Dress',
    price: 25,
    salePercent: 20,
    rating: 4.5,
    image: require('/Users/nx-tech/Documents/WorkPlace/AwesomeProject/src/Asset/Images/HomeScreen/product_1.png'),
  },
  2: {
    name: 'Sitlly',
    type: 'Sport Dress',
    price: 50,
    salePercent: 30,
    rating: 4.2,
    image: require('/Users/nx-tech/Documents/WorkPlace/AwesomeProject/src/Asset/Images/HomeScreen/product_1.png'),
  },
  3: {
    name: 'Just',
    type: 'Vess Dress',
    price: 40,
    salePercent: 30,
    rating: 4.2,
    image: require('/Users/nx-tech/Documents/WorkPlace/AwesomeProject/src/Asset/Images/HomeScreen/product_1.png'),
  },
};

function ProductDetailsScreen({route}) {
  const {id} = route.params;
  const product = productDetailsData[id];

  const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView>
      <ScrollView style={styles.infoContainer}>
        <Image source={product.image} style={styles.imageStyle} />
        <Text style={styles.nameStyle}>{product.name}</Text>
        <Text style={styles.textStyle}>{product.type}</Text>
        <Text style={styles.textStyle}>{product.price}$</Text>
        <Text style={styles.textStyle}>{product.salePercent}% off</Text>
        <Text style={styles.textStyle}>Rating: {product.rating}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  imageStyle: {
    height: 413,
    width: '100%',
  },
  infoContainer: {},
  nameStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 18,
    marginBottom: 10,
  },
});
