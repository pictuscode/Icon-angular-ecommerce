import { LoginPage } from './../login/login.page';
import { HttpService } from './../../../services/http.service';
import { AppServicePage } from 'src/app/services/app.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
  providers: [NavParams]
})
export class OtpPage implements OnInit {

  //otp-input
  @ViewChild(
    "ngOtpInput",
    { static: false })
  ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    inputStyles:
    {
      width: "30px",
      height: "42px",
    },
    inputClass: 'fontClass',

  };

  otp: string;
  alertController: any;
  nav: any;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  phone = window.localStorage.getItem('phone');
  verifyCode = window.localStorage.getItem('verifyCode');
  constructor(
    public router: Router,
    public loadingCtrl: LoadingController,
    private appService: AppServicePage,
    private httpService: HttpService,
    private loginPage: LoginPage,
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpClient: HttpClient,
    private toastController: ToastController,
  ) { }

  //toast-msg

  async incorrectToast() {
    const toast = await this.toastController.create({
      message: 'Incorrect OTP',
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }
  async logedIntoast() {
    const toast = await this.toastController.create({
      message: 'LoggedIn',
      duration: 2000,
      color: 'secondarythemecolor',
    });
    toast.present();
  }

  //show-temp-otp
  async showOtp() {
    const toast = await this.toastController.create({
      message: 'Otp is 1111 ',
      duration: 2000,
      color: 'primary',
    });
    toast.present();
  }



  //loader
  async presentLoadingText() {
    let loading = await this.loadingCtrl.create({
      spinner: 'crescent',

    });

    loading.present();


    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  ngOnInit() {
    this.showOtp()
  }


  //otp-api
  otpCode(item: any): Observable<any> {

    return this.httpClient.post
      (
        `${environment.apiUrl}` + 'otpverify',
        {
          "hash": window.localStorage.getItem('verifyCode'),
          "phone": window.localStorage.getItem('phone'),
          "otp": item
        },
        this.httpOptions
      );
  }

  //otp-action
  otpAction(otp: string) {
    if (otp != '' && otp != null) {

      this.otpCode(otp).subscribe(

        (res: any) => {


          if (res.status == 1) {


            window.localStorage.setItem('token', res.data.token)
            window.localStorage.setItem('userId', res.data.id)

            this.logedIntoast()
            this.router.navigate(['main'])

          }
          else {
            this.incorrectToast()
            console.log('InCorrect Otp Number');
          }
        },

        (error: any) => {
          console.log('Network Issue.');
        }

      );
    }

    else {
      console.log('Please enter valid Otp.');
    }

  }

  //otp-submit
  onOtpChange(otp: any) {
    this.otp = otp;

    if (otp.length === 4) {


      this.otpAction(otp)

    }

  }



  presentLoadingWithOptions() {
    throw new Error('Method not implemented.');
  }

}






