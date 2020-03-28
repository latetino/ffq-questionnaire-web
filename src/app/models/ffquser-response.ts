import {FFQItemResponse} from './ffqitem-response';
import { ObjectUnsubscribedError } from 'rxjs';

export class FFQUserResponse {
  userId: string;
  username: string;
  userpassword: string;
  isEnabled: boolean;
  isClinician: boolean;
  isParent: boolean;
  isAdmin: boolean;


  constructor(userId: string, username: string, userpassword: string, isEnabled: boolean, isClinician: boolean, isParent: boolean, isAdmin: boolean) {
    this.userId = userId;
    this.username = username;
    this.userpassword = userpassword;
    this.isEnabled = isEnabled;
    this.isClinician = isClinician;
    this.isParent = isParent;
    this.isAdmin = isAdmin;
  }

}
