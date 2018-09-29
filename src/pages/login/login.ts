import { Component } from "../../../node_modules/@angular/core";
import { NavController } from "ionic-angular";
import { HomePage } from "../home/home";
import { StubbingProvider } from "../../providers/stubbing/stubbing";
import { AuthenticationProvider } from "../../providers/authentication/authentication";
import { CustomLoadingProvider } from "../../providers/custom-loading/custom-loading";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    credentials: {username: string, password: string};
    showError: boolean = false;

    constructor(public navCtrl: NavController, public loadingCtrl: CustomLoadingProvider, public auth: AuthenticationProvider, private stub: StubbingProvider) {
        this.credentials = {username: "",
                            password: ""};
                            this.showError = false;
        
        this.auth.removeTokenFromStorage();
        this.tryLoginWithToken();
        
    }

    tryLoginWithToken() {
        this.loadingCtrl.presentLoading();
        let tokenPromise = this.auth.loginWithToken();
        tokenPromise.then(isAuthorized => {
            console.log("Login: isAuthToken: " + isAuthorized);
            if (isAuthorized) {
                this.navCtrl.setRoot(HomePage);
            }
            this.loadingCtrl.dismissLoading();
        }).catch((reason) => {
            this.loadingCtrl.dismissLoading();
        })
    }

    onSubmit() {
        this.loadingCtrl.presentLoading();
        let authenticatedPromise = this.auth.authenticate(this.credentials.username, this.credentials.password);
        console.log(authenticatedPromise);
        authenticatedPromise.then(isAuthorized => {
            this.loadingCtrl.dismissLoading().then(() => {
                console.log(isAuthorized);
                if(isAuthorized) {
                    this.navCtrl.setRoot(HomePage);
                } else {
                    this.showError = true;
                }
             });
        })
    }
}