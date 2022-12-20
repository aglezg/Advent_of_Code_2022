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

class Map {
  constructor(public matrix: number[][]) {}

  isVisible(i: number, j: number) {

  }
}