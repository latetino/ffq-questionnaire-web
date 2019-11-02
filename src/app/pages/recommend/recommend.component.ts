import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/results/results';
import { FFQResultsResponse } from 'src/app/models/ffqresultsresponse';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResultsPageComponent } from '../results-page/results-page.component';
import { FFQResult } from 'src/app/models/FFQResult';
import { RecommendModalComponent } from 'src/app/components/recommend-modal/recommend-modal.component';
import { MatDialog } from '@angular/material';
import { NutrientsRecommendationsService } from 'src/app/services/nutrients-recommendations/nutrients-recommendations.service';
import { FFQNutrientsRecommendations } from 'src/app/models/ffqnutrients-recommendations';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

//Recommend page added by Daykel Muro 10/5/2019
@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {
  results: FFQResultsResponse[] = [];

  constructor(public resultsService: ResultsService,
    public nutrientsRecommendationsService: NutrientsRecommendationsService,
    private modalService: NgbModal,
    private errorDialog: MatDialog,
    private router: Router, ) { }

  recommendedNutrients: FFQNutrientsRecommendations[] = [];

  ngOnInit() {
    this.getAllResults();
  }

  private getNutrientsRecommendations(questionnaireId: string) {
    this.nutrientsRecommendationsService.getNutrientsRecommendationsByQuestionnaireId(questionnaireId).subscribe(
      data => {
        console.log(data);
        // que pasa si es 200 y viene data 
        this.onModalRequest(questionnaireId);
      },
      error => {
        // que pasa si es 500 y no viene data 
        this.nutrientRecommendError(error);
      }
    );
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

  onModalRequest(id: string): void {
    const modalRef = this.errorDialog.open(RecommendModalComponent);
    modalRef.componentInstance.id = id;
    console.log("primero por aqui" + id)
  }

  private nutrientRecommendError(error: HttpErrorResponse) {
    console.error('Error occurred.\n' + error.message);
    const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
    dialogRef.componentInstance.title = 'Error Fetching Nutrients Recommendations!';
    dialogRef.componentInstance.message = error.message;
    dialogRef.componentInstance.router = this.router;
  }
}
