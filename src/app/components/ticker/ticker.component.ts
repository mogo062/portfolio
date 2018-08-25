import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/animations';
@Component({
  selector: 'ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css'],
  animations:[
    trigger('slideOut', [
      transition(':leave',[
        style({
          marginLeft: 0,
          opacity : 1
        }),
        animate('1000ms ease-in-out', style({
          marginLeft: '-324px',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class TickerComponent implements OnInit {

  @Input('stocks') stocks : any = [];
  private _stocks : any = [];
  private interval : any;
  private page : number = 0;
  constructor() { }

  ngOnInit() {
    this.interval = setInterval(()=>{
      this.nextStock();
    }, 1000);
  }

  ngOnChanges(): void{
    if(this.stocks.length && this._stocks.length < 30){
      if(this.page * 100 > this.stocks.length){
        this.page = 0;
      }
      let additions = this.stocks.splice(this.page * 100, (this.page+1) * 100);
      this._stocks.push(...additions);
      this.page++;
    }
  }

  private nextStock(): void{
    this._stocks.splice(0,1);
  }
}
