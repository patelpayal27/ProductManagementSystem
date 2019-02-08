//Angular 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

//ngprime
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/components/menu/menu';

//Components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

//Services
import { GlobalMembersService } from '../shared/services/global-members.service';
import { HttpInterceptorService } from '../shared/services/http-interceptor.service';

@NgModule({
    declarations: [
        HeaderComponent, FooterComponent, SidebarComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, HttpModule, PanelMenuModule, MenuModule
    ],
    providers: [
        GlobalMembersService, HttpInterceptorService
    ],
    bootstrap: [
    ]
  })
  export class LayoutModule { }
  