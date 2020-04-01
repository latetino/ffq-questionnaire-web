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
import { FFQUser } from 'src/app/models/ffquser';
import { FFQClinician } from 'src/app/models/ffqclinician';
import { FFQParent } from 'src/app/models/ffqparent';
import { FFQClinic } from 'src/app/models/ffqclinic';
import { FFQUserMap } from 'src/app/models/ffqusermap';
import { UserService } from 'src/app/services/user/user-service';
import { ParentService } from 'src/app/services/parent/parent-service';
import { ClinicianService } from 'src/app/services/clinician/clinician-service';
import { NutrientsService } from 'src/app/services/nutrients/nutrients-service';
import { ClinicService } from 'src/app/services/clinic/clinic-service';
import { Observable } from 'rxjs';
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response';
import { FFQParentResponse } from 'src/app/models/ffqparent-response';
import { FFQClinicResponse } from 'src/app/models/ffqclinic-response';


@Component({
  selector: 'app-clinical-portal',
  templateUrl: './clinical-portal.component.html',
  styleUrls: ['./clinical-portal.component.css']
})


export class ClinicalPortalComponent implements OnInit  {

  TITLE = 'FIU Clinic';
  private showClinicians: boolean;
  private showParents: boolean;
  private toggleAllClinicians: boolean;
  private toggleAllParents: boolean;
  private hideUnassigned: boolean;


  constructor(
    public userService: UserService,
    public parentService: ParentService,
    public clinicianService: ClinicianService,
    public nutrientsService: NutrientsService,
    public clinicService: ClinicService,
    private activatedRoute: ActivatedRoute,
    private errorDialog: MatDialog,
    private submissionErrorDialog: MatDialog,
    private httpErrorDialog: MatDialog,
    private successDialog: MatDialog,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    ) { }

  
  ffquserList: FFQUser[] = [];
  ffqclinicianList: FFQClinician[] = [];
  ffqparentList: FFQParent[] = [];
  ffqclinicList: FFQClinic[] = [];
  ffqusermap: FFQUserMap;
  clinicNames: string[] = [];
  clinicianNames: string[] = [];
  numberOfPatients: number[] = [];
  

  ngOnInit() {
   
    this.showClinicians = true;
    this.showParents = true;
    this.toggleAllClinicians = false;
    this.toggleAllParents = false;
    this.hideUnassigned = false;



    this.loadAllUsers();

    console.log(this.clinicianNames);
  
  }

  toggleClinicians($event)
  {
    this.showClinicians = !this.showClinicians;
  }

  toggleParents($event)
  {
    this.showParents = !this.showParents;
  }

  selectAllClinicians($event)
  {
    this.toggleAllClinicians = !this.toggleAllClinicians;
  }

  selectAllParents($event)
  {
    this.toggleAllParents = !this.toggleAllParents;
  }

  toggleUnassigned($event)
  {
    this.hideUnassigned = !this.hideUnassigned;
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
           var clinic = a.find(n => n.cliniciId == clinician.assignedClinic);
           if(!!clinic){
            var clinicName = clinic.clinicname;
           }
           this.clinicNames.push(clinicName);

         });
         console.log(this.clinicNames);
          parentList.subscribe(c => {
          this.ffqparentList = c;
          console.log(a);
          c.forEach(parent =>   {
            //Code below to get the assigned clinician name for each parent
            var clinician = b.find(n => n.username == parent.assignedClinician);
            if(!!clinician){
               var clinicianName = clinician.firstname + " " + clinician.lastname;
            }
            this.clinicianNames.push(clinicianName);
          });

          b.forEach(clinician =>  {
            //Code below to get the number of patients for each clinician
            var i = 0;
            var numberOfPatient = c.find(n => n.assignedClinician == clinician.username);

            if(!!numberOfPatient){
              var numberOfPatientName = numberOfPatient.username;
              i++;
              console.log("number of patients for " + clinician.username + " is " + i);
            }
            this.numberOfPatients.push(i);
          });
          console.log(this.clinicNames);
          });
       });
    });
    //console.log(this.ffqclinicList);
   

  }
  
}

