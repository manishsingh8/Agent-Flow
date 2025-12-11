import "./TypingIndicator.css";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <div className="shrink-0 h-8 w-8 rounded-full bg-linear-to-br from-cyan-400 to-green-400 flex items-center justify-center text-sm">
        🤖
      </div>
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-4 py-2">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
