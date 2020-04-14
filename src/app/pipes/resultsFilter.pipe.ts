import { Pipe, PipeTransform } from '@angular/core';
import { FFQParentResponse } from '../models/ffqparent-response';
import { ParentService } from 'src/app/services/parent/parent-service';
import { FFQParent } from 'src/app/models/ffqparent';
import { Observable } from 'rxjs';

@Pipe({
  name: 'resultsFilter'
})


export class ResultsPipe implements PipeTransform {

    parentNames: string[] = [];
    parentList: FFQParent[] = [];

    constructor(
        public parentService: ParentService,
    ){}
    

  transform(list: any, allParentNames: string[], term: any): any {
    if(term === undefined)
    {
      return list;
    }
    return list.filter(function(result){
      var patientName = result.patientName;
      var questId = result.questionnaireId;
      var parentName = allParentNames[result.parentId];
      return patientName.toLowerCase().includes(term.toLowerCase())
      || questId.toLowerCase().includes(term.toLowerCase())
      || parentName.toLowerCase().includes(term.toLowerCase());
    });
  }


}
