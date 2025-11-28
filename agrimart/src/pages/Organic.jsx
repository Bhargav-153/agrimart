import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./CropNutrition.module.css"; // ✅ reuse same styles
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { RouteOrganicAdd, RouteCart, RouteAddress } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cart/cart.slice";
import { showToast } from "@/helpers/showToast";
import useFetch from "@/hooks/useFetch";
import { translateProductName, translateProductDescription } from "@/helpers/productTranslations";

const Organic = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const user = useSelector((state) => state.user?.user);
  const currentLanguage = i18n.language || 'en';

  // ✅ Fetch data from backend
  const { data: organicData, loading, error } = useFetch(
    `${API_BASE_URL}/organic/all`,
    { method: "GET" },
    []
  );

  // Handle Add to Cart
  const handleAddToCart = async (organic) => {
    if (!user?._id) {
      showToast("error", t("pleaseLoginToAddToCart"));
      return;
    }

    try {
      await dispatch(
        addToCart({
          userId: user._id,
          product: {
            productId: organic._id,
            name: organic.name,
            price: organic.price,
            image: organic.image,
            unit: organic.unit || "unit",
          },
        })
      ).unwrap();

      showToast("success", `${organic.name} ${t("addedToCart")}`);
      navigate(RouteCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("error", t("failedToAddToCart"));
    }
  };

  // Handle Buy Now
  const handleBuyNow = async (organic) => {
    if (!user?._id) {
      showToast("error", t("pleaseLoginFirst"));
      return;
    }

    // Store product data in localStorage for checkout flow
    const productData = {
      productId: organic._id,
      _id: organic._id,
      name: organic.name,
      price: organic.price,
      image: organic.image,
      unit: organic.unit || "unit",
    };
    
    localStorage.setItem("checkout_product", JSON.stringify(productData));
    navigate(RouteAddress);
  };

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("organic")}</h2>

      {isAdmin && (
        <div className={styles.addSeedsWrapper}>
          <Button asChild className={styles.addNutritionBtn}>
            <Link to={RouteOrganicAdd}>{t("addProduct")} - {t("organic")}</Link>
          </Button>
        </div>
      )}

      {/* ✅ Loading & Error states */}
      {loading && <p>{t("loadingProducts")}</p>}
      {error && <p className="text-red-500">{t("error")}: {error.message}</p>}

      <div className={styles.grid}>
        {organicData?.organics?.map((organic) => {
          const translatedName = translateProductName(organic.name, currentLanguage);
          const translatedDesc = translateProductDescription(organic.description, currentLanguage);
          return (
            <div key={organic._id} className={styles.card}>
              <img
                              src={organic.image}
                              alt={translatedName}
                              className={styles.productImage}
                            />

              <h3 className={styles.name}>{translatedName}</h3>
              <p className={styles.description}>{translatedDesc}</p>

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
            <div className={styles.buttonGroup}>
            <button className={styles.addToCart} onClick={() => handleAddToCart(organic)}>{t("addToCart")}</button>
            <button className={styles.buy} onClick={() => handleBuyNow(organic)}>{t("buyNow")}</button>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default Organic;
