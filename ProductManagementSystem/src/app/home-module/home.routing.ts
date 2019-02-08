import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';

export const HomeRoutes: Routes = [
    { path: 'home', component: WelcomeComponent },
    { path: 'about', component: AboutComponent }
];
//export const HomeRouting: ModuleWithProviders = RouterModule.forRoot(HomeRoutes);

@NgModule({
    imports: [
      RouterModule.forChild(HomeRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
export class HomeRoutingModule { }