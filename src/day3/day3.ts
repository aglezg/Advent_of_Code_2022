import { existsSync, readFileSync } from "fs";
import { argv } from "process";

import { Item, alphabetLetter } from "./class/item";
import { Compartment } from "./class/compartment";
import { RuckSack } from "./class/rucksack";

let input: string = argv[2];
let data: string = "";

if (!existsSync(input)) {
    console.error("err: file does not exist")
} else {
    data = readFileSync(input).toString();
}

let lines: string[] = data.split(/\r?\n/);

let priorities: number = 0;

lines.forEach((line: string) => {
    let compartment1: Compartment = new Compartment([]);
    let compartment2: Compartment = new Compartment([]);
    for (let i: number = 0; i < line.length/2; i++) {
        compartment1.addItem(new Item(line[i] as alphabetLetter));
    }
    for (let i: number = line.length/2; i < line.length; i++) {
        compartment2.addItem(new Item(line[i] as alphabetLetter));
    }
    let ruckSack: RuckSack = new RuckSack([compartment1, compartment2]);

    let priorityItem: Item | undefined = ruckSack.getPriorityItem();
    if (priorityItem) {
        priorities += priorityItem.getPriority();
    }
});

console.log(priorities);