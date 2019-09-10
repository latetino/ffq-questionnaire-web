
export class FFQItemResponse {
  name: string;
  primary: boolean;
  servingsList: Serving[];
  foodTypes: FoodType[];
  sugar: SugarSetting;


  constructor(name: string, primary: boolean, servingsList: Serving[], foodTypes: FoodType[], sugar: SugarSetting) {
    this.name = name;
    this.primary = primary;
    this.servingsList = servingsList;
    this.foodTypes = foodTypes;
    this.sugar = sugar;
  }
}

export class FoodType {
  typeName: string;
  nutrientListID: string;
}

export class SugarSetting {
  additionalSugar: boolean;
  teaspoons: number;
}

export class Serving {
  servingName: string;
}
