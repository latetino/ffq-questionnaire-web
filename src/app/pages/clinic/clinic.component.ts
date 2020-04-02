import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { FFQFoodNutrients } from 'src/app/models/ffqfoodnutrients';
import { FFQFoodItem } from 'src/app/models/ffqfooditem';
import { FFQNutrientlist, nutrientMap } from 'src/app/models/ffqnutrientlist';
import { NutrientConstants } from 'src/app/models/NutrientConstants';
import { NutrientsService } from 'src/app/services/nutrients/nutrients-service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ClinicianService } from 'src/app/services/clinician/clinician-service';
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response';
import { FFQClinician } from 'src/app/models/ffqclinician';
import { FFQClinicResponse } from 'src/app/models/ffqclinic-response';
import { ClinicService } from 'src/app/services/clinic/clinic-service';
import { FFQClinic } from 'src/app/models/ffqclinic';


@Component({
  selector: 'app-fooditem',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {

  private routeSub: Subscription;
  private isNew: boolean;
  private isUpdate: boolean;
  showMsg: boolean = false;

  constructor(
    public parentService: ParentService,
    public clinicianService: ClinicianService,
    private errorDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    public clinicService: ClinicService

    ) { }


  clinicians: FFQClinicianResponse[] = [];
  parents: FFQParentResponse[] = [];

  nutrientsMap: Map<string,FFQNutrientlist> = new Map<string,FFQNutrientlist>();

  //foodNutrientsItem: FFQFoodNutrients[] = [];
  clinicAttributes: object[] = [];
  dataLoaded: Promise<boolean>;

  ffqclinic: FFQClinic;
  clinicnumber: number;
  clinic: number;

  public ffqclinicianList: FFQClinician[] = [];
  clinicNames: string[] = [];

    
  ngOnInit() {

    const UserID = this.route.snapshot.paramMap.get('id');
    if (UserID == "new"){
    
      this.isNew = true;
      this.clinicnumber = this.clinic;
      this.dataLoaded = Promise.resolve(true);
    }
    else
    {
      this.isUpdate = true;
      this.getClinicById(parseInt(UserID));
    }


    var clinicianList: Observable<FFQClinicianResponse[]> = this.clinicianService.getAllClinicians();
      clinicianList.subscribe(a => {
      this.ffqclinicianList = a;
      for (let i = 0; i < a.length; i++) {
        this.clinicNames.push(a[i].lastname);
      }
    });

  }

  addClinic(form:NgForm){  

    var clinicList: Observable<FFQClinicResponse[]> = this.clinicService.getAllClinics();

    clinicList.subscribe(data => {
      var newClinicId = data.length+1;
      this.ffqclinic = new FFQClinic(newClinicId, "", "", "FIU Medicine");
      console.log(this.ffqclinic);

      this.clinicService.addClinic(this.ffqclinic).subscribe(data => {
          console.log("data: " + data);
          this.router.navigateByUrl('/admin/clinics');
          const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
          dialogRef.componentInstance.title = newClinicId + ' was added!';
      },
      error =>{
          const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
          dialogRef.componentInstance.title = error.error.message;
      }); 

    });
}

  private getClinicById(id: number)
  {
      this.clinicService.getClinic(id).subscribe(data => {  
      
        this.clinicAttributes.push(data)
      });
      this.dataLoaded = Promise.resolve(true);
  }
}




