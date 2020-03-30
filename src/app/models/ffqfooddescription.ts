export class Description {
  imageUrl: string;
  foodItemGroupName: string;
  firstBracketIntake: string;
  secondBracketIntake: string;
  thirdBracketIntake: string;
  description: string;

  constructor(imageUrl: string, foodItemGroupName: string, firstBracketIntake: string, secondBracketIntake: string,
    thirdBracketIntake: string, description: string) {
    this.imageUrl = imageUrl;
    this.foodItemGroupName = foodItemGroupName;
    this.firstBracketIntake = firstBracketIntake;
    this.secondBracketIntake = secondBracketIntake;
    this.thirdBracketIntake = thirdBracketIntake;
    this.description = description;
  }
}
