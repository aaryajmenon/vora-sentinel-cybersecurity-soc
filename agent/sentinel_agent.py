#!/usr/bin/env python3
"""
================================================================================
VORA SENTINEL: EXTERNAL DEVICE SECURITY AGENT (CLI)
Level 5 Cybersecurity Project - External Device Integration Component
================================================================================

This agent runs on an EXTERNAL device (Another Laptop, PC, Linux VM, or Raspberry Pi).
It connects over the Internet / Local Network to the deployed VORA Sentinel Backend
and streams live security telemetry, heartbeats, and threat detection probes.

MANDATORY LEVEL 5 DEMONSTRATION FLOW:
External Device (This Script) -> Internet/Network -> Live API -> Database -> Alert/Dashboard
================================================================================
"""

import sys
import os
import platform
import socket
import time
import uuid
import json
import urllib.request
import urllib.error

# DEFAULT LIVE BACKEND TARGETS
# Target 1: Deployed Netlify Cloud API
NETLIFY_LIVE_URL = "https://voragenofficial.netlify.app/api"
# Target 2: Localhost / Local Network IP
LOCAL_BACKEND_URL = "http://localhost:5000/api"

class SentinelAgent:
    def __init__(self, target_api=None):
        self.device_id = f"NODE-{platform.system().upper()}-{socket.gethostname()[:8].upper()}-{str(uuid.uuid4())[:4].upper()}"
        self.device_name = f"{socket.gethostname()} ({platform.system()} {platform.release()})"
        self.device_type = self._determine_device_type()
        self.target_api = target_api or self._auto_discover_api()
        self.packet_count = 0

    def _determine_device_type(self):
        plat = platform.system().lower()
        if "linux" in plat:
            # Check for Raspberry Pi
            try:
                with open("/proc/cpuinfo", "r") as f:
                    if "Raspberry Pi" in f.read():
                        return "Raspberry-Pi"
            except Exception:
                pass
            return "Linux-VM"
        elif "windows" in plat:
            return "Windows-PC"
        elif "darwin" in plat:
            return "macOS-Laptop"
        return "Security-Agent"

    def _auto_discover_api(self):
        """Checks if local server is reachable, otherwise defaults to live cloud server."""
        print(f"[*] Discovering active VORA Sentinel Backend...")
        try:
            req = urllib.request.Request(f"{LOCAL_BACKEND_URL}/health", headers={"User-Agent": "SentinelAgent/5.0"})
            with urllib.request.urlopen(req, timeout=2) as resp:
                if resp.status == 200:
                    print(f"[+] Found Active Local Backend: {LOCAL_BACKEND_URL}")
                    return LOCAL_BACKEND_URL
        except Exception:
            pass

        print(f"[+] Using Live Cloud Backend: {NETLIFY_LIVE_URL}")
        return NETLIFY_LIVE_URL

    def _send_post(self, endpoint, payload):
        """Sends JSON POST request using standard library."""
        url = f"{self.target_api}/{endpoint.lstrip('/')}"
        data = json.dumps(payload).encode("utf-8")
        headers = {
            "Content-Type": "application/json",
            "User-Agent": f"SentinelAgent/5.0 ({self.device_id})"
        }
        req = urllib.request.Request(url, data=data, headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                res_body = resp.read().decode("utf-8")
                return json.loads(res_body)
        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8")
            print(f"[-] HTTP Error {e.code}: {err_body}")
            return None
        except Exception as e:
            print(f"[-] Connection Error: {e}")
            return None

    def register_and_heartbeat(self, threat_detected=0, threat_details=None):
        """Transmits telemetry packet to live backend."""
        self.packet_count += 1
        payload = {
            "device_id": self.device_id,
            "device_name": self.device_name,
            "device_type": self.device_type,
            "packets_transmitted": self.packet_count,
            "threat_detected": threat_detected,
            "threat_details": threat_details or {}
        }
        res = self._send_post("/sentinel/telemetry", payload)
        return res

    def simulate_attack(self, attack_type):
        """Triggers a simulated security event from this external device."""
        print(f"\n[!] TRANSMITTING ATTACK SIMULATION PROBE: '{attack_type}'...")
        payload = {
            "attack_type": attack_type,
            "device_id": self.device_id
        }
        res = self._send_post("/sentinel/simulate", payload)
        if res:
            print(f"[+] Backend Response: {json.dumps(res, indent=2)}")
            print(f"[+] Threat Logged to Central Database! View on Live SOC Dashboard.")
        return res

    def run_cli(self):
        print("=================================================================")
        print("  VORA SENTINEL: EXTERNAL DEVICE SECURITY AGENT (LEVEL 5 DEMO)  ")
        print("=================================================================")
        print(f"  Device ID:    {self.device_id}")
        print(f"  Device Name:  {self.device_name}")
        print(f"  Device Type:  {self.device_type}")
        print(f"  Target API:   {self.target_api}")
        print("=================================================================\n")

        # Initial Registration
        print("[*] Registering external device node with Live SOC...")
        res = self.register_and_heartbeat()
        if res and res.get("status") == "TELEMETRY_ACKNOWLEDGED":
            print(f"[+] Device Registered Successfully! Registered IP: {res.get('registered_ip')}")
        else:
            print("[!] Initial registration ping sent. Ready for live demo.")

        while True:
            print("\n---------------- DEMONSTRATION CONTROL MENU ----------------")
            print(" [1] Send Live Heartbeat Telemetry Packet")
            print(" [2] Launch Typosquatting Phishing Attack Simulation (g00gle.xyz)")
            print(" [3] Launch Brute-Force Credential Stuffing Simulation")
            print(" [4] Submit Advance-Fee Fraud Offer Document (Extortion)")
            print(" [5] Verify Suspicious Domain live via Backend API")
            print(" [6] Run Continuous Heartbeat Daemon (Auto-ping every 5s)")
            print(" [0] Exit Agent")
            print("------------------------------------------------------------")
            
            choice = input("Enter choice (0-6): ").strip()
            if choice == "1":
                r = self.register_and_heartbeat()
                print(f"[+] Heartbeat Sent! Response: {r}")
            elif choice == "2":
                self.simulate_attack("typosquatting")
            elif choice == "3":
                self.simulate_attack("brute_force")
            elif choice == "4":
                self.simulate_attack("fee_extortion")
            elif choice == "5":
                dom = input("Enter domain to inspect (e.g., micr0soft-jobs.top): ").strip()
                if dom:
                    r = self._send_post("/verify/company", {"domain": dom, "device_id": self.device_id})
                    print(f"[+] Verification Result: {json.dumps(r, indent=2)}")
            elif choice == "6":
                print("[*] Starting continuous telemetry loop (Press Ctrl+C to stop)...")
                try:
                    while True:
                        r = self.register_and_heartbeat()
                        print(f"[{time.strftime('%X')}] Transmitted Telemetry Packet #{self.packet_count} -> ACK")
                        time.sleep(5)
                except KeyboardInterrupt:
                    print("\n[*] Stopped telemetry loop.")
            elif choice == "0":
                print("[*] Shutting down agent. Goodbye!")
                break
            else:
                print("[-] Invalid choice. Please enter 0-6.")

if __name__ == "__main__":
    custom_target = None
    if len(sys.argv) > 1:
        custom_target = sys.argv[1]
    agent = SentinelAgent(target_api=custom_target)
    agent.run_cli()
