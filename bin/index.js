#!/usr/bin/env node
"use strict";

require("make-promises-safe");

// Require Third-party Dependencies
const sade = require("sade");
const { get } = require("httpie");
const { red, cyan, white, green } = require("kleur");
const prettyjson = require("prettyjson");
const Spinner = require("@slimio/async-cli-spinner");

// CONSTANTS
const NPM_REGISTRY = new URL("https://registry.npmjs.org");

sade("npmreg <packageName> [version]", true)
    .version("1.0.0")
    .describe("Search for a given package in the npm registry (and return the raw data)")
    .example("npmreg httpie")
    .example("npmreg @slimio/is latest")
    .action(main)
    .parse(process.argv);

/**
 * @async
 * @function main
 * @param {!string} packageName
 * @param {string} [version]
 * @returns {Promise<void>}
 */
async function main(packageName, version) {
    console.log("");
    const verDefined = typeof version === "string";
    const spin = new Spinner({
        prefixText: white().bold(`Searching for '${cyan().bold(packageName)}' on the npm registry`)
    }).start("");

    try {
        const uri = new URL(`${packageName}/${verDefined ? version : ""}`, NPM_REGISTRY);
        const { data } = await get(uri);
        if (!verDefined) {
            delete data.versions;
        }

        const elapsedTime = green().bold(`${spin.elapsedTime.toFixed(2)}ms`);
        spin.succeed(white().bold(`Successfully fetched in ${elapsedTime}\n`));
        console.log(prettyjson.render(data));
    }
    catch (err) {
        spin.failed(red().bold(`Failed to fetch JSON payload for package ${white().bold(packageName)}`));
        console.error(err);
    }
}
