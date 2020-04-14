import {FFQItemResponse} from './ffqitem-response';
import { ObjectUnsubscribedError } from 'rxjs';

export class FFQParent {
  id: string;
  userId: string;
  username: string;
  userpassword: string;
  usertype: string;
  firstname: string;
  lastname: string;
  assignedclinic: string;
  assignedclinician: string;
  childrennames: any;


  constructor(userId: string, username: string, userpassword: string, usertype:string, firstname: string, 
              lastname: string, assignedclinic: string, assignedclinician: string, childrennames: any) {
    this.userId = userId;
    this.username = username;
    this.userpassword = userpassword;
    this.usertype = usertype;
    this.firstname = firstname;
    this.lastname = lastname;
    this.assignedclinic = assignedclinic;
    this.assignedclinician = assignedclinician;
    this.childrennames = childrennames;
  }

}
