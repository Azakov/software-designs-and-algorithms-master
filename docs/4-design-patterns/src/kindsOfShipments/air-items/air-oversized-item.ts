import { ItemBase } from '../../interfaces/item-base';

export class AirOversizedItem extends ItemBase {
    constructor(currentPrice: number) {
        super(currentPrice);
    }

    getCost(weight: number): number {
        return super.getCost(weight) + 10;
    }
}