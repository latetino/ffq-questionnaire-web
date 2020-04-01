import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FoodItemService } from '../../services/food-item/food-item.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { FFQFoodNutrientsResponse } from 'src/app/models/ffqfoodnutrients-response';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { FFQFoodNutrients } from 'src/app/models/ffqfoodnutrients';
import { FFQFoodItem } from 'src/app/models/ffqfooditem';
import { FFQNutrientlist, nutrientMap } from 'src/app/models/ffqnutrientlist';
import { NutrientConstants } from 'src/app/models/NutrientConstants';
import { NutrientsService } from 'src/app/services/nutrients/nutrients-service';
import { FormsModule } from '@angular/forms';
import { ParentService } from 'src/app/services/parent/parent-service';
import { ClinicianService } from 'src/app/services/clinician/clinician-service';


// fooditem page added by Daykel Muro 10/2/2019
@Component({
  selector: 'app-fooditem',
  templateUrl: './clinic-user.component.html',
  styleUrls: ['./clinic-user.component.css']
})
export class ClinicUserComponent implements OnInit {

  TITLE = 'FFQR Food Item Portal';
  private routeSub: Subscription;

  userAttributes: object[] = [];

  // for updating user

  private isParent: boolean;
  private isClinician: boolean;

  showMsg: boolean = false;

  constructor(
    public foodService: FoodItemService,
    public nutrientsService: NutrientsService,
    private activatedRoute: ActivatedRoute,
    private errorDialog: MatDialog,
    private submissionErrorDialog: MatDialog,
    private httpErrorDialog: MatDialog,
    private successDialog: MatDialog,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    public parentService: ParentService,
    public clinicianService: ClinicianService
    ) { }


  nutrientsMap: Map<string,FFQNutrientlist> = new Map<string,FFQNutrientlist>();

  foodNutrientsItem: FFQFoodNutrients[] = [];
  dataLoaded: Promise<boolean>;

  ffqfoditem: FFQFoodItem;
  ffqnutrientlist: Array<FFQNutrientlist> = new Array<FFQNutrientlist>();
  foodNutrients: FFQFoodNutrients;
  ffqfoodnutrients: FFQFoodNutrients;

  ffgNutrientMap: nutrientMap;

  ngOnInit() {
    
    // updating user

    this.isParent = false;
    this.isClinician = false;

    const UserID = this.route.snapshot.paramMap.get('id');

    this.getUserById(UserID);

    console.log(this.userAttributes);
  }
 
  private getUserById(id: string)
   {

    if(id[0] == '5')
    {
      this.isParent = true;
      this.parentService.getParent(id).subscribe(data => {  
        this.userAttributes.push(data)
        console.log(this.userAttributes);
      });
      this.dataLoaded = Promise.resolve(true);  
    }
    else if(id[0] == '7')
    {
      this.isClinician = true;
      this.clinicianService.getClinician(id).subscribe(data => {  
      
        this.userAttributes.push(data)
      });
      this.dataLoaded = Promise.resolve(true);  
    }
  }


  trackByFn(item, id){
    return item
  }
}

/*
export class FoodNutrientsMap {
  typeName: string;
  nutrientListID: string;

  constructor(typeName: string, nutrientListID: string){
    this.typeName = "";
    this.nutrientListID = "";
  }

 
}*/



