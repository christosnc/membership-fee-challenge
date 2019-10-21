"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VAT = 20;
var MINIMUM_FEE = 120;
/**
 * This function calculates the membership fee for a tenant.
 *
 * @param rent_amount The rent amount for the specified period.
 * @param rent_period The renting period. "week" | "month"
 * @param organisation_unit The oranisation unit (branch, area, district, client)
 */
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
    if (config) {
        if (config.has_fixed_membership_fee === true) {
            var fixedFee = config.fixed_membership_fee;
            var vat_amount_1 = (fixedFee * VAT) / 100;
            return Math.round(fixedFee + vat_amount_1);
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
    if (weeklyRent < MINIMUM_FEE) {
        weeklyRent = MINIMUM_FEE;
    }
    var vat_amount = (weeklyRent * VAT) / 100;
    return Math.round(weeklyRent + vat_amount);
}
exports.calculate_membership_fee = calculate_membership_fee;
