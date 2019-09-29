import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fooditem',
  templateUrl: './fooditem.component.html',
  styleUrls: ['./fooditem.component.css']
})
export class FooditemComponent implements OnInit {

  TITLE = 'FFQR Food Item Portal';
  
  constructor() { }

  ngOnInit() {
  }

}
