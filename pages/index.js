import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [uptime, setUptime] = useState('---');
  const [status, setStatus] = useState('---');
  const [logs, setLogs] = useState(['🔄 Console ready... by_rioo👿']);
  const [command, setCommand] = useState('');
  const [wsConnected, setWsConnected] = useState(false);
  const wsRef = useRef(null);

  const addLog = (msg) => {
    setLogs(prev => {
      const newLogs = [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`];
      return newLogs.slice(-100); // Keep last 100 logs
    });
  };

  const formatUptime = (seconds) => {
    if (!seconds || seconds < 0) return '---';
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${d}d ${h}h ${m}m ${s}s`;
  };

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/server/status');
      const data = await res.json();
      if (data.status === 'success') {
        setStatus(data.data.state);
        setUptime(formatUptime(data.data.uptime));
      }
    } catch (e) {
      addLog('⚠️ Gagal ambil status: ' + e.message);
    }
  };

  const sendCommand = async () => {
    if (!command.trim()) return addLog('⚠️ Perintah kosong');
    try {
      const res = await fetch('/api/server/console', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command })
      });
      const data = await res.json();
      addLog(data.status === 'success' ? data.message : '❌ ' + data.message);
      setCommand('');
    } catch (e) {
      addLog('⚠️ Error: ' + e.message);
    }
  };

  // WebSocket untuk console log realtime
  useEffect(() => {
    const connectWebSocket = async () => {
      try {
        const res = await fetch('/api/server/logs');
        const data = await res.json();
        if (data.status === 'success' && data.token) {
          const wsUrl = data.socket.replace('http', 'ws') + `?token=${data.token}`;
          const ws = new WebSocket(wsUrl);
          wsRef.current = ws;

          ws.onopen = () => {
            setWsConnected(true);
            addLog('✅ WebSocket connected - console log live!');
          };

          ws.onmessage = (event) => {
            const msg = event.data;
            addLog('📡 ' + msg);
          };

          ws.onerror = (error) => {
            addLog('⚠️ WebSocket error: ' + error.message);
          };

          ws.onclose = () => {
            setWsConnected(false);
            addLog('🔌 WebSocket disconnected');
            setTimeout(connectWebSocket, 5000);
          };
        }
      } catch (e) {
        addLog('⚠️ Gagal connect WebSocket: ' + e.message);
        setTimeout(connectWebSocket, 5000);
      }
    };

    connectWebSocket();
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);

    return () => {
      if (wsRef.current) wsRef.current.close();
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>⚡ NEXO CONSOLE ⚡</h1>
        
        {/* Status & Uptime */}
        <div style={styles.statusBox}>
          <div style={styles.statusItem}>
            <span style={styles.label}>📌 Status</span>
            <span style={{...styles.value, color: status === 'running' ? '#00ff88' : '#ff4466'}}>
              {status.toUpperCase()}
            </span>
          </div>
          <div style={styles.statusItem}>
            <span style={styles.label}>⏱️ Uptime</span>
            <span style={styles.value}>{uptime}</span>
          </div>
          <div style={styles.statusItem}>
            <span style={styles.label}>🔗 WebSocket</span>
            <span style={{...styles.value, color: wsConnected ? '#00ff88' : '#ff4466'}}>
              {wsConnected ? '🟢 Connected' : '🔴 Disconnected'}
            </span>
          </div>
        </div>

        {/* Console Log */}
        <div style={styles.logContainer}>
          <div style={styles.logHeader}>
            <span>📜 Console Log</span>
            <button style={styles.clearBtn} onClick={() => setLogs([])}>Clear</button>
          </div>
          <div style={styles.logBox}>
            {logs.map((log, i) => (
              <div key={i} style={styles.logLine}>{log}</div>
            ))}
          </div>
        </div>

        {/* Command Input */}
        <div style={styles.inputArea}>
          <input
            style={styles.input}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendCommand()}
            placeholder="Ketik command (contoh: /list, /say halo)"
          />
          <button style={styles.sendBtn} onClick={sendCommand}>
            📤 Kirim
          </button>
        </div>

        <div style={styles.footer}>Nexo Pride AI · Dark Night System · by_rioo👿</div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: '#0d0d0d',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Courier New', monospace",
    padding: '20px'
  },
  card: {
    background: '#1a1a1a',
    border: '2px solid #00ffcc',
    borderRadius: '20px',
    padding: '30px',
    maxWidth: '800px',
    width: '100%',
    boxShadow: '0 0 40px rgba(0, 255, 204, 0.3)'
  },
  title: {
    textAlign: 'center',
    color: '#00ffcc',
    fontSize: '26px',
    textShadow: '0 0 20px #00ffcc',
    marginBottom: '20px'
  },
  statusBox: {
    background: '#111',
    padding: '15px',
    borderRadius: '10px',
    border: '1px solid #00ffcc',
    marginBottom: '20px'
  },
  statusItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '6px 0',
    borderBottom: '1px solid #222',
    fontSize: '15px'
  },
  label: { color: '#888' },
  value: { color: '#00ffcc', fontWeight: 'bold' },
  logContainer: {
    marginBottom: '15px'
  },
  logHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    color: '#00ffcc',
    fontSize: '14px'
  },
  clearBtn: {
    background: 'transparent',
    border: '1px solid #ff4466',
    color: '#ff4466',
    padding: '2px 12px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  logBox: {
    background: '#0a0a0a',
    border: '1px solid #333',
    borderRadius: '10px',
    padding: '12px',
    maxHeight: '300px',
    overflowY: 'auto',
    fontSize: '13px',
    color: '#88ddff',
    fontFamily: 'monospace'
  },
  logLine: {
    padding: '2px 0',
    borderBottom: '1px solid #1a1a1a',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all'
  },
  inputArea: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px'
  },
  input: {
    flex: 1,
    padding: '12px',
    background: '#111',
    border: '2px solid #00ffcc',
    borderRadius: '30px',
    color: '#00ffcc',
    fontSize: '14px',
    outline: 'none'
  },
  sendBtn: {
    padding: '12px 25px',
    background: '#1a1a1a',
    border: '2px solid #00ffcc',
    borderRadius: '30px',
    color: '#00ffcc',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: '0.3s'
  },
  footer: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#446',
    fontSize: '12px'
  }
};
