import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from "@angular/common";

import { DeviceAddComponent } from './deviceAdd.component';
import { DeviceAddRoutingModule } from './deviceAdd-routing.module';

@NgModule({
  imports: [
    FormsModule,
    DeviceAddRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    NgbModule.forRoot(),
    CommonModule
  ],
  declarations: [ DeviceAddComponent ]
})
export class DeviceAddModule { }
