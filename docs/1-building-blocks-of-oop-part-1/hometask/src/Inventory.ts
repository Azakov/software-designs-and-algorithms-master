import { Item } from './Item';
import { ItemComparator } from './ItemComparator';

export class Inventory {
    private items: Item[] = [];

    constructor() {}

    public addItem(item: Item): void {
        this.items.push(item);
    }
    
    public sort(comparator?: ItemComparator): void {
        if (!comparator) {
            this.items.sort((x,y) => x.compareTo(y));
        } else {
            this.items.sort(comparator.compare);
        }
    }

    public toString() {
        return this.items.join(', ');
    }
}