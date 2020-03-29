import {FFQItemResponse} from './ffqitem-response';
import { ObjectUnsubscribedError } from 'rxjs';

export class FFQUserResponse {
  userId: string;
  username: string;
  userpassword: string;
  firstname: string;
  lastname: string;
  isAdmin: boolean;


  constructor(userId: string, username: string, userpassword: string, firstname: string, lastname: string, isAdmin: boolean) {
    this.userId = userId;
    this.username = username;
    this.userpassword = userpassword;
    this.firstname = firstname;
    this.lastname = lastname;
    this.isAdmin = isAdmin;
  }

}
