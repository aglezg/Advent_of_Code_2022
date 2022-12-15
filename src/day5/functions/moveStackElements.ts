import { Stack } from 'stack-typescript';

export type crate = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" 
| "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" 
| "Y" | "Z";

export function moveStackElements(stack1: Stack<crate>, stack2: Stack<crate>, n: number, newVersion: boolean = false): void {
  if (newVersion == false) {
    for (let i: number = 0; i < n; i++) {
      if (stack1.length != 0) {
        stack2.push(stack1.top);
        stack1.pop();
      } else {
        console.log('error: empty stack...');
        break;
      }
    }
  } else {
    let stackVector: crate[] = [];
    for (let i: number = 0; i < n; i++) {
      if (stack1.length != 0) {
        stackVector.unshift(stack1.pop());
      } else {
        console.log('error: empty stack...');
        break;
      }
    }
    stackVector.forEach((element: crate) => {
      stack2.push(element);
    })
  }
}