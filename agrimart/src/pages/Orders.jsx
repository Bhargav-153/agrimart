import React, { useEffect, useState } from "react";
import styles from "./Orders.module.css";
import { useSelector } from "react-redux";
import { getEnv } from "@/helpers/getEnv";

const Orders = () => {
  const user = useSelector((state) => state.user?.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGatewayDisplayName = (gateway) => {
    const gatewayNames = {
      gpay: "Google Pay",
      phonepe: "PhonePe",
      paytm: "Paytm",
      razorpay: "Razorpay",
    };
    return gatewayNames[gateway] || gateway;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?._id) return;

      setLoading(true);
      try {
        const response = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/orders/${user._id}`
        );

        const data = await response.json();
        if (response.ok) {
          setOrders(data.orders || []);
        }
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
      <h1 className={styles.pageTitle}>My Orders</h1>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className={styles.ordersList}>
          {orders.map((order) => (
            <div key={order._id} className={styles.orderCard}>
              {order.items.map((item, index) => (
                <div key={index} className={styles.orderItem}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.quantity} {item.unit}</p>
                    <p>₹{item.price}</p>
                  </div>
                </div>
              ))}

              <div className={styles.orderTotal}>
                <strong>Total: ₹{order.totalAmount}</strong>
              </div>
              
              {order.paymentMethod && (
                <div className={styles.paymentMethod}>
                  <strong>Payment Method: </strong>
                  <span className={styles.paymentBadge}>
                    {order.paymentMethod === "COD" 
                      ? "Cash on Delivery" 
                      : order.paymentGateway 
                        ? `Online Payment (${getGatewayDisplayName(order.paymentGateway)})`
                        : "Online Payment"}
                  </span>
                </div>
              )}

              {order.status && (
                <div className={styles.orderStatus}>
                  <strong>Status: </strong>
                  <span className={styles.statusBadge}>{order.status}</span>
                </div>
              )}

              {order.orderId && (
                <div className={styles.orderIdDisplay}>
                  <strong>Order ID: </strong>
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
