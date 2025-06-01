"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Upload, Plus, Calendar, Folder, ExternalLink } from "lucide-react";
import Link from "next/link";
import { DocumentUploadService, DocumentMetadata } from "@/lib/uploadService";

const CapstonePage = () => {
  const [assignments, setAssignments] = useState<DocumentMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  
  // Upload form state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      setLoading(true);
      const docs = await DocumentUploadService.getDocuments();
      setAssignments(docs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()));
    } catch (error) {
      console.error('Error loading assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      // Auto-populate title from filename if empty
      if (!uploadTitle) {
        const nameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
        setUploadTitle(nameWithoutExtension);
      }
      setUploadError(null);
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) {
      setUploadError('Please select a file to upload');
      return;
    }

    if (!uploadTitle.trim()) {
      setUploadError('Please enter an assignment title');
      return;
    }

    try {
      setUploading(true);
      setUploadError(null);

      const uploadedDocument = await DocumentUploadService.uploadDocument(
        uploadFile,
        uploadCategory || undefined,
        uploadDescription || undefined
      );

      // Update the assignments list
      setAssignments(prev => [uploadedDocument, ...prev]);
      
      // Reset form
      setUploadFile(null);
      setUploadTitle('');
      setUploadCategory('');
      setUploadDescription('');
      setShowUpload(false);

      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Failed to upload assignment. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const cancelUpload = () => {
    setUploadFile(null);
    setUploadTitle('');
    setUploadCategory('');
    setUploadDescription('');
    setUploadError(null);
    setShowUpload(false);
    
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
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
            
            <motion.button
              onClick={() => setShowUpload(!showUpload)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-background rounded-lg hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
              Add Assignment
            </motion.button>
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
                <Upload className="w-5 h-5 text-neon-purple" />
                <span>Interactive Content</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upload Section */}
      {showUpload && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="py-8 bg-card/30 border-y border-border"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Upload New Assignment</h3>
              <p className="text-muted-foreground mb-6">
                Upload a new capstone assignment document. Each upload will create a dedicated page for that assignment.
              </p>
              
              {uploadError && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                  {uploadError}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Assignment Document
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileSelect}
                    className="w-full p-3 border border-border rounded-lg bg-background file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-muted file:text-foreground hover:file:bg-muted/80"
                  />
                  {uploadFile && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Selected: {uploadFile.name}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Assignment Title *
                    </label>
                    <input
                      type="text"
                      placeholder="Assignment Title"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-neon-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Category
                    </label>
                    <select 
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value)}
                      className="p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-neon-blue focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      <option value="Analysis">Security Analysis</option>
                      <option value="Framework">Framework Implementation</option>
                      <option value="Research">Research Project</option>
                      <option value="Case Study">Case Study</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Assignment Description
                  </label>
                  <textarea
                    placeholder="Describe this assignment, its objectives, methodology, and key findings..."
                    rows={3}
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                    className="w-full p-3 border border-border rounded-lg bg-background resize-none focus:ring-2 focus:ring-neon-blue focus:border-transparent"
                  />
                </div>

                <div className="flex gap-4">
                  <motion.button
                    onClick={handleUpload}
                    disabled={uploading || !uploadFile || !uploadTitle.trim()}
                    className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
                      uploading || !uploadFile || !uploadTitle.trim()
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : 'bg-gradient-to-r from-neon-blue to-neon-purple text-background hover:shadow-lg'
                    }`}
                    whileHover={uploading || !uploadFile || !uploadTitle.trim() ? {} : { scale: 1.05 }}
                    whileTap={uploading || !uploadFile || !uploadTitle.trim() ? {} : { scale: 0.95 }}
                  >
                    {uploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Upload Assignment
                      </>
                    )}
                  </motion.button>
                  <button
                    onClick={cancelUpload}
                    disabled={uploading}
                    className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

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
              <p className="text-muted-foreground">Loading assignments...</p>
            </div>
          ) : assignments.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border rounded-xl">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Assignments Yet</h3>
              <p className="text-muted-foreground mb-6">
                Upload your first capstone assignment to get started.
              </p>
              <motion.button
                onClick={() => setShowUpload(true)}
                className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-background rounded-lg hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Upload First Assignment
              </motion.button>
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
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-neon-blue transition-colors mb-2">
                            {assignment.name}
                          </h3>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {formatDate(assignment.uploadedAt)}
                            </span>
                          </div>

                          {assignment.category && (
                            <div className="flex items-center gap-2 mb-3">
                              <Folder className="w-4 h-4 text-muted-foreground" />
                              <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(assignment.category)}`}>
                                {assignment.category}
                              </span>
                            </div>
                          )}
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
            Cybersecurity Analytics Capstone Project • {" "}
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