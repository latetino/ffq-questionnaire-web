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

// fooditem page added by Daykel Muro 10/2/2019
@Component({
  selector: 'app-fooditem',
  templateUrl: './fooditem.component.html',
  styleUrls: ['./fooditem.component.css']
})
export class FooditemComponent implements OnInit {

  TITLE = 'FFQR Food Item Portal';
  private routeSub: Subscription;

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

  foodNutrientsItem: FFQFoodNutrientsResponse[] = [];
  dataLoaded: Promise<boolean>;

  ngOnInit() {

    const getFoodByObjectId = this.route.snapshot.paramMap.get('id');

    this.getFoodByObjectId(getFoodByObjectId);

    console.log(this.foodNutrientsItem);
  }

  private getFoodByObjectId(name: string) {
    this.foodService.getFoodbyName(name).subscribe(data => {
      this.foodNutrientsItem.push(FFQFoodNutrients.foodItemFromResponse(data))
    });
    this.dataLoaded = Promise.resolve(true);
  }

  private addFoodNutrients(){
    this.foodService.addFoodNutrients(this.foodNutrientsItem[0]).subscribe(
      data => this.router.navigateByUrl('/admin')
    );
  }
}


