import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FoodItemService } from '../../services/food-item/food-item.service';
import { FFQItem } from 'src/app/models/ffqitem';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { FFQFoodNutrientsResponse } from 'src/app/models/ffqfoodnutrients-response';
import { PopupComponent } from 'src/app/components/popup/popup.component';

@Component({
  selector: 'app-questionnaire-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

export class AdminPageComponent implements OnInit {

  TITLE = 'FFQR Admin Portal';

  constructor(public foodService: FoodItemService,
    private activatedRoute: ActivatedRoute,
    private errorDialog: MatDialog,
    private submissionErrorDialog: MatDialog,
    private httpErrorDialog: MatDialog,
    private successDialog: MatDialog,
    private router: Router,
    private modalService: NgbModal) { }


  foodNutrients: FFQFoodNutrientsResponse[] = [];
  dataLoaded: Promise<boolean>;


  ngOnInit() {
    this.loadFoodsAndNutrients();
    console.log(this.foodNutrients);
  }
  template: '<button (click)="onModalRequest()">Open Modal</button>'
  
  private handleFoodServiceError(error: HttpErrorResponse) {
    console.error('Error occurred.\n' + error.message);
    const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
    dialogRef.componentInstance.title = 'Error Fetching Food Items';
    dialogRef.componentInstance.message = error.message;
    dialogRef.componentInstance.router = this.router;
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

  private loadFoodsAndNutrients() {
    this.foodService.getAllFoods().subscribe(data => {
      data.map(response => {
        this.foodNutrients.push(response);
      });
      console.log(this.foodNutrients.length + ' foods and its nutrients were returned from server.');
      this.dataLoaded = Promise.resolve(true);
    }, (error: HttpErrorResponse) => this.handleFoodServiceError(error));
  }


  onModalRequest(): void {
    const modalRef = this.modalService.open(PopupComponent);

    modalRef.result.then((result) => {
      console.log(result);
      console.log('closed');
    }).catch((result) => {
      console.log(result);
      console.log('cancelling');
    });
  }



  delFoodItem(id: string): void {

  }

}

