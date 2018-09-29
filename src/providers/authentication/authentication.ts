import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StubbingProvider } from '../stubbing/stubbing';

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {
  public token: string;

  constructor(public http: HttpClient, private stub: StubbingProvider) {
    console.log('Hello AuthenticationProvider Provider');
    this.token = this.getTokenFromStorage();
    console.log(stub.value);
  }

  authenticate(username: string, password: string) : Promise<Object> {
    let isAuthorized = false;
    let credentials = {"username": username, "password": password};
    return new Promise((resolve) => {
      this.http.post("http://localhost:8080/authenticate", credentials)
      .subscribe(data => {
        console.log(data);
        if (data['token'] == "true") {
          localStorage.setItem("token", data["token"]);
        }
        resolve(data['isAuthorized'] == "true");
      }, err => {
        console.log(err);
      })
    });
  }
  

  getGreeting(user: string) : {id: string, greeting: string} {
    let dataObj = {id: "", greeting: ""};
    let promise = this.http.get("http://localhost:8080/greeting?name=David");
    promise.subscribe(data => {
      dataObj['id'] = data['id']; 
      dataObj['greeting'] = data['content'];
    });
    return dataObj;
  }

  loginWithToken() : Promise<boolean> {
    let token = this.getTokenFromStorage();
    console.log(token);
    if(token) {
      return new Promise((resolve) => {
        this.http.post("http://localhost:8080/authenticateWithToken", token)
        .subscribe(data => {
          console.log(data);
          if (data['isAuthorized'] == "true") {
            resolve(true);
          } else {
            this.removeTokenFromStorage()
            resolve(false);
          }
        })
      })
    } else {
      return new Promise((resolve) => {
        resolve(false);
      })
    }
  }

  private getTokenFromStorage() : string {
    return localStorage.getItem("token");
  }

  // public for manual testing. Should be private.
  public removeTokenFromStorage() : void {
    localStorage.removeItem("token");
  }

}
