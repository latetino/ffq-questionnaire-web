import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FFQItemResponse} from '../../models/ffqitem-response';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {FFQItemCalcRequest} from '../../models/ffqitem-calc-request';
import { FFQFoodNutrientsResponse } from 'src/app/models/ffqfoodnutrients-response';
import { FFQFoodItem } from 'src/app/models/ffqfooditem';
import { ɵangular_packages_forms_forms_q } from '@angular/forms';
import { Http, Headers, Response, RequestOptions, RequestMethod } from '@angular/http';
import { FFQFoodItemResponse } from 'src/app/models/ffqfooditem-response';
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response';
//Created by Khalid Alamoudi 

const httOptions ={ headers: new HttpHeaders({'Content-Type':'aplication/json'})}

@Injectable({
  providedIn: 'root'
})



export class ClinicianService {

  endpoint = 'http://localhost:9070/ffq/clinicians';
  

  constructor(private http: HttpClient) { } 

  addClinician(user : FFQClinicianResponse): Observable<any> {
    
    return this.http.post(this.endpoint + '/createclinician', user, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(
      tap( 
        data => console.log(data),
        error => console.log(error)
      ));
  }

  updateClinician(user : FFQClinicianResponse): Observable<any> {
    
    return this.http.put(this.endpoint + '/updateclinician', user, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(
      tap( 
        data => console.log(data),
        error => console.log(error)
      ));
  }

    return this.http.get(this.endpoint + '/' + clinicianId).pipe(
  getClinician(userId: string): Observable<FFQClinicianResponse> {
    return this.http.get(this.endpoint + '/' + userId).pipe(
      map((item: any) => {
          return new FFQClinicianResponse(
            item.userId,
            item.username,
            item.userpassword,
            item.role,
            item.firstname,
            item.lastname,
            item.assignedclinic,
            item.previousclinics
          );
      })
    );
  }

 
  getAllClinicians(): Observable<FFQClinicianResponse[]> {
   // getMongoUsers();
    return this.http.get(this.endpoint + '/all').pipe(
      map((res: any) => {
        return res.map(item => {
          return new FFQClinicianResponse(
            item.userId,
            item.username,
            item.userpassword,
            item.role,
            item.firstname,
            item.lastname,
            item.assignedclinic,
            item.previousclinics
          );
        });
      })
    );
  }

 


  /*DELETE: delete food item from the database */
  deleteItem(username: string): Observable <any>{
    console.log("here" + username);
    return this.http.delete(this.endpoint + "/delete?username=" + username,  { responseType: 'text' })  
  }


}





