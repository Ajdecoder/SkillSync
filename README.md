# ⚡ SkillSync — AI-Powered Talent & Opportunity Matching Platform

SkillSync is a **full-stack AI-driven recruitment platform** that intelligently connects **candidates** and **employers/startups**.  
It uses **LangChain, Node.js, React, and MongoDB** to provide real-time matching, skill extraction, and a conversational chatbot assistant.

---

## 🚀 Features

### 👤 Role-Based System
- Separate roles for **Candidates** and **Recruiters**
- Secure login with **JWT Authentication**
- Role-based access control for all features

### 💼 Job & Candidate Management
- Employers can **create, update, and delete** job postings
- Candidates can explore jobs that match their **skills and interests**
- Real-time filtering and smart recommendations

### 🤖 AI-Powered Chatbot
- Built with **LangChain** + **Google Gemini API**
- Understands user intent and classifies it as:
  - `find_jobs` → when candidate looks for jobs  
  - `find_candidates` → when recruiter wants to hire  
  - `unauthorized` → when user tries action outside their role  
  - `general` → for casual or unrelated queries
- Auto skill extraction from user messages
- Conversational tone with emojis and dynamic responses

### 🧠 Intelligent Skill Extraction
- Extracts **skills from messages and resumes** using NLP
- Auto-tags both users and opportunities
- Improves matching accuracy for recommendations

### ✉️ Notifications & Email System
- In-app real-time notifications with smooth animations
- Deletable notifications
- Planned **email alerts** for candidates and recruiters (via Nodemailer / SendGrid)

### 💬 Interactive Chat UI
- Built using **React + Vite + Tailwind CSS**
- Beautiful animated interface with **Framer Motion**
- Handles message history, typing states, and server errors gracefully

### 📄 Resume & Profile System
- Candidate profiles include resumes, extracted skills, and portfolio links
- Validation checks for uploaded files
- Cloud storage integration with **Cloudinary**

### 📊 Admin / Dashboard Features
- Dynamic tables with:
  - Select-All + Multi Delete
  - Drag-and-drop row reordering
  - PDF download & WhatsApp share
  - AI-based translation for text fields

### ☁️ Cloud & Deployment Ready
- Backend: Node.js + Express + MongoDB  
- File Storage: AWS S3 / Cloudinary  
- Frontend: React + Vite + Tailwind  
- Deployment: **Vercel** (Frontend) + **Render/Railway** (Backend)

---

## 🧩 Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | React.js, Vite, Tailwind CSS, Redux, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **AI Layer** | LangChain, Google Generative AI (Gemini 2.0 Flash) |
| **Cloud / DevOps** | AWS (S3, IAM), Docker, Cloudinary |
| **Tools** | Postman, Git/GitHub, Nodemailer, Figma |

---

## 🧱 Folder Structure

