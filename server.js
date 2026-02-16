const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/votes/:universeId', async (req, res) => {
  const universeId = req.params.universeId;
  
  try {
    const response = await fetch(
      https://games.roblox.com/v1/games/votes?universeIds=${universeId}
    );
    
    if (!response.ok) {
      return res.status(response.status).json({ 
        error: 'Roblox API error',
        status: response.status 
      });
    }
    
    const data = await response.json();
    
    if (data.data && data.data[0]) {
      res.json({
        success: true,
        likes: data.data[0].upVotes,
        dislikes: data.data[0].downVotes
      });
    } else {
      res.json({ success: false, error: 'No data' });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.get('/', (req, res) => {
  res.send('Roblox Likes API is running! Use /votes/UNIVERSE_ID');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
