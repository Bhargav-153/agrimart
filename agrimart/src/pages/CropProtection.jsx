import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./CropProtection.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RouteCropProtectionAdd, RouteCart, RouteAddress } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cart/cart.slice";
import { showToast } from "@/helpers/showToast";
import useFetch from "@/hooks/useFetch";
import { translateProductName, translateProductDescription } from "@/helpers/productTranslations";

const CropProtection = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const user = useSelector((state) => state.user?.user);
  const currentLanguage = i18n.language || 'en';

  // ✅ Fetch crop protection products from backend
  const { data, loading, error } = useFetch(
  `${API_BASE_URL}/crop-protection/all`,
  { method: "GET", credentials: "include" },
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
      <h2 className={styles.title}>{t("cropProtection")}</h2>

      {isAdmin && (
        <div className={styles.addSeedsWrapper}>
          <Button asChild className={styles.addProtectionBtn}>
            <Link to={RouteCropProtectionAdd}>{t("addProduct")} - {t("cropProtection")}</Link>
          </Button>
        </div>
      )}

      {/* ✅ Loading / Error States */}
      {loading && <p>{t("loadingProducts")}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className={styles.productsGrid}>
        {data?.products?.length > 0 ? (
          data.products.map((product) => {
            const translatedName = translateProductName(product.name, currentLanguage);
            const translatedDesc = translateProductDescription(product.description, currentLanguage);
            return (
              <div key={product._id} className={styles.productCard}>
                <img
                  src={product.image}
                  alt={translatedName}
                  className={styles.productImage}
                />
                <h3 className={styles.productName}>{translatedName}</h3>
                <p className={styles.productDescription}>{translatedDesc}</p>
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

              <button className={styles.addToCart} onClick={() => handleAddToCart(product)}>{t("addToCart")}</button>
              <button className={styles.buy} onClick={() => handleBuyNow(product)}>{t("buyNow")}</button>
            </div>
            );
          })
        ) : (
          !loading && <p>{t("noProductsAvailable")}</p>
        )}
      </div>
    </div>
  );
};

export default CropProtection;
