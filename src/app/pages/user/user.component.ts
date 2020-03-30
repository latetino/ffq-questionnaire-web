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
import { FFQUser } from 'src/app/models/ffquser';
import { UserService } from 'src/app/services/user/user-service';
import { FFQUserResponse } from 'src/app/models/ffquser-response';
import { Observable } from 'rxjs';
import { ParentService } from 'src/app/services/parent/parent-service';
import { ClinicianService } from 'src/app/services/clinician/clinician-service';
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response';
import { FFQParent } from 'src/app/models/ffqparent';
import { FFQClinician } from 'src/app/models/ffqclinician';
import { FFQParentResponse } from 'src/app/models/ffqparent-response';


// fooditem page added by Daykel Muro 10/2/2019
@Component({
  selector: 'app-fooditem',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  TITLE = 'FFQR Food Item Portal';
  private routeSub: Subscription;
  private isNew: boolean;
  private isUpdate: boolean;
  private createParents: boolean;
  private createClincian: boolean;
  showMsg: boolean = false;

  constructor(
    public userService: UserService,
    public parentService: ParentService,
    public clinicianService: ClinicianService,
    public nutrientsService: NutrientsService,
    private activatedRoute: ActivatedRoute,
    private errorDialog: MatDialog,
    private submissionErrorDialog: MatDialog,
    private httpErrorDialog: MatDialog,
    private successDialog: MatDialog,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    ) { }

  users: FFQUserResponse[] = [];
  clinicians: FFQClinicianResponse[] = [];
  parents: FFQParentResponse[] = [];

  nutrientsMap: Map<string,FFQNutrientlist> = new Map<string,FFQNutrientlist>();

  //foodNutrientsItem: FFQFoodNutrients[] = [];
  dataLoaded: Promise<boolean>;

  ffquser: FFQUser;
  ffqclinician: FFQClinician;
  ffqParent: FFQParent;
  amountToAdd: number;
  clinicnumber: number;
  clinic: number;
  /*ffqnutrientlist: Array<FFQNutrientlist> = new Array<FFQNutrientlist>();
  foodNutrients: FFQFoodNutrients;
  ffqfoodnutrients: FFQFoodNutrients;

  ffgNutrientMap: nutrientMap;*/

    
  ngOnInit() {
    
    this.isNew = true;
    this.createParents = false;
    this.createClincian = false;

    if(this.createParents = true){
     // this.addClinician();
    }
    if(this.createClincian = true){
      
    }
    this.clinicnumber = this.clinic;

    this.dataLoaded = Promise.resolve(true);
   // this.addClinician();

  }

  changeToClinician($event)
  {
    this.createClincian = true;
    this.createParents = false;
  }

  changeToParent($event)
  {
    this.createParents = true;
    this.createClincian = false;
  }



  private addUser(form:NgForm){  
    
     if(this.createClincian == true){

      var clinicianList: Observable<FFQClinicianResponse[]> = this.clinicianService.getAllClinicians();

      clinicianList.subscribe(data => {
        var numberOfClinicians = (data.length+1).toString();
        //console.log("Number of clinicians is: " + numberOfClinicians);
        var newClincianId = data.length+1;
        var newClincianUsername = "clinician"+numberOfClinicians;
        this.ffqclinician = new FFQClinician(newClincianId, newClincianUsername, newClincianUsername, "", "", this.clinicnumber);
        console.log(this.ffqclinician);

        this.clinicianService.addClinician(this.ffqclinician).subscribe(data => {
            this.router.navigateByUrl('/admin/users');
            const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
            dialogRef.componentInstance.title = newClincianUsername + ' was added!';
        },
        error =>{
            const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
            dialogRef.componentInstance.title = error.error.message;
        }); 

      });
     }


    
  }



  trackByFn(item, id){
    return item
  }

  private loadUsersForTest(isClinic, isParent) {
    var userList: Observable<FFQUserResponse[]> = this.userService.getAllUsers();
    var users: FFQUserResponse[] = []
    userList.subscribe(data => {
      var i = 1;
      data.forEach((element: FFQUserResponse)  => {
        console.log("Element " + i + ": " + element)     
      });
      console.log(data[0]);
      console.log(data[0].username);
      console.log("this.users has: " + this.users[0]);

    });

  }

  private addClinician(form:NgForm){
    
   // if(this.createClincian == true){
      var clinicianList: Observable<FFQClinicianResponse[]> = this.clinicianService.getAllClinicians();

      clinicianList.subscribe(data => {
        var numberOfClinicians = (data.length+1).toString();
        //console.log("Number of clinicians is: " + numberOfClinicians);
        var newClincianId = data.length+1;
        var newClincianUsername = "clinician"+numberOfClinicians;
        this.ffqclinician = new FFQClinician(newClincianId, newClincianUsername, newClincianUsername, "", "", 0 );
        console.log(this.ffquser);

        this.clinicianService.addClinician(this.ffqclinician).subscribe(data => {
            this.router.navigateByUrl('/admin/users');
            const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
            dialogRef.componentInstance.title = 'Users were added!';
        },
        error =>{
            const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
            dialogRef.componentInstance.title = error.error.message;
        }); 

      });

   // }



   
  }

}




