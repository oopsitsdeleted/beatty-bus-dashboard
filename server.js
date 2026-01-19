// Made with love by Lokweng 2026
// Contains information from the Bus Arrival (v3) and Bus Routes datasets which is made available under the terms of the Singapore Open Data Licence version 1.0 https://data.gov.sg/open-data-licence



const ACCOUNT_KEY = 'YOUR API KEY HERE'; // Replace this with the api key that was emailed to you from LTA




const express = require('express');
const cors = require('cors');
const https = require('https');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// helper function to fetch data from lta datamall
function ltaFetch(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'datamall2.mytransport.sg',
      path: path,
      method: 'GET',
      headers: {
        'AccountKey': ACCOUNT_KEY,
        'accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            resolve(JSON.parse(data));
          } else {
            resolve(null);
          }
        } catch (error) {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.end();
  });
}

// api endpoint to get bus arrivals and schedules
app.get('/api/bus-arrivals', async (req, res) => {
  try {
    const busStops = ['52369', '52361', '52031', '52039']; // if you ever want to change codes the easiest method is to click on the bus stop in google maps, it shows the code and the name
    
    // fetch arrivals and route schedules concurrently
    const [arrivals, routes] = await Promise.all([
      Promise.all(busStops.map(code => ltaFetch(`/ltaodataservice/v3/BusArrival?BusStopCode=${code}`))),
      ltaFetch('/ltaodataservice/BusRoutes')
    ]);

    const results = busStops.map((code, i) => {
      const stopData = arrivals[i];
      const services = (stopData?.Services || []).map(svc => {
        const schedule = routes?.value?.find(r => r.BusStopCode === code && r.ServiceNo === svc.ServiceNo);
        return { ...svc, schedule };
      });
      return { success: !!stopData, busStopCode: code, data: { Services: services } };
    });
    
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: results
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.use(express.static(__dirname)); 

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});