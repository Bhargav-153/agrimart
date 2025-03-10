import React from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast.js";
import { RouteIndex } from "@/helpers/RouteName.js"; // Import RouteIndex
import { auth, provider } from "@/helpers/firebase.js"; // Ensure you have these imports

const GoggleLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const user = googleResponse.user;
      const bodyData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/google-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(bodyData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error:", errorText);
        return showToast("error", errorText);
      }

      const data = await response.json();
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      console.error("Error:", error);
      showToast("error", error.message);
    }
  };

  return (
    <Button variant="outline" className="w-full" onClick={handleLogin}>
      <FcGoogle />
      <span> Continue with Google</span>
    </Button>
  );
};

export default GoggleLogin;