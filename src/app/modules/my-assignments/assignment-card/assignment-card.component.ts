import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-assignment-card',
  templateUrl: './assignment-card.component.html',
  styleUrls: ['./assignment-card.component.scss']
})
export class AssignmentCardComponent implements OnInit {
  @Input() title: String;
  @Input() location: String;
  @Input() routerLink: String;
  @Input() open: boolean;
  @Input() archived: boolean;

  constructor() { }

  ngOnInit() {
  }

}
