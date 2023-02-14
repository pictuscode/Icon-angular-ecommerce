import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.page.html',
  styleUrls: ['./items-list.page.scss'],
})
export class ItemsListPage implements OnInit {
  genCollectId: { [k: string]: any; };
  subId: { [k: string]: any; };
  getTitle: { [k: string]: any; };
  imageSrc = 'assets/images/itemsPics/heart.png'
  FullImgSrc = 'assets/images/itemsPics/filledHeart.svg'
  noImg = 'assets/images/itemsPics/dfc.png'
  wishListItems = []

  checkWishList(id: any) {
    
    if (this.wishListItems.length == 0) {
      return 0;

    }
    else {

      var conWish = this.wishListItems.includes(id);
      if (conWish) {
        return 1;
      }
      else {
        return 0;
      }

    }

  }
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  //items-list-api
  getProductListApi(): Observable<any> {
    return this.httpClient.post
      (
        `${environment.apiUrl}` + 'productlist',
        {
          "generalCollectionId": this.genCollectId,
          "subcategoryId": this.subId,
          "page": 1

        }
      );
  }

  //get-wishlist-api
  getWishlistApi(): Observable<any> {
    return this.httpClient.post
      (
        `${environment.apiUrl}` + 'userinfo',
        {
          "userId": window.localStorage.getItem('userId')

        }
      );
  }


  pdtList = []
  pdtDir = ''

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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.genCollectId = params['g']
      this.subId = params['id']
      this.getTitle = params['title']
    })

    //pdt-list
    this.getProductListApi().subscribe(
      (res) => {
        this.pdtList.push(res['productDetails'])
        this.pdtDir = environment.baseUrl + res['productDir']

      }
    ) 
    //get-wishlist

    this.getWishlistApi().subscribe(
      (res) => {

        console.log(res)
        if (res.status == 0) {
          //this.router.navigate([''])
        }
        else {
          this.wishListItems = res.userInfo.wishlist
        }

      }
    ) 

  }

  //pdt-details
  pdtDetails(id: any) {
    this.router.navigate(['/product-details', id])
  }
  //add-to-wishlist

  addWishlistApi(pdtId: any): Observable<any> {

    return this.httpClient.post
      (
        `${environment.apiUrl}` + 'addwishlist',
        {
          "productId": pdtId,
          "userId": window.localStorage.getItem('userId')
        }
      );
  }
 

  addTowishList(pdtId: any) {
    
    this.router.navigate(['/items-list'])
    this.addWishlistApi(pdtId).subscribe(
      (res) => {
    

      }
    )

  }


}
