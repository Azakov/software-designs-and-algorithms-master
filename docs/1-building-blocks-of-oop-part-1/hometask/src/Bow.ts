import { Weapon } from './Weapon';

export class Bow extends Weapon {
    constructor(
        baseDamage: number,
        baseDurability: number,
        value: number,
        weight: number
    ) {
        super('bow', baseDamage, baseDurability, value, weight);
    }

    polish(): void {
        if (this.getDurability() + this.MODIFIER_CHANGE_RATE < 1) {
            
            const newDurabilityModifier = this.durabilityModifier + this.MODIFIER_CHANGE_RATE;
            this.setDurabilityModifier(newDurabilityModifier);
        } else {
            this.setDurabilityModifier(1 - this.baseDurability);
        }
    }

}