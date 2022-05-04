import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarType, SnakbarService } from 'src/app/shared/utilities/snackbar/snakbar.service';
import { Projectlist, User, UtilService } from 'src/app/shared/utilities/util/util.service';

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.component.html',
  styleUrls: ['./create-new-task.component.css']
})
export class CreateNewTaskComponent implements OnInit {
  taskForms: FormGroup;
  userDetails: User;
  projectUser = [] as ProjectUsers[];

  existingTasks: any;
  projectList = [] as Projectlist[];

  addValidations = new FormControl();
  addFiles = new FormControl();

  taskValidations = [] as TaskValidations[];
  taskValidator = new FormControl();
  taskFiles: File[] = [];
  comments = [] as Comments[];

  url: string | ArrayBuffer | null | undefined;

  constructor(private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private utils: UtilService,
    private snakbar: SnakbarService) {

    this.utils.readProjectUsers().subscribe((response: any) => {
      this.projectList = response.projectList
      this.projectUser = response.project.UsersIDList;
      this.existingTasks = response.project.Tasks;
    })
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
      name: this.taskValidator.value,
      isCompleted: false
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
    console.log(this.taskForms.valid, this.taskForms)

    this.projectList.find((project) => {
      if (project.projectName === 'projectName1') {
        const newTask: Newtask = {
          taskName: this.valuesChangestaskForms['taskName'].value,
          priority: this.valuesChangestaskForms['priority'].value,
          createdBy: this.valuesChangestaskForms['createdBy'].value,
          createdOn: this.valuesChangestaskForms['createdOn'].value,
          hoursToComplete: this.valuesChangestaskForms['hoursToComplete'].value,
          extraHoursToComplete: this.valuesChangestaskForms['extraHoursToComplete'].value,
          assignedDeveloper: this.valuesChangestaskForms['assignedDeveloper'].value,
          assignedDeveloperRequestedHours: this.valuesChangestaskForms['assignedDeveloperRequestedHours'].value,
          taskDetails: this.valuesChangestaskForms['taskDetails'].value,
          taskValidations: this.taskValidations,
          taskFiles: this.taskFiles,
          comments: []
        }

        if(this.valuesChangestaskForms['comments'].value){
          newTask.comments.push({
            commentedBy: this.valuesChangestaskForms['createdBy'].value,
            comment: this.valuesChangestaskForms['comments'].value,
            commnetedOn: new Date(),
          })
        }
        console.log(newTask, project )
        project.Tasks.push(newTask)
      }
    })

  }

  cancelTask() {

  }
}

export interface TaskValidations {
  id: number,
  name: string,
  isCompleted: boolean
}

export interface ProjectUsers {
  userId: string,
  firstName: string,
  lastName: string,
}

export interface Comments {
  commentedBy: string,
  comment: string,
  commnetedOn: Date,
}

export interface Newtask {
  taskName: string,
  priority: string,
  createdBy: string,
  createdOn: string,
  hoursToComplete: number,
  extraHoursToComplete: number,
  assignedDeveloper: string,
  assignedDeveloperRequestedHours: number,
  taskDetails: string,

  taskValidations: TaskValidations[],
  taskFiles: File[],
  comments: Comments[]
}