import {FFQItemResponse} from './ffqitem-response';
import { ObjectUnsubscribedError } from 'rxjs';

export class FFQParentResponse {
  parentId: string;
  username: string;
  userpassword: string;
  firstname: string;
  lastname: string;
  assignedClinician: string;


  constructor(parentId: string, username: string, userpassword: string, firstname: string, lastname: string, assignedClinician: string) {
    this.parentId = parentId;
    this.username = username;
    this.userpassword = userpassword;
    this.firstname  = firstname;
    this.lastname = lastname;
    this.assignedClinician = assignedClinician;
  }

}
