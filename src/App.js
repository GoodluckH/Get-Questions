import "./App.css";
import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [questions, setQuestions] = useState([]);

  const div = document.querySelector(".questions");

  const btn = document.querySelector(".btn");
  const handleChange = (e) => {
    if (btn.innerText && btn.innerText === "Copied!") {
      btn.innerText = "Copy Questions";
    }
    generateQ(e.target.value);
    setInput(e.target.value);
  };

  const generateQ = (s) => {
    let sentences = s.match(/[^\.!\?]+[\.!\?]+/g);

    if (!sentences) {
      setQuestions([]);
      return;
    }

    let cleanSentences = sentences.map((s) => s.trim());
    setQuestions(cleanSentences.filter((x) => x.endsWith("?")));
  };

  const listQuestion = questions.map((q) => {
    return <p>{q}</p>;
  });

  const copyText = (e) => {
    let text = div.innerText;
    copyToClipBoard(text);
    e.target.innerText = "Copied!";
  };
  return (
    <div className="App">
      <textarea
        onInput={handleChange}
        data-gramm_editor="false"
        placeholder="Paste your notes here..."
        spellCheck="false"
      ></textarea>

      <button className="btn" onClick={copyText} disabled={!questions.length}>
        Copy Questions
      </button>
      <div className="questions"> {listQuestion}</div>
    </div>
  );
}

const copyToClipBoard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

export default App;
