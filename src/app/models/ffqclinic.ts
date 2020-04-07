import {FFQItemResponse} from './ffqitem-response';
import { ObjectUnsubscribedError } from 'rxjs';

export class FFQClinic {
  clinicId: string;
  address: string;
  datebuilt: string;
  clinicName: string
  headclinician: string;
  isActive: boolean;


  constructor(clinicId: string, address: string, datebuilt: string, clinicName: string, headclinician: string, isActive: boolean, ) {
    this.clinicId = clinicId;
    this.address = address;
    this.datebuilt = datebuilt;
    this.clinicName = clinicName;
    this.headclinician = headclinician;
    this.isActive = isActive;
  }

}
