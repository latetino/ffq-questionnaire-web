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
    this.fooditemform =new FormGroup({
    fooditemname: new FormControl ('', Validators.required),
    sugaradded: new FormControl ('', Validators.required),
    servings: new FormControl ('', Validators.required),
    primary: new FormControl ('', Validators.required),
    });
  }

}
