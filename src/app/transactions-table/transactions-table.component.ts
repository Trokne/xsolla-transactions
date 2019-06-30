import { Observable, Subscription } from "rxjs";
import { map, startWith } from "rxjs/operators";
import {
  Component,
  PipeTransform,
  OnInit,
  OnDestroy,
  Input
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { DecimalPipe } from "@angular/common";
import * as CanvasJS from "additional_modules/canvasjs-2.3.1/canvasjs.min";

@Component({
  selector: "app-transactions-table",
  templateUrl: "./transactions-table.component.html",
  styleUrls: ["./transactions-table.component.sass"],
  providers: [DecimalPipe]
})
export class TransactionsTableComponent implements OnInit {
  @Input()
  public rawTransactions: any[];

  filteredTransactions: Observable<any[]>;
  filter = new FormControl("");

  constructor() {}

  ngOnInit() {
    this.filterTransactions();
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
