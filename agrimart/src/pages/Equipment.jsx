import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./CropNutrition.module.css"; // ✅ reuse same styles
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { RouteEquipmentAdd, RouteCart, RouteAddress } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cart/cart.slice";
import { showToast } from "@/helpers/showToast";
import useFetch from "@/hooks/useFetch";
import { translateProductName, translateProductDescription } from "@/helpers/productTranslations";

const Equipment = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const user = useSelector((state) => state.user?.user);
  const currentLanguage = i18n.language || 'en';

  // ✅ Fetch data from backend
  const { data: equipmentData, loading, error } = useFetch(
    `${API_BASE_URL}/equipment/all`,
    { method: "GET" },
    []
  );

  // Handle Add to Cart
  const handleAddToCart = async (equipment) => {
    if (!user?._id) {
      showToast("error", t("pleaseLoginToAddToCart"));
      return;
    }

    try {
      await dispatch(
        addToCart({
          userId: user._id,
          product: {
            productId: equipment._id,
            name: equipment.name,
            price: equipment.price,
            image: equipment.image,
          },
        })
      ).unwrap();

      showToast("success", `${equipment.name} ${t("addedToCart")}`);
      navigate(RouteCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("error", t("failedToAddToCart"));
    }
  };

  // Handle Buy Now
  const handleBuyNow = async (equipment) => {
    if (!user?._id) {
      showToast("error", t("pleaseLoginFirst"));
      return;
    }

    // Store product data in localStorage for checkout flow
    const productData = {
      productId: equipment._id,
      _id: equipment._id,
      name: equipment.name,
      price: equipment.price,
      image: equipment.image,
      unit: "unit",
    };
    
    localStorage.setItem("checkout_product", JSON.stringify(productData));
    navigate(RouteAddress);
  };

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("equipment")}</h2>

      {isAdmin && (
        <div className={styles.addSeedsWrapper}>
          <Button asChild className={styles.addNutritionBtn}>
            <Link to={RouteEquipmentAdd}>{t("addProduct")} - {t("equipment")}</Link>
          </Button>
        </div>
      )}

      {/* ✅ Loading & Error states */}
      {loading && <p>{t("loadingProducts")}</p>}
      {error && <p className="text-red-500">{t("error")}: {error.message}</p>}

      <div className={styles.grid}>
        {equipmentData?.equipments?.map((equipment) => {
          const translatedName = translateProductName(equipment.name, currentLanguage);
          const translatedDesc = translateProductDescription(equipment.description, currentLanguage);
          return (
            <div key={equipment._id} className={styles.card}>
              <img
                src={equipment.image}
                alt={translatedName}
                className={styles.image}
              />
              <h3 className={styles.name}>{translatedName}</h3>
              <p className={styles.description}>{translatedDesc}</p>

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
            <button className={styles.button} onClick={() => handleAddToCart(equipment)}>{t("addToCart")}</button>
            <button className={styles.buy} onClick={() => handleBuyNow(equipment)}>{t("buyNow")}</button>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default Equipment;
