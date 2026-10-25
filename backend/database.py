"""
VORA Sentinel - Unified Database Layer
Level 5 Cybersecurity Project Data Access Layer
Supports SQLite (local file persistence) with seamless switch to MySQL/Postgres.
"""

import os
import sqlite3
import json
import datetime
from pathlib import Path

DB_FILE = Path(__file__).parent / "vora_sentinel.db"
SCHEMA_FILE = Path(__file__).parent / "schema.sql"

def get_db_connection():
    """Returns a thread-safe connection to the SQLite database with row_factory enabled."""
    conn = sqlite3.connect(str(DB_FILE), timeout=15)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initializes schema and runs default database seeding."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    with open(SCHEMA_FILE, "r", encoding="utf-8") as f:
        cursor.executescript(f.read())
        
    conn.commit()
    seed_initial_data(conn)
    conn.close()
    print(f"[*] VORA Sentinel Database initialized successfully at: {DB_FILE}")

def seed_initial_data(conn):
    """Populates baseline enterprise domains, initial device nodes, and threat events if empty."""
    cursor = conn.cursor()
    
    # Check if enterprises exist
    cursor.execute("SELECT COUNT(*) FROM enterprises")
    if cursor.fetchone()[0] == 0:
        enterprises = [
            ("Google LLC", "google.com", "Technology / Cloud", "recruiting-noreply@google.com", "TIER-1 ENTERPRISE", "SHA256:4a8e99f01ab..."),
            ("Microsoft Corp", "microsoft.com", "Technology / OS", "msftcareers@microsoft.com", "TIER-1 ENTERPRISE", "SHA256:7b912c09ef..."),
            ("Amazon Web Services", "amazon.com", "E-Commerce / Cloud", "aws-jobs-noreply@amazon.com", "TIER-1 ENTERPRISE", "SHA256:9c0018df88..."),
            ("Apple Inc.", "apple.com", "Consumer Tech / Hardware", "recruitment@apple.com", "TIER-1 ENTERPRISE", "SHA256:11bb89aa7c..."),
            ("Tata Consultancy Services", "tcs.com", "IT Consulting", "careers@tcs.com", "TIER-1 ENTERPRISE", "SHA256:ff90234a5d..."),
            ("Infosys Limited", "infosys.com", "IT Services", "talent@infosys.com", "TIER-1 ENTERPRISE", "SHA256:88ee2100cb..."),
            ("Wipro Limited", "wipro.com", "IT / Engineering", "talent-acquisition@wipro.com", "TIER-1 ENTERPRISE", "SHA256:44aa1098fe..."),
            ("Meta Platforms Inc.", "meta.com", "Social Media / AI", "recruiting@meta.com", "TIER-1 ENTERPRISE", "SHA256:3299aa1188..."),
            ("Netflix Inc.", "netflix.com", "Entertainment / Tech", "jobs@netflix.com", "TIER-1 ENTERPRISE", "SHA256:66cc992110..."),
            ("NVIDIA Corporation", "nvidia.com", "Semiconductors / AI", "nvidia-careers@nvidia.com", "TIER-1 ENTERPRISE", "SHA256:22bb774431..."),
            ("IBM Corporation", "ibm.com", "Enterprise Cloud & AI", "ibmrecruitment@ibm.com", "TIER-1 ENTERPRISE", "SHA256:55dd8811ee...")
        ]
        cursor.executemany("""
            INSERT INTO enterprises (company_name, official_domain, industry, authorized_hr_email, verification_tier, public_key_fingerprint)
            VALUES (?, ?, ?, ?, ?, ?)
        """, enterprises)

    # Check if external devices exist
    cursor.execute("SELECT COUNT(*) FROM external_devices")
    if cursor.fetchone()[0] == 0:
        devices = [
            ("NODE-GATEWAY-01", "Primary SOC Ingestion Gateway", "Security-Agent", "192.168.1.100", "ACTIVE", 2480, 14),
            ("NODE-LAPTOP-EXT-02", "External Auditor ThinkPad X1", "Windows-PC", "10.0.4.15", "ACTIVE", 420, 3),
            ("NODE-MOBILE-PROBE-01", "Field Officer Pixel 8 Pro", "Mobile", "172.56.21.88", "ACTIVE", 185, 2),
            ("NODE-LINUX-VM-03", "Threat Sandbox VM (Ubuntu 24.04)", "Linux-VM", "192.168.122.45", "ACTIVE", 890, 8),
            ("NODE-RPI-SENTINEL", "Perimeter Guard Raspberry Pi 5", "Raspberry-Pi", "192.168.1.205", "ACTIVE", 3105, 19)
        ]
        cursor.executemany("""
            INSERT INTO external_devices (device_id, device_name, device_type, ip_address, telemetry_status, packets_transmitted, threats_reported)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, devices)

    # Check if threats exist
    cursor.execute("SELECT COUNT(*) FROM threat_events")
    if cursor.fetchone()[0] == 0:
        threats = [
            ("EVT-9041", "Typosquatting & Punycode Phishing", "CRITICAL", "185.220.101.5", "google.com -> g00gle-careers.top", 96, "Detected high Levenshtein distance anomaly matching Google LLC. Domain registered 48h ago on bulletproof hosting.", "NODE-GATEWAY-01", "INTERCEPTED"),
            ("EVT-9042", "Fee Extortion & Fake Appointment Letter", "CRITICAL", "198.51.100.22", "Tata Consultancy Services", 99, "Offer document explicitly mandated refundable ₹12,500 security deposit to personal UPI ID. Unofficial Gmail address used.", "NODE-MOBILE-PROBE-01", "INTERCEPTED"),
            ("EVT-9043", "Credential Stuffing & Brute Force Probe", "HIGH", "194.26.29.112", "/api/auth/login", 88, "Triggered 14 rapid authentication attempts within 3.2 seconds. IP automatically blacklisted by Rate Limiter.", "NODE-GATEWAY-01", "MITIGATED"),
            ("EVT-9044", "Homograph IDN Attack", "HIGH", "45.154.255.89", "microsoft.com -> micrоsoft.com (Cyrillic 'о')", 94, "Cyrillic character substitution detected in RFC-3490 Punycode decoder.", "NODE-LINUX-VM-03", "INTERCEPTED"),
            ("EVT-9045", "Suspicious Telegram Interview Redirect", "MEDIUM", "103.208.71.18", "Amazon Web Services", 72, "Candidate instructed to conduct formal HR intake via anonymous Telegram bot.", "NODE-LAPTOP-EXT-02", "FLAGGED")
        ]
        cursor.executemany("""
            INSERT INTO threat_events (event_id, threat_type, severity, source_ip, target_entity, threat_score, details, device_id, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, threats)

    # Check if incidents exist
    cursor.execute("SELECT COUNT(*) FROM security_incidents")
    if cursor.fetchone()[0] == 0:
        incidents = [
            ("INC-2026-081", "Active Lookalike Domain Campaign Target: Google", "CRITICAL", "Domain Typosquatting", "google.com", "SOC Lead Analyst", "OPEN", "Pending registrar abuse notification & Cloudflare DNS sinkhole."),
            ("INC-2026-082", "Syndicate Recruitment Extortion via UPI", "CRITICAL", "Social Engineering / Financial Fraud", "TCS Candidates", "Cyber Incident Team", "INVESTIGATING", "Bank account metadata extracted; forensic dossier forwarded to cybercrime cell."),
            ("INC-2026-083", "Distributed Brute Force Ingestion Attempt", "HIGH", "HTTP Rate Limit Violation", "Auth API Gateway", "Automated Shield", "MITIGATED", "Subnet 194.26.29.0/24 rate-limited to 0 requests/min for 24 hours.")
        ]
        cursor.executemany("""
            INSERT INTO security_incidents (incident_ref, title, severity, attack_vector, affected_asset, assigned_analyst, status, mitigation_notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, incidents)

    conn.commit()

# --- QUERY REPOSITORIES ---

def log_threat_event(threat_type, severity, source_ip, target_entity, threat_score, details, device_id="PRIMARY_GATEWAY", status="INTERCEPTED"):
    conn = get_db_connection()
    cursor = conn.cursor()
    import uuid
    event_id = f"EVT-{str(uuid.uuid4())[:8].upper()}"
    cursor.execute("""
        INSERT INTO threat_events (event_id, threat_type, severity, source_ip, target_entity, threat_score, details, device_id, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (event_id, threat_type, severity, source_ip, target_entity, threat_score, details, device_id, status))
    
    # Auto-escalate to Incident Queue if CRITICAL or HIGH
    if severity in ("CRITICAL", "HIGH") and threat_score >= 85:
        inc_ref = f"INC-AUTO-{str(uuid.uuid4())[:6].upper()}"
        cursor.execute("""
            INSERT INTO security_incidents (incident_ref, title, severity, attack_vector, affected_asset, assigned_analyst, status, mitigation_notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (inc_ref, f"Automated Incident: {threat_type} on {target_entity}", severity, threat_type, target_entity, "VORA AI Sentinel", "OPEN", details))

    conn.commit()
    conn.close()
    return event_id

def record_device_telemetry(device_id, device_name, device_type, ip_address, threat_count_increment=0):
    conn = get_db_connection()
    cursor = conn.cursor()
    now = datetime.datetime.now(datetime.timezone.utc).isoformat()
    
    cursor.execute("SELECT id, packets_transmitted, threats_reported FROM external_devices WHERE device_id = ?", (device_id,))
    row = cursor.fetchone()
    
    if row:
        cursor.execute("""
            UPDATE external_devices 
            SET packets_transmitted = packets_transmitted + 1,
                threats_reported = threats_reported + ?,
                last_heartbeat = CURRENT_TIMESTAMP,
                telemetry_status = 'ACTIVE',
                ip_address = ?,
                device_name = ?
            WHERE device_id = ?
        """, (threat_count_increment, ip_address, device_name, device_id))
    else:
        cursor.execute("""
            INSERT INTO external_devices (device_id, device_name, device_type, ip_address, telemetry_status, packets_transmitted, threats_reported)
            VALUES (?, ?, ?, ?, 'ACTIVE', 1, ?)
        """, (device_id, device_name, device_type, ip_address, threat_count_increment))
        
    conn.commit()
    conn.close()

def get_soc_metrics():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) FROM threat_events")
    total_threats = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM threat_events WHERE severity = 'CRITICAL'")
    critical_threats = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM external_devices WHERE telemetry_status = 'ACTIVE'")
    active_devices = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM enterprises")
    verified_enterprises = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM security_incidents WHERE status IN ('OPEN', 'INVESTIGATING')")
    open_incidents = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM ip_security_ledger WHERE is_blocked = 1")
    blocked_ips = cursor.fetchone()[0]

    conn.close()
    return {
        "total_threats_logged": total_threats,
        "critical_threats": critical_threats,
        "active_device_nodes": active_devices,
        "verified_enterprises": verified_enterprises,
        "open_incidents": open_incidents,
        "blocked_ips_bruteforce": blocked_ips,
        "system_status": "OPERATIONAL / LIVE_SENTINEL_ARMED"
    }

def get_recent_threats(limit=25):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT event_id, threat_type, severity, source_ip, target_entity, threat_score, details, device_id, status, timestamp
        FROM threat_events
        ORDER BY id DESC LIMIT ?
    """, (limit,))
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

def get_device_nodes():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT device_id, device_name, device_type, ip_address, telemetry_status, packets_transmitted, threats_reported, last_heartbeat
        FROM external_devices
        ORDER BY last_heartbeat DESC
    """)
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

def get_incidents():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT incident_ref, title, severity, attack_vector, affected_asset, assigned_analyst, status, mitigation_notes, created_at
        FROM security_incidents
        ORDER BY id DESC
    """)
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

def update_incident_status(incident_ref, new_status, notes=""):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE security_incidents
        SET status = ?, mitigation_notes = COALESCE(mitigation_notes || ' | ', '') || ?, updated_at = CURRENT_TIMESTAMP
        WHERE incident_ref = ?
    """, (new_status, notes, incident_ref))
    conn.commit()
    conn.close()

def is_ip_blocked(ip):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT is_blocked, failed_attempts FROM ip_security_ledger WHERE ip_address = ?", (ip,))
    row = cursor.fetchone()
    conn.close()
    if row and row['is_blocked'] == 1:
        return True
    return False

def record_failed_ip_attempt(ip):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, failed_attempts FROM ip_security_ledger WHERE ip_address = ?", (ip,))
    row = cursor.fetchone()
    if row:
        attempts = row['failed_attempts'] + 1
        is_blocked = 1 if attempts >= 5 else 0
        cursor.execute("""
            UPDATE ip_security_ledger
            SET failed_attempts = ?, is_blocked = ?, last_attempt = CURRENT_TIMESTAMP
            WHERE ip_address = ?
        """, (attempts, is_blocked, ip))
    else:
        cursor.execute("""
            INSERT INTO ip_security_ledger (ip_address, failed_attempts, is_blocked)
            VALUES (?, 1, 0)
        """, (ip,))
    conn.commit()
    conn.close()
