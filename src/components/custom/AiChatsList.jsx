import { Link, useParams, useLocation } from "react-router";
import { post } from "@/utils/axiosWrapper";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setConversationRefetch } from "@/redux/actions";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function AiChatList() {
  const conversationRefetch = useSelector(
    (state) => state.c.conversationRefetch
  );

  const location = useLocation();
  const dispatch = useDispatch();

  const { pid: projectID } = useParams();

  const [currentPage, setCurrentPage] = useState(1);

  async function chatListFn() {
    const formData = new FormData();
    formData.append("search", "");
    formData.append("page_no", "");
    formData.append("project_id", projectID || "");

    try {
      const response = await post("c/chat-list", formData);
      if (response.success == 1) {
        setCurrentPage(1);
        return response.data;
      } else {
        toast.error(response.message);
        return null;
      }
    } catch (e) {
      console.error(e);
      toast.error("An unexpected error occurred. Please try again.");
      throw e;
    } finally {
      dispatch(setConversationRefetch(false));
    }
  }

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["chatlist", currentPage, projectID || ""],
    queryFn: chatListFn,
  });

  useEffect(() => {
    if (projectID) {
      refetch();
    }
  }, [projectID, refetch, location]);

  useEffect(() => {
    if (conversationRefetch) {
      refetch();
    }
  }, [conversationRefetch, refetch]);

  return (
    <ul className="px-2.5">
      {isLoading ? (
        <div className="w-full py-20 flex items-center justify-center">
          <LoaderCircle className="animate-spin" size={40} />
        </div>
      ) : data.chat_list.chats && data.chat_list.chats.length > 0 ? (
        <li className="space-y-2.5">
          <p className="text-sm text-black">Recent</p>
          <ul className="space-y-1">
            {data.chat_list.chats.map((chat) => (
              <li key={chat.chat_id}>
                <Link
                  to={`${
                    chat.project_id
                      ? `/p/${chat.project_id}/${chat.chat_id}`
                      : `/${chat.chat_id}`
                  }`}
                  className="w-full hover:underline line-clamp-1 text-medium-gray text-sm hover:text-black"
                >
                  {chat.chat_title}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ) : (
        <div className="w-full py-20 flex items-center justify-center">
          <p className="text-sm text-center text-medium-gray">No Chat Found</p>
        </div>
      )}
    </ul>
  );
}
