const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100vh] flex items-center justify-center bg-[#E9EEEA]">
      {children}
    </div>
  );
};

export default ClerkLayout;
