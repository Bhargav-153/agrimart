import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FarmerRegistration.module.css";
import Header from "@/components/Header";
import SubNav from "@/components/SubNav";
import Footer from "@/components/Footer";

const FarmerRegistration = () => {
  const [isRegistered, setIsRegistered] = useState(
    localStorage.getItem("isRegistered") === "true"
  );
  const navigate = useNavigate();

  const [farmer, setFarmer] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFarmer((prev) => ({ ...prev, [id]: value }));
  };

  const handleFarmerSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("isRegistered", "true");
    setIsRegistered(true);
    navigate("/add-product", { replace: true }); // Redirects to Add Product Page
  };

  return (
    <>
      <Header />
      <SubNav />
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Farmer Registration</h1>
        <form onSubmit={handleFarmerSubmit} className={styles.registrationForm}>
          <div className={styles.formSection}>
            <h2>Personal Details</h2>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" required onChange={handleInputChange} />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" required onChange={handleInputChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={handleInputChange} />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h2>Address</h2>
            <div className={styles.formGroup}>
              <label htmlFor="street">Street Address</label>
              <input type="text" id="street" required onChange={handleInputChange} />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" required onChange={handleInputChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="state">State</label>
                <input type="text" id="state" required onChange={handleInputChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="pincode">Pincode</label>
                <input type="text" id="pincode" required onChange={handleInputChange} />
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitBtn}>Register</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default FarmerRegistration;
