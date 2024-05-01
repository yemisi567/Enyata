import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Search,
  Plus,
  Star,
  Archive,
  Trash2,
  Clock,
  X,
} from "lucide-react";

interface WriteFlowDocument {
  id: string;
  title: string;
  content: any[];
  lastModified: Date;
  wordCount: number;
  isStarred: boolean;
  isArchived: boolean;
  tags: string[];
}

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  documents: WriteFlowDocument[];
  currentDocument: WriteFlowDocument | null;
  onSelectDocument: (doc: WriteFlowDocument) => void;
  onCreateDocument: () => void;
  onDeleteDocument: (id: string) => void;
  onStarDocument: (id: string) => void;
  onArchiveDocument: (id: string) => void;
  onSearchDocuments: (query: string) => void;
  onUpdateDocumentTitle: (id: string, newTitle: string) => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  onClose,
  documents,
  currentDocument,
  onSelectDocument,
  onCreateDocument,
  onDeleteDocument,
  onStarDocument,
  onArchiveDocument,
  onSearchDocuments,
  onUpdateDocumentTitle,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showStarred, setShowStarred] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [editingTitleValue, setEditingTitleValue] = useState("");

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  const handleStartEditTitle = (doc: WriteFlowDocument) => {
    setEditingTitle(doc.id);
    setEditingTitleValue(doc.title);
  };

  const handleSaveTitle = (docId: string) => {
    if (editingTitleValue.trim()) {
      onUpdateDocumentTitle(docId, editingTitleValue.trim());
    }
    setEditingTitle(null);
    setEditingTitleValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent, docId: string) => {
    if (e.key === "Enter") {
      handleSaveTitle(docId);
    } else if (e.key === "Escape") {
      setEditingTitle(null);
      setEditingTitleValue("");
    }
  };

  const handleSelectDocument = (doc: WriteFlowDocument) => {
    onSelectDocument(doc);
    onClose();
  };

  const filteredDocuments = documents.filter((doc) => {
    if (showStarred && !doc.isStarred) return false;
    if (showArchived && !doc.isArchived) return false;
    if (
      searchQuery &&
      !doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-900 shadow-2xl"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      Documents
                    </h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onCreateDocument}
                      className="p-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
                      title="Create new document"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-all duration-200"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => {
                      const query = e.target.value;
                      setSearchQuery(query);
                      onSearchDocuments(query);
                    }}
                    className="w-full pl-10 pr-10 py-3 text-sm border-0 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 shadow-sm"
                  />
                  {searchQuery && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setSearchQuery("");
                        onSearchDocuments("");
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      ✕
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowStarred(false);
                      setShowArchived(false);
                    }}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      !showStarred && !showArchived
                        ? "bg-primary-500 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>All</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowStarred(!showStarred);
                      setShowArchived(false);
                    }}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      showStarred
                        ? "bg-yellow-500 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Star className="w-4 h-4" />
                    <span>Starred</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowArchived(!showArchived);
                      setShowStarred(false);
                    }}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      showArchived
                        ? "bg-gray-500 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Archive className="w-4 h-4" />
                    <span>Archived</span>
                  </motion.button>
                </div>
              </div>

              {/* Document List */}
              <div className="flex-1 overflow-y-auto p-4">
                {filteredDocuments.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <FileText className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No documents found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                      {searchQuery
                        ? "Try a different search term"
                        : "Create your first document to get started"}
                    </p>
                    {!searchQuery && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onCreateDocument}
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Create Document
                      </motion.button>
                    )}
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {filteredDocuments.map((doc) => (
                      <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          currentDocument?.id === doc.id
                            ? "bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30 border border-primary-200 dark:border-primary-700 shadow-lg"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-md"
                        }`}
                        onClick={() => handleSelectDocument(doc)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              {editingTitle === doc.id ? (
                                <input
                                  type="text"
                                  value={editingTitleValue}
                                  onChange={(e) =>
                                    setEditingTitleValue(e.target.value)
                                  }
                                  onBlur={() => handleSaveTitle(doc.id)}
                                  onKeyDown={(e) => handleKeyDown(e, doc.id)}
                                  className="text-sm font-semibold text-gray-900 dark:text-white bg-transparent border-b-2 border-primary-500 focus:outline-none flex-1"
                                  autoFocus
                                />
                              ) : (
                                <h3
                                  className="text-sm font-semibold text-gray-900 dark:text-white truncate cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-lg transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStartEditTitle(doc);
                                  }}
                                  title="Click to edit title"
                                >
                                  {doc.title || "Untitled Document"}
                                </h3>
                              )}
                              <div className="flex items-center space-x-1">
                                {doc.isStarred && (
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                )}
                                {doc.isArchived && (
                                  <Archive className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{formatDate(doc.lastModified)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FileText className="w-3 h-3" />
                                <span>{doc.wordCount} words</span>
                              </div>
                            </div>
                            {doc.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {doc.tags.slice(0, 2).map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {doc.tags.length > 2 && (
                                  <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                                    +{doc.tags.length - 2}
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
                              className={`p-2 rounded-lg transition-all duration-200 ${
                                doc.isStarred
                                  ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400"
                              }`}
                              title={
                                doc.isStarred
                                  ? "Unstar document"
                                  : "Star document"
                              }
                            >
                              <Star className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteDocument(doc.id);
                              }}
                              className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-400 hover:text-red-600 transition-all duration-200"
                              title="Delete document"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
