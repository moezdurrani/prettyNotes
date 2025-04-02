import "./App.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import { Extension } from "@tiptap/core";
import { useState } from "react";

// ✅ FontSize extension that works with TextStyle
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

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color, FontFamily, FontSize],
    content: "<p>Start typing your notes here...</p>",
  });

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
          onChange={(e) => {
            editor?.chain().focus().setFontFamily(e.target.value).run();
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
          onChange={(e) => {
            editor?.chain().focus().setFontSize(e.target.value).run();
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
          onChange={(e) => {
            editor?.chain().focus().setColor(e.target.value).run();
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
          {editor ? <EditorContent editor={editor} /> : "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default App;
