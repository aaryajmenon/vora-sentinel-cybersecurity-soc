# VORA Sentinel: Enterprise Threat Intelligence & IDS REST API Documentation
**Level 5 Cybersecurity Project — Unified RESTful API Specification**
**Platform URL:** `https://voragenofficial.netlify.app/api`  
**Local Gateway:** `http://localhost:5000/api`  
**Specification Standard:** OpenAPI 3.0 / REST  
**Security Protocols:** TLS 1.3, SHA-256 HMAC, Rate-Limiting IP Shield  

---

## 1. Overview & Architecture

The VORA Sentinel API provides high-throughput cybersecurity services designed to detect, intercept, and mitigate cyber recruitment scams, lookalike phishing domains, and advance-fee extortion letters. It acts as the central intelligence broker between:
1. **Frontend Web Clients** (`index.html`)
2. **External Remote Device Nodes** (Mobile Phones, Linux VMs, Laptops, Raspberry Pis)
3. **Relational / Cloud Databases** (SQLite, PostgreSQL, MongoDB)
4. **Threat Detection & Heuristic Engines** (Damerau-Levenshtein, Shannon Entropy, Punycode Decoders)

```
[External Devices / Browsers]
           │
           ▼ (HTTPS / TLS 1.3)
[VORA Sentinel REST API Gateway]
   ├── IP Velocity & Rate Limiter Shield
   ├── Domain Typosquatting Engine (Damerau-Levenshtein + Entropy)
   ├── Offer Forensics & Fee Extortion NLP Scanner
   └── Device Telemetry Broker
           │
           ▼ (SQL / ORM)
[Persistent Database (SQLite / Postgres / Atlas)]
```

---

## 2. Global Error & Status Codes

| HTTP Code | Name | Meaning |
|:---|:---|:---|
| `200 OK` | Success | Request succeeded; returns computed telemetry / analysis. |
| `400 Bad Request` | Missing Parameters | Body payload missing required fields (`domain`, `text`, etc.). |
| `403 Forbidden` | Access Denied | Unauthorized probe or invalid client credentials. |
| `429 Too Many Requests`| IP Lockout | Intrusion velocity exceeded threshold (5 failed attempts). |
| `500 Server Error` | Backend Fault | Unhandled exception inside detection subsystems. |

---

## 3. API Endpoints Catalog

### 3.1 System Health & Monitoring
* **Route:** `GET /api/health`
* **Purpose:** Heartbeat and infrastructure status verification.
* **Headers:** `Accept: application/json`
* **Response `200 OK`:**
```json
{
  "status": "UP",
  "environment": "LIVE_PRODUCTION",
  "server_time": "2026-10-25T08:47:02.325Z",
  "client_ip": "185.220.101.5",
  "metrics": {
    "total_threats_logged": 18450,
    "critical_threats": 42,
    "active_device_nodes": 6,
    "verified_enterprises": 11,
    "open_incidents": 2,
    "blocked_ips_bruteforce": 1,
    "system_status": "OPERATIONAL / LIVE_SENTINEL_ARMED"
  },
  "subsystems": {
    "database": "CONNECTED_SQLITE_PERSISTENT",
    "intrusion_detection_system": "ACTIVE",
    "shannon_entropy_engine": "ONLINE",
    "homograph_punycode_filter": "ACTIVE",
    "brute_force_shield": "ARMED"
  }
}
```

---

### 3.2 Domain Typosquatting & Phishing Interception
* **Route:** `POST /api/verify/company`
* **Purpose:** Inspects domain against enterprise directory using Levenshtein distance, Shannon entropy, homograph checks, and TLD reputation.
* **Request Body:**
```json
{
  "domain": "g00gle-careers.top",
  "device_id": "NODE-MOBILE-01"
}
```
* **Response `200 OK`:**
```json
{
  "event_id": "EVT-84723E78",
  "domain": "g00gle-careers.top",
  "verdict": "SUSPICIOUS_TYPOSQUATTING",
  "threat_score": 65,
  "severity": "HIGH",
  "entropy": 3.039,
  "reasons": [
    "Domain utilizes high-risk phishing TLD: '.top'",
    "Contains deceptive recruitment spoofing token: '-careers'"
  ],
  "details": "Domain utilizes high-risk phishing TLD: '.top' | Contains deceptive recruitment spoofing token: '-careers'",
  "timestamp": "2026-10-25T08:40:09.181Z"
}
```

---

### 3.3 Offer Letter Forensics & Extortion Extraction
* **Route:** `POST /api/verify/offer`
* **Purpose:** Parses offer letters or email text for advance fee fraud, free webmail impersonation, and rogue communication channels.
* **Request Body:**
```json
{
  "text": "Congratulations on selection at TCS! Deposit refundable security deposit of Rs 15,000 to UPI ID tcs.hr@oksbi to receive laptop.",
  "doc_name": "TCS_Appointment_Letter.pdf",
  "device_id": "WEB_CLIENT"
}
```
* **Response `200 OK`:**
```json
{
  "event_id": "EVT-14153C85",
  "doc_name": "TCS_Appointment_Letter.pdf",
  "verdict": "FRAUDULENT_OFFER_SCAM",
  "threat_score": 85,
  "severity": "CRITICAL",
  "indicators": [
    "EXTORTION DETECTED: Advance fee demand identified in document ('refundable security deposit')",
    "UNAUTHORIZED PAYMENT: Personal UPI gateway specified."
  ],
  "details": "EXTORTION DETECTED: Advance fee demand identified in document",
  "timestamp": "2026-10-25T08:40:09.185Z"
}
```

---

### 3.4 External Device Telemetry Streaming (Mandatory Level 5)
* **Route:** `POST /api/sentinel/telemetry`
* **Purpose:** Ingestion gateway for secondary laptops, smartphones, Raspberry Pis, and VMs.
* **Request Body:**
```json
{
  "device_id": "NODE-MOBILE-A84F",
  "device_name": "Field Officer Pixel 8 Pro",
  "device_type": "Mobile",
  "threat_detected": 1,
  "threat_details": {
    "type": "Network Wi-Fi Probe",
    "severity": "HIGH",
    "score": 85,
    "message": "Intercepted rogue DNS query redirecting candidate to fake portal."
  }
}
```
* **Response `200 OK`:**
```json
{
  "status": "TELEMETRY_ACKNOWLEDGED",
  "device_id": "NODE-MOBILE-A84F",
  "registered_ip": "172.56.21.88",
  "event_id": "EVT-A79B2210",
  "timestamp": "2026-10-25T08:47:13.778Z"
}
```

---

### 3.5 Live Attack Simulation (For Oral Defense)
* **Route:** `POST /api/sentinel/simulate`
* **Purpose:** Generates controlled security vectors to demonstrate live detection, database persistence, and dashboard alerting.
* **Supported Attack Types:**
  - `typosquatting`: Injects `g00gle.xyz` lookalike domain attack.
  - `brute_force`: Simulates 6 rapid failed authentications; triggers IP lockout.
  - `fee_extortion`: Submits advance-fee extortion document.
  - `mobile_probe`: Simulates mobile telemetry packet from remote network.
* **Request Body:**
```json
{
  "attack_type": "typosquatting",
  "device_id": "NODE-EXTERNAL-LAPTOP-TEST"
}
```
* **Response `200 OK`:**
```json
{
  "simulation": "Typosquatting Phishing Injected",
  "result": {
    "domain": "g00gle-careers-security.xyz",
    "threat_score": 95,
    "severity": "CRITICAL",
    "verdict": "MALICIOUS_PHISHING_DOMAIN"
  }
}
```

---

### 3.6 Real-Time Threat Feed
* **Route:** `GET /api/threats?limit=20`
* **Purpose:** Supplies live threat stream to the SOC dashboard.
* **Response `200 OK`:**
```json
{
  "count": 2,
  "threats": [
    {
      "event_id": "EVT-9041",
      "threat_type": "Typosquatting & Punycode Phishing",
      "severity": "CRITICAL",
      "source_ip": "185.220.101.5",
      "target_entity": "google.com -> g00gle-careers.top",
      "threat_score": 96,
      "details": "Detected high Levenshtein distance anomaly matching Google LLC.",
      "device_id": "NODE-GATEWAY-01",
      "status": "INTERCEPTED",
      "timestamp": "2026-10-25T08:35:00.000Z"
    }
  ]
}
```

---

### 3.7 Registered External Devices Table
* **Route:** `GET /api/devices`
* **Purpose:** Returns list of all active external probe nodes and their telemetry metrics.
* **Response `200 OK`:**
```json
{
  "count": 5,
  "devices": [
    {
      "device_id": "NODE-GATEWAY-01",
      "device_name": "Primary SOC Ingestion Gateway",
      "device_type": "Security-Agent",
      "ip_address": "192.168.1.100",
      "last_heartbeat": "2026-10-25 08:40:01",
      "packets_transmitted": 2480,
      "telemetry_status": "ACTIVE",
      "threats_reported": 14
    }
  ]
}
```

---

### 3.8 Security Incident Management
* **Route:** `GET /api/incidents`
* **Route:** `POST /api/incidents/action`
* **Request Body:**
```json
{
  "incident_ref": "INC-2026-081",
  "action": "MITIGATED",
  "notes": "Registrar abuse ticket filed; DNS sinkholed via Cloudflare."
}
```

---

### 3.9 Export Signed SOC Audit Dossier
* **Route:** `GET /api/export/audit-report`
* **Purpose:** Generates academic compliance audit report with SHA256 integrity fingerprint.

---

## 4. Testing Endpoints via cURL

```bash
# 1. Health Check
curl -X GET https://voragenofficial.netlify.app/api/health

# 2. Domain Typosquatting Verification
curl -X POST https://voragenofficial.netlify.app/api/verify/company \
  -H "Content-Type: application/json" \
  -d '{"domain":"g00gle-careers.top"}'

# 3. Offer Letter Extortion Forensic Check
curl -X POST https://voragenofficial.netlify.app/api/verify/offer \
  -H "Content-Type: application/json" \
  -d '{"text":"Please pay refundable fee of 5000 Rs to UPI hr@upi"}'

# 4. Ingest External Device Telemetry
curl -X POST https://voragenofficial.netlify.app/api/sentinel/telemetry \
  -H "Content-Type: application/json" \
  -d '{"device_id":"NODE-TEST-01","device_name":"Auditor Laptop","device_type":"Windows-PC"}'
```
