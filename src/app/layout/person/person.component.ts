import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;

  constructor( private router: Router) {
    this.navLinks = [
      {
        label: 'Personal',
        link: './personal',
        index: 0
      },
      {
        label: 'Education',
        link: './education',
        index: 1
      },
      {
        label: 'Employment',
        link: './employment',
        index: 2
      },
      {
        label: 'Career',
        link: './career',
        index: 3
      },
      {
        label: 'Photograph',
        link: './photograph',
        index: 4
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
