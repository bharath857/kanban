import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CreateNewTaskComponent } from './features/create-new-task/create-new-task.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';


import { MaterialModule } from '../app/shared/material/material.module';
import { CommonModule, DatePipe } from '@angular/common';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { LoginSignUpComponent } from './features/login-sign-up/login-sign-up.component';
import { ViewProfileComponent } from './features/view-profile/view-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateNewTaskComponent,
    DashboardComponent,
    LandingPageComponent,
    LoginSignUpComponent,
    ViewProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
