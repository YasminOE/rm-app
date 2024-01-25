import { Navbar } from "./_components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100vh] bg-[#E9EEEA]">
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
