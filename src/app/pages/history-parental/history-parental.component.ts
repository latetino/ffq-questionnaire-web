import { Component, OnInit } from '@angular/core';
import { FFQResultsResponse } from 'src/app/models/ffqresultsresponse';
import { Observable } from 'rxjs';
import { ResultsService } from "src/app/services/results/results";
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { NutrientConstants } from 'src/app/models/NutrientConstants';
///

///////////added imports from recommend.component.ts/////////////////////
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecommendModalComponent } from 'src/app/components/recommend-modal/recommend-modal.component';
import { MatDialog } from '@angular/material';
import { NutrientsRecommendationsService } from 'src/app/services/nutrients-recommendations/nutrients-recommendations.service';
import { FFQNutrientsRecommendations } from 'src/app/models/ffqnutrients-recommendations';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { Router } from '@angular/router';
import { FoodRecommendModalComponent } from 'src/app/components/food-recommend-modal/food-recommend-modal.component';
import { FoodRecommendationsService } from 'src/app/services/food-recommendation-service/food-recommendations.service';
import { FoodDescriptionService } from 'src/app/services/food-description/food-description.service';

@Component({
  selector: 'app-history-parental',
  templateUrl: './history-parental.component.html',
  styleUrls: ['./history-parental.component.css']
})
export class HistoryParentalComponent implements OnInit {
  public show: boolean = false;
  public showFeedback: boolean = false;
  public buttonName: any = "Results";

  MESSAGE = "No questionnaires have been submitted yet!";

  results: FFQResultsResponse[] = [];

  constructor(
    public resultsService: ResultsService,
    private authenticationService: AuthenticationService,
    /////
    public nutrientsRecommendationsService: NutrientsRecommendationsService,
    public foodRecommendationsService: FoodRecommendationsService,
    public foodDescriptionService: FoodDescriptionService,
    private modalService: NgbModal,
    private errorDialog: MatDialog,
    private router: Router
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

  toggleFeedback(index) {
    this.results[index].showFeedback = !this.results[index].showFeedback;
  }

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

 /////////////////////////////////////////////////////////////////////////////////
  // (Francis) attempting to add Nutrients and Food Items buttons from recommend tab
  //            copy/pasted from recommend.component.ts
  /////////////////////////////////////////////////////////////////////////////////

  private getNutrientsRecommendations(questionnaireId: string) {
    this.nutrientsRecommendationsService.getNutrientsRecommendationsByQuestionnaireId(questionnaireId).subscribe(
      data => {
        this.onModalRequest(questionnaireId);
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
        dialogRef.componentInstance.router = this.router;
      }
    );
  }

  private getFoodRecommendations(questionnaireId: string) {
    this.foodRecommendationsService.getFoodRecommendationsByQuestionnaireId(questionnaireId).subscribe(
      data => {
        this.onModalRequestFood(questionnaireId);
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
        dialogRef.componentInstance.router = this.router;
      }
    );
  }

  onModalRequest(id: string): void {
    const modalRef = this.errorDialog.open(RecommendModalComponent);
    modalRef.componentInstance.id = id;
  }

  onModalRequestFood(id: string): void {
    const modalRef = this.errorDialog.open(FoodRecommendModalComponent);
    modalRef.componentInstance.id = id;
  }

}
