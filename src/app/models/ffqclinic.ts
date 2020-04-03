import {FFQItemResponse} from './ffqitem-response';
import { ObjectUnsubscribedError } from 'rxjs';

export class FFQClinic {
  clinicId: number;
  address: string;
  datebuilt: string;
  clinicname: string
  headclinician: string;
  isActive: boolean;


  constructor(cliniciId: number, address: string, datebuilt: string, clinicname: string, headclinician: string, isActive: boolean, ) {
    this.cliniciId = cliniciId;
    this.address = address;
    this.datebuilt = datebuilt;
    this.clinicname = clinicname;
    this.headclinician = headclinician;
    this.isActive = isActive;
  }

}
