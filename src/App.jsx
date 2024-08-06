import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take up to 10 seconds");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDXjXs2A7PbdlxlgU4lv6DB4vsq7PnqwbE",
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error:", error.message);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className="bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 h-screen p-6 flex flex-col justify-center items-center">
      <form
        onSubmit={generateAnswer}
        className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-xl shadow-xl bg-white py-8 px-6 transition-transform duration-500 transform hover:scale-105"
      >
        <h1 className="text-5xl font-bold text-purple-700 mb-6 animate-pulse">
          Hi, Friend!
        </h1>
        <textarea
          required
          className="border border-gray-400 rounded-md w-full my-4 min-h-[100px] p-4 transition-all duration-300 focus:border-purple-400 focus:shadow-lg"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
        ></textarea>
        <button
          type="submit"
          className={`bg-purple-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 ${
            generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={generatingAnswer}
        >
          {generatingAnswer ? "Generating..." : "Get Answer"}
        </button>
      </form>
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-xl bg-white my-6 shadow-xl transition-transform duration-500 transform hover:scale-105">
        <ReactMarkdown className="p-6">{answer}</ReactMarkdown>
      </div>
    </div>
  );
}

export default App;
