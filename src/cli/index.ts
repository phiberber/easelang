#!/usr/bin/env -S node -r tsconfig-paths/register -r "ts-node/register"
import * as info from "/package.json"
import {evaluate} from "@/Ease";
import * as fs from "fs"

if (process.argv.length > 2) {
    const options = process.argv.slice(2)
    const hasOption = (name) => options.indexOf(`-${name}`) !== -1
    const fileName = process.argv[2]
    const fileContent = fs.readFileSync(fileName)
    evaluate(fileContent.toString(), undefined, {logs: hasOption("l"), debug: hasOption("d")})
} else console.log(`Ease ${info.version}\nUsage: ease <file>`);