import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: String;
  @Input() parentTitle: String;
  @Input() parentRouterLink: String;
  @Input() fixed: boolean;
  @Input() underline: boolean;
  @Input() subtitle: String;

  constructor() { }

  ngOnInit() {
  }

}
