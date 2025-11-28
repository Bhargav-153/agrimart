import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Profile.module.css";

import {
  FaUserCircle,
  FaShoppingBag,
  FaShoppingCart,
  FaCog,
  FaTrash,
} from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { link } from "fs";
import { getEnv } from "@/helpers/getEnv";
// import useNavigate from "react-router-dom";
import { showToast } from "@/helpers/showToast";
import { Link } from "react-router-dom";
import { RouteCart, RouteOrder, RouteSettings } from "../helpers/RouteName";
import { UserIcon } from "lucide-react";

const Profile = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();

  // const formSchema = z.object({
  //   email: z.string().email(),
  //   password: z.string().min(3, "Password field required"),
  // });

  // const form = useForm({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // });

  // async function onSubmit(values) {
  //   try {
  //     const response = await fetch(
  //       `${getEnv("VITE_API_BASE_URL")}/auth/login`, // Ensure backend is correctly set
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         credentials: "include",
  //         body: JSON.stringify({
  //           name: values.name,
  //           email: values.email,
  //           password: values.password,
  //         }),
  //       }
  //     );

  //     const data = await response.json();
  //     if (!response.ok) {
  //       return showToast("error", data.message);
  //     }

  //     dispatch(setUser(data.user));
  //     navigate(RouteIndex);
  //     showToast("success", data.message);
  //   } catch (error) {
  //     showToast("error", error.message);
  //   }
  // }

  // Fetch orders from MongoDB
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user.user?._id) return;

      setLoading(true);
      try {
        const response = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/orders/${user.user._id}`
        );
        const data = await response.json();
        if (response.ok) {
          setOrders(data.orders || []);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.user?._id]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>

      <main className={styles.mainContent}>
        <div className={styles.profileContainer}>
          <div className={styles.profileSidebar}>
            <div className={styles.userInfo}>
              <Avatar className={styles.profileAvatar}>
                <AvatarImage
                  src={user.user?.avatar || UserIcon}
                  className={styles.userAvatar}
                />
                <AvatarFallback>
                  {user.user?.name
                    ? user.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "U"}
                </AvatarFallback>
              </Avatar>
              <h2 className={styles.userName}>{user.user?.name || "User"}</h2>
              {/* <p className={styles.userRole}>Farmer</p> */}
              <p className={styles.userEmail}>
                {user.user?.email || "abc@gmail.com"}
              </p>
            </div>
            <nav className={styles.profileNav}>
              <a href="#profile" className={styles.active}>
                <FaUserCircle /> {t("profile")}
              </a>
              <Link to={RouteOrder}>
                <FaShoppingBag /> {t("orders")}
              </Link>
              <Link to={RouteCart}>
                <FaShoppingCart /> {t("cart")}
              </Link>
              <Link to={RouteSettings} className={styles.settingsLink}>
                <FaCog /> {t("accountSettings")}
              </Link>
            </nav>
          </div>

          <div className={styles.profileContent}>
            <section
              id="profile"
              className={`${styles.profileSection} ${styles.active}`}
            >
              <h2>{t("changeProfile")}</h2>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label>{t("profile")}</label>
                  <p> {user.user?.name || t("profile")}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>{t("phone")}</label>
                  <p>{user.user?.phone || 4579725799}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Email</label>
                  <p>{user.user?.email || "abc@gmail.com"}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>{t("address")}</label>
                  <p>{user.user?.address || t("address")}</p>
                </div>
              </div>
            </section>

            <section id="orders" className={styles.profileSection}>
              <h2>{t("orders")}</h2>
              {loading ? (
                <p>{t("loading")}</p>
              ) : orders.length === 0 ? (
                <p>{t("noOrdersFound")}</p>
              ) : (
                <div className={styles.ordersList}>
                  {orders.map((order) => (
                    <div key={order._id} className={styles.orderCard}>
                      <div className={styles.orderHeader}>
                        <span className={styles.orderId}>{t("orders")} #{order.orderId}</span>
                        <span className={styles.orderDate}>
                          {formatDate(order.orderDate)}
                        </span>
                        <span className={styles.orderStatus}>{order.status}</span>
                      </div>
                      {order.items.map((item, index) => (
                        <div key={index} className={styles.orderItems}>
                          <img
                            src={item.image || "https://source.unsplash.com/100x100/?seeds"}
                            alt={item.name}
                          />
                          <div className={styles.orderDetails}>
                            <h3>{item.name}</h3>
                            <p>{t("quantity")}: {item.quantity} {item.unit || t("unit")}</p>
                            <p className={styles.price}>₹{item.price}</p>
                          </div>
                        </div>
                      ))}
                      <div className={styles.orderTotal}>
                        <strong>{t("total")}: ₹{order.totalAmount}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section id="wishlist" className={styles.profileSection}>
              <h2>{t("wishlist")}</h2>
              <div className={styles.wishlistGrid}>
                <div className={styles.wishlistCard}>
                  <img
                    src="https://source.unsplash.com/200x200/?farming"
                    alt="Product"
                  />
                  <div className={styles.wishlistInfo}>
                    <h3>{t("organic")}</h3>
                    <p className={styles.price}>₹750</p>
                    <button className={styles.addToCart}>{t("addToCart")}</button>
                    <button className={styles.removeWishlist}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

    </>
  );
};

export default Profile;
