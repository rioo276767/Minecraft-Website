import axios from 'axios';

const PTERODACTYL_URL = process.env.PTERODACTYL_URL;
const API_KEY = process.env.API_KEY;
const SERVER_ID = process.env.SERVER_ID;

export default async function handler(req, res) {
  const { command } = req.body;
  
  console.log('=== CONSOLE API CALLED ===');
  console.log('Command:', command);
  console.log('Server ID:', SERVER_ID);
  
  if (!command) {
    return res.status(400).json({ 
      status: 'error', 
      message: 'Perintah kosong' 
    });
  }

  if (!PTERODACTYL_URL || !API_KEY || !SERVER_ID) {
    return res.status(500).json({ 
      status: 'error', 
      message: 'Environment variables not set' 
    });
  }

  try {
    const response = await axios.post(
      `${PTERODACTYL_URL}/api/client/servers/${SERVER_ID}/command`,
      { command },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000
      }
    );
    
    console.log('Command sent successfully');
    res.status(200).json({ 
      status: 'success', 
      message: `✅ Perintah terkirim: ${command}` 
    });
  } catch (error) {
    console.error('Error detail:', error.response?.data || error.message);
    res.status(500).json({ 
      status: 'error', 
      message: error.response?.data?.errors?.[0]?.detail || error.message
    });
  }
}
