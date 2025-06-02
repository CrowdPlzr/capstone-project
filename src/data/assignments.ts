export interface Assignment {
  id: string;
  name: string;
  description: string;
  category: string;
  modifiedTime: string;
  pdfPath: string;
  type: "PDF";
  size?: string;
  completed: boolean;
}

export const assignments: Assignment[] = [
  {
    id: "assignment-1",
    name: "Security Framework Analysis",
    description: "Comprehensive analysis of NIST Cybersecurity Framework implementation and its application in organizational security strategy.",
    category: "Framework Analysis",
    modifiedTime: "2024-11-15T10:30:00Z",
    pdfPath: "/assignments/assignment-1.pdf",
    type: "PDF",
    size: "2.4 MB",
    completed: true
  },
  {
    id: "assignment-2", 
    name: "Risk Assessment Methodology",
    description: "Detailed risk assessment procedures and methodologies for identifying and evaluating cybersecurity threats.",
    category: "Risk Assessment",
    modifiedTime: "2024-11-20T14:15:00Z",
    pdfPath: "/assignments/assignment-2.pdf",
    type: "PDF",
    size: "3.1 MB",
    completed: false
  },
  {
    id: "assignment-3",
    name: "Threat Intelligence Analysis",
    description: "Advanced threat intelligence gathering and analysis techniques for proactive security measures.",
    category: "Threat Intelligence",
    modifiedTime: "2024-11-25T09:45:00Z",
    pdfPath: "/assignments/assignment-3.pdf",
    type: "PDF",
    size: "2.8 MB",
    completed: false
  },
  {
    id: "assignment-4",
    name: "Incident Response Planning",
    description: "Development of comprehensive incident response plans and procedures for cybersecurity events.",
    category: "Incident Response",
    modifiedTime: "2024-11-30T16:20:00Z",
    pdfPath: "/assignments/assignment-4.pdf",
    type: "PDF",
    size: "2.2 MB",
    completed: false
  },
  {
    id: "assignment-5",
    name: "Data Analytics for Security",
    description: "Application of data analytics and machine learning techniques in cybersecurity operations.",
    category: "Data Analytics",
    modifiedTime: "2024-12-05T11:10:00Z",
    pdfPath: "/assignments/assignment-5.pdf",
    type: "PDF",
    size: "3.5 MB",
    completed: false
  },
  {
    id: "assignment-6",
    name: "Compliance and Governance",
    description: "Cybersecurity compliance frameworks and governance structures for organizational security.",
    category: "Compliance",
    modifiedTime: "2024-12-10T13:30:00Z",
    pdfPath: "/assignments/assignment-6.pdf",
    type: "PDF",
    size: "2.9 MB",
    completed: false
  },
  {
    id: "assignment-7",
    name: "Network Security Assessment",
    description: "Comprehensive network security assessment methodologies and vulnerability analysis techniques.",
    category: "Network Security",
    modifiedTime: "2024-12-15T08:25:00Z",
    pdfPath: "/assignments/assignment-7.pdf",
    type: "PDF",
    size: "3.2 MB",
    completed: false
  },
  {
    id: "assignment-8",
    name: "Security Awareness Training",
    description: "Development and implementation of security awareness training programs for organizational staff.",
    category: "Training",
    modifiedTime: "2024-12-20T15:40:00Z",
    pdfPath: "/assignments/assignment-8.pdf",
    type: "PDF",
    size: "2.1 MB",
    completed: false
  },
  {
    id: "assignment-9",
    name: "Cloud Security Architecture",
    description: "Design and implementation of secure cloud architectures and best practices for cloud environments.",
    category: "Cloud Security",
    modifiedTime: "2024-12-25T12:15:00Z",
    pdfPath: "/assignments/assignment-9.pdf",
    type: "PDF",
    size: "3.8 MB",
    completed: false
  },
  {
    id: "assignment-10",
    name: "Penetration Testing Methodology",
    description: "Systematic penetration testing approaches and methodologies for security assessment.",
    category: "Penetration Testing",
    modifiedTime: "2024-12-30T10:50:00Z",
    pdfPath: "/assignments/assignment-10.pdf",
    type: "PDF",
    size: "4.1 MB",
    completed: false
  },
  {
    id: "assignment-11",
    name: "Digital Forensics Analysis",
    description: "Digital forensics techniques and tools for incident investigation and evidence collection.",
    category: "Digital Forensics",
    modifiedTime: "2025-01-05T14:35:00Z",
    pdfPath: "/assignments/assignment-11.pdf",
    type: "PDF",
    size: "3.7 MB",
    completed: false
  },
  {
    id: "assignment-12",
    name: "Security Operations Center",
    description: "Design and operation of Security Operations Centers (SOC) for continuous security monitoring.",
    category: "SOC Operations",
    modifiedTime: "2025-01-10T09:20:00Z",
    pdfPath: "/assignments/assignment-12.pdf",
    type: "PDF",
    size: "2.6 MB",
    completed: false
  },
  {
    id: "assignment-13",
    name: "Business Continuity Planning",
    description: "Development of business continuity and disaster recovery plans for cybersecurity incidents.",
    category: "Business Continuity",
    modifiedTime: "2025-01-15T16:45:00Z",
    pdfPath: "/assignments/assignment-13.pdf",
    type: "PDF",
    size: "3.3 MB",
    completed: false
  },
  {
    id: "assignment-14",
    name: "Capstone Project Final Report",
    description: "Comprehensive final report consolidating all cybersecurity analytics research and findings.",
    category: "Final Project",
    modifiedTime: "2025-01-20T11:00:00Z",
    pdfPath: "/assignments/assignment-14.pdf",
    type: "PDF",
    size: "5.2 MB",
    completed: false
  }
];

export const getAssignmentById = (id: string): Assignment | undefined => {
  return assignments.find(assignment => assignment.id === id);
};

export const getCompletedAssignments = (): Assignment[] => {
  return assignments.filter(assignment => assignment.completed);
};

export const getPendingAssignments = (): Assignment[] => {
  return assignments.filter(assignment => !assignment.completed);
}; 