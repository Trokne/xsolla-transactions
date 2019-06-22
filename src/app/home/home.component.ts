import { JsonImporterService } from "./../services/json-importer/json-importer.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.sass"]
})
export class HomeComponent implements OnInit {
  constructor(private jsonImporterService: JsonImporterService) {}

  ngOnInit() {
    this.jsonImporterService.getJSON().subscribe(data => {
      console.log(data);
    });
  }
}
