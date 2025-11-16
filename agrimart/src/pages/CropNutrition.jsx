import React from "react";
import styles from "./CropNutrition.module.css";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { RouteCropNutritionAdd, RouteCart, RouteAddress } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cart/cart.slice";
import { showToast } from "@/helpers/showToast";
import useFetch from "@/hooks/useFetch";

const CropNutrition = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const user = useSelector((state) => state.user?.user);

  // ✅ Fetch data from backend
  const { data: cropData, loading, error } = useFetch(
    `${API_BASE_URL}/crop-nutrition/all`,
    { method: "GET" },
    []
  );

  // Handle Add to Cart
  const handleAddToCart = async (product) => {
    if (!user?._id) {
      showToast("error", "Please login to add items to cart!");
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

      showToast("success", `${product.name} added to cart!`);
      navigate(RouteCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("error", "Failed to add item to cart. Please try again.");
    }
  };

  // Handle Buy Now
  const handleBuyNow = async (product) => {
    if (!user?._id) {
      showToast("error", "Please login to buy items!");
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

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Crop Nutrition Products</h2>

      <div className={styles.addSeedsWrapper}>
        <Button asChild className={styles.addNutritionBtn}>
          <Link to={RouteCropNutritionAdd}>Add Crop Nutrition</Link>
        </Button>
      </div>

      {/* ✅ Loading & Error states */}
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      <div className={styles.grid}>
        {cropData?.products?.map((product) => (
          <div key={product._id} className={styles.card}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.image}
            />
            <h3 className={styles.name}>{product.name}</h3>
            <p className={styles.description}>{product.description}</p>

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
            <button className={styles.button} onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <button className={styles.buy} onClick={() => handleBuyNow(product)}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropNutrition;
