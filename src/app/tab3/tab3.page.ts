import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  emptyBag = true;

  //slide
  viewedOpt = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.5,
  }
  constructor(
    public actionSheetController: ActionSheetController,
    private httpClient: HttpClient,
    private modalCtrl: ModalController,
    private router: Router,
  ) { }


  bagListApi(): Observable<any> {

    return this.httpClient.post
      (
        `${environment.apiUrl}` + 'userbaglist',
        {
          "userId": window.localStorage.getItem('userId'),


        }
      );
  }


  //to-bag-size
  pdtId = ''

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

  //display-bag-list-items

  pdtDir = ''
  bagListArr = []

  bagList() {
    this.bagListApi().subscribe(
      (res) => {
        this.bagListArr.push(res)
        this.pdtDir = environment.baseUrl + res.productDir

      }
    )
  }


  ngOnInit() {
    this.bagList()
  }

  //navigate-wishlist
  navigateWishList() {
    this.router.navigate(['wishList'])
  }
}
