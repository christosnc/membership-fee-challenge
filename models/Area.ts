import {OrganisationUnit} from "./OrganisationUnit";
import {OrganisationUnitConfig} from "./OrganisationUnitConfig";
import {Division} from "./Division";
import {Branch} from "./Branch";

export class Area extends OrganisationUnit {
  parent: Division;
  branches: Array<Branch> = [];

  constructor(name: string, parent: Division, organisation_unit_config?: OrganisationUnitConfig) {
    super(name, organisation_unit_config);
    this.parent = parent;
  }
  createBranch(name: string, organisation_unit_config?: OrganisationUnitConfig) {
    this.branches.push(new Branch(name, this, organisation_unit_config));
  }
}