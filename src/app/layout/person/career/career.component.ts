import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {map, startWith, filter} from 'rxjs/operators';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {
  careerSummaryForm = new FormGroup({
    careerSummary: new FormControl('', Validators.compose([
      Validators.required
    ])),
    user: new FormControl(localStorage.getItem('userId'), Validators.compose([
      Validators.required
    ])),
  });

  referenceForm = new FormGroup({
    name: new FormControl('', Validators.compose([
      Validators.required
    ])),
    designation: new FormControl('', Validators.compose([
      Validators.required
    ])),
    organization: new FormControl('', Validators.compose([
      Validators.required
    ])),
    contactNumber: new FormControl(),
    email: new FormControl(),
    relation: new FormControl(),
    user: new FormControl(localStorage.getItem('userId'), Validators.compose([
      Validators.required
    ])),
  });

  skillForm  = new FormGroup({
    skill: new FormControl(),
    user: new FormControl(localStorage.getItem('userId'), Validators.compose([
      Validators.required
    ])),
  });

  // career summary
  careerSummaryId: any;
  careerSummary: any = {};
  isShowCareerSumForm: boolean = false;

  // skills
  specialSkillId: any;
  selectedSpecialSkillList: any = [];
  allSkillList: any = [];
  isShowSkillForm: boolean = false;
  isShowSpecialSkillUpdateBtn: boolean = false;

  skillControl: FormControl = new FormControl();
  user: FormControl = new FormControl(localStorage.getItem('userId'), Validators.compose([
    Validators.required ]));

  filteredOptions: Observable<any[]>;

  // references
  referenceId: any;
  referenceList: any = [];
  relationList: any = ['Academic', 'Family Friend', 'Other', 'Professional', 'Relative']
  isShowReferencesForm: boolean = false;
  isShowUpdateBtn: boolean = false;


  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private snackbar: MatSnackBar, private userService: UserService) {

  }

  ngOnInit() {
    this.getCareerSummary();
    this.getReferences();
    this.getAllSkills();
    this.getSelectedSpecialSkill();

    this.filteredOptions = this.skillControl.valueChanges
      .pipe(
        startWith(''),
        map(val => val.length >= 1 ? this.filter(val) : [])
      );

  }

  // career summary
  saveCareerSummary() {
    this.httpClient.post(environment.apiUrl + 'careerSummaries', this.careerSummaryForm.value)
      .subscribe(res => {
          this.snackbar.open('Successfully saved', 'Close', {
            duration: 2000
          });
          this.closeCareerSummaryForm();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  toEditCareerSummary(careerSummary) {
    this.careerSummaryId = careerSummary._id;
    this.careerSummaryForm.controls.careerSummary.setValue(careerSummary.careerSummary);
    // this.careerSummaryForm.controls.user.setValue(careerSummary.user);

    this.isShowCareerSumForm = true;
  }

  updateCareerSummary() {
    const myParams = new HttpParams().append('id', this.careerSummaryId)
    this.httpClient.put(environment.apiUrl + 'careerSummaries', this.careerSummaryForm.value,
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully updated', 'Close', {
            duration: 2000
          });
          this.closeCareerSummaryForm();
        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 6000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );  }

  getCareerSummary() {
    const myParams = new HttpParams().append('user',  localStorage.getItem('userId'))
    this.httpClient.get(environment.apiUrl + 'careerSummaries/getByUser',
      {params: myParams})
      .subscribe(
        res => {
          console.log('careerSummary' , res);
          this.careerSummary = res;
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  closeCareerSummaryForm() {
    this.getCareerSummary()
    this.isShowCareerSumForm = false;

  }


  // special skills

  filter(val: string): string[] {
    // debugger;
    return this.allSkillList.filter(option =>
      option.skill.toLowerCase().indexOf(val.toLowerCase()) === 0);

  }

  getAllSkills () {
    this.httpClient.get(environment.apiUrl + 'skills')
      .subscribe(
        res => {
          console.log('allSkillList' , res);
          this.allSkillList = res;
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  getSelectedSpecialSkill() {
    const myParams = new HttpParams().append('user',  localStorage.getItem('userId'))
    this.httpClient.get(environment.apiUrl + 'specialSkills/getByUser',
      {params: myParams})
      .subscribe(
        res => {
          console.log('selectedSpecialSkillList' , res);
          this.selectedSpecialSkillList = res;
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  clearFields() {
    this.skillControl.reset();
  }

  saveSpecialSkill() {

    const submitData = {
      skill: this.skillControl.value,
      user: this.user.value,
    }
    console.log(submitData);

    this.httpClient.post(environment.apiUrl + 'specialSkills', submitData)
      .subscribe(res => {
          this.snackbar.open('Successfully saved', 'Close', {
            duration: 2000
          });
          this.closeSpecialSkillForm();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  toEditSelectedSkill(specialSkill) {
    console.log(specialSkill);

    this.specialSkillId = specialSkill._id;
    this.skillControl.setValue(specialSkill.skill);

    this.isShowSkillForm = true;
    this.isShowSpecialSkillUpdateBtn = false;
  }

  updateSpecialSkill() {
    const submitData = {
      skill: this.skillControl.value,
      user: this.user.value,
    }
    const myParams = new HttpParams().append('id', this.specialSkillId)
    this.httpClient.put(environment.apiUrl + 'specialSkills', submitData,
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully updated', 'Close', {
            duration: 2000
          });
          this.closeSpecialSkillForm();
          this.isShowSpecialSkillUpdateBtn = true;

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  deleteSelectedSkill(selectedSpecialSkill) {
    console.log(selectedSpecialSkill);
        const myParams = new HttpParams().append('id', selectedSpecialSkill._id);
        this.httpClient.delete(environment.apiUrl + 'specialSkills', { params: myParams })
          .subscribe(
            res => {
              this.snackbar.open('Successfully deleted', 'Close', {
                duration: 2000
              });
              this.getSelectedSpecialSkill();
            },
            msg => {
              console.error(`Error: ${msg.status} ${msg.statusText}`);
            }
          );
  }

  addSpecialSkill() {
    this.isShowSkillForm = true;
    this.isShowSpecialSkillUpdateBtn = true;
    this.clearFields();
  }

  closeSpecialSkillForm() {
    this.getSelectedSpecialSkill();
    this.isShowSkillForm = false;
    // this.clearSkillFields ();
  }






  // references
  clearReferenceFields() {
    this.referenceForm.controls.name.reset();
    this.referenceForm.controls.designation.reset();
    this.referenceForm.controls.organization.reset();
    this.referenceForm.controls.contactNumber.reset();
    this.referenceForm.controls.email.reset();
    this.referenceForm.controls.relation.reset();

    // this.referenceForm.reset();
  }

  saveReference() {
    this.httpClient.post(environment.apiUrl + 'references', this.referenceForm.value)
      .subscribe(res => {
          this.snackbar.open('Successfully saved', 'Close', {
            duration: 2000
          });
          this.closeReferenceForm();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  getReferences() {
    const myParams = new HttpParams().append('user',  localStorage.getItem('userId'))
    this.httpClient.get(environment.apiUrl + 'references/getByUser',
      {params: myParams})
      .subscribe(
        res => {
          console.log('referenceList' , res);
          this.referenceList = res;
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  toEditReference(reference) {
    console.log(reference);

    this.referenceId = reference._id;
    this.referenceForm.controls.name.setValue(reference.name);
    this.referenceForm.controls.designation.setValue(reference.designation);
    this.referenceForm.controls.organization.setValue(reference.organization);
    this.referenceForm.controls.contactNumber.setValue(reference.contactNumber);
    this.referenceForm.controls.email.setValue(reference.email);
    this.referenceForm.controls.relation.setValue(reference.relation);
    // this.referenceForm.controls.user.setValue(reference.user);

    this.isShowReferencesForm = true;
    this.isShowUpdateBtn = false;
  }

  updateReference() {
    const myParams = new HttpParams().append('id', this.referenceId)
    this.httpClient.put(environment.apiUrl + 'references', this.referenceForm.value,
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully updated', 'Close', {
            duration: 2000
          });
          this.closeReferenceForm();
          this.isShowUpdateBtn = true;

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  deleteReference(reference) {
    const myParams = new HttpParams().append('id', reference._id)
    this.httpClient.delete(environment.apiUrl + 'references',
      {params: myParams})
      .subscribe(
        res => {
          this.snackbar.open('Successfully deleted', 'Close', {
            duration: 2000
          });
          this.getReferences();
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  addReference() {
    this.isShowReferencesForm = true;
    this.isShowUpdateBtn = true;
  }

  closeReferenceForm() {
    this.getReferences();
    this.isShowReferencesForm = false;
    this.clearReferenceFields ();
  }

}
