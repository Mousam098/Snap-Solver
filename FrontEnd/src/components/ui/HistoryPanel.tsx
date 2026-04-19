import { useEffect, useState } from "react";
import { historyAPI } from "../services/api";
import { Trash2, ChevronDown, ChevronUp, Clock } from "lucide-react";

type Step = { step: number; description: string; result: string };
type HistoryItem = {
  _id: string;
  expression: string;
  answer: string;
  steps: Step[];
  createdAt: string;
};

export default function HistoryPanel() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    historyAPI
      .getHistory()
      .then((res) => setItems(res.data.data ?? []))
      .catch((err) => console.error("Failed to load history:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await historyAPI.deleteHistory(id);
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error("Failed to delete history item:", err);
    }
  };

  if (loading)
    return <p className="text-sm text-gray-400 p-4">Loading history...</p>;

  if (items.length === 0)
    return (
      <p className="text-sm text-gray-400 p-4">
        No history yet. Solve a problem to get started!
      </p>
    );

  return (
    <div className="flex flex-col gap-2 p-3 overflow-y-auto max-h-[70vh]">
      {items.map((item) => (
        <div key={item._id} className="bg-white/10 rounded-lg p-3 text-white">
          {/* Header row */}
          <div className="flex justify-between items-center">
            <span className="font-mono text-sm truncate flex-1">
              {item.expression}
            </span>
            <div className="flex gap-2 ml-2 shrink-0">
              {/* Expand/collapse steps */}
              <button
                onClick={() =>
                  setExpanded(expanded === item._id ? null : item._id)
                }
                className="text-gray-300 hover:text-white transition-colors"
                title="Show steps"
              >
                {expanded === item._id ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
              {/* Delete */}
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-400 hover:text-red-300 transition-colors"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Answer */}
          <p className="text-emerald-400 font-bold mt-1">= {item.answer}</p>

          {/* Steps (expanded) */}
          {expanded === item._id && (
            <ol className="mt-2 border-t border-white/10 pt-2 space-y-1">
              {item.steps?.length > 0 ? (
                item.steps.map((s) => (
                  <li key={s.step} className="text-xs text-gray-300">
                    <span className="text-emerald-300 font-semibold">
                      Step {s.step}:
                    </span>{" "}
                    {s.description} →{" "}
                    <span className="font-mono">{s.result}</span>
                  </li>
                ))
              ) : (
                <p className="text-xs text-gray-500">No steps available.</p>
              )}
            </ol>
          )}

          {/* Timestamp */}
          <div className="flex items-center gap-1 mt-2">
            <Clock size={10} className="text-gray-500" />
            <p className="text-xs text-gray-500">
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
