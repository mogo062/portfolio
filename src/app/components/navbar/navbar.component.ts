import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Stock } from '../../services/stocks.model';
import { StocksService } from '../../services/stocks.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Output()
  onToggleRefresh : EventEmitter<Object> = new EventEmitter<Object>();
  refresh : boolean = true;
  interval: any;

  @Output()
  onShowAlertMessage: EventEmitter<Object> = new EventEmitter<Object>();
  message : any = {};

  constructor(private accountService: AccountService, private stockService: StocksService) { }

  ngOnInit() {
    this.accountService.init();
    this.load();
    this.interval = setInterval(()=>{
      if(this.refresh){
         this.load();
       }
    },20000);
  }

  ngOnDestroy(){
    clearInterval(this.interval);
  }
  reset(){
    this.accountService.reset();
    this.message = {
        text : "You have reset your portfolio!"+new Date(),
        tag : 'W',
        show : true,
        autohide: 10000
      };
    this.onShowAlertMessage.emit(this.message);
  }

  toggleRefresh(){
    console.log(this.refresh);
    //this.onToggleRefresh.emit(!this.refresh);
    this.refresh = !this.refresh;
    this.message = {
        text : "You have refresh your portfolio!"+new Date(),
        tag : 'I',
        show : true,
        autohide: 5000
      };
    this.onShowAlertMessage.emit(this.message);
  }


  private load(){
    this.stockService.getStocks().subscribe(stocks => {
      this.onToggleRefresh.emit(stocks);
//      this.stocks = stocks;
      //console.log(stocks.length);
    }, error => {
      console.error(`There was an error loading stocks: ${error}`);
    })
  }
}
