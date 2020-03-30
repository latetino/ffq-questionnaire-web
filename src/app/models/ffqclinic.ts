import {FFQItemResponse} from './ffqitem-response';
import { ObjectUnsubscribedError } from 'rxjs';

export class FFQClinic {
  cliniciId: number;
  address: string;
  datebuilt: string;
  clinicname: string


  constructor(cliniciId: number, address: string, datebuilt: string, clinicname: string) {
    this.cliniciId = cliniciId;
    this.address = address;
    this.datebuilt = datebuilt;
    this.clinicname = clinicname;
  }

}
