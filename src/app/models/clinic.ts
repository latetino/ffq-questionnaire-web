import { ObjectUnsubscribedError } from 'rxjs';

export class Clinic {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}