import { Weapon } from './Weapon';

export class Sword extends Weapon {
    constructor(
        baseDamage: number,
        baseDurability: number,
        value: number,
        weight: number
    ) {
        super('sword', baseDamage, baseDurability, value, weight);
    }

    polish(): void {
        const newDamageModifier = Math.min(
            this.damageModifier + this.MODIFIER_CHANGE_RATE,
            this.baseDamage * 0.25
        )

        this.setDamageModifier(newDamageModifier);
    }

}