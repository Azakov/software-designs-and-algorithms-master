import { Item } from './Item';

export abstract class Consumable extends Item {
    private consumed: boolean = false;
    private spoiled: boolean = false;

    constructor(
        name: string,
        value: number,
        weight: number,
        spoiled: boolean
    ) {
        super(name, value, weight);

        this.spoiled = spoiled;
    }

    public isConsumed(): boolean {
        return this.consumed;
    }

    public setConsumed(consumed: boolean): void {
        this.consumed = consumed;
    }

    public isSpoiled(): boolean {
        return this.spoiled;
    }

    public toString(): string {
        return `${super.toString()}, Consumed: ${this.isConsumed()}, Spoiled: ${this.isSpoiled()}`;
    }

    public use(): string {
        if (this.isConsumed()) {
            return `There is nothing left of the ${this.getName()} to consume.`;
        } else {
            return this.eat();
        }
    }

    public eat(): string {
        if (this.isSpoiled()) {
            return `You eat the ${this.getName()}.
            You feel sick.`;
        } else {
            return `You eat the ${this.getName()}.`;
        }
    }
}