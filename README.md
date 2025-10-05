# 🔐 AI Password Analyzer  
**Advanced AI-powered Password Strength & Breach Detection Tool**

![Preview](https://github.com/Anonymus-Coder2403/AI-Password-Analyzer/assets/preview-banner.png)  
*(Example preview — replace with your own screenshot or deployed link)*

---

## 🚀 Overview
**AI Password Analyzer** is an intelligent web application that analyzes your password strength in real time.  
It uses **entropy-based algorithms**, **pattern recognition**, and **optional breach detection** (via k-anonymity API) — ensuring that your passwords are not only complex but **truly secure**.

The tool runs **entirely client-side**, guaranteeing **100 % privacy** — no password ever leaves your device.

🔗 **Live Demo:** [ai-password-strength-analyzer.lovable.app](https://ai-password-strength-analyzer.lovable.app)

---

## 🧠 Key Features

| Feature | Description |
|----------|--------------|
| 🧮 **Entropy-Based Strength Analysis** | Calculates password entropy in real time based on character diversity & length. |
| ⚙️ **Realistic Strength Scoring** | Factors in dictionary names, patterns, and reused structures. |
| 🔍 **Data Breach Detection** | Uses privacy-safe k-anonymity API to check if a password has appeared in known breaches. |
| 🧩 **Instant Feedback** | Shows unmet requirements (uppercase, numbers, symbols, etc.) as you type. |
| 🛡️ **Local-Only Processing** | No password is sent to any server — full offline analysis. |
| 🎨 **Modern UI** | Built with **Next.js + TailwindCSS** using a dark, elegant interface inspired by Stellar (Cruip). |
| 📊 **Actionable Recommendations** | Provides improvement tips and visual strength indicators. |

---

## 🖼️ Screenshots

| Analyzer Dashboard | Breach Detection |
|--------------------|-----------------|
| ![Dashboard](./public/screenshot-dashboard.png) | ![Breach](./public/screenshot-breach.png) |

---

## ⚙️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | Next.js (TypeScript), React, TailwindCSS |
| **UI Components** | ShadCN UI, Lucide Icons |
| **AI Logic** | Custom entropy & heuristic analyzer in `/lib/strength.ts` |
| **Breach API** | k-Anonymity via HaveIBeenPwned API (hashed prefix only) |
| **Deployment** | Lovable / Vercel |

---

## 📂 Project Structure
AI-Password-Analyzer/
├── public/
│ ├── favicon.ico
│ └── screenshots/
├── src/
│ ├── components/
│ │ └── PasswordAnalyzer.tsx
│ ├── lib/
│ │ ├── strength.ts
│ │ └── breach-check.ts
│ ├── config/
│ │ └── site.config.ts
│ └── pages/
│ └── index.tsx
└── package.json

