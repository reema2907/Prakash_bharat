const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/:place', (req, res) => {
  const place = decodeURIComponent(req.params.place);
  console.log('Requested place:', place); // Add this line to log the requested place
  
  fs.readFile('electrician.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data:', err);
      return res.status(500).send('Error reading data');
    } else {
      const electricians = JSON.parse(data);
      console.log('Parsed electricians data:', electricians); // Log the data
      const placeData = electricians.find(electrician => electrician.name === place);
      if (placeData) {
        console.log('Found place data:', placeData); // Log the found data
        res.json({
          name: placeData.electrician,
          place: placeData.name,
          contact: placeData.contact,
        });
      } else {
        console.log('Place not found:', place); // Log if place not found
        res.status(404).send('Place not found');
      }
    }
  });
});

module.exports = router;
