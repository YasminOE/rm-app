import { PixelBackground } from "@/components/pixelLoader";
import { Footer } from "./_components/footer";
import { NavBar } from "./_components/navbar";
import React, { useEffect, useState } from "react";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <PixelBackground /> */}
      <div className="h-[100vh] bg-[#E9EEEA] hero-container">
        <NavBar />
        <main className="pt-40 pb-20 bg-[#E9EEEA]">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default MarketingLayout;
