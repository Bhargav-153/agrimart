import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '@/redux/cart/cart.slice';
import { showToast } from '@/helpers/showToast';
import { RouteAddress } from '@/helpers/RouteName';
import { getEnv } from '@/helpers/getEnv';
import styles from './Hero.module.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const Hero = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch products from all categories in parallel (excluding farm products and nursery)
        const [seedsRes, organicRes, cropNutritionRes, cropProtectionRes, equipmentRes] = await Promise.all([
          fetch(`${API_BASE_URL}/seeds/all`).catch(() => null),
          fetch(`${API_BASE_URL}/organic/all`).catch(() => null),
          fetch(`${API_BASE_URL}/crop-nutrition/all`).catch(() => null),
          fetch(`${API_BASE_URL}/crop-protection/all`).catch(() => null),
          fetch(`${API_BASE_URL}/equipment/all`).catch(() => null),
        ]);

        // Parse responses
        const seeds = seedsRes?.ok ? (await seedsRes.json())?.seeds || [] : [];
        const organics = organicRes?.ok ? (await organicRes.json())?.organics || [] : [];
        const cropNutrition = cropNutritionRes?.ok ? (await cropNutritionRes.json())?.products || [] : [];
        const cropProtection = cropProtectionRes?.ok ? (await cropProtectionRes.json())?.products || [] : [];
        const equipments = equipmentRes?.ok ? (await equipmentRes.json())?.equipments || [] : [];

        // Normalize and select products from each category to get 16 items total
        // Distribution: 4, 3, 3, 3, 3 = 16 items
        const normalizedProducts = [
          ...normalizeProducts(seeds.slice(0, 4), 'seed'),
          ...normalizeProducts(organics.slice(0, 3), 'organic'),
          ...normalizeProducts(cropNutrition.slice(0, 3), 'cropNutrition'),
          ...normalizeProducts(cropProtection.slice(0, 3), 'cropProtection'),
          ...normalizeProducts(equipments.slice(0, 3), 'equipment'),
        ];

        // Interleave products so they alternate (not grouped by category)
        const interleavedProducts = interleaveProducts(normalizedProducts);
        
        // Limit to exactly 16 products
        setProducts(interleavedProducts.slice(0, 16));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Normalize products from different categories to a common format
  const normalizeProducts = (products, category) => {
    return products.map((product) => {
      let normalized = {
        _id: product._id,
        category,
      };

      switch (category) {
        case 'seed':
          normalized = {
            ...normalized,
            name: product.name,
            description: product.description || '',
            price: product.price,
            unit: product.unit || 'unit',
            image: product.image || '/placeholder.png',
          };
          break;
        case 'organic':
          normalized = {
            ...normalized,
            name: product.name,
            description: product.description || '',
            price: product.price,
            unit: product.unit || 'unit',
            image: product.image || '/placeholder.png',
          };
          break;
        case 'cropNutrition':
        case 'cropProtection':
        case 'equipment':
          normalized = {
            ...normalized,
            name: product.name,
            description: product.description || '',
            price: product.price,
            unit: product.unit || 'unit',
            image: product.image || '/placeholder.png',
          };
          break;
        default:
          break;
      }

      return normalized;
    });
  };

  // Interleave products so they alternate between categories
  const interleaveProducts = (products) => {
    // Group products by category
    const categoryGroups = {};
    products.forEach((product) => {
      if (!categoryGroups[product.category]) {
        categoryGroups[product.category] = [];
      }
      categoryGroups[product.category].push(product);
    });

    const categories = Object.keys(categoryGroups);
    const interleaved = [];
    let maxLength = Math.max(...Object.values(categoryGroups).map((arr) => arr.length));

    // Interleave products from different categories
    for (let i = 0; i < maxLength; i++) {
      categories.forEach((category) => {
        if (categoryGroups[category][i]) {
          interleaved.push(categoryGroups[category][i]);
        }
      });
    }

    return interleaved;
  };

  // Handle Buy Now
  const handleBuyNow = async (product) => {
    if (!user?._id) {
      showToast('error', 'Please login first!');
      return;
    }

    const productData = {
      productId: product._id,
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      unit: product.unit || 'unit',
      category: product.category,
    };

    localStorage.setItem('checkout_product', JSON.stringify(productData));
    navigate(RouteAddress);
  };

  if (loading) {
    return (
      <div className={styles.heroContainer}>
        <main className={styles.mainContent}>
          <p>Loading products...</p>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.heroContainer}>
      <main className={styles.mainContent}>
        <h2 className="text-3xl font-bold">Featured Products</h2>
        <div className={styles.productGrid}>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={`${product.category}-${product._id}`} className={styles.productCard}>
                <img src={product.image} alt={product.name} className={styles.productImage} />
                <div className={styles.productInfo}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className={styles.price}>
                    ₹{product.price}/{product.unit}
                  </div>
                  <button className={styles.buyBtn} onClick={() => handleBuyNow(product)}>
                    Buy Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Hero;
