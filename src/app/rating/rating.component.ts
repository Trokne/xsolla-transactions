import { Component, OnInit, Input } from "@angular/core";
import * as CanvasJS from "additional_modules/canvasjs-2.3.1/canvasjs.min";

@Component({
  selector: "app-rating",
  templateUrl: "./rating.component.html",
  styleUrls: ["./rating.component.sass"]
})
export class RatingComponent implements OnInit {
  @Input()
  public rawTransactions: any[];
  paymentSystems: any[];

  constructor() {}

  ngOnInit() {
    this.parsePaymentSystemRating();
    this.drawChart();
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
}
