import { Component, OnInit } from "@angular/core";
import { ResultsService } from "src/app/services/results/results";
import { FFQResultsResponse } from "src/app/models/ffqresultsresponse";
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { NutrientConstants } from 'src/app/models/NutrientConstants';

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

  //(Khalid)Changed below code to sort the list in the nutient view page
  private getAllResults() {
    const oldList: Observable<FFQResultsResponse[]> = this.resultsService.getAllResults();
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
       this.results = m;
    }

   )

 }

  private returnZero(){
    return 0;
  }

  private returnZero(){
    return 0;
  }

  toggle(index) {
    this.results[index].show = !this.results[index].show;
    if (this.results[index].show) this.buttonName = "Results";
    else this.buttonName = "Results ";
  }

}
