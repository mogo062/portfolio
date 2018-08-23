import { Component, OnInit, OnChanges,OnDestroy, Input,Output,EventEmitter, ChangeDetectionStrategy, ViewChild, ComponentFactoryResolver,ComponentRef,ViewContainerRef } from '@angular/core';

const defaultautohide : number = 500;
@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit, OnChanges, OnDestroy {
  @Input('tag') tag :string ;
  @Input("autohide") autohide: number=defaultautohide;
  @Input("message") message: string ='';
  @Input("show") show : boolean = false;

  @Output()
  onShowAlertMessage: EventEmitter<Object> = new EventEmitter<Object>();
  _message : any = {};

  private timer : any;

  constructor() { }
  ngOnInit() {  }

  ngOnChanges(changes){
  //  console.log(changes.autohide.currentValue);
   if (changes.tag && isNaN(changes.tag.currentValue)) {
     this.tag = changes.tag.currentValue;
   }else{
     this.tag='I';
   }
  /* if (changes.autohide && isNaN(changes.autohide.currentValue)) {
     this.autohide = changes.autohide.currentValue;
     //defaultautohide = this.autohide;
   }else{
     this.autohide = defaultautohide;
   }*/
/*

   */
   if(this.timer) {
     clearTimeout(this.timer);
   }

   if(this.autohide){

     this.timer = setTimeout(()=> {
       this.close();
     }, this.autohide);
   }
  }
  ngOnDestroy(){

 }
 close(){
   this._message = {
       text : "",
       tag : 'I',
       show : false,
       autohide: 5000
     };
   this.onShowAlertMessage.emit(this._message);

 }

 }
