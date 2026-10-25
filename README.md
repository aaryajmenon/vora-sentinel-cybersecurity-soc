# VORA Sentinel: Enterprise AI Phishing Interception & Multi-Node Endpoint Intrusion Detection System (IDS/SOC)
> **LEVEL 5 CYBERSECURITY CAPSTONE PROJECT — COMPLETE STACK LIVE PRODUCTION PLATFORM**

[![Level 5 Compliance](https://img.shields.io/badge/Level%205%20Project-100%25%20Compliant-success?style=for-the-badge)](https://voragenofficial.netlify.app)
[![Live URL](https://img.shields.io/badge/Live%20Platform-voragenofficial.netlify.app-blue?style=for-the-badge)](https://voragenofficial.netlify.app)
[![Live REST API](https://img.shields.io/badge/Cloud%20API-Active%20Serverless%20%2B%20Python-orange?style=for-the-badge)](https://voragenofficial.netlify.app/api/health)
[![Database](https://img.shields.io/badge/Database-SQLite%20%2F%20PostgreSQL-green?style=for-the-badge)](#database-architecture)
[![External Device](https://img.shields.io/badge/External%20Device-Mobile%20%2B%20CLI%20Agent-purple?style=for-the-badge)](#external-device-integration)

---

## 🌐 Live Production Links

* 🔗 **Live Hosted Platform:** [https://voragenofficial.netlify.app](https://voragenofficial.netlify.app)
* 🔌 **Live REST API Gateway:** [https://voragenofficial.netlify.app/api/health](https://voragenofficial.netlify.app/api/health)
* 📱 **External Mobile Node Client:** [https://voragenofficial.netlify.app/mobile-node.html](https://voragenofficial.netlify.app/mobile-node.html)
* 📊 **Security Operations Center (SOC) Live Dashboard:** [https://voragenofficial.netlify.app/#soc-dashboard](https://voragenofficial.netlify.app/#soc-dashboard)

---

## 🏛️ System Architecture & Mandatory Level 5 Flow

```
                      ┌──────────────────────────────────────────────┐
                      │    EXTERNAL DEVICE / NETWORK LAYER           │
                      │  • Smartphone Client (/mobile-node.html)     │
                      │  • Python Sentinel Agent (Linux VM / PC)     │
                      └──────────────────────┬───────────────────────┘
                                             │
                                             ▼ (Internet / TLS 1.3)
                      ┌──────────────────────────────────────────────┐
                      │             LIVE FRONTEND PORTAL             │
                      │       https://voragenofficial.netlify.app    │
                      │   • Candidate Verification Engine            │
                      │   • Real-Time Threat Monitoring SOC          │
                      └──────────────────────┬───────────────────────┘
                                             │
                                             ▼ (REST API / CORS)
                      ┌──────────────────────────────────────────────┐
                      │              BACKEND REST API                │
                      │   • Netlify Cloud Serverless Backend         │
                      │   • Python 3.13 Flask REST Engine            │
                      ├──────────────────────────────────────────────┤
                      │   * Damerau-Levenshtein Typosquatting Check  │
                      │   * Shannon Entropy Algorithmic Profiling    │
                      │   * Advance-Fee Extortion NLP Regex Scanner  │
                      │   * Dynamic Rate-Limiter & IP Shield         │
                      └──────────────────────┬───────────────────────┘
                                             │
                                             ▼ (SQL Prepared Queries)
                      ┌──────────────────────────────────────────────┐
                      │           PERSISTENT DATABASE                │
                      │   • backend/vora_sentinel.db (SQLite)        │
                      │   • Cloud PostgreSQL / Atlas Compatible      │
                      │   • Tables: threat_events, external_devices, │
                      │     enterprises, security_incidents, logs    │
                      └──────────────────────────────────────────────┘
```

**MANDATORY DEMONSTRATION FLOW:**
$$\text{User/Device} \xrightarrow{\text{Internet/Wi-Fi}} \text{Live App} \xrightarrow{\text{REST API}} \text{Database} \xrightarrow{\text{Security Engine}} \text{Alert on SOC Dashboard}$$

---

## 📁 Repository Structure

```
├── .gitignore                     # Git ignore rules (ignoring temp files, caches)
├── index.html                     # Main portal with integrated SOC Dashboard & Navigation
├── mobile-node.html               # External mobile probe client for smartphone review
├── netlify.toml                   # Netlify configuration with serverless routing
├── _redirects                     # Cloud rewrite rules
├── serve.ps1                      # PowerShell local HTTP server launcher
├── start-server.bat               # Windows batch launcher
├── start-backend.bat              # One-click launcher for Python Flask REST API
├── start-backend.ps1              # PowerShell launcher for Python Flask REST API
│
├── agent/                         # EXTERNAL DEVICE AGENTS
│   ├── sentinel_agent.py          # Standalone Python CLI Agent for secondary PC / Linux VM
│   └── sentinel_agent.js          # Standalone Node.js Agent
│
├── backend/                       # REST BACKEND & DATABASE
│   ├── app.py                     # Python Flask REST API with Cybersecurity IDS engine
│   ├── database.py                # Database Access Layer (DAL) & query repositories
│   ├── schema.sql                 # SQL DDL for SQLite / MySQL / PostgreSQL
│   ├── vora_sentinel.db           # Persistent SQLite database file
│   ├── requirements.txt           # Python backend dependencies
│   ├── Procfile                   # Cloud process file for Render / Railway / Heroku
│   └── render.yaml                # Render cloud deployment blueprint
│
├── css/                           # STYLESHEETS
│   └── styles.css                 # Obsidian glassmorphic design system & SOC styles
│
├── js/                            # CLIENT-SIDE SCRIPTS
│   ├── app.js                     # Core application routing & verification logic
│   ├── sentinel.js                # SOC Dashboard telemetry engine & live API poller
│   ├── auth.js                    # Session state & adult eligibility management
│   ├── data.js                    # Verified enterprise directories & alert benchmarks
│   └── executive-registry.js      # Executive leadership signatures whitelist
│
└── docs/                          # FINAL SUBMISSION DELIVERABLES (LEVEL 5)
    ├── API_DOCUMENTATION.md       # Complete OpenAPI REST endpoint specification
    ├── PROJECT_REPORT.md          # 15-page academic project report
    ├── PRESENTATION_SLIDES_PPT.md # 10 presentation slides with speaker notes
    └── SCREENSHOTS_AND_EVIDENCE_GUIDE.md # Step-by-step evaluation guide & curl tests
```

---

## 🚀 Quickstart & Local Evaluation (VS Code)

### 1. Run the Python Backend REST API
Open a terminal in the root directory:
```bash
# Windows Batch
start-backend.bat

# Or directly with Python
cd backend
pip install -r requirements.txt
python app.py
```
* Backend endpoint: `http://localhost:5000/`
* Health check: `http://localhost:5000/api/health`

### 2. Run the External Device Agent
Open a separate terminal (or run on another laptop / Linux VM):
```bash
python agent/sentinel_agent.py http://localhost:5000/api
```
*(Or target the live cloud API directly: `python agent/sentinel_agent.py https://voragenofficial.netlify.app/api`)*

### 3. Open the Frontend
Run `serve.ps1` or open `index.html` in your web browser.  
Click **"SOC Dashboard"** in the navigation menu to view real-time telemetry streaming!

---

## 📱 Mobile External Device Demonstration (Tutor Review)

1. Open your smartphone's web browser (Chrome / Safari).
2. Visit: **`https://voragenofficial.netlify.app/mobile-node.html`**
3. Tap: **`2. Inject Phishing Attack (g00gle.xyz)`**
4. Watch the primary computer monitor on `https://voragenofficial.netlify.app/#soc-dashboard`:
   * Notice your mobile phone node appears under **"Connected Device Nodes"**!
   * Notice the threat event is logged and visually raised on the threat feed!

---

## 🛡️ Core Cybersecurity Algorithms

1. **Damerau-Levenshtein Edit Distance:** Flags lookalike domains with single-character transpositions or substitutions against whitelisted enterprise domains ($\le 2$ edit difference).
2. **Shannon Entropy Profiling:** Flags randomized, algorithm-generated domains ($H(X) > 3.8$).
3. **RFC 3490 Punycode & IDN Homograph Defense:** Intercepts Cyrillic and Greek unicode substitutions (e.g. `micrоsoft.com`).
4. **Advance-Fee Extortion NLP Regex Tokenizer:** Intercepts fraudulent offer letters demanding upfront security deposits, laptop fees, or personal UPI transactions.
5. **Velocity Rate-Limiter:** Dynamically monitors IP authentication frequency; enforces automated lockdown after 5 rapid failed attempts.

---

## 📦 Level 5 Submission Deliverables Index

* 📄 **Project Report:** See [`docs/PROJECT_REPORT.md`](docs/PROJECT_REPORT.md)
* 🎞️ **Presentation Slides (PPT 10 Slides):** See [`docs/PRESENTATION_SLIDES_PPT.md`](docs/PRESENTATION_SLIDES_PPT.md)
* 🔌 **API Documentation:** See [`docs/API_DOCUMENTATION.md`](docs/API_DOCUMENTATION.md)
* 📸 **Screenshots & Evidence Guide:** See [`docs/SCREENSHOTS_AND_EVIDENCE_GUIDE.md`](docs/SCREENSHOTS_AND_EVIDENCE_GUIDE.md)
* 🗄️ **Database Schema:** See [`backend/schema.sql`](backend/schema.sql)

---

## 👨‍💻 Git Repository Setup & Push to GitHub

To share this repository with your tutor, follow these commands in your VS Code terminal:

```bash
# 1. Initialize git
git init

# 2. Add all project files
git add .

# 3. Create initial commit
git commit -m "feat: complete Level 5 Cybersecurity Project - VORA Sentinel IDS/SOC"

# 4. Link to your GitHub repository (replace with your repo URL)
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/vora-sentinel-soc.git

# 5. Push to GitHub
git push -u origin main
```
Share the resulting GitHub repository link with your tutor along with `https://voragenofficial.netlify.app`.
