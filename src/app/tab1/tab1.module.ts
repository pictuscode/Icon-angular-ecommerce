

import { BannerWidgetPage } from './../pages/common/banner-widget/banner-widget.page'; 
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { CategorySlideWidgetPage } from '../pages/common/category-slide-widget/category-slide-widget.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,


  ],
  declarations: [Tab1Page,BannerWidgetPage,CategorySlideWidgetPage]
})
export class Tab1PageModule { }
