import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getEnv } from "src/helpers/getEnv";
import { showToast } from "../../helpers/showToast";
import { getEnv } from "../../helpers/getEnv";
import { removeUser } from "../../redux/user/user.slice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isUserEmpty = !user || Object.keys(user).length === 0;

  const handleLogout = async () => {
    if (!isLoggedIn || isUserEmpty || !user.email) {
      showToast("error", "You are not logged in!");
      return;
    }
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.message);
        return;
      }

      dispatch(removeUser());
      navigate("/"); // or RouteIndex if you have a constant
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      style={{
        color: "white",
        background: "#dc2626",
        border: "none",
        borderRadius: "6px",
        padding: "10px 24px",
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
