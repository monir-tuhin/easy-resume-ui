import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {UserService} from '../../../shared/services/user.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  personUpdateForm = new FormGroup({
    name: new FormControl('', Validators.compose([
      Validators.required
    ])),
    email: new FormControl('', Validators.compose([
      Validators.required,
    ])),
    dob: new FormControl(''),
    phone: new FormControl('', Validators.compose([
      Validators.required
    ])),
    bloodGroup: new FormControl(''),
    cvTitle: new FormControl('', Validators.compose([
      Validators.required
    ])),
  });

  addressForm = new FormGroup({
    details: new FormControl('', Validators.compose([
      Validators.required
    ])),
    post: new FormControl('', Validators.compose([
      Validators.required
    ])),
    upazila: new FormControl('', Validators.compose([
      Validators.required
    ])),
    district: new FormControl('', Validators.compose([
      Validators.required
    ])),
    user: new FormControl(localStorage.getItem('userId'), Validators.compose([
      Validators.required
    ])),
  });

  socialLinkForm = new FormGroup({
    socialSite: new FormControl(
      //   Validators.compose([
      //   Validators.required
      // ])
    ),
    socialSiteId: new FormControl( Validators.compose([
      Validators.required
    ])),
    link: new FormControl('', Validators.compose([
      Validators.required
    ])),
    user: new FormControl(localStorage.getItem('userId'), Validators.compose([
      Validators.required
    ])),
  });


  // personal details
  id: any;
  dob;
  personalInfo: any = {};
  panelOpenState = false;
  showPersonalInfo = false;
  upadatePersonalUI = false;

  bloodGroupList: any = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  districtList: any = ['Dhaka', 'Khulna', 'Satkhira', 'Jashor', 'Faridpur' ];

  // address details
  addressId: any;
  upadateAddressUI = false;
  upazilaListByDistrict: any
  postListByDistrictAndUpazila: any
  addressInfo: any = {};

// social links
  imagePath = 'assets/images/';
  socialLinkId: any;
  socialSiteVal: any;
  socialLinkList: any = [];
  socialSiteList = [
    {id: '1', siteName: 'Website', icon: 'website.png'},
    {id: '2', siteName: 'Facebook', icon: 'facebook.png'},
    {id: '3', siteName: 'LinkedIn', icon: 'linkedIn.png'},
    {id: '4', siteName: 'Quora', icon: 'quora.png'},
    {id: '5', siteName: 'Reddit', icon: 'reddit.png'},
    {id: '6', siteName: 'Stack Overflow', icon: 'stackoverflow.png'},
    {id: '7', siteName: 'Twitter', icon: 'twitter.png'},
    {id: '8', siteName: 'Github', icon: 'github.png'},
    {id: '9', siteName: 'Bitbucket', icon: 'bitbucket.png'},
    {id: '10', siteName: 'YouTube', icon: 'youtube.png'},
  ];
  isShowSocialLinkForm: boolean = false;
  isShowSocialLInkUpdateBtn: boolean = false;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private snackbar: MatSnackBar, private userService: UserService) {

  }

  ngOnInit() {
    this.getPersonalInfo();
    this.getDistrictList();
    this.getAddressInfo();
    this.getSocialLinkList();
  }


  // personal details

  getPersonalInfo() {
    this.httpClient.get(environment.apiUrl + 'users/me')
      .subscribe(
        res => {
          console.log('res' , res);
          this.personalInfo = res;
          this.dob = moment(this.personalInfo.dob).format('DD-MM-YYYY');
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  toEditPerson(personalInfo) {
    console.log(personalInfo);

    this.id = personalInfo._id;
    this.personUpdateForm.controls.name.setValue(personalInfo.name);
    this.personUpdateForm.controls.email.setValue(personalInfo.email);
    this.personUpdateForm.controls.dob.setValue(personalInfo.dob);
    this.personUpdateForm.controls.phone.setValue(personalInfo.phone);
    this.personUpdateForm.controls.bloodGroup.setValue(personalInfo.bloodGroup);
    this.personUpdateForm.controls.cvTitle.setValue(personalInfo.cvTitle);

    this.upadatePersonalUI = true;
  }

  updatePersonInfo() {
    const submitData = {
      name: this.personUpdateForm.value.name,
      email: this.personUpdateForm.value.email,
      dob: this.personUpdateForm.value.dob,
      phone: this.personUpdateForm.value.phone,
      bloodGroup: this.personUpdateForm.value.bloodGroup,
      cvTitle: this.personUpdateForm.value.cvTitle,
    };
    console.log(submitData);

    const myParams = new HttpParams().append('id', this.id)
    this.httpClient.put(environment.apiUrl + 'users', submitData,
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully Updated', 'Close', {
            duration: 2000
          });
          this. getPersonalInfo();
          this.upadatePersonalUI = false;

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  cancelUpdate() {
    this.upadatePersonalUI = false;
  }


  // address details
  getAddressInfo() {
    const myParams = new HttpParams().append('user', localStorage.getItem('userId'))
    this.httpClient.get(environment.apiUrl + 'addresses/getByUser',
      {params: myParams})
      .subscribe(
        res => {
          console.log('addressInfo' , res);
          this.addressInfo = res;
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  toEditAddress(addressInfo) {
    console.log('ddd', addressInfo);
    this.addressId = addressInfo[0]._id;
    this.addressForm.controls.district.setValue(addressInfo[0].district._id);
    this.getUpazilaListByDistrict( addressInfo[0].district._id)
    this.addressForm.controls.upazila.setValue(addressInfo[0].upazila._id);
    this.getPostListByDistrictAndUpazila(addressInfo[0].district._id, addressInfo[0].upazila._id);
    this.addressForm.controls.post.setValue(addressInfo[0].post._id);
    this.addressForm.controls.details.setValue(addressInfo[0].details);
    // this.addressForm.controls.user.setValue(addressInfo[0].user._id);

    this.upadateAddressUI = true;
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

  getPostListByDistrictAndUpazila(districtId, upazilaId) {
    const myParams = new HttpParams().append('district', districtId)
      .append('upazila', upazilaId)
    this.httpClient.get(environment.apiUrl + 'posts/getByDistrictAndUpazila',
      {params: myParams})
      .subscribe(
        res => {
          console.log('postListByDistrictAndUpazila' , res);
          this.postListByDistrictAndUpazila = res;
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  saveAddress() {
    this.httpClient.post(environment.apiUrl + 'addresses', this.addressForm.value)
      .subscribe(res => {
          this.snackbar.open('Successfully saved', 'Close', {
            duration: 2000
          });
          this. getAddressInfo();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  updateAddress() {
    const myParams = new HttpParams().append('id', this.addressId)
    this.httpClient.put(environment.apiUrl + 'addresses', this.addressForm.value,
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully Updated', 'Close', {
            duration: 2000
          });
          this. getAddressInfo();
          this.upadateAddressUI = false;

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }


  close() {
    this.upadateAddressUI = false;
  }



  // social link details

  getSocialLinkList() {
    const myParams = new HttpParams().append('user',  localStorage.getItem('userId'))
    this.httpClient.get(environment.apiUrl + 'socialLinks/getByUser',
      {params: myParams})
      .subscribe(
        res => {
          console.log('socialLinkList' , res);
          this.socialLinkList = res;
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }


  clearFieldsSocialLInk() {
    this.socialLinkForm.controls.socialSiteId.reset();
    this.socialLinkForm.controls.link.reset();
  }

  saveSocialLink() {
    /*  const submitData = {
        socialSite: this.socialLinkForm.value.socialSite,
        link: this.socialLinkForm.value.link,
        // icon: this.socialLinkForm.value.socialSite.icon,
        user: this.socialLinkForm.value.user,
      }*/

    const socialId = this.socialLinkForm.value.socialSiteId;
    const socialObjById = this.socialSiteList.filter(item => item.id === socialId)[0];
    this.socialLinkForm.get('socialSite').patchValue(socialObjById);
    const submitData = {
      socialSite: this.socialLinkForm.value.socialSite,
      link: this.socialLinkForm.value.link,
      user: this.socialLinkForm.value.user,
    }

    this.httpClient.post(environment.apiUrl + 'socialLinks', submitData)
      .subscribe(res => {
          this.snackbar.open('Successfully saved', 'Close', {
            duration: 2000
          });
          this.closeSocialLinkForm();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  toEditSocialLink(socialLink) {
    this.socialLinkForm.get('socialSiteId').patchValue(socialLink.socialSite.id);
    console.log(socialLink);
    this.socialLinkId = socialLink._id;
    // this.socialSiteVal = socialLink.socialSite.siteName;
    this.socialLinkForm.controls.socialSite.setValue(socialLink.socialSite);
    this.socialLinkForm.controls.link.setValue(socialLink.link);

    this.isShowSocialLinkForm = true;
    this.isShowSocialLInkUpdateBtn = false;
  }

  updateSocialLink() {
    const socialId = this.socialLinkForm.value.socialSiteId;
    const socialObjById = this.socialSiteList.filter(item => item.id === socialId)[0];
    this.socialLinkForm.get('socialSite').patchValue(socialObjById);
    const submitData = {
      socialSite: this.socialLinkForm.value.socialSite,
      link: this.socialLinkForm.value.link,
      user: this.socialLinkForm.value.user,
    }

    // console.log(submitData)
    const myParams = new HttpParams().append('id', this.socialLinkId);
    this.httpClient.put(environment.apiUrl + 'socialLinks', submitData,
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully updated', 'Close', {
            duration: 2000
          });
          this.closeSocialLinkForm();
          this.isShowSocialLInkUpdateBtn = true;

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  deleteSocialLink(socialLink) {
    console.log(socialLink);
    const myParams = new HttpParams().append('id', socialLink._id);
    this.httpClient.delete(environment.apiUrl + 'socialLinks', { params: myParams })
      .subscribe(
        res => {
          this.snackbar.open('Successfully deleted', 'Close', {
            duration: 2000
          });
          this.getSocialLinkList();
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  addSocialLink() {
    this.isShowSocialLinkForm = true;
    this.isShowSocialLInkUpdateBtn = true;
    this.clearFieldsSocialLInk();
  }


  closeSocialLinkForm() {
    this.getSocialLinkList();
    this.isShowSocialLinkForm = false;
  }


}
