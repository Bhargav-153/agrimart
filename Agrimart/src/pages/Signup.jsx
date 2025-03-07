import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";  // ✅ Include Header
import SubNav from "@/components/SubNav"; // ✅ Include SubNav
import { RouteSignIn } from "@/helpers/RouteName.js"; // ✅ Import Route Name
import styles from './Signup.module.css';

const Signup = () => {
  return (
    <>
      <Header />
      <SubNav />

      <div className={styles.signupContainer}>
        <div className={styles.signupBox}>
          <h2>Create an Account</h2>
          <form className={styles.signupForm}>
            <div className={styles.formGroup}>
              <input type="text" placeholder="Full Name" required />
            </div>
            <div className={styles.formGroup}>
              <input type="email" placeholder="Email" required />
            </div>
            <div className={styles.formGroup}>
              <input type="password" placeholder="Password" required />
            </div>
            <button type="submit" className={styles.signupSubmit}>Sign Up</button>
          </form>
          <p className={styles.loginText}>
            Already have an account? <Link to={RouteSignIn}>Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
