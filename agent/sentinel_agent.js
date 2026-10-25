#!/usr/bin/env node
/**
 * VORA Sentinel - External Device Security Agent (Node.js)
 * Level 5 Cybersecurity Project - External Device Component
 */

const http = require('http');
const https = require('https');
const os = require('os');

const API_ENDPOINT = process.env.VORA_API || 'https://voragenofficial.netlify.app/api';
const DEVICE_ID = `NODE-NODEJS-${os.platform().toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

console.log('================================================================');
console.log('  VORA SENTINEL: NODE.JS EXTERNAL DEVICE AGENT (LEVEL 5 DEMO)  ');
console.log('================================================================');
console.log(`  Device ID:    ${DEVICE_ID}`);
console.log(`  Hostname:     ${os.hostname()}`);
console.log(`  Platform:     ${os.type()} ${os.release()} (${os.arch()})`);
console.log(`  Target API:   ${API_ENDPOINT}`);
console.log('================================================================\n');

function sendPost(path, data, callback) {
  const url = new URL(`${API_ENDPOINT}/${path.replace(/^\//, '')}`);
  const client = url.protocol === 'https:' ? https : http;
  const payload = JSON.stringify(data);

  const req = client.request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  }, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      try {
        callback(null, JSON.parse(body));
      } catch (e) {
        callback(null, body);
      }
    });
  });

  req.on('error', err => callback(err));
  req.write(payload);
  req.end();
}

function sendHeartbeat() {
  const payload = {
    device_id: DEVICE_ID,
    device_name: `${os.hostname()} (${os.type()})`,
    device_type: os.type().includes('Linux') ? 'Linux-VM' : 'Windows-PC',
    threat_detected: 0
  };
  sendPost('sentinel/telemetry', payload, (err, res) => {
    if (err) console.error('[-] Telemetry Error:', err.message);
    else console.log(`[${new Date().toLocaleTimeString()}] Telemetry Sent -> Server Status:`, res?.status || 'ACK');
  });
}

// Initial register
sendHeartbeat();

// Periodic heartbeat every 10s
setInterval(sendHeartbeat, 10000);
console.log('[*] Continuous telemetry streaming armed. Press Ctrl+C to terminate.');
