import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../public/fonts/LufgaBold.ttf",
});

// TODO: change the logo to the actual logo file.
export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image
          // src="/next.svg"
          src="/logo.svg"
          alt="Logo"
          height={40}
          width={40}
        />
        <p
          className={cn("text-lg text-neutral-700 pb-1", headingFont.className)}
        >
          Reqtify
        </p>
      </div>
    </Link>
  );
};
