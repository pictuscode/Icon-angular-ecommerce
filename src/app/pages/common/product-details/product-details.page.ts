import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PopoverController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})

export class ProductDetailsPage implements OnInit {

  trendingSlide = 'true'
  pdtId: any;
  wishTxt = 'Wishlist'
  imageSrc = 'assets/images/itemsPics/heart.png'
  imageAlt = 'emptyWishlist'


  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    public popoverController: PopoverController,
    private actionSheetCtrl: ActionSheetController,
    private toastController: ToastController

  ) { }

  //geunine-action-sheet
  async showMyActionSheet() {

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [],
      header: "Genuine Product",
      subHeader: "This is a genuine product,sold by an authorized seller of brand " + this.pdtTitle
    });

    await actionSheet.present();
  }


  //slide
  productOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,

  };
 

  //pdt-details-api
  getPdtInfoApi(): Observable<any> {
    return this.httpClient.post
      (
        `${environment.apiUrl}` + 'productinfo',
        {
          "productId": this.pdtId,
          "userId": window.localStorage.getItem('userId'),
        }
      );
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

  //select-pdt-size
  tit = ''
  mrp = 0
  sizeId = ''
  oneMoreSeller = false
  sellerArr = []
  sellPrice = 0
  sell = ''
  sellerId = ''
  dis = 0
  sizeCheck = true;
  isOpen = false;

  //see-rate
  seeRate(name: any, title: any, mrpRate: any, sizeId: any) {
   
    this.tit = title
    this.mrp = mrpRate[0].mrpPrice
    this.sizeId = sizeId

    if (name.length > 1) {
      this.oneMoreSeller = true;
      this.sellerArr.push(name)
      this.sellPrice = name[0].price
      this.sell = name[0].sellerId.sellerName
      this.sellerId = name[0].sellerId._id

    }
    else {
      this.sellPrice = name[0].price
      this.oneMoreSeller = false;
      this.sell = name[0].sellerId.sellerName
      this.sellerId = name[0].sellerId._id

    }

    this.dis = Math.ceil(100 * ((this.mrp - this.sellPrice) / this.mrp))
    this.sizeCheck = true;
    this.isOpen = true;

  }


  pdtInfo = []
  pdtsId = ''
  pdtInfoDir = ''
  pdtTitle = ''
  pdtName = ''
  pdtPrice = ''
  pdtMRP = ''
  pdtDiscount = ''
  pdtTotalReview = ''
  pdtAvg = ''
  inclusiveTaxes = ''
  pdtSize = []
  deliveryOpt = []
  specification = []
  pdtDescription = ''
  sizeAndFit = ''
  mat = ''
  completeLook = ''
  comments = []
  fiveStar = ''
  fourStar = ''
  threeStar = ''
  twoStar = ''
  oneStar = ''
  TotalReviewImage = ''
  FirstFewReviewImage = []
  reviewsDir = ''
  productCode = ''

  //get-pdt-size

  pdtSizes(): Observable<any> {


    return this.httpClient.post
      (
        `${environment.apiUrl}` + 'getproductsize',
        {
          "productId": this.pdtId
        }
      );
  }

  size = []
  sizePdt = []
  sellerName = ''
  mrpPrice = ''

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pdtId = params['id']
     
    })

    //pdt-info
    this.getPdtInfoApi().subscribe(
      (res) => {
        //pdt-info
        this.pdtInfo = res['productInfo']
        this.pdtInfoDir = environment.baseUrl + res.productDir
        this.pdtsId = res.productInfo._id
        this.pdtTitle = res.productInfo.brandId.name
        this.pdtName = res.productInfo.productName
        this.pdtPrice = res.productInfo.price
        this.pdtMRP = res.productInfo.mrpPrice
        this.pdtDiscount = res.productInfo.discount
        this.inclusiveTaxes = res.productInfo.inclusiveTaxes
        this.pdtSize.push(res.productInfo.sizeChart)
        this.deliveryOpt.push(JSON.parse(res.productInfo.deliveryOption))
        this.specification.push(res.productInfo.specification)
        this.pdtDescription = res.productInfo.productDiscription
        this.sizeAndFit = JSON.parse(res.productInfo.sizeAndFit)
        this.mat = JSON.parse(res.productInfo.materialandCare)
        this.completeLook = res.productInfo.completeLook
        this.productCode = res.productInfo.productCode

        //review-info
        this.pdtTotalReview = res.reviewInfo.totalReview
        this.pdtAvg = res.reviewInfo.average
        this.comments = res.reviewInfo.FirstFewComments
        this.fiveStar = res.reviewInfo.fiveStar
        this.fourStar = res.reviewInfo.fourStar
        this.threeStar = res.reviewInfo.threeStar
        this.twoStar = res.reviewInfo.twoStar
        this.oneStar = res.reviewInfo.oneStar
        this.TotalReviewImage = res.reviewInfo.overallReviewImage
        this.FirstFewReviewImage.push(res.reviewInfo['FirstFewReviewImage'])
        this.reviewsDir = environment.baseUrl + res.reviewsDir


        if (res.wishlistCon) {
          this.wishTxt = 'Wishlisted'
          this.imageSrc = 'assets/images/itemsPics/filledHeart.svg'
        }
        else {
          this.wishTxt = 'Wishlist'
          this.imageSrc = 'assets/images/itemsPics/heart.png'
        }

      }
    )

    //get-pdt-size
    this.pdtSizes().subscribe(
      (res) => {
       
        this.size.push(res.sizeDetails)
        this.sizePdt.push(res.sizeDetails.productSize)
        this.sellerName = (res.sizeDetails.productSize[0].sellerDetails[0].sellerId.sellerName)
        this.mrpPrice = res.sizeDetails.mrpPrice
      }
    )

  }
  //add-to-bag


  async pdtSizeToast() {
    const toast = await this.toastController.create({
      message: 'Please select product size',
      duration: 1500,
      position: 'bottom',
      color:'danger'
    });

    await toast.present();
  }

  async addBagToast() {
    const toast = await this.toastController.create({
      message: 'Added to Bag Successfully',
      duration: 1500,
      position: 'bottom',
      color: 'secondarythemecolor',

    });

    await toast.present();
  }

  moveToBag(pdtId: any): Observable<any> {


    return this.httpClient.post
      (
        `${environment.apiUrl}` + 'movetobag',
        {
          "userId": window.localStorage.getItem('userId'),
          "sellerId": this.sellerId,
          "sizeId": this.sizeId,
          "productId": pdtId

        }
      );
  }



  addToBag(pdtId: any) {

    if (
      this.sellerId !== '' && this.sellerId != null &&
      this.sizeId !== '' && this.sizeId != null

    ) {
      this.moveToBag(pdtId).subscribe(
        (res) => {

          this.addBagToast()

         

        }
      )
    }
    else {
      this.pdtSizeToast()

    }

  }

  //add-to-wishlist

  addWishlistApi(): Observable<any> {

    return this.httpClient.post
      (
        `${environment.apiUrl}` + 'addwishlist',
        {
          "productId": this.pdtId,
          "userId": window.localStorage.getItem('userId')
        }
      );
  }

  addTowishList() {


    this.addWishlistApi().subscribe(
      (res) => {
       
        if (res.status == 0) {
          this.router.navigate(['wishList'])
        }
        else {
          this.wishTxt = 'Wishlisted'
          this.imageSrc = 'assets/images/itemsPics/filledHeart.svg'
        }

      }
    )

  }

  progressPercent(number: any, review: any) {
    return number / review
  }

  //navigate-wishlist
  navigateWishList() {
    this.router.navigate(['wishList'])
  }
  //navigate-bag
  navigateBag() {
    this.router.navigate(['cart'])
  }

}
