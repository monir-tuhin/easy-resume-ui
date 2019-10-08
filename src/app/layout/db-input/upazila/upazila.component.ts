import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-upazila',
  templateUrl: './upazila.component.html',
  styleUrls: ['./upazila.component.css']
})
export class UpazilaComponent implements OnInit {
  upazilaForm = new FormGroup({
    district: new FormControl('', Validators.compose([
      Validators.required
    ])),
    upazilaName: new FormControl('', Validators.compose([
      Validators.required
    ])),
  });

  upazilaId: any;
  isShowUpazilaUpdate = false;
  displayedColumns = ['sl', 'upazilaName', 'districtName', 'action'];
  districtListForUpazila: any;
  upazilaList: any;
  upazilaDataSource: any;

  @ViewChild('upazilaPaginatorId') paginatorUpazila: MatPaginator;

  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar) {

  }

  ngOnInit() {
    this.getDistrictList();
    this.getUpazilaList();
  }

  getDistrictList() {
    this.httpClient.get(environment.apiUrl + 'districts')
      .subscribe(
        res => {
          console.log('districtListForUpazila' , res);
          this.districtListForUpazila = res;
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  clearUpazilaFields() {
    console.log(this.upazilaForm);
    console.log(this.upazilaForm.value.upazilaName);
    this.upazilaForm.controls.upazilaName.reset();
    // this.upazilaForm.reset();
  }

  saveUpazila() {
    console.log(this.upazilaForm.value);
    this.httpClient.post(environment.apiUrl + 'upazilas', this.upazilaForm.value)
      .subscribe(res => {
          this.snackbar.open('Successfully Saved', 'Close', {
            duration: 2000
          });
          this.clearUpazilaFields();
          this. getUpazilaList();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  getUpazilaList() {
    this.httpClient.get(environment.apiUrl + 'upazilas')
      .subscribe(
        res => {
          console.log('upazilaList' , res);
          // this.upazilaList = res;
          setTimeout(() => {
            this.upazilaList = res as any[];
            this.upazilaDataSource = new MatTableDataSource(this.upazilaList);
            this.upazilaDataSource.paginator = this.paginatorUpazila;
          });
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  goToEditUpazila(element) {
   /* console.log(this.districtForm.value);
    console.log(element);*/
    this.isShowUpazilaUpdate = true;
    this.upazilaForm.controls.district.setValue(element.district._id);
    this.upazilaForm.controls.upazilaName.setValue(element.upazilaName);
    this.upazilaId = element._id;
  }

  updateUpazila() {

    const submitData = {
      upazilaName: this.upazilaForm.value.upazilaName,
      district: this.upazilaForm.value.district
    };
    console.log(submitData);
    const myParams = new HttpParams().append('id', this.upazilaId)
    this.httpClient.put(environment.apiUrl + 'upazilas', submitData,
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully Updated', 'Close', {
            duration: 2000
          });
          this.upazilaForm.reset();
          this. getUpazilaList();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  deleteUpazila(element) {
    const myParams = new HttpParams().append('id', element._id)
    this.httpClient.delete(environment.apiUrl + 'upazilas',
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully Deleted', 'Close', {
            duration: 2000
          });
          this. getUpazilaList();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

}
