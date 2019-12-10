import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() open: boolean;
  @Output() close = new EventEmitter();

  constructor() { }

  closeMe() {
    this.close.emit();
  }

  onContainerClick(event) {
    event.stopPropagation();
  }
  
  ngOnInit() {
  }

}
