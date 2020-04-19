import { Pipe, PipeTransform } from '@angular/core';
import { FFQParentResult } from '../models/ffqparentresult';

@Pipe({
  name: 'recommendedFilter'
})
export class RecommendedFilterPipe implements PipeTransform {

  transform(list: any, resultMap: Map<string, FFQParentResult>, term: any): any {
    if(term === undefined)
    {
      return list;
    }
    return list.filter(function(result){
      console.log("result in pipe")
      console.log(result)
    
      var questId = result.ffqresult.questionnaireId;
      var parentName = resultMap.get(result.ffqresult.userId).parentName;
      console.log("parentName in pipe")
      console.log(parentName)
      return questId.toLowerCase().includes(term.toLowerCase())
      || parentName.toLowerCase().includes(term.toLowerCase());
    });
  }


}
