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

}
