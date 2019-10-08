import { Component, ElementRef, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../shared/services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
const URL = 'http://localhost:3000/api/';

@Component({
  selector: 'app-photograph',
  templateUrl: './photograph.component.html',
  styleUrls: ['./photograph.component.css']
})
export class PhotographComponent implements OnInit {
  imageViewAfterUpload = '';
  imagePreview: any;
  imageForSave: File = null;
  enableUpload = false;
  photoInfo: any = [];

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private snackbar: MatSnackBar, private router: Router,
              private userService: UserService, private el: ElementRef) {

  }

  ngOnInit() {
    // this.getPhotoByUser();
    this.getPhotoInfoByUser();
  }

  onFileChange(event) {
    console.log(event.target.files[0]);
    // const selectedFile: any = event.target.files[0];
    const selectedFile: any = event.target.files[0];

    this.imageForSave = selectedFile;  // uploaded photo binding here
    const fileSize = selectedFile.size;
    const fileType = selectedFile.type;
    const fileSizeRound = Math.round(fileSize / 1024);
    // this.imagePreview = event.target.files[0].result;


    if (fileType === 'image/png' || fileType === 'image/jpeg') {
      if (fileSizeRound <= 1024) {
        this.enableUpload = true;
        const files = event.target.files;
        if (files) {
          for (const file of files) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
              this.imagePreview = e.target.result;
            };
            reader.readAsDataURL(file);
          }
        }
      } else {
        this.enableUpload = false;
        window.alert('Too large (' + fileSizeRound + 'KB )' + '. Your file size must be below 1 MB' );
      }
    } else {
      this.enableUpload = false;
      window.alert('The image file must be jpeg or png');
    }
  }

  uploadPhoto() {
    console.log(this.imageForSave);

    // file upload method 1
   /*   const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
      console.log('iam+ ' + inputEl);
      const fileCount: number = inputEl.files.length;
      const formData = new FormData();
      if (fileCount > 0) { // a file was selected
        for (let i = 0; i < fileCount; i++) {
          formData.append('photo', inputEl.files.item(i));
          formData.append('user', localStorage.getItem('userId'));
        }
      }*/

    // file upload method 2
    const formData = new FormData();
    formData.append('photo', this.imageForSave, this.imageForSave.name);
    formData.append('user', localStorage.getItem('userId'));

    this.httpClient.post(environment.apiUrl + 'photographs', formData)
      .subscribe((res) => {
          console.log('Upload Success');
          this.snackbar.open('Successfully Uploaded', 'Close', {
            duration: 2000
          });

          // this.reloadCurrentRoute();
          location.reload();
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  getPhotoByUser() {
    console.log(this.imageViewAfterUpload);
    const myParams = new HttpParams().append('user',  localStorage.getItem('userId'));
    this.httpClient.get(environment.apiUrl + 'photographs/getPhotoByUser',
      {params: myParams});
    this.imageViewAfterUpload = environment.baseUrl + 'api/photographs/getPhotoByUser?user=' + localStorage.getItem('userId');
  }

  getPhotoInfoByUser() {
    console.log(this.imageViewAfterUpload);
    const myParams = new HttpParams().append('user',  localStorage.getItem('userId'));
    this.httpClient.get(environment.apiUrl + 'photographs/getPhotoInfoByUser',
      {params: myParams})
      .subscribe(
        res => {
          console.log('photoInfo' , res);
          this.photoInfo = res;

          if (this.photoInfo.length > 0) {
            this.getPhotoByUser();
          }


        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  deletePhotoByUser() {
    const myParams = new HttpParams().append('id', this.photoInfo[0]._id);
    this.httpClient.delete(environment.apiUrl + 'photographs',
      {params: myParams})
      .subscribe(
        res => {
          this.snackbar.open('Successfully deleted', 'Close', {
            duration: 2000
          });
          this.getPhotoInfoByUser();

        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  /* reloadCurrentRoute() {
     this.router.navigateByUrl(environment.rootUrl + 'person/photograph', {skipLocationChange: true}).then(() =>
       this.router.navigate([environment.rootUrl + 'person/photograph']));
   }*/


}
