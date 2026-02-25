import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [landingLoading, setLandingLoading] = useState(true);

  // Landing loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLandingLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const analyseText = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/analyse",
        { text }
      );

      setResult(data);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* -------- LANDING SCREEN -------- */
  if (landingLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">
        <div className="text-center animate-pulse">
          <h1 className="text-4xl font-bold tracking-widest">
            AI Sentiment Analyzer
          </h1>
          <p className="mt-4 text-gray-300">Loading intelligence...</p>
        </div>
      </div>
    );
  }

  /* -------- MAIN PAGE -------- */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-6">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 w-full max-w-xl text-white">

        <h1 className="text-3xl font-bold text-center mb-6">
          Sentiment Analyzer
        </h1>

        {/* TEXT INPUT */}
        <textarea
          placeholder="Type something to analyse sentiment..."
          className="w-full p-4 rounded-xl bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={analyseText}
          className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
        >
          Analyse Sentiment
        </button>

        {/* API LOADING */}
        {loading && (
          <div className="flex flex-col items-center mt-6">
            <div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-gray-300">Analyzing text...</p>
          </div>
        )}

        {/* RESULT */}
        {result && !loading && (
          <div className="mt-6 p-6 rounded-2xl bg-white/10 border border-white/20 text-center">
            <h2 className="text-xl font-semibold">Result</h2>

            <p className="mt-3 text-lg">
              Sentiment:
              <span className="ml-2 font-bold text-purple-300">
                {result.label}
              </span>
            </p>

            <p className="mt-2 text-lg">
              Confidence:
              <span className="ml-2 font-bold text-indigo-300">
                {result.score.toFixed(2)}%
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
