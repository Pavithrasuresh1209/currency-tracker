const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Currency Tracker API is running.');
});

app.get('/api/rates', async (req, res) => {
  try {
    // Using open.er-api.com and coingecko as reliable free APIs
    const forexResp = await axios.get('https://open.er-api.com/v6/latest/USD');
    const usdEurRate = forexResp.data.rates.EUR;

    const cryptoResp = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const btcUsdRate = cryptoResp.data.bitcoin.usd;

    res.json({
      usd_eur: usdEurRate,
      btc_usd: btcUsdRate
    });
  } catch (error) {
    console.error('Failed to fetch rates:', error.message);
    res.status(500).json({ error: 'Failed to fetch currency rates' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
