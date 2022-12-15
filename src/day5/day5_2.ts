import { existsSync, readFileSync } from "fs";
import { argv } from "process";
import { Stack } from 'stack-typescript';
import { crate, moveStackElements } from "./functions/moveStackElements";

// Lectura de la pila
let input: string = argv[2];
let lines: string[] = [];

if (!existsSync(input)) {
  console.error("err: file does not exist")
} else {
  lines = readFileSync(input).toString().split(/\r?\n/);
}

let stackVector: Stack<crate>[] = [];

lines.forEach((line: string) => {
  let stack: Stack<crate> = new Stack<crate>();
  line.split(' ').forEach((crate: string) => {
    stack.push(crate as crate);
  });
  stackVector.push(stack);
});

// Lectura del fichero de movimientos
input = argv[3];

if (!existsSync(input)) {
  console.error("err: file does not exist")
} else {
  lines = readFileSync(input).toString().split(/\r?\n/);
}

// Cálculo
lines.forEach((line: string) => {
  let lineVector: string[] = line.split(' ');
  let origin: number = +lineVector[3] - 1;
  let destiny: number = +lineVector[5] - 1;
  let n: number = +lineVector[1];
  moveStackElements(stackVector[origin], stackVector[destiny], n , true);
});


// Calculo del top de cada pila
let result: string = "";
stackVector.forEach((stack: Stack<crate>) => {
  result += stack.top;
});

console.log(result);