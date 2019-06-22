import { TestBed } from "@angular/core/testing";

import { JsonImporterService } from "./json-importer.service";

describe("JsonImporterService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: JsonImporterService = TestBed.get(JsonImporterService);
    expect(service).toBeTruthy();
  });
});
