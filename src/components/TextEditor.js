import React, { useState, useRef, useEffect } from 'react';
import './TextEditor.js';

const TextEditor = () => {
  const [content, setContent] = useState('');
  const editorRef = useRef(null);

  // Load content from localStorage on component mount
  useEffect(() => {
    const savedContent = localStorage.getItem('textEditorContent');
    if (savedContent) {
      setContent(savedContent);
      editorRef.current.innerHTML = savedContent;
    }
  }, []);

  // Function to execute document commands
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  // Save content to localStorage
  const saveContent = () => {
    localStorage.setItem('textEditorContent', editorRef.current.innerHTML);
    alert('Content saved!');
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="toolbar">
        {/* Text Styles */}
        <button onClick={() => formatText('bold')}>Bold</button>
        <button onClick={() => formatText('italic')}>Italic</button>
        <button onClick={() => formatText('underline')}>Underline</button>
        <button onClick={() => formatText('strikeThrough')}>Strike</button>

        {/* Font Family */}
        <select onChange={(e) => formatText('fontName', e.target.value)}>
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>

        {/* Font Size */}
        <select onChange={(e) => formatText('fontSize', e.target.value)}>
          <option value="1">Small</option>
          <option value="3">Normal</option>
          <option value="5">Large</option>
        </select>

        {/* Text Color */}
        <input type="color" onChange={(e) => formatText('foreColor', e.target.value)} />

        {/* Background Color */}
        <input type="color" onChange={(e) => formatText('hiliteColor', e.target.value)} />

        {/* Text Alignment */}
        <button onClick={() => formatText('justifyLeft')}>Align Left</button>
        <button onClick={() => formatText('justifyCenter')}>Align Center</button>
        <button onClick={() => formatText('justifyRight')}>Align Right</button>
        <button onClick={() => formatText('justifyFull')}>Justify</button>

        {/* List */}
        <button onClick={() => formatText('insertUnorderedList')}>Bullet List</button>
        <button onClick={() => formatText('insertOrderedList')}>Numbered List</button>

        {/* Undo/Redo */}
        <button onClick={() => formatText('undo')}>Undo</button>
        <button onClick={() => formatText('redo')}>Redo</button>

        {/* Image Insertion */}
        <button onClick={() => {
          const url = prompt('Enter image URL:');
          if (url) formatText('insertImage', url);
        }}>Insert Image</button>

        {/* Save Button */}
        <button onClick={saveContent}>Save</button>
      </div>

      {/* Editable Area */}
      <div
        className="text-editor"
        contentEditable={true}
        ref={editorRef}
        onInput={(e) => setContent(e.target.innerHTML)}
      ></div>

      {/* Preview */}
      <div>
        <h3>Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default TextEditor;
