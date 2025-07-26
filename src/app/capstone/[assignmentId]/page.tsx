"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Calendar, Folder, FileText, AlertCircle, Download } from "lucide-react";
import Link from "next/link";
import { getAssignmentById, Assignment } from "@/data/assignments";
// ...existing code...


interface AssignmentPageProps {
  params: Promise<{
    assignmentId: string;
  }>;
}

const AssignmentPage = ({ params }: AssignmentPageProps) => {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // ...existing code...
  // ...existing code...

  const loadAssignment = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate loading for smooth transition
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const foundAssignment = getAssignmentById(id);
      
      if (!foundAssignment) {
        setError('Assignment not found');
        return;
      }

      if (!foundAssignment.completed) {
        setError('This assignment is not yet completed');
        return;
      }
      
      setAssignment(foundAssignment);
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

  // ...existing code...

  const formatDate = (dateString: string): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  const formatFileSize = (size?: string): string => {
    if (!size) return 'Unknown size';
    return size;
  };

  const getFileIcon = (type: string) => {
    if (type === 'PDF') return '🗎';
    return '📎';
  };

  const getCategoryFromType = (type: string) => {
    if (type === 'PDF') return 'PDF Document';
    return 'Document';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Framework Analysis': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      'Risk Assessment': 'bg-red-500/10 text-red-500 border-red-500/20',
      'Threat Intelligence': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      'Incident Response': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      'Data Analytics': 'bg-green-500/10 text-green-500 border-green-500/20',
      'Compliance': 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
      'Network Security': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
      'Training': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      'Cloud Security': 'bg-teal-500/10 text-teal-500 border-teal-500/20',
      'Penetration Testing': 'bg-rose-500/10 text-rose-500 border-rose-500/20',
      'Digital Forensics': 'bg-violet-500/10 text-violet-500 border-violet-500/20',
      'SOC Operations': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      'Business Continuity': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      'Final Project': 'bg-gradient-to-r from-neon-blue to-neon-purple text-background border-neon-blue/20'
    };
    return colors[category] || 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  };

  // ...existing code...

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
            <h1 className="text-2xl font-bold text-foreground mb-2">Assignment Not Available</h1>
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
            
            <motion.a
              href={assignment.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-background rounded-lg hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              Download PDF
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* Assignment Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Assignment Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-neon-blue/5 to-neon-purple/5 border border-neon-blue/20 rounded-xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{getFileIcon(assignment.type)}</span>
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
                <span className={`px-3 py-1 rounded-full text-sm border ${getCategoryColor(assignment.category)}`}>
                  {assignment.category}
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

            <div className="bg-background/50 border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {assignment.description}
              </p>
            </div>
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
            
            <div className="relative">
              <iframe
                src={assignment.pdfPath}
                width="100%"
                height="800px"
                title={assignment.name}
              ></iframe>
            </div>
          </div>

          {/* Alternative View Options */}
          <div className="mt-4 flex flex-wrap gap-4">
            <motion.a
              href={assignment.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-neon-blue/50 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-foreground">Open in New Tab</span>
            </motion.a>
            
            <motion.a
              href={assignment.pdfPath}
              download
              className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-neon-blue/50 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-4 h-4" />
              <span className="text-foreground">Download PDF</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Assignment Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Assignment Details</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">File Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="text-foreground">{getCategoryFromType(assignment.type)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="text-foreground">{assignment.category}</span>
                  </div>
                  {assignment.size && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="text-foreground">{assignment.size}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Modified:</span>
                    <span className="text-foreground">{formatDate(assignment.modifiedTime)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Actions</h3>
                <div className="space-y-2">
                  <Link href="/capstone">
                    <motion.button
                      className="w-full px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-background rounded-lg hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back to All Assignments
                    </motion.button>
                  </Link>
                  
                  <motion.a
                    href={assignment.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-card border border-border rounded-lg hover:border-neon-blue/50 transition-all text-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-foreground">View Full Screen</span>
                    </div>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default AssignmentPage; 