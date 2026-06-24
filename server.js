const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/api/search', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    
    fs.readFile(path.join(__dirname, 'aircraft.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading database:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        try {
            const aircraftList = JSON.parse(data);
            
            // Search through model, manufacturer, and aliases
            const results = aircraftList.filter(craft => {
                const searchString = `${craft.manufacturer} ${craft.model} ${craft.aliases.join(' ')}`.toLowerCase();
                return searchString.includes(query);
            });

            res.json(results);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({ error: 'Data parsing error' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Manual local database loaded successfully.`);
});