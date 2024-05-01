import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Clock,
  Users,
  Wifi,
  WifiOff,
  Save,
  CheckCircle,
  AlertCircle,
  Zap,
} from "lucide-react";

interface StatusBarProps {
  wordCount: number;
  characterCount: number;
  readingTime: number;
  lastSaved?: Date;
  isOnline: boolean;
  isCollaborating: boolean;
  collaborators: number;
  isAutoSave: boolean;
  isAutoSaving: boolean;
  autoSavePending: boolean;
  hasUnsavedChanges: boolean;
  onToggleAutoSave: () => void;
  onSave: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({
  wordCount,
  characterCount,
  readingTime,
  lastSaved,
  isOnline,
  isCollaborating,
  collaborators,
  isAutoSave,
  isAutoSaving,
  autoSavePending,
  hasUnsavedChanges,
  onToggleAutoSave,
  onSave,
}) => {
  const formatLastSaved = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 1) return "Just now";
    if (minutes === 1) return "1 minute ago";
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return "1 hour ago";
    if (hours < 24) return `${hours} hours ago`;
    return date.toLocaleDateString();
  };

  const getStatusColor = () => {
    if (!isOnline) return "text-red-500";
    if (hasUnsavedChanges) return "text-yellow-500";
    return "text-green-500";
  };

  const getStatusIcon = () => {
    if (!isOnline) return <WifiOff className="w-4 h-4" />;
    if (hasUnsavedChanges) return <AlertCircle className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-2 sm:px-4 py-2"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm space-y-1 sm:space-y-0">
        <div className="flex items-center space-x-2 sm:space-x-6 flex-wrap">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <FileText className="w-4 h-4" />
            <span>{wordCount.toLocaleString()} words</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Zap className="w-4 h-4" />
            <span>{characterCount.toLocaleString()} characters</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        {/* Center - Status */}
        <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap">
          {/* Online status */}
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            <span
              className={`text-sm ${
                isOnline
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>

          {/* Collaboration status */}
          {isCollaborating && (
            <div className="flex items-center space-x-2 text-accent-600 dark:text-accent-400">
              <Users className="w-4 h-4" />
              <span className="text-sm">{collaborators} collaborating</span>
            </div>
          )}

          {/* Save status */}
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 ${getStatusColor()}`}>
              {getStatusIcon()}
              <span className="text-sm">
                {hasUnsavedChanges ? "Unsaved changes" : "All changes saved"}
              </span>
            </div>
            {lastSaved && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatLastSaved(lastSaved)}
              </span>
            )}
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap">
          {/* Auto-save toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleAutoSave}
            className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors ${
              isAutoSaving
                ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                : autoSavePending
                ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300"
                : isAutoSave
                ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            title={
              isAutoSaving
                ? "Auto-saving..."
                : autoSavePending
                ? "Auto-save pending (3s)"
                : isAutoSave
                ? "Auto-save enabled"
                : "Auto-save disabled"
            }
          >
            {isAutoSaving ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Save className="w-3 h-3" />
              </motion.div>
            ) : autoSavePending ? (
              <Clock className="w-3 h-3" />
            ) : isAutoSave ? (
              <CheckCircle className="w-3 h-3" />
            ) : (
              <AlertCircle className="w-3 h-3" />
            )}
            <span>
              {isAutoSaving
                ? "Saving..."
                : autoSavePending
                ? "Pending..."
                : "Auto-save"}
            </span>
          </motion.button>

          {/* Manual save */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSave}
            disabled={!hasUnsavedChanges}
            className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors ${
              hasUnsavedChanges
                ? "bg-primary-500 hover:bg-primary-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
            title="Save document (Ctrl+S)"
          >
            <Save className="w-3 h-3" />
            <span>Save</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default StatusBar;
