import { Component } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

//  Delete Pop Up confirmation added by Daykel Muro 10/4/2019
@Component({
    selector: 'popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.css']
})
export class PopupComponent {

    constructor(public activeModal: NgbActiveModal) {
    }

    onClose(): void {
        this.activeModal.close('closed');
    }
    onDismiss(reason: String): void {
        this.activeModal.dismiss(reason);
    }
}