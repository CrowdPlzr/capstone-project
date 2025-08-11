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
    name: "Cyber Range Evaluation Report",
    description: "This report evaluates three commercial cyber range platforms: RangeForce, CYBER RANGES, and Cogent Cyber Range, to help a mid-sized company choose a cybersecurity training solution.  The evaluation uses a custom rubric based on factors like real-world simulation, scalability, user experience, content quality, and cost-efficiency.",
    category: "Comparative Analysis",
    modifiedTime: "2025-06-01",
    pdfPath: "/assignments/assignment-1.pdf",
    type: "PDF",
    size: "1.3 MB",
    completed: true
  },
  {
    id: "assignment-2", 
    name: "Network Reconnaissance & Vulnerability Assessment",
    description: "Hands-on exercises focusing on network reconnaissance techniques such as host discovery, port scanning, and service version enumeration.",
    category: "Cybersecurity Operations/Network Security",
    modifiedTime: "2025-06-15",
    pdfPath: "/assignments/assignment-2.pdf",
    type: "PDF",
    size: "2.7 MB",
    completed: true
  },
  {
    id: "assignment-3",
    name: "SCADA Security: Firewall Rules and Infrastructure Attack",
    description: "Defensive and Offensive approaches to SCADA system security.",
    category: "Industrial Control Systems (ICS) Security/Cybersecurity Operations",
    modifiedTime: "2025-06-22",
    pdfPath: "/assignments/assignment-3.pdf",
    type: "PDF",
    size: "2.7 MB",
    completed: true
  },
  {
    id: "assignment-4",
    name: "Web Application & OSINT Attack Techniques",
    description: "Common attacks used by adversaries and OSINT techniques pertaining to reconnaissance and network footprinting.",
    category: "Penetration Testing/Offensive Security",
    modifiedTime: "2025-06-29",
    pdfPath: "/assignments/assignment-4.pdf",
    type: "PDF",
    size: "7 MB",
    completed: true
  },
  {
    id: "assignment-5",
    name: "Advanced Adversarial Tactics: Reconnaissance, Resource Development, and Pivoting",
    description: "Web scraping using cewl, directory enumeration using gobuster, and website cloning/credential harvesting using the Social Engineering Toolkit (SET). **Note, this assignment required a fair amount of troubleshooting due to issues with Infosec's lab environment.**",
    category: "Offensive Security/Red Teaming",
    modifiedTime: "2025-07-05",
    pdfPath: "/assignments/assignment-5.pdf",
    type: "PDF",
    size: "2.2 MB",
    completed: true
  },
  {
    id: "assignment-6",
    name: "Privilege Escalation via XSS & Defensive Evasion Techniques",
    description: "Privilege escalation using cross-site scripting vulnerabilities within a web app and adversarial defensive evasion techniques via a Linux host.",
    category: "Offensive Security/Red Teaming",
    modifiedTime: "2025-07-13",
    pdfPath: "/assignments/assignment-6.pdf",
    type: "PDF",
    size: "2.2 MB",
    completed: true
  },
  {
    id: "assignment-7",
    name: "Web Vulnerabilities & Secure/Insecure Protocols",
    description: "Web vulnerabilities such as XSS (reflected, stored, and DOM-based), SQL injections, directory traversal, and file inclusion. Telnet, SSH, and FTP protocols are also covered to understand their security implications.",
    category: "Web App and Network Security",
    modifiedTime: "2025-07-20",
    pdfPath: "/assignments/assignment-7.pdf",
    type: "PDF",
    size: "2.4 MB",
    completed: true
  },
  {
    id: "assignment-8",
    name: "Network Security Diagnostics and Cryptography",
    description: "Iptables is used to create firewall rules and interations with network protocols like ping, nmap, and curl to inspect network configurations. Exploration of the implementation of symmetric and asymmetric cryptographic algorithms such as DES, 3DES, RSA, and AES.",
    category: "Network Security/Cryptography",
    modifiedTime: "2025-07-27",
    pdfPath: "/assignments/assignment-8.pdf",
    type: "PDF",
    size: "2.4 MB",
    completed: true
  },
  {
    id: "assignment-9",
    name: "Digital Evidence and Legal Issues",
    description: "Overview of the legal and ethical landscape of which cybersecurity professionals must be aware.",
    category: "Legal, Ethical, and Regulatory Compliance",
    modifiedTime: "2025-08-03",
    pdfPath: "/assignments/assignment-9.pdf",
    type: "PDF",
    size: "2.5 MB",
    completed: true
  },
  {
    id: "assignment-10",
    name: "Indicators of Compromise",
    description: "Execution of the necessary steps to identify, contain, and remove a threat from a machine.",
    category: "Incident Response",
    modifiedTime: "2025-08-08",
    pdfPath: "/assignments/assignment-10.pdf",
    type: "PDF",
    size: "2.4 MB",
    completed: true
  },
  {
    id: "assignment-11",
    name: "Cybersecurity Senior Management and Information Security Governance (ISG)",
    description: "A governance-focused reflection on senior leadership's role in cybersecurity .",
    category: "Governance, Risk, and Compliance (GRC)",
    modifiedTime: "2025-08-10",
    pdfPath: "/assignments/assignment-11.pdf",
    type: "PDF",
    size: "1.1 MB",
    completed: true
  },
  {
    id: "assignment-12",
    name: "Digital Forensics Techniques",
    description: "Exploring forensics techniques using Wireshark and validating evidence integriy with hashing algorithms.",
    category: "Digital Forensics and Incident Response (DFIR)",
    modifiedTime: "2025-08-12",
    pdfPath: "/assignments/assignment-12.pdf",
    type: "PDF",
    size: "2.5 MB",
    completed: true
  },
  {
    id: "assignment-13",
    name: "Overview and Reflection",
    description: "A brief overview of the capstone experience and a personal reflection from the student.",
    category: "Capstone Overview",
    modifiedTime: "2025-08-13",
    pdfPath: "/assignments/assignment-13.pdf",
    type: "PDF",
    size: "0.8 MB",
    completed: true
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
