#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";

const initCLI = () => {
    const  args = getArgs(process.argv);
    console.log(args);
    if (args.h) {
        // Show help
    };
    if (args.s) {
        // Save sity
    };
    if (args.t) {
        // Save tokken
    };
    // Show weather
};

initCLI();