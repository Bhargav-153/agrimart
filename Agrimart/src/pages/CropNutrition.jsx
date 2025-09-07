import React from "react";
import styles from "./CropNutrition.module.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RouteCropNutritionAdd } from "@/helpers/RouteName";
import useFetch from "@/hooks/useFetch";

const CropNutrition = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // ✅ Fetch data from backend
  const { data: cropData, loading, error } = useFetch(
    `${API_BASE_URL}/crop-nutrition/all`,
    { method: "GET" },
    []
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Crop Nutrition Products</h2>

      <div className={styles.addSeedsWrapper}>
        <Button asChild className={styles.addNutritionBtn}>
          <Link to={RouteCropNutritionAdd}>Add Crop Nutrition</Link>
        </Button>
      </div>

      {/* ✅ Loading & Error states */}
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      <div className={styles.grid}>
        {cropData?.products?.map((product) => (
          <div key={product._id} className={styles.card}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.image}
            />
            <h3 className={styles.name}>{product.name}</h3>
            <p className={styles.description}>{product.description}</p>

            {product.tag && (
              <div className={styles.productTags}>
                <span className={styles.tag}>{product.tag}</span>
              </div>
            )}

            <p className={styles.productMata}>
              <span className={styles.productRating}>
                {"★".repeat(Math.floor(product.rating || 0))}
                {product.rating % 1 !== 0 ? "☆" : ""}
                <span>({product.reviews})</span>
              </span>
              <span className={styles.productPrice}>
                ₹{product.price}
              </span>
            </p>
            <button className={styles.button}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropNutrition;
