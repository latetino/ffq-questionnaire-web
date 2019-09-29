import { FFQItem } from './ffqitem';
import { FFQNutrientlist } from './ffqnutrientlist';
import { FFQItemInput } from './ffqitem-input';
import { FoodType } from './ffqitem-response';

export class FFQFoodNutrientsResponse {
    fooditem: FFQItem;
    nutrientlist: FFQNutrientlist;  
  
    constructor(fooditem: FFQItem, nutrientlist: FFQNutrientlist) {
      this.fooditem = fooditem;
      this.nutrientlist = nutrientlist;
    }
  }
  