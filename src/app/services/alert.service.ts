import { Injectable } from '@angular/core';

const defaultautohide : number  = 500;
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private tag :string = 'I';
  private autohide: number=defaultautohide;
  private message: string ='';
  private show : boolean = false;
  private timer : any;

  constructor() { }

  alert(show: boolean, autohide: number, tag: string, message: string) {
    this.show = show;
    this.autohide = autohide;
    this.tag = tag;
    this.message = message;
    console.log(this);
    if(this.timer) {
      clearTimeout(this.timer);
    }
    if(this.autohide){
      this.timer = setTimeout(()=> {
        this.close();
      }, this.autohide);
    }
  }

  getTag(){
    return  this.tag;
  }

  getAutoHide(){
    return (this.autohide && isNaN(this.autohide)) ? this.autohide : defaultautohide;
  }

  getMessage(){
    return this.message;
  }

  isShow(){
    return this.show;
  }

  close(){

    this.show = false;
    this.message = '';
    this.tag = 'I';
    this.autohide = defaultautohide;
  }
}
