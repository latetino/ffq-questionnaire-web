import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FoodItemService} from '../../services/food-item/food-item.service';
import { FFQItem } from 'src/app/models/ffqitem';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { FFQFoodNutrientsResponse } from 'src/app/models/ffqfoodnutrients-response';
import { FormGroup, FormControl, Validators,  ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-fooditem',
  templateUrl: './fooditem.component.html',
  styleUrls: ['./fooditem.component.css']
})
export class FooditemComponent implements OnInit {

  TITLE = 'FFQR Food Item Portal';
  fooditemform: FormGroup;
  validMessage: string ="";
  
  constructor(public foodService: FoodItemService,
    private activatedRoute: ActivatedRoute,
    private errorDialog: MatDialog,
    private submissionErrorDialog: MatDialog,
    private httpErrorDialog: MatDialog,
    private successDialog: MatDialog,
    private router: Router,
    private modalService: NgbModal) {}


foodNutrients: FFQFoodNutrientsResponse[] = [];
dataLoaded: Promise<boolean>;

  ngOnInit() {
    this.loadFoodsAndNutrients();
    console.log( this.foodNutrients);
    this.fooditemform =new FormGroup({
    fooditemname: new FormControl ('', Validators.required),
    sugaradded: new FormControl ('', Validators.required),
    teaspoon: new FormControl ('', Validators.required),
    servings: new FormControl ('', Validators.required),
    primary: new FormControl ('', Validators.required),

    Retinol: new FormControl ('', Validators.required),
    VitD: new FormControl ('', Validators.required),
    VitE : new FormControl ('', Validators.required),
    VitK: new FormControl ('', Validators.required),
    VitC: new FormControl ('', Validators.required),
    Thiamin: new FormControl ('', Validators.required),
    Riboflavin : new FormControl ('', Validators.required),
    Niacin: new FormControl ('', Validators.required),
    PanthotenicAcid : new FormControl ('', Validators.required),
    VitB6: new FormControl ('', Validators.required),
    Folate : new FormControl ('', Validators.required),
    VitB12: new FormControl ('', Validators.required),
    Calcium: new FormControl ('', Validators.required),
    Phosphorus: new FormControl ('', Validators.required),
    Magnesium : new FormControl ('', Validators.required),
    Iron: new FormControl ('', Validators.required),
    Zinc : new FormControl ('', Validators.required),
    Copper: new FormControl ('', Validators.required),
    Potassium: new FormControl ('', Validators.required),
    });
  }
  private handleFoodServiceError(error: HttpErrorResponse) {
    console.error('Error occurred.\n' + error.message);
    const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
    dialogRef.componentInstance.title = 'Error Fetching Food Items';
    dialogRef.componentInstance.message = error.message;
    dialogRef.componentInstance.router = this.router;
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

  private loadFoodsAndNutrients() {
    this.foodService.getAllFoods().subscribe(data => {
      data.map(response => {        
        this.foodNutrients.push(response);
      });
      console.log(this.foodNutrients.length + ' foods and its nutrients were returned from server.');
      this.dataLoaded = Promise.resolve(true);
    }, (error: HttpErrorResponse) => this.handleFoodServiceError(error));
  }

}
