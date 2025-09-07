import React from "react";
import styles from "./CropNutrition.module.css"; // ✅ reuse same styles
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RouteEquipmentAdd } from "@/helpers/RouteName"; // ✅ define this in RouteName.js
import useFetch from "@/hooks/useFetch";

const Equipment = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // ✅ Fetch data from backend
  const { data: equipmentData, loading, error } = useFetch(
    `${API_BASE_URL}/equipment/all`,
    { method: "GET" },
    []
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Farm Equipment</h2>

      <div className={styles.addSeedsWrapper}>
        <Button asChild className={styles.addNutritionBtn}>
          <Link to={RouteEquipmentAdd}>Add Equipment</Link>
        </Button>
      </div>

      {/* ✅ Loading & Error states */}
      {loading && <p>Loading equipment...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      <div className={styles.grid}>
        {equipmentData?.equipments?.map((equipment) => (
          <div key={equipment._id} className={styles.card}>
            <img
              src={equipment.image}
              alt={equipment.name}
              className={styles.image}
            />
            <h3 className={styles.name}>{equipment.name}</h3>
            <p className={styles.description}>{equipment.description}</p>

            {equipment.tag && (
              <div className={styles.tags}>
                <span className={styles.tag}>{equipment.tag}</span>
              </div>
            )}

           <p className={styles.productMata}>
              <span className={styles.productRating}>
                {"★".repeat(Math.floor(equipment.rating || 0))}
                {equipment.rating % 1 !== 0 ? "☆" : ""}
                <span>({equipment.reviews})</span>
              </span>
              <span className={styles.productPrice}>
                ₹{equipment.price}
              </span>
            </p> 
            <button className={styles.button}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Equipment;
