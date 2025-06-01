"use client";

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, X, CheckCircle, AlertCircle, Download, Trash2 } from 'lucide-react';
import { DocumentUploadService, DocumentMetadata } from '../lib/uploadService';

interface DocumentUploadProps {
  onUploadSuccess?: (document: DocumentMetadata) => void;
  onError?: (error: string) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUploadSuccess, onError }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const categories = [
    'Resume/CV',
    'Certifications',
    'Projects',
    'Research',
    'Portfolio',
    'Other'
  ];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    const validation = DocumentUploadService.validateFile(file);
    if (!validation.isValid) {
      setUploadStatus('error');
      setStatusMessage(validation.error || 'Invalid file');
      onError?.(validation.error || 'Invalid file');
      return;
    }

    setSelectedFile(file);
    setUploadStatus('idle');
    setStatusMessage('');
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);
    setUploadStatus('idle');

    try {
      // Simulate progress (since Firebase doesn't provide granular progress)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const uploadedDocument = await DocumentUploadService.uploadDocument(
        selectedFile,
        category || undefined,
        description || undefined
      );

      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadStatus('success');
      setStatusMessage('Document uploaded successfully!');
      
      // Reset form
      setTimeout(() => {
        setSelectedFile(null);
        setCategory('');
        setDescription('');
        setUploadProgress(0);
        setUploadStatus('idle');
        setStatusMessage('');
      }, 2000);

      onUploadSuccess?.(uploadedDocument);
    } catch (error) {
      setUploadStatus('error');
      setStatusMessage('Failed to upload document. Please try again.');
      onError?.(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setUploadStatus('idle');
    setStatusMessage('');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-card border border-border rounded-xl">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">Upload Documents</h3>
        <p className="text-muted-foreground">
          Upload your resume, certifications, or other professional documents
        </p>
      </div>

      {/* File Drop Zone */}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-8 transition-all duration-300 cursor-pointer
          ${isDragging 
            ? 'border-neon-blue bg-neon-blue/10' 
            : 'border-border hover:border-neon-blue/50 hover:bg-muted/50'
          }
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          type="file"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
        />
        
        <div className="text-center">
          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground mb-2">
            Drop your document here or click to browse
          </p>
          <p className="text-sm text-muted-foreground">
            Supports PDF, Word, text files, and images (max 10MB)
          </p>
        </div>
      </motion.div>

      {/* Selected File Display */}
      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-muted rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <File className="w-5 h-5 text-neon-blue" />
              <div>
                <p className="font-medium text-foreground">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <button
              onClick={clearSelectedFile}
              className="p-1 hover:bg-background rounded transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Upload Form */}
      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-4"
        >
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Category (optional)
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description for this document..."
              className="w-full p-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent resize-none h-20"
            />
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground">Uploading...</span>
                <span className="text-muted-foreground">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                  className="h-2 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>
          )}

          {/* Status Message */}
          {statusMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`flex items-center gap-2 p-3 rounded-lg ${
                uploadStatus === 'success' 
                  ? 'bg-green-500/10 text-green-500' 
                  : 'bg-red-500/10 text-red-500'
              }`}
            >
              {uploadStatus === 'success' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span className="text-sm">{statusMessage}</span>
            </motion.div>
          )}

          {/* Upload Button */}
          <motion.button
            onClick={handleUpload}
            disabled={uploading || uploadStatus === 'success'}
            className={`
              w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300
              ${uploading || uploadStatus === 'success'
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-gradient-to-r from-neon-blue to-neon-purple text-background hover:shadow-lg hover:shadow-neon-blue/25'
              }
            `}
            whileHover={uploading ? {} : { scale: 1.02 }}
            whileTap={uploading ? {} : { scale: 0.98 }}
          >
            {uploading ? 'Uploading...' : 'Upload Document'}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default DocumentUpload; 