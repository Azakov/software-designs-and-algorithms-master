import { IShipperBase } from '../interfaces/shipper-base.interface';
import { ChicagoLetterItem } from './chicago-items/chicago-letter-item';
import { ChicagoOversizedItem } from './chicago-items/chicago-oversized-item';
import { ChicagoPackageItem } from './chicago-items/chicago-package-item';

export class ChicagoSprintShipper implements IShipperBase {
    getLetter() {
        return new ChicagoLetterItem(0.42);
    }
    getPackage() {
        return new ChicagoPackageItem(0.2);
    }
    getOversized() {
        return new ChicagoOversizedItem(0.2);
    }

}
