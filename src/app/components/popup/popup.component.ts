import { Component, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FoodItemService } from 'src/app/services/food-item/food-item.service';
import { Router } from '@angular/router';

//  Delete Pop Up confirmation added by Daykel Muro 10/4/2019
@Component({
    selector: 'popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.css']
})
export class PopupComponent {
    
    @Input() id;
    data: any;
    constructor(public activeModal: NgbActiveModal,
                public foodService: FoodItemService,
                private router: Router, ) {
    }

    onClose(): void {
        console.log(this.id)
        this.foodService.deleteFoodItem(this.id).subscribe(newData => {
            this.data = newData;
            this.router.navigateByUrl("/admin");
        });
        this.activeModal.close('closed');
    }

    onDismiss(reason: String): void {
        this.activeModal.dismiss(reason);
    }
}