import React, { useState } from "react";
import AccountSettings from "../components/settings/AccountSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import OrderPurchaseSettings from "../components/settings/OrderPurchaseSettings";
import SupportHelpSettings from "../components/settings/SupportHelpSettings";
import DeleteAccount from "../components/settings/DeleteAccount";
import LogoutButton from "../components/settings/LogoutButton";
import {
  FaUser,
  FaBell,
  FaShoppingCart,
  FaLifeRing,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";
import styles from "./settings.module.css";

const menu = [
  { key: "account", label: "Profile", icon: <FaUser /> },
  { key: "notifications", label: "Notifications", icon: <FaBell /> },
  { key: "orders", label: "Orders", icon: <FaShoppingCart /> },
  { key: "support", label: "Help", icon: <FaLifeRing /> },
  { key: "delete", label: "Delete Account", icon: <FaTrash /> },
  { key: "logout", label: "Logout", icon: <FaSignOutAlt /> },
];

const Settings = () => {
  const [active, setActive] = useState("account");

  const renderSection = () => {
    switch (active) {
      case "account":
        return <AccountSettings />;
      case "notifications":
        return <NotificationSettings />;
      case "orders":
        return <OrderPurchaseSettings />;
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
              Account Settings
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
                {active === "account" &&
                  "Change your profile and account settings"}
                {active === "notifications" &&
                  "Manage your notification preferences"}
                {active === "orders" &&
                  "View and manage your orders and purchases"}
                {active === "support" && "Get help and support"}
                {active === "delete" && "Permanently delete your account"}
                {active === "logout" && "Sign out of your account"}
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
