import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postForm = new FormGroup({
    postCode: new FormControl('', Validators.compose([
      Validators.required
    ])),
    postName: new FormControl('', Validators.compose([
      Validators.required
    ])),
    upazila: new FormControl('', Validators.compose([
      Validators.required
    ])),
    district: new FormControl('', Validators.compose([
      Validators.required
    ])),
  });

  postId: any;
  isShowPostUpdate = false;
  displayedColumns = ['sl', 'postCode', 'postName', 'upazilaName', 'districtName', 'action'];
  districtList: any;
  upazilaListByDistrict: any;
  postList: any;
  postDataSource: any;

  @ViewChild('postPaginatorId') paginatorPost: MatPaginator;

  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar) {

  }

  ngOnInit() {
    this.getDistrictList();
    this.getPostList();
  }

  getDistrictList() {
    this.httpClient.get(environment.apiUrl + 'districts')
      .subscribe(
        res => {
          console.log('districtList' , res);
          this.districtList = res;
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  getUpazilaListByDistrict(id) {
    const myParams = new HttpParams().append('district', id)
    this.httpClient.get(environment.apiUrl + 'upazilas/getByDistrict',
      {params: myParams})
      .subscribe(
        res => {
          console.log('upazilaListByDistrict' , res);
          this.upazilaListByDistrict = res;
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  clearPostFields() {
    this.postForm.controls.postCode.reset();
    this.postForm.controls.postName.reset();
    // this.postForm.reset();
  }

  savePost() {
    console.log(this.postForm.value);
    this.httpClient.post(environment.apiUrl + 'posts', this.postForm.value)
      .subscribe(res => {
          this.snackbar.open('Successfully Saved', 'Close', {
            duration: 2000
          });
          this.clearPostFields();
          this. getPostList();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  getPostList() {
    this.httpClient.get(environment.apiUrl + 'posts')
      .subscribe(
        res => {
          console.log('postList' , res);
          // this.postList = res;
          setTimeout(() => {
            this.postList = res as any[];
            this.postDataSource = new MatTableDataSource(this.postList);
            this.postDataSource.paginator = this.paginatorPost;
          });
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  goToEditPost(element) {
    /* console.log(this.districtForm.value);
     console.log(element);*/
    this.isShowPostUpdate = true;
    this.postForm.controls.district.setValue(element.district._id);
    this.getUpazilaListByDistrict(element.district._id);
    this.postForm.controls.upazila.setValue(element.upazila._id);
    this.postForm.controls.postCode.setValue(element.postCode);
    this.postForm.controls.postName.setValue(element.postName);
    this.postId = element._id;
  }

  updatePost() {
    const submitData = {
      postCode: this.postForm.value.postCode,
      postName: this.postForm.value.postName,
      upazila: this.postForm.value.upazila,
      district: this.postForm.value.district
    };
    console.log(submitData);
    const myParams = new HttpParams().append('id', this.postId)
    this.httpClient.put(environment.apiUrl + 'posts', submitData,
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully Updated', 'Close', {
            duration: 2000
          });
          this.postForm.reset();
          this. getPostList();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  deletePost(element) {
    const myParams = new HttpParams().append('id', element._id)
    this.httpClient.delete(environment.apiUrl + 'posts',
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully Deleted', 'Close', {
            duration: 2000
          });
          this. getPostList();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

}
