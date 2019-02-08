//Angular 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

//ngprime
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/components/menu/menu';

//Routing
import { AppRoutingModule } from './app.routing';

//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/components/header/header.component';
import { FooterComponent } from './layouts/components/footer/footer.component';
import { SidebarComponent } from './layouts/components/sidebar/sidebar.component';

//Services
import { GlobalMembersService } from './shared/services/global-members.service';
import { HttpInterceptorService } from './shared/services/http-interceptor.service';
import { AuthService } from './shared/services/auth.service';

//Modules
import { LoginModule } from './login-module/login.module';
import { HomeModule } from './home-module/home.module';
import { ProductModule } from './product-module/product.module';

@NgModule({
  declarations: [
    AppComponent, HeaderComponent, FooterComponent, SidebarComponent
  ],
  imports: [
    LoginModule, HomeModule, ProductModule, AppRoutingModule, 
    BrowserModule, BrowserAnimationsModule, HttpModule, PanelMenuModule, MenuModule
  ],
  providers: [
    GlobalMembersService, HttpInterceptorService, AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
