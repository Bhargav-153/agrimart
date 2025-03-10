import React, { useState } from "react";
import styles from "./AddProduct.module.css";
import { FaLeaf, FaUser, FaStore, FaCloudSun, FaLandmark, FaPlusCircle, FaUserCircle, FaCloudUploadAlt } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "@/components/SubNav";

const AddProduct = () => {
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Header />
            <SubNav />
            <main className={styles.mainContent}>
                <div className={styles.formContainer}>
                    <h1 className={styles.formTitle}>Add New Product</h1>
                    <form className={styles.productForm}>
                        <div className={styles.formSection}>
                            <h2>Product Details</h2>
                            <div className={styles.formGroup}>
                                <label htmlFor="productName">Product Name</label>
                                <input type="text" id="productName" required />
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="category">Category</label>
                                    <select id="category" required>
                                        <option value="">Select Category</option>
                                        <option value="seeds">Seeds</option>
                                        <option value="fertilizers">Fertilizers</option>
                                        <option value="pesticides">Pesticides</option>
                                        <option value="equipment">Equipment</option>
                                        <option value="organic">Organic Products</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="price">Price (₹)</label>
                                    <input type="number" id="price" min="0" required />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="description">Product Description</label>
                                <textarea id="description" rows="4" required></textarea>
                            </div>
                        </div>

                        <div className={styles.formSection}>
                            <h2>Stock Information</h2>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="quantity">Quantity Available</label>
                                    <input type="number" id="quantity" min="1" required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="unit">Unit</label>
                                    <select id="unit" required>
                                        <option value="">Select Unit</option>
                                        <option value="kg">Kilogram</option>
                                        <option value="g">Gram</option>
                                        <option value="piece">Piece</option>
                                        <option value="packet">Packet</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className={styles.formSection}>
                            <h2>Product Image</h2>
                            <div className={styles.formGroup}>
                                <label htmlFor="productImage">Upload Image</label>
                                <div className={styles.imageUploadContainer}>
                                    <div className={styles.imagePreview}>
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" />
                                        ) : (
                                            <div className={styles.uploadPlaceholder}>
                                                <FaCloudUploadAlt size={40} />
                                                <p>Click to upload or drag and drop</p>
                                                <span>Supported formats: JPG, PNG</span>
                                            </div>
                                        )}
                                    </div>
                                    <input type="file" id="productImage" accept="image/*" onChange={handleImageUpload} required />
                                </div>
                            </div>
                        </div>

                        <div className={styles.formActions}>
                            <button type="submit" className={styles.submitBtn}>Add Product</button>
                            <button type="reset" className={styles.resetBtn}>Reset</button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AddProduct;
