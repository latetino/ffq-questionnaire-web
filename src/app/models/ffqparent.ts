import {FFQItemResponse} from './ffqitem-response';
import { ObjectUnsubscribedError } from 'rxjs';

export class FFQParent {
  userId: string;
  username: string;
  userpassword: string;
  usertype: string;
  firstname: string;
  lastname: string;
  assignedClinic: string;
  assignedClinician: string;
  childrenNames: any;


  constructor(userId: string, username: string, userpassword: string, usertype:string, firstname: string, lastname: string, assignedClinic: string, assignedClinician: string, childrenNames: any) {
    this.userId = userId;
    this.username = username;
    this.userpassword = userpassword;
    this.usertype = usertype;
    this.firstname = firstname;
    this.lastname = lastname;
    this.assignedClinic = assignedClinic;
    this.assignedClinician = assignedClinician;
    this.childrenNames = childrenNames
  }

}
