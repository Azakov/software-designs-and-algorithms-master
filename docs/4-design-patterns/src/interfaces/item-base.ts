export abstract class ItemBase {
    private price: number;

    constructor(currentPrice: number) {
        this.price = currentPrice;
    }

    getCost(weight: number): number {
        return this.price * weight;
    }
}