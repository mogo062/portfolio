import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { HttpEvent, HttpInterceptor, HttpResponse, HttpHandler, HttpRequest } from '@angular/common/http';

import { AccountService } from './account.service';
import { Stock } from './stocks.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class StocksInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const request = req.clone();
    request.headers.append('Accept', 'application/json');

    return next.handle(request).do(event => {
      if(event instanceof HttpResponse && event.url == ConfigService.get('api')){
        const stocks = event.body as Array<Stock>;
      //  console.log("stocks : ", stocks);
      //ths next flowwing line is a dead code :
        let symbols = this.accountService.stocks.map(stock => stock.symbol);
        let i = 0;
        stocks.forEach(stock => {
          //console.log("i = "i+' = ', stock);
          let j = 0;
          this.accountService.stocks.map(item => {
            if(stock.symbol === item.symbol ){
              console.log(i+" = "+j+" = ", item);
              item.price = stock.price;
              item.change = ((stock.price * 100) - (item.cost * 100 )) / 100;
            }
            j++;
          });
          i++;
        });
        this.accountService.calculateValue();
        return stocks;
      }
    });

  }
}
