import React from 'react';

function HistorySection({ history, onSelect }) {
  if (history.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">📜 历史分析记录</h2>
      <ul className="space-y-2">
        {history.map((item, index) => (
          <li
            key={index}
            className="border p-3 rounded hover:bg-gray-50 cursor-pointer text-sm"
            onClick={() => onSelect(item)}
          >
            ✅ {item.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistorySection;
