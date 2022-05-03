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
@NgModule({
  declarations: [
    AppComponent,
    CreateNewTaskComponent,
    DashboardComponent
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
