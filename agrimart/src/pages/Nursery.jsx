import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv";
import { RouteNurseryAdd, RouteCart, RouteAddress } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cart/cart.slice";
import { showToast } from "@/helpers/showToast";
import styles from "./Nursery.module.css";

const Nursery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nurseries, setNurseries] = useState([]);
  const user = useSelector((state) => state.user?.user);

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
      showToast("error", "Please login to add items to cart!");
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

      showToast("success", `${nursery.plantName} added to cart!`);
      navigate(RouteCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("error", "Failed to add item to cart. Please try again.");
    }
  };

  // Handle Buy Now
  const handleBuyNow = async (nursery) => {
    if (!user?._id) {
      showToast("error", "Please login to buy items!");
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

  return (
    <div className={styles.nurseryContainer}>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">Nursery Plants</h2>
        <h3 className="text-lg text-muted-foreground">
          Flowering & Fruit Plants
        </h3>
        <div>
          <Button asChild className={styles.addNurseryBtn}>
            <Link to={RouteNurseryAdd}>Add Nursery</Link>
          </Button>
        </div>
      </div>

      {/* Nursery Cards */}
      <div className=" grid gap-6 sm:grid-cols-2 md:grid-cols-4 mt-10">
        {nurseries.length === 0 ? (
          <p>No nursery plants available.</p>
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
                  <h3 className={styles.productName}>{n.plantName}</h3>
                  <p className={styles.productPrice}>{n.plantPrice}</p>
                </div>

                {/* Details */}

                <div className={styles.farmerInfo}>
                  <p>
                    <strong>Nursery:</strong> {n.nurseryName}
                  </p>
                  <p>
                    <strong>Address:</strong> {n.address}
                  </p>
                  <p>
                    <strong>Phone:</strong> {n.phone}
                  </p>
                </div>
                <button className={styles.addToCart} onClick={() => handleAddToCart(n)}>Add to Cart</button>
                <button className={styles.buy} onClick={() => handleBuyNow(n)}>Buy Now</button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Nursery;
