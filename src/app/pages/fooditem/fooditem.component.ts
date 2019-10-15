import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FoodItemService } from '../../services/food-item/food-item.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { FFQFoodNutrientsResponse } from 'src/app/models/ffqfoodnutrients-response';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { FFQFoodNutrients } from 'src/app/models/ffqfoodnutrients';
import { FFQFoodItem } from 'src/app/models/ffqfooditem';
import { FFQNutrientlist } from 'src/app/models/ffqnutrientlist';
import { NutrientConstants } from 'src/app/models/NutrientConstants';

// fooditem page added by Daykel Muro 10/2/2019
@Component({
  selector: 'app-fooditem',
  templateUrl: './fooditem.component.html',
  styleUrls: ['./fooditem.component.css']
})
export class FooditemComponent implements OnInit {

  TITLE = 'FFQR Food Item Portal';
  private routeSub: Subscription;
  private isNew: boolean;
  private isUpdate: boolean;

  constructor(
    public foodService: FoodItemService,
    private activatedRoute: ActivatedRoute,
    private errorDialog: MatDialog,
    private submissionErrorDialog: MatDialog,
    private httpErrorDialog: MatDialog,
    private successDialog: MatDialog,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute) { }

  foodNutrientsItem: FFQFoodNutrients[] = [];
  dataLoaded: Promise<boolean>;

  ffqfoditem: FFQFoodItem;
  ffqnutrientlist: FFQNutrientlist;
  foodNutrients: FFQFoodNutrients;
  ffqfoodnutrients: FFQFoodNutrients;

  ngOnInit() {

    const FoodItemObjectId = this.route.snapshot.paramMap.get('id');

    if (FoodItemObjectId == "new"){
      
      this.isNew = true;

      this.ffqfoditem = new FFQFoodItem("");
      this.ffqnutrientlist = new FFQNutrientlist("");
      this.ffqnutrientlist.nutrientListID = "test";

      //this.ffqnutrientlist.nutrientMap = new Map<String, number>();

      //for (var nutrient  of NutrientConstants.NUTRIENT_NAMES){
        //this.ffqnutrientlist.nutrientMap.set(nutrient,0);
      //}

      console.log(this.ffqnutrientlist.nutrientMap);
      this.foodNutrients = new FFQFoodNutrients(this.ffqfoditem, this.ffqnutrientlist);
      //this.ffqfoodnutrients = FFQFoodNutrients.foodItemFromResponse(this.foodNutrientsResponse);
      console.log(this.foodNutrients);

      this.foodNutrientsItem.push(this.foodNutrients);
      this.dataLoaded = Promise.resolve(true);

    }
    else{
      this.isUpdate = true;
      this.getFoodByObjectId(FoodItemObjectId);

      console.log(this.foodNutrientsItem);
    }
  }

  private getFoodByObjectId(name: string) {
    this.foodService.getFoodbyName(name).subscribe(data => {
      this.foodNutrientsItem.push(FFQFoodNutrients.foodItemFromResponse(data))
    });
    this.dataLoaded = Promise.resolve(true);
  }

  private addFoodNutrients(){  

    this.foodNutrientsItem[0].nutrientList.nutrientListID = this.foodNutrientsItem[0].foodItem.foodTypes[0].nutrientListID;
    this.foodNutrientsItem[0].foodItem.nutrientId = this.foodNutrientsItem[0].foodItem.foodTypes[0].nutrientListID;
    this.foodService.addFoodNutrients(FFQFoodNutrients.foodItemToResponse(this.foodNutrientsItem[0])).subscribe(
      data => this.router.navigateByUrl('/admin')
    );

  }

  trackByFn(item, id){
    return item
  }
}


