import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgbModule, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from "@angular/common";

import { DeviceComponent } from './device.component';
import { DeviceRoutingModule } from './device-routing.module';

@NgModule({
  imports: [
    FormsModule,
    DeviceRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    NgbModule.forRoot(),
    CommonModule
  ],
  declarations: [ DeviceComponent ]
})
export class DeviceModule { }
