import { Comparable } from './Comparable';

let counter = 0;

export abstract class Item implements Comparable<Item> {
    private id: number;

    static get numberOfItems(): number {
        return counter;
    };

    static set numberOfItems(newCounter: number) {
        counter = newCounter;
    };

    static reset(): void {
        counter = 0;
    }

    constructor(
        private name: string,
        private value: number,
        private weight: number
    ) {
        this.id = Item.numberOfItems;
        Item.numberOfItems++;
    }


    public compareTo(other: Item): number {
        if (this.value > other.getValue()) {
            return 1;
        } else if (this.value < other.getValue()) {
            return -1;
        } else if (this.value === other.getValue()) {
            return this.name.toLowerCase().localeCompare(other.getName().toLowerCase());
        }
    }

    public getId(): number {
        return this.id;
    };

    public getValue(): number {
        return this.value;
    };
    public getName(): string {
        return this.name;
    };

    public getWeight(): number {
        return this.weight;
    };

    public setValue(price: number): void {
        this.value = price;
    };

    public setName(name: string): void {
        this.name = name;
    };

    public setWeight(weight: number): void {
        this.weight = weight;
    };


    public toString(): string {
        return `${this.name} − Value: ${this.value}, Weight: ${this.weight.toFixed(2)}`;
    }

    abstract use(): void;
}
