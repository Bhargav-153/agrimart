import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import GoogleLogin from "@/components/GoggleLogin";
import styles from "./Login.module.css";
import { RouteSignUp } from "@/helpers/RouteName";
import { RouteIndex } from "@/helpers/RouteName";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice.js";

const Login = () => {
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, "Password field required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setShowSignUpPrompt(false);
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/login`, // Ensure backend is correctly set
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        // Check if user not found (404 status or message contains "not found" or "sign up")
        if (response.status === 404 || 
            data.message?.toLowerCase().includes("not found") || 
            data.message?.toLowerCase().includes("sign up")) {
          setShowSignUpPrompt(true);
        }
        return showToast("error", data.message);
      }

      dispatch(setUser(data.user))
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }
  return (
    <>
 
      <div className={styles.loginContainer}>
        <Card className={styles.loginBox}>
          <h2 className={styles.heading}>Login Into Account</h2>
          <div className={styles.googleLogin}>
            <GoogleLogin />
            <div className={styles.separator}>
              <span>Or</span>
            </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={styles.formGroup}
            >
              <div className={styles.inputField}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={styles.inputField}>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={styles.submitButton}>
                <Button type="submit">Login</Button>
              </div>
              {showSignUpPrompt && (
                <div className={styles.signUpPrompt}>
                  <p className={styles.signUpPromptText}>
                    Account not found. Please sign up to create a new account.
                  </p>
                  <Link to={RouteSignUp}>
                    <Button type="button" variant="default" className={styles.signUpButton}>
                      Sign Up Now
                    </Button>
                  </Link>
                </div>
              )}
              <div className={styles.signUpText}>
                <p>Don't have an account?</p>
                <Link className={styles.signUpLink} to={RouteSignUp}>
                  Sign Up
                </Link>
              </div>
            </form>
          </Form>
        </Card>
      </div>

    </>
  );
};

export default Login;
