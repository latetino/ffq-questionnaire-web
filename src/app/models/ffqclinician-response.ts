import {FFQItemResponse} from './ffqitem-response';
import { ObjectUnsubscribedError } from 'rxjs';

export class FFQClinicianResponse {
  id: string;
  userId: string;
  username: string;
  userpassword: string;
  usertype: string;
  abbreviation: string;
  firstname: string;
  lastname: string;
  assignedclinic: string;
  previousclinics: any;


  constructor(userId: string, username: string, userpassword: string, usertype:string, abbreviation: string, firstname: string,
               lastname: string, assignedclinic: string, previousclinics: any) {
    this.userId = userId;
    this.username = username;
    this.userpassword = userpassword;
    this.usertype = usertype;
    this.abbreviation = abbreviation;
    this.firstname = firstname;
    this.lastname = lastname;
    this.assignedclinic = assignedclinic;
    this.previousclinics = previousclinics
  }

}
