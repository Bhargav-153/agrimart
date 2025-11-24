import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../helpers/showToast";
import { getEnv } from "../../helpers/getEnv";
import { removeUser } from "../../redux/user/user.slice";
import styles from "./DeleteAccount.module.css";

const DeleteAccount = () => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleDeleteAccount = async () => {
    if (!user || !user._id) {
      showToast("error", "User not found. Please log in again.");
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/user/delete-user/${user._id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        showToast("error", data.message || "Failed to delete account.");
        setIsDeleting(false);
        return;
      }

      // Clear user data from Redux
      dispatch(removeUser());
      
      // Show success message
      showToast("success", data.message || "Account deleted successfully.");
      
      // Navigate to home page after a short delay
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      showToast("error", error.message || "An error occurred while deleting your account.");
      setIsDeleting(false);
    }
  };

  return (
   <div className={styles.container}>
     <section>
      <h3 className="text-xl font-semibold mb-2 text-red-600">Delete Account</h3>
      {!confirm ? (
        <button 
          className={styles.btnRed} 
          onClick={() => setConfirm(true)}
          disabled={isDeleting}
        >
          Delete My Account
        </button>
      ) : (
        <div>
          <p className="mb-4 text-gray-700">Are you sure? This action cannot be undone.</p>
          <div className="flex gap-3">
            <button 
              className={styles.btnRed} 
              onClick={handleDeleteAccount}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </button>
            <button 
              className="btn" 
              onClick={() => setConfirm(false)}
              disabled={isDeleting}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
   </div>
  );
};

export default DeleteAccount;