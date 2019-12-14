import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reviewbox',
  templateUrl: './reviewbox.component.html',
  styleUrls: ['./reviewbox.component.scss']
})
export class ReviewboxComponent implements OnInit {

  @Input() userName: string;
  @Input() score: Number;
  @Input() description: string;

  constructor() { }

  ngOnInit() {
  }

}
