import { ObjectUnsubscribedError } from 'rxjs';
import { FFQClinician } from './ffqclinician';
import { FFQParent } from './ffqparent';
import { FFQAdmin } from './ffqadmin';

export class User {
  id: string;
  username: string;
  userpassword: string;
  userType: string;
  token?: string;

  constructor(id: string, username: string, userpassword: string, userType: string, token?: string) {
    this.id = id;
    this.username = username;
    this.userpassword = userpassword;
    this.userType = userType;
    this.token = token;
  }
}


