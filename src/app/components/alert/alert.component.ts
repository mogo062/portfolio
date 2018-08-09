import { Component, OnInit, OnChanges,OnDestroy, Input, ChangeDetectionStrategy, ViewChild, ComponentFactoryResolver,ComponentRef,ViewContainerRef } from '@angular/core';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit, OnChanges, OnDestroy {
  @Input('tag') tag :string = 'I';

  constructor() { }
  ngOnInit() {  }

  ngOnChanges(changes){
   if (changes.taq && isNaN(changes.tag.currentValue)) this.tag='I';

  }
  ngOnDestroy(){

 }
 close(){
   console.log(this);
 }

}
