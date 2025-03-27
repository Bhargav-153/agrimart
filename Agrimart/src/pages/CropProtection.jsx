import React from "react";
import styles from "./CropProtection.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "@/components/SubNav";

const cropProtectionProducts = [
  {
    id: 1,
    name: "Organic Pesticide",
    price: "₹450",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2022/1/VP/TD/VC/7787638/organic-pesticide-500x500.jpg",
    description: "Eco-friendly pesticide for organic farming.",
    tags: ["Organic"],
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 2,
    name: "Herbal Fungicide",
    price: "₹380",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2024/7/438135278/ZZ/MZ/MP/116294758/sanjeevani-total-protection-herbal-fungicide-1ltr-500x500.jpg",
    description: "Effective against fungal infections on crops.",
    tags: ["Herbal"],
    rating: 4.2,
    reviews: 85,
  },
  {
    id: 3,
    name: "Neem Oil Insecticide",
    price: "₹520",
    image:
      "https://www.katyayaniorganics.com/wp-content/uploads/2022/06/DSC_0297-resize-783x1024.jpg",
    description: "Natural insect repellent for crops.",
    tags: ["Neem"],
    rating: 4.7,
    reviews: 98,
  },
  {
    id: 4,
    name: "Copper Fungicide",
    price: "₹600",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/10/351022581/ED/EF/UI/147224256/fungicides-500x500.jpg",
    description: "Protects against bacterial and fungal diseases.",
    tags: ["Fungicide"],
    rating: 4.3,
    reviews: 76,
  },
  {
    id: 5,
    name: "Sulfur Dust",
    price: "₹300",
    image:
      "https://5.imimg.com/data5/ANDROID/Default/2022/5/UN/TW/RR/66532705/product-jpeg-500x500.jpg",
    description: "Effective against powdery mildew and mites.",
    tags: ["Organic"],
    rating: 4.1,
    reviews: 50,
  },
  {
    id: 6,
    name: "Bordeaux Mix",
    price: "₹450",
    image:
      "https://www.katyayaniorganics.com/wp-content/uploads/2023/10/bourdex-mixture-pouch_11zon.webp",
    description: "Traditional fungicide for plant disease prevention.",
    tags: ["Plant Protection"],
    rating: 4.4,
    reviews: 65,
  },
  {
    id: 7,
    name: "Pyrethrin Spray",
    price: "₹550",
    image:
      "https://agrotonomy.com/wp-content/uploads/2023/02/southern-ag-natural-pyrethrin-concentrate.jpg",
    description: "Fast-acting insecticide derived from chrysanthemums.",
    tags: ["Eco-friendly"],
    rating: 4.6,
    reviews: 90,
  },
  {
    id: 8,
    name: "Botanical Miticide",
    price: "₹420",
    image:
      "https://cdn.shopify.com/s/files/1/0722/2059/files/katra-botanical-miticide-file-13606.jpg?v=1737448794",
    description: "Safe and effective mite control solution.",
    tags: ["Pesticide"],
    rating: 4.3,
    reviews: 78,
  },
  {
    id: 9,
    name: "Insect Growth Regulator",
    price: "₹490",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2022/8/KD/CY/II/135714611/4.jpg",
    description: "Prevents insect reproduction for long-term control.",
    tags: ["Insect Control"],
    rating: 4.5,
    reviews: 85,
  },
  {
    id: 10,
    name: "Diatomaceous Earth",
    price: "₹350",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2022/8/SQ/GE/EG/2705021/organic-diatomaceous-earth-powder-500x500.jpg",
    description: "Non-toxic insect killer for crops and soil health.",
    tags: ["Organic"],
    rating: 4.7,
    reviews: 92,
  },
  {
    id: 11,
    name: "Bacillus Thuringiensis",
    price: "₹480",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFC8Fs3qMp1Kyh8nCzUf1thNQn2r_Rg_Lg_y57iElqL1d-5Y0zdSXCAkYHW4tQJeSwp9c&usqp=CAU",
    description: "Biological insecticide for caterpillars and worms.",
    tags: ["Biological"],
    rating: 4.8,
    reviews: 110,
  },
  {
    id: 12,
    name: "Spinosad Insecticide",
    price: "₹530",
    image:
      "https://www.kisanshop.in/s/65f83b39d13b931b1c1f1a9b/6746ada1b36d1000b10eb29b/katyayani-spino-25-spinosad-2-5percent-sc.jpg",
    description: "Broad-spectrum insecticide for effective pest control.",
    tags: ["Pesticide"],
    rating: 4.6,
    reviews: 88,
  },
  {
    id: 13,
    name: "Garlic Barrier Spray",
    price: "₹390",
    image: "https://www.arbico-organics.com/images/popup/1452602-p-l.jpg",
    description: "Natural pest repellent made from garlic extracts.",
    tags: ["Natural"],
    rating: 4.2,
    reviews: 70,
  },
  {
    id: 14,
    name: "Sulfur Fungicide",
    price: "₹320",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHXJDBo-Jx52hdUjJip13H9-M-B3-bgJKRkw&s",
    description: "Protects plants from fungal diseases.",
    tags: ["Plant Health"],
    rating: 4.4,
    reviews: 80,
  },
  {
    id: 15,
    name: "Horticultural Oil",
    price: "₹470",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0tIbI4SdlMCSXLfFdjEZKQlOGB4xXXDh6w&s",
    description: "Effective against scale insects and aphids.",
    tags: ["Oil-based"],
    rating: 4.3,
    reviews: 75,
  },
];

const CropProtection = () => {
  return (
    <>
      <Header />
      <SubNav />
      <div className={styles.container}>
        <h2 className={styles.title}>Crop Protection Products</h2>
        <div className={styles.productsGrid}>
          {cropProtectionProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              <p className={styles.productPrice}>{product.price}</p>
              <div className={styles.productTags}>
                {product.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <p className={styles.productRating}>
                ⭐ {product.rating} ({product.reviews} reviews)
              </p>

              <button className={styles.addToCart}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CropProtection;
