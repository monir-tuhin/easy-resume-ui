import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';
import * as moment from 'moment';
import {FormBuilder} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-templateone',
  templateUrl: './templateone.component.html',
  styleUrls: ['./templateone.component.css']
})
export class TemplateoneComponent implements OnInit {
  imagePath = 'assets/images/';
  totalExperience = 0;
  imageViewAfterUpload = '';
  pdfOpenLink = environment.baseUrl + 'api/pdfGenerate/showPdf'

  cvPersonInfo: any = {};
  careerSummary: any = {};
  addressInfo: any = {};
  socialLinkInfo: any = [];
  skills: any = [];
  employmentInfo: any = [];
  trainingInfo: any = [];
  educationInfo: any = [];
  referenceInfo: any = [];
  photographInfo: any = {};


  constructor(private httpClient: HttpClient, private userService: UserService) {}


  ngOnInit() {
    this.getCvPersonInfo();
    this.getCvDetailInfoForPDF();
    this.getPhotoByUser();
    // this.pdfGenerateRenderView();
    // this.showPdf();
    // this.writePdf();
  }

  getCvPersonInfo() {
    this.httpClient.get(environment.apiUrl + 'pdfGenerate/me')
      .subscribe(
        res => {
          console.log('cvPersonInfo' , res);
          this.cvPersonInfo = res;
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  getCvDetailInfoForPDF() {
    const myParams = new HttpParams().append('user',  localStorage.getItem('userId'));
    this.httpClient.get(environment.apiUrl + 'pdfGenerate/getInfoById', {params: myParams})
      .subscribe(
        res => {
          console.log('cvDetailInfo' , res);
          this.careerSummary = res['career'][0];
          this.addressInfo = res['addressInfo'][0];
          this.socialLinkInfo = res['socialLinkInfo'];
          this.skills = res['skills'];

          this.employmentInfo = res['employmentInfo'];
          this.getTotalExperience();

          this.trainingInfo = res['trainingInfo'];
          this.educationInfo = res['educationInfo'];
          this.referenceInfo = res['referenceInfo'];
          this.photographInfo = res['photographInfo'][0];

          console.log('infooo:', this.employmentInfo);

          this.writePdf();
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  getTotalExperience() {
    let endDate;
    this.totalExperience = 0;

    for (const employment of this.employmentInfo) {
      const startDate = moment(employment.jobPeriodFrom);

      if (employment.currentlyWorking === true) {
        endDate = moment(new Date());
      } else {
        endDate = moment(employment.jobPeriodTo);
      }

      const expTemp = endDate.diff(startDate, 'years', true);
      this.totalExperience += expTemp;
      this.totalExperience = Math.round(this.totalExperience * 10) / 10;
    }
  }

  getPhotoByUser() {
    console.log(this.imageViewAfterUpload);
    const myParams = new HttpParams().append('user',  localStorage.getItem('userId'));
    this.httpClient.get(environment.apiUrl + 'photographs/getPhotoByUser',
      {params: myParams});
    this.imageViewAfterUpload = environment.baseUrl + 'api/photographs/getPhotoByUser?user=' + localStorage.getItem('userId');
  }

  pdfGenerateRenderView() {
    this.httpClient.get(environment.apiUrl + 'pdfGenerate/renderView')
      .subscribe(
        res => {
          console.log('renderView' , res);
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  writePdf() {
    this.httpClient.get(environment.apiUrl + 'pdfGenerate/writePdf')
      .subscribe(
        res => {
          console.log('showPdf' , res);
          if (res['message'] === 'success') {
            // this.pdfGenerateRenderView();
            this.showPdf();
          }

        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  showPdf() {
    this.httpClient.get(environment.apiUrl + 'pdfGenerate/showPdf')
      .subscribe(
        res => {
          console.log('showPdf' , res);
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }



 /* openTryFunction() {
    this.functionOne()
      .subscribe(
        () => this.functionTwo()
          .subscribe(() => this.functionThree()
            .subscribe(() => console.log('Function three terminated')))
      );
  }


  openTryFunction() {
    this.getCvPersonInfo().then(() => {
      this.functionTwo().then(() => this.functionThree());
    });
  }*/



}
