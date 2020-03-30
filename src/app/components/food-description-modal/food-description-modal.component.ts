import { Component, OnInit, Input } from '@angular/core';
import { FFQNutrientsRecommendations, Recommendation } from 'src/app/models/ffqnutrients-recommendations';
import { FoodRecommendationsService } from 'src/app/services/food-recommendation-service/food-recommendations.service';
import { FFQFoodRecommendations } from 'src/app/models/ffqfood-recommendations';
import { FoodDescriptionService } from 'src/app/services/food-description/food-description.service';

@Component({
  selector: 'app-food-description-modal',
  templateUrl: './food-description-modal.component.html',
  styleUrls: ['./food-description-modal.component.css']
})
export class FoodDescriptionModalComponent implements OnInit {

  @Input() id;

  constructor(public foodDescriptionService: FoodDescriptionService) { }

  imageWidth: number = 50;
  imageMargin: number = 2;
  foodGroup: any[] = [
    {
      "imageUrl": "/assets/images/Breastmilk.jpg",
      "foodItemGroupName": "Breastmilk/Formula",
      "(Oz) Per Day": "16-24 fl oz/day",
      "Description": "Breastmilk or iron-fortified infant formula is recommended until age 12 months. Do not use low-iron milk, such as cow or soy, even in infant cereal. Do not serve 1% (low-fat) or skim (non-fat) milks before age 24 months."
    },
  ];

  ngOnInit() {
   // this.getFoodDescription(this.id);
  }

 // private getFoodDescription(questionnaireId: string) {
//    this.foodDescriptionService.getFoodRecommendations(questionnaireId).subscribe(
////      data => {
 //       this.foodGroup.push(data);
 ////     },
   // )
//  }
}
