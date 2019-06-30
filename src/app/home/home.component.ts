import { MenuType } from "./../model/menu-types";
import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DecimalPipe } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.sass"],
  providers: [DecimalPipe]
})
export class HomeComponent implements OnInit, OnDestroy {
  rawTransactions: any[];
  selectedMenu: MenuType;
  private defaultDataPath: string;
  private transactionsSubscription: Subscription;

  constructor(private http: HttpClient, private router: Router) {
    this.defaultDataPath = "/assets/data/data.json";
  }

  ngOnInit(): void {
    this.loadRawTransactions();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  private handleRouting() {
    switch (this.router.url) {
      case "/":
      case "/table":
        this.selectedMenu = MenuType.Table;
        break;
      case "/projects":
        this.selectedMenu = MenuType.Projects;
        break;
      case "/rating":
        this.selectedMenu = MenuType.Rating;
        break;
    }
  }

  private unsubscribeAll() {
    this.transactionsSubscription.unsubscribe();
  }

  private loadRawTransactions() {
    this.transactionsSubscription = this.http
      .get(this.defaultDataPath)
      .subscribe(data => {
        this.rawTransactions = data as any[];
        this.handleRouting();
      });
  }
}
