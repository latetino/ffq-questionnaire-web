import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NutrientsRecommendationsService } from 'src/app/services/nutrients-recommendations/nutrients-recommendations.service';
import { MatDialog } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDialogPopupComponent } from '../error-dialog-popup/error-dialog-popup.component';
import { FFQNutrientsRecommendations, Recommendation } from 'src/app/models/ffqnutrients-recommendations';

@Component({
  selector: 'app-recommend-modal',
  templateUrl: './food-recommend-modal.component.html',
  styleUrls: ['./food-recommend-modal.component.css']
})
export class FoodRecommendModalComponent {

  @Input() id;

  constructor(
    public nutrientsRecommendationsService: NutrientsRecommendationsService,
    private modalService: NgbModal,
    private errorDialog: MatDialog,
    private router: Router, ) { }

  recommendedNutrients: FFQNutrientsRecommendations[] = [];

  ngOnInit() {
    this.getFoodRecommendations(this.id);
  }

  private getFoodRecommendations(questionnaireId: string) {
    this.nutrientsRecommendationsService.getNutrientsRecommendationsByQuestionnaireId(questionnaireId).subscribe(
      data => {
        this.recommendedNutrients.push(data);
      },
    );
  }
}