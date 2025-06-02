"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Calendar, Folder, ExternalLink, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { assignments, Assignment } from "@/data/assignments";

const CapstonePage = () => {
  const [assignmentList, setAssignmentList] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use static assignment data only - no external API calls
    const timer = setTimeout(() => {
      setAssignmentList(assignments);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateString));
  };

  const getFileIcon = (type: string) => {
    if (type === 'PDF') return '🗎';
    return '📎';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Framework Analysis': 'bg-blue-500/10 text-blue-500',
      'Risk Assessment': 'bg-red-500/10 text-red-500',
      'Threat Intelligence': 'bg-purple-500/10 text-purple-500',
      'Incident Response': 'bg-orange-500/10 text-orange-500',
      'Data Analytics': 'bg-green-500/10 text-green-500',
      'Compliance': 'bg-indigo-500/10 text-indigo-500',
      'Network Security': 'bg-cyan-500/10 text-cyan-500',
      'Training': 'bg-yellow-500/10 text-yellow-500',
      'Cloud Security': 'bg-teal-500/10 text-teal-500',
      'Penetration Testing': 'bg-rose-500/10 text-rose-500',
      'Digital Forensics': 'bg-violet-500/10 text-violet-500',
      'SOC Operations': 'bg-emerald-500/10 text-emerald-500',
      'Business Continuity': 'bg-amber-500/10 text-amber-500',
      'Final Project': 'bg-gradient-to-r from-neon-blue to-neon-purple text-background'
    };
    return colors[category] || 'bg-gray-500/10 text-gray-500';
  };

  const completedCount = assignmentList.filter(a => a.completed).length;
  const totalCount = assignmentList.length;

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
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{completedCount}/{totalCount} Complete</span>
            </div>
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
                Cybersecurity Analytics and Operations
              </span>
              <br />
              <span className="text-foreground">Capstone Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Welcome to my capstone project collection. Each assignment demonstrates different aspects 
              of cybersecurity analytics, operations, threat intelligence, and the application of operations frameworks. Click on any 
              assignment below to explore the detailed work and findings.
            </p>

            <div className="flex justify-center items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-neon-blue" />
                <span>{totalCount} Assignment{totalCount !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-neon-green" />
                <span>{completedCount} Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-neon-purple" />
                <span>{totalCount - completedCount} In Progress</span>
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
              <p className="text-muted-foreground">Loading assignments...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignmentList.map((assignment, index) => (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/capstone/${assignment.id}`}>
                    <div className={`bg-card border border-border rounded-xl p-6 hover:border-neon-blue/50 transition-all duration-300 h-full cursor-pointer relative ${
                      !assignment.completed ? 'opacity-60' : ''
                    }`}>
                      {/* Completion Status Badge */}
                      <div className="absolute top-4 right-4">
                        {assignment.completed ? (
                          <CheckCircle className="w-5 h-5 text-neon-green" />
                        ) : (
                          <Clock className="w-5 h-5 text-neon-purple" />
                        )}
                      </div>

                      <div className="flex items-start justify-between mb-4 pr-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{getFileIcon(assignment.type)}</span>
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
                            <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(assignment.category)}`}>
                              {assignment.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {assignment.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-xs text-muted-foreground">
                          {assignment.completed ? 'Click to view assignment' : 'Coming soon...'}
                        </span>
                        <div className="flex items-center gap-1 text-neon-blue">
                          <span className="text-xs">
                            {assignment.completed ? 'View Details' : 'In Progress'}
                          </span>
                          {assignment.completed && <ExternalLink className="w-3 h-3" />}
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
            Cybersecurity Analytics Capstone Project • Static Portfolio System • {" "}
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