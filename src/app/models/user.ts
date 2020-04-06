import { ObjectUnsubscribedError } from 'rxjs';
import { FFQClinician } from './ffqclinician';
import { FFQParent } from './ffqparent';
import { FFQAdmin } from './ffqadmin';

export class User {
  id: string;
  ffqclinician: FFQClinician;
  ffqparent: FFQParent;
  ffqadmin: FFQAdmin;
  userType: string;
  token: string;

  constructor(id: string, ffqclinician: FFQClinician, ffqparent: FFQParent, ffqadmin: FFQAdmin, userType: string, token: string) {
    this.id = id;
    this.ffqclinician = ffqclinician;
    this.ffqparent = ffqparent;
    this.ffqadmin = ffqadmin;
    this.userType = userType;
    this.token = token;
  }
}


