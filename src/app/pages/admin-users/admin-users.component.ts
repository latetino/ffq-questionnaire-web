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

//test
import { User } from 'src/app/models/user';
import { Clinic } from 'src/app/models/clinic';
import { FFQUser } from 'src/app/models/ffquser';
import { FFQClinician } from 'src/app/models/ffqclinician';
import { FFQParent } from 'src/app/models/ffqparent';
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response';
import { UserService } from 'src/app/services/user/user-service';
import { ParentService } from 'src/app/services/parent/parent-service';
import { ClinicianService } from 'src/app/services/clinician/clinician-service';
import { NutrientsService } from 'src/app/services/nutrients/nutrients-service';
import { FFQUserResponse } from 'src/app/models/ffquser-response';
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




 public user_list: User[] = [];
 public clinic_list: Clinic[] = [];

 
//end test


  ngOnInit() {


    this.toggleAll = false;
    this.showParents = true;
    this.showClinicians = true;
    this.showAdmins = true;
    this.loadAllUsers();
    /*
    this.user_list.push(this.user1);
    this.user_list.push(this.user2);
    this.user_list.push(this.user3);
    this.user_list.push(this.user4);
    this.user_list.push(this.user5);
    this.user_list.push(this.user6);
    this.user_list.push(this.user7);
    this.user_list.push(this.user8);
    

    this.clinic_list.push(this.clinic1);
    this.clinic_list.push(this.clinic2);
    */




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
    console.log(clinic_name);
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
 public clinic1: Clinic = {

  name: "FIU Clinic"
 }

 public clinic2: Clinic = {
   name: "Mercy Hospital"
 }

 public user1: User = {
   username: "C000_C000",
   account_type: "Clinician",
   abbrev: "Dr.",
   name: "Smith",
   assigned_clinician: null,
   clinic: "FIU Clinic"
 };

 public user2: User = {
   username: "C000_C001",
   account_type: "Clinician",
   abbrev: "RN",
   name: "Giraldo",
   assigned_clinician: null,
   clinic: "FIU Clinic"
 };

 public user3: User = {
   username: "C000_P000",
   account_type: "Parent",
   abbrev: null,
   name: "John Doe",
   assigned_clinician: "Smith",
   clinic: "FIU Clinic"
 };

 public user4: User = {
   username: "C000_P001",
   account_type: "Parent",
   abbrev: null,
   name: null,
   assigned_clinician: null,
   clinic: "Mercy Hospital"
 };

 public user5: User = {
   username: "C000_C002",
   account_type: "Clinician",
   abbrev: "Dr.",
   name: "J",
   assigned_clinician: null,
   clinic: "FIU Clinic"
 };

 public user6: User = {
   username: "C000_C003",
   account_type: "Clinician",
   abbrev: "RN",
   name: "Laura",
   assigned_clinician: null,
   clinic: "FIU Clinic"
 };

 public user7: User = {
   username: "C000_P002",
   account_type: "Parent",
   abbrev: null,
   name: "Jim Johnson",
   assigned_clinician: "Laura",
   clinic: "FIU Clinic"
 };

 public user8: User = {
   username: "C000_P003",
   account_type: "Parent",
   abbrev: null,
   name: null,
   assigned_clinician: null,
   clinic: "Mercy Hospital"
 };

}