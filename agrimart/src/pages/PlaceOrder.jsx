import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PlaceOrder.module.css";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { clearCart } from "@/redux/cart/cart.slice";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.items) || [];
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const totalAmount = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
        0
      ),
    [cartItems]
  );

  const handlePlaceOrder = async () => {
    if (!user?._id) {
      showToast("error", "Please log in before placing an order.");
      return;
    }

    if (!cartItems.length) {
      showToast("error", "Your cart is empty.");
      return;
    }

    const orderData = {
      userId: user._id,
      items: cartItems,
      totalAmount,
      email: user.email,
      phone: user.phone,
    };

    setIsPlacingOrder(true);
    try {
      const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/orders/place`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to place order.");
      }

      showToast("success", data.message);
      dispatch(clearCart(user._id));
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className={styles.paymentContainer}>
      <div className={styles.paymentCard}>
        <div className={styles.totalSection}>
          <h2>Order Summary</h2>
          <p>Total Items: {cartItems.length}</p>
          <h3>Grand Total: ₹{totalAmount.toFixed(2)}</h3>
        </div>
        <button
          type="button"
          className={styles.payButton}
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
        >
          {isPlacingOrder ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
