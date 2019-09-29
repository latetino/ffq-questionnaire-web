import { FFQItem } from './ffqitem';
import { FFQNutrientist } from './ffqnutrientlist';
import { FFQItemInput } from './ffqitem-input';
import { FoodType } from './ffqitem-response';

export class FFQFoodNutrientsResponse {
    fooditem: FFQItem;
    nutrientlist: FFQNutrientist;  
  
    constructor(fooditem: FFQItem, nutrientlist: FFQNutrientist) {
      this.fooditem = fooditem;
      this.nutrientlist = nutrientlist;
    }
  }
  