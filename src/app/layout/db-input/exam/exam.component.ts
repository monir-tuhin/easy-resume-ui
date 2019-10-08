import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  examForm = new FormGroup({
    exam: new FormControl('', Validators.compose([
      Validators.required
    ])),
    educationLevel: new FormControl('', Validators.compose([
      Validators.required
    ])),
  });

  examId: any;
  educationLevelList: any;
  isShowExamUpdate = false;
  displayedColumnsExam = ['sl', 'exam', 'educationLevel', 'action'];
  examList: any;
  examDataSource: any;

  @ViewChild('examPaginatorId') paginatorExam: MatPaginator;

  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar) {

  }

  ngOnInit() {
    this.getExamList();
    this.getEducationLevelList();
  }

  saveExam() {
    console.log(this.examForm.value);
    this.httpClient.post(environment.apiUrl + 'exams', this.examForm.value)
      .subscribe(res => {
          this.snackbar.open('Successfully Saved', 'Close', {
            duration: 2000
          });
          this.clearExamFields();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  getExamList() {
    this.httpClient.get(environment.apiUrl + 'exams')
      .subscribe(
        res => {
          console.log('res' , res);
          // this.examList = res;
          setTimeout(() => {
            this.examList = res as any[];
            this.examDataSource = new MatTableDataSource(this.examList);
            this.examDataSource.paginator = this.paginatorExam;
          });
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
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

  goToEditExam(element) {
      // console.log(this.examForm.value);
      console.log(element);
    this.isShowExamUpdate = true;
    this.examForm.controls.exam.setValue(element.exam);
    this.examForm.controls.educationLevel.setValue(element.educationLevel._id);
    this.examId = element._id;
  }

  updateExam() {
    const submitData = {
      exam: this.examForm.value.exam,
      educationLevel: this.examForm.value.educationLevel
    };
    console.log(submitData);

    const myParams = new HttpParams().append('id', this.examId)
    this.httpClient.put(environment.apiUrl + 'exams', submitData,
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully Updated', 'Close', {
            duration: 2000
          });
          this.clearExamFields();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  deleteExam(element) {
    const myParams = new HttpParams().append('id', element._id)
    this.httpClient.delete(environment.apiUrl + 'exams',
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully Deleted', 'Close', {
            duration: 2000
          });
          this. getExamList();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  clearExamFields() {
    this.examForm.reset();
    this.getExamList();
    this.isShowExamUpdate = false;
  }
}
