import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrackerResultsResponse } from 'src/app/models/trackerresultsresponse';

@Injectable({
  providedIn: 'root'
})
export class TrackerResponseService {

  endpoint = 'http://localhost:9090/ffq';

  constructor(private http: HttpClient) { }

  submitTracker(results: TrackerResultsResponse): Observable<any> {
    return this.http.post(this.endpoint + '/tracker', results);
  }

}
