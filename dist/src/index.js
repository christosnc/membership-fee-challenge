"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var models = __importStar(require("../models"));
var VAT = 20;
var MINIMUM_FEE = 120;
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
    var client = new models.Client("client_a");
    client.createDivision("division_a", new models.OrganisationUnitConfig(true, 500));
    client.divisions[0].createArea("area_a");
    client.divisions[0].areas[0].createBranch("branch_a");
    var fee = calculate_membership_fee(1000, "week", client.divisions[0].areas[0].branches[0]);
    console.log(fee);
}
testProgram();
