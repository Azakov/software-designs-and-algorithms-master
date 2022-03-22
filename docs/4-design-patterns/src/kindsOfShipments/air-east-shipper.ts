import { IShipperBase } from '../interfaces/shipper-base.interface';
import { AirLetterItem } from './air-items/air-letter-item';
import { AirOversizedItem } from './air-items/air-oversized-item';
import { AirPackageItem } from './air-items/air-package-item';

export class AirEastShipper implements IShipperBase {
    getLetter() {
        return new AirLetterItem(0.39);
    }
    getPackage() {
        return new AirPackageItem(0.25);
    }
    getOversized() {
        return new AirOversizedItem(0.25);
    }

}
