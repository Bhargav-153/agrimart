import React, { useState } from "react";
import styles from "./AccountSettings.module.css";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSelector } from "react-redux";

const AccountSettings = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [success, setSuccess] = useState(false);
  const user = useSelector((state) => state.user);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <section className={styles.accountSettings}>
      <h3 className={styles.heading}>Account Settings</h3>
      <div className={styles.avatarWrapper}>
        <Avatar className={styles.profileAvatar}>
          <AvatarImage
            src={user.user?.avatar || UserIcon}
            className="border-2 border-gray-300 rounded-full w-25 h-25 flex items-center justify-center "
          />
          <AvatarFallback>
            {user.user?.name
              ? user.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : "U"}
          </AvatarFallback>
        </Avatar>
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
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Confirm Password"
            className={styles.input}
          />
        </div>
        <input
          name="address"
          value={form.password}
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
