import { Pipe, PipeTransform } from '@angular/core';
import { FFQClinician } from 'src/app/models/ffqclinician';

@Pipe({
  name: 'clinicianFilter'
})
export class ClinicianPipe implements PipeTransform {

  transform(list: FFQClinician[], clinicId: any): any {
    if(clinicId === undefined)
    {
      return list;
    }
    return list.filter(function(user){
      return user.assignedclinic === clinicId;
    });
  }

}
