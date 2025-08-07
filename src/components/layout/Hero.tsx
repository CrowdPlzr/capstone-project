"use client";

import { motion } from "framer-motion";
import { ChevronDown, Download, Mail, Github, Linkedin, Award } from "lucide-react";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-0">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-foreground bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text supports-[background-clip:text]:text-transparent">
                Brantley Price
              </span>
            </h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground font-medium"
            >
              Cybersecurity Analytics & Operations Capstone Project
            </motion.div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Transforming complex cybersecurity challenges into actionable insights through 
            advanced analytics, machine learning, and strategic operations. Specializing in 
            <span className="text-neon-blue font-semibold"> cybersecurity frameworks</span>, 
            <span className="text-neon-purple font-semibold"> threat intelligence</span>, and 
            <span className="text-neon-green font-semibold"> data-driven security solutions</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("capstone")}
              className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-background font-semibold rounded-lg glow-effect transition-all duration-300 flex items-center gap-2"
            >
              View Capstone Project
              <ChevronDown className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-border text-foreground font-semibold rounded-lg hover:bg-card transition-all duration-300 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center gap-6 mb-16"
          >
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="mailto:brantleyp@gmail.com"
              className="p-3 bg-card border border-border rounded-lg hover:border-neon-blue transition-all duration-300 group"
            >
              <Mail className="w-5 h-5 text-muted-foreground group-hover:text-neon-blue transition-colors" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://linkedin.com/in/brantley-price"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-card border border-border rounded-lg hover:border-neon-blue transition-all duration-300 group"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-neon-blue transition-colors" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://github.com/brantley-price"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-card border border-border rounded-lg hover:border-neon-blue transition-all duration-300 group"
            >
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-neon-blue transition-colors" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://www.credly.com/users/brantley-price.56d860fc"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-card border border-border rounded-lg hover:border-neon-green transition-all duration-300 group"
              aria-label="View Credly Certifications"
            >
              <Award className="w-5 h-5 text-muted-foreground group-hover:text-neon-green transition-colors" />
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={() => scrollToSection("about")}
              className="text-muted-foreground hover:text-neon-blue transition-colors"
            >
              <ChevronDown className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-neon-blue rounded-full animate-ping"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-neon-purple rounded-full animate-ping delay-500"></div>
      <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-neon-green rounded-full animate-ping delay-1000"></div>
    </section>
  );
};

export default Hero; 