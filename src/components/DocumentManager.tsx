"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText } from 'lucide-react';
import DocumentUpload from './DocumentUpload';
import DocumentList from './DocumentList';
import { DocumentMetadata } from '../lib/uploadService';

const DocumentManager = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('upload');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = (document: DocumentMetadata) => {
    console.log('Document uploaded successfully:', document);
    // Trigger refresh of document list
    setRefreshTrigger(prev => prev + 1);
    // Auto-switch to manage tab to show the uploaded document
    setTimeout(() => setActiveTab('manage'), 1000);
  };

  const handleUploadError = (error: string) => {
    console.error('Upload error:', error);
  };

  const handleDocumentDeleted = (documentId: string) => {
    console.log('Document deleted:', documentId);
  };

  const tabs = [
    {
      id: 'upload' as const,
      label: 'Upload Documents',
      icon: Upload,
      description: 'Upload new documents to your library'
    },
    {
      id: 'manage' as const,
      label: 'Manage Documents',
      icon: FileText,
      description: 'View and manage your uploaded documents'
    }
  ];

  return (
    <section id="documents" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Document Center
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Upload, store, and manage your professional documents securely in the cloud. 
            Keep your resume, certifications, and portfolio organized and accessible.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="flex bg-card border border-border rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-md transition-all duration-300 font-medium
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-background shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Description */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <p className="text-muted-foreground">
            {tabs.find(tab => tab.id === activeTab)?.description}
          </p>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="min-h-[600px]"
        >
          {activeTab === 'upload' ? (
            <DocumentUpload 
              onUploadSuccess={handleUploadSuccess}
              onError={handleUploadError}
            />
          ) : (
            <DocumentList 
              onDocumentDeleted={handleDocumentDeleted}
              refreshTrigger={refreshTrigger}
            />
          )}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-card border border-border rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Secure Storage</h4>
              <p className="text-sm text-muted-foreground">
                Your documents are stored securely in Firebase Cloud Storage with enterprise-grade security
              </p>
            </div>
            
            <div className="p-6 bg-card border border-border rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Access Anywhere</h4>
              <p className="text-sm text-muted-foreground">
                Access your documents from any device, anywhere in the world with internet connection
              </p>
            </div>
            
            <div className="p-6 bg-card border border-border rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Fast & Reliable</h4>
              <p className="text-sm text-muted-foreground">
                Quick uploads and downloads with reliable cloud infrastructure and 99.9% uptime
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentManager; 