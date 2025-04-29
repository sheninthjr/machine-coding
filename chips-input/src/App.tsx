import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [chip, setChip] = useState<Record<string, string>>({});

  const handlePress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      const id = crypto.randomUUID();
      setChip((prev) => {
        const newState = { ...prev, [id]: input };
        return newState;
      });
      setInput("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type a chip"
        style={{ padding: "8px", width: "200px" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handlePress}
      />
      <div style={{ marginTop: "10px" }}>
        {Object.keys(chip)
          .reverse()
          .map((key) => (
            <button
              key={key}
              onClick={() => {
                setChip((prev) => {
                  const newState = { ...prev };
                  delete newState[key];
                  return newState;
                });
              }}
              style={{ margin: "4px" }}
            >
              {chip[key]} X
            </button>
          ))}
      </div>
    </div>
  );
}

export default App;
