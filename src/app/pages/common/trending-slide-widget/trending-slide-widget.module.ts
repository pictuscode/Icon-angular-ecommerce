import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrendingSlideWidgetPageRoutingModule } from './trending-slide-widget-routing.module';

import { TrendingSlideWidgetPage } from './trending-slide-widget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrendingSlideWidgetPageRoutingModule
  ],
  declarations: [TrendingSlideWidgetPage]
})
export class TrendingSlideWidgetPageModule {}
