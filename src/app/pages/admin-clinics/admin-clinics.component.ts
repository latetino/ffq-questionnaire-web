import { Component, OnInit } from '@angular/core';
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

  constructor(

    public clinicService: ClinicService
  ){}

  //public checked_users: String[] = [];

  public ffqclinicList: FFQClinic[] = [];

 


  ngOnInit() {

    this.toggleAll = false;

    var clinicList: Observable<FFQClinicResponse[]> = this.clinicService.getAllClinics();
    clinicList.subscribe(a => {
      this.ffqclinicList = a;
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