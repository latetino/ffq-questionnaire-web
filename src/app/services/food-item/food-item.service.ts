import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FFQItemResponse} from '../../models/ffqitem-response';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FFQItemCalcRequest} from '../../models/ffqitem-calc-request';
import { FFQFoodNutrientsResponse } from 'src/app/models/ffqfoodnutrients-response';

const httOptions ={ headers: new HttpHeaders({'Content-Type':'aplication/json'})}

@Injectable({
  providedIn: 'root'
})

export class FoodItemService {

  endpoint = 'http://localhost:9090/ffq';

  constructor(private http: HttpClient) { }

  getAllFoods(): Observable<FFQFoodNutrientsResponse[]> {
    return this.http.get(this.endpoint + '/allfoodsnutrients').pipe(
      map((res: any) => {
        return res.map(item => {
          return new FFQFoodNutrientsResponse(
            item.foodItem, 
            item.nutrientList
          );
        });
      }));
  }

  getFoodItems(): Observable<FFQItemResponse[]> {
    return this.http.get(this.endpoint + '/fooditems').pipe(
      map((res: any) => {
        return res.map(item => {
          return new FFQItemResponse(
            item.name,
            item.primary,
            item.servingsList,
            item.foodTypes,
            item.sugar
          );
        });
      }));
  }

  calculateNutrientBreakdown(id:string, items: FFQItemCalcRequest[]): Observable<any> {
    return this.http.post(`${this.endpoint}/calculate/` + id, items).pipe(map(data => {
        return data;
      }
    ));
  }

}
