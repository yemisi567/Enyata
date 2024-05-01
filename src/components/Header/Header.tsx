import React, { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import {
  Sun,
  Moon,
  Save,
  Download,
  Share2,
  FileText,
  Zap,
  Users,
  Menu,
  X,
} from "lucide-react";

interface HeaderProps {
  onSave?: () => void;
  onExport?: () => void;
  onShare?: () => void;
  onUpdateTitle?: (newTitle: string) => void;
  currentDocumentTitle?: string;
  wordCount: number;
  isCollaborating?: boolean;
  collaborators?: number;
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

const Header: React.FC<HeaderProps> = memo(
  ({
    onSave,
    onExport,
    onShare,
    onUpdateTitle,
    currentDocumentTitle,
    wordCount,
    isCollaborating = false,
    collaborators = 0,
    onToggleMobileMenu,
    isMobileMenuOpen = false,
  }) => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [titleValue, setTitleValue] = useState(currentDocumentTitle || "");

    const handleStartEditTitle = () => {
      setIsEditingTitle(true);
      setTitleValue(currentDocumentTitle || "");
    };

    const handleSaveTitle = () => {
      if (titleValue.trim() && onUpdateTitle) {
        onUpdateTitle(titleValue.trim());
      }
      setIsEditingTitle(false);
    };

    const handleCancelEditTitle = () => {
      setIsEditingTitle(false);
      setTitleValue(currentDocumentTitle || "");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSaveTitle();
      } else if (e.key === "Escape") {
        handleCancelEditTitle();
      }
    };

    // Update title value when current document changes
    useEffect(() => {
      setTitleValue(currentDocumentTitle || "");
    }, [currentDocumentTitle]);

    const headerItems = [
      {
        icon: Save,
        label: "Save",
        onClick: onSave,
        shortcut: "Ctrl+S",
      },
      {
        icon: Download,
        label: "Export",
        onClick: onExport,
        shortcut: "Ctrl+E",
      },
      {
        icon: Share2,
        label: "Share",
        onClick: onShare,
        shortcut: "Ctrl+Shift+S",
      },
    ];

    return (
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onToggleMobileMenu}
                className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-1 sm:space-x-2"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  WriteFlow
                </h1>
              </motion.div>

              {/* Document Title - Mobile */}
              {currentDocumentTitle && (
                <div className="lg:hidden flex items-center space-x-2 max-w-32 sm:max-w-48">
                  <span className="text-gray-400">•</span>
                  <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                    {currentDocumentTitle}
                  </h2>
                </div>
              )}

              {/* Document Title - Desktop */}
              {currentDocumentTitle && (
                <div className="hidden lg:flex items-center space-x-2">
                  <span className="text-gray-400">•</span>
                  {isEditingTitle ? (
                    <input
                      type="text"
                      value={titleValue}
                      onChange={(e) => setTitleValue(e.target.value)}
                      onBlur={handleSaveTitle}
                      onKeyDown={handleKeyDown}
                      className="text-sm font-medium text-gray-900 dark:text-white bg-transparent border-b border-primary-500 focus:outline-none min-w-0 max-w-xs"
                      autoFocus
                    />
                  ) : (
                    <h2
                      className="text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white truncate max-w-xs"
                      onClick={handleStartEditTitle}
                      title="Click to edit document title"
                    >
                      {currentDocumentTitle}
                    </h2>
                  )}
                </div>
              )}

              {isCollaborating && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center space-x-1 px-2 py-1 bg-accent-100 dark:bg-accent-900 rounded-full"
                >
                  <Users className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                  <span className="text-sm font-medium text-accent-700 dark:text-accent-300">
                    {collaborators} online
                  </span>
                </motion.div>
              )}
            </div>

            {/* Stats and Actions */}
            <div className="flex items-center space-x-2 sm:space-x-6">
              {/* Word Count - Desktop */}
              <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Zap className="w-4 h-4" />
                <span className="font-medium">
                  {wordCount.toLocaleString()} words
                </span>
              </div>

              {/* Word Count - Mobile */}
              <div className="lg:hidden flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                <Zap className="w-3 h-3" />
                <span className="font-medium">
                  {wordCount.toLocaleString()}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-1 sm:space-x-2">
                {headerItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={item.onClick}
                    className="p-1.5 sm:p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group relative focus-ring"
                    title={`${item.label} (${item.shortcut})`}
                    aria-label={`${item.label} - ${item.shortcut}`}
                  >
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:block absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.label}
                    </span>
                  </motion.button>
                ))}

                {/* Theme Toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-ring"
                  title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
                  aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
    );
  }
);

Header.displayName = "Header";

export default Header;
