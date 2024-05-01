import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Plus,
  Search,
  Star,
  Clock,
  Trash2,
  MoreVertical,
  Archive,
  Tag,
} from "lucide-react";

interface WriteFlowDocument {
  id: string;
  title: string;
  content: any[];
  lastModified: Date;
  isStarred: boolean;
  isArchived: boolean;
  tags: string[];
  wordCount: number;
  collaborators?: string[];
}

interface SidebarProps {
  documents: WriteFlowDocument[];
  currentDocument?: WriteFlowDocument | null;
  onSelectDocument: (doc: WriteFlowDocument) => void;
  onCreateDocument: () => void;
  onDeleteDocument: (id: string) => void;
  onStarDocument: (id: string) => void;
  onArchiveDocument: (id: string) => void;
  onSearchDocuments: (query: string) => void;
  onUpdateDocumentTitle: (id: string, newTitle: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  documents,
  currentDocument,
  onSelectDocument,
  onCreateDocument,
  onDeleteDocument,
  onStarDocument,
  onArchiveDocument,
  onSearchDocuments,
  onUpdateDocumentTitle,
  isCollapsed,
  onToggleCollapse,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showStarred, setShowStarred] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [editingTitleValue, setEditingTitleValue] = useState("");
  const [searchResults, setSearchResults] = useState<WriteFlowDocument[]>([]);

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const results = documents.filter((doc) => {
      const titleMatch = doc.title.toLowerCase().includes(searchTerm);
      const contentMatch = doc.content.some((block) => {
        if (block.content && typeof block.content === "string") {
          return block.content.toLowerCase().includes(searchTerm);
        }
        return false;
      });
      const tagMatch = doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm)
      );

      return titleMatch || contentMatch || tagMatch;
    });

    setSearchResults(results);
  };

  const filteredDocuments = documents.filter((doc) => {
    if (searchQuery.trim() && searchResults.length > 0) {
      return searchResults.includes(doc);
    }

    if (showArchived && !doc.isArchived) return false;

    if (showStarred && !doc.isStarred) return false;

    if (
      searchQuery &&
      !doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    if (selectedTag && !doc.tags.includes(selectedTag)) return false;

    return true;
  });

  const allTags = Array.from(new Set(documents.flatMap((doc) => doc.tags)));

  const handleStartEditTitle = (doc: WriteFlowDocument) => {
    setEditingTitle(doc.id);
    setEditingTitleValue(doc.title || "Untitled Document");
  };

  const handleSaveTitle = (docId: string) => {
    if (editingTitleValue.trim()) {
      onUpdateDocumentTitle(docId, editingTitleValue.trim());
    }
    setEditingTitle(null);
    setEditingTitleValue("");
  };

  const handleCancelEditTitle = () => {
    setEditingTitle(null);
    setEditingTitleValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent, docId: string) => {
    if (e.key === "Enter") {
      handleSaveTitle(docId);
    } else if (e.key === "Escape") {
      handleCancelEditTitle();
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  if (isCollapsed) {
    return (
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 60 }}
        className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 items-center py-4 space-y-4 hidden lg:flex flex-col"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleCollapse}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onCreateDocument}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Plus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full w-full lg:w-80"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Documents
          </h2>
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCreateDocument}
              className="p-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition-colors"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleCollapse}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              <MoreVertical className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => {
              const query = e.target.value;
              setSearchQuery(query);
              performSearch(query);
              onSearchDocuments(query);
            }}
            className="w-full pl-10 pr-10 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSearchResults([]);
                onSearchDocuments("");
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          )}
        </div>

        {searchQuery && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {searchResults.length > 0 ? (
              <span className="text-green-600 dark:text-green-400">
                Found {searchResults.length} document
                {searchResults.length !== 1 ? "s" : ""} matching "{searchQuery}"
              </span>
            ) : (
              <span className="text-red-600 dark:text-red-400">
                No documents found matching "{searchQuery}"
              </span>
            )}
          </div>
        )}
      </div>

      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-3">
          <button
            onClick={() => {
              setShowStarred(false);
              setShowArchived(false);
            }}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              !showStarred && !showArchived
                ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>All</span>
          </button>
          <button
            onClick={() => {
              setShowStarred(!showStarred);
              setShowArchived(false);
            }}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              showStarred
                ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Starred</span>
          </button>
          <button
            onClick={() => {
              setShowArchived(!showArchived);
              setShowStarred(false);
            }}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              showArchived
                ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Archive className="w-4 h-4" />
            <span>Archived</span>
          </button>
        </div>

        {allTags.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
              <Tag className="w-4 h-4" />
              <span>Tags</span>
            </div>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-2 py-1 rounded-full text-xs transition-colors ${
                  selectedTag === null
                    ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    setSelectedTag(selectedTag === tag ? null : tag)
                  }
                  className={`px-2 py-1 rounded-full text-xs transition-colors ${
                    selectedTag === tag
                      ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {filteredDocuments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-32 text-gray-500 dark:text-gray-400"
            >
              <FileText className="w-8 h-8 mb-2" />
              <p className="text-sm">No documents found</p>
            </motion.div>
          ) : (
            <div className="p-2 space-y-1">
              {filteredDocuments.map((doc) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  whileHover={{ scale: 1.02 }}
                  className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${
                    currentDocument?.id === doc.id
                      ? "bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => onSelectDocument(doc)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        {editingTitle === doc.id ? (
                          <input
                            type="text"
                            value={editingTitleValue}
                            onChange={(e) =>
                              setEditingTitleValue(e.target.value)
                            }
                            onBlur={() => handleSaveTitle(doc.id)}
                            onKeyDown={(e) => handleKeyDown(e, doc.id)}
                            className="text-sm font-medium text-gray-900 dark:text-white bg-transparent border-b border-primary-500 focus:outline-none flex-1"
                            autoFocus
                          />
                        ) : (
                          <h3
                            className="text-sm font-medium text-gray-900 dark:text-white truncate cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-1 py-0.5 rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartEditTitle(doc);
                            }}
                            title="Click to edit title"
                          >
                            {doc.title || "Untitled Document"}
                          </h3>
                        )}
                        {doc.isStarred && (
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        )}
                        {doc.isArchived && (
                          <Archive className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(doc.lastModified)}</span>
                        <span>•</span>
                        <span>{doc.wordCount} words</span>
                      </div>
                      {doc.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {doc.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {doc.tags.length > 2 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              +{doc.tags.length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onStarDocument(doc.id);
                        }}
                        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <Star
                          className={`w-3 h-3 ${
                            doc.isStarred
                              ? "text-yellow-500 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onArchiveDocument(doc.id);
                        }}
                        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                        title={
                          doc.isArchived
                            ? "Unarchive document"
                            : "Archive document"
                        }
                      >
                        <Archive
                          className={`w-3 h-3 ${
                            doc.isArchived
                              ? "text-orange-500 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteDocument(doc.id);
                        }}
                        className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Sidebar;
