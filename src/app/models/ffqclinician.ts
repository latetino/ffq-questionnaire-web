import {FFQItemResponse} from './ffqitem-response';
import { ObjectUnsubscribedError } from 'rxjs';

export class FFQClinician {
  userId: string;
  username: string;
  userpassword: string;
  firstname: string;
  lastname: string;
  assignedClinic: number;


  constructor(userId: string, username: string, userpassword: string, firstname: string, lastname: string, assignedClinic: number) {
    this.userId = userId;
    this.username = username;
    this.userpassword = userpassword;
    this.firstname = firstname;
    this.lastname = lastname;
    this.assignedClinic = assignedClinic;
  }

}
