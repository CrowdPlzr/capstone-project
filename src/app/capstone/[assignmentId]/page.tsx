"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Calendar, Folder, FileText, AlertCircle } from "lucide-react";
import Link from "next/link";
import { DocumentUploadService, DocumentMetadata } from "@/lib/uploadService";

interface AssignmentPageProps {
  params: Promise<{
    assignmentId: string;
  }>;
}

const AssignmentPage = ({ params }: AssignmentPageProps) => {
  const [assignment, setAssignment] = useState<DocumentMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAssignment = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Get all documents and find the specific one
      const docs = await DocumentUploadService.getDocuments();
      const foundAssignment = docs.find(doc => doc.id === id);
      
      if (foundAssignment) {
        setAssignment(foundAssignment);
      } else {
        setError('Assignment not found');
      }
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

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCategoryColor = (category?: string) => {
    if (!category) return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    
    const colors: Record<string, string> = {
      'Resume/CV': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      'Certifications': 'bg-green-500/10 text-green-500 border-green-500/20',
      'Projects': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      'Research': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      'Portfolio': 'bg-pink-500/10 text-pink-500 border-pink-500/20',
      'Analysis': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
      'Framework': 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
      'Case Study': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      'Other': 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    };

    return colors[category] || 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  };

  const handleDownload = () => {
    if (assignment?.downloadURL) {
      window.open(assignment.downloadURL, '_blank');
    }
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
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-background rounded-lg hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              Download
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Assignment Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Assignment Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-neon-blue/5 to-neon-purple/5 border border-neon-blue/20 rounded-xl p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {assignment.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Uploaded {formatDate(assignment.uploadedAt)}
                </span>
              </div>
              
              {assignment.category && (
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-muted-foreground" />
                  <span className={`px-3 py-1 rounded-full text-sm border ${getCategoryColor(assignment.category)}`}>
                    {assignment.category}
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {formatFileSize(assignment.size)}
                </span>
              </div>
            </div>

            {assignment.description && (
              <div className="bg-background/50 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Assignment Description</h3>
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
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Document Content</h2>
            
            {/* Document Display Area */}
            <div className="bg-background border-2 border-dashed border-border rounded-lg p-12 text-center">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {assignment.name}
              </h3>
              <p className="text-muted-foreground mb-6">
                Document viewer will be integrated here. For now, you can download the file to view its contents.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={handleDownload}
                  className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-background rounded-lg hover:shadow-lg transition-all flex items-center gap-2 justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  Download & View
                </motion.button>
                
                <motion.button
                  onClick={() => window.open(assignment.downloadURL, '_blank')}
                  className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-all flex items-center gap-2 justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="w-4 h-4" />
                  Open in New Tab
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Assignment Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Assignment Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">File Type:</span>
                <span className="text-foreground">{assignment.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">File Size:</span>
                <span className="text-foreground">{formatFileSize(assignment.size)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span className="text-foreground">{assignment.category || 'Uncategorized'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Upload Date:</span>
                <span className="text-foreground">{formatDate(assignment.uploadedAt)}</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <motion.button
                onClick={handleDownload}
                className="w-full flex items-center gap-3 p-3 text-left border border-border rounded-lg hover:bg-muted transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4 text-neon-blue" />
                <span className="text-foreground">Download Document</span>
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
        </motion.div>
      </div>
    </main>
  );
};

export default AssignmentPage; 