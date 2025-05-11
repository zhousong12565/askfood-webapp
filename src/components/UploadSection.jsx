import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

function UploadSection({ setResult }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [localResult, setLocalResult] = useState('');

  useEffect(() => {
    let timer;
    if (loading && progress < 90) {
      timer = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 400);
    }
    return () => clearInterval(timer);
  }, [loading, progress]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setFileName(selected.name);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return alert('请先上传文件');

    const text = await readFileContent(file);
    const prompt = `
你是一名专业体检分析专家和营养专家，深谙葆婴和USANA的产品和功效。
请根据以下体检报告内容，生成详细分析与两份营养建议。
分别是 USANA 营养建议方案 和 葆婴产品营养建议。

体检报告内容如下：
${text}
`;

    setLoading(true);
    setProgress(0);
    setLocalResult('');
    setResult && setResult('');

    try {
      const res = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer sk-85e0d26b844f4826b7f924fe01027ec7',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content || '未获取到结果';
      setLocalResult(reply);
      setResult && setResult(reply);
      setProgress(100);
    } catch (err) {
      const msg = '❌ 分析失败，请检查网络或 API 密钥';
      setLocalResult(msg);
      setResult && setResult(msg);
      setProgress(100);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const readFileContent = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);

      if (file.type.includes('image')) {
        resolve('（图片 OCR 功能尚未接入，未来可自动识别图片内容）');
      } else {
        reader.readAsText(file);
      }
    });
  };

  return (
    <div className="space-y-4">
      <label className="block font-medium mb-2">上传体检报告（PDF 或 图片）：</label>
      <input
        type="file"
        accept="image/*,.pdf,.txt"
        capture="environment"
        onChange={handleFileChange}
      />
      {fileName && <p className="text-sm text-gray-500">✔ 已选择：{fileName}</p>}

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? '分析中...' : '使用 AI 分析报告'}
      </button>

      {loading && (
        <div className="text-blue-600 text-sm">
          分析进度：{progress}%
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {localResult && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-80 overflow-y-auto text-sm">
          <ReactMarkdown>{localResult}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default UploadSection;
