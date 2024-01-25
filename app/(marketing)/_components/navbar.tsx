import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const NavBar = () => {
  return (
    <div className="fixed top-0 w-full h-[10%] px-4 bg-[#E9EEEA] shadow-md flex items-center fully-rounded">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="lg" variant="outline" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size="lg" asChild variant="primary">
            <Link href="/sign-up">Get started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
