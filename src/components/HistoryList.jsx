import React from "react";

function HistoryList({ history, setHistory }) {
  const handleDelete = (index) => {
    const updated = [...history];
    updated.splice(index, 1);
    setHistory(updated);
    localStorage.setItem("askfood_history", JSON.stringify(updated));
  };

  const handleSave = (content) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `分析报告_${new Date().toLocaleString()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!history.length) return null;

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-2">🗂️ 历史分析记录</h2>
      <ul className="space-y-2">
        {history.map((entry, index) => (
          <li
            key={index}
            className="bg-gray-50 border border-gray-300 rounded p-3 text-sm flex items-center justify-between"
          >
            <div>
              <span className="text-green-600 font-medium">
                {new Date(entry.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSave(entry.content)}
                className="text-blue-600 hover:underline"
              >
                保存
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:underline"
              >
                删除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryList;
