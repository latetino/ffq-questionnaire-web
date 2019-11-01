import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { NutrientsRecommendationsService } from 'src/app/services/nutrients-recommendations/nutrients-recommendations.service';
import { MatDialog } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDialogPopupComponent } from '../error-dialog-popup/error-dialog-popup.component';

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

  ngOnInit() {
      
    // here you need to pass the questionnaire id as parameter
    this.getNutrientsRecommendations(this.id);
    console.log("ID from recommend component:" +" " + this.id)
  }

  private getNutrientsRecommendations(questionnaireId: string){
    this.nutrientsRecommendationsService.getNutrientsRecommendationsByQuestionnaireId(questionnaireId).subscribe(
      data => { 
        console.log( "Inside the function that calls the service" + " " + questionnaireId)
        console.log(data);
        // que pasa si es 200 y viene data   
      },
      error => {
        // que pasa si es 500 y no viene data 
        this. nutrientRecommendError(error);
      }
    );
  }

  private nutrientRecommendError(error: HttpErrorResponse) {
    console.error('Error occurred.\n' + error.message);
    const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
    dialogRef.componentInstance.title = 'Error Fetching Nutrients Recommendations!';
    dialogRef.componentInstance.message = error.message;
    dialogRef.componentInstance.router = this.router;
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/admin');
    });
  }

 }