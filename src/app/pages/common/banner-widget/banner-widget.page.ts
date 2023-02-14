import { environment } from 'src/environments/environment';
import { Component, Input, OnInit } from '@angular/core'; // First, import Input
import { AppServicePage } from 'src/app/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-widget',
  templateUrl: './banner-widget.page.html',
  styleUrls: ['./banner-widget.page.scss'],
})
export class BannerWidgetPage implements OnInit {
  @Input() isBannerSlide = ''
  @Input() isAddBanner = ''
  @Input() bannerName = []
  @Input() images = []
  @Input() bannerDir = ''

  constructor(private appService: AppServicePage, private router: Router) { }
  
  //slideOpt
  banneropts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,

  };
  


  ngOnInit() {
      
  }
  
  //pdtList
  itemList(id: any, subId: any, title: any) {
    var g = JSON.stringify(id)
    var sid = JSON.stringify(subId)
    this.router.navigate(['/items-list', sid, g, title])
  }

}




