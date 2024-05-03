import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from "@angular/common";

import { VehicleAddComponent } from './vehicleAdd.component';
import { VehicleAddRoutingModule } from './vehicleAdd-routing.module';

@NgModule({
  imports: [
    FormsModule,
    VehicleAddRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    NgbModule.forRoot(),
    CommonModule
  ],
  declarations: [ VehicleAddComponent ]
})
export class VehicleAddModule { }
