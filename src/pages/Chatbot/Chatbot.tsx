import { X, Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import ChatbotImg from "../../assets/images/chatbot.png";
import { useChatbotLogic } from "./Chatbot.hook";

interface ChatbotProps {
  onClose: () => void;
}

export function Chatbot({ onClose }: ChatbotProps) {
  const {
    messages,
    inputValue,
    isListening,
    handleMicClick,
    handleKeyPress,
    setInputValue,
    handleSend,
    messagesEndRef,
  } = useChatbotLogic();
  return (
    <Card className="relative flex w-80 flex-col border-0 border-r rounded-none p-0">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-white p-4 h-16">
        <h2 className="font-semibold text-foreground">AI Assistant</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-6 w-6 p-0 hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <img src={ChatbotImg} alt="chatbot image" />
        </div>
        {/* Render Messages */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`text-sm max-w-[90%] p-2 rounded-lg whitespace-pre-wrap ${
              msg.role === "assistant"
                ? "bg-gray-100 text-black self-start"
                : "bg-[#249563] text-white self-end"
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t bg-white p-4 space-y-3">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Ask me anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
            style={{
              backdropFilter: "blur(3.2908897399902344px)",
              WebkitBackdropFilter: "blur(3.2908897399902344px)",
              boxShadow: "0px 0px 20.57px 0px #24956333",
            }}
          />
          <Button
            variant={isListening ? "default" : "outline"}
            size="sm"
            onClick={handleMicClick}
            className="px-3 h-9"
            title="Use microphone"
            style={{
              backdropFilter: "blur(3.2908897399902344px)",
              WebkitBackdropFilter: "blur(3.2908897399902344px)",
              boxShadow: "0px 0px 20.57px 0px #24956333",
            }}
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Button
            size="sm"
            onClick={handleSend}
            title="Send message"
            className="h-9 w-9 px-3 bg-[#249563] hover:bg-[#1f8156] text-white rounded-3xl"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
