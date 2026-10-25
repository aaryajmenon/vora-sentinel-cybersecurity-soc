# LEVEL 5 CYBERSECURITY PROJECT REPORT
## VORA SENTINEL: Autonomous Phishing Interception, Recruitment Fraud Threat Intelligence & Multi-Node Endpoint Intrusion Detection System (IDS/SOC)

**Course:** Level 5 Cybersecurity Full Stack Engineering  
**Academic Semester:** Final Semester Capstone Project  
**Live Deployed Platform URL:** [https://voragenofficial.netlify.app](https://voragenofficial.netlify.app)  
**Live REST API Gateway:** [https://voragenofficial.netlify.app/api](https://voragenofficial.netlify.app/api)  
**External Mobile Node Probe:** [https://voragenofficial.netlify.app/mobile-node.html](https://voragenofficial.netlify.app/mobile-node.html)  
**Local Gateway (VS Code):** `http://localhost:5000/api`  
**Classification:** Academic Open Research & Engineering Defense  

---

## 1. Executive Summary & Abstract

Online recruitment fraud and corporate identity impersonation represent one of the fastest-growing attack vectors in modern social engineering. According to threat intelligence reports from the Federal Bureau of Investigation (FBI IC3) and INTERPOL, deceptive hiring syndicates inflict billions in global financial damages, harvesting sensitive candidate PII (Personally Identifiable Information) and executing advance-fee extortion scams using typosquatted domains and forged enterprise appointment letters.

**VORA Sentinel** is a complete-stack, cloud-deployed cybersecurity defense and threat monitoring platform. It establishes an active verification layer that cross-references submitted domains, communication vectors, and job appointment letters against cryptographically authentic enterprise benchmarks. The architecture features:
1. **Multi-tier Full Stack Implementation:** Responsive Frontend, RESTful Backend (Python Flask + Netlify Serverless Cloud API), and Persistent Relational/Cloud Database.
2. **Real-Time Cybersecurity Detection Engines:** Damerau-Levenshtein distance calculation, Shannon Entropy profiling, RFC 3490 Punycode homograph decoding, and heuristic advance-fee extortion extraction.
3. **Mandatory External Device Integration:** Direct network integration between the live cloud system and external devices (smartphones via responsive telemetry client and remote PCs/Linux VMs via Python Sentinel Agent).
4. **Live SOC Dashboard:** Real-time threat feed, connected device telemetry, incident mitigation ticketing, and on-demand attack simulation.

---

## 2. Compliance Matrix: Level 5 Mandatory Requirements

| Requirement | Level 5 Specification | VORA Sentinel Implementation | Status |
|:---|:---|:---|:---|
| **1. Complete Stack** | Frontend, Backend, Database, Security Functionality, API | • **Frontend:** Modern HTML5/CSS3/ES6 responsive portal.<br>• **Backend:** Python Flask REST API + Netlify Cloud Serverless.<br>• **Database:** SQLite relational engine (`vora_sentinel.db`) + Cloud Atlas sync.<br>• **Security:** 5-layer IDS engine (Levenshtein, Entropy, Rate Limiter).<br>• **API:** 10+ documented REST endpoints. | **100% COMPLIANT** |
| **2. Live Hosting** | Mandatory public deployment (No localhost only) | Hosted live at `https://voragenofficial.netlify.app` with live backend endpoints at `https://voragenofficial.netlify.app/api/*`. Accessible from any device worldwide. | **100% COMPLIANT** |
| **3. External Device Integration** | External PC, Mobile Phone, VM, or Raspberry Pi communicating over network | • **Mobile Node Probe:** Accessible at `/mobile-node.html` on any smartphone.<br>• **CLI Sentinel Agent:** Standalone Python/Node script running on external laptops or Linux VMs transmitting telemetry heartbeats over Internet. | **100% COMPLIANT** |
| **4. Cybersecurity Problem** | Must solve actual cybersecurity threat | Intercepts Lookalike Domains (Typosquatting), IDN Homograph attacks, Advance-Fee Fraud (419 extortion), and Credential Brute-Force velocity attacks. | **100% COMPLIANT** |
| **5. Live Demonstration Flow** | Device ➔ Internet ➔ Live App ➔ API ➔ DB ➔ Security Detection ➔ Alert | Demonstrated live: Mobile Phone or external PC launches attack probe ➔ hits Cloud API ➔ writes to Database ➔ triggers instant visual alert on primary SOC Dashboard. | **100% COMPLIANT** |

---

## 3. Threat Modeling: STRIDE Framework

The VORA Sentinel threat model evaluates adversarial risks against recruitment systems using the Microsoft STRIDE methodology:

| Threat Category | Adversarial Vector | VORA Sentinel Mitigation Layer |
|:---|:---|:---|
| **Spoofing** | Adversary registers `micr0soft-jobs.top` to impersonate Microsoft HR. | **Damerau-Levenshtein Engine + Punycode Homograph Filter:** Flags character edit distance $\le 2$ against authorized enterprise whitelist. |
| **Tampering** | Recruiter modifies valid PDF letter to inject personal UPI payment ID. | **Offer Forensics NLP Engine:** Regex tokenization identifies advance-fee demands (e.g., "refundable deposit", "laptop fee"). |
| **Repudiation** | Malicious actor denies transmitting brute-force probes. | **Immutable Audit Ledger:** Logs source IP, timestamp, user agent, and payload checksum into SQLite `threat_events` table. |
| **Information Disclosure** | Candidate PII intercepted during verification. | **TLS 1.3 Transport Encryption + Zero PII Persistence:** Analyzes document text in memory; only security threat metadata is retained. |
| **Denial of Service** | Botnet floods verification API with rapid queries. | **Dynamic Velocity Rate Limiter:** Enforces IP request ceiling; flags and lockouts IP after 5 failed authentication probes. |
| **Elevation of Privilege** | Unauthenticated user attempts SOC incident closure. | **Role-Based Access Control (RBAC):** Restricts incident mitigation endpoints to verified analyst session tokens. |

---

## 4. System Architecture & End-to-End Topology

```
                  ┌──────────────────────────────────────────────┐
                  │          EXTERNAL DEVICE NODES LAYER         │
                  │  (Smartphones, Linux VMs, Laptops, IoT)      │
                  └──────────────────────┬───────────────────────┘
                                         │
                                         ▼ (Public Internet / HTTPS)
                  ┌──────────────────────────────────────────────┐
                  │            LIVE FRONTEND APPLICATION         │
                  │       (https://voragenofficial.netlify.app)  │
                  │   • Verification UI  • Jobs  • Profile       │
                  │   • Real-Time Security Operations Center     │
                  └──────────────────────┬───────────────────────┘
                                         │
                                         ▼ (REST / JSON / CORS)
                  ┌──────────────────────────────────────────────┐
                  │            BACKEND API GATEWAY               │
                  │  (Netlify Serverless / Python Flask Server)  │
                  ├──────────────────────────────────────────────┤
                  │  1. IP Rate Limiter & Velocity Shield        │
                  │  2. Domain Typosquatting Analyzer            │
                  │  3. Offer Document Forensic Scanner          │
                  │  4. External Device Telemetry Broker         │
                  │  5. Incident Escalation Dispatcher           │
                  └──────────────────────┬───────────────────────┘
                                         │
                                         ▼ (SQL / Prepared Statements)
                  ┌──────────────────────────────────────────────┐
                  │               DATABASE LAYER                 │
                  │      (SQLite / PostgreSQL / Cloud DB)        │
                  │   • enterprises       • threat_events        │
                  │   • external_devices  • security_incidents   │
                  │   • ip_security_ledger • audit_logs          │
                  └──────────────────────────────────────────────┘
```

---

## 5. Algorithmic Breakdown: Detection Engines

### 5.1 Damerau-Levenshtein Distance Metric
To detect lookalike domains (e.g., `g00gle.com` vs `google.com`), VORA Sentinel calculates the minimum number of single-character edits (insertions, deletions, substitutions, or transpositions) between candidate string $a$ and authorized enterprise string $b$:

$$d_{a,b}(i,j) = \min \begin{cases}
d_{a,b}(i-1,j) + 1 \\
d_{a,b}(i,j-1) + 1 \\
d_{a,b}(i-1,j-1) + 1_{(a_i \neq b_j)} \\
d_{a,b}(i-2,j-2) + 1 \quad \text{if } a_i = b_{j-1} \text{ and } a_{i-1} = b_j
\end{cases}$$

If $d_{a,b} \in \{1, 2\}$, the domain is classified as **CRITICAL TYPOSQUATTING** with an automatic penalty score of +50.

### 5.2 Shannon Entropy for DGA (Domain Generation Algorithm) Detection
Adversaries frequently utilize automated domain generation algorithms (DGAs) producing high-randomness domain strings. VORA computes the Shannon entropy $H(X)$:

$$H(X) = -\sum_{i=1}^{n} P(x_i) \log_2 P(x_i)$$

Where $P(x_i)$ is the probability of occurrence of character $x_i$. Domains with $H(X) > 3.8$ are flagged as suspicious algorithmically generated infrastructure.

### 5.3 RFC 3490 Punycode & IDN Homograph Decoding
Adversaries exploit internationalized domain names (IDN) by replacing Latin characters with visually indistinguishable Cyrillic or Greek glyphs (e.g., Latin 'o' `U+006F` substituted with Cyrillic 'о' `U+043E`). VORA inspects the domain for `xn--` Punycode prefixes and non-ASCII codepoints, instantly flagging them as **HIGH-SEVERITY HOMOGRAPH ATTACKS**.

### 5.4 Advance-Fee Fraud & Extortion Extraction
Using natural language tokenization and compiled regular expressions, the engine scans offer documents for advance-fee extortion indicators:
* Refundable security deposit demands
* Laptop, courier, or training charges
* Requests for personal UPI, cryptocurrency, or wire transfers
* Free webmail services (`@gmail.com`, `@yahoo.com`) used for corporate HR correspondence
* Unsecured communication channels (Telegram, WhatsApp) for formal recruitment

---

## 6. Database Design & Relational Schema

The database persists telemetry, attack logs, and authorized enterprise benchmarks across six structured tables:

### 6.1 Data Dictionaries

#### Table: `threat_events`
| Column | Type | Constraints | Description |
|:---|:---|:---|:---|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique sequence identifier |
| `event_id` | VARCHAR(64) | UNIQUE NOT NULL | Global threat reference (e.g. `EVT-9041`) |
| `threat_type` | VARCHAR(80) | NOT NULL | Category (Typosquatting, Fee Extortion, Brute Force) |
| `severity` | VARCHAR(20) | NOT NULL | CRITICAL, HIGH, MEDIUM, LOW |
| `source_ip` | VARCHAR(64) | NOT NULL | Originating client IP address |
| `target_entity` | VARCHAR(120)| NOT NULL | Impersonated domain or uploaded document name |
| `threat_score` | INTEGER | NOT NULL | Computed risk score (0 to 100) |
| `details` | TEXT | NOT NULL | Detailed heuristic reasons and forensic proof |
| `device_id` | VARCHAR(64) | DEFAULT 'PRIMARY' | Ingesting device node identifier |
| `status` | VARCHAR(40) | DEFAULT 'INTERCEPTED'| INTERCEPTED, FLAGGED, MITIGATED |
| `timestamp` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | UTC event registration timestamp |

#### Table: `external_devices`
| Column | Type | Constraints | Description |
|:---|:---|:---|:---|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique identifier |
| `device_id` | VARCHAR(64) | UNIQUE NOT NULL | Node ID (e.g. `NODE-MOBILE-A84F`) |
| `device_name` | VARCHAR(120)| NOT NULL | Operating system and hostname |
| `device_type` | VARCHAR(60) | NOT NULL | Mobile, Linux-VM, Windows-PC, Raspberry-Pi |
| `ip_address` | VARCHAR(64) | NOT NULL | Current public/local IP |
| `telemetry_status` | VARCHAR(40) | DEFAULT 'ACTIVE' | ACTIVE, IDLE, OFFLINE |
| `packets_transmitted` | INTEGER | DEFAULT 0 | Count of telemetry packets streamed |
| `threats_reported` | INTEGER | DEFAULT 0 | Count of threat events originated |
| `last_heartbeat` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last signal receipt time |

---

## 7. External Device / Network Integration Walkthrough

The external device integration satisfies the compulsory Level 5 evaluation criterion:

### 7.1 Demonstration Pipeline
$$\text{External Device} \xrightarrow{\text{Wi-Fi / 5G}} \text{Live Netlify App} \xrightarrow{\text{REST API}} \text{Database} \xrightarrow{\text{Detection Engine}} \text{Live SOC Alert}$$

### 7.2 Integration Execution Options

#### Option A: Mobile Phone Remote Probe Client
1. The tutor or student opens `https://voragenofficial.netlify.app/mobile-node.html` on their smartphone (or scans the QR code from the SOC Dashboard).
2. The smartphone registers as `NODE-MOBILE-XXXX` and establishes a telemetry heartbeat with the live backend.
3. Tapping **"Inject Phishing Attack"** sends an HTTP POST packet over cellular network/Wi-Fi to `/api/sentinel/simulate`.
4. The cloud backend parses the attack, writes `EVT-XXXX` to the database, and the Live Threat Stream on the main computer updates in real time.

#### Option B: Standalone Python Sentinel Agent
1. From an external laptop or Linux virtual machine, execute:
   ```bash
   python agent/sentinel_agent.py https://voragenofficial.netlify.app/api
   ```
2. The agent queries host parameters (`socket.gethostname()`, `platform.system()`), registers with the backend, and presents an interactive CLI menu to stream telemetry packets or trigger simulated intrusions.

---

## 8. Empirical Security Evaluation & Test Results

| Test ID | Input Test Vector | Expected Output | Actual Result | Status |
|:---|:---|:---|:---|:---|
| `TC-SEC-01` | Domain: `g00gle-careers.top` | Flagged as typosquatting matching Google; score $\ge 80$; severity CRITICAL | Score 95/100; Levenshtein penalty applied; TLD `.top` flagged; `EVT-84723E78` logged | **PASS** |
| `TC-SEC-02` | Domain: `microsoft.com` | Verified enterprise; score 0; severity LOW | 100% Verified Match; Score 0/100; TIER-1 Enterprise cleared | **PASS** |
| `TC-SEC-03` | Offer Text: Demands ₹15,000 security deposit via UPI | Advance-fee extortion detected; severity CRITICAL | Flagged "EXTORTION DETECTED: Advance fee demand identified"; `EVT-14153C85` logged | **PASS** |
| `TC-SEC-04` | 6 rapid authentication attempts from single IP | IP velocity rate-limiter triggers; IP blacklisted | `is_blocked = 1` committed to database; status `MITIGATED` | **PASS** |
| `TC-SEC-05` | Telemetry probe from `NODE-MOBILE-01` | Packet ACK; device listed in `external_devices` table | `status: TELEMETRY_ACKNOWLEDGED`; active device table refreshed | **PASS** |

---

## 9. Conclusion & Defense Summary

VORA Sentinel delivers an enterprise-grade, end-to-end cybersecurity solution to combat cyber recruitment scams and identity impersonation. By uniting a modern web frontend, scalable Python/Serverless REST backend, persistent relational database, mathematical threat detection models, and multi-device telemetry synchronization, the project comprehensively fulfills and exceeds all Level 5 Capstone Project requirements.
