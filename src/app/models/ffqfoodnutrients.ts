import { FFQFoodItem } from './ffqfooditem';
import { FFQNutrientlist } from './ffqnutrientlist';
import { FFQFoodNutrientsResponse } from './ffqfoodnutrients-response';
import { FFQSugar } from './ffqsugar';

export class FFQFoodNutrients {
    foodItem: FFQFoodItem;
    nutrientList: FFQNutrientlist;  
  
    constructor(foodItem: FFQFoodItem, nutrientList: FFQNutrientlist ) {
        this.foodItem = foodItem;
        this.nutrientList = nutrientList;
    }

    public static foodItemFromResponse(response: FFQFoodNutrientsResponse): FFQFoodNutrients {
        
        const fooditem = new FFQFoodItem(response.foodItem.name);

        fooditem.id = response.foodItem.id;
        fooditem.primary = response.foodItem.primary;
        fooditem.foodTypes = response.foodItem.foodTypes;

        if(response.foodItem.sugar != null)
            fooditem.sugar = response.foodItem.sugar;
        else{
            const sugar = new FFQSugar(false, 0);
            fooditem.sugar = sugar;
        }

        /*var servingsString = "";

        for (var serving  of response.foodItem.servingsList){
            console.log(serving['servingName']);
            servingsString += serving['servingName'] + ", ";
        }

        fooditem.servingsList = servingsString;*/

        fooditem.servingsList = response.foodItem.servingsList;

        const foodnutrients = new FFQFoodNutrients(fooditem, response.nutrientList);

        return foodnutrients;
    }
}