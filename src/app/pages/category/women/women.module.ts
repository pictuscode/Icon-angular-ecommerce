
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WomenPageRoutingModule } from './women-routing.module';

import { WomenPage } from './women.page';

 import { BannerWidgetPage } from '../../common/banner-widget/banner-widget.page'; 
 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WomenPageRoutingModule
  ],
  declarations: [WomenPage,BannerWidgetPage]
})
export class WomenPageModule {}
