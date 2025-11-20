import React from "react";
import styles from "./Seeds.module.css";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { RouteSeedsAdd, RouteCart, RouteAddress } from "@/helpers/RouteName";
import useFetch from "@/hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cart/cart.slice";
import { showToast } from "@/helpers/showToast";

// ✅ ProductCategory Component
const ProductCategory = ({ title, products, onAddToCart, onBuyNow }) => (
  <div className={styles.categorySection}>
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <div key={product._id} className={styles.productCard}>
          <div className={styles.productImage}>
            <img src={product.image} alt={product.alt || product.name} />
            {product.tag && <span className={styles.tag}>{product.tag}</span>}
          </div>
          <div className={styles.productInfo}>
            <h3>{product.name}</h3>
            <p className={styles.productDescription}>{product.description}</p>
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
              Add to Cart
            </button>
            <button className={styles.buy} onClick={() => onBuyNow(product)}>
              Buy Now
            </button>



          </div>
        </div>
      ))}
    </div>
  </div>
);

// ✅ Main Seeds Component
const Seeds = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Get logged-in user from Redux
  const user = useSelector((state) => state.user?.user);

  const { data, loading, error } = useFetch("http://localhost:3000/api/seeds/all");

  // ✅ Handle Add to Cart
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
            unit: product.unit || "unit",
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

  // ✅ Handle Buy Now
  const handleBuyNow = async (product) => {
    if (!user?._id) {
      showToast("error", "Please login first!");
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
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.seeds?.length) return <p>No seeds found</p>;

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  return (
    <main className={styles.mainContent}>
      <h1 className="text-3xl font-bold text-center mb-6">Seeds</h1>

      {isAdmin && (
        <div className={styles.addSeedsWrapper}>
          <Button asChild className={styles.addSeedsBtn}>
            <Link to={RouteSeedsAdd}>Add Seeds</Link>
          </Button>
        </div>
      )}

      <ProductCategory
        title="All Seeds"
        products={data.seeds}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </main>
  );
};

export default Seeds;
