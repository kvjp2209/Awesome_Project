import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
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

  const [totalPrice, setTotalPrice] = useState(0); // Khởi tạo giá trị ban đầu của totalPrice

  const {cartItems, addToCart, removeFromCart, reduceFromCart} =
    useContext(CartContext);
  const [couponCode, setCouponCode] = useState('');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [selectedCouponCode, setSelectedCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);

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
    setSelectedCouponCode(code);

    // Kiểm tra xem đoạn văn bản có tương đương với một mã coupon trong danh sách không
    const equivalentCoupon = couponList.find(
      coupon => coupon.code.toLowerCase() === code.toLowerCase(),
    );

    if (equivalentCoupon) {
      setSelectedCoupon(equivalentCoupon.code);
    } else {
      setSelectedCoupon(null);
    }
  };

  const handleApplyCoupon = () => {
    // Kiểm tra nếu coupon đã được áp dụng, không làm gì cả
    if (isCouponApplied) {
      return;
    }

    const selectedCoupon = couponList.find(
      coupon => coupon.code.toLowerCase() === selectedCouponCode.toLowerCase(),
    );

    if (selectedCoupon) {
      const discountedPrice =
        getTotalPrice() * (1 - selectedCoupon.discount / 100);
      setTotalPrice(discountedPrice.toFixed(2));
      setSelectedCoupon(selectedCoupon.code);
      setIsCouponApplied(true); // Đặt biến isCouponApplied thành true sau khi áp dụng coupon
    } else {
      setTotalPrice(getTotalPrice());
      setSelectedCoupon(null);
    }
  };

  // Hàm xử lý khi huỷ áp dụng coupon
  const handleCancelCoupon = () => {
    setTotalPrice(getTotalPrice()); // Đặt lại giá trị tổng tiền về giá gốc
    setSelectedCoupon(null); // Đặt lại mã coupon đã chọn về null
    setIsCouponApplied(false); // Đặt lại trạng thái áp dụng coupon về false
    setCouponCode(''); // Đặt lại giá trị trong TextInput về rỗng (nếu muốn)
  };

  const handleSelectCoupon = couponCode => {
    const selectedCoupon = couponList.find(
      coupon => coupon.code === couponCode,
    );

    if (selectedCoupon) {
      setSelectedCouponCode(selectedCoupon.code); // Cập nhật mã coupon đã chọn vào state
      setSelectedCoupon(selectedCoupon.code); // Cập nhật mã coupon đã chọn
      // Cập nhật giá trị của TextInput mã coupon
      setCouponCode(selectedCoupon.code);
    }
  };

  const handleApplyCouponFromInput = () => {
    // Kiểm tra xem mã coupon trong TextInput có trùng với mã nào trong danh sách không
    const couponFromInput = couponList.find(
      coupon => coupon.code.toLowerCase() === couponCode.toLowerCase(),
    );

    if (couponFromInput) {
      const discountedPrice =
        getTotalPrice() * (1 - couponFromInput.discount / 100);
      setTotalPrice(discountedPrice.toFixed(2));
      setSelectedCoupon(couponFromInput.code);
      setIsCouponApplied(true); // Đặt biến isCouponApplied thành true sau khi áp dụng coupon
    } else {
      // Nếu không tìm thấy mã coupon, có thể hiển thị thông báo lỗi hoặc xử lý phù hợp
      // ở đây tôi sẽ không thực hiện gì cả
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
            value={couponCode} // Sử dụng giá trị từ state thay vì selectedCouponCode
            editable={true}
            onSubmitEditing={handleApplyCouponFromInput} // Xử lý khi người dùng nhấn nút "Apply" trên bàn phím
          />
          <TouchableOpacity
            style={[
              styles.applyButton,
              (isCouponApplied && styles.disabledButton) ||
                (!isCouponApplied && styles.activeButton),
            ]}
            onPress={isCouponApplied ? handleCancelCoupon : handleApplyCoupon}>
            <Text style={styles.applyButtonText}>
              {isCouponApplied ? 'Cancel' : 'Apply'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.couponListContainer}>
          {couponList.map((coupon, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.couponItem,
                selectedCoupon === coupon.code && styles.selectedCouponItem,
              ]}
              onPress={() => handleSelectCoupon(coupon.code)}>
              <Text style={styles.couponCode}>{coupon.code}</Text>
              <Text style={styles.couponDiscount}>-{coupon.discount}%</Text>
            </TouchableOpacity>
          ))}
        </View>
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
});

export default MyBagScreen;
