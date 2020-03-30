import { ObjectUnsubscribedError } from 'rxjs';

export class User {
  username: string;
  account_type: string;
  abbrev: string;
  name: string;
  assigned_clinician: string;
  clinic: string;

  constructor(username: string, account_type: string, abbrev: string, name: string, assigned_clinician: string, clinic: string) {
    this.username = username;
    this.account_type = account_type;
    this.abbrev = abbrev;
    this.name = name;
    this.assigned_clinician = assigned_clinician;
    this.clinic = clinic;
  }
}


