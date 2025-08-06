import SeekerNavbar from "@/components/layout/SeekerNavbar";
import React from "react";

const dashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header className="fixed top-0 left-0 z-50 w-full bg-background">
        <div className="max-w-screen-xl px-0 md:px-4 mx-auto">
          <SeekerNavbar />
        </div>
      </header>
      <main className=" mx-auto max-w-screen-xl  flex gap-4 pt-20 md:px-12 px-1 md:pt-24">
        <div className="w-full ">{children}</div>
      </main>
    </div>
  );
};

export default dashboardLayout;
