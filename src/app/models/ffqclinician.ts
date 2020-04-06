import {FFQItemResponse} from './ffqitem-response';
import { ObjectUnsubscribedError } from 'rxjs';

export class FFQClinician {
  userId: string;
  username: string;
  userpassword: string;
  role: string;
  firstname: string;
  lastname: string;
  assignedClinic: string;
  previousClinics: any;


  constructor(userId: string, username: string, userpassword: string, abbreviation: string, firstname: string, lastname: string, assignedClinic: string, previousClinics: any) {
    this.userId = userId;
    this.username = username;
    this.userpassword = userpassword;
    this.role = role;
    this.firstname = firstname;
    this.lastname = lastname;
    this.assignedClinic = assignedClinic;
    this.previousClinics = previousClinics
  }

}
