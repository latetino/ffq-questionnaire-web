import { Component, OnInit } from "@angular/core";
import { ResultsService } from "src/app/services/results/results";
import { FFQResultsResponse } from "src/app/models/ffqresultsresponse";

// Questionnaire reesults page added by Daykel Muro 09/30/2019
@Component({
  selector: "app-quest-results",
  templateUrl: "./quest-results.component.html",
  styleUrls: ["./quest-results.component.css"]
})
export class QuestResultsComponent implements OnInit {
  public show: boolean = false;
  public buttonName: any = "Results";

  MESSAGE = "No questionnaires have been submitted yet!";

  
  results: FFQResultsResponse[] = [];

  constructor(public resultsService: ResultsService) {}

  ngOnInit() {
    this.getAllResults();
  }

  private getAllResults() {
    this.resultsService.getAllResults().subscribe(data => {
      data.map(response => {
        this.results.push(response);
      });
    });
  }


  toggle(index) {
    this.results[index].show = !this.results[index].show;
    if (this.results[index].show) this.buttonName = "Results";
    else this.buttonName = "Results ";
  }
    
}
