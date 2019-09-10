import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FFQItemResponse} from '../../models/ffqitem-response';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FFQItemCalcRequest} from '../../models/ffqitem-calc-request';

@Injectable({
  providedIn: 'root'
})

export class FoodItemService {

  endpoint = 'http://localhost:9090/ffq';

  constructor(private http: HttpClient) { }

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

  calculateNutrientBreakdown(items: FFQItemCalcRequest[]): Observable<any> {
    return this.http.post(`${this.endpoint}/calculate`, items).pipe(map(data => {
        return data;
      }
    ));
  }

}
