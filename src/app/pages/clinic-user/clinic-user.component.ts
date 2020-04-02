import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ParentService } from 'src/app/services/parent/parent-service';
import { ClinicianService } from 'src/app/services/clinician/clinician-service';

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
    public clinicianService: ClinicianService
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
      this.getParentByID(parseInt(UserID));
    }
    else
    {
      this.getClinicianByID(parseInt(UserID));
    }

    console.log(this.userAttributes);
  }

  getParentByID(id: number)
  {
    this.isParent = true;
    this.parentService.getParent(id).subscribe(data => {  
      this.userAttributes.push(data)
      console.log(this.userAttributes);
    });
    this.dataLoaded = Promise.resolve(true); 
  }

  getClinicianByID(id: number)
  {
    this.isClinician = true;
    this.clinicianService.getClinician(id).subscribe(data => {  
      this.userAttributes.push(data)
      console.log(this.userAttributes);
    });
    this.dataLoaded = Promise.resolve(true); 
  }
}