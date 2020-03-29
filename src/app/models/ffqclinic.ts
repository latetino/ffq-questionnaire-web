import {FFQItemResponse} from './ffqitem-response';
import { ObjectUnsubscribedError } from 'rxjs';

export class FFQClinic {
  cliniciId: string;
  address: string;
  dateBuilt: string;


  constructor(cliniciId: string, address: string, dateBuilt: string) {
    this.cliniciId = cliniciId;
    this.address = address;
    this.dateBuilt = dateBuilt;
  }

}
