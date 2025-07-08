// filepath: c:\Users\Dell\OneDrive\Desktop\final\agrimart\Agrimart\src\components\Header.jsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { FaUser, FaLeaf } from "react-icons/fa";
import { RouteAboutUs, RouteSignIn } from "@/helpers/RouteName.js";
import { RouteContactUs } from "@/helpers/RouteName";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import usericon from "@/assets/user.jpg"
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const user = useSelector((state) => state.user)

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
              <NavLink to={RouteAboutUs} className={({ isActive }) => (isActive ? styles.active : "")}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to={RouteContactUs} className={({ isActive }) => (isActive ? styles.active : "")}>
                Contact Us
              </NavLink>
            </li>
            <li>
              {!user.isLoggedIn ? 
               <NavLink to={RouteSignIn} className={({ isActive }) => (isActive ? `${styles.loginBtn} ${styles.active}` : styles.loginBtn)}>
                <FaUser className={styles.icon} /> Login
              </NavLink>  
              :
              <DropdownMenu >
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user.user.avatar || usericon} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={styles.dropdownMenu}>
                  <DropdownMenuLabel>
                    <p>{user.user.name}</p>
                    <p className="text-sm">{user.user.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="">
                      <FaRegUser />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link to="">
                      <IoIosLogOut />
                      Logout
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              }
             
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