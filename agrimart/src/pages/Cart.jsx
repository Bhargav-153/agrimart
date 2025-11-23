import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart,removeFromCart, clearCart } from "@/redux/cart/cart.slice";
import { Button } from "@/components/ui/button";
import styles from "./Cart.module.css";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteAddress } from "@/helpers/RouteName";
import { showToast } from "@/helpers/showToast";
import { translateProductName } from "@/helpers/productTranslations";

const Cart = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { items, status } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user?.user);
  const currentLanguage = i18n.language || 'en';

  const total = items?.reduce(
    (sum, item) => sum + (item.price * item.quantity || 0),
    0
  ) || 0;

  // Handle Buy button - works like Buy Now
  const handleBuy = (item) => {
    if (!user?._id) {
      showToast("error", t("pleaseLoginFirst"));
      return;
    }

    // Store product data in localStorage for checkout flow
    const productData = {
      productId: item.productId,
      _id: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      unit: item.unit || "unit",
    };
    
    localStorage.setItem("checkout_product", JSON.stringify(productData));
    navigate(RouteAddress);
  };

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCart(user._id));
    }
  }, [dispatch, user?._id, location.pathname]);

  if (status === "loading") {
    return <p className="text-center mt-8 text-lg">{t("loading")}</p>;
  }

  if (!items || items.length === 0) {
    return <p className="text-center mt-8 text-lg">{t("emptyCart")}</p>;
  }

  return (
    <main className={styles.mainContent}>
      <h1 className={`text-3xl font-bold text-center ${styles.cartTitle}`}>{t("cart")}</h1>
      <div className={styles.cartGrid}>
        {items.map((item) => {
          const translatedName = translateProductName(item.name, currentLanguage);
          return (
            <div key={item._id} className={styles.cartCard}>
              <img src={item.image} alt={translatedName} className={styles.cartImage} />
              <div className={styles.cartInfo}>
                <h3>{translatedName}</h3>
                <p>
                  ₹{item.price} × {item.quantity} = ₹
                  {(item.price * item.quantity).toFixed(2)}
                </p>
                <div className={styles.cartButtons}>
                  <Button
                  className={styles.btn1}
                  onClick={() =>
                  dispatch(removeFromCart({ userId: user._id, productId: item.productId }))
                  }
                  >
                  {t("delete")}
                  </Button>

                  <Button 
                    className={styles.btn2}
                    onClick={() => handleBuy(item)}
                  >
                    {t("buyNow")}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.cartSummary}>
        <h2>{t("total")}: ₹{total.toFixed(2)}</h2>
        <div className={styles.cartActions}>
          <Button variant="secondary" onClick={() => dispatch(clearCart(user._id))}>
            {t("clearCart")}
          </Button>
          <Button>Checkout</Button>
        </div>
      </div>
    </main>
  );
};

export default Cart;
