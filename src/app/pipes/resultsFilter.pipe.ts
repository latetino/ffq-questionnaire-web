import { Pipe, PipeTransform } from '@angular/core';
import { FFQParent } from '../models/ffqparent';
import { ParentService } from '../services/parent/parent-service';
import { FFQParentResult } from '../models/ffqparentresult';
import { TrackerParentResultsResponse } from '../models/ffqparentresulttracker';
// import { FFQParentResponse } from '../models/ffqparent-response';
// import { ParentService } from 'src/app/services/parent/parent-service';
// import { FFQParent } from 'src/app/models/ffqparent';
// import { Observable } from 'rxjs';

@Pipe({
  name: 'resultsFilter'
})


export class ResultsPipe implements PipeTransform {

   // parentNames: string[] = [];
  //  parentList: FFQParent[] = [];
    // ffqparent: FFQParent;
    //  constructor(
    //      private parentService: ParentService
    //  ){}
    

  transform(list: any, resultMap: Map<string, FFQParentResult>, term: any): any {
    if(term === undefined)
    {
      return list;
    }
    return list.filter(function(result){
      var patientName = result.ffqresult.patientName;
      var questId = result.ffqresult.questionnaireId;
      var parentName = resultMap.get(result.ffqresult.userId).parentName;

      return patientName.toLowerCase().includes(term.toLowerCase())
      || questId.toLowerCase().includes(term.toLowerCase())
      || parentName.toLowerCase().includes(term.toLowerCase());
    });
  }


}
