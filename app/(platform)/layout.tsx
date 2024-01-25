import { QueryProvider } from "@/components/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster position="bottom-center" />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};

export default PlatformLayout;
