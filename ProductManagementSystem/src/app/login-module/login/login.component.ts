import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GlobalMembersService } from '../../shared/services/global-members.service';
import { DemoService } from '../../shared/services/demo.service';
import { userdetails } from '../model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private globalMembers: GlobalMembersService,
    private formbuilder: FormBuilder, 
    private demoservice: DemoService) { }

  submitted: boolean = false;
  submitMessage: string;
  loginForm: FormGroup;
  userDetails: userdetails[] = []; 

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formbuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get lgnFrm() { return this.loginForm.controls; }

  onLogin() {
    try {
      this.submitted = true;
      this.demoservice.getUsers().subscribe(success => {
        var loginSuccess = false;
        this.userDetails = success.json().userdetails as userdetails[];
        for (var i=0; i<this.userDetails.length; i++){
          if(this.userDetails[i].username == this.loginForm.value.username && this.userDetails[i].password == this.loginForm.value.password){
            this.globalMembers.setMasterLayoutVisiblity(true);
            localStorage.setItem('username', this.userDetails[i].username);
            localStorage.setItem('userrole', this.userDetails[i].role);
            this.router.navigate(['/home']);
            loginSuccess = true;
          }
        }
        if(!loginSuccess){
          this.loginForm.reset();
          this.onError("Invalid User/Password");
        }
      }, error => {
        this.onError("Error in API Call.");
      });
    } catch (exception) {
      this.onError("onLogin: Exception: " +  exception.message);
    }
  }

  onError(msg: string){
    this.submitted = false;
    alert(msg);
  }
}
