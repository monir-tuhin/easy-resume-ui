import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  districtForm = new FormGroup({
    districtName: new FormControl('', Validators.compose([
      Validators.required
    ])),
  });

  districtId: any;
  isShowDistrictUpdate = false;
  displayedColumnsDistrict = ['sl', 'districtName', 'action'];
  districtList: any;
  districtDataSource: any;

  @ViewChild('districtPaginatorId') paginatorDistrict: MatPaginator;



  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar) {

  }

  ngOnInit() {
    this.getDistrictList();
  }

  clearDistrictFields() {
    console.log(this.districtForm);
    console.log(this.districtForm.value.districtName);
    this.districtForm.reset();
  }

  saveDistrict() {
    console.log(this.districtForm.value);
    this.httpClient.post(environment.apiUrl + 'districts', this.districtForm.value)
      .subscribe(res => {
          this.snackbar.open('Successfully Saved', 'Close', {
            duration: 2000
          });
          this.clearDistrictFields();
          this. getDistrictList();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  getDistrictList() {
    this.httpClient.get(environment.apiUrl + 'districts')
      .subscribe(
        res => {
          console.log('res' , res);
          // this.districtList = res;
          setTimeout(() => {
            this.districtList = res as any[];
            this.districtDataSource = new MatTableDataSource(this.districtList);
            this.districtDataSource.paginator = this.paginatorDistrict;
          });
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  goToEditDistrict(element) {
    /*  console.log(this.districtForm.value);
      console.log(element);*/
    this.isShowDistrictUpdate = true;
    this.districtForm.controls.districtName.setValue(element.districtName);
    this.districtId = element._id;
  }

  updateDistrict() {

    const submitData = {
      districtName: this.districtForm.value.districtName
    };

    const myParams = new HttpParams().append('id', this.districtId)
    this.httpClient.put(environment.apiUrl + 'districts', submitData,
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully Updated', 'Close', {
            duration: 2000
          });
          this.clearDistrictFields();
          this. getDistrictList();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  deleteDistrict(element) {
    const myParams = new HttpParams().append('id', element._id)
    this.httpClient.delete(environment.apiUrl + 'districts',
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully Deleted', 'Close', {
            duration: 2000
          });
          this. getDistrictList();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

}
