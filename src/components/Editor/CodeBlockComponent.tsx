import React, { useState, useEffect, useRef } from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { Code, ChevronDown } from "lucide-react";

interface CodeBlockComponentProps {
  node: {
    attrs: {
      language: string;
      content?: string;
    };
  };
  updateAttributes: (attrs: { language?: string; content?: string }) => void;
}

const languageOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "scala", label: "Scala" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "scss", label: "SCSS" },
  { value: "sass", label: "Sass" },
  { value: "less", label: "Less" },
  { value: "json", label: "JSON" },
  { value: "xml", label: "XML" },
  { value: "yaml", label: "YAML" },
  { value: "toml", label: "TOML" },
  { value: "ini", label: "INI" },
  { value: "sql", label: "SQL" },
  { value: "bash", label: "Bash" },
  { value: "powershell", label: "PowerShell" },
  { value: "dockerfile", label: "Dockerfile" },
  { value: "markdown", label: "Markdown" },
  { value: "plaintext", label: "Plain Text" },
];

const CodeBlockComponent: React.FC<CodeBlockComponentProps> = ({
  node,
  updateAttributes,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [codeContent, setCodeContent] = useState("");
  const currentLanguage = node.attrs.language || "plaintext";
  const dropdownRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const handleLanguageChange = (language: string) => {
    updateAttributes({ language });
    setIsDropdownOpen(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setCodeContent(node.attrs.content || "");
  };

  const handleSave = () => {
    updateAttributes({ content: codeContent });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCodeContent("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCancel();
    } else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSave();
    }
  };

  return (
    <NodeViewWrapper className="relative group my-4">
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Code className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                <span>
                  {languageOptions.find((opt) => opt.value === currentLanguage)
                    ?.label || "Plain Text"}
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {languageOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleLanguageChange(option.value)}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                        option.value === currentLanguage
                          ? "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          {isEditing ? (
            <div className="p-4">
              <textarea
                ref={textareaRef}
                value={codeContent}
                onChange={(e) => setCodeContent(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full h-32 font-mono text-sm text-gray-900 dark:text-white bg-transparent border-none outline-none resize-none"
                placeholder="Enter your code here..."
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1 text-sm bg-primary-500 text-white rounded hover:bg-primary-600"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="relative group">
              <div className="p-4">
                <pre className="font-mono text-sm text-gray-900 dark:text-white whitespace-pre-wrap overflow-x-auto">
                  <NodeViewContent />
                </pre>
              </div>
              <button
                onClick={handleEdit}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default CodeBlockComponent;
