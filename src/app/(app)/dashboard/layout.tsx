import React from "react";
import Navbar from "@/components/Navbar";

interface RootLayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
