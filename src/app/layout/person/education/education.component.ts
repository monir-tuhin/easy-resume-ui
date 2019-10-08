import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  academicForm = new FormGroup({
    educationLevel: new FormControl('', Validators.compose([
      Validators.required
    ])),
    exam: new FormControl('', Validators.compose([
      Validators.required
    ])),
    major: new FormControl('', Validators.compose([
      Validators.required
    ])),
    board: new FormControl('', Validators.compose([])),
    institute: new FormControl('', Validators.compose([
      Validators.required
    ])),
    result: new FormControl('', Validators.compose([
      Validators.required
    ])),
    marks: new FormControl('', Validators.compose([])),
    cgpa: new FormControl(''),
    scale: new FormControl(''),
    passingYear: new FormControl('', Validators.compose([
      Validators.required
    ])),
    duration: new FormControl('', Validators.compose([
    ])),
    achievement: new FormControl('', Validators.compose([
    ])),
    user: new FormControl(localStorage.getItem('userId'), Validators.compose([
      Validators.required
    ])),
    resultType: new FormControl('', Validators.compose([
      Validators.required
    ])),
  });

  trnSummaryForm = new FormGroup({
    trainingTitle: new FormControl('', Validators.compose([
      Validators.required
    ])),
    country: new FormControl('', Validators.compose([
      Validators.required
    ])),
    topics: new FormControl('', Validators.compose([
      Validators.required
    ])),
    trainingYear: new FormControl('', Validators.compose([
      Validators.required
    ])),
    institute: new FormControl('', Validators.compose([
      Validators.required
    ])),
    duration: new FormControl('', Validators.compose([
      Validators.required
    ])),
    location: new FormControl(''),
    user: new FormControl(localStorage.getItem('userId'), Validators.compose([
      Validators.required
    ])),
  });

  profCertForm = new FormGroup({
    certification: new FormControl('', Validators.compose([
      Validators.required
    ])),
    institute: new FormControl('', Validators.compose([
      Validators.required
    ])),
    certPeriodFrom: new FormControl('', Validators.compose([
      Validators.required
    ])),
    certPeriodTo: new FormControl('', Validators.compose([
      Validators.required
    ])),
    user: new FormControl(localStorage.getItem('userId'), Validators.compose([
      Validators.required
    ]))
  });


  // academic
  academicId: any;
  isShowBoard: boolean = false;
  isShowSaveEducation: boolean = false;
  isShowEducationUpdateBtn: boolean = false;
  educationList: any = [];
  educationLevelList: any = [];
  examListByEduLevel: any = [];
  boardList = [ 'Barishal', 'Chattogram', 'Cumilla', 'Dhaka', 'Dinajpur', 'Jashore', 'Sylhet', 'Madrasah', 'Technical', 'Cambridge ', 'Edexcel' ];
  resultTypeList = [ 'Grade', 'Division' ];
  resultList: any = [];
  gradeScaleList = [ 4, 5 ];


  // training summary
  trnSummaryId: any;
  isShowSaveTrnSummary: boolean = false;
  isShowTrnSummaryUpdateBtn: boolean = false;
  trnSummaryList: any = [];


  // professional certification
  profCertId: any;
  isShowSaveProfCert: boolean = false;
  isShowProfCertUpdateBtn: boolean = false;
  profCertificationList: any = [];


  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private snackbar: MatSnackBar) {
    // this.resultType = new FormControl('Grade');
  }

  ngOnInit() {
    this.academicForm.controls.resultType.setValue('Grade');
    this.getEducations();
    this.getTrnSummary();
    this.getCertifications();
    this.getEducationLevelList();
    this.radioResultTypeChangeAction(this.academicForm.value.resultType);
  }


  // academic

  radioResultTypeChangeAction(resultType) {
    // this.scale = null;
    console.log(resultType);
    this.academicForm.controls.result.setValue('');
    if (resultType === 'Division') {
      this.resultList = [ 'First Division/Class', 'Second Division/Class', 'Third Division/Class' ];
      this.academicForm.controls.cgpa.setValue('');
      this.academicForm.controls.scale.setValue('');
    } else {
      this.resultList = [ 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D' ];
      this.academicForm.controls.marks.setValue('');
    }

  }

  getEducationLevelList() {
    this.httpClient.get(environment.apiUrl + 'educationLevels')
      .subscribe(
        res => {
          console.log('educationLevelList' , res);
          this.educationLevelList = res;
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  getExamByEducationLevel(eduLevel) {
    console.log(eduLevel);
    if (eduLevel === '5d8b6dcacfeeee365c695482' || eduLevel === '5d8b6dd2cfeeee365c695483' || eduLevel === '5d8b7ae5cfeeee365c695497' ) {
      this.isShowBoard = true;
    } else {
      this.isShowBoard = false;
    }
    this.academicForm.controls.exam.setValue('');

    const myParams = new HttpParams().append('educationLevel', eduLevel)
    this.httpClient.get(environment.apiUrl + 'exams/getByEducationLevel', {params: myParams})
      .subscribe(
        res => {
          console.log('examByEducationLevel' , res);
          this.examListByEduLevel = res;
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  getEducations () {
    const myParams = new HttpParams().append('user', localStorage.getItem('userId'))
    this.httpClient.get(environment.apiUrl + 'academics/getByUser',
      { params: myParams })
      .subscribe(
        res => {
          console.log('educationList', res);
          this.educationList = res;
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  clearFieldsEducation() {
    this.academicForm.controls.major.reset();
    this.academicForm.controls.board.reset();
    this.academicForm.controls.institute.reset();
    this.academicForm.controls.result.reset();
    this.academicForm.controls.marks.reset();
    this.academicForm.controls.cgpa.reset();
    this.academicForm.controls.scale.reset();
    this.academicForm.controls.passingYear.reset();
    this.academicForm.controls.duration.reset();
    this.academicForm.controls.resultType.reset();
    this.academicForm.controls.achievement.reset();
    this.academicForm.controls.educationLevel.reset();
    this.academicForm.controls.exam.reset();
  }

  saveEducation() {
    const submitData = {
      major: this.academicForm.value.major,
      board: this.academicForm.value.board,
      institute: this.academicForm.value.institute,
      result: this.academicForm.value.result,
      marks: this.academicForm.value.marks,
      cgpa: this.academicForm.value.cgpa,
      scale: this.academicForm.value.scale,
      passingYear: this.academicForm.value.passingYear,
      duration: this.academicForm.value.duration,
      resultType: this.academicForm.value.resultType,
      achievement: this.academicForm.value.achievement,
      educationLevel: this.academicForm.value.educationLevel,
      exam: this.academicForm.value.exam,
      user: this.academicForm.value.user,
    }

    console.log(submitData);

    this.httpClient.post(environment.apiUrl + 'academics', submitData)
      .subscribe(res => {
          this.snackbar.open('Successfully saved', 'Close', {
            duration: 2000
          });
          this.clearFieldsEducation();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  toEditEducation(academic) {
    console.log(academic);

    // this.radioResultTypeChangeAction();
    this.radioResultTypeChangeAction(academic.resultType);

    this.academicId = academic._id;
    this.academicForm.controls.major.setValue(academic.major);
    this.academicForm.controls.board.setValue(academic.board);
    this.academicForm.controls.institute.setValue(academic.institute);
    this.academicForm.controls.result.setValue(academic.result);
    this.academicForm.controls.marks.setValue(academic.marks);
    this.academicForm.controls.cgpa.setValue(academic.cgpa);
    this.academicForm.controls.scale.setValue(academic.scale);
    this.academicForm.controls.passingYear.setValue(academic.passingYear);
    this.academicForm.controls.duration.setValue(academic.duration);
    this.academicForm.controls.resultType.setValue(academic.resultType);
    this.academicForm.controls.achievement.setValue(academic.achievement);
    this.academicForm.controls.educationLevel.setValue(academic.educationLevel._id);
    this.getExamByEducationLevel(academic.educationLevel._id);
    this.academicForm.controls.exam.setValue(academic.exam._id);
    // this.trnSummaryForm.controls.user.setValue(academic.user);

    this.isShowSaveEducation = true;
    this.isShowEducationUpdateBtn = false;
  }

  updateEducation() {
    const submitData = {
      major: this.academicForm.value.major,
      board: this.academicForm.value.board,
      institute: this.academicForm.value.institute,
      result: this.academicForm.value.result,
      marks: this.academicForm.value.marks,
      cgpa: this.academicForm.value.cgpa,
      scale: this.academicForm.value.scale,
      passingYear: this.academicForm.value.passingYear,
      duration: this.academicForm.value.duration,
      resultType: this.academicForm.value.resultType,
      achievement: this.academicForm.value.achievement,
      educationLevel: this.academicForm.value.educationLevel,
      exam: this.academicForm.value.exam,
      user: this.academicForm.value.user,
    }

    const myParams = new HttpParams().append('id', this.academicId)
    this.httpClient.put(environment.apiUrl + 'academics', submitData,
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully updated', 'Close', {
            duration: 2000
          });
          this.closeEducation();
          this.isShowTrnSummaryUpdateBtn = true;

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  deleteEducation(education) {
    const myParams = new HttpParams().append('id', education._id)
    this.httpClient.delete(environment.apiUrl + 'academics',
      {params: myParams})
      .subscribe(
        res => {
          this.snackbar.open('Successfully deleted', 'Close', {
            duration: 2000
          });
          this.getEducations();
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  closeEducation () {
    this.getEducations();
    this.isShowSaveEducation = false;
    this.clearFieldsEducation();
  }

  addEducation() {
    this.academicForm.controls.resultType.setValue('Grade');
    this.isShowSaveEducation = true;
    this.isShowEducationUpdateBtn = true;
  }


  // training summary

  clearFieldsTrnSummary() {
    this.trnSummaryForm.controls.trainingTitle.reset();
    this.trnSummaryForm.controls.country.reset();
    this.trnSummaryForm.controls.topics.reset();
    this.trnSummaryForm.controls.trainingYear.reset();
    this.trnSummaryForm.controls.institute.reset();
    this.trnSummaryForm.controls.duration.reset();
    this.trnSummaryForm.controls.location.reset();
    // this.trnSummaryForm.reset();
  }

  saveTrnSummary() {
    this.httpClient.post(environment.apiUrl + 'trainings', this.trnSummaryForm.value)
    .subscribe(res => {
      this.snackbar.open('Successfully saved', 'Close', {
        duration: 2000
      });
      this.clearFieldsTrnSummary ();
      this.getTrnSummary();
    }, msg => {
      this.snackbar.open(msg.error, 'Close', {
        duration: 4000
      });
      console.error(`Error: ${msg.status} ${msg.statusText}`);
    }
    );
  }

  getTrnSummary() {
    const myParams = new HttpParams().append('user', localStorage.getItem('userId'))
    this.httpClient.get(environment.apiUrl + 'trainings/getByUser',
      { params: myParams })
      .subscribe(
        res => {
          console.log('trnSummaryList', res);
          this.trnSummaryList = res;
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  toEditTrnSummary(trnSummary) {
    console.log(trnSummary);

    this.trnSummaryId = trnSummary._id;
    this.trnSummaryForm.controls.trainingTitle.setValue(trnSummary.trainingTitle);
    this.trnSummaryForm.controls.country.setValue(trnSummary.country);
    this.trnSummaryForm.controls.topics.setValue(trnSummary.topics);
    this.trnSummaryForm.controls.trainingYear.setValue(trnSummary.trainingYear);
    this.trnSummaryForm.controls.institute.setValue(trnSummary.institute);
    this.trnSummaryForm.controls.duration.setValue(trnSummary.duration);
    this.trnSummaryForm.controls.location.setValue(trnSummary.location);
    // this.trnSummaryForm.controls.user.setValue(trnSummary.user);

    this.isShowSaveTrnSummary = true;
    this.isShowTrnSummaryUpdateBtn = false;
  }

  updateTrnSummary() {
    const myParams = new HttpParams().append('id', this.trnSummaryId)
    this.httpClient.put(environment.apiUrl + 'trainings', this.trnSummaryForm.value,
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully updated', 'Close', {
            duration: 2000
          });
          this.closeTrnSummary();
          this.isShowTrnSummaryUpdateBtn = true;

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  deleteTrnSummary(trnSummary) {
    const myParams = new HttpParams().append('id', trnSummary._id)
    this.httpClient.delete(environment.apiUrl + 'trainings',
      {params: myParams})
      .subscribe(
        res => {
          this.snackbar.open('Successfully deleted', 'Close', {
            duration: 2000
          });
          this.getTrnSummary();
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  closeTrnSummary() {
    this.getTrnSummary();
    this.isShowSaveTrnSummary = false;
    this.clearFieldsTrnSummary();
  }

  addTranSummary() {
    this.isShowSaveTrnSummary = true;
    this.isShowTrnSummaryUpdateBtn = true;
  }

  // professional certification

  clearFieldsProfCert() {
    this.profCertForm.controls.certification.reset();
    this.profCertForm.controls.institute.reset();
    this.profCertForm.controls.certPeriodFrom.reset();
    this.profCertForm.controls.certPeriodTo.reset();
    // this.profCertForm.reset();
  }

  saveProfCertification() {
    this.httpClient.post(environment.apiUrl + 'certifications', this.profCertForm.value)
      .subscribe(res => {
        this.snackbar.open('Successfully saved', 'Close', {
          duration: 2000
        });
        this.clearFieldsProfCert ();
        this.getCertifications();
      }, msg => {
        this.snackbar.open(msg.error, 'Close', {
          duration: 4000
        });
        console.error(`Error: ${msg.status} ${msg.statusText}`);
      }
      );
  }

  getCertifications() {
    const myParams = new HttpParams().append('user', localStorage.getItem('userId'))
    this.httpClient.get(environment.apiUrl + 'certifications/getByUser',
      { params: myParams })
      .subscribe(
        res => {
          console.log('certificationList', res);
          this.profCertificationList = res;
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  toEditProfCertification(profCert) {
    console.log(profCert);

    this.profCertId = profCert._id;
    this.profCertForm.controls.certification.setValue(profCert.certification);
    this.profCertForm.controls.institute.setValue(profCert.institute);
    this.profCertForm.controls.certPeriodFrom.setValue(profCert.certPeriodFrom);
    this.profCertForm.controls.certPeriodTo.setValue(profCert.certPeriodTo);
    // this.profCertForm.controls.user.setValue(profCert.user);

    this.isShowSaveProfCert = true;
    this.isShowProfCertUpdateBtn = false;
  }

  updateProfCertification() {
    const myParams = new HttpParams().append('id', this.profCertId)
    this.httpClient.put(environment.apiUrl + 'certifications', this.profCertForm.value,
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully updated', 'Close', {
            duration: 2000
          });
          this.closeProfCertification();
          this.isShowProfCertUpdateBtn = true;

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  deleteProfCertification(profCert) {
    const myParams = new HttpParams().append('id', profCert._id)
    this.httpClient.delete(environment.apiUrl + 'certifications',
      {params: myParams})
      .subscribe(
        res => {
          this.snackbar.open('Successfully deleted', 'Close', {
            duration: 2000
          });
          this.getCertifications();
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  closeProfCertification() {
    this.getCertifications();
    this.isShowSaveProfCert = false;
    this.clearFieldsProfCert();
  }

  addProfCertification() {
    this.isShowSaveProfCert = true;
    this.isShowProfCertUpdateBtn = true;
  }


}
