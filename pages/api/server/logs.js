import axios from 'axios';

const PTERODACTYL_URL = process.env.PTERODACTYL_URL;
const API_KEY = process.env.API_KEY;
const SERVER_ID = process.env.SERVER_ID;

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      `${PTERODACTYL_URL}/api/client/servers/${SERVER_ID}/websocket`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    // Pterodactyl ga punya endpoint langsung buat log, kita pake websocket token
    // Tapi buat simpel, kita return token + cara akses
    res.status(200).json({
      status: 'success',
      message: 'Gunakan WebSocket untuk log realtime',
      token: response.data.data.token,
      socket: response.data.data.socket
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
