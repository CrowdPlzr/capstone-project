"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Trash2, Calendar, Folder, FileText, AlertCircle } from 'lucide-react';
import { DocumentUploadService, DocumentMetadata } from '../lib/uploadService';

interface DocumentListProps {
  onDocumentDeleted?: (documentId: string) => void;
  refreshTrigger?: number; // Used to trigger refresh from parent
}

const DocumentList: React.FC<DocumentListProps> = ({ onDocumentDeleted, refreshTrigger }) => {
  const [documents, setDocuments] = useState<DocumentMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      const docs = await DocumentUploadService.getDocuments();
      setDocuments(docs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()));
    } catch (err) {
      setError('Failed to load documents');
      console.error('Error loading documents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [refreshTrigger]);

  const handleDelete = async (document: DocumentMetadata) => {
    if (!document.id || !window.confirm(`Are you sure you want to delete "${document.name}"?`)) {
      return;
    }

    try {
      setDeleteLoading(document.id);
      await DocumentUploadService.deleteDocument(document.id, document.downloadURL);
      setDocuments(prev => prev.filter(doc => doc.id !== document.id));
      onDocumentDeleted?.(document.id);
    } catch (err) {
      console.error('Error deleting document:', err);
      alert('Failed to delete document. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleDownload = (document: DocumentMetadata) => {
    window.open(document.downloadURL, '_blank');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word')) return '📝';
    if (type.includes('image')) return '🖼️';
    if (type.includes('text')) return '📋';
    return '📎';
  };

  const getCategoryColor = (category?: string) => {
    if (!category) return 'bg-gray-500/10 text-gray-500';
    
    const colors: Record<string, string> = {
      'Resume/CV': 'bg-blue-500/10 text-blue-500',
      'Certifications': 'bg-green-500/10 text-green-500',
      'Projects': 'bg-purple-500/10 text-purple-500',
      'Research': 'bg-orange-500/10 text-orange-500',
      'Portfolio': 'bg-pink-500/10 text-pink-500',
      'Other': 'bg-gray-500/10 text-gray-500'
    };

    return colors[category] || 'bg-gray-500/10 text-gray-500';
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading documents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={loadDocuments}
            className="px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-background rounded-lg hover:shadow-lg transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">Document Library</h3>
        <p className="text-muted-foreground">
          Manage your uploaded documents ({documents.length} total)
        </p>
      </div>

      {documents.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h4 className="text-lg font-medium text-foreground mb-2">No documents uploaded yet</h4>
          <p className="text-muted-foreground">
            Upload your first document to get started
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {documents.map((document, index) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 hover:border-neon-blue/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* File Icon */}
                  <div className="text-2xl mt-1">
                    {getFileIcon(document.type)}
                  </div>

                  {/* Document Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-medium text-foreground truncate pr-4">
                        {document.name}
                      </h4>
                      <div className="flex gap-2 shrink-0">
                        <motion.button
                          onClick={() => handleDownload(document)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          title="Download document"
                        >
                          <Download className="w-4 h-4 text-neon-blue" />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(document)}
                          disabled={deleteLoading === document.id}
                          className="p-2 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          title="Delete document"
                        >
                          {deleteLoading === document.id ? (
                            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4 text-red-500" />
                          )}
                        </motion.button>
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span>{formatFileSize(document.size)}</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(document.uploadedAt)}
                      </div>
                      {document.category && (
                        <div className="flex items-center gap-1">
                          <Folder className="w-3 h-3" />
                          <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(document.category)}`}>
                            {document.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {document.description && (
                      <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        {document.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Refresh Button */}
      <div className="mt-6 text-center">
        <motion.button
          onClick={loadDocuments}
          className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Refresh List
        </motion.button>
      </div>
    </div>
  );
};

export default DocumentList; 