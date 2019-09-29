import {FFQItemInput} from './ffqitem-input';
import {FFQItemResponse, FoodType} from './ffqitem-response';
import {Serving} from './ffqitem-response';

export class FFQFoodItem {
  id: string;
  name: string;
  servingList: string[];
  hasSugarSetting: boolean;
  isPrimary: boolean;
  foodTypes: FoodType[];

  constructor(name: string, id: string, servingList: string[], hasSugarSetting:boolean, isPrimary: boolean, foodTypes:FoodType[]) {
    this.id= id;
    this.name = name;
    this.servingList = servingList;
    this.hasSugarSetting = hasSugarSetting;
    this.isPrimary = isPrimary;
    this.foodTypes = foodTypes;
  }

 
}
