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
import { FFQNutrientlist } from 'src/app/models/ffqnutrientlist';
import { FFQNutrientsRecommendations } from 'src/app/models/ffqnutrients-recommendations';

const httOptions ={ headers: new HttpHeaders({'Content-Type':'aplication/json'})}

@Injectable({
  providedIn: 'root'
})

export class NutrientsRecommendationsService {

  endpoint = 'http://localhost:9090/ffq';

  constructor(private http: HttpClient) { } 

  /* Return the nutrients recommendations given a questionnaire id*/
  getNutrientsRecommendationsByQuestionnaireId(questionnaireId: string): Observable<FFQNutrientsRecommendations> {
    return this.http.get(this.endpoint + '/nutrientsrecommendations/calculate/' + questionnaireId).pipe(
      map(((item: FFQNutrientsRecommendations) => {
          return new FFQNutrientsRecommendations(
            item.questionnaireId,
            item.patientName,
            item.patientAge,
            item.recommendationsList
          );
        }))
    );
  }
}
