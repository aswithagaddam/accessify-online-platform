import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { useNavigate } from 'react-router-dom'
const CartItems = () => {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart,getCartItemsWithSize}=useContext(ShopContext);
    const navigate = useNavigate();
    const cartItemsWithSize = getCartItemsWithSize();

    const handleCheckout = () => {
      if (getTotalCartAmount() === 0) {
        alert('Your cart is empty. Add items before proceeding to checkout.');
        return;
      }
      alert('Thank you! Your order has been placed successfully.');
      navigate('/');
    };

  return (
    <div className='cartitems'>
       <div className="cartitems-format-main">
         <p>Products</p>
         <p>Title</p>
         <p>Size</p>
         <p>Price</p>
         <p>Quantity</p>
         <p>Total</p>
         <p>Remove</p>
       </div>
       <hr/>
       {cartItemsWithSize.length === 0 ? (
         <div className="cartitems-empty">
           <p>Your cart is empty. Add some products to get started!</p>
         </div>
       ) : (
         cartItemsWithSize.map((item, index)=>{
            return <div key={index}>
            <div className="cartitems-format cartitems-format-main">
                <img src={item.product.image} alt="" className="carticon-product-icon" />
                <p>{item.product.name}</p>
                <p className="cartitems-size">{item.size || 'N/A'}</p>
                <p>${item.product.new_price}</p>
                <button className='cartitems-quantity'>{item.quantity}</button>
                <p>${item.product.new_price * item.quantity}</p>
                <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(item.product.id, item.size || null)}} alt="" />
            </div>
            <hr/>
            </div>
       })
       )}
       <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>SubTotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr/>
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr/>
                <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>${getTotalCartAmount()}</h3>
                </div>
            </div>
            <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
            <p>If you have a promo code , Enter it here</p>
            <div className="cartitems-promobox">
                <input type="text" placeholder='promo code'></input>
                <button>Submit</button>
            </div>
        </div>
       </div>

    </div>
  )
}

export default CartItems