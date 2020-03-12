import { FFQFoodItem } from './ffqfooditem';
import { FFQNutrientlist } from './ffqnutrientlist';
import { FFQItemInput } from './ffqitem-input';
import { FoodType } from './ffqitem-response';

export class FFQResultsResponse {
    questionnaireId: String;
    patientName: string;
    ageInMonths: number;
    userChoices: any;
    weeklyTotals: any;  
    dailyAverages: any;
    show: boolean;
  
    constructor(id: string, name: string, age: number, userChoices:any, weeklyTotals: Map<string, number>, dailyAverages: any) {
      this.questionnaireId = id;
      this.patientName = name;
      this.ageInMonths = age;
      this.userChoices = userChoices;
      this.weeklyTotals = weeklyTotals;
      this.dailyAverages = dailyAverages;
    }    
  }
  