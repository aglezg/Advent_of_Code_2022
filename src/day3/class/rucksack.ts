import { Compartment } from "./compartment";
import { Item } from './item';


export class RuckSack {
    constructor(public compartments: [Compartment, Compartment]) {}
    getPriorityItem(): Item | undefined {
        for (let i: number = 0; i < this.compartments[0].items.length; i++) {
            let j: number = 0;
            while(j < this.compartments[1].items.length) {
                if (this.compartments[0].items[i].value == this.compartments[1].items[j].value) {
                    return this.compartments[0].items[i];
                }
                j++;
            }
        }
        return undefined;
    }

    getItems(): Item[] {
        let items: Item[] = [];
        this.compartments[0].items.forEach((item: Item) => {
            items.push(item);
        });
        this.compartments[1].items.forEach((item: Item) => {
            items.push(item);
        });
        return items;
    }

    size(): number {
        return this.getItems().length;
    }

    haveItem(item: Item): boolean {
        for (let i: number = 0; i < this.size(); i++) {
            if (this.getItems()[i].value == item.value) {
                return true;
            }
        }
        return false;
    }
}