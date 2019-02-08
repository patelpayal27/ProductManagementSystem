//Angular 
import { NgModule } from '@angular/core';

//Routing
import { HomeRoutingModule } from './home.routing';

//Components
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';

@NgModule({
    declarations: [
        WelcomeComponent,
        AboutComponent
    ],
    imports: [
        HomeRoutingModule
    ],
    providers: [
    ],
    bootstrap: [
        WelcomeComponent
    ]
  })
  export class HomeModule { }
  