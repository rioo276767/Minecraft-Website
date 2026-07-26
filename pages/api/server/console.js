import axios from 'axios';

const PTERODACTYL_URL = process.env.PTERODACTYL_URL;
const API_KEY = process.env.API_KEY;
const SERVER_ID = process.env.SERVER_ID;

export default async function handler(req, res) {
  const { command } = req.body;
  if (!command) {
    return res.status(400).json({ status: 'error', message: 'Perintah kosong' });
  }
  try {
    await axios.post(
      `${PTERODACTYL_URL}/api/client/servers/${SERVER_ID}/command`,
      { command },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    res.status(200).json({ status: 'success', message: `✅ Perintah terkirim: ${command}` });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
