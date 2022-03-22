import { IShipperBase } from '../interfaces/shipper-base.interface';
import { PacificLetterItem } from './pacific-items/pacific-letter-item';
import { PacificOversizedItem } from './pacific-items/pacific-oversized-item';
import { PacificPackageItem } from './pacific-items/pacific-package-item';

export class PacificParcelShipper implements IShipperBase {
    getLetter() {
        return new PacificLetterItem(0.51);
    }
    getPackage() {
        return new PacificPackageItem(0.19);
    }
    getOversized() {
        return new PacificOversizedItem(0.21);
    }

}
