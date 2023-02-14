import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpPageRoutingModule } from './otp-routing.module';

import { OtpPage } from './otp.page';
import { NgOtpInputModule } from  'ng-otp-input';


@NgModule({
  imports: [
   
    NgOtpInputModule,
    CommonModule,
    FormsModule,
    IonicModule,
    OtpPageRoutingModule

  ],
  declarations: [OtpPage]
})
export class OtpPageModule { }
