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

  constructor(private accountService: AccountService, private stockService: StocksService) { }

  ngOnInit() {
    this.accountService.init();
    this.load();
    this.interval = setInterval(()=>{
      if(this.refresh){
         this.load();
       }
    },15000);
  }

  ngOnDestroy(){
    clearInterval(this.interval);
  }
  reset(){
    this.accountService.reset();
  }

  toggleRefresh(){
    console.log(this.refresh);
    //this.onToggleRefresh.emit(!this.refresh);
    this.refresh = !this.refresh;
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
