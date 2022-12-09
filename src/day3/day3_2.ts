import { existsSync, readFileSync } from "fs";
import { argv } from "process";

import { Item, alphabetLetter } from "./class/item";
import { Compartment } from "./class/compartment";
import { RuckSack } from "./class/rucksack";
import { RuckSackCollection } from "./class/ruckSackCollection";

let input: string = argv[2];
let data: string = "";

if (!existsSync(input)) {
    console.error("err: file does not exist")
} else {
    data = readFileSync(input).toString();
}

let lines: string[] = data.split(/\r?\n/);

let priorities: number = 0;

let ruckSackArray: RuckSack[] = [];

for (let i: number = 0; i < lines.length; i++) {
    let compartment1: Compartment = new Compartment([]);
    let compartment2: Compartment = new Compartment([]);
    for (let j: number = 0; j < lines[i].length/2; j++) {
        compartment1.addItem(new Item(lines[i][j] as alphabetLetter));
    }
    for (let j: number = lines[i].length/2; j < lines[i].length; j++) {
        compartment2.addItem(new Item(lines[i][j] as alphabetLetter));
    }
    let ruckSack: RuckSack = new RuckSack([compartment1, compartment2]);
    ruckSackArray.push(ruckSack);

    if ((i + 1) % 3 == 0) {
        let ruckSackCollection: RuckSackCollection = new RuckSackCollection(ruckSackArray);
        let item: Item | undefined = ruckSackCollection.getPriorityItem();
        if(item) {
            priorities += item.getPriority();
        }
        ruckSackArray = [];
    }
}

console.log(priorities);