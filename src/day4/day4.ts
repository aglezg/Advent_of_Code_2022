import { existsSync, readFileSync } from "fs";
import { argv } from "process";

let input: string = argv[2];
let data: string = "";

if (!existsSync(input)) {
    console.error("err: file does not exist")
} else {
    data = readFileSync(input).toString();
}

let lines: string[] = data.split(/\r?\n/);

