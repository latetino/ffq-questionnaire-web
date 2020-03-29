import {FFQItemResponse} from './ffqitem-response';
import { ObjectUnsubscribedError } from 'rxjs';

export class FFQClinicianResponse {
  parentId: string;
  username: string;
  userpassword: string;
  firstname: string;
  lastname: string;
  assignedClinic: number;


  constructor(parentId: string, username: string, userpassword: string, firstname: string, lastname: string, assignedClinic: number) {
    this.parentId = parentId;
    this.username = username;
    this.userpassword = userpassword;
    this.firstname  = firstname;
    this.lastname = lastname;
    this.assignedClinic = assignedClinic;
  }

}
