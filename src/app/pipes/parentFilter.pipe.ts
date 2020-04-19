import { Pipe, PipeTransform } from '@angular/core';
import { FFQParent } from 'src/app/models/ffqparent';

@Pipe({
  name: 'parentFilter'
})
export class ParentPipe implements PipeTransform {

  transform(list: FFQParent[], clinicId: any): any {
    if(clinicId === undefined)
    {
      return list;
    }
    return list.filter(function(user){
      console.log("users in pipe")
      console.log(user)
      return user.assignedclinic === clinicId;
    });
  }

}
