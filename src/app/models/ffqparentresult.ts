import { FFQResultsResponse } from './ffqresultsresponse';

export class FFQParentResult {
   /* questionnaireId: string;
    userId: string;
    patientName: string;
    ageInMonths: number;
    userChoices: any;
    weeklyTotals: any;
    dailyAverages: any;
    show: boolean;*/
    ffqresult: FFQResultsResponse;
    parentName: string;

    constructor(ffqresult: FFQResultsResponse, parentName: string) {

      this.ffqresult = ffqresult;
      this.parentName = parentName;
    }
  }
