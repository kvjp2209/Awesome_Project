import {
  useFocusEffect,
  useNavigation,
  useScrollToTop,
} from '@react-navigation/native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {CartContext} from '../../Context/CartContext';

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
const productDetailsData = {
  1: {
    id: 1,
    name: 'Dorothy Perkins',
    type: 'Evening Dress',
    price: 25,
    salePercent: 20,
    rating: 4.5,
    image: require('/Users/nx-tech/Documents/WorkPlace/AwesomeProject/src/Asset/Images/HomeScreen/product_1.png'),
    description:
      'Short dress in soft cotton jersey with decorative buttons down the front and a wide, frill-trimmed square neckline with concealed elastication. Elasticated seam under the bust and short puff sleeves with a small frill trim.',
  },
  2: {
    id: 2,
    name: 'Sitlly',
    type: 'Sport Dress',
    price: 50,
    salePercent: 30,
    rating: 4.2,
    image: require('/Users/nx-tech/Documents/WorkPlace/AwesomeProject/src/Asset/Images/HomeScreen/product_1.png'),
    description:
      'Short dress in soft cotton jersey with decorative buttons down the front and a wide, frill-trimmed square neckline with concealed elastication. Elasticated seam under the bust and short puff sleeves with a small frill trim.',
  },
  3: {
    id: 3,
    name: 'Just',
    type: 'Vess Dress',
    price: 40,
    salePercent: 30,
    rating: 4.2,
    image: require('/Users/nx-tech/Documents/WorkPlace/AwesomeProject/src/Asset/Images/HomeScreen/product_1.png'),
    description:
      'Short dress in soft cotton jersey with decorative buttons down the front and a wide, frill-trimmed square neckline with concealed elastication. Elasticated seam under the bust and short puff sleeves with a small frill trim.',
  },
};

const sizeOptions = ['S', 'M', 'L', 'XL']; // Available size options
const colorOptions = ['Red', 'Blue', 'Green', 'Yellow']; // Available color options

function ProductDetailsScreen({route}) {
  const {id} = route.params;
  const product = productDetailsData[id];
  const scrollViewRef = useRef(null);
  const {addToCart} = useContext(CartContext);
  const [quantity, setQuantity] = useState('1');

  const handleAddToCart = () => {
    const parsedQuantity = parseInt(quantity, 10);
    addToCart(product, parsedQuantity);
    toggleQuantityModal();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      scrollToTop();
    });

    return unsubscribe;
  }, []);

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
    }
  };

  const [isSizeModalVisible, setIsSizeModalVisible] = useState(false);
  const [isColorModalVisible, setIsColorModalVisible] = useState(false);
  const [isQuantityModalVisible, setIsQuantityModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const navigation = useNavigation();

  const toggleSizeModal = () => {
    setIsSizeModalVisible(!isSizeModalVisible);
  };

  const toggleColorModal = () => {
    setIsColorModalVisible(!isColorModalVisible);
  };

  const toggleQuantityModal = () => {
    setIsQuantityModalVisible(!isQuantityModalVisible);
  };

  const handleSizeSelection = size => {
    setSelectedSize(size);
    toggleSizeModal();
  };

  const handleColorSelection = color => {
    setSelectedColor(color);
    toggleColorModal();
  };

  const handleProductDetails = productId => {
    console.log('a');
    navigation.navigate('ProductDetailsScreen', {id: productId});
  };
  const renderRatingStars = rating => {
    const totalStars = 5; // Tổng số sao
    const fullStars = Math.floor(rating); // Số sao đầy
    const halfStars = rating - fullStars >= 0.5 ? 1 : 0; // Số sao nửa
    const emptyStars = totalStars - fullStars - halfStars; // Số sao trống

    const stars = [];

    // Tạo các sao đầy
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Image
          key={`star-${i}`}
          source={require('/Users/nx-tech/Documents/WorkPlace/AwesomeProject/src/Asset/Images/star.png')}
          style={styles.starIcon}
        />,
      );
    }

    // Tạo các sao nửa
    if (halfStars > 0) {
      stars.push(
        <Image
          key={`star-half`}
          source={require('/Users/nx-tech/Documents/WorkPlace/AwesomeProject/src/Asset/Images/star.png')}
          style={styles.starIcon}
        />,
      );
    }

    // Tạo các sao trống
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Image
          key={`star-empty-${i}`}
          source={require('/Users/nx-tech/Documents/WorkPlace/AwesomeProject/src/Asset/Images/emptyStar.png')}
          style={styles.starIcon}
        />,
      );
    }

    return stars;
  };

  return (
    <SafeAreaView>
      <ScrollView
        ref={scrollViewRef}
        style={{
          backgroundColor: '#1E1F28',
        }}>
        <Image source={product.image} style={styles.imageStyle} />

        <View style={styles.infoContainer}>
          <View style={styles.optionBarStyle}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={toggleSizeModal}>
              <Text style={styles.dropdownButtonText}>
                {selectedSize ? selectedSize : 'Select Size'}
              </Text>
              <Icon name="chevron-down" size={20} color="#F6F6F6" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={toggleColorModal}>
              <Text style={styles.dropdownButtonText}>
                {selectedColor ? selectedColor : 'Select Color'}
              </Text>
              <Icon name="chevron-down" size={20} color="#F6F6F6" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('/Users/nx-tech/Documents/WorkPlace/AwesomeProject/src/Asset/Images/love.png')}
                style={styles.loveButtonStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.nameAndPriceStyle}>{product.name}</Text>
            <Text style={styles.nameAndPriceStyle}>${product.price}</Text>
          </View>

          <Text style={styles.typeStyle}>{product.type}</Text>
          <Text style={styles.ratingStyle}>
            {renderRatingStars(product.rating)} ({product.rating})
          </Text>

          <View style={{width: 343}}>
            <Text style={styles.descriptionStyle}>{product.description}</Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.addToCartButtonStyle}
              onPress={toggleQuantityModal}>
              <Text style={styles.addToCartTextStyle}>ADD TO CART</Text>
            </TouchableOpacity>
          </View>
          <Modal
            visible={isQuantityModalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={toggleQuantityModal}>
            <TouchableWithoutFeedback onPress={toggleQuantityModal}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Select Quantity</Text>
                  <TextInput
                    style={styles.quantityInput}
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity
                    onPress={handleAddToCart}
                    style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>CONFIRM</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <Modal
            visible={isSizeModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={toggleSizeModal}>
            <TouchableWithoutFeedback onPress={toggleSizeModal}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Select Size</Text>
                  {sizeOptions.map(size => (
                    <TouchableOpacity
                      key={size}
                      style={styles.sizeOption}
                      onPress={() => handleSizeSelection(size)}>
                      <Text style={styles.sizeOptionText}>{size}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <Modal
            visible={isColorModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={toggleColorModal}>
            <TouchableWithoutFeedback onPress={toggleColorModal}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Select Color</Text>
                  {colorOptions.map(color => (
                    <TouchableOpacity
                      key={color}
                      style={styles.sizeOption}
                      onPress={() => handleColorSelection(color)}>
                      <Text style={styles.sizeOptionText}>{color}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
        <View>
          <TouchableOpacity style={styles.shippingInfoStyle}>
            <Text style={styles.shippingInfoText}>Shipping Info</Text>
            <Icon name="chevron-right" size={20} color="#F6F6F6" />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.supportButtonStyle}>
            <Text style={styles.supportButtonText}>Support</Text>
            <Icon name="chevron-right" size={20} color="#F6F6F6" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 16,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: '#F6F6F6',
              fontFamily: 'Metropolis',
              fontSize: 18,
              fontWeight: 400,
              lineHeight: 22,
            }}>
            You can also like this
          </Text>
          <Text style={{color: '#F6F6F6'}}>See All (12)</Text>
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
    </SafeAreaView>
  );
}

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  imageStyle: {
    height: 413,
    width: '100%',
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  nameAndPriceStyle: {
    color: '#F6F6F6',
    fontFamily: 'Metropolis',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: 400,
  },
  typeStyle: {
    color: '#ABB4BD',
    fontFamily: 'Metropolis',
    fontSize: 11,
    fontStyle: 'normal',
    fontWeight: 400,
    paddingBottom: 10,
  },
  ratingStyle: {
    color: '#ABB4BD',
    fontFamily: 'Metropolis',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 8,
  },
  descriptionStyle: {
    color: '#F5F5F5',
    fontFamily: 'Metropolis',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
    letterSpacing: -0.15,
    paddingTop: 15,
  },
  dropdownButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#1E1F28',
    borderRadius: 5,
    borderColor: '#F6F6F6',
    borderWidth: 1,
    width: 138,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownButtonText: {
    color: '#F6F6F6',
    fontFamily: 'Metropolis',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#2A2C36',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  sizeOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sizeOptionText: {
    fontSize: 18,
  },
  optionBarStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 138,
    height: 40,
    paddingVertical: 10,
  },
  addToCartButtonStyle: {
    width: 343,
    height: 48,
    flexShrink: 0,
    borderRadius: 25,
    backgroundColor: '#EF3651',
    boxShadow: '0px 4px 8px 0px rgba(239, 54, 81, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  addToCartTextStyle: {
    color: '#F5F5F5',
    textAlign: 'center',
    fontFamily: 'Metropolis',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 20,
  },
  starIcon: {
    width: 14,
    height: 14,
  },
  loveButtonStyle: {
    width: 30,
    height: 30,
    flexShrink: 0,
    paddingTop: 20,
    marginTop: 10,
  },
  shippingInfoStyle: {
    height: 49,
    borderTopColor: '#F6F6F6',
    borderTopWidth: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  shippingInfoText: {
    color: '#F6F6F6',
    fontFamily: 'Metropolis',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
  },
  supportButtonStyle: {
    height: 49,
    borderTopColor: '#F6F6F6',
    borderTopWidth: 0.4,
    borderBottomColor: '#F6F6F6',
    borderBottomWidth: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  supportButtonText: {
    color: '#F6F6F6',
    fontFamily: 'Metropolis',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
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
  quantityInput: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
    height: 50,
    fontSize: 20,
    color: 'white',
  },
  confirmButton: {
    width: 200,
    height: 48,
    flexShrink: 0,
    borderRadius: 25,
    backgroundColor: '#EF3651',
    boxShadow: '0px 4px 8px 0px rgba(239, 54, 81, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
