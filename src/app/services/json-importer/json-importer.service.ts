import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class JsonImporterService {
  private defaultFilePath: string;

  constructor(private http: HttpClient) {
    this.defaultFilePath = "/assets/data/data.json";
  }

  public getJSON(): Observable<any> {
    return this.http.get(this.defaultFilePath);
  }
}
