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
import { FFQUserResponse } from 'src/app/models/ffquser-response';
import { FFQParentResponse } from 'src/app/models/ffqparent-response';
//const mongoose = require('mongoose');
//declare var require: any
//Created by Khalid Alamoudi 

const httOptions ={ headers: new HttpHeaders({'Content-Type':'aplication/json'})}

@Injectable({
  providedIn: 'root'
})



export class ParentService {

  endpoint = 'http://localhost:9070/ffq/parents';
  

  constructor(private http: HttpClient) { } 

  addParent(user : FFQParentResponse): Observable<any> {
    
    return this.http.post(this.endpoint + '/createparent', user, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(
      tap( 
        data => console.log(data),
        error => console.log(error)
      ));
  }

  //Still not implemented
  updateParent(user : FFQParentResponse): Observable<any> {
    
    return this.http.put(this.endpoint + '/updateparent', user, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(
      tap( 
        data => console.log(data),
        error => console.log(error)
      ));
  }

  getParent(parentId: number): Observable<FFQParentResponse> {
    return this.http.get(this.endpoint + '/' + parentId).pipe(
      map((item: any) => {
          return new FFQParentResponse(
            item.parentId,
            item.username,
            item.userpassword,
            item.firstname,
            item.lastname,
            item.assignedclinician
          );
      })
    );
  }

  // created by Dariana Gonzalez
  getAllParents(): Observable<FFQParentResponse[]> {
   // getMongoUsers();
    return this.http.get(this.endpoint + '/all').pipe(
      map((res: any) => {
        return res.map(item => {
          return new FFQParentResponse(
            item.parentId,
            item.username,
            item.userpassword,
            item.firstname,
            item.lastname,
            item.assignedclinician
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


