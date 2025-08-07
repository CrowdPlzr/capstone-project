"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Target, Cog, BarChart3, Lightbulb, ExternalLink, Github } from "lucide-react";

const Capstone = () => {
  const sections = [
    {
      id: "problem",
      title: "Problem Statement",
      icon: Target,
      content: "Identifying and addressing critical cybersecurity vulnerabilities through advanced analytics and machine learning techniques to enhance organizational security posture."
    },
    {
      id: "process",
      title: "Methodology & Process",
      icon: Cog,
      content: "Implemented a comprehensive approach utilizing NIST frameworks, statistical analysis, and machine learning algorithms to analyze security data and identify threat patterns."
    },
    {
      id: "results",
      title: "Results & Impact",
      icon: BarChart3,
      content: "Achieved significant improvements in threat detection accuracy and response times, resulting in enhanced security operations and reduced risk exposure."
    },
    {
      id: "reflections",
      title: "Key Insights",
      icon: Lightbulb,
      content: "Gained valuable insights into the intersection of data science and cybersecurity, highlighting the importance of data-driven decision making in security operations."
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
           A laboratory-based project that required the application of skills and knowledge from previous coursework to cybersecurity scenarios and problems found in the real world. The project combines analyses of cybersecurity issues with the critical thinking required to resolve them. Within this project, are a variety of issues spanning a wide range of cybersecurity vulnerabilities and scenarios. Each assignment requires a thorough analysis in order to apply the proper tools and techniques for a successful resolution.
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-card transition-all duration-300 flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              View Source Code
            </motion.button>
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