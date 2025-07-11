import React from "react";
import styles from "./Seeds.module.css";


const seedsData = {
  grains: [
    {
      id: 1,
      image: "/src/assets/wheat.jpg",
      alt: "Wheat Seeds",
      tag: "Bestseller",
      name: "Premium Wheat Seeds",
      description: "High-yield wheat variety suitable for all seasons",
      rating: 4.5,
      reviews: 128,
      price: "₹250/kg",
    },
    {
      id: 2,
      image: "/src/assets/rice.jpg",
      alt: "Rice Seeds",
      tag: "Organic",
      name: "Organic Rice Seeds",
      description: "Traditional basmati variety for premium quality",
      rating: 4.0,
      reviews: 95,
      price: "₹300/kg",
    },
    {
      id: 3,
      image: "/src/assets/corn.jpeg",
      alt: "Corn Seeds",
      tag: "New",
      name: "Hybrid Corn Seeds",
      description: "High-yielding corn variety with excellent disease resistance",
      rating: 4.0,
      reviews: 82,
      price: "₹450/kg",
    },
    {
      id: 1,
      image: "/src/assets/cotton.jpg",
      alt: "cotton Seeds",
      tag: "Bestseller",
      name: "Premium Cotton Seeds",
      description: "Long-staple cotton variety for superior quality",
      rating: 4.5,
      reviews: 156,
      price: "₹850/kg",
    },
    {
      id: 2,
      image: "/src/assets/sunflower.jpg",
      alt: "Sunflower Seeds",
      tag: "Featured",
      name: "Hybrid Sunflower Seeds",
      description: "High oil content variety with drought tolerance",
      rating: 4.0,
      reviews: 73,
      price: "₹380/kg",
    },
    {
      id: 3,
      image: "/src/assets/soyabean.jpg",
      alt: "Soybean Seeds",
      tag: "Organic",
      name: "Organic Soybean Seeds",
      description: "Early maturing variety with high protein content",
      rating: 4.0,
      reviews: 94,
      price: "₹200/kg",
    },
    {
      id: 1,
      image: "/src/assets/jeera.jpg",
      alt: "Jeera Seeds",
      tag: "Premium",
      name: "Premium Jeera Seeds",
      description: "Aromatic Gujarat jeera variety with intense flavor",
      rating: 4.5,
      reviews: 189,
      price: "₹250/kg",
    },
    {
      id: 2,
      image: "/src/assets/mix.jpg",
      alt: "Vegetable Seeds Pack",
      tag: "Value Pack",
      name: "Mixed Vegetable Seeds Pack",
      description: "Collection of 10 popular vegetable varieties",
      rating: 4.5,
      reviews: 218,
      price: "₹499/kg",
    },
    
  ],
  vegetables: [
    {
      id: 4,
      image: "/src/assets/tomato_seeds.jpg",
      alt: "Tomato Seeds",
      tag: "Bestseller",
      name: "Hybrid Tomato Seeds",
      description: "Disease-resistant variety with high yield potential",
      rating: 5.0,
      reviews: 167,
      price: "₹120/packet",
    },
    {
      id: 5,
      image: "/src/assets/brinjal_seeds.jpg",
      alt: "Brinjal Seeds",
      tag: "Organic",
      name: "Purple Long Brinjal Seeds",
      description: "High-yielding variety with excellent fruit quality",
      rating: 4.0,
      reviews: 78,
      price: "₹90/packet",
    },
    {
      id: 6,
      image: "/src/assets/capsicum.jpeg",
      alt: "Capsicum Seeds",
      tag: "Premium",
      name: "Hybrid Capsicum Seeds",
      description: "Large fruit size with thick flesh, ideal for commercial growing",
      rating: 4.5,
      reviews: 112,
      price: "₹140/packet",
    },
    {
      id: 6,
      image: "/src/assets/cucumber.jpg",
      alt: "Cucumber Seeds",
      tag: "Bestseller",
      name: "F1 Cucumber Seeds",
      description: "Early maturing variety with consistent fruit size",
      rating: 4.5,
      reviews: 112,
      price: "₹170/packet",
    },
  ],
  fruits: [
    {
      id: 7,
      image: "/src/assets/papaiya.jpg",
      alt: "Papaya Seeds",
      tag: "Organic",
      name: "Red Lady Papaya Seeds",
      description: "High-yielding dwarf variety, ideal for home gardens",
      rating: 4.0,
      reviews: 89,
      price: "₹180/packet",
    },
    {
      id: 8,
      image: "/src/assets/watermelon.jpg",
      alt: "Watermelon Seeds",
      tag: "Featured",
      name: "Sugar Baby Watermelon Seeds",
      description: "Sweet variety with dark green rind and red flesh",
      rating: 4.0,
      reviews: 92,
      price: "₹160/packet",
    },
    {
      id: 9,
      image: "/src/assets/muskmelon.jpg",
      alt: "Muskmelon Seeds",
      tag: "Premium",
      name: "Honey Dew Muskmelon Seeds",
      description: "Sweet aromatic variety with high market value",
      rating: 4.5,
      reviews: 87,
      price: "₹140/packet",
    },
    {
      id: 9,
      image: "/src/assets/aamla.jpg",
      alt: "Amla Seeds",
      tag: "Organic",
      name: "Indian Gooseberry Seeds",
      description: "High-yielding Amla variety rich in Vitamin C",
      rating: 4.2,
      reviews: 187,
      price: "₹140/packet",
    },
  ],
  spiceSeeds : [
    {
      id: 1,
      name: "Premium Chilli Seeds",
      description: "High-heat variety perfect for commercial cultivation",
      image: "/src/assets/chilli.jpg",
      tag: "Premium",
      rating: 4.5,
      reviews: 143,
      price: "₹150/packet"
    },
    {
      id: 2,
      name: "Local Coriander Seeds",
      description: "Fast-growing variety with aromatic leaves",
      image: "/src/assets/dhana.jpg",
      tag: "Organic",
      rating: 5,
      reviews: 203,
      price: "₹60/packet"
    },
    {
      id: 3,
      name: "Gujarat Cumin Seeds",
      description: "High-quality variety with strong aroma",
      image: "/src/assets/cumin.jpg",
      tag: "Premium",
      rating: 4.5,
      reviews: 167,
      price: "₹180/packet"
    },
    {
      id: 3,
      name: "Kasuri Methi Seeds",
      description: "Small-leaved variety perfect for dried fenugreek",
      image: "/src/assets/methi.jpeg",
      tag: "Premium",
      rating: 4.5,
      reviews: 125,
      price: "₹70/packet"
    },
  ],
};

const ProductCategory = ({ title, products }) => (
  <div className={styles.categorySection}>
    <h2>{title}</h2>
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <div className={styles.productImage}>
            <img src={product.image} alt={product.alt} />
            <div className={styles.productTags}>
              <span className={styles.tag}>{product.tag}</span>
            </div>
          </div>
          <div className={styles.productInfo}>
            <h3>{product.name}</h3>
            <p className={styles.productDescription}>{product.description}</p>
            <div className={styles.productMeta}>
              <span className={styles.productRating}>
                {'★'.repeat(Math.floor(product.rating))}
                {product.rating % 1 !== 0 ? '☆' : ''}
                <span>({product.reviews})</span>
              </span>
              <span className={styles.productPrice}>{product.price}</span>
            </div>
            <button className={styles.addToCart}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SeedsShop = () => {
  return (
    <>

      <main className={styles.mainContent}>
        <div className={styles.shopContainer}>
          <h1>Seeds</h1>
          <ProductCategory title="Grain Seeds" products={seedsData.grains} />
          <ProductCategory title="Vegetable Seeds" products={seedsData.vegetables} />
          <ProductCategory title="Fruit Seeds" products={seedsData.fruits} />
          <ProductCategory title="spice Seeds" products={seedsData. spiceSeeds} />
        </div>
      </main>

    </>
  );
};

export default SeedsShop;
