import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  constructor() {
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
}

