-- ====================================================================
-- VORA SENTINEL: CYBERSECURITY THREAT INTELLIGENCE & DETECTION SYSTEM
-- Level 5 Cybersecurity Project Database Schema (SQLite / MySQL / Postgres compatible)
-- ====================================================================

-- 1. Verified Enterprise Directory (Authorized Domains & Public Identifiers)
CREATE TABLE IF NOT EXISTS enterprises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name VARCHAR(120) NOT NULL,
    official_domain VARCHAR(120) NOT NULL UNIQUE,
    industry VARCHAR(80) NOT NULL,
    authorized_hr_email VARCHAR(120) NOT NULL,
    verification_tier VARCHAR(40) DEFAULT 'TIER-1 ENTERPRISE',
    public_key_fingerprint VARCHAR(128),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Threat Events & Attack Interception Log
CREATE TABLE IF NOT EXISTS threat_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id VARCHAR(64) NOT NULL UNIQUE,
    threat_type VARCHAR(80) NOT NULL, -- Typosquatting, Homograph Attack, Fee Extortion, Brute Force, Malicious Link
    severity VARCHAR(20) NOT NULL,    -- CRITICAL, HIGH, MEDIUM, LOW
    source_ip VARCHAR(64) NOT NULL,
    target_entity VARCHAR(120) NOT NULL,
    threat_score INTEGER NOT NULL,     -- 0 to 100
    details TEXT NOT NULL,
    device_id VARCHAR(64) DEFAULT 'PRIMARY_GATEWAY',
    status VARCHAR(40) DEFAULT 'INTERCEPTED', -- INTERCEPTED, FLAGGED, MITIGATED
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Registered External Device Nodes (Laptop, VM, Mobile Phone, Raspberry Pi)
CREATE TABLE IF NOT EXISTS external_devices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    device_id VARCHAR(64) NOT NULL UNIQUE,
    device_name VARCHAR(120) NOT NULL,
    device_type VARCHAR(60) NOT NULL,  -- Mobile, Linux-VM, Windows-PC, Raspberry-Pi, Security-Agent
    ip_address VARCHAR(64) NOT NULL,
    telemetry_status VARCHAR(40) DEFAULT 'ACTIVE', -- ACTIVE, IDLE, OFFLINE
    packets_transmitted INTEGER DEFAULT 0,
    threats_reported INTEGER DEFAULT 0,
    last_heartbeat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Security Incident Management Queue (SOC Response Tickets)
CREATE TABLE IF NOT EXISTS security_incidents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    incident_ref VARCHAR(40) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    attack_vector VARCHAR(100) NOT NULL,
    affected_asset VARCHAR(150) NOT NULL,
    assigned_analyst VARCHAR(80) DEFAULT 'SOC Lead Analyst',
    status VARCHAR(30) DEFAULT 'OPEN', -- OPEN, INVESTIGATING, MITIGATED, CLOSED
    mitigation_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Brute Force & Intrusion Velocity Logs (Rate Limiter & IP Shield)
CREATE TABLE IF NOT EXISTS ip_security_ledger (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip_address VARCHAR(64) NOT NULL UNIQUE,
    failed_attempts INTEGER DEFAULT 0,
    last_attempt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_blocked INTEGER DEFAULT 0,       -- 0 = False, 1 = True
    blocked_until TIMESTAMP NULL,
    reason VARCHAR(150) DEFAULT 'Excessive Failed Authentications'
);

-- 6. User Accounts & SOC Analyst Directory
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id VARCHAR(64) NOT NULL UNIQUE,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    role VARCHAR(40) DEFAULT 'SOC_ANALYST', -- SOC_ANALYST, SECURITY_ENGINEER, ADMIN, AUDITOR
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Audit Trail / Immutable Access Log
CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action VARCHAR(100) NOT NULL,
    performed_by VARCHAR(120) NOT NULL,
    source_ip VARCHAR(64) NOT NULL,
    metadata TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index creation for high-velocity query performance
CREATE INDEX IF NOT EXISTS idx_threat_events_severity ON threat_events(severity);
CREATE INDEX IF NOT EXISTS idx_threat_events_timestamp ON threat_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_devices_last_heartbeat ON external_devices(last_heartbeat);
CREATE INDEX IF NOT EXISTS idx_incidents_status ON security_incidents(status);
