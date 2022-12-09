
import { Item } from './item';

export class Compartment {
    constructor(public items: Item[]) {}
    addItem(item: Item): void {
        this.items.push(item);
    }
}
