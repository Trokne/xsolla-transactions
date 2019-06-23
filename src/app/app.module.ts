import { BrowserModule } from "@angular/platform-browser";
import { NgModule, PipeTransform } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    HttpClientModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
