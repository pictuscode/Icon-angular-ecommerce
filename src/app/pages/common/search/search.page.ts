import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  //slide
  recentSearchOpt = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 5,

  };
  trendingOpt = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.5,
  }
  browsingOptbrand = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2.5,
  }
  browsingOptstyles = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 2.5,
  }
  trendingSlide='true'
  ngOnInit() {
  }

}
