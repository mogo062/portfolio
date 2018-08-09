import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Stock } from '../../services/stocks.model';

@Component({
  selector: 'stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  @Input()
  stocks : Stock[] = [];
  constructor(private accountService : AccountService) { }

  ngOnInit() {
  }

  buy(stock){
    this.accountService.purchase(stock);
  }
}
