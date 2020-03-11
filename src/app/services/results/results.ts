import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { FFQResultsResponse } from 'src/app/models/ffqresultsresponse';

//Added by Dariana Gonzalez on 10/13/2019

const httOptions ={ headers: new HttpHeaders({'Content-Type':'aplication/json'})}

@Injectable({
  providedIn: 'root'
})

export class ResultsService {

  endpoint = 'http://localhost:9090/ffq';

  constructor(private http: HttpClient) { } 
 
  getAllResults(): Observable<FFQResultsResponse[]> {
    return this.http.get(this.endpoint + '/results/all').pipe(
      map((res: any) => {
        return res.map(item => {
          return new FFQResultsResponse(
            item.questionnaireId,
            item.patientName,
            item.ageInMonths,
            item.userChoices,
            item.weeklyTotals,
            item.dailyAverages
          );
        });
      }));
    }   
  }
