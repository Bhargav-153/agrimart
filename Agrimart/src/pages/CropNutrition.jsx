import React from "react";
import styles from "./CropNutrition.module.css";


const products = [
  {
    id: 1,
    name: "Organic Fertilizer",
    price: "₹350",
    image: "https://example.com/organic-fertilizer.jpg",
    description: "Rich in nutrients to improve soil health and crop yield.",
    tags: ["Organic", "Soil Health", "Eco-Friendly"],
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 2,
    name: "Potassium Nitrate",
    price: "₹450",
    image: "https://example.com/potassium-nitrate.jpg",
    description: "Boosts root and fruit development for higher yields.",
    tags: ["Fertilizer", "High Yield"],
    rating: 4.2,
    reviews: 85,
  },
  {
    id: 3,
    name: "Liquid Seaweed Extract",
    price: "₹550",
    image: "https://example.com/seaweed-extract.jpg",
    description: "Enhances plant growth and stress resistance.",
    tags: ["Organic", "Growth Booster"],
    rating: 4.8,
    reviews: 190,
  },
  {
    id: 4,
    name: "Zinc Sulfate",
    price: "₹250",
    image: "https://example.com/zinc-sulfate.jpg",
    description: "Corrects zinc deficiency in crops for better productivity.",
    tags: ["Micronutrient", "Crop Health"],
    rating: 4.3,
    reviews: 70,
  },
  {
    id: 5,
    name: "Calcium Nitrate",
    price: "₹400",
    image: "https://example.com/calcium-nitrate.jpg",
    description: "Prevents blossom-end rot in tomatoes and peppers.",
    tags: ["Soil Enricher", "Fertilizer"],
    rating: 4.6,
    reviews: 110,
  },
  {
    id: 6,
    name: "Humic Acid",
    price: "₹300",
    image: "https://example.com/humic-acid.jpg",
    description: "Improves soil structure and enhances nutrient absorption.",
    tags: ["Soil Conditioner", "Organic"],
    rating: 4.4,
    reviews: 95,
  },
  {
    id: 7,
    name: "Magnesium Sulfate",
    price: "₹320",
    image: "https://example.com/magnesium-sulfate.jpg",
    description: "Essential for photosynthesis and chlorophyll production.",
    tags: ["Micronutrient", "Leaf Health"],
    rating: 4.1,
    reviews: 60,
  },
  {
    id: 8,
    name: "Boron Fertilizer",
    price: "₹280",
    image: "https://example.com/boron-fertilizer.jpg",
    description: "Supports flowering and fruit development in crops.",
    tags: ["Micronutrient", "Fertilizer"],
    rating: 4.2,
    reviews: 88,
  },
  {
    id: 9,
    name: "Nitrogen Fertilizer",
    price: "₹380",
    image: "https://example.com/nitrogen-fertilizer.jpg",
    description: "Promotes healthy leaf and stem growth in all crops.",
    tags: ["Growth Booster", "Soil Health"],
    rating: 4.7,
    reviews: 140,
  },
  {
    id: 10,
    name: "Phosphorus Fertilizer",
    price: "₹420",
    image: "https://example.com/phosphorus-fertilizer.jpg",
    description: "Encourages strong root development and plant strength.",
    tags: ["Fertilizer", "High Yield"],
    rating: 4.5,
    reviews: 100,
  },
  {
    id: 11,
    name: "Silicon Nutrient",
    price: "₹370",
    image: "https://example.com/silicon-nutrient.jpg",
    description: "Enhances disease resistance and crop durability.",
    tags: ["Resilience Booster", "Soil Health"],
    rating: 4.3,
    reviews: 85,
  },
  {
    id: 12,
    name: "Iron Chelate",
    price: "₹310",
    image: "https://example.com/iron-chelate.jpg",
    description: "Prevents iron deficiency for greener leaves.",
    tags: ["Micronutrient", "Leaf Health"],
    rating: 4.4,
    reviews: 90,
  },
  {
    id: 13,
    name: "Amino Acid Fertilizer",
    price: "₹460",
    image: "https://example.com/amino-acid.jpg",
    description: "Increases nutrient absorption and plant metabolism.",
    tags: ["Organic", "Growth Booster"],
    rating: 4.6,
    reviews: 125,
  },
  {
    id: 14,
    name: "Fish Emulsion Fertilizer",
    price: "₹530",
    image: "https://example.com/fish-emulsion.jpg",
    description: "Promotes vigorous growth and soil fertility.",
    tags: ["Organic", "Soil Enricher"],
    rating: 4.7,
    reviews: 150,
  },
  {
    id: 15,
    name: "Sulfur Fertilizer",
    price: "₹390",
    image: "https://example.com/sulfur-fertilizer.jpg",
    description: "Improves crop protein content and disease resistance.",
    tags: ["Fertilizer", "Soil Health"],
    rating: 4.3,
    reviews: 95,
  },
];

const CropNutrition = () => {
  return (
    <>

      <div className={styles.container}>
        <h2 className={styles.title}>Crop Nutrition Products</h2>
        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.image}
              />
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.description}>{product.description}</p>
              <p className={styles.price}>{product.price}</p>
              <div className={styles.tags}>
                {product.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <p className={styles.rating}>
                ⭐ {product.rating} ({product.reviews} reviews)
              </p>
              <button className={styles.button}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CropNutrition;
