import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaStore, FaChevronDown, FaSeedling, FaShieldAlt, FaLeaf,
  FaTractor, FaAppleAlt, FaCloudSun, FaLandmark, FaPlusCircle,
  FaUserCircle, FaBars, FaTimes
} from "react-icons/fa";
import styles from "./SubNav.module.css";
import { RouteProfile, RouteRegistration, RouteSchemes } from "@/helpers/RouteName";
import { RouteWeather } from "@/helpers/RouteName";

const SubNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={styles.subNav}>
      <div className={styles.navContainer}>
        {/* Mobile Menu Toggle Button (Hidden on larger screens) */}
        <button className={styles.mobileMenuBtn} onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
          {isMobileNavOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Menu */}
        <ul className={`${styles.navItems} ${isMobileNavOpen ? styles.showMobile : ""}`}>
          {/* Shop Dropdown */}
          <li className={`${styles.shopDropdown} ${isDropdownOpen ? styles.active : ""}`} ref={dropdownRef}>
            <button
              className={styles.navLink}
              onClick={(e) => {
                e.preventDefault();
                setIsDropdownOpen(!isDropdownOpen);
              }}
            >
              <FaStore />
              Shop
              <FaChevronDown className={isDropdownOpen ? styles.rotate : ""} />
            </button>

            <ul className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.show : ""}`}>
              <li><Link to="/shop/seeds"><FaSeedling /> Seeds</Link></li>
              <li><Link to="/shop/protection"><FaShieldAlt /> Crop Protection</Link></li>
              <li><Link to="/shop/nutrition"><FaLeaf /> Crop Nutrition</Link></li>
              <li><Link to="/shop/equipment"><FaTractor /> Equipment</Link></li>
              <li><Link to="/shop/organic"><FaAppleAlt /> Organic</Link></li>
            </ul> 
          </li>

          {/* Other Nav Links */}
          <li>
            <Link to={RouteWeather} className={styles.navLink}>
              <FaCloudSun />
              Weather
            </Link>
          </li>
          <li>
            <Link to="/nursey" className={styles.navLink}>
              <FaSeedling />
              Nursery
            </Link>
          </li>
          <li>
            <Link to={RouteSchemes} className={styles.navLink}>
              <FaLandmark />
              Gov. Schemes
            </Link>
          </li>
          <li>
            <Link to={RouteRegistration} className={styles.navLink}>
              <FaPlusCircle />
              Add Product
            </Link>
          </li>
          <li>
            <Link to="/farm-product" className={styles.navLink}>
              <FaPlusCircle />
              Farm Product
            </Link>
          </li>
          <li>
            <Link to={RouteProfile} className={styles.navLink}>
              <FaUserCircle />
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SubNav;