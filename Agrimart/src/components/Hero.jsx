import React from 'react';
import styles from './Hero.module.css'; // Import styles correctly

import wheatSeeds from '../assets/wheat_seeds.jpg';
import rice from '../assets/rice_seeds.jpg';
import organic from '../assets/organic_fertilizer.jpg';
import npk from '../assets/npk_fertilizer.jpg';
import tractor from '../assets/modern_tractor.jpg';
import hand_toolset from '../assets/hand_toolset.jpg';
import protection from '../assets/crop_protection.jpg';
import bio from '../assets/bio.avif';
import prinker from '../assets/prinker.jpg';
import greenhouse from '../assets/greenhouse.jpg';
import soiltest from '../assets/soil_testing.jpg';
import nutrition from '../assets/crop_Nutrition.jpeg';



const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <main className={styles.mainContent}>
        <div className={styles.productGrid}>
          {products.map((product, index) => (
            <div key={index} className={styles.productCard}>
              <img src={product.image} alt={product.name} className={styles.productImage} />
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className={styles.price}>{product.price}</div>
                <button className={styles.buyBtn}>Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

const products = [
  { image: wheatSeeds, name: 'Wheat Seeds', description: 'Premium quality wheat seeds', price: '₹200/kg' },
  { image: rice, name: 'Rice Seeds', description: 'High-yield rice variety', price: '₹180/kg' },
  { image: organic, name: 'Organic Fertilizer', description: 'Natural soil enrichment', price: '₹500/bag' },
  { image: npk, name: 'NPK Fertilizer', description: 'Balanced crop nutrition', price: '₹450/bag' },
  { image: tractor, name: 'Modern Tractor', description: 'Advanced farming vehicle', price: '₹850000' },
  { image: hand_toolset, name: 'Hand Tools Set', description: 'Essential farming tools', price: '₹2000/set' },
  { image: protection, name: 'Crop Protection', description: 'Safe pest control solution', price: '₹350/bottle' },
  { image: bio, name: 'Bio Pesticide', description: 'Organic pest control', price: '₹400/bottle' },
  { image: prinker , name: 'Sprinkler System', description: 'Modern irrigation solution', price: '₹15000/set' },
  { image:greenhouse , name: 'Greenhouse Kit', description: 'Complete setup materials', price: '₹25000/kit' },
  { image:soiltest , name: 'Soil Testing Kit', description: 'Professional soil analysis', price: '₹1200/kit' },
  { image:nutrition , name: 'Crop Nutrition', description: 'Advanced nutrient formula ', price: '750/pack' },
  
];

export default Hero;
