import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {

  @Input() vraag: string;
  @Input() rating: number;
  @Output() starClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() ratingValue: number;
  @Input() clickAble: boolean;
  @Input() underline: boolean;

  ngOnInit() {
    console.log(this.ratingValue)
    if (this.ratingValue) {
      this.rating = Number(this.ratingValue)
      console.log(this.ratingValue)
    }
  }

  onClick(rating: number): void {
    console.log(this.clickAble)
    if (this.clickAble == false) {
      this.rating = rating;
      this.starClick.emit({
        rating: rating
      });
    }
  }
}
