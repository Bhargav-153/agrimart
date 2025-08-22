import React, { useEffect, useState } from "react";
import styles from "./FarmProduct.module.css";

const FarmProducts = () => {
  const [farmProducts, setFarmProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";
        const res = await fetch(`${API_BASE}/api/farmerProducts/products`);
        const data = await res.json();
        setFarmProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.farmContainer}>
      <h2 className={styles.title}>Farm Fresh Products</h2>
      <div className={styles.productsGrid}>
        {farmProducts.map((product) => (
          <div key={product._id} className={styles.productCard}>
            <img
              src={`http://localhost:3000${product.image}`}
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
              <p><strong>Farmer:</strong> {product.farmer?.name}</p>
              <p><strong>Location:</strong> {product.farmer?.location}</p>
              <p><strong>Contact:</strong> {product.contact}</p>
            </div>
            <button className={styles.addToCart}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmProducts;
