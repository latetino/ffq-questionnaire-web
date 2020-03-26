export class Description {
  imageUrl: string;
  foodItemGroupName: string;
  dailyFoodIntake: string;
  description: string;

  constructor(imageUrl: string, foodItemGroupName: string, dailyFoodIntake: string, description: string) {
    this.imageUrl = imageUrl;
    this.foodItemGroupName = foodItemGroupName;
    this.dailyFoodIntake = dailyFoodIntake;
    this.description = description;
  }
}
