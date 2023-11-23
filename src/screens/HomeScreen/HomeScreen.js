import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const saleClothesData = [
  {
    id: 1,
    name: 'Dorothy Perkins',
    type: 'Evening Dress',
    price: 25,
    salePercent: 20,
    rating: 4.5,
    image: require('/Users/nx-tech/Documents/WorkPlace/AwesomeProject/src/Asset/Images/HomeScreen/product_1.png'),
  },
  {
    id: 2,
    name: 'Sitlly',
    type: 'Sport Dress',
    price: 50,
    salePercent: 30,
    rating: 4.2,
    image: require('/Users/nx-tech/Documents/WorkPlace/AwesomeProject/src/Asset/Images/HomeScreen/product_1.png'),
  },
  {
    id: 3,
    name: 'Just',
    type: 'Vess Dress',
    price: 40,
    salePercent: 30,
    rating: 4.2,
    image: require('/Users/nx-tech/Documents/WorkPlace/AwesomeProject/src/Asset/Images/HomeScreen/product_1.png'),
  },
];

function HomeScreen({navigation}) {
  const handleProductDetails = productId => {
    navigation.navigate('ProductDetailsScreen', {id: productId});
  };

  return (
    <ScrollView>
      <View>
        <Image
          source={require('/Users/nx-tech/Documents/WorkPlace/AwesomeProject/src/Asset/Images/HomeScreen/Main.png')}
          style={styles.bannerImageStyle}
          resizeMode="cover"
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.saleClothesContainerStyle}>
          {saleClothesData.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.saleClothesCardStyle}
              onPress={() => handleProductDetails(item.id)}>
              <Image
                source={item.image}
                resizeMode="cover"
                style={styles.saleClothesImageStyle}
              />
              <View style={styles.saleClothesInfoStyle}>
                <Text style={styles.saleClothesTextStyle}>{item.name}</Text>
                <Text style={styles.saleClothesTypeStyle}>{item.type}</Text>
                <Text style={styles.saleClothesTextStyle}>{item.price}$</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  bannerImageStyle: {
    width: '100%',
  },
  saleClothesContainerStyle: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#1E1F28',
  },
  saleClothesCardStyle: {
    width: 190,
    height: 276,
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  saleClothesImageStyle: {
    width: '100%',
    height: '70%',
  },
  saleClothesInfoStyle: {
    padding: 12,
  },
  saleClothesTypeStyle: {
    fontWeight: 'bold',
    margin: 4,
    color: '#F6F6F6',
    fontSize: 16,
  },
  saleClothesTextStyle: {
    color: '#F6F6F6',
  },
});
