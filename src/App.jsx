import "./App.css";
import { useState } from "react";

const App = () => {
  const [fontSize, setFontSize] = useState("16px");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [color, setColor] = useState("#000000");

  const applyStyle = (command, value) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="container">
      <div className="toolbar">
        <h3>Style</h3>

        <label>Font:</label>
        <select
          value={fontFamily}
          onChange={(e) => {
            setFontFamily(e.target.value);
            applyStyle("fontName", e.target.value);
          }}
        >
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Comic Sans MS">Comic Sans</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
        </select>

        <label>Size:</label>
        <select
          value={fontSize}
          onChange={(e) => {
            setFontSize(e.target.value);
            // Use "fontSize" command with values 1–7 (HTML legacy sizes)
            // We'll later map these to CSS font sizes
            const sizeMap = {
              "14px": 2,
              "16px": 3,
              "20px": 4,
              "28px": 5,
            };
            applyStyle("fontSize", sizeMap[e.target.value]);
          }}
        >
          <option value="14px">Small</option>
          <option value="16px">Medium</option>
          <option value="20px">Large</option>
          <option value="28px">XL</option>
        </select>

        <label>Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            applyStyle("foreColor", e.target.value);
          }}
        />
      </div>

      <div
        className="editor"
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
      >
        Start typing your notes here...
      </div>
    </div>
  );
};

export default App;
