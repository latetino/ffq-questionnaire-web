import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/results/results';
import { FFQResultsResponse } from 'src/app/models/ffqresultsresponse';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResultsPageComponent } from '../results-page/results-page.component';
import { FFQResult } from 'src/app/models/FFQResult';
import { RecommendModalComponent } from 'src/app/components/recommend-modal/recommend-modal.component';
import { MatDialog } from '@angular/material';

//Recommend page added by Daykel Muro 10/5/2019
@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {
  results: FFQResultsResponse[] = [];

  constructor(public resultsService: ResultsService,
    private modalService: NgbModal,
    private errorDialog: MatDialog, ) { }

  ngOnInit() {
    this.getAllResults();
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
}
