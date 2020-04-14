import { Component, OnInit } from '@angular/core';
import { FFQResultsResponse } from 'src/app/models/ffqresultsresponse';
import { Observable } from 'rxjs';
import { ResultsService } from "src/app/services/results/results";
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { NutrientConstants } from 'src/app/models/NutrientConstants';

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
    this.getResultsByUser(this.authenticationService.currentUserId);
  }

  toggle(index) {
    this.results[index].show = !this.results[index].show;
    if (this.results[index].show) this.buttonName = "Results";
    else this.buttonName = "Results ";
  }

  // private getResultsByUser(userId: string) {
  //   var results: Observable<FFQResultsResponse[]> = this.resultsService.getResultsByUser(userId);

  //   results.subscribe((list: FFQResultsResponse[]) => {
  //     this.results = list;
  //   });
  // };

  private getResultsByUser(userId: string) {
    const oldList: Observable<FFQResultsResponse[]> = this.resultsService.getResultsByUser(userId);
    const reqList: string[] = NutrientConstants.NUTRIENT_NAMES;

    oldList.subscribe(m => {

      m.forEach(element => {
       const newWeeklyMap = new Map<string, number>();
       const newDailyMap = new Map<string, number>();

       const weeklyMap = element.weeklyTotals;
       const dailyMap = element.dailyAverages;

       reqList.forEach(a =>  {
           newWeeklyMap.set(a, weeklyMap[a]);
           newDailyMap.set(a, dailyMap[a]);
       })

       element.weeklyTotals = newWeeklyMap;
       element.dailyAverages = newDailyMap;
       })

       console.log(m);
       this.results = m.reverse();
    }

   )

 }

 returnZero()
 {
  return 0;
 }

}
