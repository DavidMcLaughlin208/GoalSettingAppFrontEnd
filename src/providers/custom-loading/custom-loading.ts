import { Injectable } from '@angular/core';
import { LoadingController, Loading } from '../../../node_modules/ionic-angular';

/*
  Generated class for the CustomLoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomLoadingProvider {
  loading: Loading;

  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello CustomLoadingProvider Provider');
    this.loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
  }

  presentLoading() : Promise<void> {
    console.log("Presenting loading");
    return this.loading.present();
  }

  dismissLoading() : Promise<void> {
    console.log("Dismissing loading");
    let prom = this.loading.dismiss();
    this.loading = this.createNewLoading();
    return prom;
  }

  private createNewLoading() : Loading {
    return this.loadingCtrl.create({
      content: "Please wait..."
    });
  }

}
