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
  allParentNames: string[] = [];

  constructor(
    public resultsService: ResultsService,
    public clinicService: ClinicService,
    public parentService: ParentService,
    public authenticationService: AuthenticationService
    ) {}
  
  ngOnInit() {
    this.getClinicId();
    this.allParentNames.push("");
  
  }

  //(Khalid)Changed below code to sort the list in the nutient view page
  private loadData() {
    
     const oldListObservable: Observable<FFQResultsResponse[]> = of(this.resultList);
    
     const newList: string[] = NutrientConstants.NUTRIENT_NAMES;
     const newWeeklyMap = new Map<string, number>();
     const newDailyMap = new Map<string, number>();
     const resultList: FFQResultsResponse[] = this.resultList;

     oldListObservable.subscribe(oldList => {
     // oldList = this.resultList;
      console.log("oldList");
      console.log(oldList);
      const weeklyMap = oldList[0].weeklyTotals;
      const dailyMap = oldList[0].dailyAverages;
      newList.forEach(element =>  {
       newWeeklyMap.set(element, weeklyMap[element]);
       newDailyMap.set(element, dailyMap[element]);
       })
      //console.log(newWeeklyMap);

      oldList.forEach(element => {
         
         element.weeklyTotals = newWeeklyMap;
         element.dailyAverages = newDailyMap;
         //element.dailyAverages = newDailyMap;

        })
        
        console.log(oldList);
        this.results = oldList;
     });    
    
  }
  
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

private getParentList(){
  var parentListObervable: Observable<FFQParentResponse[]> = this.parentService.getAllParents();

  parentListObervable.subscribe(parentList => {
     parentList.forEach(parent => {
       this.allParentNames.push(parent.firstname + " " + parent.lastname);
       if(parent.assignedclinic == this.clinicId){
         this.parentList.push(parent);
       }
     })
     this.getResultsList();

     console.log(this.parentList);
  });

  

}

private getResultsList(){
 // this.getParentList();
  //var resultList: FFQResultsResponse[];
  console.log("Parents in Get result");
  console.log(this.parentList);
  this.parentList.forEach(parent => {
      console.log("Parent");
      console.log(parent);
      var resulstsForThisParentObservable = this.resultsService.getResultsByParents(parent.userId);
      resulstsForThisParentObservable.subscribe(resultsForThisParent => {
        resultsForThisParent.forEach(result => {
          var parentName = parent.firstname + " " + parent.lastname;
          this.parentNames.push(parentName);
          this.resultList.push(result);
        });
        this.loadData();
      })
  });
}



  
  //p = this.results;

  private returnZero(){
    return 0;
  }

  toggle(index) {
    this.results[index].show = !this.results[index].show;
  }    
}
