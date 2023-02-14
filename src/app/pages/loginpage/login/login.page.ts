import { OtpPage } from './../otp/otp.page';
import { StorageService } from './../../../services/storage.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppServicePage } from './../../../services/app.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/api/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationExtras } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {


  //send data to api
  postData = {
    phone: '9123456789'

  };

  loginForm: FormGroup;
  isSubmitted = false;
  authenticated = false;
  loginErrorMessage = 'inactive';
  isReadonly() {return true;}

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private appService: AppServicePage,
    public navCtrl: NavController,
    private http: HttpClient,
    public userService: UserService,
    private authService: AuthService,
    private storageService: StorageService,



  ) { }


ngOnInit() {

  //validation
  this.loginForm = this.formBuilder.group({
    mobile: [
      '',
      [
        Validators.required,
        Validators.pattern("^([+][9][1]|[9][1]|[0]){0,1}([6-9]{1})([0-9]{9})$")
      ]
    ]
  });

}

  //validation-error
  get errorControl() {
  return this.loginForm.controls;
}



//login-action
loginAction() {
  if (this.postData.phone != '' && this.postData.phone != null) {

   
    this.authService.login(this.postData).subscribe(
      (res: any) => {
        

        if (res) {

        window.localStorage.setItem('verifyCode',res['verify'])
        window.localStorage.setItem('phone',this.postData.phone)
         
        
         
          this.router.navigate(['otp'])
        }
        else {
          console.log('InCorrect Mobile Number');
        }
      },

      (error: any) => {
        console.log('Network Issue.');
      }

    );
  }

  else {
    console.log('Please enter valid password.');
  }

}




//submit-form
submitForm() {

  this.isSubmitted = true;

  if (!this.loginForm.valid) {

   
    return false;

  }
  else {

    this.loginAction()

  }

}


}

