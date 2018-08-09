import { Injectable } from '@angular/core';
import { Stock } from './stocks.model';
import { LocalStorageService } from './local-storage.service';


const defaultBalance: number = 10000;
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _balance: number =  defaultBalance;
  private _cost: number = 0;
  private _value: number = 0;
  private _stocks: Stock[]=[];

  get balance(): number { return this._balance;}
  get cost(): number { return this._cost;}
  get value(): number { return this._value;}
  get stocks(): Stock[] { return this._stocks; }

  constructor(private localStorageService : LocalStorageService) {
//   this.init();
  }

  purchase(stock : Stock): void {
    stock = Object.assign({}, stock);
    if(stock.price < this._balance){
      this._balance=this.debit(stock.price, this.balance);
      stock.cost = stock.price;
      this._cost = this.credit(stock.price, this.cost);
      stock.change = 0;
      this.stocks.push(stock);
      this.calculateValue();
      this.cacheValues(); // add to cach values after purchase and sell
    }
  }

  sell(index : number):void {
    let stock = this._stocks[index];
    if(stock){
      this._balance = this.credit(stock.price, this.balance);
      this._stocks.splice(index, 1);
      this._cost = this.debit(stock.cost, this.cost);
      this.calculateValue();
      this.cacheValues(); // add to cach values after purchase & sell
    }
  }

  init(){
   //this._cost=1500;
   //this._value = 3000;
   this._stocks = this.localStorageService.get('stocks', []);  // add to recovery data from cache
   this._balance = this.localStorageService.get('balance', defaultBalance);  // add to recovery data from cache
   this._cost = this.localStorageService.get('cost', 0);  // add to recovery data from cache
  }
  reset(){
    this._stocks = [];
    this._balance = defaultBalance;
    this._cost = 0;
    this._value = 0;
    this.cacheValues();  // add to cach values after purchase & sell
  }

  calculateValue(): void{
    /*
    map func : create an array by stock.price only (a verctor by stock.price values)
    reduce func : sum all array value in this case
    */
    this._value = this._stocks.map(stock => stock.price).reduce((a,b) => { return a + b }, 0);
  }

  private credit(amount: number, balance: number): number{
    return (balance*100+amount*100)/100;
  }

  private debit(amount: number, balance: number): number{
    return (balance*100-amount*100)/100;
  }

  private cacheValues(){
    this.localStorageService.set('stocks', this.stocks);
    this.localStorageService.set('balance', this.balance);
    this.localStorageService.set('cost', this.cost);
  }
}
