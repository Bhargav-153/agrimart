// filepath: c:\Users\Dell\OneDrive\Desktop\final\agrimart\Agrimart\src\components\Header.jsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { FaUser, FaLeaf } from "react-icons/fa";
import { RouteSignIn } from "../helpers/RouteName.js";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.mainHeader}>
      <div className={styles.headerContainer}>
        <div className={styles.logoSection}>
          <Link to="/" className={styles.logoLink}>
            <FaLeaf className={styles.logoIcon} />
            <span className={styles.siteName}>Agrimart</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className={`${styles.mainNav} ${menuOpen ? styles.active : ""}`}>
          <ul className={styles.navList}>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : "")}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? styles.active : "")}>
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to={RouteSignIn} className={({ isActive }) => (isActive ? `${styles.loginBtn} ${styles.active}` : styles.loginBtn)}>
                <FaUser className={styles.icon} /> Login
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button className={`${styles.mobileMenuBtn} ${menuOpen ? styles.open : ""}`} onClick={toggleMenu} aria-label="Toggle Navigation Menu">
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </div>
    </header>
  );
};

export default Header;