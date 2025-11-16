import React from "react";
import styles from "./CropNutrition.module.css"; // ✅ reuse same styles
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { RouteOrganicAdd, RouteCart, RouteAddress } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cart/cart.slice";
import { showToast } from "@/helpers/showToast";
import useFetch from "@/hooks/useFetch";

const Organic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const user = useSelector((state) => state.user?.user);

  // ✅ Fetch data from backend
  const { data: organicData, loading, error } = useFetch(
    `${API_BASE_URL}/organic/all`,
    { method: "GET" },
    []
  );

  // Handle Add to Cart
  const handleAddToCart = async (organic) => {
    if (!user?._id) {
      showToast("error", "Please login to add items to cart!");
      return;
    }

    try {
      await dispatch(
        addToCart({
          userId: user._id,
          product: {
            productId: organic._id,
            name: organic.name,
            price: organic.price,
            image: organic.image,
            unit: organic.unit || "unit",
          },
        })
      ).unwrap();

      showToast("success", `${organic.name} added to cart!`);
      navigate(RouteCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("error", "Failed to add item to cart. Please try again.");
    }
  };

  // Handle Buy Now
  const handleBuyNow = async (organic) => {
    if (!user?._id) {
      showToast("error", "Please login to buy items!");
      return;
    }

    // Store product data in localStorage for checkout flow
    const productData = {
      productId: organic._id,
      _id: organic._id,
      name: organic.name,
      price: organic.price,
      image: organic.image,
      unit: organic.unit || "unit",
    };
    
    localStorage.setItem("checkout_product", JSON.stringify(productData));
    navigate(RouteAddress);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Organic Products</h2>

      <div className={styles.addSeedsWrapper}>
        <Button asChild className={styles.addNutritionBtn}>
          <Link to={RouteOrganicAdd}>Add Organic Product</Link>
        </Button>
      </div>

      {/* ✅ Loading & Error states */}
      {loading && <p>Loading organic products...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      <div className={styles.grid}>
        {organicData?.organics?.map((organic) => (
          <div key={organic._id} className={styles.card}>
            <img src={organic.image} alt={organic.name} className={styles.image} />

            <h3 className={styles.name}>{organic.name}</h3>
            <p className={styles.description}>{organic.description}</p>

            {organic.tag && (
              <div className={styles.tags}>
                <span className={styles.tag}>{organic.tag}</span>
              </div>
            )}

            <p className={styles.productMata}>
                          <span className={styles.productRating}>
                            {"★".repeat(Math.floor(organic.rating || 0))}
                            {organic.rating % 1 !== 0 ? "☆" : ""}
                            <span>({organic.reviews})</span>
                          </span>
                          <span className={styles.productPrice}>
                            ₹{organic.price}/{organic.unit}
                          </span>
                        </p>
            <button className={styles.button} onClick={() => handleAddToCart(organic)}>Add to Cart</button>
            <button className={styles.buy} onClick={() => handleBuyNow(organic)}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Organic;
