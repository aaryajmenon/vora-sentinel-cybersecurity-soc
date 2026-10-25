# VORA SENTINEL: SCREENSHOTS & EVALUATION EVIDENCE GUIDE
## Level 5 Cybersecurity Project — Submission Deliverable 10
**Live Deployed Platform:** `https://voragenofficial.netlify.app`  
**Live REST API Gateway:** `https://voragenofficial.netlify.app/api`  
**Mobile Node Probe:** `https://voragenofficial.netlify.app/mobile-node.html`  

---

## 1. Overview & Required Evidence Checklist

For your final Level 5 project submission, your tutor will review concrete visual and technical proof that your system is **live, accessible, multi-tiered, connected to an external device, and executing real cybersecurity detection**.

Use this document to capture the 10 mandatory screenshots and run verification commands:

| # | Evidence Title | System Component | What to Capture / Show |
|:---|:---|:---|:---|
| 📸 **1** | **Live Hosted URL & Platform Header** | Cloud Frontend | Browser address bar showing `https://voragenofficial.netlify.app` with `SOC: ARMED` green pulse badge. |
| 📸 **2** | **SOC Real-Time Threat Stream** | Cloud Dashboard | `#soc-dashboard-section` displaying intercepted threat events, severity pills (CRITICAL, HIGH), and threat scores. |
| 📸 **3** | **Interactive Attack Simulation** | Threat Lab | Output inside the Simulation Console after clicking `"1. Inject Lookalike Domain (g00gle.xyz)"`. |
| 📸 **4** | **Domain Typosquatting Verification** | Cyber Detection Engine | Company verification card flagging `g00gle-careers.top` with Levenshtein anomaly and suspicious `.top` TLD. |
| 📸 **5** | **Offer Letter Advance-Fee Forensics** | Cyber Detection Engine | Analysis box intercepting fake appointment letter with `"EXTORTION DETECTED: Advance fee demand identified"`. |
| 📸 **6** | **Connected External Device Nodes** | Multi-Node System | External devices table showing `Auditor ThinkPad`, `Field Officer Pixel 8 Pro`, and `NODE-MOBILE-XX`. |
| 📸 **7** | **External Smartphone Probe Client** | External Device Demo | Smartphone screen displaying `https://voragenofficial.netlify.app/mobile-node.html` with telemetry ping. |
| 📸 **8** | **Python Sentinel Agent Terminal** | External Device Demo | Secondary laptop / VM terminal running `python agent/sentinel_agent.py` showing device registration. |
| 📸 **9** | **Live REST API Health & Telemetry** | Backend REST API | Browser or Postman tab showing JSON response from `https://voragenofficial.netlify.app/api/health`. |
| 📸 **10** | **Database Records & SQL Persistence** | Database Layer | SQLite query or database dump showing persisted rows in `threat_events` and `external_devices`. |

---

## 2. Step-by-Step Evidence Reproduction Guide

### Evidence 1: Live Deployed Platform & Header Badge
1. Open Google Chrome, Edge, or Safari.
2. Navigate to: `https://voragenofficial.netlify.app`
3. Notice the top navigation bar containing:
   - Navigation links: `Home`, `SOC Dashboard`, `Device Node`, `Verification`, `Alerts`.
   - The green animated status pill: `SOC: ARMED (LIVE)`.
4. **Action:** Take a screenshot of the entire browser window showing the URL bar and homepage.

---

### Evidence 2: SOC Live Threat Feed
1. On `https://voragenofficial.netlify.app`, click **"SOC Dashboard"** in the top navigation.
2. The page smoothly scrolls to the Security Operations Center.
3. Observe the four metric cards:
   - Monitored Device Nodes (5 Active)
   - Intercepted Cyber Threats (18,450+)
   - Brute-Force & Lockouts (42 Blocked)
   - Cloud Ingestion Latency (< 120ms)
4. Observe the **Real-Time Cyber Threat Event Ingestion** table displaying live records (`EVT-9041`, `EVT-9042`, etc.) with color-coded severity badges.
5. **Action:** Capture a high-resolution screenshot of the threat feed table.

---

### Evidence 3: Live Attack Simulation Lab
1. In the SOC Dashboard, locate the **"Live Demonstration & Threat Simulation Laboratory"**.
2. Click the button: **`1. Inject Lookalike Domain (g00gle.xyz)`**.
3. In the dark cyber terminal below, observe the instant response:
   ```
   [TRANSMIT] Launching live simulation probe: 'typosquatting'...
   [ALERT ACK] Probe intercepted by backend! Details: {"simulation":"SUCCESS", ...}
   ```
4. Notice that a new CRITICAL threat event appears immediately at the top of the Threat Stream table.
5. **Action:** Capture a screenshot showing the simulation button, terminal log, and newly added row in the threat table.

---

### Evidence 4: Domain Typosquatting Verification
1. Click **"Verification"** in the top navigation bar.
2. In the search box, enter: `g00gle-careers.top` and click **"Audit Domain"**.
3. The VORA Neural Verification Engine scans the domain:
   - Damerau-Levenshtein calculation matches `google.com`.
   - Flags high-risk phishing TLD `.top`.
   - Displays risk score: **85+/100 (HIGH RISK / TYPOSQUATTING)**.
4. **Action:** Capture a screenshot of the generated verification dossier card.

---

### Evidence 5: Malicious Job Offer Forensics
1. In the **Verification** section, click the **"Paste Offer Text / Email"** tab.
2. Paste the following test extortion vector:
   ```text
   Subject: Official Appointment Letter - Tata Consultancy Services
   Dear Candidate, you have been selected for the position of Cloud Specialist.
   To dispatch your corporate laptop and access card, you must deposit a refundable
   security fee of Rs. 15,000 to our verification desk via UPI: tcs.hr@oksbi immediately.
   ```
3. Click **"Run Deep Anti-Fraud Analysis"**.
4. The system flags:
   - `EXTORTION DETECTED: Advance fee demand identified in document`
   - `UNAUTHORIZED PAYMENT: Personal UPI gateway specified`
   - Genuinity Score: **0% (SCAM INTERCEPTED)**.
5. **Action:** Take a screenshot of the red alert result card.

---

### Evidence 6 & 7: External Mobile Phone Demonstration
1. Open the camera or browser on your mobile phone (iPhone or Android).
2. Navigate to: `https://voragenofficial.netlify.app/mobile-node.html`
3. The mobile screen will display:
   - **VORA Mobile Sentinel Node**
   - Device Identifier: `NODE-MOBILE-XXXX`
   - Target Cloud Host: `voragenofficial.netlify.app`
   - Status: `LIVE` with pulsing green dot.
4. Tap **"1. Transmit Device Heartbeat Telemetry"**.
   - Terminal shows: `[ACK Received! Status: TELEMETRY_ACKNOWLEDGED]`.
5. Tap **"2. Inject Phishing Attack (g00gle.xyz)"**.
   - Terminal shows: `[PROBE CONFIRMED! Threat logged to DB]`.
6. Look back at the computer screen on `https://voragenofficial.netlify.app/#soc-dashboard`:
   - Notice that your mobile phone appears under **"Connected Device Nodes"**!
   - Notice that the threat injected from the mobile phone is now visible in the live table!
7. **Action:** Take a photo/screenshot of your mobile phone displaying the interface and another of the computer dashboard showing the synchronized alert.

---

### Evidence 8: Python Sentinel Agent CLI (Secondary PC / VM)
1. On an external PC, laptop, or virtual machine, open a command prompt or terminal.
2. Run:
   ```bash
   python agent/sentinel_agent.py https://voragenofficial.netlify.app/api
   ```
3. The terminal displays:
   ```
   =================================================================
     VORA SENTINEL: EXTERNAL DEVICE SECURITY AGENT (LEVEL 5 DEMO)  
   =================================================================
     Device ID:    NODE-WINDOWS-LAPTOP-K-5F4B
     Device Name:  LAPTOP-KAO2469Q (Windows 11)
     Device Type:  Windows-PC
     Target API:   https://voragenofficial.netlify.app/api
   =================================================================
   [*] Registering external device node with Live SOC...
   [+] Device Registered Successfully! Registered IP: 172.56.21.88
   ```
4. Press `2` to launch typosquatting simulation.
5. **Action:** Take a screenshot of this terminal window.

---

### Evidence 9: Live REST API Verification
1. Open a terminal or browser tab.
2. Run:
   ```bash
   curl -X GET https://voragenofficial.netlify.app/api/health
   ```
3. Observe the JSON response proving that:
   - `status: UP`
   - `environment: NETLIFY_SERVERLESS_PRODUCTION` (or `LIVE_PRODUCTION`)
   - `database: CONNECTED_SQLITE_PERSISTENT`
   - `intrusion_detection_system: ACTIVE`
4. **Action:** Capture a screenshot of the clean JSON response.

---

### Evidence 10: Persistent SQLite Database Evidence
1. In VS Code or terminal in `backend/`:
   ```bash
   python -c "from database import get_recent_threats, get_device_nodes; print('Threats Count:', len(get_recent_threats())); print('Devices Count:', len(get_device_nodes()))"
   ```
2. Or inspect `backend/vora_sentinel.db` with SQLite Viewer extension in VS Code.
3. Observe the populated rows in `threat_events`, `enterprises`, and `external_devices`.
4. **Action:** Capture a screenshot of the SQLite table rows or terminal output.

---

## 3. Tutor Oral Defense Walkthrough Script

When presenting to your tutor, follow this confident 60-second walkthrough:
1. *"Tutor, here is our live hosted platform at `https://voragenofficial.netlify.app`. Notice it is fully deployed on the cloud—not running on localhost."*
2. *"Notice the top header badge: our backend REST API and SOC engine are live and armed."*
3. *"Let me navigate to the SOC Dashboard: here we see our real-time threat feed, active device telemetry, and live metrics."*
4. *"Now let me demonstrate our external device integration: I will take my smartphone, open `https://voragenofficial.netlify.app/mobile-node.html`, and tap 'Inject Phishing Attack'."*
5. *"Watch the screen: the mobile device transmitted the packet over cellular internet to our cloud API, the backend checked the domain with our Levenshtein algorithm, wrote it to the database, and instantly raised this CRITICAL alert on our dashboard."*
6. *"This completes the required Level 5 cycle: User/Device ➔ Internet ➔ Live App ➔ API ➔ Database ➔ Security Detection ➔ Alert."*
