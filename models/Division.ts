import {OrganisationUnit} from "./OrganisationUnit";
import {OrganisationUnitConfig} from "./OrganisationUnitConfig";
import {Client} from "./Client";
import {Area} from "./Area";

export class Division extends OrganisationUnit {
  parent: Client;
  areas: Array<Area> = [];

  constructor(name: string, parent: Client, organisation_unit_config?: OrganisationUnitConfig) {
    super(name, organisation_unit_config);
    this.parent = parent;
  }
  createArea(name: string, organisation_unit_config?: OrganisationUnitConfig) {
    this.areas.push(new Area(name, this, organisation_unit_config));
  }
}