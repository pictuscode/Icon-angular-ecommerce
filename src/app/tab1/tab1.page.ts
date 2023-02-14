import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServicePage } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1,',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  categorySlide = 'true';
  featuredSlide = 'true';
  brandSlide = 'true';
  topPicks = 'true';
  bannerSlide = 'true';


  constructor(private appService: AppServicePage, private router: Router) { }
  //slide
  banneropts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,

  };
  categoryopt = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.5,
  }

  //bannerApi
  banners = [];
  bannerDir = ""

  //categoryApi
  categories = [];
  groupDir = ""
  generalCollectionId = ''

  //budgetBuyApi
  dynamicBlock = [];
  dynamicBlockDir = ""
  catId = ''
  ngOnInit() {
    //banner-slide
    this.appService.getBannerSlide().subscribe(
      (res) => {
        //home-banner
        var dt = JSON.parse(JSON.stringify(res['homeBanner']));
        this.bannerDir = environment.baseUrl + res['bannerDir']
        this.banners.push(res['homeBanner'])

        //cat
        var dt = JSON.parse(JSON.stringify(res['groupDetails']));
        this.groupDir = environment.baseUrl + res['groupDir']
        this.catId = res['groupDetails']._id
        this.categories.push(res['groupDetails'])
        this.generalCollectionId = JSON.stringify(res['groupDetails'][0]['generalCollecionId'])
      

        //beauty-slide
        var dynamic = JSON.parse(JSON.stringify(res['dynamicBlock']));
        this.dynamicBlockDir = environment.baseUrl + res['dynamicBlockDir']
        this.dynamicBlock.push(res['dynamicBlock'])

      }
    )
  }

  //subcat
  subCat(id: any, gId: any) {
    window.localStorage.setItem('genCollectId', JSON.stringify(gId))

    this.router.navigate(['/women', id])


  }

  //pdtList
  itemList(id: any, subId: any, title: any) {
    var g = JSON.stringify(id)
    var sid = JSON.stringify(subId)
    this.router.navigate(['/items-list', sid, g, title])
  }


}



