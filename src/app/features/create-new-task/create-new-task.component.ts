import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarType, SnakbarService } from 'src/app/shared/utilities/snackbar/snakbar.service';

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.component.html',
  styleUrls: ['./create-new-task.component.css']
})
export class CreateNewTaskComponent implements OnInit {
  taskForms: FormGroup;
  userDetails: User;
  projectUser: ProjectUsers[];
  addValidations = new FormControl();
  addFiles = new FormControl();

  taskValidations = [] as TaskValidations[];
  taskValidator = new FormControl();
  taskFiles: File[] = [];
  comments = [] as Comments[];

  url: string | ArrayBuffer | null | undefined;

  constructor(private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private snakbar: SnakbarService) {

    this.projectUser = [{
      userId: "Bay857",
      firstName: "Bharath J",
      lastName: "Reddy"
    },
    {
      userId: "Bay858",
      firstName: "Karthik J",
      lastName: "Reddy"
    }];

    this.userDetails = {
      userId: 'bay857',
      firstName: 'Bharath J',
      lastName: 'Reddy',
      dob: '',
      emailId: 'bharath.reddy.857@gmail.com',
      phoneNumber: 9886752489,
      projectList: [{
        projectName: "ProjectOne",
        Permission: "admin"
      }]
    }

    this.taskForms = this.formBuilder.group({
      taskName: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      priority: ['Medium', [Validators.required]],
      createdBy: [
        { value: this.userDetails.firstName + ' ' + this.userDetails.lastName + ' (' + this.userDetails.userId + ') ', disabled: true },
        [Validators.required]
      ],
      createdOn: [this.datePipe.transform(new Date(), "MM/dd/yyyy"), [Validators.required]],
      hoursToComplete: [null, [Validators.required]],
      extraHoursToComplete: [null, [Validators.required]],
      assignedDeveloper: [''],
      assignedDeveloperRequestedHours: [null],

      taskDetails: [null, [Validators.required, Validators.minLength(30), Validators.maxLength(100)]],

      comments: [null],
      tasksArray: this.formBuilder.array([])
    })
  }

  ngOnInit(): void {

  }

  get valuesChangestaskForms() {
    return this.taskForms.controls
  }

  addValidationsToTask() {
    let task = {
      id: this.taskValidations.length + 1,
      name: this.taskValidator.value
    }
    this.taskValidations.push(task)
    this.taskValidator = new FormControl();
  }

  removeValidationsFromTask(task: TaskValidations) {
    this.taskValidations = this.taskValidations.filter((item) => item.id !== task.id);
  }

  uploadFile(event: any) {
    if (event.target.files) {
      const mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.snakbar.showSnakBar('Please upload images only', MatSnackBarType.info)
        return
      }
      const file = <File>event.target.files[0];
      this.taskFiles.push(file)

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.url = reader.result;
      }
      console.log(this.taskFiles, this.taskFiles[0].name)
    }
  }

  removefileFromTask(files: File) {
    this.taskFiles = this.taskFiles.filter((item) => item.name !== files.name);
  }

  checkImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

  submitTask() {
    console.log(this.valuesChangestaskForms)
  }

  cancelTask() {

  }
}

export interface TaskValidations {
  id: number,
  name: string
}

export interface User {
  userId: string,
  firstName: string,
  lastName: string,
  dob: string,
  emailId: string,
  phoneNumber: number
  projectList: ProjectList[]
}

export interface ProjectList {
  projectName: string,
  Permission: string
}

export interface Comments {
  commentedBy: string,
  comment: string,
  commnetedOn: Date,
}

export interface ProjectUsers {
  userId: string,
  firstName: string,
  lastName: string,
}
