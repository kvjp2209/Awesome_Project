import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {CartContext} from '../../Context/CartContext';

const MyBagScreen = () => {
  const [couponList, setCouponList] = useState([
    {code: 'SALE10', discount: 10},
    {code: 'SALE20', discount: 20},
    {code: 'SALE30', discount: 30},
  ]);

  const [totalPrice, setTotalPrice] = useState(0);
  const {cartItems, addToCart, removeFromCart, reduceFromCart} =
    useContext(CartContext);
  const [couponCode, setCouponCode] = useState('');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [showCouponOptions, setShowCouponOptions] = useState(false);
  const bottomSheetRef = useRef(null);

  const addQuantityToCart = item => {
    addToCart(item, 1);
  };

  const removeQuantityFromCart = item => {
    removeFromCart(item);
  };

  const reduceQuantityFromCart = item => {
    reduceFromCart(item);
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0,
      )
      .toFixed(2);
  };

  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [cartItems]);

  const handleCheckOut = () => {
    console.log('Checking out...: ' + totalPrice);
  };

  const handleCouponCodeChange = code => {
    setCouponCode(code);
    setSelectedCoupon(null);
  };

  const applyCoupon = couponCode => {
    const selectedCoupon = couponList.find(
      coupon => coupon.code.toLowerCase() === couponCode.toLowerCase(),
    );
    if (selectedCoupon) {
      const discountedPrice =
        getTotalPrice() * (1 - selectedCoupon.discount / 100);
      setTotalPrice(discountedPrice.toFixed(2));
      setSelectedCoupon(selectedCoupon.code);
      setIsCouponApplied(true);
    } else {
      setTotalPrice(getTotalPrice());
      setSelectedCoupon(null);
    }
  };

  const handleApplyCouponFromInput = () => {
    if (isCouponApplied) {
      console.log('cancel');
      setTotalPrice(getTotalPrice());
      setSelectedCoupon(null);
      setIsCouponApplied(false);
      setCouponCode('');
    } else {
      console.log('applied');
      applyCoupon(couponCode);
    }
  };

  const handleApplyCouponFromList = couponCode => {
    if (isCouponApplied) {
      console.log('cancel');
      setTotalPrice(getTotalPrice());
      setSelectedCoupon(null);
      setIsCouponApplied(false);
      setCouponCode('');
    } else {
      console.log('applied');
      applyCoupon(couponCode);
    }
  };

  const renderCartItem = ({item}) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.imageStyle} />
      <View style={styles.itemDetails}>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>${item.price}</Text>
        <Text style={styles.text}>Color: {item.color}</Text>
        <Text style={styles.text}>Size: {item.size}</Text>
        <View style={styles.quantityContainer}>
          <Button
            title="-"
            onPress={() => reduceQuantityFromCart(item)}
            disabled={item.quantity === 1} // Vô hiệu hóa nút khi số lượng là 1
          />
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <Button title="+" onPress={() => addQuantityToCart(item)} />
        </View>
      </View>
      <Button title="Remove" onPress={() => removeQuantityFromCart(item)} />
    </View>
  );

  const renderCouponOptions = () => {
    return (
      <BottomSheetScrollView>
        {couponList.map((coupon, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.couponOption,
              selectedCoupon === coupon.code && styles.selectedCouponItem,
            ]}
            onPress={() => handleApplyCouponFromList(coupon.code)}>
            <Text style={styles.couponCode}>{coupon.code}</Text>
            <Text style={styles.couponDiscount}>{`-${coupon.discount}%`}</Text>
          </TouchableOpacity>
        ))}
      </BottomSheetScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingHorizontal: 16, flex: 1}}>
        <Text style={styles.title}>My Bag</Text>
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={item => item.id}
        />
        <View style={styles.couponContainer}>
          <TextInput
            style={styles.couponInput}
            placeholder="Enter coupon code"
            onChangeText={handleCouponCodeChange}
            value={couponCode}
            editable={true}
            onFocus={() => setShowCouponOptions(true)} // Hiển thị danh sách khi tương tác với TextInput
            onBlur={() => setShowCouponOptions(false)} // Ẩn danh sách khi mất focus khỏi TextInput
            onSubmitEditing={handleApplyCouponFromInput}
          />
          <TouchableOpacity
            style={[
              styles.applyButton,
              (isCouponApplied && styles.disabledButton) ||
                (!isCouponApplied && styles.activeButton),
            ]}
            onPress={() => handleApplyCouponFromInput()}>
            <Text style={styles.applyButtonText}>
              {isCouponApplied ? 'Cancel' : 'Apply'}
            </Text>
          </TouchableOpacity>
        </View>
        {showCouponOptions && (
          <View style={styles.couponListContainer}>
            {couponList.map((coupon, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  defaultCouponItem,
                  selectedCoupon === coupon.code
                    ? styles.selectedCouponItem
                    : null,
                ]}
                onPress={() => handleApplyCouponFromList(coupon.code)}>
                <Text style={styles.couponCode}>{coupon.code}</Text>
                <Text style={styles.couponDiscount}>-{coupon.discount}%</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>
            Total Price: ${totalPrice}{' '}
            {selectedCoupon && `(Discount applied: ${selectedCoupon})`}
          </Text>
          <TouchableOpacity
            style={styles.addToCartButtonStyle}
            onPress={handleCheckOut}>
            <Text style={styles.text}>CHECK OUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const defaultCouponItem = {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 8,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Metropolis',
    fontSize: 34,
    fontWeight: 'bold',
    color: '#F6F6F6',
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#2A2C36',
    boxShadow: '0 1 25 0 rgba(0, 0, 0, 0.08)',
  },
  imageStyle: {
    width: 80,
    height: 100,
  },
  itemDetails: {
    flex: 1,
    padding: 11,
  },
  addToCartButtonStyle: {
    width: 343,
    height: 48,
    borderRadius: 25,
    backgroundColor: '#EF3651',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    color: '#F6F6F6',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityText: {
    marginHorizontal: 8,
    color: '#F6F6F6',
    fontFamily: 'Metropolis',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 20,
  },
  totalPriceContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F6F6F6',
  },
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  couponInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    fontSize: 16,
    color: '#333333',
  },
  applyButton: {
    backgroundColor: '#EF3651',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  applyButtonText: {
    color: '#F6F6F6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  couponListContainer: {
    marginTop: 16,
    backgroundColor: '#2A2C36',
  },
  couponItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  selectedCouponItem: {
    backgroundColor: '#F6F6F6',
  },
  couponCode: {
    marginRight: 8,
    fontWeight: 'bold',
  },
  couponDiscount: {
    fontWeight: 'bold',
    color: '#EF3651',
  },
  activeButton: {
    backgroundColor: '#EF3651',
  },
  disabledButton: {
    backgroundColor: '#D3D3D3',
  },
  defaultCouponItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  couponOptionsContainer: {
    backgroundColor: '#FFF',
    position: 'absolute',
    top: 60, // Thay đổi khoảng cách từ TextInput đến danh sách tùy theo layout
    left: 16,
    width: '90%',
    borderRadius: 8,
    elevation: 5, // Hiệu ứng shadow
    zIndex: 1000, // Đảm bảo danh sách coupon hiển thị trên các thành phần khác
  },
  couponOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
});

export default MyBagScreen;
