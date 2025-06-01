"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Calendar, Folder, FileText, AlertCircle } from "lucide-react";
import Link from "next/link";

interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime: string;
  webViewLink: string;
  webContentLink?: string;
  description?: string;
}

interface AssignmentPageProps {
  params: Promise<{
    assignmentId: string;
  }>;
}

const AssignmentPage = ({ params }: AssignmentPageProps) => {
  const [assignment, setAssignment] = useState<GoogleDriveFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAssignment = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/drive/files/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Assignment not found');
        } else {
          setError('Failed to load assignment');
        }
        return;
      }
      
      const file = await response.json();
      setAssignment(file);
    } catch (err) {
      console.error('Error loading assignment:', err);
      setError('Failed to load assignment');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      loadAssignment(resolvedParams.assignmentId);
    };
    
    getParams();
  }, [params, loadAssignment]);

  const formatDate = (dateString: string): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  const formatFileSize = (bytes?: string): string => {
    if (!bytes) return 'Unknown size';
    const size = parseInt(bytes);
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('document')) return '📄';
    if (mimeType.includes('spreadsheet')) return '📊';
    if (mimeType.includes('presentation')) return '📽️';
    if (mimeType.includes('pdf')) return '🗎';
    if (mimeType.includes('image')) return '🖼️';
    return '📎';
  };

  const getCategoryFromMimeType = (mimeType: string) => {
    if (mimeType.includes('document')) return 'Document';
    if (mimeType.includes('spreadsheet')) return 'Spreadsheet';
    if (mimeType.includes('presentation')) return 'Presentation';
    if (mimeType.includes('pdf')) return 'PDF';
    if (mimeType.includes('image')) return 'Image';
    return 'File';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Document': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      'Spreadsheet': 'bg-green-500/10 text-green-500 border-green-500/20',
      'Presentation': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      'PDF': 'bg-red-500/10 text-red-500 border-red-500/20',
      'Image': 'bg-pink-500/10 text-pink-500 border-pink-500/20',
      'File': 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    };
    return colors[category] || 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  };

  const getEmbedUrl = (file: GoogleDriveFile): string => {
    if (file.mimeType.includes('google-apps')) {
      // For Google Docs, Sheets, Slides
      if (file.mimeType.includes('document')) {
        return `https://docs.google.com/document/d/${file.id}/preview`;
      }
      if (file.mimeType.includes('spreadsheet')) {
        return `https://docs.google.com/spreadsheets/d/${file.id}/preview`;
      }
      if (file.mimeType.includes('presentation')) {
        return `https://docs.google.com/presentation/d/${file.id}/preview`;
      }
    }
    // For other files, use the view link
    return file.webViewLink;
  };

  const canEmbed = (mimeType: string): boolean => {
    return mimeType.includes('google-apps') || mimeType.includes('pdf');
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-16">
            <div className="animate-spin w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading assignment...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !assignment) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-16">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Assignment Not Found</h1>
            <p className="text-muted-foreground mb-6">
              {error || 'The assignment you&apos;re looking for doesn&apos;t exist.'}
            </p>
            <Link href="/capstone">
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-background rounded-lg hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Capstone Hub
              </motion.button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header with Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/capstone" className="flex items-center gap-2 text-foreground hover:text-neon-blue transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to Capstone Hub</span>
            </Link>
            
            <h1 className="text-lg font-semibold text-foreground truncate max-w-md">
              {assignment.name}
            </h1>
            
            <motion.button
              onClick={() => window.open(assignment.webViewLink, '_blank')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-background rounded-lg hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
              Open in Drive
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Assignment Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Assignment Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-neon-blue/5 to-neon-purple/5 border border-neon-blue/20 rounded-xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{getFileIcon(assignment.mimeType)}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {assignment.name}
              </h1>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Modified {formatDate(assignment.modifiedTime)}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-muted-foreground" />
                <span className={`px-3 py-1 rounded-full text-sm border ${getCategoryColor(getCategoryFromMimeType(assignment.mimeType))}`}>
                  {getCategoryFromMimeType(assignment.mimeType)}
                </span>
              </div>
              
              {assignment.size && (
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formatFileSize(assignment.size)}
                  </span>
                </div>
              )}
            </div>

            {assignment.description && (
              <div className="bg-background/50 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {assignment.description}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Document Viewer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Document Preview</h2>
            </div>
            
            {canEmbed(assignment.mimeType) ? (
              <div className="relative">
                <iframe
                  src={getEmbedUrl(assignment)}
                  className="w-full h-[800px] border-0"
                  title={assignment.name}
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="p-12 text-center">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Preview Not Available
                </h3>
                <p className="text-muted-foreground mb-6">
                  This file type cannot be previewed directly. Click the button below to view it in Google Drive.
                </p>
                
                <motion.button
                  onClick={() => window.open(assignment.webViewLink, '_blank')}
                  className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-background rounded-lg hover:shadow-lg transition-all flex items-center gap-2 justify-center mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in Google Drive
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <motion.button
                onClick={() => window.open(assignment.webViewLink, '_blank')}
                className="w-full flex items-center gap-3 p-3 text-left border border-border rounded-lg hover:bg-muted transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="w-4 h-4 text-neon-blue" />
                <span className="text-foreground">Open in Google Drive</span>
              </motion.button>
              
              <Link href="/capstone">
                <motion.button
                  className="w-full flex items-center gap-3 p-3 text-left border border-border rounded-lg hover:bg-muted transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft className="w-4 h-4 text-neon-purple" />
                  <span className="text-foreground">Back to Capstone Hub</span>
                </motion.button>
              </Link>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">File Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">File Type:</span>
                <span className="text-foreground">{getCategoryFromMimeType(assignment.mimeType)}</span>
              </div>
              {assignment.size && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">File Size:</span>
                  <span className="text-foreground">{formatFileSize(assignment.size)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Modified:</span>
                <span className="text-foreground">{formatDate(assignment.modifiedTime)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default AssignmentPage; 