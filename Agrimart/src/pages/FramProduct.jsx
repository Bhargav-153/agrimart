import React from "react";
import styles from "./FarmProduct.module.css";
import Header from "@/components/Header";
import SubNav from "@/components/SubNav";
import Footer from "@/components/Footer";

const farmProducts = [
  {
    id: 1,
    name: "Organic Tomatoes",
    price: "₹120/kg",
    quantity: "50 kg",
    image: "https://thumbs.dreamstime.com/b/tomato-sale-15022.jpg",
    farmer: {
      name: "Rajesh Kumar",
      location: "Pune, Maharashtra",
      contact: "9876543210",
    },
  },
  {
    id: 2,
    name: "Fresh Carrots",
    price: "₹80/kg",
    quantity: "40 kg",
    image: "https://i.ytimg.com/vi/EA3kdU01rJA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCXvL8xM-YF_zhEOj_4oJLyvJoSwA",
    farmer: {
      name: "Anjali Verma",
      location: "Nagpur, Maharashtra",
      contact: "9823456789",
    },
  },
  {
    id: 3,
    name: "Green Spinach",
    price: "₹50/kg",
    quantity: "60 kg",
    image: "https://c8.alamy.com/comp/D9D2E6/freshly-harvested-green-spinach-in-bunches-on-display-at-the-farmers-D9D2E6.jpg",
    farmer: {
      name: "Vikas Sharma",
      location: "Indore, Madhya Pradesh",
      contact: "9876543222",
    },
  },
  {
    id: 4,
    name: "Organic Potatoes",
    price: "₹40/kg",
    quantity: "100 kg",
    image: "https://5.imimg.com/data5/SELLER/Default/2024/9/450292172/OQ/GX/DO/141006955/organic-fresh-potato-500x500.jpeg",
    farmer: {
      name: "Sunita Devi",
      location: "Jaipur, Rajasthan",
      contact: "9123456780",
    },
  },
  {
    id: 5,
    name: "Fresh Onions",
    price: "₹30/kg",
    quantity: "120 kg",
    image: "https://4.imimg.com/data4/YB/WL/ANDROID-40885982/product-500x500.jpeg",
    farmer: {
      name: "Ramesh Yadav",
      location: "Lucknow, Uttar Pradesh",
      contact: "9345678901",
    },
  },
  {
    id: 6,
    name: "Sweet Corn",
    price: "₹90/kg",
    quantity: "30 kg",
    image: "https://adesolayinka.wordpress.com/wp-content/uploads/2017/09/wp-image-174982410.jpg?w=900",
    farmer: {
      name: "Priya Das",
      location: "Kolkata, West Bengal",
      contact: "9567890123",
    },
  },
  {
    id: 7,
    name: "Organic Brinjals",
    price: "₹70/kg",
    quantity: "45 kg",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/5/307176396/PE/AV/SQ/153357236/new-product-500x500.jpeg",
    farmer: {
      name: "Amit Gupta",
      location: "Bhopal, Madhya Pradesh",
      contact: "9456789012",
    },
  },
  {
    id: 8,
    name: "Cabbage",
    price: "₹35/kg",
    quantity: "80 kg",
    image: "https://img.freepik.com/premium-photo/fresh-vegetables-store-cabbage-plastic-boxes-counter-supermarket_156139-2083.jpg",
    farmer: {
      name: "Kavita Joshi",
      location: "Dehradun, Uttarakhand",
      contact: "9789012345",
    },
  },
  {
    id: 9,
    name: "Cauliflower",
    price: "₹60/kg",
    quantity: "50 kg",
    image: "https://good.business/wp-content/uploads/2024/07/caglar-oskay-UljCflnP1ik-unsplash-2.jpg",
    farmer: {
      name: "Suraj Kumar",
      location: "Patna, Bihar",
      contact: "9654321098",
    },
  },
  {
    id: 10,
    name: "Mushrooms",
    price: "₹150/kg",
    quantity: "25 kg",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShTzhyBTEHwz9kdiO7zqMn5F9q1kzzH1NQP0GNcfUWDXNLLO3LLuOgXQdRr7v0otQQWXk&usqp=CAU",
    farmer: {
      name: "Neha Sharma",
      location: "Shimla, Himachal Pradesh",
      contact: "9786543210",
    },
  },
  {
    id: 11,
    name: "Pumpkins",
    price: "₹25/kg",
    quantity: "90 kg",
    image: "https://www.shutterstock.com/image-photo/weebee-littles-pumpkins-bin-on-600nw-1140426506.jpg",
    farmer: {
      name: "Rajiv Pandey",
      location: "Varanasi, Uttar Pradesh",
      contact: "9456783456",
    },
  },
  {
    id: 12,
    name: "Red Chilli",
    price: "₹200/kg",
    quantity: "20 kg",
    image: "https://5.imimg.com/data5/SELLER/Default/2021/10/IV/FR/XY/96432258/guntur-dry-red-chilli-500x500.jpeg",
    farmer: {
      name: "Laxmi Patel",
      location: "Ahmedabad, Gujarat",
      contact: "9843210987",
    },
  },
];

const FarmProducts = () => {
  return (
    <>
    <Header />
    <SubNav />
    
    <div className={styles.farmContainer}>
      <h2 className={styles.title}>Farm Fresh Products</h2>
      <div className={styles.productsGrid}>
        {farmProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.image} alt={product.name} className={styles.productImage} />
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>{product.price}</p>
            <p className={styles.productQuantity}>Quantity: {product.quantity}</p>
            <div className={styles.farmerInfo}>
              <p><strong>Farmer:</strong> {product.farmer.name}</p>
              <p><strong>Location:</strong> {product.farmer.location}</p>
              <p><strong>Contact:</strong> {product.farmer.contact}</p>
            </div>
            <button className={styles.addToCart}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default FarmProducts;
