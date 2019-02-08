//Angular 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { ReactiveFormsModule }    from '@angular/forms';

//ngprime
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import {DropdownModule} from 'primeng/dropdown';

//Routing
import { ProductRoutingModule } from './product.routing';

//Components
import { ViewproductComponent } from './viewproduct/viewproduct.component';

//Services
import { DemoService } from '../shared/services/demo.service';

@NgModule({
    declarations: [
        ViewproductComponent
    ],
    imports: [
        BrowserModule, FormsModule, ReactiveFormsModule,
        TableModule, TabViewModule, DropdownModule,
        ProductRoutingModule
    ],
    providers: [
        DemoService
    ],
    bootstrap: [
        ViewproductComponent
    ]
  })
  export class ProductModule { }
