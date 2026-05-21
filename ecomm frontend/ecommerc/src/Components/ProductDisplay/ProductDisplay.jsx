import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
    const {product}=props;
    console.log('Product:', product);
    const{addToCart}=useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState(null);

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className='productdisplay'>
        <div className='productdisplay-left'>
            <div className='productdisplay-img-list'>
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className='productdisplay-img'>
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
        </div>
        <div className='productdisplay-right'>
            <h1>{product.name}</h1>
           <div className='productdisplay-right-stars'>
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>{122}</p>
           </div>
           <div className="productdisplay-right-prices">
               <div className="productdisplay-right-price-old">
                  ${product.old_price}
               </div>
               <div className="productdisplay-right-price-new">
                  ${product.new_price}
               </div>
           </div>
           <div className="productdisplay-right-description">
           A lightweight, usually knitted, pullover shirt, close-fitting and a round neckline and short sleeves, worn as an undershirt or outer garment.
           </div>
           <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-sizes">
                    {sizes.map((size) => (
                      <div
                        key={size}
                        className={selectedSize === size ? 'selected' : ''}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </div>
                    ))}
                </div>            
           </div>
           <button onClick={()=>{
             if (!selectedSize) {
               alert('Please select a size before adding to cart');
               return;
             }
             addToCart(product.id, selectedSize);
             alert(`Added ${product.name} (Size: ${selectedSize}) to cart!`);
           }}>ADD TO CART</button>
           <p className='productdisplay-right-category'><span>Category : </span>Women , T-Shirt , Crop Top</p>
        <p className='productdisplay-right-category'><span>Tags : </span>Modern, Latest</p>
        <br /><br /><br /><br /><br /><br />
        </div>
        <hr/>
    </div>
  )
}

export default ProductDisplay