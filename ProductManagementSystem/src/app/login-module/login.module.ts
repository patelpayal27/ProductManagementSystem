//Angular 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { ReactiveFormsModule }    from '@angular/forms';

//Routing
import { LoginRoutingModule } from './login.routing';

//Components
import { LoginComponent } from './login/login.component';

//Services
import { GlobalMembersService } from '../shared/services/global-members.service';
import { DemoService } from '../shared/services/demo.service';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        BrowserModule, FormsModule, ReactiveFormsModule,
        LoginRoutingModule
    ],
    providers: [
        GlobalMembersService, DemoService
    ],
    bootstrap: [
        LoginComponent
    ]
  })
  export class LoginModule { }
  