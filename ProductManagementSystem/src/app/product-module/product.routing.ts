import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewproductComponent } from './viewproduct/viewproduct.component';

export const ProductRoutes: Routes = [
    { path: 'viewproduct', component: ViewproductComponent }
];

@NgModule({
    imports: [
      RouterModule.forChild(ProductRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class ProductRoutingModule { }
  