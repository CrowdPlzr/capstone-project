"use client";

import { motion } from "framer-motion";
import { Shield, Database, Brain, Code, Award, Users } from "lucide-react";

const About = () => {
  const skills = [
    {
      category: "Cybersecurity",
      icon: Shield,
      items: ["NIST Frameworks", "Risk Assessment", "Threat Intelligence", "Incident Response", "Compliance"]
    },
    {
      category: "Data Analytics",
      icon: Database,
      items: ["Python", "SQL", "Splunk", "Tableau", "Statistical Analysis"]
    },
    {
      category: "Machine Learning",
      icon: Brain,
      items: ["Anomaly Detection", "Predictive Modeling", "Classification", "Feature Engineering", "Model Validation"]
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "Certified Information Systems Security Professional",
      description: "ISC2"
    },
    {
      icon: Users,
      title: "Team Leadership",
      description: "Led cross-functional teams in implementing security frameworks, protocols, and best practices"
    }
  ];

  return (
    <section id="about" className="py-20 bg-card/30">
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
              About Me
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Passionate cybersecurity professional with expertise in analytics, operations, and strategic security implementations. 
            Dedicated to transforming complex security challenges into actionable insights through data-driven approaches.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">Professional Background</h3>
            <p className="text-muted-foreground leading-relaxed">
              With a strong foundation in cybersecurity analytics and operations, I specialize in developing 
              comprehensive security strategies that leverage advanced data analysis techniques. My experience 
              spans across threat intelligence, risk assessment, and the implementation of NIST frameworks.
            </p>
            
            {/* Achievements */}
            <div className="space-y-4 mt-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg"
                >
                  <div className="p-2 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg">
                    <achievement.icon className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Technical Expertise</h3>
            <div className="space-y-6">
              {skills.map((skillCategory, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-card border border-border rounded-lg hover:border-neon-blue/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg">
                      <skillCategory.icon className="w-5 h-5 text-background" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">{skillCategory.category}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full border border-border hover:border-neon-blue/50 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 
