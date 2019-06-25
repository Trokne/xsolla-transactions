import { Observable, Subscription } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Component, PipeTransform, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { DecimalPipe } from "@angular/common";
import * as CanvasJS from "additional_modules/canvasjs-2.3.1/canvasjs.min";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.sass"],
  providers: [DecimalPipe]
})
export class HomeComponent implements OnInit, OnDestroy {
  rawTransactions: any[];
  paymentSystems: any[];
  filteredTransactions: Observable<any[]>;
  filter = new FormControl("");
  projects: string;

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
        this.parseProjects();
        this.parsePaymentSystemRating();
        this.drawChart();
      });
  }

  private drawChart() {
    const chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      data: [
        {
          type: "column",
          dataPoints: this.paymentSystems.map(x => ({ y: x[1], label: x[0] }))
        }
      ]
    });

    chart.render();
  }

  private parseProjects() {
    this.projects = Array.from(
      new Set(this.rawTransactions.map(x => x.transaction.project.name))
    ).join(", ");
  }

  private parsePaymentSystemRating() {
    const uncountedPaymentSystems = this.rawTransactions.map(
      x => x.transaction.payment_method.name
    ) as string[];

    const unsortedSystems = {};

    // tslint:disable-next-line: forin
    for (const index in Object.keys(uncountedPaymentSystems)) {
      const system = uncountedPaymentSystems[index];
      unsortedSystems[system] = unsortedSystems[system]
        ? unsortedSystems[system] + 1
        : 1;
    }

    this.paymentSystems = Object.entries(unsortedSystems).sort(
      (a, b) => (b[1] as number) - (a[1] as number)
    );
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
