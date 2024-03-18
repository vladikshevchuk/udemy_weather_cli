// import https from 'https';
import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);

const getCity = async (city) => {
    if (!token) throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');

    const { data } = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: city,
            limit: 1,
            appid: token
        }
    });

    return data;
    // const url = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    // const url = new URL('https://api.openweathermap.org/geo/1.0/direct');
    // url.searchParams.append('q', city);
    // url.searchParams.append('limit', 1);
    // url.searchParams.append('appid', token);

    // https.get(url, res => {
    //     let result = '';
    //     res.on('data', chunk => {
    //         result += chunk;
    //     });

    //     res.on('end', () => {
    //         console.log(JSON.parse(result));
    //     });
    // })
}

const getWeather = async (city) => {
    // url.searchParams.append('units', 'metric');
    // url.searchParams.append('lang', 'ru');
}

export { getCity, getWeather };