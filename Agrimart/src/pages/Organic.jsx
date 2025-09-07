import React from "react";
import styles from "./CropNutrition.module.css"; // ✅ reuse same styles
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RouteOrganicAdd } from "@/helpers/RouteName"; // ✅ add in RouteName.js
import useFetch from "@/hooks/useFetch";

const Organic = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // ✅ Fetch data from backend
  const { data: organicData, loading, error } = useFetch(
    `${API_BASE_URL}/organic/all`,
    { method: "GET" },
    []
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Organic Products</h2>

      <div className={styles.addSeedsWrapper}>
        <Button asChild className={styles.addNutritionBtn}>
          <Link to={RouteOrganicAdd}>Add Organic Product</Link>
        </Button>
      </div>

      {/* ✅ Loading & Error states */}
      {loading && <p>Loading organic products...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      <div className={styles.grid}>
        {organicData?.organics?.map((organic) => (
          <div key={organic._id} className={styles.card}>
            <img src={organic.image} alt={organic.name} className={styles.image} />

            <h3 className={styles.name}>{organic.name}</h3>
            <p className={styles.description}>{organic.description}</p>

            {organic.tag && (
              <div className={styles.tags}>
                <span className={styles.tag}>{organic.tag}</span>
              </div>
            )}

            <p className={styles.productMata}>
                          <span className={styles.productRating}>
                            {"★".repeat(Math.floor(organic.rating || 0))}
                            {organic.rating % 1 !== 0 ? "☆" : ""}
                            <span>({organic.reviews})</span>
                          </span>
                          <span className={styles.productPrice}>
                            ₹{organic.price}/{organic.unit}
                          </span>
                        </p>
            <button className={styles.button}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Organic;
