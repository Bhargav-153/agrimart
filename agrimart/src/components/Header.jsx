// filepath: c:\Users\Dell\OneDrive\Desktop\final\agrimart\Agrimart\src\components\Header.jsx
import React, { useState } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { FaUser, FaLeaf } from "react-icons/fa";
import { RouteAboutUs, RouteSignIn } from "@/helpers/RouteName.js";
import { RouteContactUs } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import usericon from "@/assets/user.jpg";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { removeUser } from "../redux/user/user.slice";
import { RouteIndex, RouteProfile } from "../helpers/RouteName";
import { showToast } from "../helpers/showToast";
import { getEnv } from "../helpers/getEnv";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/logout`, // Ensure backend is correctly set
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.user.email }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }

      dispatch(removeUser());
      Navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
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
        <nav
          className={`${styles.mainNav} ${menuOpen ? styles.active : ""}`}
          onClick={closeMenu}
        >
          <ul className={styles.navList}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={RouteAboutUs}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to={RouteContactUs}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Contact Us
              </NavLink>
            </li>
            <li className={styles.profile_section}>
              {!user.isLoggedIn ? (
                <NavLink
                  to={RouteSignIn}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.loginBtn} ${styles.active}`
                      : styles.loginBtn
                  }
                >
                  <FaUser className={styles.icon} /> Login
                </NavLink>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className={styles.profileAvatar}>
                      <AvatarImage src={user.user.avatar || usericon} />
                      <AvatarFallback>
                        {user.user.name
                          ? user.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className={styles.dropdownMenuModern}>
                    <div className={styles.profileHeader}>
                      <Avatar className={styles.dropdownAvatar}>
                        <AvatarImage src={user.user.avatar || usericon} />
                        <AvatarFallback>
                          {user.user.name
                            ? user.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className={styles.profileDetails}>
                        <div className={styles.profileName}>
                          {user.user.name}
                        </div>
                        <div className={styles.profileEmail}>
                          {user.user.email}
                        </div>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className={styles.dropdownItem}>
                      <Link to={RouteProfile}>
                        <FaRegUser className={styles.dropdownIcon} />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className={styles.dropdownItem}
                    >
                      <IoIosLogOut
                        className={styles.dropdownIcon}
                        color="red"
                      />
                      <span style={{ color: "red" }}>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </li>
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          className={`${styles.mobileMenuBtn} ${menuOpen ? styles.open : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle Navigation Menu"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
