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
import { FFQClinicResponse } from 'src/app/models/ffqclinic-response';
//const mongoose = require('mongoose');
//declare var require: any
//Created by Khalid Alamoudi 

const httOptions ={ headers: new HttpHeaders({'Content-Type':'aplication/json'})}

@Injectable({
  providedIn: 'root'
})



export class ClinicService {

  endpoint = 'http://localhost:9070/ffq/clinics';
  

  constructor(private http: HttpClient) { } 

  addClinic(user : FFQClinicResponse): Observable<any> {
    
    return this.http.post(this.endpoint + '/createclinic', user, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(
      tap( 
        data => console.log(data),
        error => console.log(error)
      ));
  }

  //Still not implemented
  updateClinic(user : FFQClinicResponse): Observable<any> {
    
    return this.http.put(this.endpoint + '/updateclinic', user, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(
      tap( 
        data => console.log(data),
        error => console.log(error)
      ));
  }

  //To be implemented
  getClinic(clinicId: string): Observable<FFQClinicResponse> {
    return this.http.get(this.endpoint + '/' + clinicId).pipe(
      map((item: any) => {
          return new FFQClinicResponse(
            item.clinicId,
            item.address,
            item.dateBuilt,
            item.clinicName,
            item.headclinician,
            item.isactive
          );
      })
    );
  }

  // created by Dariana Gonzalez
  getAllClinics(): Observable<FFQClinicResponse[]> {
   // getMongoUsers();
  // debugger;
    return this.http.get(this.endpoint + '/all').pipe(
      map((res: any) => {
        return res.map(item => {
          return new FFQClinicResponse(
            item.clinicId,
            item.address,
            item.datebuilt,
            item.clinicname,
            item.headclinician,
            item.isactive
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


/*export async function getMongoUsers() {  //test function to get users from mongoDB
  
  const MongoClient = require('mongodb').MongoClient; 
  const url = "mongodb://localhost:27017/"; 
  const db = await MongoClient.connect(url);
  const dbo = db.db("ffq_database");
  var user = await dbo.collection("users").find().toArray();    //[{1, Admin}, {2, Khalid}]
  console.log(user);
  
}*/


