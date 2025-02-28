import { Outlet } from "react-router";
export default function ChatLayout() {
  return (
    <main className="w-full flex items-stretch h-dvh">
      <Outlet />
    </main>
  );
}
