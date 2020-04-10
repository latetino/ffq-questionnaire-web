export class FFQResultsResponse {
    parentId: String;
    questionnaireId: String;
    userId: string;
    patientName: string;
    ageInMonths: number;
    userChoices: any;
    weeklyTotals: any;
    dailyAverages: any;
    show: boolean;

    constructor(id: string, userId: string, name: string, age: number, userChoices:any, weeklyTotals: Map<string, number>, dailyAverages: any) {
      this.questionnaireId = id;
      this.userId = userId;
      this.patientName = name;
      this.ageInMonths = age;
      this.userChoices = userChoices;
      this.weeklyTotals = weeklyTotals;
      this.dailyAverages = dailyAverages;
    }
/*
    public getWeekly(){
      return this.weeklyTotals;
    }
*/
  

  }
