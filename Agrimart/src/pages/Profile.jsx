import React from "react";
import styles from "./Profile.module.css";
import Header from "@/components/Header";
import SubNav from "@/components/SubNav";
import Footer from "@/components/Footer";
import { FaUserCircle, FaShoppingBag, FaHeart, FaCog, FaTrash } from "react-icons/fa";

const Profile = () => {
    return (
        <>
            <Header />
            <SubNav />
            <main className={styles.mainContent}>
                <div className={styles.profileContainer}>
                    <div className={styles.profileSidebar}>
                        <div className={styles.userInfo}>
                            <div className={styles.userAvatar}>
                                <FaUserCircle size={80} />
                            </div>
                            <h2 className={styles.userName}>John Doe</h2>
                            <p className={styles.userEmail}>john.doe@example.com</p>
                        </div>
                        <nav className={styles.profileNav}>
                            <a href="#profile" className={styles.active}><FaUserCircle /> Profile</a>
                            <a href="#orders"><FaShoppingBag /> Orders</a>
                            <a href="#wishlist"><FaHeart /> Wishlist</a>
                            <a href="#settings"><FaCog /> Settings</a>
                        </nav>
                    </div>

                    <div className={styles.profileContent}>
                        <section id="profile" className={`${styles.profileSection} ${styles.active}`}>
                            <h2>Profile Information</h2>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}><label>Full Name</label><p>John Doe</p></div>
                                <div className={styles.infoItem}><label>Phone</label><p>+91 9876543210</p></div>
                                <div className={styles.infoItem}><label>Email</label><p>john.doe@example.com</p></div>
                                <div className={styles.infoItem}><label>Address</label><p>123 Farm Street, Rural District</p></div>
                            </div>
                        </section>

                        <section id="orders" className={styles.profileSection}>
                            <h2>My Orders</h2>
                            <div className={styles.ordersList}>
                                <div className={styles.orderCard}>
                                    <div className={styles.orderHeader}>
                                        <span className={styles.orderId}>Order #12345</span>
                                        <span className={styles.orderDate}>15 March 2024</span>
                                        <span className={styles.orderStatus}>Delivered</span>
                                    </div>
                                    <div className={styles.orderItems}>
                                        <img src="https://source.unsplash.com/100x100/?seeds" alt="Product" />
                                        <div className={styles.orderDetails}>
                                            <h3>Premium Wheat Seeds</h3>
                                            <p>Quantity: 2 kg</p>
                                            <p className={styles.price}>₹400</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="wishlist" className={styles.profileSection}>
                            <h2>My Wishlist</h2>
                            <div className={styles.wishlistGrid}>
                                <div className={styles.wishlistCard}>
                                    <img src="https://source.unsplash.com/200x200/?farming" alt="Product" />
                                    <div className={styles.wishlistInfo}>
                                        <h3>Organic Fertilizer</h3>
                                        <p className={styles.price}>₹750</p>
                                        <button className={styles.addToCart}>Add to Cart</button>
                                        <button className={styles.removeWishlist}><FaTrash /></button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Profile;
