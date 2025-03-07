import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';  // ✅ Add Header
import SubNav from '@/components/SubNav'; // ✅ Add SubNav
import styles from './Login.module.css';
import { RouteSignUp } from '@/helpers/RouteName.js';  // ✅ Import Route

const Login = () => {
  return (
    <>
      <Header />
      <SubNav />

      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h2>Login to Your Account</h2>
          <form className={styles.loginForm}>
            <div className={styles.formGroup}>
              <input type="email" placeholder="Enter your email" required />
            </div>
            <div className={styles.formGroup}>
              <input type="password" placeholder="Enter your password" required />
            </div>
            <div className={styles.formOptions}>
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/forgot-password" className={styles.forgotPassword}>Forgot Password?</Link>
            </div>
            <button type="submit" className={styles.loginSubmit}>Login</button>
          </form>
          <p className={styles.signupText}>
            Don't have an account? <Link to={RouteSignUp}>Sign up</Link> {/* ✅ This Works Now */}
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
