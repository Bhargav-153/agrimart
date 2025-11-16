import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FarmerRegistration.module.css";
import { showToast } from "@/helpers/showToast";

const FarmerRegistration = () => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  const [farmer, setFarmer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // ✅ Check if farmer already registered
  useEffect(() => {
    const checkFarmerRegistration = async () => {
      try {
        const storedEmail = localStorage.getItem("farmerEmail");
        if (!storedEmail) {
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE_URL}/farmers/check?email=${storedEmail}`);
        const data = await res.json();

        if (res.ok && data.exists) {
          localStorage.setItem("isRegistered", "true");
          setIsRegistered(true);
          navigate("/add-product");
        } else {
          setIsRegistered(false);
        }
      } catch (error) {
        console.error("Error checking farmer registration:", error);
      } finally {
        setLoading(false);
      }
    };

    checkFarmerRegistration();
  }, [navigate]);

  // ✅ Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFarmer((prev) => ({ ...prev, [id]: value }));
  };

  // ✅ Handle form submit
  const handleFarmerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/farmers/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: farmer.name,
          phone: farmer.phone,
          email: farmer.email,
          address: farmer.address,
          city: farmer.city,
          state: farmer.state,
          pincode: farmer.pincode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return showToast("error", data.message || "Registration failed");
      }

      showToast("success", "Registration successful");
      localStorage.setItem("isRegistered", "true");
      localStorage.setItem("farmerEmail", farmer.email);
      setIsRegistered(true);
      navigate("/add-product");
    } catch (error) {
      console.error("Error registering farmer:", error);
      showToast("error", "Something went wrong while connecting to server");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (isRegistered) {
    return null;
  }

  return (
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
              <input type="email" id="email" required onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>Address</h2>
          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" required onChange={handleInputChange} />
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
          <button type="submit" className={styles.submitBtn}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default FarmerRegistration;