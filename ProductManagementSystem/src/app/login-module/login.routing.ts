import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const LoginRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent }
  ];

@NgModule({
    imports: [
      RouterModule.forChild(LoginRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class LoginRoutingModule { }