import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv";
import { RouteNurseryAdd, RouteCart, RouteAddress } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cart/cart.slice";
import { showToast } from "@/helpers/showToast";
import { translateProductName } from "@/helpers/productTranslations";
import styles from "./Nursery.module.css";

const Nursery = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nurseries, setNurseries] = useState([]);
  const user = useSelector((state) => state.user?.user);
  const currentLanguage = i18n.language || 'en';

  useEffect(() => {
    const fetchNurseries = async () => {
      try {
        const res = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/nursery/all-nursery`
        );
        const data = await res.json();
        setNurseries(data.nursery);
      } catch (err) {
        console.error("Failed to fetch nurseries:", err);
      }
    };

    fetchNurseries();
  }, []);

  // Handle Add to Cart
  const handleAddToCart = async (nursery) => {
    if (!user?._id) {
      showToast("error", t("pleaseLoginToAddToCart"));
      return;
    }

    try {
      await dispatch(
        addToCart({
          userId: user._id,
          product: {
            productId: nursery._id,
            name: nursery.plantName,
            price: parseFloat(nursery.plantPrice.replace(/[₹,]/g, "")) || 0,
            image: nursery.plantImage || "",
          },
        })
      ).unwrap();

      showToast("success", `${nursery.plantName} ${t("addedToCart")}`);
      navigate(RouteCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("error", t("failedToAddToCart"));
    }
  };

  // Handle Buy Now
  const handleBuyNow = async (nursery) => {
    if (!user?._id) {
      showToast("error", t("pleaseLoginFirst"));
      return;
    }

    // Store product data in localStorage for checkout flow
    const productData = {
      productId: nursery._id,
      _id: nursery._id,
      name: nursery.plantName,
      price: parseFloat(nursery.plantPrice.replace(/[₹,]/g, "")) || 0,
      image: nursery.plantImage || "",
      unit: "unit",
    };
    
    localStorage.setItem("checkout_product", JSON.stringify(productData));
    navigate(RouteAddress);
  };

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  return (
    <div className={styles.nurseryContainer}>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">{t("nurseryPlants")}</h2>
        <h3 className="text-lg text-muted-foreground">
          {t("floweringFruitPlants")}
        </h3>
        {isAdmin && (
          <div>
            <Button asChild className={styles.addNurseryBtn}>
              <Link to={RouteNurseryAdd}>{t("addNursery")}</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Nursery Cards */}
      <div className=" grid gap-6 sm:grid-cols-2 md:grid-cols-4 mt-10">
        {nurseries.length === 0 ? (
          <p>{t("noNurseryPlantsAvailable")}</p>
        ) : (
          nurseries.map((n, i) => (
            <Card key={i} className="pt-5">
              <CardContent>
                {/* Image */}
                {n.plantImage && (
                  <div className="mb-3">
                    <img
                      src={n.plantImage}
                      alt={n.plantName}
                      className="rounded w-full h-48 object-cover"
                    />
                  </div>
                )}

                {/* Title and  */}
                <div className="mb-2">
                  <h3 className={styles.productName}>{translateProductName(n.plantName, currentLanguage)}</h3>
                  <p className={styles.productPrice}>{n.plantPrice}</p>
                </div>

                {/* Details */}

                <div className={styles.farmerInfo}>
                  <p>
                    <strong>{t("nursery")}:</strong> {n.nurseryName}
                  </p>
                  <p>
                    <strong>{t("address")}:</strong> {n.address}
                  </p>
                  <p>
                    <strong>{t("phone")}:</strong> {n.phone}
                  </p>
                </div>
                <button className={styles.addToCart} onClick={() => handleAddToCart(n)}>{t("addToCart")}</button>
                <button className={styles.buy} onClick={() => handleBuyNow(n)}>{t("buyNow")}</button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Nursery;
