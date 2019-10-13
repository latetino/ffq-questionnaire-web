import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/results/results';
import { FFQResultsResponse } from 'src/app/models/ffqresultsresponse';

// Questionnaire reesults page added by Daykel Muro 09/30/2019
@Component({
  selector: 'app-quest-results',
  templateUrl: './quest-results.component.html',
  styleUrls: ['./quest-results.component.css']
})
export class QuestResultsComponent implements OnInit {

  results: FFQResultsResponse[] = [];

  constructor(public resultsService: ResultsService

  ) { }

  ngOnInit() {
    this.getAllResults();
    console.log(this.results);

  }

  private getAllResults() {
    this.resultsService.getAllResults().subscribe(data => {
      data.map(response => {
        this.results.push(response);
      });
      console.log(this.results.length + ' foods and its nutrients were returned from server.');
      //this.dataLoaded = Promise.resolve(true);
    });
  }

}
