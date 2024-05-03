import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from "@angular/common";

import { FuelComponent } from './fuel.component';
import { FuelRoutingModule } from './fuel-routing.module';

@NgModule({
  imports: [
    FormsModule,
    FuelRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CommonModule
  ],
  declarations: [ FuelComponent ]
})
export class FuelModule { }
