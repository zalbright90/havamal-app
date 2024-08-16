import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());

// Load JSON data from a file
const stanzas = JSON.parse(fs.readFileSync(path.join( 'havamal_stanzas.json'), 'utf8'));

// Endpoint to fetch the daily stanza
app.get('/api/stanza', (req, res) => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /86400000);
    const stanzaIndex = dayOfYear % stanzas.length;
    res.json(stanzas[stanzaIndex]);
});

// Start server
app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});