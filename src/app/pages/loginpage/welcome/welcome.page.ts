import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  
  isnumber = window.localStorage.getItem('phone')

  constructor(public router: Router,public loadingCtrl: LoadingController,) { }

   //loader
   async presentLoadingText() {
    let loading = await this.loadingCtrl.create({
      spinner: 'crescent',

    });

    loading.present();

    setTimeout(() => {
      if (this.isnumber != null && this.isnumber != '') {
        this.router.navigate(['main'])
      }
      else {
        this.router.navigate(['login'])
      }

    }, 1000);
    
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  ngOnInit() {

    this.presentLoadingText()
  
   
  }

}
