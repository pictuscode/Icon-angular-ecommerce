import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrendingSlideWidgetPage } from './trending-slide-widget.page';

const routes: Routes = [
  {
    path: '',
    component: TrendingSlideWidgetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrendingSlideWidgetPageRoutingModule {}
