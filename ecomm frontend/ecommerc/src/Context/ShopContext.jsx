import React, { createContext, useEffect, useState } from "react";
//import all_product from "../Components/Assets/all_product";
//import Shop from "../pages/Shop";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  // Cart structure: { "productId_size": quantity }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(
    getDefaultCart()
  ); /*variable and function , function*/

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_Product(data));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/getcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  const addToCart = (itemId, size = null) => {
    const cartKey = size ? `${itemId}_${size}` : `${itemId}_default`;
    setCartItems((prev) => ({ 
      ...prev, 
      [cartKey]: (prev[cartKey] || 0) + 1 
    }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemID: itemId, size: size }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };
  const removeFromCart = (itemId, size = null) => {
    const cartKey = size ? `${itemId}_${size}` : `${itemId}_default`;
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[cartKey] > 1) {
        newCart[cartKey] = newCart[cartKey] - 1;
      } else {
        delete newCart[cartKey];
      }
      return newCart;
    });
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemID: itemId, size: size }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const cartKey in cartItems) {
      if (cartItems[cartKey] > 0) {
        // Extract product ID from cart key (format: "productId_size" or "productId_default")
        const itemId = cartKey.split('_')[0];
        let itemInfo = all_product.find(
          (product) => product.id === Number(itemId)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[cartKey];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  // Helper function to get cart items with size information
  const getCartItemsWithSize = () => {
    const itemsWithSize = [];
    for (const cartKey in cartItems) {
      if (cartItems[cartKey] > 0) {
        const [itemId, size] = cartKey.split('_');
        const product = all_product.find(p => p.id === Number(itemId));
        if (product) {
          itemsWithSize.push({
            product: product,
            quantity: cartItems[cartKey],
            size: size === 'default' ? null : size
          });
        }
      }
    }
    return itemsWithSize;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getCartItemsWithSize,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
