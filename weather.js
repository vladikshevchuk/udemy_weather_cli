#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getCity } from './services/api.service.js';
import { printHelp, printSuccess, printError } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

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

const getForcast = async () => {
    try {
        const weather = await getCity('london');
        console.log(weather);
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
        printHelp();
    };
    if (args.s) {
        // Save sity
    };
    if (args.t) {
        return saveToken(args.t)
    };
    getForcast();
};

initCLI();