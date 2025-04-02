import "./App.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import { Extension } from "@tiptap/core";
import { useState, useEffect } from "react";

// FontSize extension
const FontSize = Extension.create({
  name: "fontSize",
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize?.replace("px", ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return {
                style: `font-size: ${attributes.fontSize}px`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
    };
  },
});

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPlainBackground, setIsPlainBackground] = useState(false);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState("16");
  const [color, setColor] = useState("#000000");

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color, FontFamily, FontSize],
    content: "<p>Start typing your notes here...</p>",
    onSelectionUpdate: () => {
      // Update toolbar state based on the selected text's styles
      if (editor) {
        // Font Family
        const currentFontFamily = editor.isActive("textStyle", {
          fontFamily: /.+/,
        })
          ? editor.getAttributes("textStyle").fontFamily || "Arial"
          : "Arial";
        setFontFamily(currentFontFamily);

        // Font Size
        const currentFontSize = editor.isActive("textStyle", {
          fontSize: /.+/,
        })
          ? editor.getAttributes("textStyle").fontSize || "16"
          : "16";
        setFontSize(currentFontSize);

        // Color
        const currentColor = editor.isActive("textStyle", { color: /.+/ })
          ? editor.getAttributes("textStyle").color || "#000000"
          : "#000000";
        setColor(currentColor);
      }
    },
  });

  // Ensure editor is ready before rendering
  if (!editor) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`container ${isCollapsed ? "collapsed" : ""} ${
        isPlainBackground ? "plain-background" : ""
      }`}
    >
      <div className={`toolbar ${isCollapsed ? "collapsed" : ""}`}>
        <button onClick={() => setIsCollapsed(true)} className="hide-button">
          Hide Toolbar
        </button>
        <h3>Style</h3>

        <label>Font:</label>
        <select
          value={fontFamily}
          onChange={(e) => {
            const newFontFamily = e.target.value;
            setFontFamily(newFontFamily);
            editor.chain().focus().setFontFamily(newFontFamily).run();
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
            const newFontSize = e.target.value;
            setFontSize(newFontSize);
            editor.chain().focus().setFontSize(newFontSize).run();
          }}
        >
          <option value="14">Small</option>
          <option value="16">Medium</option>
          <option value="20">Large</option>
          <option value="28">XL</option>
        </select>

        <label>Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => {
            const newColor = e.target.value;
            setColor(newColor);
            editor.chain().focus().setColor(newColor).run();
          }}
        />

        <label>
          <input
            type="checkbox"
            checked={isPlainBackground}
            onChange={(e) => setIsPlainBackground(e.target.checked)}
          />
          Plain Background
        </label>
      </div>

      <button
        className={`toolbar-icon ${isCollapsed ? "visible" : ""}`}
        onClick={() => setIsCollapsed(false)}
      >
        ☰
      </button>

      <div className={`editor-wrapper ${isCollapsed ? "expanded" : ""}`}>
        <div className="editor a4">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default App;
