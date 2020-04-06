import {FFQItemResponse} from './ffqitem-response';
import { ObjectUnsubscribedError } from 'rxjs';

export class FFQParentResponse {
  userId: string;
  username: string;
  userpassword: string;
  firstname: string;
  lastname: string;
  assignedClinic: number;
  assignedClinician: string;
  childrenNames: any;
  assignedClinic: string;


  constructor(userId: string, username: string, userpassword: string, firstname: string, lastname: string, assignedClinic: string, assignedClinician: string, childrenNames: any) {
    this.userId = userId;
    this.username = username;
    this.userpassword = userpassword;
    this.firstname = firstname;
    this.lastname = lastname;
    this.assignedClinic = assignedClinic;
    this.assignedClinician = assignedClinician;
    this.childrenNames = childrenNames
  }

}
