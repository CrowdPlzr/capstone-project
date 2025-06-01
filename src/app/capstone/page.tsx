"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Calendar, Folder, ExternalLink } from "lucide-react";
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

const CapstonePage = () => {
  const [assignments, setAssignments] = useState<GoogleDriveFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/drive/files');
      
      if (!response.ok) {
        throw new Error('Failed to fetch assignments');
      }
      
      const files = await response.json();
      setAssignments(files);
    } catch (error) {
      console.error('Error loading assignments:', error);
      setError('Failed to load assignments. Please check your Google Drive configuration.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateString));
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
      'Document': 'bg-blue-500/10 text-blue-500',
      'Spreadsheet': 'bg-green-500/10 text-green-500',
      'Presentation': 'bg-purple-500/10 text-purple-500',
      'PDF': 'bg-red-500/10 text-red-500',
      'Image': 'bg-pink-500/10 text-pink-500',
      'File': 'bg-gray-500/10 text-gray-500'
    };
    return colors[category] || 'bg-gray-500/10 text-gray-500';
  };

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
            <Link href="/" className="flex items-center gap-2 text-foreground hover:text-neon-blue transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to Portfolio</span>
            </Link>
            
            <h1 className="text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Capstone Project Hub
            </h1>
            
            <div className="w-32" /> {/* Spacer for balance */}
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-neon-blue/5 to-neon-purple/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Cybersecurity Analytics
              </span>
              <br />
              <span className="text-foreground">Capstone Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Welcome to my capstone project collection. Each assignment demonstrates different aspects 
              of cybersecurity analytics, threat intelligence, and operational frameworks. Click on any 
              assignment below to explore the detailed work and findings.
            </p>

            <div className="flex justify-center items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-neon-blue" />
                <span>{assignments.length} Assignment{assignments.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <Folder className="w-5 h-5 text-neon-purple" />
                <span>Google Drive Integration</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Assignments List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Capstone Assignments
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore each assignment to see detailed analysis, methodologies, and findings from my cybersecurity capstone project.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading assignments from Google Drive...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-card border border-border rounded-xl">
              <FileText className="w-16 h-16 text-red-500 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Error Loading Assignments</h3>
              <p className="text-muted-foreground mb-6">{error}</p>
              <motion.button
                onClick={loadAssignments}
                className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-background rounded-lg hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Again
              </motion.button>
            </div>
          ) : assignments.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border rounded-xl">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Assignments Found</h3>
              <p className="text-muted-foreground">
                No files found in the configured Google Drive folder.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignments.map((assignment, index) => (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/capstone/${assignment.id}`}>
                    <div className="bg-card border border-border rounded-xl p-6 hover:border-neon-blue/50 transition-all duration-300 h-full cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{getFileIcon(assignment.mimeType)}</span>
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-neon-blue transition-colors">
                              {assignment.name}
                            </h3>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {formatDate(assignment.modifiedTime)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <Folder className="w-4 h-4 text-muted-foreground" />
                            <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(getCategoryFromMimeType(assignment.mimeType))}`}>
                              {getCategoryFromMimeType(assignment.mimeType)}
                            </span>
                          </div>
                        </div>
                        
                        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-neon-blue transition-colors" />
                      </div>

                      {assignment.description && (
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                          {assignment.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-xs text-muted-foreground">
                          Click to view assignment
                        </span>
                        <div className="flex items-center gap-1 text-neon-blue">
                          <span className="text-xs">View Details</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            Cybersecurity Analytics Capstone Project • Powered by Google Drive • {" "}
            <Link href="/" className="text-neon-blue hover:text-neon-purple transition-colors">
              Return to Main Portfolio
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
};

export default CapstonePage; 