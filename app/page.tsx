"use client";

import { useState, useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export default function Home() {
  const [latex, setLatex] = useState("");
  const [error, setError] = useState("");

  const renderedLatex = useMemo(() => {
    if (!latex) {
      setError("");
      return "";
    }

    try {
      const result = katex.renderToString(latex, {
        throwOnError: false,
      });
      setError("");
      return result;
    } catch (error) {
      setError((error as Error).message);
      return "";
    }
  }, [latex]);

  return (
    <div className="flex h-screen gap-4 p-4">
      <div className="flex-1">
        <textarea
          value={latex}
          onChange={(e) => setLatex(e.target.value)}
          className="w-full h-full p-4 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter LaTeX here..."
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div
          className="flex-1 p-4 border border-gray-300 rounded overflow-auto"
          dangerouslySetInnerHTML={{ __html: renderedLatex }}
        />
        {error && (
          <div className="mt-2 text-sm text-red-500">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
