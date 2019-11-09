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
  templateUrl: './recommend-modal.component.html',
  styleUrls: ['./recommend-modal.component.css']
})
export class RecommendModalComponent {

  @Input() id;

  constructor(
    public nutrientsRecommendationsService: NutrientsRecommendationsService,
    private modalService: NgbModal,
    private errorDialog: MatDialog,
    private router: Router, ) { }

  recommendedNutrients: FFQNutrientsRecommendations[] = [];

  ngOnInit() {
    this.getNutrientsRecommendations(this.id);
  }

  private getNutrientsRecommendations(questionnaireId: string) {
    this.nutrientsRecommendationsService.getNutrientsRecommendationsByQuestionnaireId(questionnaireId).subscribe(
      data => {
        this.recommendedNutrients.push(data);
      },
    );
  }
}