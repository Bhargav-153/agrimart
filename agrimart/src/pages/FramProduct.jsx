import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "@/redux/cart/cart.slice";
import { showToast } from "@/helpers/showToast";
import { RouteCart, RouteAddress } from "@/helpers/RouteName";
import { translateProductName } from "@/helpers/productTranslations";
import styles from "./FarmProduct.module.css";

const FarmProducts = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);
  const [farmProducts, setFarmProducts] = useState([]);
  const currentLanguage = i18n.language || 'en';

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
      showToast("error", t("pleaseLoginToAddToCart"));
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

      showToast("success", `${product.productName} ${t("addedToCart")}`);
      navigate(RouteCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("error", t("failedToAddToCart"));
    }
  };

  // ✅ Handle Buy Now
  const handleBuyNow = async (product) => {
    if (!user?._id) {
      showToast("error", t("pleaseLoginFirst"));
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
      <h2 className={styles.title}>{t("farmProduct")}</h2>
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

            <h3 className={styles.productName}>{translateProductName(product.productName, currentLanguage)}</h3>
            <p className={styles.productPrice}>
              ₹{product.price}/{product.unit}
            </p>
            <p className={styles.productQuantity}>
              {t("quantity")}: {product.quantity} {product.unit}
            </p>
            <div className={styles.farmerInfo}>
              <p><strong>{t("contact")}:</strong> {product.contact}</p>
            </div>
            <button 
              className={styles.addToCart}
              onClick={() => handleAddToCart(product)}
            >
              {t("addToCart")}
            </button>
            <button 
              className={styles.buy}
              onClick={() => handleBuyNow(product)}
            >
              {t("buyNow")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmProducts;
