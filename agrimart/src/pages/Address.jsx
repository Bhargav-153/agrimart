import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { showToast } from "@/helpers/showToast";
import { RoutePayment } from "@/helpers/RouteName";
import styles from "./Address.module.css";

const Address = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    pincode: "",
    city: "",
    state: ""
  });

  // Load saved address if exists
  useEffect(() => {
    const savedAddress = localStorage.getItem("checkout_address");
    if (savedAddress) {
      try {
        setForm(JSON.parse(savedAddress));
      } catch (err) {
        console.error("Error loading saved address:", err);
      }
    } else if (user) {
      // Pre-fill with user data if available
      setForm({
        name: user.name || "",
        mobile: user.phone || "",
        address: user.address || "",
        pincode: "",
        city: "",
        state: ""
      });
    }
  }, [user]);

  // Check if product data exists
  useEffect(() => {
    const productData = localStorage.getItem("checkout_product");
    if (!productData) {
      showToast("error", "No product selected. Redirecting...");
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContinue = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!form.name || !form.mobile || !form.address || !form.pincode || !form.city || !form.state) {
      showToast("error", "Please fill all fields");
      return;
    }

    // Validate mobile number
    if (form.mobile.length !== 10 || !/^\d+$/.test(form.mobile)) {
      showToast("error", "Please enter a valid 10-digit mobile number");
      return;
    }

    // Validate pincode
    if (form.pincode.length !== 6 || !/^\d+$/.test(form.pincode)) {
      showToast("error", "Please enter a valid 6-digit pincode");
      return;
    }

    // Save address to localStorage
    localStorage.setItem("checkout_address", JSON.stringify(form));
    showToast("success", "Address saved successfully!");
    navigate(RoutePayment);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Delivery Address</h1>
      
      <form onSubmit={handleContinue} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            placeholder="Enter your full name"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="mobile">Mobile Number *</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={form.mobile}
            placeholder="Enter 10-digit mobile number"
            onChange={handleChange}
            maxLength="10"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address">Full Address *</label>
          <textarea
            id="address"
            name="address"
            value={form.address}
            placeholder="Enter your complete address"
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="city">City *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={form.city}
              placeholder="Enter city"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="state">State *</label>
            <input
              type="text"
              id="state"
              name="state"
              value={form.state}
              placeholder="Enter state"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="pincode">Pincode *</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={form.pincode}
            placeholder="Enter 6-digit pincode"
            onChange={handleChange}
            maxLength="6"
            required
          />
        </div>

        <div className={styles.buttonGroup}>
          <Button type="button" className={styles.backBtn} onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button type="submit" className={styles.continueBtn}>
            Save & Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Address;
