import { Component, OnInit } from '@angular/core';
import { FFQResultsResponse } from 'src/app/models/ffqresultsresponse';
import { Observable } from 'rxjs';
import { ResultsService } from "src/app/services/results/results";
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-history-parental',
  templateUrl: './history-parental.component.html',
  styleUrls: ['./history-parental.component.css']
})
export class HistoryParentalComponent implements OnInit {
  public show: boolean = false;
  public buttonName: any = "Results";

  MESSAGE = "No questionnaires have been submitted yet!";

  results: FFQResultsResponse[] = [];

  constructor(
    public resultsService: ResultsService,
    private authenticationService: AuthenticationService
    ) {
    }

  ngOnInit() {
    this.getResultsByUser(this.authenticationService.currentUserValue[0].userId);
  }

  toggle(index) {
    this.results[index].show = !this.results[index].show;
    if (this.results[index].show) this.buttonName = "Results";
    else this.buttonName = "Results ";
  }

  private getResultsByUser(userId: string) {
    var results: Observable<FFQResultsResponse[]> = this.resultsService.getResultsByUser(userId);

    results.subscribe((list: FFQResultsResponse[]) => {
      this.results = list;
    });
  };
}
