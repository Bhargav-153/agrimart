import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import SubNav from "@/components/SubNav";
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

const Login = () => {
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

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <>
      <Header />
      <SubNav />
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
            <form onSubmit={form.handleSubmit(onSubmit)} className={styles.formGroup}>
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
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={styles.submitButton}>
                <Button type="submit">Login</Button>
              </div>
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
