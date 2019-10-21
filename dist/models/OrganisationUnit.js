"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrganisationUnit = /** @class */ (function () {
    function OrganisationUnit(name, organisation_unit_config) {
        this.name = name;
        if (organisation_unit_config)
            this.config = organisation_unit_config;
    }
    return OrganisationUnit;
}());
exports.OrganisationUnit = OrganisationUnit;
