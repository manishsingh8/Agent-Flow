import { X, Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { TypingIndicator } from "./TypingIndicator";
import { useChatbot } from "./chatbot.hook";
import ChatbotImg from "../../assets/images/chatbot.png";

interface ChatbotProps {
  onClose: () => void;
}

export function Chatbot({ onClose }: ChatbotProps) {
  const {
    messages,
    inputValue,
    setInputValue,
    isListening,
    isTyping,
    typingText,
    typingMessageId,
    messagesEndRef,
    handleSend,
    handleMicClick,
    handleKeyPress,
  } = useChatbot();

  return (
    <Card className="relative flex w-80 flex-col border-0 border-r rounded-none p-0 h-screen">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between border-b bg-white p-4 h-16">
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
        {/* {messages.length === 1 && ( */}
          <div className="flex flex-col items-center justify-center gap-4">
            <img src={ChatbotImg} alt="chatbot image" />
          </div>
        {/* )} */}

        {/* {messages.length === 1 && ( */}
          <div className="text-sm">
            <div className="text-xs text-muted-foreground text-left">
              You can talk to me, ask questions and perform tasks with text
              commands.
            </div>
            <ul className="list-disc pl-4 text-[#171717] marker:text-[#171717]">
              <li>
                <p className="text-xs text-muted-foreground text-left">
                  I can generate dynamic data analytics dashboards customized to
                  your needs.
                </p>
              </li>
              <li>
                <p className="text-xs text-muted-foreground text-left">
                  I can help you with jobs, queries and any tasks you would like
                  to create, execute or assign.
                </p>
              </li>
              <li>
                <p className="text-xs text-muted-foreground text-left">
                  I can scan and analyze your data and provide you with all the
                  answers .
                </p>
              </li>
            </ul>
          </div>
        {/* )} */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "assistant" && (
              <div className="shrink-0 h-8 w-8 rounded-full bg-linear-to-br from-cyan-400 to-green-400 flex items-center justify-center text-sm">
                🤖
              </div>
            )}
            <div
              className={`max-w-xs rounded-lg px-4 py-2 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-gray-100 text-foreground"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">
                {typingMessageId === message.id ? typingText : message.content}
              </p>
            </div>
          </div>
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="shrink-0 border-t bg-white p-4 space-y-3">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Ask me anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
            style={{
              backdropFilter: "blur(3.2908897399902344px)", // precise blur
              WebkitBackdropFilter: "blur(3.2908897399902344px)", // Safari support
              boxShadow: "0px 0px 20.57px 0px #24956333", // custom shadow
            }}
          />
          <Button
            variant={isListening ? "default" : "outline"}
            size="sm"
            onClick={handleMicClick}
            className="px-3 h-9"
            title="Use microphone"
            style={{
              backdropFilter: "blur(3.2908897399902344px)", // precise blur
              WebkitBackdropFilter: "blur(3.2908897399902344px)", // Safari support
              boxShadow: "0px 0px 20.57px 0px #24956333", // custom shadow
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
