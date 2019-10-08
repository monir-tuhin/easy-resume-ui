import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-person-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  displayedColumns = ['name', 'email'];
  dataSource: any = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.httpClient.get(environment.apiUrl + 'users')
      .subscribe(
        res => {
          console.log('res' , res);
          this.dataSource = res;
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

}
