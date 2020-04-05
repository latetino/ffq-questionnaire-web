import { Component, OnInit } from '@angular/core';
import { FFQClinic } from 'src/app/models/ffqclinic';
import { FFQParent } from 'src/app/models/ffqparent';
import { FFQClinician } from 'src/app/models/ffqclinician';
import { Observable } from 'rxjs';
import { FFQClinicResponse } from 'src/app/models/ffqclinic-response';
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response';
import { FFQParentResponse } from 'src/app/models/ffqparent-response';
import { ClinicService } from 'src/app/services/clinic/clinic-service';
import { ParentService } from 'src/app/services/parent/parent-service';
import { ClinicianService } from 'src/app/services/clinician/clinician-service';
import { ClinicianPipe } from 'src/app/pipes/clinicianFilter.pipe';
import { ParentPipe } from 'src/app/pipes/parentFilter.pipe';

@Component({
  templateUrl: './admin-clinics.component.html',
  styleUrls: ['./admin-clinics.component.css']
})

export class AdminClinicsComponent implements OnInit {

  private toggleAll: boolean

  constructor(

    public clinicService: ClinicService,
    public clinicianService: ClinicianService,
    public parentService: ParentService
  ){}

  //public checked_users: String[] = [];

  public ffqclinicList: FFQClinic[] = [];
  public ffqclinicianList: FFQClinician[] = [];
  public ffqparentList: FFQParent[] = [];
 


  ngOnInit() {

    this.toggleAll = false;

    var clinicList: Observable<FFQClinicResponse[]> = this.clinicService.getAllClinics();
    clinicList.subscribe(a => {
      this.ffqclinicList = a;
      console.log(a);
    });

    var clinicianList: Observable<FFQClinicianResponse[]> = this.clinicianService.getAllClinicians();
    clinicianList.subscribe(a => {
      this.ffqclinicianList = a;
      console.log(a);
    });

    var parentList: Observable<FFQParentResponse[]> = this.parentService.getAllParents();
    parentList.subscribe(a => {
      this.ffqparentList = a;
      console.log(a);
    });
    
  }

  toggleSelectAll()
  {
    this.toggleAll = !this.toggleAll;
  }

  /*checked(username: string)
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
  }*/

}