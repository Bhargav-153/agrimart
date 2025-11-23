import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AccountSettings from "../components/settings/AccountSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import OrderPurchaseSettings from "../components/settings/OrderPurchaseSettings";
import SupportHelpSettings from "../components/settings/SupportHelpSettings";
import DeleteAccount from "../components/settings/DeleteAccount";
import LogoutButton from "../components/settings/LogoutButton";
import LanguageSwitcher from "../components/LanguageSwitcher";
import {
  FaUser,
  FaBell,
  FaShoppingCart,
  FaLifeRing,
  FaTrash,
  FaSignOutAlt,
  FaGlobe,
} from "react-icons/fa";
import styles from "./settings.module.css";

const Settings = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState("account");

  const menu = [
    { key: "account", label: t("profile"), icon: <FaUser /> },
    { key: "notifications", label: t("notifications"), icon: <FaBell /> },
    { key: "orders", label: t("orders"), icon: <FaShoppingCart /> },
    { key: "language", label: t("language"), icon: <FaGlobe /> },
    { key: "support", label: t("help"), icon: <FaLifeRing /> },
    { key: "delete", label: t("deleteAccount"), icon: <FaTrash /> },
    { key: "logout", label: t("logout"), icon: <FaSignOutAlt /> },
  ];

  const renderSection = () => {
    switch (active) {
      case "account":
        return <AccountSettings />;
      case "notifications":
        return <NotificationSettings />;
      case "orders":
        return <OrderPurchaseSettings />;
      case "language":
        return (
          <div className={styles.languageSection}>
            <h3 className={styles.languageHeading}>{t("selectLanguage")}</h3>
            <p className={styles.languageDescription}>
              {t("chooseLanguage")}
            </p>
            <div className={styles.languageSwitcherWrapper}>
              <LanguageSwitcher variant="button" />
            </div>
          </div>
        );
      case "support":
        return <SupportHelpSettings />;
      case "delete":
        return <DeleteAccount />;
      case "logout":
        return <LogoutButton />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.settingsBg}>
      <div className={styles.settingsContainer}>
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow flex overflow-hidden">
          {/* Sidebar */}
          <aside className={styles.settingsSidebar}>
            <h2 className="text-3xl font-bold mb-11 text-gray-800">
              {t("accountSettings")}
            </h2>
            <nav className={styles.settingsNav}>
              {menu.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActive(item.key)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg transition
                  ${
                    active === item.key
                      ? "bg-green-100 text-green-700 font-semibold"
                      : "hover:bg-gray-100 text-gray-700"
                  }
                  ${
                    item.key === "delete" ? "text-red-600 hover:bg-red-100" : ""
                  }
                  ${
                    item.key === "logout"
                      ? "mt-8 text-gray-500 hover:bg-gray-100"
                      : ""
                  }
                `}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>
          {/* Main Content */}
          <main className={styles.settingsMain}>
            <div className="mb-8">
              <h3>{menu.find((m) => m.key === active)?.label}</h3>
              <p>
                {active === "account" && t("changeProfile")}
                {active === "notifications" && t("manageNotifications")}
                {active === "orders" && t("viewOrders")}
                {active === "language" && t("changeLanguage")}
                {active === "support" && t("getHelp")}
                {active === "delete" && t("deleteAccountDesc")}
                {active === "logout" && t("signOut")}
              </p>
            </div>
            <div className={styles.settingsSection}>{renderSection()}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;
