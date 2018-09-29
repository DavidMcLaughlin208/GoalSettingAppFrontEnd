import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the StubbingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StubbingProvider {
  public stub: boolean;
  public value: number;

  constructor(public http: HttpClient) {
    console.log('Hello StubbingProvider Provider');

    this.stub = true;
    this.value = Math.random();
  }

}
