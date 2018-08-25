import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClarityModule } from "@clr/angular";

import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TickerComponent } from './components/ticker/ticker.component';
import { InvestementsComponent } from './components/investements/investements.component';
import { StocksComponent } from './components/stocks/stocks.component';

import { AccountService } from './services/account.service';
import { StocksInterceptor } from './services/interceptor.service';

import { LocalStorageService } from './services/local-storage.service';
import { AlertService } from './services/alert.service';

import { CurrencyPipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    NavbarComponent,
    TickerComponent,
    InvestementsComponent,
    StocksComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    HttpClientModule
  ],
  providers: [
    AlertService,  // to share service between components
    LocalStorageService,
    AccountService,
    CurrencyPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StocksInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
