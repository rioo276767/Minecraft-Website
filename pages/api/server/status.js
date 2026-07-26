import axios from 'axios';

const PTERODACTYL_URL = process.env.PTERODACTYL_URL;
const API_KEY = process.env.API_KEY;
const SERVER_ID = process.env.SERVER_ID;

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      `${PTERODACTYL_URL}/api/client/servers/${SERVER_ID}/resources`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    const data = response.data.attributes;
    res.status(200).json({
      status: 'success',
      data: {
        state: data.state,
        uptime: data.resources.uptime, // dalam detik
        memory: data.resources.memory_bytes,
        cpu: data.resources.cpu_absolute
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
