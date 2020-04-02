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
import { Observable } from 'rxjs';
import { ParentService } from 'src/app/services/parent/parent-service';
import { ClinicianService } from 'src/app/services/clinician/clinician-service';
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response';
import { FFQParent } from 'src/app/models/ffqparent';
import { FFQClinician } from 'src/app/models/ffqclinician';
import { FFQParentResponse } from 'src/app/models/ffqparent-response';
import { FFQClinicResponse } from 'src/app/models/ffqclinic-response';
import { ClinicService } from 'src/app/services/clinic/clinic-service';
import { FFQClinic } from 'src/app/models/ffqclinic';


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
  private createClinician: boolean;
  showMsg: boolean = false;

  constructor(
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
    public clinicService: ClinicService

    ) { }

  clinicians: FFQClinicianResponse[] = [];
  parents: FFQParentResponse[] = [];

  nutrientsMap: Map<string,FFQNutrientlist> = new Map<string,FFQNutrientlist>();

  userAttributes: object[] = [];
  dataLoaded: Promise<boolean>;

  ffqclinician: FFQClinician;
  ffqParent: FFQParent;
  amountToAdd: number;
  clinicnumber: number;
  isParent: boolean;
  isClinician: boolean;

  public ffqclinicList: FFQClinic[] = [];
  clinicNames: string[] = [];

    
  ngOnInit() {

    this.createParents = false;
    this.createClinician = false;
    this.isParent = false;
    this.isClinician = false;

    const UserType = this.route.snapshot.paramMap.get('type');
    const UserID = this.route.snapshot.paramMap.get('id');
    console.log(UserID);

    if (UserID == "new"){
    
      this.isNew = true;
      this.dataLoaded = Promise.resolve(true);
   // this.addClinician();
    }
    else
    {
      this.isUpdate = true;
      //this.getUserById(parseInt(UserID));
      if(UserType == "p")
      {
        this.getParentByID(UserID);
      }
      else
      {
        this.getClinicianByID(UserID);
      }
    }

    var clinicList: Observable<FFQClinicResponse[]> = this.clinicService.getAllClinics();
      clinicList.subscribe(a => {
      this.ffqclinicList = a;
      for (let i = 0; i < a.length; i++) {
        this.clinicNames.push(a[i].clinicname);
      }
    });

  }

  changeToClinician($event)
  {
    this.createClinician = true;
    this.createParents = false;
  }

  changeToParent($event)
  {
    this.createParents = true;
    this.createClinician = false;
  }

  setClinic(clinicNo: number)
  {
    this.clinicnumber = clinicNo;
  }


  private addUser(form:NgForm){  
    
     if(this.createClinician == true){

      var clinicianList: Observable<FFQClinicianResponse[]> = this.clinicianService.getAllClinicians();

      clinicianList.subscribe(data => {
        var numberOfClinicians = (data.length+1).toString();
        //console.log("Number of clinicians is: " + numberOfClinicians);
        var newClincianId = (data.length+1).toString();
        var newClincianUsername = "clinician"+numberOfClinicians;
        this.ffqclinician = new FFQClinician(newClincianId, newClincianUsername, newClincianUsername, "", "", this.clinicnumber, []);
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
     else
     {
      var parentList: Observable<FFQParentResponse[]> = this.parentService.getAllParents();

      parentList.subscribe(data => {
        var numberOfParents = (data.length+1).toString();
        //console.log("Number of clinicians is: " + numberOfClinicians);
        var newParentId = (data.length+1).toString();
        var newParentUsername = "parent"+numberOfParents;
        this.ffqParent = new FFQParent(newParentId, newParentUsername, newParentUsername, "", "", "0", []);

        this.parentService.addParent(this.ffqParent).subscribe(data => {
            this.router.navigateByUrl('/admin/users');
            const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
            dialogRef.componentInstance.title = newParentUsername + ' was added!';
        },
        error =>{
            const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
            dialogRef.componentInstance.title = error.error.message;
        }); 

      });
     }


    
  }

  private addParent(form:NgForm){
    
    // if(this.createClincian == true){
       var parentList: Observable<FFQParentResponse[]> = this.parentService.getAllParents();
 
       parentList.subscribe(data => {
         var numberOfParents = (data.length+1).toString();
         var newParentId = (data.length+1).toString();
         var newParentUsername = "parent"+numberOfParents;
         this.ffqParent = new FFQParent(newParentId, newParentUsername, newParentUsername, "", "", "", []);
         //console.log(this.ffquser);
 
         this.parentService.addParent(this.ffqParent).subscribe(data => {
             this.router.navigateByUrl('/admin/users');
             const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
             dialogRef.componentInstance.title = 'Users were added!';
         },
         error =>{
             const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
             dialogRef.componentInstance.title = error.error.message;
         }); 
 
       });
    
   }

  getParentByID(id: string)
  {
    this.isParent = true;
    this.parentService.getParent(id).subscribe(data => {  
       this.userAttributes.push(data)
    });
    this.dataLoaded = Promise.resolve(true); 
  }

  getClinicianByID(id: string)
  {
    this.isClinician = true;
    this.clinicianService.getClinician(id).subscribe(data => {  
      this.userAttributes.push(data)
    });
    this.dataLoaded = Promise.resolve(true); 
  }

  
}




