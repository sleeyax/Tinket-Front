import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-application-card',
  templateUrl: './application-card.component.html',
  styleUrls: ['./application-card.component.scss']
})
export class ApplicationCardComponent implements OnInit {
  @Input() title: String;
  @Input() location: String;
  @Input() routerLink: String;
  @Input() selected: boolean;
  @Input() open: boolean;
  @Input() archived: boolean;

  constructor() { }

  get statusDescription() : String {
    if(this.selected) return "Gefeliciteerd met je nieuwe opdracht! 🥳";
    if(this.archived) return "Opdracht afgerond.";
    if(this.open) return "Open voor inschrijvingen.";
    return "Gesloten voor inschrijvingen.";
  }

  ngOnInit() {
  }

}
