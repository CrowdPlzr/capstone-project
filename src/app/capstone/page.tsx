"use client";

import { motion } from "framer-motion";
import { ArrowLeft, FileText, Database, Shield, BarChart3 } from "lucide-react";
import Link from "next/link";
import DocumentManager from "@/components/DocumentManager";

const CapstonePage = () => {
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
              <span className="text-foreground">& Operations Hub</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Welcome to my capstone project workspace. This interactive platform demonstrates advanced 
              cybersecurity analytics, document management, and operational frameworks using cutting-edge 
              technology and industry best practices.
            </p>

            {/* Key Features */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-6 bg-card border border-border rounded-lg"
              >
                <FileText className="w-8 h-8 text-neon-blue mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Document Management</h3>
                <p className="text-sm text-muted-foreground">
                  Secure cloud-based document storage and management system
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="p-6 bg-card border border-border rounded-lg"
              >
                <BarChart3 className="w-8 h-8 text-neon-purple mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Analytics Dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time data visualization and security metrics analysis
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-6 bg-card border border-border rounded-lg"
              >
                <Shield className="w-8 h-8 text-neon-green mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Security Framework</h3>
                <p className="text-sm text-muted-foreground">
                  NIST-compliant security protocols and risk assessment tools
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Document Management Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="py-16"
      >
        <DocumentManager />
      </motion.section>

      {/* Additional Features Section */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Coming Soon
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Additional features and interactive dashboards are in development to showcase 
              the full scope of cybersecurity analytics and operational capabilities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Threat Intelligence Dashboard",
                description: "Real-time threat monitoring and analysis with interactive visualizations",
                icon: Database,
                status: "In Development"
              },
              {
                title: "Risk Assessment Tools",
                description: "NIST framework-based risk evaluation and mitigation strategies",
                icon: Shield,
                status: "Planning"
              },
              {
                title: "Incident Response Tracker",
                description: "Comprehensive incident management and response workflow system",
                icon: BarChart3,
                status: "Research Phase"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-card border border-border rounded-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-muted to-muted/50 rounded-lg">
                    <feature.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <span className="text-xs text-muted-foreground">{feature.status}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            Built with Next.js, Firebase, and modern cybersecurity principles • {" "}
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