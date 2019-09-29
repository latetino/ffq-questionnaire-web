import {FFQItemInput} from './ffqitem-input';
import {FFQItemResponse, FoodType} from './ffqitem-response';
import {Serving} from './ffqitem-response';
import { FFQFoodNutrientsResponse } from './ffqfoodnutrients-response';

export class FFQNutrientlist {
  id: string;
  nutrientListID: string;
  nutrientMap: Map<String,number>;

  constructor(id: string) {
  }
}
