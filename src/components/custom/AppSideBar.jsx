import lightLogo from "/logo-light.png";
import { Button } from "@headlessui/react";
import { FolderPlus, Plus, RotateCcw, Trash2, Folders } from "lucide-react";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { setAddProject } from "@/redux/actions";

export default function AppSideBar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const projectActive = location.pathname;

  return (
    <aside className="app-sidebar">
      <div className="divide-y divide-cool-gray">
        <div className="p-2.5 pt-0 pb-4">
          <img src={lightLogo} alt="logo light" className="w-32" />
        </div>
        <div className="pt-2.5 space-y-2">
          <div className="space-y-1">
            <Button
              className="sidebar-btn"
              onClick={() => dispatch(setAddProject(true))}
            >
              {" "}
              <FolderPlus />
              New Project
            </Button>
            <Link
              to="/"
              className={`sidebar-btn bg-[#F7F9FD] !text-onyx-black`}
            >
              <Plus />
              New chat
            </Link>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <Button className="sidebar-btn">
          {" "}
          <RotateCcw />
          History
        </Button>
        <Link
          to="/p"
          className={`sidebar-btn ${projectActive === "/p" ? "active" : ""}`}
        >
          <Folders />
          Projects
        </Link>
        <Button className="sidebar-btn">
          {" "}
          <Trash2 />
          Clear conversation
        </Button>
      </div>
    </aside>
  );
}
