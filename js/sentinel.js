/**
 * VORA SENTINEL: CLIENT-SIDE SOC TELEMETRY & API ENGINE
 * Level 5 Cybersecurity Project Frontend Controller
 * Connects frontend to Python Flask Backend & Netlify Serverless Cloud API
 */

const VoraSentinel = (function() {
  // Discover backend API endpoint
  let apiBase = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000/api'
    : '/api';

  let pollInterval = null;

  async function checkHealth() {
    try {
      const res = await fetch(`${apiBase}/health`, { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        updateSystemBadge(true, data.metrics);
        return true;
      }
    } catch (e) {
      // If local server unreachable on localhost, try fallback
      if (apiBase.includes('localhost:5000')) {
        apiBase = '/api';
        try {
          const res2 = await fetch(`${apiBase}/health`, { method: 'GET' });
          if (res2.ok) {
            const data2 = await res2.json();
            updateSystemBadge(true, data2.metrics);
            return true;
          }
        } catch (e2) {}
      }
    }
    updateSystemBadge(false);
    return false;
  }

  function updateSystemBadge(isLive, metrics = null) {
    const badge = document.getElementById('sentinel-system-badge');
    const txt = document.getElementById('header-backend-status-text');
    if (!badge || !txt) return;

    if (isLive) {
      badge.style.background = 'rgba(16, 185, 129, 0.15)';
      badge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      badge.style.color = '#10b981';
      txt.textContent = 'SOC: ARMED (LIVE)';
      if (metrics) {
        if (document.getElementById('soc-stat-nodes')) {
          document.getElementById('soc-stat-nodes').textContent = `${metrics.active_device_nodes || 5} Active`;
        }
        if (document.getElementById('soc-stat-threats')) {
          document.getElementById('soc-stat-threats').textContent = `${metrics.total_threats_logged || 18450}+`;
        }
        if (document.getElementById('soc-stat-critical')) {
          document.getElementById('soc-stat-critical').textContent = `${metrics.critical_threats || 42} Blocked`;
        }
      }
    } else {
      badge.style.background = 'rgba(245, 158, 11, 0.15)';
      badge.style.borderColor = 'rgba(245, 158, 11, 0.4)';
      badge.style.color = '#f59e0b';
      txt.textContent = 'SOC: CLOUD SYNC';
    }
  }

  async function fetchThreats() {
    const tbody = document.getElementById('soc-threats-tbody');
    if (!tbody) return;

    try {
      const res = await fetch(`${apiBase}/threats?limit=15`);
      if (res.ok) {
        const data = await res.json();
        renderThreats(data.threats || []);
      }
    } catch (e) {
      console.warn('[VoraSentinel] Falling back to default threats feed:', e);
    }
  }

  function renderThreats(threats) {
    const tbody = document.getElementById('soc-threats-tbody');
    if (!tbody || threats.length === 0) return;

    tbody.innerHTML = threats.map(t => {
      const sevClass = (t.severity || 'low').toLowerCase();
      const timeStr = t.timestamp ? new Date(t.timestamp).toLocaleTimeString() : 'Just Now';
      return `
        <tr>
          <td><code>${esc(t.event_id || 'EVT-9000')}</code></td>
          <td><strong>${esc(t.threat_type || 'Suspicious Activity')}</strong></td>
          <td style="max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${esc(t.target_entity)}">
            ${esc(t.target_entity || 'Network Probe')}
          </td>
          <td><code>${esc(t.source_ip || '127.0.0.1')}</code></td>
          <td><strong>${t.threat_score || 75}/100</strong></td>
          <td><span class="threat-badge ${sevClass}">${esc(t.severity || 'MEDIUM')}</span></td>
          <td><span style="color: var(--accent-success); font-weight: 700;">${esc(t.status || 'INTERCEPTED')}</span></td>
        </tr>
      `;
    }).join('');
  }

  async function fetchDevices() {
    const container = document.getElementById('soc-devices-container');
    if (!container) return;

    try {
      const res = await fetch(`${apiBase}/devices`);
      if (res.ok) {
        const data = await res.json();
        renderDevices(data.devices || []);
      }
    } catch (e) {
      console.warn('[VoraSentinel] Error fetching devices:', e);
    }
  }

  function renderDevices(devices) {
    const container = document.getElementById('soc-devices-container');
    if (!container || devices.length === 0) return;

    const icons = {
      'Mobile': 'fa-mobile-screen',
      'Windows-PC': 'fa-laptop-code',
      'Linux-VM': 'fa-server',
      'Raspberry-Pi': 'fa-microchip',
      'Security-Agent': 'fa-shield-halved'
    };

    container.innerHTML = devices.map(d => {
      const icon = icons[d.device_type] || 'fa-desktop';
      const timeStr = d.last_heartbeat ? new Date(d.last_heartbeat).toLocaleTimeString() : 'Active';
      return `
        <div class="device-node-card">
          <div class="device-node-left">
            <div class="device-node-icon"><i class="fa-solid ${icon}"></i></div>
            <div>
              <div class="device-node-name">${esc(d.device_name || d.device_id)}</div>
              <div class="device-node-meta">${esc(d.ip_address)} • Packets: ${d.packets_transmitted || 1}</div>
            </div>
          </div>
          <div style="text-align: right;">
            <span class="soc-card-badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border-color: rgba(16, 185, 129, 0.3);">
              ${esc(d.telemetry_status || 'ACTIVE')}
            </span>
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 3px;">${timeStr}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  async function fetchIncidents() {
    const container = document.getElementById('soc-incidents-container');
    if (!container) return;

    try {
      const res = await fetch(`${apiBase}/incidents`);
      if (res.ok) {
        const data = await res.json();
        renderIncidents(data.incidents || []);
      }
    } catch (e) {
      console.warn('[VoraSentinel] Error fetching incidents:', e);
    }
  }

  function renderIncidents(incidents) {
    const container = document.getElementById('soc-incidents-container');
    if (!container) return;

    if (incidents.length === 0) {
      container.innerHTML = '<p style="font-size: 0.8rem; color: var(--text-muted);">No open high-severity incidents.</p>';
      return;
    }

    container.innerHTML = incidents.map(inc => `
      <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.8rem 1rem; margin-bottom: 0.6rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;">
            <code>${esc(inc.incident_ref)}</code>
            <span class="threat-badge ${inc.severity.toLowerCase()}">${esc(inc.severity)}</span>
            <strong style="color: var(--text-primary); font-size: 0.85rem;">${esc(inc.title)}</strong>
          </div>
          <p style="font-size: 0.78rem; color: var(--text-secondary); margin: 0;">
            Target: <strong>${esc(inc.affected_asset)}</strong> | Vector: ${esc(inc.attack_vector)}
          </p>
        </div>
        <div>
          ${inc.status === 'MITIGATED'
            ? '<span style="color: var(--accent-success); font-size: 0.78rem; font-weight: 700;"><i class="fa-solid fa-check-double"></i> MITIGATED</span>'
            : `<button type="button" class="btn-outline btn-sm" onclick="VoraSentinel.mitigateIncident('${esc(inc.incident_ref)}')">
                 <i class="fa-solid fa-shield-virus"></i> Mitigate
               </button>`
          }
        </div>
      </div>
    `).join('');
  }

  async function simulateAttack(type) {
    const consoleEl = document.getElementById('soc-simulation-console');
    logConsole(`[TRANSMIT] Launching live simulation probe: '${type}'...`);

    try {
      const res = await fetch(`${apiBase}/sentinel/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attack_type: type, device_id: 'BROWSER_SOC_CONSOLE' })
      });
      const data = await res.json();
      logConsole(`[ALERT ACK] Probe intercepted by backend! Details: ${JSON.stringify(data.simulation || data)}`);
      
      // Refresh telemetry and threat feed immediately
      fetchThreats();
      fetchDevices();
      fetchIncidents();
      checkHealth();

      if (window.VoraApp && window.VoraApp.showToast) {
        window.VoraApp.showToast(`Simulated attack '${type}' intercepted by backend IDS!`, 'warning');
      }
    } catch (e) {
      logConsole(`[ERROR] Attack simulation failed: ${e.message}`);
    }
  }

  async function mitigateIncident(ref) {
    try {
      const res = await fetch(`${apiBase}/incidents/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          incident_ref: ref,
          action: 'MITIGATED',
          notes: 'Mitigated by SOC analyst via VORA Sentinel web console.'
        })
      });
      if (res.ok) {
        fetchIncidents();
        logConsole(`[RESOLVED] Incident ${ref} marked as MITIGATED.`);
        if (window.VoraApp && window.VoraApp.showToast) {
          window.VoraApp.showToast(`Incident ${ref} successfully mitigated!`, 'success');
        }
      }
    } catch (e) {
      console.error('Error mitigating incident:', e);
    }
  }

  function logConsole(msg) {
    const consoleEl = document.getElementById('soc-simulation-console');
    if (!consoleEl) return;
    const time = new Date().toLocaleTimeString();
    const div = document.createElement('div');
    div.textContent = `[${time}] ${msg}`;
    consoleEl.appendChild(div);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }

  async function exportAuditReport() {
    try {
      const res = await fetch(`${apiBase}/export/audit-report`);
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `VORA_SOC_Audit_Dossier_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      if (window.VoraApp && window.VoraApp.showToast) {
        window.VoraApp.showToast('Official SOC Audit Dossier downloaded.', 'success');
      }
    } catch (e) {
      console.error('Export report error:', e);
    }
  }

  function copyMobileUrl() {
    const url = 'https://voragenofficial.netlify.app/mobile-node.html';
    navigator.clipboard.writeText(url).then(() => {
      if (window.VoraApp && window.VoraApp.showToast) {
        window.VoraApp.showToast('Mobile Node URL copied to clipboard!', 'success');
      } else {
        alert('Copied: ' + url);
      }
    });
  }

  function refreshAll() {
    checkHealth();
    fetchThreats();
    fetchDevices();
    fetchIncidents();
  }

  function esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function init() {
    refreshAll();
    // Auto-poll every 12 seconds
    if (!pollInterval) {
      pollInterval = setInterval(refreshAll, 12000);
    }
  }

  // Auto-init on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    init,
    refreshAll,
    fetchThreats,
    fetchDevices,
    fetchIncidents,
    simulateAttack,
    mitigateIncident,
    exportAuditReport,
    copyMobileUrl,
    getApiBase: () => apiBase
  };
})();

window.VoraSentinel = VoraSentinel;
