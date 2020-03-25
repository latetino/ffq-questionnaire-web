import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommend-parental',
  templateUrl: './recommend-parental.component.html',
  styleUrls: ['./recommend-parental.component.css']
})
export class RecommendParentalComponent implements OnInit {

  showBracketFirst = true;
  showBracketSecond = false;
  showBracketThird = false;

  constructor() { }

  ngOnInit() {
  }

  public showFirst() {
    this.showBracketFirst = true;
    this.showBracketSecond = false;
    this.showBracketThird = false;
  }
  public showSecond() {
    this.showBracketFirst = false;
    this.showBracketSecond = true;
    this.showBracketThird = false;
  }
  public showThird() {
    this.showBracketFirst = false;
    this.showBracketSecond = false;
    this.showBracketThird = true;
  }

}
