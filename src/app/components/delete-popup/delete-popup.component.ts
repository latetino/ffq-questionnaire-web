import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
//import { FoodItemService } from 'src/app/services/food-item/food-item.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ErrorDialogPopupComponent } from '../error-dialog-popup/error-dialog-popup.component';
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response';
import { ClinicianService } from 'src/app/services/clinician/clinician-service';
import { ParentService } from 'src/app/services/parent/parent-service';
import { ClinicService } from 'src/app/services/clinic/clinic-service';
import { FFQClinicResponse } from 'src/app/models/ffqclinic-response';

@Component({
    selector: 'delete-popup',
    templateUrl: './delete-popup.component.html',
    styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent implements OnInit{

    @Input() attributes;
    @Input() service;

    isParent: boolean = false;
    isClinician: boolean = false;
    isClinic: boolean = false;

    ngOnInit()
    {
        if(this.service == "Clinician")
            this.isClinician = true;
        else if(this.service == "Parent")
            this.isParent = true;
        else if(this.service == "Clinic")
            this.isClinic = true;
    }

    constructor(public activeModal: NgbActiveModal,
        //public foodService: FoodItemService,
        private router: Router,
        private errorDialog: MatDialog,
        public clinicianService: ClinicianService,
        public parentService: ParentService,
        public clinicService: ClinicService, 
        
    ) {}

    onClose(): void {
        if(this.isClinician)
        {

            var userName = (<FFQClinicianResponse>this.attributes).username;
            this.clinicianService.deleteItem((<FFQClinicianResponse>this.attributes).userId).subscribe( user => { 
            this.router.navigateByUrl('/admin/users');
            const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
            dialogRef.componentInstance.title = 'Clinician ' + userName + ' was deleted';
            });
        }
        else if(this.isParent)
        {
            var userName = (<FFQClinicianResponse>this.attributes).username;
            this.parentService.deleteItem((<FFQClinicianResponse>this.attributes).userId).subscribe( user => { 
            this.router.navigateByUrl('/admin/users');
            const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
            dialogRef.componentInstance.title = 'Parent ' + userName + ' was deleted';
            });
        }
        else if(this.isClinic)
        {
            var clinicName = (<FFQClinicResponse>this.attributes).clinicname;
            this.clinicService.deleteItem((<FFQClinicResponse>this.attributes).clinicId).subscribe( clinic => { 
            this.router.navigateByUrl('/admin/clinics');
            const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
            dialogRef.componentInstance.title = 'Clinic ' + clinicName + ' was deleted';
            });
        }
        this.activeModal.close('closed');
    }

    onDismiss(reason: String): void {
        this.activeModal.dismiss(reason);
    }
}