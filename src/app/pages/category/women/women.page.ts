
import { ActivatedRoute, Router } from '@angular/router';
import { AppServicePage } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { HttpService } from './../../../services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-women',
  templateUrl: './women.page.html',
  styleUrls: ['./women.page.scss'],
})
export class WomenPage implements OnInit {
  currentItem = 'Television';
  bannerSlide = 'true';
  addBannerSlide = 'true';
  getValue: any;
  paramId: { [k: string]: any; };

  constructor(
    private appService: AppServicePage,
    private router: Router,
    private httpClient: HttpClient,
    private route: ActivatedRoute,

  ) { }

  //slide-opt
  banneropts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,

  };
  categoryopt = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2,
  }
  expOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
  }


  //subcategory-api
  getCategoryApi(): Observable<any> {
    return this.httpClient.post
      (
        `${environment.apiUrl}` + 'getsection',
        {
          "id": this.paramId,
        }
      );
  }

  //head-title
  title = ''

  //sub-cat-Api
  subCat = []
  subCatDir = ""

  //bannerApi
  catBanners = [];
  catBannerDir = ""

  //beauty-offers
  beautyOffers = []
  beautyDir = ''

  //add-banner
  addBanners = []
  firstAdd = []
  secondAdd = []

  //featured-dts
  featurePdt = []

  //explore-more
  exploreMore = []

  //sub-cat-id
  subCatId = ''
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.paramId = params['id']
  
    })

    //cat-banner-slide
    this.getCategoryApi().subscribe(
      (res) => {

        //head-title
        this.title = res['headerDetails'].title

        //sub-cat
        this.subCat.push(res['headerDetails']['bubble'])
        var dt1 = JSON.parse(JSON.stringify(res['headerDetails']['bubble']))
        this.subCatDir = environment.baseUrl + res['subcategoryDir']

        //banners
        this.catBanners.push(res['headerDetails']['banners'])
        var dt = JSON.parse(JSON.stringify(res['headerDetails']['banners']))
        this.catBannerDir = environment.baseUrl + res['bannerDir']

        //beauty-offer
        this.beautyOffers.push(res['BeautyOffer'])
        this.beautyDir = environment.baseUrl + res['offerDir']

        //add-banner
        this.addBanners.push(res['smallBanner'])
        var sbLength = res['smallBanner'].length

        if (sbLength > 1) {
          var dividedImg = Math.ceil(sbLength / 2)
          var remainingImg = sbLength - dividedImg
          for (var i = 0; i < dividedImg; i++) {
            this.firstAdd.push(res['smallBanner'][i])

          }
          for (var i = dividedImg; i < sbLength; i++) {
            this.secondAdd.push(res['smallBanner'][i])

          }
        }

        //featured-pdt
        this.featurePdt.push(res['featuredProduct'])

        //explore-more
        this.exploreMore.push(res['offerBanner'])

        //sub-cat-id
        this.subCatId = JSON.stringify(res['headerDetails']['banners']['subcategoryId'])

      }
    )


  }
  //cat-pdtList
  itemList(id: any,title:any) {
  
    var g = window.localStorage.getItem('genCollectId')
    var sid = JSON.stringify([id])
    this.router.navigate(['/items-list', sid, g,title])
  }

   //pdtList
   pdtItemList(id: any, subId: any, title: any) {
    var g = JSON.stringify(id)
    var sid = JSON.stringify(subId)
    this.router.navigate(['/items-list', sid, g, title])
  }

}
