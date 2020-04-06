import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FoodItemService } from '../../services/food-item/food-item.service';
import { FFQItem } from 'src/app/models/ffqitem';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
//import { FFQFoodNutrientsResponse } from 'src/app/models/ffqfoodnutrients-response';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { FlashMessagesService } from 'angular2-flash-messages';

import { FFQFoodItem } from 'src/app/models/ffqfooditem';
import { FFQFoodItemResponse } from 'src/app/models/ffqfooditem-response';

//test;
import { FFQClinician } from 'src/app/models/ffqclinician';
import { FFQParent } from 'src/app/models/ffqparent';
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response';
import { ParentService } from 'src/app/services/parent/parent-service';
import { ClinicianService } from 'src/app/services/clinician/clinician-service';
import { NutrientsService } from 'src/app/services/nutrients/nutrients-service';
import { Observable } from 'rxjs';
import { FFQParentResponse } from 'src/app/models/ffqparent-response';
import { FFQClinicResponse } from 'src/app/models/ffqclinic-response';
import { ClinicService } from 'src/app/services/clinic/clinic-service';
import { FFQClinic } from 'src/app/models/ffqclinic';
import { FFQUserMap } from 'src/app/models/ffqusermap';



@Component({
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})

export class AdminUsersComponent implements OnInit {

  private toggleAll: boolean
  private showParents: boolean;
  private showClinicians: boolean;
  private showAdmins: boolean;

  constructor(
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

 // test

//ffquserList: FFQUser[] = [];
ffqclinicianList: FFQClinician[] = [];
ffqparentList: FFQParent[] = [];
ffqclinicList: FFQClinic[] = [];
ffqusermap: FFQUserMap;
ffquserList: Array<FFQClinic|FFQClinician|FFQParent>;
exampleArr: Array<{ clinic: FFQClinic, clinician: FFQClinician, parent: FFQParent}>;
clinicianClinicNames: string[] = [];
parentClinicNames: string[] = [];


 public filtered: boolean;

 public filtered_clinics: String[] = [];

 
//end test


  ngOnInit() {


    this.toggleAll = false;
    this.showParents = true;
    this.showClinicians = true;
    this.showAdmins = true;
    this.filtered = false;
    this.loadAllUsers();
  }

  toggleSelectAll()
  {
    this.toggleAll = !this.toggleAll;
  }

  toggleParents()
  {
    this.showParents = !this.showParents;
  }

  toggleClinicians()
  {
    this.showClinicians = !this.showClinicians;
  }

  toggleAdmins()
  {
    this.showAdmins = !this.showAdmins;
  }

  filterByClinic(clinic_name: string)
  {
    const index = this.filtered_clinics.indexOf(clinic_name);
    if(index === -1)
    {
      this.filtered_clinics.push(clinic_name);
    }
    else
    {
      this.filtered_clinics.splice(index, 1);
    }
    if(this.filtered_clinics.length == 0)
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
          var clinicianClinic = a.find(n => n.cliniciId == clinician.assignedClinic);
          if(!!clinicianClinic){
            var clinicianClinicName = clinicianClinic.clinicname;
          }
          this.clinicianClinicNames.push(clinicianClinicName);

        });
 


          parentList.subscribe(c => {
          this.ffqparentList = c;
          console.log(a);
          
          c.forEach(parent => {
            var clinicians = b.find(n => n.username == parent.assignedClinician);
            if(!!clinicians){
              var parentClinic = a.find(n => n.cliniciId == clinicians.assignedClinic);
              if(!!parentClinic){
                var parentClinicName = parentClinic.clinicname;
              }
            }
            this.parentClinicNames.push(parentClinicName);
          });
          
                  

          });
       });
    });

  }

}