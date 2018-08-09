import { Component, OnInit, DoCheck } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'investements',
  templateUrl: './investements.component.html',
  styleUrls: ['./investements.component.css']
})
export class InvestementsComponent implements OnInit, DoCheck {
  cost : number = 0;
  value : number = 0;
  change : number = 0;
  stocks : any =[];

  constructor(private accountService : AccountService) { }

  ngOnInit() {
  }
  ngDoCheck(){
    if (this.accountService.stocks.length != this.stocks.length){
      this.stocks = this.accountService.stocks;
    }
    if(this.cost !== this.accountService.cost || this.value !== this.accountService.value ){
      this.cost = this.accountService.cost;
      this.value = this.accountService.value;
      this.change = this.accountService.value - this.accountService.cost;
    }
  }
  sell(index){
    this.accountService.sell(index);
  }

}
