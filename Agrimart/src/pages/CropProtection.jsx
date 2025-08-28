import React from "react";
import styles from "./CropProtection.module.css";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RouteCropProtectionAdd } from "@/helpers/RouteName";
import useFetch from "@/hooks/useFetch";

const CropProtection = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // ✅ Fetch crop protection products from backend
  const { data, loading, error } = useFetch(
    `${API_BASE_URL}/crop-protection/all`,
    { method: "GET", credentials: "include" },
    []
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Crop Protection Products</h2>

      <div className={styles.addSeedsWrapper}>
        <Button asChild>
          <Link to={RouteCropProtectionAdd}>Add Crop Protection</Link>
        </Button>
      </div>

      {/* ✅ Loading / Error States */}
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className={styles.productsGrid}>
        {data?.products?.length > 0 ? (
          data.products.map((product) => (
            <div key={product._id} className={styles.productCard}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              <p className={styles.productPrice}>₹{product.price}</p>
              {product.tag && (
                <div className={styles.productTags}>
                  <span className={styles.tag}>{product.tag}</span>
                </div>
              )}
              <p className={styles.productRating}>
                ⭐ {product.rating || 0} ({product.reviews || 0} reviews)
              </p>

              <button className={styles.addToCart}>Add to Cart</button>
            </div>
          ))
        ) : (
          !loading && <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default CropProtection;
