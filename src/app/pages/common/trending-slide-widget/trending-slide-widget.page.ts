import { Component, Input, OnInit } from '@angular/core';
import { AppServicePage } from 'src/app/services/app.service';

@Component({
  selector: 'app-trending-slide-widget',
  templateUrl: './trending-slide-widget.page.html',
  styleUrls: ['./trending-slide-widget.page.scss'],
})
export class TrendingSlideWidgetPage implements OnInit {
  @Input() isTrendingSlide = ''
  @Input() isContinueBrowsing = ''
  trendingOpt = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.5,
  }
  browsingOpt = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 2.5,
  }
  constructor(private appService: AppServicePage,) { }
  trends = []
  ngOnInit() {
 
  }

}
