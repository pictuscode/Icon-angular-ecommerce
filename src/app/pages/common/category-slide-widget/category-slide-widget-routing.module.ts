import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorySlideWidgetPage } from './category-slide-widget.page';

const routes: Routes = [
  {
    path: '',
    component: CategorySlideWidgetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategorySlideWidgetPageRoutingModule {}
