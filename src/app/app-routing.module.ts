import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [

  {
    path: 'main',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'wishList',
    loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./tab4/tab4.module').then(m => m.Tab4PageModule)
  },
  {
    path: 'refer',
    loadChildren: () => import('./pages/accountpages/refer/refer.module').then(m => m.ReferPageModule)
  },
  {
    path: 'helpcenter',
    loadChildren: () => import('./pages/accountpages/helpcenter/helpcenter.module').then(m => m.HelpcenterPageModule)
  },

  {
    path: 'women/:id',
    loadChildren: () => import('./pages/category/women/women.module').then(m => m.WomenPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/loginpage/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'items-list/:sid/:g/:title',
    loadChildren: () => import('./pages/common/items-list/items-list.module').then(m => m.ItemsListPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/accountpages/orders/orders.module').then(m => m.OrdersPageModule)
  },
  {
    path: 'address',
    loadChildren: () => import('./pages/accountpages/address/address.module').then(m => m.AddressPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationPageModule)
  },
  {
    path: 'product-details/:id',
    loadChildren: () => import('./pages/common/product-details/product-details.module').then(m => m.ProductDetailsPageModule)
  },

  {
    path: 'otp',
    loadChildren: () => import('./pages/loginpage/otp/otp.module').then(m => m.OtpPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/accountpages/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'profile-details',
    loadChildren: () => import('./pages/accountpages/profile-details/profile-details.module').then(m => m.ProfileDetailsPageModule)
  },

  {
    path: 'search',
    loadChildren: () => import('./pages/common/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'category-slide-widget',
    loadChildren: () => import('./pages/common/category-slide-widget/category-slide-widget.module').then(m => m.CategorySlideWidgetPageModule)
  },
  {
    path: 'trending-slide-widget',
    loadChildren: () => import('./pages/common/trending-slide-widget/trending-slide-widget.module').then(m => m.TrendingSlideWidgetPageModule)
  },

  {
    path: '',
    loadChildren: () => import('./pages/loginpage/welcome/welcome.module').then(m => m.WelcomePageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
