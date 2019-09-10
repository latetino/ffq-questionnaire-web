import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {QuestionnaireResponse} from '../../models/questionnaire-response';
import {map} from 'rxjs/operators';
import {FFQItemResponse} from '../../models/ffqitem-response';
import {Questionnaire} from '../../models/Questionnaire';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireValidatorService {

  endpoint = 'http://localhost:9080/ffq';

  static validateQuestionnaireId(id: string): boolean {
    return id.toLowerCase() === 'valid-001';
  }

  constructor(private http: HttpClient) { }

  getQuestionnaireId(id: string): Observable<QuestionnaireResponse> {
    return this.http.get(this.endpoint + '/validate/' + id).pipe(
      map(((q: QuestionnaireResponse) => {
          return new QuestionnaireResponse(
            q.id,
            q.exists,
            q.submitted,
            q.issuerId
          );
        })));
  }

  submitQuestionnaire(id: string): Observable<any> {
    return this.http.put(this.endpoint + '/update', {
      questionnaireID: id,
      submitted: true
    });
  }
}
