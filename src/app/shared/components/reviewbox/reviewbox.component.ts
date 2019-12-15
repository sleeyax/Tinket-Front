import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reviewbox',
  templateUrl: './reviewbox.component.html',
  styleUrls: ['./reviewbox.component.scss']
})
export class ReviewboxComponent implements OnInit {

  @Input() reviewId: string;
  @Input() userName: string;
  @Input() score: Number;
  @Input() description: string;
  @Input() deleteButton: boolean;
  @Input() unDeleteButton: boolean;
  @Input() delete: boolean;
  @Input() flag: boolean;
  @Output() deleteClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  deleteClick(reviewId): void{
    this.deleteClicked.emit({
      reviewId
    });
  }

}
