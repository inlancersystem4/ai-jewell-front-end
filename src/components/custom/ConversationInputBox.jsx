import { Button, Input } from "@headlessui/react";
import { Paperclip, Mic, Send } from "lucide-react";

export default function ConversationInputBox() {
  return (
    <div className="chat-input-box">
      <Input placeholder="Type here..." className="chat-input" />
      <div className="flex items-center justify-between p-1 pt-0">
        <div className="flex items-stretch gap-1">
          <Button className="chat-icon-input">
            <Paperclip />
          </Button>
          <Button className="chat-icon-input">
            <Mic />
          </Button>
        </div>
        <Button className="chat-send-btn">
          <Send size={14} />
          Send
        </Button>
      </div>
    </div>
  );
}
