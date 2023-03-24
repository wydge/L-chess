import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { appService } from './app.service';
import { RulesService } from './rules/rules.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    appService,
    RulesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
