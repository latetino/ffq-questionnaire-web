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
//const mongoose = require('mongoose');
//declare var require: any
//Created by Khalid Alamoudi 

const httOptions ={ headers: new HttpHeaders({'Content-Type':'aplication/json'})}

@Injectable({
  providedIn: 'root'
})



export class UserService {

  endpoint = 'http://localhost:9070/ffq';
  

  constructor(private http: HttpClient) { } 

  addUser(user : FFQUserResponse): Observable<any> {
    
    return this.http.post(this.endpoint + '/createuser', user, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(
      tap( 
        data => console.log(data),
        error => console.log(error)
      ));
  }

  //Still not implemented
  updateUser(user : FFQUserResponse): Observable<any> {
    
    return this.http.put(this.endpoint + '/updateuser', user, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(
      tap( 
        data => console.log(data),
        error => console.log(error)
      ));
  }

  //To be implemented
  getUser(userId: string): Observable<FFQUserResponse> {
    return this.http.get(this.endpoint + '/users/' + userId).pipe(
      map(((item: any) => {
          return new FFQUserResponse(
            item.userId,
            item.username,
            item.userpassword,
            item.isEnabled,
            item.isClinician,
            item.isParent,
            item.isAdmin
          );
      }))
    );
  }

  // created by Dariana Gonzalez
  getAllUsers(): Observable<FFQUserResponse[]> {
   // getMongoUsers();
    return this.http.get(this.endpoint + '/users').pipe(
      map((res: any) => {
        return res.map(item => {
          return new FFQUserResponse(
            item.userId,
            item.username,
            item.userpassword,
            item.isEnabled,
            item.isClinician,
            item.isParent,
            item.isAdmin
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


