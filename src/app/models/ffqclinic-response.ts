import {FFQItemResponse} from './ffqitem-response';
import { ObjectUnsubscribedError } from 'rxjs';

export class FFQClinicResponse {
  id: string;
  clinicId: string;
  address: string;
  datebuilt: string;
  clinicname: string
  headclinician: string;
  isactive: boolean;


  constructor(clinicId: string, address: string, datebuilt: string, clinicname: string, headclinician: string, isactive: boolean, ) {
    this.clinicId = clinicId;
    this.address = address;
    this.datebuilt = datebuilt;
    this.clinicname = clinicname;
    this.headclinician = headclinician;
    this.isactive = isactive;
  }


}
