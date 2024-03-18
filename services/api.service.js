import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);

const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};

const getCity = async (city) => {
    if (!token) throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
    
    const { data } = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: city,
            limit: 1,
            appid: token
        }
    });
    const weather = await getWeather(data[0].lat, data[0].lon);
    return weather;
}

const getWeather = async (lat, lon) => {
    if (!token) throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            lat: lat,
            lon: lon,
            appid: token,
            units: 'metric',
            lang: 'ru'
        }
    })
    return data;
}

export { getCity, getWeather, getIcon };