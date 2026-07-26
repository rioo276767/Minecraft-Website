import axios from 'axios';

const PTERODACTYL_URL = process.env.PTERODACTYL_URL;
const API_KEY = process.env.API_KEY;
const SERVER_ID = process.env.SERVER_ID;

export default async function handler(req, res) {
  console.log('=== STATUS API CALLED ===');
  console.log('URL:', PTERODACTYL_URL);
  console.log('Server ID:', SERVER_ID);
  
  if (!PTERODACTYL_URL || !API_KEY || !SERVER_ID) {
    console.error('Missing environment variables!');
    return res.status(500).json({ 
      status: 'error', 
      message: 'Environment variables not set properly' 
    });
  }

  try {
    const response = await axios.get(
      `${PTERODACTYL_URL}/api/client/servers/${SERVER_ID}/resources`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Accept': 'application/json'
        },
        timeout: 10000
      }
    );
    
    const data = response.data.attributes;
    console.log('Status response:', data.state);
    
    res.status(200).json({
      status: 'success',
      data: {
        state: data.state || 'unknown',
        uptime: data.resources?.uptime || 0,
        memory: data.resources?.memory_bytes || 0,
        cpu: data.resources?.cpu_absolute || 0
      }
    });
  } catch (error) {
    console.error('Error detail:', error.response?.data || error.message);
    res.status(500).json({ 
      status: 'error', 
      message: error.response?.data?.errors?.[0]?.detail || error.message
    });
  }
}
