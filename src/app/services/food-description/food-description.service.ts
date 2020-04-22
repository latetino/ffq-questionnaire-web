import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Description } from 'src/app/models/ffqfooddescription';

const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class FoodDescriptionService {

  endpoint = 'http://localhost:9090/ffq';

  constructor(private http: HttpClient) { }

  /* Return the food descriptions given a questionnaire id*/
  getFoodItemByQuestionnaireId(questionnaireId: string): Observable<Description> {
    return this.http.get(this.endpoint + '/fooddescription/' + questionnaireId).pipe(
      map(((item: Description) => {
          return new Description(
            item.imageUrl,
            item.foodItemGroupName,
            item.firstBracketIntake,
            item.secondBracketIntake,
            item.thirdBracketIntake,
            item.description,
          );
        }))
    );
  }

  getAllFoodItems(): Observable<Description[]> {
    return this.http.get(this.endpoint + '/fooddescription/all').pipe(
      map((res: any) => {
        return res.map(item => {
          return new Description(
            item.imageUrl,
            item.foodItemGroupName,
            item.firstBracketIntake,
            item.secondBracketIntake,
            item.thirdBracketIntake,
            item.description,
          );
        });
      }));
  }
}
