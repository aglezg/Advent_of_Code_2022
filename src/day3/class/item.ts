export type alphabetLetter = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" 
| "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" 
| "y" | "z" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" 
| "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" 
| "Y" | "Z";

const alphabet: string = "abcdefghijklmnopqrstuvwxyz";

export class Item {
    constructor(public value: alphabetLetter) {}
    getPriority(): number {
        if (this.value == this.value.toLowerCase()) {
            return alphabet.indexOf(this.value) + 1;
        } else {
            return alphabet.indexOf(this.value.toLowerCase()) + 27;
        }
    }
}