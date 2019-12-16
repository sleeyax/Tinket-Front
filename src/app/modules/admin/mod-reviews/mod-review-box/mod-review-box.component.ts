import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/nl';


@Component({
  selector: 'app-mod-review-box',
  templateUrl: './mod-review-box.component.html',
  styleUrls: ['./mod-review-box.component.scss']
})
export class ModReviewBoxComponent implements OnInit {

  constructor() { }
  @Input() reviewId: string;
  @Input() userName: string;
  @Input() score: Number;
  @Input() flaggedAt: Date;
  @Input() description: string;
  @Output() solveClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteClicked: EventEmitter<any> = new EventEmitter<any>();
  @Input() reviewedPersoon: string;

  datum: String;

  deleteClick(reviewId): void{
    this.deleteClicked.emit({
      reviewId,
      delete: true
    });
  }

  solveClick(reviewId): void{
    this.solveClicked.emit({
      reviewId,
      solve: true
    });
  }

  ngOnInit() {
   this.datum = moment(this.flaggedAt).fromNow()
  }
}
