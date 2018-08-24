import { Component, OnInit, OnChanges,OnDestroy, Input,Output,EventEmitter, ChangeDetectionStrategy, ViewChild, ComponentFactoryResolver,ComponentRef,ViewContainerRef } from '@angular/core';

import { AlertService } from  '../../services/alert.service';

const defaultautohide : number = 500;

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit, OnChanges, OnDestroy {

  constructor(private alertService : AlertService) { }
  ngOnInit() {  }

  ngOnChanges(changes){  }
  ngOnDestroy(){ }

 }
