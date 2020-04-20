/*

  Added by Javier Romero, edited by Khalid Alamoudi
  This is the tracker history page for the clinic portal (clinic/tracker-history).
  From here, the clinician can see all the tracking histories for all parents in the clinic.

*/

import { Component, OnInit } from '@angular/core';
import { TrackerResultsResponse } from 'src/app/models/trackerresultsresponse';
import { TrackerResultsService } from 'src/app/services/tracker-results/tracker-results.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { TrackerItems } from 'src/app/models/trackeritems';
import { Observable, of } from 'rxjs';
import { FFQParentResponse } from 'src/app/models/ffqparent-response';
import { ParentService } from 'src/app/services/parent/parent-service';
import { FFQParent } from 'src/app/models/ffqparent';
import { FFQClinicResponse } from 'src/app/models/ffqclinic-response';
import { ClinicService } from 'src/app/services/clinic/clinic-service';
import { FFQParentResult } from 'src/app/models/ffqparentresult';
import { TrackerParentResultsResponse } from 'src/app/models/ffqparentresulttracker';

@Component({
  templateUrl: './clinic-tracker-history.component.html',
  styleUrls: ['./clinic-tracker-history.component.css']
})
export class ClinicTrackerHistoryComponent implements OnInit {

  results: TrackerResultsResponse[] = [];
  private parentIds: string[] = [];
  private clinicId: string;
  parentNames: string[] = [];
  parentList: FFQParentResponse[] = [];
  trackerList: TrackerResultsResponse[] = [];
  resultMap: Map<string, TrackerParentResultsResponse> = new Map<string, TrackerParentResultsResponse>();
  resultInfo: TrackerParentResultsResponse[] = [];
  search: string;
  
  constructor(private trackerResultsService: TrackerResultsService,
              private authenticationService: AuthenticationService,
              public parentService: ParentService,
              public clinicService: ClinicService
              ) { }

  ngOnInit() {
    this.getClinicId();
    

  }

  private loadData() {

    const trackerObservable: Observable<TrackerResultsResponse[]> = of(this.trackerList);

    trackerObservable.subscribe(tracker => {
      this.results = this.results.reverse();
      this.parentNames = this.parentNames.reverse();

      /*console.log("this.results")
      console.log(this.trackerList)
      console.log("this.parentNames")
      console.log(this.parentNames)*/
      for(var i = 0; i < this.trackerList.length; i++){
         var object: TrackerParentResultsResponse = new TrackerParentResultsResponse(
           this.trackerList[i],
           this.parentNames[i]
         );
         
         this.resultInfo.push(object);
         this.resultMap.set(this.trackerList[i].userId, object);
       }
       //console.log("result Info ")
       //console.log(this.resultInfo)
    });
  
  };

  private getAllResults(){
    
    const allTrackersObservable = this.trackerResultsService.getAllResults();
    

    allTrackersObservable.subscribe(allTrackers => {
      //console.log("all tracker")
      //console.log(allTrackers)
        this.parentList.forEach(parent => {
            allTrackers.forEach(tracker => {
                if(tracker.userId == parent.userId){
                  this.trackerList.push(tracker);
                  var parentName = parent.firstname + " " + parent.lastname;
                  this.parentNames.push(parentName);
                }
            });
        });
        //console.log("trackerList in getTrackersfunction")
        //console.log(this.trackerList)
        this.loadData();

    });

  }

  private getClinicId(){

    var clinicListObervable: Observable<FFQClinicResponse[]> = this.clinicService.getAllClinics();
    const loggedInUser = this.authenticationService.currentUserValue;
    var clinicId: string;

    //console.log("Logged in user clinic: " + loggedInUser[0].assignedclinic);
    clinicListObervable.subscribe(clinicList => {
      var clinic = clinicList.find(a => a.clinicId == loggedInUser[0].assignedclinic);
      if(clinic){
        this.clinicId = clinic.clinicId;
        //console.log("clinic ID in function");
        //console.log(this.clinicId);
      }
      this.getParents();
    });

  }

  getParents()
  {
    var parentListObservable: Observable<FFQParentResponse[]> = this.parentService.getAllParents();

    parentListObservable.subscribe(parentList => {
      parentList.forEach(parent => {
        if(parent.assignedclinic == this.clinicId){
          
          this.parentList.push(parent);
        }
      });
      //console.log("parentList in function");
      //console.log(this.parentList);
      this.getAllResults();
    });
  }
}
