import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./AddProduct.module.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { showToast } from "@/helpers/showToast";

const AddProduct = () => {
  const { t } = useTranslation();
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

  // ✅ Handle image input and convert to base64
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result }); // base64
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imagePreview) return showToast("error", t("imageRequired"));

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      };

      const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

      const res = await fetch(`${API_BASE}/api/farmerProducts/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to add product");

      showToast("success", t("productAddedSuccessfully"));

      // Reset form
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
      showToast("error", t("errorAddingProduct"));
    }
  };

  return (
    <main className={styles.mainContent}>
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>{t("addNewProduct")}</h1>
        <form className={styles.productForm} onSubmit={handleSubmit}>
          {/* Product Details */}
          <div className={styles.formSection}>
            <h2>{t("productDetails")}</h2>
            <div className={styles.formGroup}>
              <label htmlFor="productName">{t("productName")}</label>
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
                <label htmlFor="category">{t("category")}</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t("selectCategory")}</option>
                  <option value="Vegetable">{t("vegetable")}</option>
                  <option value="Fruit">{t("fruit")}</option>
                  <option value="Flower">{t("flower")}</option>
                  <option value="Seeds">{t("seeds")}</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="price">{t("price")} (₹)</label>
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
                <label htmlFor="contact">{t("contact")}</label>
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
              <label htmlFor="description">{t("productDescription")}</label>
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
            <h2>{t("stockInformation")}</h2>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="quantity">{t("quantityAvailable")}</label>
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
                <label htmlFor="unit">{t("unit")}</label>
                <select
                  id="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t("selectUnit")}</option>
                  <option value="kg">{t("kilogram")}</option>
                  <option value="g">{t("gram")}</option>
                  <option value="piece">{t("piece")}</option>
                  <option value="packet">{t("packet")}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className={styles.formSection}>
            <h2>{t("productImage")}</h2>
            <div className={styles.formGroup}>
              <label htmlFor="productImage">{t("uploadImage")}</label>
              <div className={styles.imageUploadContainer}>
                <div className={styles.imagePreview}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" />
                  ) : (
                    <div className={styles.uploadPlaceholder}>
                      <FaCloudUploadAlt size={40} />
                      <p>{t("clickToUpload")}</p>
                      <span>{t("supportedFormats")}</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="productImage"
                  accept="image/*"
                  onChange={handleImageUpload} // ✅ base64 handler
                  required
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitBtn}>
              {t("addProduct")}
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
              {t("reset")}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddProduct;
