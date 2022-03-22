import { ItemBase } from './interfaces/item-base';
import { IShipmentState } from './interfaces/shipment-state.interface';
import { IShipperBase } from './interfaces/shipper-base.interface';
import { AirEastShipper } from './kindsOfShipments/air-east-shipper';
import { ChicagoSprintShipper } from './kindsOfShipments/chicago-sprint-shipper';
import { PacificParcelShipper } from './kindsOfShipments/pacific-parcel-shipper';

export class Shipment {
    private static shipmentId = 0;
    private currentShipper: IShipperBase;

    constructor(private shipmentState: IShipmentState) {
        this.setCurrentShipment();
    }

    getShipmentId(): number {
        Shipment.shipmentId++;

        return this.shipmentState.ShipmentID || Shipment.shipmentId;
    }

    toShip(): string {
        return `
        Shipment with the ID ${this.shipmentState.ShipmentID} will be picked up from ${this.shipmentState.FromAddress} ${this.shipmentState.FromZipCode} and shipped to ${this.shipmentState.ToAddress} OK ${this.shipmentState.ToZipCode}
        Cost = ${this.getCost()}
        `
    }

    private getCost(): number {
        return this.getShipItem().getCost(this.shipmentState.Weight);
    }

    private setCurrentShipment(): void {
        if (/^[1-3]/.test(this.shipmentState.FromZipCode)) {
            this.currentShipper = new AirEastShipper();
        } else if (/^[4-6]/.test(this.shipmentState.FromZipCode)) {
            this.currentShipper = new ChicagoSprintShipper();
        } else {
            this.currentShipper = new PacificParcelShipper();
        }
    }


    private getShipItem(): ItemBase {
        if (this.shipmentState.Weight <= 15) {
            return this.currentShipper.getLetter();
        } else if (this.shipmentState.Weight <= 160) {
            return this.currentShipper.getPackage();
        } else {
            return this.currentShipper.getOversized();
        }
    }
}