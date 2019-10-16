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
<<<<<<< HEAD

  MESSAGE = "No questionnaires have been submitted yet!";
=======
>>>>>>> 34f0ff8ca88f25b71eed21fb3f845739bf74df03

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
      console.log(
        this.results.length +
          " foods and its nutrients were returned from server."
      );
      //this.dataLoaded = Promise.resolve(true);
    });
  }
  toggle(index) {
    this.results[index].show = !this.results[index].show;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.results[index].show) this.buttonName = "Results";
    else this.buttonName = "Results ";
  }
    
}
