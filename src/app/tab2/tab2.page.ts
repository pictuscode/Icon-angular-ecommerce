
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  segmentModel = "all"
  trendingSlide = 'true'
  continueBrowsing = 'true'
  private _ref: any;
  wish: any;
  private observer: MutationObserver

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController
  ) { }

 

  //wishlist-tab
  segmentChanged(event) {
    }

  nFormatter(num, digits) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }
  //added-wish-api
  wishlistRes = [];
  allWishlist = [];
  wishListPdtId = [];
  tabWishlist = []
  productDir = ''
  wishlistArray = ''
  wishLength = ''
  pdtId = ''
  wishInx = ''

  //wishApi
  getWishList(): Observable<any> {
    return this.httpClient.post
      (
        `${environment.apiUrl}` + 'userwishlist',
        {
          "id": window.localStorage.getItem('userId'),

        }
      );
  }

  //remove-wish
  getRemoveWish(id: any): Observable<any> {
    return this.httpClient.post
      (
        `${environment.apiUrl}` + 'removewishlist',
        {
          "userId": window.localStorage.getItem('userId'),
          "productId": id
        }
      );
  }
  //remove-all
  removeAll(): Observable<any> {
    return this.httpClient.post
      (
        `${environment.apiUrl}` + 'removeallwishlist',
        {
          "userId": window.localStorage.getItem('userId'),

        }
      );
  }
  //to-bag-size
  pdtSize(id: any): Observable<any> {
    this.pdtId = id

    return this.httpClient.post
      (
        `${environment.apiUrl}` + 'getproductsize',
        {
          "productId": id
        }
      );
  }


  ngOnInit() {

    this.getWishList().subscribe(
      (res) => {
        //over-all

        this.wishlistRes.push(res)
        this.allWishlist.push(res.overallWishlist)

        this.productDir = environment.baseUrl + res.productDir
        this.wishLength = res.overallWishlist.length

        //tab
        this.tabWishlist.push(res.wishlistProduct)
        this.wishlistArray = res.wishlistProduct[0].wishlist[0]['productImage'][0]

        if (res.overallWishlist != '') {

          res.overallWishlist.map(
            (item: any) => {
              this.wishListPdtId.push(item._id)
             
              window.localStorage.setItem('userId', res.data.id)
            }
          )
        }


      }

    )
  }

  closeWish(id: any, index: any, num: number) {
    this.wishInx = index
    if (num == 1) {
      var emptyData = []
      this.allWishlist[0].splice(index, 1);
      for (var i = 0; i < this.tabWishlist[0].length; i++) {
        emptyData[i] = this.tabWishlist[0][i]
        var tabLength = (this.tabWishlist[0][i].wishlist).length
        emptyData[i].wishlist = this.tabWishlist[0][i].wishlist.filter(function (e) { return e._id !== id })
      }
      this.wishLength = this.allWishlist[0].length
    }
    else {

      var emptyData = []

      for (var i = 0; i < this.tabWishlist[0].length; i++) {
        emptyData[i] = this.tabWishlist[0][i]
        var tabLength = (this.tabWishlist[0][i].wishlist).length
        emptyData[i].wishlist = this.tabWishlist[0][i].wishlist.filter(function (e) { return e._id !== id })
      }
      this.allWishlist[0] = this.allWishlist[0].filter(function (e) { return e._id !== id })
      this.wishLength = this.allWishlist[0].length

    }
    this.getRemoveWish(id).subscribe(
      (res) => {

       
      }
    )
  }

  deleteallwish() {

    this.allWishlist[0] = []
    this.tabWishlist[0] = []
    this.wishLength = this.allWishlist[0].length

    this.removeAll().subscribe(
      (res) => {

      }
    )
  }



};




