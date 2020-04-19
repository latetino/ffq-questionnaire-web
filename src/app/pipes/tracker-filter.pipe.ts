import { Pipe, PipeTransform } from '@angular/core';
import { TrackerParentResultsResponse } from '../models/ffqparentresulttracker';

@Pipe({
  name: 'trackerFilter'
})
export class TrackerFilterPipe implements PipeTransform {

 
  transform(list: any, resultMap: Map<string, TrackerParentResultsResponse>, term: any): any {
    if(term === undefined)
    {
      return list;
    }
    return list.filter(function(result){
      console.log("tracker")
      console.log(result)
      var parentName = resultMap.get(result.ffqtracker.userId).parentName;
      console.log("parentName")
      console.log(parentName)
      return parentName.toLowerCase().includes(term.toLowerCase());
    });
  }

}
