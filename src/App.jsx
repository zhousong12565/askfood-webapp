import React, { useState, useEffect } from "react";
import UploadSection from "./components/UploadSection";
import ProductCards from "./components/ProductCards";
import HistoryList from "./components/HistoryList";
import ReactMarkdown from "react-markdown";

function App() {
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // 从 localStorage 加载历史记录
    const saved = localStorage.getItem("askfood_history");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // 每次更新结果时，自动添加记录
    if (result) {
      const newEntry = {
        content: result,
        timestamp: Date.now(),
      };
      const updated = [newEntry, ...history];
      setHistory(updated);
      localStorage.setItem("askfood_history", JSON.stringify(updated));
    }
  }, [result]);

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center p-4"
      style={{ backgroundImage: `url('/background.jpg')` }}
    >
      <div className="bg-white/90 max-w-3xl mx-auto rounded-2xl shadow-xl p-6 mt-10">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-2">
          问食 / AskFood
        </h1>
        <p className="text-center text-gray-600 mb-6">
          你的专属营养顾问，从体检报告开始
        </p>

        <UploadSection setResult={setResult} />

        {result && (
          <div className="mt-8 prose prose-sm sm:prose-base max-w-none text-gray-800">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        )}

        <ProductCards />

        <HistoryList history={history} setHistory={setHistory} />


      </div>
    </div>
  );
}

export default App;
