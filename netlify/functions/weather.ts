import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const API_KEY = process.env.VITE_WEATHER_API_KEY;
  const path = event.path.replace('/.netlify/functions/weather', '');
  const queryString = event.rawQuery ? `?${event.rawQuery}` : '';
  
  const url = `https://api.openweathermap.org/data/2.5${path}${queryString}&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Failed to fetch weather data' }),
    };
  }
};