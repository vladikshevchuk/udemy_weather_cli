#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getCity, getIcon } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './services/storage.service.js';

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан token');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Токен сохранен')
    } catch (err) {
        printError(err.message);
    }
}

const saveSity = async (city) => {
    if (!city.length) {
        printError('Не передан город');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('Город сохранен')
    } catch (err) {
        printError(err.message);
    }
}

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getCity(city);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (err) {
        if (err?.response?.status == 404) {
            printError('Город не найден');
        } else if (err?.response?.status == 401) {
            printError('Нет доступа к данным, не верно указан токен')
        } else {
            printError(err.message);
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    
    if (args.h) {
        return printHelp();
    };
    if (args.s) {
        return saveSity(args.s);
    };
    if (args.t) {
        return saveToken(args.t);
    };
    return getForcast();
};

initCLI();