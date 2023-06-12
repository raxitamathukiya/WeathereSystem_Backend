const axios = require('axios');
//const client = require('../redis');
const redis=require('redis')
const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});
async function getCurrentWeather(req, res, next) {
  try {
    const { city } = req.params;
    client.connect()
    client.on('connect',()=>{
      {
        client.get(city, async (error, cachedData) => {
          if (error) {
            console.error('Redis error:', error);
          }
    
          if (cachedData) {
            const weatherData = JSON.parse(cachedData);
            res.json({ data: weatherData });
          } else {
            const apiUrl = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather'
    //headers: {
       // 'X-RapidAPI-Key': 'a2f66ece08msh2790ce609c3c44cp13eee0jsn74182e298f1d',
       // 'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
      //}
            const response = await axios.get(apiUrl);
            const weatherData = response.data;
    
            redisClient.setex(city, 1800, JSON.stringify(weatherData));
    
            res.json({ data: weatherData });
          }
        });
      }
      client.quit();
  })
    
  } catch (error) {
    next(error);
  }
}

module.exports = { getCurrentWeather };
