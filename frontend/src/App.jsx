import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');

  // function to handle markdown input changes
  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
  };

  // fetch converted HTML from the backend
  useEffect(() => {
    if (markdown) {
      fetch('http://localhost:3000/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown }),
      })
        .then((response) => response.json())
        .then((data) => setHtml(data.html))
        .catch((error) => console.error('Error:', error));
    } else {
      setHtml('');
    }
  }, [markdown]);

  return (
    <div className="App">
      <h1>Markdown Editor </h1>
      <div className="editor-container">
        <textarea
          value={markdown}
          onChange={handleMarkdownChange}
          placeholder="Type your Markdown here..."
        />
        <div className="preview" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}

export default App;
