import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FoodItemService } from '../../services/food-item/food-item.service';
import { FFQItem } from 'src/app/models/ffqitem';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { FFQFoodNutrientsResponse } from 'src/app/models/ffqfoodnutrients-response';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { FlashMessagesService } from 'angular2-flash-messages';

import { FFQFoodItem } from 'src/app/models/ffqfooditem';
import { FFQFoodItemResponse } from 'src/app/models/ffqfooditem-response';

//test
import { FFQClinician } from 'src/app/models/ffqclinician';
import { FFQParent } from 'src/app/models/ffqparent';
import { FFQClinic } from 'src/app/models/ffqclinic';
import { FFQUserMap } from 'src/app/models/ffqusermap';
import { ParentService } from 'src/app/services/parent/parent-service';
import { ClinicianService } from 'src/app/services/clinician/clinician-service';
import { ClinicService } from 'src/app/services/clinic/clinic-service';
import { Observable } from 'rxjs';
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response';
import { FFQParentResponse } from 'src/app/models/ffqparent-response';
import { FFQClinicResponse } from 'src/app/models/ffqclinic-response';
import { PatientPipe } from 'src/app/pipes/patientFilter.pipe';
import { SearchPipe } from 'src/app/pipes/searchFilter.pipe';
import { AllUsers } from 'src/app/models/all-users';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-clinical-portal',
  templateUrl: './clinical-portal.component.html',
  styleUrls: ['./clinical-portal.component.css']
})


export class ClinicalPortalComponent implements OnInit  {

  TITLE = 'FIU Clinic';
  private showClinicians: boolean;
  private showParents: boolean;
  private hideUnassignedParents: boolean;
  private hideUnassignedClinicians: boolean;
  p_search: string;
  c_search: string;
  public allusrs: AllUsers = new AllUsers();


  constructor(
    public parentService: ParentService,
    public clinicianService: ClinicianService,
    public clinicService: ClinicService,
    ) { }


  ffqclinicianList: FFQClinician[] = [];
  ffqparentList: FFQParent[] = [];
  ffqclinicList: FFQClinic[] = [];
  clinicNames: string[] = [];
  clinicianNames: string[] = [];
  numberOfPatients: number[] = [];
  public filtered_clinicians: String[] = [];
  public filtered: boolean;

  public UserList: User[];
  

  ngOnInit() {
   
    this.showClinicians = true;
    this.showParents = true;
    this.hideUnassignedParents = false;
    this.hideUnassignedClinicians = false;


   // this.UserList = this.allusrs.generateUserClass();
    this.loadAllUsers();

  
  }

  toggleClinicians($event)
  {
    this.showClinicians = !this.showClinicians;
  }

  toggleParents($event)
  {
    this.showParents = !this.showParents;
  }

  toggleUnassignedParents($event)
  {
    this.hideUnassignedParents = !this.hideUnassignedParents;
  }

  toggleUnassignedClinicians($event)
  {
    this.hideUnassignedClinicians = !this.hideUnassignedClinicians;
  }

  filterByClinician(clinician_name: string)
  {
    const index = this.filtered_clinicians.indexOf(clinician_name);
    if(index === -1)
    {
      this.filtered_clinicians.push(clinician_name);
    }
    else
    {
      this.filtered_clinicians.splice(index, 1);
    }
    if(this.filtered_clinicians.length == 0)
    {
      this.filtered = false;
    }
    else
    {
      this.filtered = true;
    }
  }


  private loadAllUsers() {
    var clinicianList: Observable<FFQClinicianResponse[]> = this.clinicianService.getAllClinicians();
    var parentList: Observable<FFQParentResponse[]> = this.parentService.getAllParents();
    var clinicList: Observable<FFQClinicResponse[]> = this.clinicService.getAllClinics();
    clinicList.subscribe(a => {
      this.ffqclinicList = a;

      console.log(a);
       clinicianList.subscribe(b => {
         this.ffqclinicianList = b;
         console.log(a);
         b.forEach(clinician =>  {
           //Code below to get the assigned clinic for each clinician
           var clinic = a.find(n => n.clinicId == clinician.assignedClinic);
           var clinicName
           if(!!clinic){
              clinicName = clinic.clinicname;
           }
           else{
              clinicName = "";
           }
           
           this.clinicNames.push(clinicName);

         });
         console.log(this.clinicNames);
          parentList.subscribe(c => {
          this.ffqparentList = c;
          console.log(a);
          c.forEach(parent =>   {
            //Code below to get the assigned clinician name for each parent
            var clinician = b.find(n => n.userId == parent.assignedClinician);
            if(!!clinician){
               var clinicianName = clinician.abbreviation + ". " + clinician.firstname + " " + clinician.lastname;
            }
            this.clinicianNames.push(clinicianName);
          });

          b.forEach(clinician =>  {
            //Code below to get the number of patients for each clinician
            var i = 0;
            var numberOfPatient = c.find(n => n.assignedClinician == clinician.userId);
            var numberOfPatientName;
            if(!!numberOfPatient){
              numberOfPatientName = numberOfPatient.userId;
              i++;
              console.log("number of patients for " + clinician.userId + " is " + i);
            }
            this.numberOfPatients.push(i);
          });
          console.log(this.numberOfPatients);
          });
       });
    });
    //console.log(this.ffqclinicList);
   

  }
  
}

