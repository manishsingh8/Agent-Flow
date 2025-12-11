import { useState, useRef, useEffect } from "react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export const useChatbotLogic = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // ⬇️ Typing animation
  const typeReply = (fullText: string, onUpdate: (text: string) => void) => {
    let index = 0;

    const interval = setInterval(() => {
      onUpdate(fullText.slice(0, index));
      index++;

      if (index > fullText.length) clearInterval(interval);
    }, 20);
  };

  // ⬇️ API call when component loads
  useEffect(() => {
    const callWebhook = async () => {
      try {
        const response = await fetch(
          "https://vbc9tkh6z2.execute-api.us-east-1.amazonaws.com/webhook",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: 8,
              message: "Hello",
            }),
          }
        );

        const result = await response.json();
        const replyText = result?.reply || "No response.";

        // Create empty assistant message
        const messageId = Date.now().toString();
        setMessages((prev) => [
          ...prev,
          { id: messageId, role: "assistant", content: "" },
        ]);

        // Animate typing
        typeReply(replyText, (typed) => {
          setMessages((prev) =>
            prev.map((m) => (m.id === messageId ? { ...m, content: typed } : m))
          );
        });
      } catch (error) {
        console.error("Webhook Error:", error);
      }
    };

    callWebhook();
  }, []);

  // Auto scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.onstart = () => setIsListening(true);
        recognitionRef.current.onend = () => setIsListening(false);
        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((r: any) => r[0].transcript)
            .join("");

          setInputValue((prev) => prev + transcript);
        };
      }
    }
  }, []);

  // ⬇️ Chat message sending + typing animation
  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "user",
        content: userText,
      },
    ]);

    setInputValue("");

    try {
      const response = await fetch(
        "https://vbc9tkh6z2.execute-api.us-east-1.amazonaws.com/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: 8,
            message: userText,
          }),
        }
      );

      const result = await response.json();
      const replyText = result?.reply || "No reply received.";

      const messageId = (Date.now() + 1).toString();

      // Add empty assistant message first
      setMessages((prev) => [
        ...prev,
        { id: messageId, role: "assistant", content: "" },
      ]);

      // Animate typing
      typeReply(replyText, (typed) => {
        setMessages((prev) =>
          prev.map((m) => (m.id === messageId ? { ...m, content: typed } : m))
        );
      });
    } catch (error) {
      console.error("Chat Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content: "Something went wrong, please try again.",
        },
      ]);
    }
  };

  const handleMicClick = () => {
    if (recognitionRef.current) {
      if (isListening) recognitionRef.current.stop();
      else recognitionRef.current.start();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return {
    messages,
    inputValue,
    isListening,
    handleMicClick,
    handleKeyPress,
    setInputValue,
    handleSend,
    messagesEndRef,
  };
};
