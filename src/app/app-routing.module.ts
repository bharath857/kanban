import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewTaskComponent } from './features/create-new-task/create-new-task.component';

const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'/dashboard'},
    {path:'dashboard', component:CreateNewTaskComponent}
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
