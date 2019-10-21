import * as models from "../models";

const VAT = 20;
const MINIMUM_FEE = 120;

function calculate_membership_fee(rent_amount: number, rent_period: string, organisation_unit: models.OrganisationUnit): number{
  //Input checking
  if(rent_amount < 1){
    throw new Error("Rent amount must be above 1");
  }
  if(rent_period !== "week" && rent_period !== "month"){
    throw new Error("Rent period must be 'week' or 'month'");
  }
  if(rent_period === "week" && (rent_amount < 25 || rent_amount > 2000)){
    throw new Error("Weekly rent amount must be between 25 and 2000");
  }
  if(rent_period === "month" && (rent_amount < 10 || rent_amount > 8660)) {
    throw new Error("Monthly rent amount must be between 10 and 8660");
  }

  //Check config for fixed membership fee
  let config, index_organisation_unit = organisation_unit;
  while(index_organisation_unit.parent) {
    if(index_organisation_unit.config) {
      config = index_organisation_unit.config;
      break;
    }
    
    index_organisation_unit = index_organisation_unit.parent;
  }
  if(index_organisation_unit.config){
    config = index_organisation_unit.config;
  }

  let minFee = MINIMUM_FEE;
  if(config){
    if(config.has_fixed_membership_fee === true){
      minFee = config.fixed_membership_fee;
    }
  }

  //Calculate membership fee
  let weeklyRent;
  if(rent_period === "week"){
    weeklyRent = rent_amount;
  }
  else{
    weeklyRent = rent_amount / 4;
  }

  let vat_amount = (weeklyRent * VAT) / 100;

  return Math.round(weeklyRent + vat_amount);
}

function testProgram(){
  let client = new models.Client("client_a");
  client.createDivision("division_a", new models.OrganisationUnitConfig(true, 500));
  client.divisions[0].createArea("area_a");
  client.divisions[0].areas[0].createBranch("branch_a");

  let fee = calculate_membership_fee(1000, "week", client.divisions[0].areas[0].branches[0]);
  console.log(fee);
}

testProgram();