import { Item } from './item';
import { RuckSack } from "./rucksack";

export class RuckSackCollection {
    constructor(public ruckacks: RuckSack[]) {}
    getPriorityItem(): Item | undefined {
        if (this.ruckacks.length <= 1 ) {
            return undefined;
        } else {
            for (let i: number = 0; i < this.ruckacks[0].size(); i++) {
                let haveItem: boolean = true;
                for (let j: number = 1; j < this.ruckacks.length; j++) {
                    if (!this.ruckacks[j].haveItem(this.ruckacks[0].getItems()[i])) {
                        haveItem = false;
                        break;
                    }
                }
                if (haveItem) return this.ruckacks[0].getItems()[i];
            }
        }
        return undefined;
    }
}