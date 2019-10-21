"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var VAT = 20;
var MINIMUM_FEE = 120;
var OrganisationUnit = /** @class */ (function () {
    function OrganisationUnit(name, organisation_unit_config) {
        this.name = name;
        if (organisation_unit_config)
            this.config = organisation_unit_config;
    }
    return OrganisationUnit;
}());
var OrganisationUnitConfig = /** @class */ (function () {
    function OrganisationUnitConfig(has_fixed_membership_fee, fixed_membership_fee) {
        this.has_fixed_membership_fee = has_fixed_membership_fee;
        this.fixed_membership_fee = fixed_membership_fee;
    }
    return OrganisationUnitConfig;
}());
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    function Client() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.divisions = [];
        return _this;
    }
    Client.prototype.createDivision = function (name, organisation_unit_config) {
        this.divisions.push(new Division(name, this, organisation_unit_config));
    };
    return Client;
}(OrganisationUnit));
var Division = /** @class */ (function (_super) {
    __extends(Division, _super);
    function Division(name, parent, organisation_unit_config) {
        var _this = _super.call(this, name, organisation_unit_config) || this;
        _this.areas = [];
        _this.parent = parent;
        return _this;
    }
    Division.prototype.createArea = function (name, organisation_unit_config) {
        this.areas.push(new Area(name, this, organisation_unit_config));
    };
    return Division;
}(OrganisationUnit));
var Area = /** @class */ (function (_super) {
    __extends(Area, _super);
    function Area(name, parent, organisation_unit_config) {
        var _this = _super.call(this, name, organisation_unit_config) || this;
        _this.branches = [];
        _this.parent = parent;
        return _this;
    }
    Area.prototype.createBranch = function (name, organisation_unit_config) {
        this.branches.push(new Branch(name, this, organisation_unit_config));
    };
    return Area;
}(OrganisationUnit));
var Branch = /** @class */ (function (_super) {
    __extends(Branch, _super);
    function Branch(name, parent, organisation_unit_config) {
        var _this = _super.call(this, name, organisation_unit_config) || this;
        _this.parent = parent;
        return _this;
    }
    return Branch;
}(OrganisationUnit));
function calculate_membership_fee(rent_amount, rent_period, organisation_unit) {
    //Input checking
    if (rent_amount < 1) {
        throw new Error("Rent amount must be above 1");
    }
    if (rent_period !== "week" && rent_period !== "month") {
        throw new Error("Rent period must be 'week' or 'month'");
    }
    if (rent_period === "week" && (rent_amount < 25 || rent_amount > 2000)) {
        throw new Error("Weekly rent amount must be between 25 and 2000");
    }
    if (rent_period === "month" && (rent_amount < 10 || rent_amount > 8660)) {
        throw new Error("Monthly rent amount must be between 10 and 8660");
    }
    //Check config for fixed membership fee
    var config, index_organisation_unit = organisation_unit;
    while (index_organisation_unit.parent) {
        if (index_organisation_unit.config) {
            config = index_organisation_unit.config;
            break;
        }
        index_organisation_unit = index_organisation_unit.parent;
    }
    if (index_organisation_unit.config) {
        config = index_organisation_unit.config;
    }
    var minFee = MINIMUM_FEE;
    if (config) {
        if (config.has_fixed_membership_fee === true) {
            minFee = config.fixed_membership_fee;
        }
    }
    //Calculate membership fee
    var weeklyRent;
    if (rent_period === "week") {
        weeklyRent = rent_amount;
    }
    else {
        weeklyRent = rent_amount / 4;
    }
    var vat_amount = (weeklyRent * VAT) / 100;
    return Math.round(weeklyRent + vat_amount);
}
function testProgram() {
    var client = new Client("client_a");
    client.createDivision("division_a", new OrganisationUnitConfig(true, 500));
    client.divisions[0].createArea("area_a");
    client.divisions[0].areas[0].createBranch("branch_a");
}
