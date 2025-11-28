import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Orders.module.css";
import { useSelector } from "react-redux";
import { getEnv } from "@/helpers/getEnv";
import { translateProductName } from "@/helpers/productTranslations";

const Orders = () => {
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.user?.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentLanguage = i18n.language || "en";

  const getGatewayDisplayName = (gateway) => {
    const gatewayNames = { gpay: "Google Pay", phonepe: "PhonePe", paytm: "Paytm", razorpay: "Razorpay" };
    return gatewayNames[gateway] || gateway;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?._id) return;
      setLoading(true);
      try {
        const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/orders/${user._id}`);
        const data = await res.json();
        if (res.ok) setOrders(data.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user?._id]);

  return (
    <main className={styles.mainContent}>
      <h1 className={styles.pageTitle}>{t("orders")}</h1>
      {loading ? (
        <p>{t("loading")}</p>
      ) : orders.length === 0 ? (
        <p>{t("noOrdersFound")}</p>
      ) : (
        <div className={styles.ordersList}>
          {orders.map((order) => (
            <div key={order._id} className={styles.orderCard}>
              {order.items.map((item, index) => (
                <div key={index} className={styles.orderItem}>
                  <img
                    src={item.image}
                    alt={translateProductName(item.name, currentLanguage)}
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                  <div>
                    <h4>{translateProductName(item.name, currentLanguage)}</h4>
                    <p>{item.quantity} {item.unit || t("unit")}</p>
                    <p>₹{item.price}</p>
                  </div>
                </div>
              ))}

              <div className={styles.orderTotal}>
                <strong>{t("total")}: ₹{order.totalAmount}</strong>
              </div>

              {order.paymentMethod && (
                <div className={styles.paymentMethod}>
                  <strong>{t("paymentMethod")}: </strong>
                  <span className={styles.paymentBadge}>
                    {order.paymentMethod === "COD"
                      ? t("cashOnDelivery")
                      : order.paymentGateway
                        ? `${t("onlinePayment")} (${getGatewayDisplayName(order.paymentGateway)})`
                        : t("onlinePayment")}
                  </span>
                </div>
              )}

              {order.status && (
                <div className={styles.orderStatus}>
                  <strong>{t("status")}: </strong>
                  <span className={styles.statusBadge}>{order.status}</span>
                </div>
              )}

              {order.orderId && (
                <div className={styles.orderIdDisplay}>
                  <strong>{t("orderId")}: </strong>
                  <span>{order.orderId}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Orders;
