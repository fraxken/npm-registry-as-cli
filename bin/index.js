#!/usr/bin/env node
"use strict";

require("make-promises-safe");

// Require Third-party Dependencies
const sade = require("sade");
const { get } = require("httpie");
const { red, gray, cyan, white } = require("kleur");
const prettyjson = require("prettyjson");

// CONSTANTS
const NPM_REGISTRY = new URL("https://registry.npmjs.org");

sade("npmreg <packageName> [version]", true)
    .version("1.0.0")
    .action(async(packageName, version) => {
        console.log(gray().bold(`\n > search for package ${cyan().bold(packageName)} in the npm registry!\n`));
        const verDefined = typeof version === "string";

        try {
            const uri = new URL(`${packageName}/${verDefined ? version : ""}`, NPM_REGISTRY);
            const { data } = await get(uri);
            if (!verDefined) {
                delete data.versions;
            }
            console.log(prettyjson.render(data));
        }
        catch (err) {
            console.log(red().bold(`Failed to fetch JSON payload for package ${white().bold(packageName)}`));
        }
    })
    .parse(process.argv);
