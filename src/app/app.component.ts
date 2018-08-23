import { Component, OnInit, OnDestroy } from '@angular/core';

import { Stock } from './services/stocks.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Fantasy Portfolio';
  //refresh : boolean = true;
  stocks : Stock[] = [];
  private messageAlert : string ='';
  private showAlert: boolean = false;
  private tagAlert: string = 'I';
  private autohideAlert : number;
  constructor(){

  }
  ngOnInit() {

  }
  ngOnDestroy(){

  }
  toggleRefresh(stocks){
    this.stocks = stocks;
    console.log("toggle = ",this.stocks.length);

    //this.refresh = toggle;
    //this.refresh = !this.refresh;
  }

  showAlertMessage(message){
    console.log(message);
    this.showAlert= message.show;
    this.tagAlert=message.tag;
    this.messageAlert=message.text;
    this.autohideAlert = message.autohide;
  }

}
