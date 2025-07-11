import React, { useEffect, useState } from "react";
import styles from "./AccountSettings.module.css";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSelector } from "react-redux";
import { UserIcon } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { IoCameraOutline } from "react-icons/io5";


const AccountSettings = () => {

  const user = useSelector((state) => state.user)

  const {data: userData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/user/get-user/${user.user._id}`, {method: 'get',credentials: 'include'})


  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userData && userData.success) {
      setForm({
        name: userData.user.name || "",
        email: userData.user.email || "",
        phone: userData.user.phone || "",
        password: "",
        confirmPassword: "",
        address: userData.user.address || "",
      });
    }
  }, [userData]);


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <section className={styles.accountSettings}>
      <h3 className={styles.heading}>Account Settings</h3>
      <div className={`${styles.avatarWrapper} relative group`}>
        <Avatar className={styles.profileAvatar}>
          <AvatarImage
            src={userData?.user?.avatar || ""}
            className="border-2 border-gray-300 rounded-full w-[120px] h-[120px] object-cover"
          />
          <AvatarFallback className="flex items-center justify-center text-xl font-semibold">
            {userData?.user?.name
              ? userData.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
              : <UserIcon className="w-6 h-6" />}
          </AvatarFallback>
        </Avatar>

  {/* Camera icon overlay - now works */}
        <div className="absolute inset-0 hidden group-hover:flex items-center justify-center cursor-pointer transition-all rounded-full">
          <IoCameraOutline className="text-black w-4 h-4" />
        </div>
      </div>


      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="flex flex-row gap-4 ">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className={styles.input}
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className={styles.input}
          />
        </div>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className={styles.input}
        />

        <div className="flex flex-row gap-4">
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Change Password"
            className={styles.input}
          />
          <input
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className={styles.input}
          />
        </div>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className={styles.input}
        />

        <button type="submit" className={styles.saveBtn}>
          Save
        </button>
        {success && <div className={styles.success}>Saved!</div>}
      </form>
    </section>
  );
};

export default AccountSettings;
