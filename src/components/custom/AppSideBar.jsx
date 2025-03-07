import lightLogo from "/logo-light.png";
import { Button } from "@headlessui/react";
import { FolderPlus, Plus, RotateCcw, Trash2, Folders } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router";
import { post } from "@/utils/axiosWrapper";
import { setAddProject } from "@/redux/actions";
import AlertDialog from "@/components/ui/AlertDialog";
import AiChatList from "./AiChatsList";
import { toast } from "sonner";
import { useState } from "react";

export default function AppSideBar() {
  const location = useLocation();
  const { id: conversation, pid: projectID } = useParams();
  const dispatch = useDispatch();

  const projectActive = location.pathname;

  const [chatDelete, setChatDelete] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!conversation) return;
    const formData = new FormData();
    formData.append("chat_id", conversation);

    try {
      const response = await post("c/chat-delete", formData);
      if (response.success == 1) {
        toast.success("Project deleted successfully.");
      } else {
        toast.error(response.message);
      }
    } catch (e) {
      console.error(e);
      toast.error("An unexpected error occurred. Please try again.");
      throw e;
    } finally {
      setChatDelete(false);
    }
  };

  return (
    <aside className="app-sidebar">
      <div className="space-y-6">
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
                to={`${projectID ? `/p/${projectID}` : `/`}`}
                className={`sidebar-btn bg-[#F7F9FD] !text-onyx-black`}
              >
                <Plus />
                New chat
              </Link>
            </div>
          </div>
        </div>
        <AiChatList />
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
        {conversation && (
          <Button className="sidebar-btn" onClick={() => setChatDelete(true)}>
            {" "}
            <Trash2 />
            Clear conversation
          </Button>
        )}
      </div>
      <AlertDialog
        isOpen={chatDelete}
        setClose={() => setChatDelete(false)}
        ok={handleDeleteConfirm}
        title="Delete Conversation"
        description="Are you sure you want to delete this Conversation? This action cannot be undone."
      />
    </aside>
  );
}
