import {FFQItemResponse} from './ffqitem-response';
import { ObjectUnsubscribedError } from 'rxjs';

export class FFQParent {
  userId: string;
  username: string;
  userpassword: string;
  firstname: string;
  lastname: string;
  assignedClinician: string;
  childrenNames: any;


  constructor(userId: string, username: string, userpassword: string, firstname: string, lastname: string, assignedClinician: string, childrenNames: any) {
    this.userId = userId;
    this.username = username;
    this.userpassword = userpassword;
    this.firstname = firstname;
    this.lastname = lastname;
    this.assignedClinician = assignedClinician;
    this.childrenNames = childrenNames
  }

}
