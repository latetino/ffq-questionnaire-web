import { FFQFoodItem } from './ffqfooditem';
import { FFQNutrientlist } from './ffqnutrientlist';
import { FFQItemInput } from './ffqitem-input';
import { FoodType } from './ffqitem-response';

export class FFQFoodNutrientsResponse {
    foodItem: FFQFoodItem;
    nutrientList: FFQNutrientlist;  
  
    constructor(fooditem:FFQFoodItem, nutrientlist: FFQNutrientlist) {
      this.foodItem = fooditem;
      this.nutrientList = nutrientlist;
    }

    
  }
  