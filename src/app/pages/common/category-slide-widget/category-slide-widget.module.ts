import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorySlideWidgetPageRoutingModule } from './category-slide-widget-routing.module';

import { CategorySlideWidgetPage } from './category-slide-widget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorySlideWidgetPageRoutingModule
  ],
  declarations: [CategorySlideWidgetPage]
})
export class CategorySlideWidgetPageModule {}
