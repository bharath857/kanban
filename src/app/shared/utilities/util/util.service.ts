import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Param {
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  config: any;
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) {
  }

  generateURL(path: string, parms: Param[], apptype: string) {
    this.config.api_endpoint = '';
    switch (apptype) {
      case "task":
        this.config.api_endpoint = environment
        break;
      default:
        this.config.api_endpoint = ''
        break;
    }

    if (path == null || path === undefined) {
      throw new Error('Path cannot be null')
    }
    if (!parms || parms.length === 0) {
      return `${this.config.api_endpoint}${path}`
    }

    let equalSeparatedParms = parms.map((param: Param) => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`);
    return `${this.config.api_endpoint}${path}?${equalSeparatedParms.join('&')}`
  }
  /* : Observable<Projectlist[]>  */
  readProjectUsers() {
    let projectName = 'projectName1'
    return this.http.get<Projectlist[]>('assets/api/projectsList.json')
      .pipe(map((response) => {
        const projectDetails = response.find((project) => (project.projectName === projectName))
        if (projectDetails) {
          const modifiedResponse = {
            projectList: response,
            project: projectDetails
          }
          return modifiedResponse
        } else {
          throw new Error("Project not found")
        }
      }))
  }
}

export interface Projectlist {
  projectName: string,
  UsersIDList: UsersIDList[],
  Tasks: TasksList[],
}

export interface UsersIDList {
  userId: string,
  firstName: string,
  lastName: string,
}

export interface TasksList {
  taskName: string
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