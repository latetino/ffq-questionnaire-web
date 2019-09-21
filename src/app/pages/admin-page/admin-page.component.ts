import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-questionnaire-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  TITLE = 'FFQR Admin Portal';

  constructor(private activatedRoute: ActivatedRoute,
              private errorDialog: MatDialog,
              private submissionErrorDialog: MatDialog,
              private httpErrorDialog: MatDialog,
              private successDialog: MatDialog,
              private router: Router,
              private modalService: NgbModal) {}
  
  ngOnInit() {
    
  }
}

