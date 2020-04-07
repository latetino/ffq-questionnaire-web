import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { FFQResultsResponse } from 'src/app/models/ffqresultsresponse';

// Added by Dariana Gonzalez on 10/13/2019

const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};

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
            item.parentId,
            item.patientName,
            item.ageInMonths,
            item.userChoices,
            item.weeklyTotals,
            item.dailyAverages
          );
        });
      }));
    }

    getResultsByUser(userId: string): Observable<FFQResultsResponse[]> {
      return this.http.get(this.endpoint + '/results/' + userId).pipe(
        map((res: any) => {
          return res.map(item => {
            return new FFQResultsResponse(
              item.questionnaireId,
              item.userId,
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
