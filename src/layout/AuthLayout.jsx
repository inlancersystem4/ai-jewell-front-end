import { Outlet } from "react-router";
import lightLogo from "/logo-light.png";

export default function AuthLayout() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 sm:p-6 p-4 md:p-10">
      <div className="flex w-full max-w-[472px] flex-col gap-10">
        <img src={lightLogo} alt="logo light" className="w-40 mx-auto" />
        <Outlet />
      </div>
    </main>
  );
}
