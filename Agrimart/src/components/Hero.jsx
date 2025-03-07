import React from 'react';
import styles from './Hero.module.css'; // Import styles correctly

import wheatSeeds from '../assets/mix.jpg';
import corn from '../assets/corn.jpeg';
import cotton from '../assets/cotton.jpg';
import crop_Nutrition from '../assets/crop_Nutrition.jpeg';
import crop_protection from '../assets/crop_protection.jpg';
import greenhouse from '../assets/greenhouse.jpg';
import npk_fertilizer from '../assets/npk_fertilizer.jpg';
import organic_fertilizer from '../assets/organic_fertilizer.jpg';
import prinker from '../assets/prinker.jpg';
import hand_toolset from '../assets/hand_toolset.jpg';


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
  { image: corn, name: 'Rice Seeds', description: 'High-yield rice variety', price: '₹180/kg' },
  { image: cotton, name: 'Organic Fertilizer', description: 'Natural soil enrichment', price: '₹500/bag' },
  { image: crop_Nutrition, name: 'NPK Fertilizer', description: 'Balanced crop nutrition', price: '₹450/bag' },
  { image: crop_protection, name: 'Modern Tractor', description: 'Advanced farming vehicle', price: '₹850000' },
  { image: greenhouse, name: 'Hand Tools Set', description: 'Essential farming tools', price: '₹2000/set' },
  { image: npk_fertilizer, name: 'Crop Protection', description: 'Safe pest control solution', price: '₹350/bottle' },
  { image: organic_fertilizer, name: 'Bio Pesticide', description: 'Organic pest control', price: '₹400/bottle' },
  { image: prinker , name: 'Sprinkler System', description: 'Modern irrigation solution', price: '₹15000/set' },
  { image:hand_toolset , name: 'Greenhouse Kit', description: 'Complete setup materials', price: '₹25000/kit' },

  
];

export default Hero;
