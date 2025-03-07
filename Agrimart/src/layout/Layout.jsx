import Footer from "@/components/Footer";

import React from "react";
import Header from "@/components/Header";
import SubNav from "@/components/SubNav";
import Hero from "@/components/Hero";

const Layout = () => {
  return (
    <>
      <Header />
      <SubNav />
      <Hero />
      <main className=" w-full">
        <div className="w-full min-h-[calc(100vh-50px)] py-28 px-10">
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Layout;
