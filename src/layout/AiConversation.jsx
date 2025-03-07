import ConversationInputBox from "@/components/custom/ConversationInputBox";

export default function AIConversationLayout() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-full overflow-y-auto"></div>
      <div className="pb-2 pt-2">
        <ConversationInputBox />
      </div>
    </div>
  );
}
