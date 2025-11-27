import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./CropNutrition.module.css";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { RouteCropNutritionAdd, RouteCart, RouteAddress } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cart/cart.slice";
import { showToast } from "@/helpers/showToast";
import useFetch from "@/hooks/useFetch";
import { translateProductName, translateProductDescription } from "@/helpers/productTranslations";

const CropNutrition = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const user = useSelector((state) => state.user?.user);
  const currentLanguage = i18n.language || 'en';

  // ✅ Fetch data from backend
  const { data: cropData, loading, error } = useFetch(
    `${API_BASE_URL}/crop-nutrition/all`,
    { method: "GET" },
    []
  );

  // Handle Add to Cart
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
            name: product.name,
            price: product.price,
            image: product.image,
          },
        })
      ).unwrap();

      showToast("success", `${product.name} ${t("addedToCart")}`);
      navigate(RouteCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("error", t("failedToAddToCart"));
    }
  };

  // Handle Buy Now
  const handleBuyNow = async (product) => {
    if (!user?._id) {
      showToast("error", t("pleaseLoginFirst"));
      return;
    }

    // Store product data in localStorage for checkout flow
    const productData = {
      productId: product._id,
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      unit: "unit",
    };
    
    localStorage.setItem("checkout_product", JSON.stringify(productData));
    navigate(RouteAddress);
  };

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("cropNutrition")}</h2>

      {isAdmin && (
        <div className={styles.addSeedsWrapper}>
          <Button asChild className={styles.addNutritionBtn}>
            <Link to={RouteCropNutritionAdd}>{t("addProduct")} - {t("cropNutrition")}</Link>
          </Button>
        </div>
      )}

      {/* ✅ Loading & Error states */}
      {loading && <p>{t("loadingProducts")}</p>}
      {error && <p className="text-red-500">{t("error")}: {error.message}</p>}

      <div className={styles.grid}>
        {cropData?.products?.map((product) => {
          const translatedName = translateProductName(product.name, currentLanguage);
          const translatedDesc = translateProductDescription(product.description, currentLanguage);
          return (
            <div key={product._id} className={styles.card}>
              <img
                src={product.image}
                alt={translatedName}
                className={styles.productImage}
              />
              <h3 className={styles.name}>{translatedName}</h3>
              <p className={styles.description}>{translatedDesc}</p>

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
            <div className={styles.buttonGroup}>
              <button className={styles.addToCart} onClick={() => handleAddToCart(product)}>
                {t("addToCart")}
              </button>

              <button className={styles.buy} onClick={() => handleBuyNow(product)}>
                {t("buyNow")}
              </button>
            </div>

          </div>
          );
        })}
      </div>
    </div>
  );
};

export default CropNutrition;
