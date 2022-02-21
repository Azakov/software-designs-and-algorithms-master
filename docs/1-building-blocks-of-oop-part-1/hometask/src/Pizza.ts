import { Consumable } from './Consumable';

export class Pizza extends Consumable {
    private numberOfSlices: number = 0;
    private slicesEaten: number = 0;

    constructor(numberOfSlices: number, spoiled: boolean) {
        super('pizza', numberOfSlices, 30, spoiled);

        this.numberOfSlices = numberOfSlices;
    }

    public eat(): string {
        if (this.slicesEaten < this.numberOfSlices) {
            this.slicesEaten++;

            if (this.slicesEaten >= this.numberOfSlices) {
                this.setConsumed(true);
            }

            return 'You eat a slice of the pizza';
        } else {
            return '';
        }
    }
}