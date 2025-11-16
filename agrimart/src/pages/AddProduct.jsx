import React, { useState } from "react";
import styles from "./AddProduct.module.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { showToast } from "@/helpers/showToast";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    contact: "",
    description: "",
    quantity: "",
    unit: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Handle text & select inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle image input
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file }); // important: backend expects "image"
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });

      const API_BASE =
        import.meta.env.VITE_API_BASE || "http://localhost:3000";

      // ✅ Fixed API endpoint (farmerProducts, not farmProducts)
      const res = await fetch(`${API_BASE}/api/farmerProducts/products`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to add product");

      showToast("success", "Product added successfully");

      // Reset form after success
      setFormData({
        productName: "",
        category: "",
        price: "",
        contact: "",
        description: "",
        quantity: "",
        unit: "",
        image: null,
      });
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      showToast("error", "Error adding product");
    }
  };

  return (
    <main className={styles.mainContent}>
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Add New Product</h1>
        <form className={styles.productForm} onSubmit={handleSubmit}>
          {/* Product Details */}
          <div className={styles.formSection}>
            <h2>Product Details</h2>
            <div className={styles.formGroup}>
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                id="productName"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Vegetable">Vegetable</option>
                  <option value="Fruit">Fruit</option>
                  <option value="Flower">Flower</option>
                  <option value="Flower">Seeds</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="price">Price (₹)</label>
                <input
                  type="number"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="contact">Contact</label>
                <input
                  type="text"
                  id="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description">Product Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
              ></textarea>
            </div>
          </div>

          {/* Stock Info */}
          <div className={styles.formSection}>
            <h2>Stock Information</h2>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="quantity">Quantity Available</label>
                <input
                  type="number"
                  id="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="unit">Unit</label>
                <select
                  id="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Unit</option>
                  <option value="kg">Kilogram</option>
                  <option value="g">Gram</option>
                  <option value="piece">Piece</option>
                  <option value="packet">Packet</option>
                </select>
              </div>
            </div>
          </div>

          {/* Image Upload */}
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
                <input
                  type="file"
                  id="productImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitBtn}>
              Add Product
            </button>
            <button
              type="reset"
              className={styles.resetBtn}
              onClick={() => {
                setFormData({
                  productName: "",
                  category: "",
                  price: "",
                  contact: "",
                  description: "",
                  quantity: "",
                  unit: "",
                  image: null,
                });
                setImagePreview(null);
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddProduct;
