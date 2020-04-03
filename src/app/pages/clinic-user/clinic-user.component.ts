import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ParentService } from 'src/app/services/parent/parent-service';
import { ClinicianService } from 'src/app/services/clinician/clinician-service';
import { FFQParent } from 'src/app/models/ffqparent';
import { FFQParentResponse } from 'src/app/models/ffqparent-response';
import { FFQClinician } from 'src/app/models/ffqclinician';
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response';

@Component({
  selector: 'app-fooditem',
  templateUrl: './clinic-user.component.html',
  styleUrls: ['./clinic-user.component.css']
})
export class ClinicUserComponent implements OnInit {

  userAttributes: object[] = [];

  // for updating user

  private isParent: boolean;
  private isClinician: boolean;

  constructor(
    private route: ActivatedRoute,
    public parentService: ParentService,
    public clinicianService: ClinicianService,
    private router: Router,
    private errorDialog: MatDialog,
    ) { }

  dataLoaded: Promise<boolean>;

  ngOnInit() {
    
    // updating user

    this.isParent = false;
    this.isClinician = false;

    const UserID = this.route.snapshot.paramMap.get('id');
    const UserType = this.route.snapshot.paramMap.get('type');

    if(UserType == "p")
    {
      this.isParent = true;
      this.getParentByID(parseInt(UserID));
    }
    else
    {
      this.isClinician = true;
      this.getClinicianByID(parseInt(UserID));
    }

    console.log(this.userAttributes);
  }

  getParentByID(id: number)
  {
    this.parentService.getParent(id).subscribe(data => {  
      this.userAttributes.push(data)
      console.log(this.userAttributes);
    });
    this.dataLoaded = Promise.resolve(true); 
  }

  getClinicianByID(id: number)
  {
    this.clinicianService.getClinician(id).subscribe(data => {  
      this.userAttributes.push(data)
      console.log(this.userAttributes);
    });
    this.dataLoaded = Promise.resolve(true); 
  }

  updateUser()
  {
    if(this.isParent)
    {
      this.updateParent();
    }
    else
    {
      this.updateClinician();
    }
  }

  updateParent()
  { 
    console.log(this.userAttributes[0]);
    this.parentService.updateParent(<FFQParentResponse>this.userAttributes[0]).subscribe(
     data => {this.router.navigateByUrl('/clinic/home');
     const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
     dialogRef.componentInstance.title = 'Parent successfully updated!';}
     
    );
  }

  updateClinician()
  { 
    console.log(this.userAttributes[0]);
    this.clinicianService.updateClinician(<FFQClinicianResponse>this.userAttributes[0]).subscribe(
     data => {this.router.navigateByUrl('/clinic/home');
     const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
     dialogRef.componentInstance.title = 'Clinician successfully updated!';}
     
    );
  }
}