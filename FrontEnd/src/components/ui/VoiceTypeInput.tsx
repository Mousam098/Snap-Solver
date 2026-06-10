import { useState, useRef } from "react";
import { Mic, MicOff, Send } from "lucide-react";
import toast from "react-hot-toast";
import { calculatorAPI } from "@/Services/api";

interface Props {
  onResult: (expression: string, answer: string, steps: unknown[]) => void;
  dictOfVars: Record<string, unknown>;
}

export default function VoiceTypeInput({ onResult, dictOfVars }: Props) {
  const [problem, setProblem] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // 🎤 Voice input handler
  const toggleVoice = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition ||
      (
        window as unknown as {
          webkitSpeechRecognition: typeof window.SpeechRecognition;
        }
      ).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Voice input not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setProblem(transcript);
      toast.success(`Heard: "${transcript}"`);
    };

    recognition.onerror = () => {
      toast.error("Mic error. Please try again.");
      setListening(false);
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  // ⌨️ Submit typed/spoken problem
  const handleSubmit = async () => {
    if (!problem.trim()) {
      toast.error("Please type or speak a math problem first!");
      return;
    }

    try {
      setLoading(true);
      const toastId = toast.loading("Solving your problem...");

      const response = await calculatorAPI.analyzeText(problem, dictOfVars);
      const { expression, answer, steps } = response.data.data;

      toast.success("Solution found! 🎯", { id: toastId, duration: 3000 });
      onResult(expression, answer, steps);
      setProblem(""); // clear input after solving
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error solving problem. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-2 w-full max-w-md">
      {/* Text Input */}
      <input
        type="text"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Type a math problem..."
        className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
      />

      {/* Mic Button */}
      <button
        onClick={toggleVoice}
        title="Voice Input"
        className={`p-2 rounded-xl transition-all duration-300 hover:scale-105 ${
          listening
            ? "bg-red-500 animate-pulse text-white"
            : "bg-white/10 text-white hover:bg-white/20"
        }`}
      >
        {listening ? <MicOff size={18} /> : <Mic size={18} />}
      </button>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        title="Solve"
        className="p-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:scale-105 transition-all duration-300 disabled:opacity-50"
      >
        <Send size={18} />
      </button>
    </div>
  );
}
