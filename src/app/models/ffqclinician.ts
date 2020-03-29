import {FFQItemResponse} from './ffqitem-response';
import { ObjectUnsubscribedError } from 'rxjs';

export class FFQClinician {
  clinicianId: string;
  username: string;
  userpassword: string;
  firstname: string;
  lastname: string;
  assignedClinic: number;


  constructor(clinicianId: string, username: string, userpassword: string, firstname: string, lastname: string, assignedClinic: number) {
    this.clinicianId = clinicianId;
    this.username = username;
    this.userpassword = userpassword;
    this.firstname = firstname;
    this.lastname = lastname;
    this.assignedClinic = assignedClinic;
  }

}
