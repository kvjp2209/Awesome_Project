import React, {createContext, useState} from 'react';

const CartContext = createContext();

const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item, quantity) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      // Nếu mặt hàng đã tồn tại trong giỏ hàng, cộng dồn số lượng
      const updatedCart = cartItems.map(cartItem =>
        cartItem.id === item.id
          ? {...cartItem, quantity: cartItem.quantity + quantity}
          : cartItem,
      );
      setCartItems(updatedCart);
    } else {
      // Nếu mặt hàng chưa tồn tại trong giỏ hàng, thêm mới với số lượng hiện tại
      const newItem = {...item, quantity};
      setCartItems([...cartItems, newItem]);
    }
  };

  const reduceFromCart = item => {
    const updatedCart = cartItems.map(cartItem =>
      cartItem.id === item.id
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem,
    );
    setCartItems(updatedCart.filter(cartItem => cartItem.quantity > 0));
  };

  const removeFromCart = item => {
    const updatedCart = cartItems.map(cartItem =>
      cartItem.id === item.id ? {...cartItem, quantity: 0} : cartItem,
    );
    setCartItems(updatedCart.filter(cartItem => cartItem.quantity > 0));
  };

  return (
    <CartContext.Provider
      value={{cartItems, addToCart, removeFromCart, reduceFromCart}}>
      {children}
    </CartContext.Provider>
  );
};

export {CartContext, CartProvider};
