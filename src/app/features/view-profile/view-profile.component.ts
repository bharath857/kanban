import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {


  userImage: any = '../../../assets/no-profile-pic-icon-7.jpg';
  editProfile: boolean = false;
  userProfile: FormGroup
  userId: string = '';
  createdon:string = '';
  userImageFound:boolean = false;
  constructor() { 
    this.userProfile = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void {
  }


  editOrUpdateProfile(any:any){

  }

  removeProfilePic(){

  }

  uploadnewImage(any:any){

  }
}
