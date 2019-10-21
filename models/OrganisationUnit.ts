import {OrganisationUnitConfig} from "./OrganisationUnitConfig";

export class OrganisationUnit {
  name: string;
  config?: OrganisationUnitConfig;
  parent?: OrganisationUnit;

  constructor(name: string, organisation_unit_config?: OrganisationUnitConfig) {
    this.name = name;
    if(organisation_unit_config) this.config = organisation_unit_config;
  }
}