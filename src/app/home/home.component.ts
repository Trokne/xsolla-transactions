import { Observable, Subscription } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Component, PipeTransform, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { DecimalPipe } from "@angular/common";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.sass"],
  providers: [DecimalPipe]
})
export class HomeComponent implements OnInit, OnDestroy {
  rawTransactions: Array<any>;
  filteredTransactions: Observable<any[]>;
  filter = new FormControl("");

  private defaultDataPath: string;
  private transactionsSubscription: Subscription;

  constructor(private http: HttpClient, pipe: DecimalPipe) {
    this.defaultDataPath = "/assets/data/data.json";
  }

  ngOnInit(): void {
    this.loadRawTransactions();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  private unsubscribeAll() {
    this.transactionsSubscription.unsubscribe();
  }

  private loadRawTransactions() {
    this.transactionsSubscription = this.http
      .get(this.defaultDataPath)
      .subscribe(data => {
        this.rawTransactions = data as any[];
        this.filterTransactions();
      });
  }

  private filterTransactions() {
    this.filteredTransactions = this.filter.valueChanges.pipe(
      startWith(""),
      map(text => this.search(text))
    );
  }

  public search(text: string): any[] {
    return this.rawTransactions.filter(entity => {
      const term = text.toLowerCase();
      return entity.transaction.project.name.toLowerCase().includes(term);
    });
  }
}
