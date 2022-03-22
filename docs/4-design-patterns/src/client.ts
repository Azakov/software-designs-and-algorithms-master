import { Marks } from './interfaces/marks.type';
import { IShipmentState } from './interfaces/shipment-state.interface';
import { Shipment } from './shipment';

export class Client {
    private static instance: Client;

    private constructor(private guiState: IShipmentState, private marks?: Marks[]) { }

    static getInstance(guiState: IShipmentState, marks?: Marks[]) {
        if (!Client.instance) {
            Client.instance = new Client(guiState, marks);
        }

        return Client.instance;
    }

    toShip() {
        const shipment = new Shipment(this.guiState);

        return `${shipment.toShip()} \n
                ${this.getMarksString()}
                `.trim();
    }

    private getMarksString(): string {
        if (!this.marks) {
            return '';
        }

        if (!this.marks.length) {
            return '';
        }

        let resultString = '';

        this.marks.forEach((mark: Marks) => {
            resultString = resultString.concat(this.switchMarkString(mark))
        })

        return resultString;
    }

    private switchMarkString(mark: Marks): string {
        if (mark === 'FRAGILE') {
            return '**MARK FRAGILE**';
        } else if (mark === 'DO NOT LEAVE AT HOME') {
            return '**MARK DO NOT LEAVE IF ADDRESS NOT AT HOME**';
        } else if (mark === 'RETURN RECEIPT REQUESTED') {
            return '**MARK RETURN RECEIPT REQUESTED**';
        } else {
            return '';
        }
    }

}


const a = {
    ShipmentID: 1,
    ToAddress: 'eqqwe',
    FromAddress: 'dasdsad',
    ToZipCode: '12345',
    FromZipCode: '54353',
    Weight: 55,
  };

const b = Client.getInstance(a)
console.log(b.toShip());