import React from "react";
import styles from "./Nursery.module.css";


const nurseries = [
  { id: 1, name: "Green Leaf Nursery", address: "123 Garden Street, Bangalore, India", contact: "+91 9876543210" },
  { id: 2, name: "EcoGrow Plants", address: "456 Eco Road, Pune, India", contact: "+91 9876543211" },
  { id: 3, name: "Nature's Touch", address: "789 Green Avenue, Delhi, India", contact: "+91 9876543212" },
  { id: 4, name: "Bloom & Grow", address: "101 Flora Lane, Mumbai, India", contact: "+91 9876543213" },
  { id: 5, name: "Urban Greens", address: "222 Urban Street, Kolkata, India", contact: "+91 9876543214" },
  { id: 6, name: "Evergreen Nursery", address: "333 Evergreen Road, Chennai, India", contact: "+91 9876543215" },
  { id: 7, name: "Sunshine Gardens", address: "444 Sunshine Avenue, Hyderabad, India", contact: "+91 9876543216" },
  { id: 8, name: "Verdant Haven", address: "555 Verdant Street, Jaipur, India", contact: "+91 9876543217" },
  { id: 9, name: "Botanic Bliss", address: "666 Botanic Lane, Ahmedabad, India", contact: "+91 9876543218" },
  { id: 10, name: "Oasis Nursery", address: "777 Oasis Road, Lucknow, India", contact: "+91 9876543219" },
  { id: 11, name: "Tranquil Flora", address: "888 Tranquil Street, Chandigarh, India", contact: "+91 9876543220" },
  { id: 12, name: "Fresh Sprouts", address: "999 Fresh Avenue, Bhopal, India", contact: "+91 9876543221" },
];

const nurseryPlants = [
  { id: 1, name: "Rose Plant", price: "₹250", image: "https://media.istockphoto.com/id/658244618/photo/2-rows-of-red-rose-potted-plants.jpg?s=612x612&w=0&k=20&c=YHiSywS0KOIzT4ahCGd324dNaAGxHMLj0oUu82Y1pmM=", nursery: nurseries[0] },
  { id: 2, name: "Money Plant", price: "₹150", image: "https://5.imimg.com/data5/PV/QT/CB/SELLER-97296600/nursery-plants-500x500.jpg", nursery: nurseries[1] },
  { id: 3, name: "Tulsi Plant", price: "₹100", image: "https://thumbs.dreamstime.com/b/tulsi-tree-plant-nursery-sell-medicine-multiple-treatment-279418041.jpg", nursery: nurseries[2] },
  { id: 4, name: "Mango Sapling", price: "₹500", image: "https://2.wlimg.com/product_images/bc-full/2023/1/5455880/kesar-mango-plants-1674202187-3587826.jpg", nursery: nurseries[3] },
  { id: 5, name: "Neem Plant", price: "₹180", image: "https://m.media-amazon.com/images/I/713bH7ogJoL.jpg", nursery: nurseries[4] },
  { id: 6, name: "Coconut Plant", price: "₹350", image: "https://as1.ftcdn.net/v2/jpg/01/23/58/22/1000_F_123582276_8Etcv4nAXO0682uIZeGIRXtHpPasBUoA.jpg", nursery: nurseries[5] },
  { id: 7, name: "Banyan Plant", price: "₹400", image: "https://5.imimg.com/data5/ANDROID/Default/2024/8/443998845/MB/LV/AZ/180364036/product-jpeg-500x500.jpg", nursery: nurseries[6] },
  { id: 8, name: "Banana Plant", price: "₹220", image: "https://rukminim2.flixcart.com/image/850/1000/kyhlfgw0/plant-sapling/2/e/b/no-annual-yes-g9-commercial-yellow-banana-plant-3-feet-1-green-original-imagapvsgh5hd3cv.jpeg?q=90&crop=false", nursery: nurseries[7] },
  { id: 9, name: "Jasmine Plant", price: "₹130", image: "https://5.imimg.com/data5/ANDROID/Default/2021/9/YF/LM/UI/137854786/product-jpeg-500x500.jpg", nursery: nurseries[8] },
  { id: 10, name: "Peepal Plant", price: "₹300", image: "https://cdn11.bigcommerce.com/s-ifhig5mh0a/images/stencil/500x659/products/4633/3959/Ficus_religiosa_24_6-9_x_3-4_810_FI_1__57839.1690500724.JPG?c=1", nursery: nurseries[9] },
  { id: 11, name: "Lemon Plant", price: "₹170", image: "https://5.imimg.com/data5/JR/MM/MY-13970472/lemon-plant-500x500.jpg", nursery: nurseries[10] },
  { id: 12, name: "Aloe Vera", price: "₹120", image: "https://thumbs.dreamstime.com/b/rows-aloe-vera-saplings-flower-pots-growing-nursery-223181191.jpg", nursery: nurseries[11] },
];

const Nursery = () => {
  return (
    <>
      
      <div className={styles.nurseryContainer}>
        <h2 className={styles.title}>Nursery Plants</h2>

        {/* Nursery Addresses */}
        {/* <div className={styles.nurseryList}>
          {nurseries.map((nursery) => (
            <div key={nursery.id} className={styles.nurseryCard}>
              <h3>{nursery.name}</h3>
              <p>{nursery.address}</p>
              <p><strong>Contact:</strong> {nursery.contact}</p>
            </div>
          ))}
        </div> */}

        {/* Nursery Plants */}
        <h3 className={styles.sectionTitle}>Flowering & Fruit Plants</h3>
        <div className={styles.plantsGrid}>
          {nurseryPlants.map((plant) => (
            <div key={plant.id} className={styles.plantCard}>
              <img src={plant.image} alt={plant.name} className={styles.plantImage} />
              <h3 className={styles.plantName}>{plant.name}</h3>
              <p className={styles.plantPrice}>{plant.price}</p>
              <p className={styles.nurseryDetails}>
                <strong>Nursery:</strong> {plant.nursery.name}<br />
                <strong>Address:</strong> {plant.nursery.address}<br />
                <strong>Contact:</strong> {plant.nursery.contact}
              </p>
              <button className={styles.addToCart}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
};

export default Nursery;
