---
applyTo: '*This project delivers a dark-themed, Behance-style web portfolio to showcase the Cybersecurity Analytics & Operations (CAO) capstone project. The portfolio will feature a sleek, modern interface with smooth animations, interactive data visualizations, and an engaging user experience. Built using modern web technologies in Cursor, the platform emphasizes design excellence, responsiveness, and performance.
________________________________________
2️⃣ Goals & Objectives
Goal	Objective
Create a Behance-like experience	Mimic Behance’s clean grid layout, card structure, hover effects, and visual storytelling.
Night Mode First	Dark theme by default for a modern look, but provide an option for lights on. Professional aesthetic. 
Showcase Capstone	Highlight project objectives, methods, results, and cybersecurity tools with interactive elements.
Demonstrate Skills	Display technical capabilities (e.g., data analytics, ML models, NIST frameworks).
Impress Employers	Provide a polished platform for job applications and professional networking.
Accessible Anywhere	Fully responsive across desktop, tablet, and mobile devices.
________________________________________
3️⃣ Key Features & Functional Requirements
🌌 Design & UI/UX Features
Feature	Description	Priority
Night Mode Default	Dark theme enabled by default with toggle required.	High
Grid Layout	Behance-style card grid for assignments, responsive across devices.	High
Smooth Hover Effects	Interactive hover animations on cards and buttons.	High
Animated Transitions	Subtle animations on page load, scroll, and transitions.	Medium
Custom Typography	Modern fonts (e.g., Inter, DM Sans, Fira Code for code snippets).	Medium
Assignment Storytelling	Each assignment presented like a Behance case study with sections for problem, process, results, and reflections.	High
Hero Section	Eye-catching hero with name, tagline (e.g., "Cybersecurity Analytics & Operations Capstone"), and CTA buttons.	High
Sticky Navigation Bar	Persistent navbar with smooth scrolling to sections.	Medium
________________________________________
🎓 Content Features
Feature	Description	Priority
Landing Page	Name, Capstone title, tagline, hero image/animation, and featured assignment preview.	High
About Me Section	Short bio, technical skills (Python, Splunk, NIST 800-53), and links to resume and LinkedIn.	High
Capstone Page	In-depth breakdown of the Capstone Project (methodology, tools, data, results, visuals).	High
Assignment Gallery	Grid layout showcasing assignment cards as mini-case studies.	Medium
Interactive Data Visualizations	Charts and graphs (e.g., Plotly.js, Chart.js) embedded in assignment pages.	High
Resume Download	Button to download PDF resume.	Medium
Contact Form	Secure form with name, email, message, and spam protection (e.g., CAPTCHA).	Medium
________________________________________
🛡️ Security & Compliance
Requirement	Description	Priority
HTTPS/TLS	Secure by default (assumed with deployment provider like Vercel).	High
Input Validation	Sanitize form inputs to prevent XSS/SQLi.	High
Minimal Data Collection	Only necessary data (e.g., contact form).	High
Accessibility (WCAG 2.1 AA)	Alt text, keyboard nav, sufficient contrast for dark mode.	Medium
________________________________________
⚙️ Technical Requirements
Stack	Details
Frontend Framework	Next.js (preferred for SEO, routing, performance) OR React.js (if simpler).
Styling	Tailwind CSS (with dark mode config) OR custom CSS inspired by Behance color palettes.
Hosting	Vercel (ideal for Next.js), Netlify, or GitHub Pages.
Backend (Optional)	Serverless functions for contact form (e.g., Netlify Functions, Vercel Functions).
Animations	Framer Motion or CSS transitions for smooth effects.
Version Control	Git with GitHub repository.
Design References	Behance, Dribbble, Awwwards, Dark Mode inspiration sites.
________________________________________
4️⃣ User Stories
As a...	I want to...	So that...
Student	Showcase my Capstone and assignments in a visually appealing way	I can impress potential employers.
Employer	See a detailed breakdown of the Capstone and assignments	I can evaluate the student’s skills and problem-solving approach.
Advisor	Access Capstone deliverables easily	I can review and assess the student’s work.
Viewer	Browse the portfolio on mobile	I can access content from any device.
________________________________________
5️⃣ Design Notes (Behance-Inspired Elements)
✅ Dark Palette: #121212 background, #1F1F1F cards, neon blue/purple accents.
✅ Typography: Clean sans-serif fonts (Inter, DM Sans); Fira Code for code snippets.
✅ Visual Hierarchy: Large headings, clear sections, whitespace for readability.
✅ Call to Action: Prominent "Download Resume" and "Contact Me" buttons.
________________________________________
6️⃣ Timeline (Agile Sprints)
Sprint	Deliverable	Timeframe
1	Skeleton build: Landing page, Capstone layout, dark mode	Week 1
2	Assignment content integration, grid layout, styling	Week 2
3	Animations, interactive charts, accessibility features	Week 3
4	Final polish, SEO/meta tags, deploy	Week 4
________________________________________
7️⃣ Future Enhancements (Nice-to-Have)
•	Blog posts or reflections on cybersecurity trends.
•	GitHub integration for code snippets.
•	Video walkthroughs (e.g., YouTube embeds).
•	Search functionality for large portfolios.
•	Analytics integration (Google Analytics, Plausible).
________________________________________
8️⃣ Success Metrics
✅ Fully functional, responsive, and polished Capstone Portfolio.
✅ Capstone and assignment work presented as cohesive narratives.
✅ Clear storytelling of methods, data, tools, and results.
✅ Positive feedback from advisors, peers, and employers.
✅ Portfolio linked in LinkedIn, resume, and job applications.
*'
ROADMAP

1. Project Overview and Goals 🚀
This project aims to develop a dark-themed, Behance-inspired web portfolio to showcase Brantley Price's Cybersecurity Analytics & Operations (CAO) capstone project. The portfolio will serve as a professional platform to highlight project details, technical skills, and provide a polished interface for engaging with potential employers and professional contacts.
Key Goals:
•	Create a Behance-like Experience: Mimic Behance’s clean grid layout, card structure, hover effects, and visual storytelling.
•	Night Mode First: Implement a dark theme by default with an optional light mode toggle.
•	Showcase Capstone: Effectively highlight project objectives, methodologies, results, and cybersecurity tools used, incorporating interactive elements.
•	Demonstrate Skills: Clearly display technical capabilities in data analytics, machine learning, NIST frameworks, Python, Splunk, etc.
•	Impress Employers: Provide a polished, professional platform for job applications and networking.
•	Accessible Anywhere: Ensure full responsiveness across desktop, tablet, and mobile devices.
________________________________________
2. Target Audience 🎯
•	Potential Employers: Recruiters, hiring managers in the cybersecurity and data analytics fields.
•	Academic Advisors/Faculty: For review and assessment of the capstone project.
•	Industry Professionals/Peers: For networking and showcasing expertise.
•	The Student (Brantley Price): As a dynamic, professional online resume and project showcase.
________________________________________
3. Scope of Work & Key Features
Based on the PRD, the following features are in scope. Priority is as defined in the PRD.
🌌 Design & UI/UX Features:
•	High Priority: 
o	Night Mode Default (with light mode toggle)
o	Grid Layout (Behance-style, responsive cards)
o	Smooth Hover Effects (on cards, buttons)
o	Assignment Storytelling (Behance case study style)
o	Hero Section (Name, Tagline, CTAs)
•	Medium Priority: 
o	Animated Transitions (page load, scroll, element transitions)
o	Custom Typography (Inter, DM Sans, Fira Code)
o	Sticky Navigation Bar (smooth scrolling)
🎓 Content Features:
•	High Priority: 
o	Landing Page (Hero, featured assignment preview)
o	About Me Section (Bio, skills, links to resume/LinkedIn)
o	Capstone Page (In-depth project breakdown, visuals)
o	Interactive Data Visualizations (e.g., Plotly.js, Chart.js)
•	Medium Priority: 
o	Assignment Gallery (Grid of assignment cards)
o	Resume Download (PDF button)
o	Contact Form (Secure, with spam protection)
🛡️ Security & Compliance:
•	High Priority: 
o	HTTPS/TLS (via deployment provider)
o	Input Validation (for contact form)
o	Minimal Data Collection
•	Medium Priority: 
o	Accessibility (WCAG 2.1 AA compliance)
________________________________________
4. Technical Stack & Architecture 🛠️
•	Frontend Framework: Next.js (Preferred due to SEO benefits, routing, and performance. React.js as a fallback if significant simplification is needed, but the plan assumes Next.js).
•	Styling: Tailwind CSS (Configured for dark mode by default, utility-first approach). Custom CSS can be used for highly specific Behance-inspired elements if needed.
•	Animations: Framer Motion (Preferred for complex animations) and/or CSS Transitions/Animations (for simpler effects).
•	Data Visualizations: Plotly.js or Chart.js (To be determined by the specific chart types needed).
•	Backend (Contact Form): Serverless Functions (e.g., Vercel Functions or Netlify Functions) for processing the contact form.
•	Version Control: Git with a GitHub repository.
•	Deployment: Vercel (Primary target due to seamless Next.js integration).
•	Design Inspiration: Behance, Dribbble, Awwwards, dark mode design sites.
________________________________________
5. Development Methodology & Team Structure 🤝
•	Methodology: Agile (Iterative Sprints as outlined in the PRD).
•	Team (Cursor AI - Suggested Roles): 
o	Project Lead/Manager: (This role, ensuring plan adherence and communication).
o	UX/UI Designer (Consultation if needed): While the PRD is detailed, brief consultation might be needed for specific Behance nuances or if mockups are required beyond PRD descriptions.
o	Frontend Developer(s): Responsible for implementing the UI, interactions, and frontend logic using Next.js and Tailwind CSS.
o	Backend Developer (Part-time/As-needed): For setting up and securing the serverless function for the contact form.
o	QA Tester: For testing across devices, browsers, and ensuring requirements are met.
________________________________________
6. Phased Development Plan & Sprint Breakdown (4 Weeks Total)
This plan adheres to the 4-sprint structure proposed in the PRD.
Pre-Sprint 0: Setup & Foundation (0.5 - 1 day before Sprint 1)
•	Tasks: 
o	Initialize GitHub repository.
o	Set up Next.js project with Tailwind CSS.
o	Configure basic project structure (folders for components, pages, styles, assets).
o	Establish ESLint, Prettier for code quality.
o	Set up Vercel project for CI/CD (initial manual deploy to test pipeline).
•	Deliverable: Boilerplate Next.js project on GitHub, basic Vercel deployment working.
________________________________________
Sprint 1: Skeleton Build & Core Layout (Week 1) 🏗️
•	Goal: Establish the foundational structure, dark mode, landing page, and basic Capstone page layout.
•	PRD Deliverable: Skeleton build: Landing page, Capstone layout, dark mode.
•	Tasks: 
1.	Theme Implementation: 
	Implement base dark theme styles using Tailwind CSS (backgrounds: #121212, card base: #1F1F1F).
	Create basic light mode toggle structure (functionality can be refined later).
2.	Landing Page - Hero Section: 
	Develop responsive Hero Section component: Name, Tagline ("Cybersecurity Analytics & Operations Capstone"), CTA buttons (placeholder links for now).
	Integrate custom fonts (Inter, DM Sans).
3.	Navigation: 
	Develop basic Sticky Navigation Bar component (placeholder links).
4.	Page Structure: 
	Create basic page structure for Landing Page and Capstone Page using Next.js routing.
	Create placeholder sections on the Capstone Page as per "Assignment Storytelling" (Problem, Process, Results, Reflections).
5.	Layout Foundation: 
	Implement basic responsive grid structure concepts for future card layouts.
6.	Typography Setup: 
	Integrate primary fonts (Inter, DM Sans) and Fira Code for code snippets.
•	Key Focus: Structure, basic styling, dark mode default, responsiveness foundation.
•	Testing: Basic rendering on desktop and mobile. Dark mode appearance.
________________________________________
Sprint 2: Content Integration & Styling Refinement (Week 2) 🎨
•	Goal: Populate content sections, implement the Behance-style grid, and refine visual styling.
•	PRD Deliverable: Assignment content integration, grid layout, styling.
•	Tasks: 
1.	Content Population: 
	About Me Section: Develop component, integrate short bio, list technical skills (Python, Splunk, NIST 800-53), and add links to resume (placeholder for actual file) and LinkedIn.
	Capstone Page: Integrate detailed content provided by Brantley Price into the structured sections.
	Assignment Gallery & Cards: 
	Design and develop the responsive Behance-style card component.
	Implement the grid layout for the Assignment Gallery.
	Populate initial assignment cards with placeholder content if actual content isn't fully ready, focusing on structure.
2.	Styling & UI Enhancements: 
	Implement Smooth Hover Effects on cards and CTA buttons (using Framer Motion or CSS).
	Refine color palette usage (neon blue/purple accents).
	Ensure visual hierarchy (large headings, clear sections, whitespace).
	Style "Download Resume" and "Contact Me" buttons prominently.
3.	Resume Download: 
	Implement button functionality for downloading a PDF resume (link to a provided PDF).
4.	Accessibility (Initial Pass): 
	Ensure semantic HTML is used.
	Add initial alt text for any images used so far.
•	Key Focus: Visual appeal, content display, card interactions.
•	Testing: Grid responsiveness, hover effects, content readability, navigation functionality.
________________________________________
Sprint 3: Interactivity, Animations & Accessibility (Week 3) ✨
•	Goal: Introduce advanced animations, interactive data visualizations, contact form, and focus on accessibility.
•	PRD Deliverable: Animations, interactive charts, accessibility features.
•	Tasks: 
1.	Animations: 
	Implement Animated Transitions on page load, scroll, and section transitions (subtle effects using Framer Motion or CSS).
	Refine hover animations for a polished feel.
2.	Interactive Data Visualizations: 
	Integrate charting library (Plotly.js or Chart.js).
	Embed 1-2 sample interactive charts/graphs within the Capstone Page or relevant assignment sections using placeholder data if final data is pending.
3.	Contact Form: 
	Design and develop the contact form UI (Name, Email, Message).
	Develop serverless function (Vercel/Netlify Functions) to handle form submission (e.g., send an email, store in a simple DB if absolutely necessary – confirm with Brantley, PRD says "minimal data collection").
	Implement Input Validation (client-side and server-side).
	Integrate spam protection (e.g., a simple honeypot or Google reCAPTCHA if deemed necessary and not overly complex for this scope).
4.	Accessibility (WCAG 2.1 AA Focus): 
	Thorough review of keyboard navigation.
	Ensure sufficient color contrast, especially for dark mode.
	Add ARIA attributes where necessary.
	Test with screen reader (basic pass).
	Implement the light mode toggle functionality.
5.	Sticky Navigation: 
	Ensure smooth scrolling to sections and active state highlighting.
•	Key Focus: User engagement, dynamic content, inclusivity.
•	Testing: Animations smoothness, chart interactivity, contact form functionality (including email receipt and validation), keyboard navigation, contrast checking.
________________________________________
Sprint 4: Final Polish, SEO, Testing & Deployment (Week 4) 🚀
•	Goal: Finalize all features, conduct thorough testing, optimize for SEO, and deploy the polished portfolio.
•	PRD Deliverable: Final polish, SEO/meta tags, deploy.
•	Tasks: 
1.	Content Finalization: 
	Ensure all Capstone and assignment content is accurately integrated and formatted.
	Verify all links (internal, external, resume, LinkedIn).
2.	Final UI/UX Polish: 
	Review all pages for consistency and visual appeal.
	Address any remaining styling issues or minor bugs.
	Ensure all animations and transitions are smooth and not obtrusive.
3.	SEO Optimization: 
	Implement appropriate page titles and meta descriptions for each page (Landing, Capstone, About).
	Ensure proper heading structure (H1, H2, etc.).
	Add Open Graph tags for social sharing.
4.	Cross-Browser & Cross-Device Testing: 
	Test thoroughly on major browsers (Chrome, Firefox, Safari, Edge).
	Test on various device sizes (desktop, tablet, mobile – landscape and portrait).
5.	Performance Optimization: 
	Optimize images (compression, appropriate formats).
	Review Next.js build for any obvious performance bottlenecks (though Next.js handles much of this well).
6.	Final Accessibility Review (WCAG 2.1 AA): 
	Final check against WCAG 2.1 AA guidelines.
7.	Deployment: 
	Configure custom domain if applicable.
	Ensure HTTPS is enforced.
	Final deployment to Vercel (or chosen platform).
	Smoke test the live application.
•	Key Focus: Quality, readiness for launch, findability.
•	Testing: Comprehensive end-to-end testing, SEO checks (e.g., using browser developer tools, Lighthouse), performance checks, final accessibility validation.
________________________________________
7. Quality Assurance & Testing Strategy 🧪
•	Unit Testing: Developers should write unit tests for critical components or utility functions where appropriate (especially for Next.js components or any complex logic).
•	Integration Testing: Test interactions between components (e.g., navigation and page content, form submission and serverless function).
•	Manual Testing: 
o	Functional Testing: Verify all features listed in the PRD.
o	UI/UX Testing: Check for visual consistency, adherence to Behance style, usability, and overall experience.
o	Responsiveness Testing: Across major breakpoints (mobile, tablet, desktop).
o	Cross-Browser Testing: Latest versions of Chrome, Firefox, Safari, Edge.
o	Accessibility Testing: Manual checks (keyboard navigation, focus states, alt text) and automated tools (e.g., Axe DevTools, Lighthouse).
•	User Acceptance Testing (UAT): Brantley Price to review and approve the application before final deployment, ideally at the end of each sprint for key deliverables and definitely before final launch.
________________________________________
8. Deployment Plan ☁️
1.	Pre-Deployment: 
o	Final code freeze.
o	All tests passed (Unit, Integration, QA).
o	UAT sign-off from Brantley Price.
o	Environment variables configured for production (e.g., for contact form email recipient if using serverless functions).
2.	Deployment: 
o	Merge final code to the main/production branch on GitHub.
o	Trigger automatic deployment via Vercel (or chosen platform).
3.	Post-Deployment: 
o	Thorough smoke testing on the live environment.
o	Verify analytics integration if "Future Enhancements" like Google Analytics are pulled in early.
o	Monitor for any initial issues.
________________________________________
9. Assumptions & Dependencies
•	Assumptions: 
o	Brantley Price will provide all necessary content (text, images, capstone project details, PDF resume) in a timely manner aligned with the sprint goals.
o	Specific details for interactive data visualizations (data, chart types) will be provided by Brantley Price when needed.
o	The choice of Behance-inspired design elements is clear enough from the PRD to proceed without extensive separate design mockups. Minor clarifications can be handled during sprints.
o	Access to necessary accounts (GitHub, Vercel/Netlify) will be provided or set up by Brantley Price.
•	Dependencies: 
o	Timely feedback and approvals from Brantley Price at sprint reviews/UAT stages.
o	Availability of all content required for each sprint's tasks.
o	Chosen hosting provider (Vercel, Netlify, GitHub Pages) functioning as expected.
________________________________________
10. Success Metrics ✅
As per the PRD:
•	Functionality & Polish: Fully functional, responsive, and polished Capstone Portfolio web application.
•	Narrative Cohesion: Capstone and assignment work are presented as cohesive, engaging narratives.
•	Clarity of Presentation: Clear storytelling of methods, data, tools, and results related to the capstone and assignments.
•	Stakeholder Feedback: Positive feedback from advisors, peers, and potential employers.
•	Professional Integration: Portfolio successfully linked in LinkedIn profiles, resumes, and job applications by Brantley Price post-launch.
•	On-time Delivery: Completion of the project within the 4-week timeline.
•	Adherence to PRD: All "High" and "Medium" priority features implemented as specified.
________________________________________
11. Future Enhancements (Post-Launch) 💡
As noted in the PRD, these are out of scope for the initial 4-week development but can be planned for later:
•	Blog posts or reflections on cybersecurity trends.
•	GitHub integration for dynamic code snippets.
•	Video walkthroughs (e.g., YouTube embeds).
•	Search functionality (if portfolio grows significantly).
•	Analytics integration (Google Analytics, Plausible).

---
Coding standards, domain knowledge, and preferences that AI should follow.