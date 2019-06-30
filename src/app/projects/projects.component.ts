import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.sass"]
})
export class ProjectsComponent implements OnInit {
  @Input()
  public rawTransactions: any[];
  public projects: string[];

  constructor() {}

  ngOnInit() {
    this.parseProjects();
  }

  private parseProjects() {
    this.projects = Array.from(
      new Set(this.rawTransactions.map(x => x.transaction.project.name))
    );
  }
}
