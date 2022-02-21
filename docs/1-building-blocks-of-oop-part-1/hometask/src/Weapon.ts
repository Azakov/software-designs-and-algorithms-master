import { Item } from './Item';

export abstract class Weapon extends Item {
    protected MODIFIER_CHANGE_RATE: number = 0.05;
    protected damageModifier: number = 0;
    protected durabilityModifier: number = 0;
    
    protected usedDurability = 0;

    constructor(
        name: string,
        protected baseDamage: number,
        protected baseDurability: number,
        value: number,
        weight: number
    ) {
        super(name, value, weight);
    }

    public use(): string {
        if (this.getDurability() <= 0) {
            return `You can't use the ${this.getName()}, it is broken.`;
        } else {
            this.usedDurability += this.MODIFIER_CHANGE_RATE;
            if (this.getDurability() <= 0) {
                return `${this.getUseString} The ${this.getName()} breaks.`;
            }

            return this.getUseString();
        }

    }

    public toString(): string {
        return `${super.toString()}, Damage: ${this.getDamage().toFixed(2)}, Durability: ${(this.getDurability() * 100).toFixed(2)}%`;
    }

    protected getDamage(): number {
        return this.baseDamage + this.damageModifier;
    }

    protected getDurability(): number {
        return this.baseDurability + this.durabilityModifier - this.usedDurability;
    }

    protected setDamageModifier(newDamageModifier: number) {
        this.damageModifier = newDamageModifier;
    }

    protected setDurabilityModifier(newDurabilityModifier: number) {
        this.durabilityModifier = newDurabilityModifier;
    }

    private getUseString(): string {
        return `You use the ${this.getName()}, dealing ${this.getDamage().toFixed(2)} points of damage.`;
    }

    abstract polish(): void;
}