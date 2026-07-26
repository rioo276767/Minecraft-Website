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
          'Accept': 'application/json'
        }
      }
    );
    
    const data = response.data.data;
    res.status(200).json({
      status: 'success',
      token: data.token,
      socket: data.socket
    });
  } catch (error) {
    console.error('WebSocket error:', error.message);
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
}
