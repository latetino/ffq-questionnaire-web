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
import { FFQClinic } from 'src/app/models/ffqclinic';
import { Observable } from 'rxjs';
import { FFQClinicResponse } from 'src/app/models/ffqclinic-response';
import { ClinicService } from 'src/app/services/clinic/clinic-service';


@Component({
  templateUrl: './admin-clinics.component.html',
  styleUrls: ['./admin-clinics.component.css']
})

export class AdminClinicsComponent implements OnInit {

  private toggleAll: boolean
  private showParents: boolean;
  private showClinicians: boolean;
  private showAdmins: boolean;

  constructor(

    public clinicService: ClinicService
  ){}

  public filtered: boolean;

  public filtered_clinics: String[] = [];
  public checked_users: String[] = [];

  public ffqclinicList: FFQClinic[] = [];

 


  ngOnInit() {

    this.toggleAll = false;
    this.showParents = true;
    this.showClinicians = true;
    this.showAdmins = true;
    this.filtered = false;

    var clinicList: Observable<FFQClinicResponse[]> = this.clinicService.getAllClinics();
    clinicList.subscribe(a => {
      this.ffqclinicList = a;
    });
    
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

  /*filterByClinic(clinic_name: string)
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
  }*/

  checked(username: string)
  {
    const index = this.checked_users.indexOf(username);
    if(index === -1)
    {
      this.checked_users.push(username);
    }
    else
    {
      this.checked_users.splice(index, 1);
    }
  }

}