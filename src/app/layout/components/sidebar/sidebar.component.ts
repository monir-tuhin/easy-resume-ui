import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  events: string[] = [];
  opened: boolean;

  constructor() { }

  ngOnInit() {
  }

  onLoggedout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
  }


}
