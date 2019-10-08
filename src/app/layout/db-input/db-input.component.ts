import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-person',
  templateUrl: './db-input.component.html',
  styleUrls: ['./db-input.component.css']
})
export class DbInputComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'District',
        link: './district',
        index: 0
      },
      {
        label: 'Upazila',
        link: './upazila',
        index: 1
      },
      {
        label: 'Post Office',
        link: './post',
        index: 2
      },
      {
        label: 'Skill',
        link: './skill',
        index: 3
      },
      {
        label: 'Education Level',
        link: './educationLevel',
        index: 4
      },
      {
        label: 'Exam/Degree Title',
        link: './examTitle',
        index: 5
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}


