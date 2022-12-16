import { existsSync, readFileSync } from "fs";
import { argv } from "process";

// Lectura
let input: string = argv[2];
let data: string = "";

if (!existsSync(input)) {
  console.error("err: file does not exist")
} else {
  data = readFileSync(input).toString();
}

// Number of characters to check
let n: number = 4;

// Set of characters
let charactersSet: Set<string> = new Set<string>();

// Recorremos los datos leidos
for(let i: number = 0; i < data.length; i++) {
    let count: number = 0;
    while (count < n) {
        charactersSet.add(data[i + count]);
        count++;
    }
    if (charactersSet.size == n) {
        console.log(i + n);
        break;
    } else {
        charactersSet = new Set<string>();
    }
}