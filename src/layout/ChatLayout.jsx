import { Outlet } from "react-router";
import AppSideBar from "@/components/custom/AppSideBar";
import AppHeader from "@/components/custom/AppHeader";

export default function ChatLayout() {
  return (
    <main className="w-full flex items-stretch h-dvh">
      <AppSideBar />
      <section className="w-full h-full flex flex-col">
        <AppHeader />
        <div className="h-full w-full px-2 overflow-y-auto">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
