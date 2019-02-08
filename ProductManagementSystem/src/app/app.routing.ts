import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
//import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

export const AppRoutes: Routes = [];
//export const Routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes);

@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule{
  constructor(private router: Router) { }
}