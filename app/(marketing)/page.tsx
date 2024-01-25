// "use client"

import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import { Urbanist } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PixelBackground } from "@/components/pixelLoader";
import { AnimatePresence } from "framer-motion";

const headingFont = localFont({
  src: "../../public/fonts/LufgaBold.ttf",
});

const textFont = Urbanist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  return (
    <>
      {/* <div className="fixed top-0 z-[10000]"> */}
      <PixelBackground />
      {/* </div> */}
      <div className="flex items-center justify-center max-w-md md:max-w-3xl lg:max-w-4xl xl:max-w-3xl mx-auto hero-container">
        <div className="flex items-center justify-center flex-col mt-[200px] hero-text">
          <div
            className={cn(
              "flex items-center justify-center flex-col",
              headingFont.className
            )}
          >
            <span className="text-3xl md:text-6xl bg-gradient-to-r from-[#E9EEEA] to-[#D8DFE9] text-white px-4 p-2 rounded-md pb-6 w-fit hero-title">
              Work forward.
            </span>
            <h1 className="text-3xl md:text-6xl text-left text-neutral-800 mt-6 mb-6 max-w-md md:max-w-3xl flex items-center">
              All productivity your team needs are available at Reqtify
            </h1>
          </div>
          <div
            className={cn(
              "text-sm md:text-md text-neutral-400 mt-4 max-w-md md:max-w-3xl text-left",
              textFont.className
            )}
          >
            Collaborate, Manage projects, and Reach new productivity peaks. From
            high rises to home office, the way your team works is unique.
            Accomplish it all with Reqtify.
          </div>
          <div className="mt-6 w-full ">
            <Button className="hero-cta" size="lg" asChild>
              <Link href="/sign-up">Get started</Link>
            </Button>
          </div>
        </div>
        <Image
          src="/phone-image.png"
          alt="phone"
          height={300}
          width={300}
          className="hidden lg:block image-container"
        />
      </div>
    </>
  );
};

export default MarketingPage;
