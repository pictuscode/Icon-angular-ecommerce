import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppServicePage } from 'src/app/services/app.service';

@Component({
  selector: 'app-category-slide-widget',
  templateUrl: './category-slide-widget.page.html',
  styleUrls: ['./category-slide-widget.page.scss'],
})
export class CategorySlideWidgetPage implements OnInit {
  @Input() isCategorySlide = ''
  @Input() isfeaturedSlide = ''
  @Input() isBrandSlide = ''
  @Input() isTopPicks = ''

  constructor(private appService: AppServicePage,) { }
  categoryopt = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.5,
  }
  //categoryApi
  categories = [];
  groupDir = ""

  //budgetBuyApi
  dynamicBlock = [];
  dynamicBlockDir = ""
  ngOnInit() {
    //category-slide
    this.appService.getBannerSlide().subscribe(
      (res) => {
       
        var dt = JSON.parse(JSON.stringify(res['groupDetails']));
        this.groupDir = environment.baseUrl + res['groupDir']
     

        this.categories.push(res['groupDetails'])
       
      }
    )
    //budgetBuy-slide
    this.appService.getBannerSlide().subscribe(
      (res) => {
      
        var dynamic = JSON.parse(JSON.stringify(res['dynamicBlock']));
        this.dynamicBlockDir = environment.baseUrl + res['dynamicBlockDir']
        

        this.dynamicBlock.push(res['dynamicBlock'])
      
      }
    )
  }

}
