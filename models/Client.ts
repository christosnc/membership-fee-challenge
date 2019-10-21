import {OrganisationUnit} from "./OrganisationUnit";
import {OrganisationUnitConfig} from "./OrganisationUnitConfig";
import {Division} from "./Division";

export class Client extends OrganisationUnit {
  divisions: Array<Division> = [];

  createDivision(name: string, organisation_unit_config?: OrganisationUnitConfig) {
    this.divisions.push(new Division(name, this, organisation_unit_config));
  }
}