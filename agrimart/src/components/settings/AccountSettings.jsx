import React, { useEffect, useState } from "react";
import styles from "./AccountSettings.module.css";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { UserIcon } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from "react-dropzone";
import { showToast } from "@/helpers/showToast";
import { setUser } from "@/redux/user/user.slice";


const AccountSettings = () => {

  const [filePreview, setPreview] = useState()
  const [file, setFile] = useState()

  const dispatch = useDispatch()

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      showToast("error", "Passwords do not match!");
      return;
    }

    try {
      const formData = new FormData()
      formData.append("file" , file)
      formData.append("data", JSON.stringify(form));

      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/user/update-user/${userData.user._id}`, {
        method: 'put',
        credentials: 'include',
        body: formData
      });

      const data = await response.json()
      if (!response.ok) {
        return showToast('error', data.message)

      }
      
      dispatch(setUser(data.user))
      showToast('success', data.message)
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);


    } catch (error) {
      showToast('error', error.message)

    }

  }


  const handleFileSelection = (files) =>{
    const file = files[0]
    const preview = URL.createObjectURL(file)
    setFile(file)
    setPreview(preview)
  }

  return (
    <section className={styles.accountSettings}>
      <h3 className={styles.heading}>Account Settings</h3>
      <div className={`${styles.avatarWrapper} relative group`}>
        <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
          {({getRootProps, getInputProps}) => (
          
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Avatar className={styles.profileAvatar}>
          <AvatarImage
            src={filePreview? filePreview: userData?.user?.avatar || ""}
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
          <div className="absolute inset-0 hidden group-hover:flex items-center justify-center cursor-pointer transition-all rounded-full">
            <IoCameraOutline className="text-black w-4 h-4" />
          </div>
        </Avatar>
          </div>
          )}
        </Dropzone>
        
  {/* Camera icon overlay - now works */}
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fieldRow}>
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

        <div className={styles.fieldRow}>
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
