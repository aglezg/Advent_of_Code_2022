import { existsSync, readFileSync } from "fs";
import { argv } from "process";

// Read input content
let input: string = argv[2];
let lines: string[] = [];

if (!existsSync(input)) {
    console.error('err: file does not exist');
} else {
    lines = readFileSync(input).toString().split(/\r?\n/);
}