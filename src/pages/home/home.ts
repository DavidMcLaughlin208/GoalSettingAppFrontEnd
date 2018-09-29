import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StubbingProvider } from '../../providers/stubbing/stubbing';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { CustomLoadingProvider } from '../../providers/custom-loading/custom-loading';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public greeting: {id: string, greeting: string};

  constructor(public navCtrl: NavController, public loadingCtrl: CustomLoadingProvider, public navParams: NavParams, private stub: StubbingProvider, private auth: AuthenticationProvider) {
    console.log("Hello HomePage");
    console.log(stub.value);
    this.greeting = this.auth.getGreeting("David");
    this.loadingCtrl.dismissLoading();
  }

}
