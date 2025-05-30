"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Linkedin, Github, Award } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "brantley@example.com",
      href: "mailto:brantley@example.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Available for Remote Work",
      href: null
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/brantley-price",
      color: "hover:text-blue-400"
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/brantley-price",
      color: "hover:text-gray-400"
    },
    {
      icon: Award,
      label: "Credly Certifications",
      href: "https://www.credly.com/users/brantley-price.56d860fc",
      color: "hover:text-neon-green"
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:brantley@example.com",
      color: "hover:text-neon-blue"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-card/30">
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
              Get In Touch
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to discuss cybersecurity challenges, collaboration opportunities, or just want to connect? 
            I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors text-foreground placeholder-muted-foreground"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors text-foreground placeholder-muted-foreground"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors text-foreground placeholder-muted-foreground"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors text-foreground placeholder-muted-foreground"
                  placeholder="Collaboration Opportunity"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors text-foreground placeholder-muted-foreground resize-none"
                  placeholder="I&apos;d like to discuss..."
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-background font-semibold rounded-lg glow-effect transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
            
            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-neon-blue/50 transition-all duration-300"
                >
                  <div className="p-3 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg">
                    <info.icon className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{info.label}</h4>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-muted-foreground hover:text-neon-blue transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h4 className="text-lg font-semibold text-foreground mb-4">Connect With Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-card border border-border rounded-lg transition-all duration-300 group ${social.color}`}
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-current transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-6 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border border-neon-blue/20 rounded-xl"
            >
              <h4 className="text-lg font-semibold text-foreground mb-3">Let&apos;s Collaborate</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I&apos;m always open to discussing new opportunities, cybersecurity challenges, 
                and innovative projects. Whether you&apos;re looking for expertise in security analytics, 
                data science, or strategic security implementations, I&apos;d love to connect.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 