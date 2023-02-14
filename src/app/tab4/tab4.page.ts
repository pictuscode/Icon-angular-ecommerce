import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  constructor(private router: Router, public loadingCtrl: LoadingController,) { }



  //loader
  async presentLoadingText() {
    let loading = await this.loadingCtrl.create({
      spinner: 'crescent',

    });

    loading.present();

    setTimeout(() => {
      window.localStorage.removeItem('userId')
      window.localStorage.removeItem('phone')
      this.router.navigate(['']);

    }, 1000);
    
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  logout() {
    this.presentLoadingText()

  }
}
