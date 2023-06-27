import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FileUploadComponent } from './fileupload/fileupload.component';

const routes: Routes = [
  {
    path:'',component:LoginComponent,pathMatch:'full'
  },
  {
    path:'sign',component:SignupComponent,pathMatch:'full'
  },
  {
    path:'file',component:FileUploadComponent,pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
