import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaStore,
  FaChevronDown,
  FaSeedling,
  FaShieldAlt,
  FaLeaf,
  FaTractor,
  FaAppleAlt,
  FaCloudSun,
  FaLandmark,
  FaPlusCircle,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import styles from "./SubNav.module.css";
import {
  RouteProfile,
  RouteRegistration,
  RouteSchemes,
} from "@/helpers/RouteName";
import { RouteWeather } from "@/helpers/RouteName";
import { RouteSeeds } from "@/helpers/RouteName";
import { RouteNursery } from "@/helpers/RouteName";
import { RouteProduct } from "@/helpers/RouteName";
import { RouteCropProtection } from "@/helpers/RouteName";
import { RouteCropNutrition } from "@/helpers/RouteName";

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
  const closeMenu = () => {
    setIsMobileNavOpen(false);
    setIsDropdownOpen(false); // also closes dropdown if open
  };

  return (
    <nav className={styles.subNav}>
      <div className={styles.navContainer}>
        {/* Mobile Menu Toggle Button (Hidden on larger screens) */}
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        >
          {isMobileNavOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Menu */}
        <ul
          className={`${styles.navItems} ${
            isMobileNavOpen ? styles.showMobile : ""
          }`}
        >
          {/* Shop Dropdown */}
          <li
            className={`${styles.shopDropdown} ${
              isDropdownOpen ? styles.active : ""
            }`}
            ref={dropdownRef}
          >
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

            <ul
              className={`${styles.dropdownMenu} ${
                isDropdownOpen ? styles.show : ""
              }`}
            >
              <li>
                <Link to={RouteSeeds}>
                  <FaSeedling /> Seeds
                </Link>
              </li>
              <li>
                <Link to={RouteCropProtection}>
                  <FaShieldAlt /> Crop Protection
                </Link>
              </li>
              <li>
                <Link to={RouteCropNutrition}>
                  <FaLeaf /> Crop Nutrition
                </Link>
              </li>
              <li>
                <Link to="/shop/equipment">
                  <FaTractor /> Equipment
                </Link>
              </li>
              <li>
                <Link to="/shop/organic">
                  <FaAppleAlt /> Organic
                </Link>
              </li>
            </ul>
          </li>

          {/* Other Nav Links */}
          <li>
            <Link
              to={RouteWeather}
              className={styles.navLink}
              onClick={closeMenu}
            >
              <FaCloudSun />
              Weather
            </Link>
          </li>
          <li>
            <Link
              to={RouteNursery}
              className={styles.navLink}
              onClick={closeMenu}
            >
              <FaSeedling />
              Nursery
            </Link>
          </li>
          <li>
            <Link
              to={RouteSchemes}
              className={styles.navLink}
              onClick={closeMenu}
            >
              <FaLandmark />
              Gov. Schemes
            </Link>
          </li>
          <li>
            <Link
              to={RouteRegistration}
              className={styles.navLink}
              onClick={closeMenu}
            >
              <FaPlusCircle />
              Add Product
            </Link>
          </li>
          <li>
            <Link
              to={RouteProduct}
              className={styles.navLink}
              onClick={closeMenu}
            >
              <FaPlusCircle />
              Farm Product
            </Link>
          </li>
          <li>
            <Link
              to={RouteProfile}
              className={styles.navLink}
              onClick={closeMenu}
            >
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
