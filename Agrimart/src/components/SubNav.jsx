import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaStore, FaChevronDown, FaSeedling, FaShieldAlt, FaLeaf,
  FaTractor, FaAppleAlt, FaCloudSun, FaLandmark, FaPlusCircle, FaUserCircle
} from "react-icons/fa";
import styles from "./SubNav.module.css";
import { FaSearch } from "react-icons/fa";


const SubNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Debugging: Check if dropdown state changes
  useEffect(() => {
    console.log("Dropdown State:", isDropdownOpen);
  }, [isDropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={styles.subNav}>
      <div className={styles.navContainer}>
        <ul className={styles.navItems}>
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
              <li>
                <Link to="/shop/seeds">
                  <FaSeedling />
                  Seeds
                </Link>
              </li>
              <li>
                <Link to="/shop/protection">
                  <FaShieldAlt />
                  Crop Protection
                </Link>
              </li>
              <li>
                <Link to="/shop/nutrition">
                  <FaLeaf />
                  Crop Nutrition
                </Link>
              </li>
              <li>
                <Link to="/shop/equipment">
                  <FaTractor />
                  Equipment
                </Link>
              </li>
              <li>
                <Link to="/shop/organic">
                  <FaAppleAlt />
                  Organic
                </Link>
              </li>
            </ul>
          </li>

          {/* Other Nav Links */}
          <li>
            <Link to="/weather" className={styles.navLink}>
              <FaCloudSun />
              Weather
            </Link>
          </li>
          <li>
            <Link to="/nursery" className={styles.navLink}>
              <FaSeedling />
              Nursery
            </Link>
          </li>
          <li>
            <Link to="/schemes" className={styles.navLink}>
              <FaLandmark />
              Gov. Schemes
            </Link>
          </li>
          <li>
            <Link to="/add-product" className={styles.navLink}>
              <FaPlusCircle />
              Add Product
            </Link>
          </li>

          {/* <li>
            <Link to="/search" className={styles.navLink}>
            <FaSearch />
             Search
            </Link>
          </li> */}


          <li>
            <Link to="/profile" className={styles.navLink}>
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
