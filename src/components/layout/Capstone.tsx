"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Target, Cog, BarChart3, Lightbulb, ExternalLink } from "lucide-react";

const Capstone = () => {
  const sections = [
    {
      id: "problem",
      title: "Security Operations & Detection",
      icon: Target,
      content: "SIEM queries, incident response, threat hunting, malware analysis."
    },
    {
      id: "process",
      title: "Security Engineer",
      icon: Cog,
      content: "Network hardening, SIEM/SOAR engineering, DevSecOps management, threat modeling, network segmentation."
    },
    {
      id: "results",
      title: "Governance, risk, compliance, and policy",
      icon: BarChart3,
      content: "Cybersecurity frameworks (NIST, ISO 27001, SOC 2, PCI), continuous monitoring, data mapping, privacy controls, regulatory compliance."
    },
    {
      id: "reflections",
      title: "Data Forensics",
      icon: Lightbulb,
      content: "Chain of custody, hashing and cryptography, encrypted algorithms, schema design, legal compliance."
    }
  ];

  const technologies = [
    "Python", "Linux", "MITRE ATT&CK Framework", "OSINT", "Offensive/Defensive Cybersecurity", 
    "Threat Intelligence", "Kali Red Teaming Tools", "Risk Assessment", "Incident Response"
  ];

  return (
    <section id="capstone" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Capstone Project
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Cybersecurity Analytics & Operations: A comprehensive study in threat detection, 
            risk assessment, and security framework implementation.
          </p>
        </motion.div>

        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 p-8 bg-gradient-to-r from-neon-blue/5 to-neon-purple/5 border border-neon-blue/20 rounded-xl"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">Project Overview</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
           A laboratory-based project that required the application of skills and knowledge from previous coursework to cybersecurity scenarios and problems found in the real world. The project combines analyses of cybersecurity issues with the critical thinking required to resolve them. Within this project, are a variety of issues spanning a wide range of cybersecurity vulnerabilities and scenarios. Each assignment requires a thorough analysis in order to apply the proper tools and techniques for a successful resolution. Below are four cybersecurity jobs and a few of their required skills.
          </p>
          
          {/* Technologies Used */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-foreground mb-3">Technologies & Frameworks</h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-card text-card-foreground text-sm rounded-full border border-border hover:border-neon-blue/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/capstone">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-background font-semibold rounded-lg glow-effect transition-all duration-300 flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Enter Capstone
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Project Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-card border border-border rounded-xl hover:border-neon-blue/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg">
                  <section.icon className="w-6 h-6 text-background" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{section.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capstone; 