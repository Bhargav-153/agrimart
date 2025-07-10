import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import SubNav from "@/components/SubNav";
import Footer from "@/components/Footer";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <>
      <Header />
      <SubNav />
      <main className="w-full">
        <div className="w-full min-h-[calc(100vh-200px)] py-10 px-4">
          <Outlet /> {/* This renders the current route's component */}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
