import { Outlet } from "react-router";
import AppSideBar from "@/components/custom/AppSideBar";
import AppHeader from "@/components/custom/AppHeader";
import AppProject from "@/components/custom/AddProject";

export default function ChatLayout() {
  return (
    <main className="w-full flex items-stretch h-dvh">
      <AppSideBar />
      <section className="w-full h-full flex flex-col relative">
        <AppHeader />
        <div className="h-full w-full pt-12">
          <Outlet />
        </div>
      </section>
      <AppProject />
    </main>
  );
}
