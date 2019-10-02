import {FFQItemInput} from './ffqitem-input';
import {FFQItemResponse, FoodType} from './ffqitem-response';
import {Serving} from './ffqitem-response';
import { FFQSugar } from './ffqsugar';

export class FFQFoodItem {
  id: string;
  name: string;
  servingsList: string;
  sugar: FFQSugar;
  primary: boolean;
  foodTypes: FoodType[];

  constructor(name: string) {
    this.id = "";
    this.name = name;
    this.servingsList = "";
    this.sugar = null;
    this.primary = null;
    this.foodTypes = [];
  }
}
