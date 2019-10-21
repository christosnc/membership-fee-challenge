import {OrganisationUnit} from "./OrganisationUnit";
import {OrganisationUnitConfig} from "./OrganisationUnitConfig";
import {Area} from "./Area";

export class Branch extends OrganisationUnit {
  parent: Area;

  constructor(name: string, parent: Area, organisation_unit_config?: OrganisationUnitConfig) {
    super(name, organisation_unit_config);
    this.parent = parent;
  }
}