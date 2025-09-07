import React from "react";
import styles from "./Seeds.module.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RouteSeedsAdd } from "@/helpers/RouteName";
import useFetch from "@/hooks/useFetch";

const ProductCategory = ({ title, products }) => (
  <div className={styles.categorySection}>
    {/* <h2>{title}</h2> */}
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <div key={product._id} className={styles.productCard}>
          <div className={styles.productImage}>
            <img src={product.image} alt={product.alt || product.name} />
            <div className={styles.productTags}>
              {product.tag && <span className={styles.tag}>{product.tag}</span>}
            </div>
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
            <button className={styles.addToCart}>Add to Cart</button>
            <button className={styles.buy}>Buy Now</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Seeds = () => {
  const { data, loading, error } = useFetch("http://localhost:3000/api/seeds/all");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No seeds found</p>;

  return (
    <main className={styles.mainContent}>
      {/* <div className={styles.shopContainer}> */}
        <h1 className="text-3xl font-bold text-center mb-6">Seeds</h1>
        <div className={styles.addSeedsWrapper}>
          <Button asChild className={styles.addSeedsBtn}>
            <Link to={RouteSeedsAdd}>Add Seeds</Link>
          </Button>
        </div>
        {/* data.seeds because backend sends { seeds: [...] } */}
        <ProductCategory title="All Seeds" products={data.seeds} />
      {/* </div> */}
    </main>
  );
};

export default Seeds;
