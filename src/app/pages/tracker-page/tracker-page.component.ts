import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracker-page',
  templateUrl: './tracker-page.component.html',
  styleUrls: ['./tracker-page.component.css']
})
export class TrackerPageComponent implements OnInit {

  TITLE = 'Nutrition Tracker';
  MAIN_MESSAGE = 'Message';
  INSTRUCTIONS_TITLE = 'Instructions: \n';
  BULLETED_INSTRUCTIONS = [
    'For each food item select the appropriate answer',
    'If your child consumed the designated amount press the box',
    'If your child consumed more than the designated amount press the up arrow',
    'If your child consumed less than the designated amount press the down arrow',
    'Click the submit button when finished.'
  ];

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
