import Filter from "@/components/Filter";
import SeekerNavbar from "@/components/layout/SeekerNavbar";
import { Suspense } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <header className="fixed  top-0 left-0 z-50 w-full bg-card">
        <div className="max-w-screen-xl px-2 md:px-4 mx-auto">
          <SeekerNavbar />
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto flex gap-4 pt-20 md:px-4 px-1 md:pt-24">
        {/* Left Sidebar */}
        <aside className="sticky top-20 h-fit hidden md:flex basis-1/4">
        <Suspense fallback={<div>Loading filters...</div>}>
          <Filter />
          </Suspense>
        </aside>
        <section className="flex-1 basis-2/3 min-w-2/3 flex justify-center">
          <div className="w-full ">{children}</div>
        </section>

        {/* Right Sidebar
            <aside className="hidden lg:flex basis-1/4">
            <AdsContainer />
            </aside> */}
      </main>
    </div>
  );
};

export default layout;
