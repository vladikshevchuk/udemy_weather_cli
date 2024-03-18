#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printHelp, printSuccess, printError } from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан token');
        return;
    }
    try {
        await saveKeyValue('token', token);
        printSuccess('Токен сохранен')
    } catch (err) {
        printError(err.message);
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
    // Show weather
};

initCLI();