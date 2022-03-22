import { ItemBase } from './item-base';

export interface IShipperBase {
    getLetter(): ItemBase;
    getPackage(): ItemBase;
    getOversized(): ItemBase;
}