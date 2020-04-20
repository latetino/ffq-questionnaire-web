import { Component, OnInit } from "@angular/core";
import { ResultsService } from "src/app/services/results/results";
import { FFQResultsResponse } from "src/app/models/ffqresultsresponse";
import {Observable} from 'rxjs';
import { NutrientConstants } from 'src/app/models/NutrientConstants';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FFQClinicResponse } from 'src/app/models/ffqclinic-response';
import { ClinicService } from 'src/app/services/clinic/clinic-service';
import { FFQParentResponse } from 'src/app/models/ffqparent-response';
import { ParentService } from 'src/app/services/parent/parent-service';
import { FFQParent } from 'src/app/models/ffqparent';
import { of } from 'rxjs';
import { ResultsPipe } from 'src/app/pipes/resultsFilter.pipe';
import { FFQParentResult } from 'src/app/models/ffqparentresult';

@Component({
  selector: "app-quest-results",
  templateUrl: "./clinic-quest-results.component.html",
  styleUrls: ["./clinic-quest-results.component.css"]
})
export class ClinicQuestResultsComponent implements OnInit {
  public show: boolean = false;
  search: string;


  results: FFQResultsResponse[] = [];
  clinicId: string;
  currentClinicName: string;
  parentList: FFQParent[] = [];
  resultList: FFQResultsResponse[] = [];
  resultListObservable: Observable<FFQResultsResponse[]>;
  parentNames: string[] = [];
  resultMap: Map<string, FFQParentResult> = new Map<string, FFQParentResult>();
  resultInfo: FFQParentResult[] = [];

  constructor(
    public resultsService: ResultsService,
    public clinicService: ClinicService,
    public parentService: ParentService,
    public authenticationService: AuthenticationService
    ) {}

  ngOnInit() {
    this.getClinicId();
  }

  //loadData function serves to store the result and parent names into the FFQParentResult object
  //                  serves to display the questionnaire-result data using the specification based on PO's list
  private loadData() {

     const oldListObservable: Observable<FFQResultsResponse[]> = of(this.resultList);

     const newList: string[] = NutrientConstants.NUTRIENT_NAMES;
     const newWeeklyMap = new Map<string, number>();
     const newDailyMap = new Map<string, number>();
     const resultList: FFQResultsResponse[] = this.resultList;

     oldListObservable.subscribe(m => {

      m.forEach(element => {
      const newWeeklyMap = new Map<string, number>();
      const newDailyMap = new Map<string, number>();

      const weeklyMap = element.weeklyTotals;
      const dailyMap = element.dailyAverages;

      newList.forEach(a =>  {
          newWeeklyMap.set(a, weeklyMap[a]);
          newDailyMap.set(a, dailyMap[a]);
      })

      element.weeklyTotals = newWeeklyMap;
      element.dailyAverages = newDailyMap;
      })

      console.log(m);
      this.results = m.reverse();
      this.parentNames = this.parentNames.reverse();
      for(var i = 0; i < this.parentNames.length; i++){
        var object: FFQParentResult = new FFQParentResult(
          this.results[i],
          this.parentNames[i]
        );
        this.resultInfo.push(object);
        this.resultMap.set(this.results[i].userId, object);
      }
      console.log("resultInfo in function");
      console.log(this.resultInfo);
      
     });

  }

    //Function used to obtain the clinicId for the currently logged in clinician, in order to later display results based only for this specific clinic
  private getClinicId(){

    var clinicListObervable: Observable<FFQClinicResponse[]> = this.clinicService.getAllClinics();
    const loggedInUser = this.authenticationService.currentUserValue;
    var clinicId: string;

    console.log("Logged in user clinic: " + loggedInUser[0].assignedclinic);
    clinicListObervable.subscribe(clinicList => {
      var clinic = clinicList.find(a => a.clinicId == loggedInUser[0].assignedclinic);
      if(clinic){
        this.clinicId = clinic.clinicId;
        this.currentClinicName = clinic.clinicname;
        console.log("clinic ID in function");
        console.log(this.clinicId);
      }
      this.getParentList();
    });

  }

  //Function used to filter the parent list to hold only the parents that are assigned to that specific clinic
private getParentList(){
  var parentListObervable: Observable<FFQParentResponse[]> = this.parentService.getAllParents();

  parentListObervable.subscribe(parentList => {
     parentList.forEach(parent => {
       if(parent.assignedclinic == this.clinicId){
         this.parentList.push(parent);
       }
     })
     this.getResultsList();

     console.log(this.parentList);
  });



}


  //Function to get all the results for each parent
private getResultsList(){
   console.log("Parents in Get result");
   console.log(this.parentList);
   
   var allResultsObservable: Observable<FFQResultsResponse[]> = this.resultsService.getAllResults();
   allResultsObservable.subscribe((allResults: FFQResultsResponse[]) => {
    console.log("All REsults in function");
    console.log(allResults);
      this.parentList.forEach(parent => { 
          allResults.forEach(result => {
              if(result.userId == parent.userId){
                this.resultList.push(result);
                var parentName = parent.firstname + " " + parent.lastname;
                this.parentNames.push(parentName);
              }
          });
          console.log("parentNames for this parent")
          console.log(this.parentNames);
      });
      console.log("results in function");
      console.log(this.resultList);
      this.loadData();
   });

 }





  private returnZero(){
    return 0;
  }

  //function used in HTML in order to display and hide questionnaire results
  toggle(index) {
    this.resultInfo[index].ffqresult.show = !this.resultInfo[index].ffqresult.show;
  }
}