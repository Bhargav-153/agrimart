import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Seeds.module.css";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { RouteSeedsAdd, RouteCart, RouteAddress } from "@/helpers/RouteName";
import useFetch from "@/hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cart/cart.slice";
import { showToast } from "@/helpers/showToast";
import { translateProductName, translateProductDescription } from "@/helpers/productTranslations";

// ✅ ProductCategory Component
const ProductCategory = ({ title, products, onAddToCart, onBuyNow, t, currentLanguage }) => {
  return (
    <div className={styles.categorySection}>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className={styles.productsGrid}>
        {products.map((product) => {
          const translatedName = translateProductName(product.name, currentLanguage);
          const translatedDesc = translateProductDescription(product.description, currentLanguage);
          return (
            <div key={product._id} className={styles.productCard}>
              <div className={styles.productImage}>
                <img src={product.image} alt={product.alt || translatedName} />
                {product.tag && <span className={styles.tag}>{product.tag}</span>}
              </div>
              <div className={styles.productInfo}>
                <h3>{translatedName}</h3>
                <p className={styles.productDescription}>{translatedDesc}</p>
            <div className={styles.productMeta}>
              <span className={styles.productRating}>
                {"★".repeat(Math.floor(product.rating || 0))}
                {product.rating % 1 !== 0 ? "☆" : ""}
                <span>({product.reviews})</span>
              </span>
              <span className={styles.productPrice}>
                ₹{product.price}/{product.unit}
              </span>
            </div>
            <button
              className={styles.addToCart}
              onClick={() => onAddToCart(product)}
            >
              {t("addToCart")}
            </button>
            <button className={styles.buy} onClick={() => onBuyNow(product)}>
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

// ✅ Main Seeds Component
const Seeds = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentLanguage = i18n.language || 'en';

  // ✅ Get logged-in user from Redux
  const user = useSelector((state) => state.user?.user);

  const { data, loading, error } = useFetch("http://localhost:3000/api/seeds/all");

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
            name: product.name,
            price: product.price,
            image: product.image,
            unit: product.unit || "unit",
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

  // ✅ Handle Buy Now
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
      unit: product.unit || "unit",
    };
    
    localStorage.setItem("checkout_product", JSON.stringify(productData));
    navigate(RouteAddress);
  };



  // ✅ Handle loading states
  if (loading) return <p>{t("loading")}</p>;
  if (error) return <p>{t("error")}: {error.message}</p>;
  if (!data?.seeds?.length) return <p>{t("noSeedsFound")}</p>;

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  return (
    <main className={styles.mainContent}>
      <h1 className="text-3xl font-bold text-center mb-6">{t("seeds")}</h1>

      {isAdmin && (
        <div className={styles.addSeedsWrapper}>
          <Button asChild className={styles.addSeedsBtn}>
            <Link to={RouteSeedsAdd}>{t("addSeeds")}</Link>
          </Button>
        </div>
      )}

      <ProductCategory
        title={t("allSeeds")}
        products={data.seeds}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        t={t}
        currentLanguage={currentLanguage}
      />
    </main>
  );
};

export default Seeds;
