import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "@/redux/cart/cart.slice";
import { showToast } from "@/helpers/showToast";
import { RouteCart, RouteAddress } from "@/helpers/RouteName";
import styles from "./FarmProduct.module.css";

const FarmProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);
  const [farmProducts, setFarmProducts] = useState([]);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/farmerProducts/products`);
        const data = await res.json();
        setFarmProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Handle Add to Cart
  const handleAddToCart = async (product) => {
    if (!user?._id) {
      showToast("error", "Please login to add items to cart!");
      return;
    }

    try {
      await dispatch(
        addToCart({
          userId: user._id,
          product: {
            productId: product._id,
            name: product.productName,
            price: product.price,
            image: product.image ? `${API_BASE}${product.image}` : "/placeholder.png",
            unit: product.unit || "unit",
          },
        })
      ).unwrap();

      showToast("success", `${product.productName} added to cart!`);
      navigate(RouteCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("error", "Failed to add item to cart. Please try again.");
    }
  };

  // ✅ Handle Buy Now
  const handleBuyNow = async (product) => {
    if (!user?._id) {
      showToast("error", "Please login first!");
      return;
    }

    // Store product data in localStorage for checkout flow
    // Mark it as a farmer product so we can delete it after order
    const productData = {
      productId: product._id,
      _id: product._id,
      name: product.productName,
      price: product.price,
      image: product.image ? `${API_BASE}${product.image}` : "/placeholder.png",
      unit: product.unit || "unit",
      isFarmerProduct: true, // Flag to identify farmer products
    };
    
    localStorage.setItem("checkout_product", JSON.stringify(productData));
    navigate(RouteAddress);
  };

  return (
    <div className={styles.farmContainer}>
      <h2 className={styles.title}>Farm Fresh Products</h2>
      <div className={styles.productsGrid}>
        {farmProducts.map((product) => (
          <div key={product._id} className={styles.productCard}>
            <img
              src={
                product.image
                  ? `${API_BASE}${product.image}`
                  : "/placeholder.png"
              }
              alt={product.productName}
              className={styles.productImage}
            />

            <h3 className={styles.productName}>{product.productName}</h3>
            <p className={styles.productPrice}>
              ₹{product.price}/{product.unit}
            </p>
            <p className={styles.productQuantity}>
              Quantity: {product.quantity} {product.unit}
            </p>
            <div className={styles.farmerInfo}>
              <p><strong>Contact:</strong> {product.contact}</p>
            </div>
            <button 
              className={styles.addToCart}
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
            <button 
              className={styles.buy}
              onClick={() => handleBuyNow(product)}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmProducts;
