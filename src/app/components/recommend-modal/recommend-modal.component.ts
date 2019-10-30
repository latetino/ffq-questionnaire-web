import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { NutrientsRecommendationsService } from 'src/app/services/nutrients-recommendations/nutrients-recommendations.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-recommend-modal',
  templateUrl: './recommend-modal.component.html',
  styleUrls: ['./recommend-modal.component.css']
})
export class RecommendModalComponent {

  @Input() id;

 }