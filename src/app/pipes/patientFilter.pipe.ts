import { Pipe, PipeTransform } from '@angular/core';
import { FFQParent } from 'src/app/models/ffqparent';

@Pipe({
  name: 'patientFilter'
})
export class PatientPipe implements PipeTransform {

  transform(list: FFQParent[], username: any): any {
    if(username === undefined)
    {
      return list;
    }
    return list.filter(function(user){
      return user.assignedclinician === username;
    });
  }
}
