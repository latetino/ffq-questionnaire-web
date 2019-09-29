import { FFQFoodItem } from './ffqfooditem';
import { FFQNutrientlist } from './ffqnutrientlist';
import { FFQItemInput } from './ffqitem-input';
import { FoodType } from './ffqitem-response';

export class FFQFoodNutrientsResponse {
    fooditem: FFQFoodItem;
    nutrientlist: FFQNutrientlist;  
  
    constructor(fooditem:FFQFoodItem, nutrientlist: FFQNutrientlist) {
      this.fooditem = fooditem;
      this.nutrientlist = nutrientlist;
    }
  }
  