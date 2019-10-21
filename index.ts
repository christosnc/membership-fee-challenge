const VAT = 20;
const MINIMUM_FEE = 120;

class OrganisationUnit{
  name: string;
  config: OrganisationUnitConfig;
  parent: OrganisationUnit;

  constructor(name: string, organisation_unit_config?: OrganisationUnitConfig) {
    this.name = name;
    if(organisation_unit_config) this.config = organisation_unit_config;
  }
}

class OrganisationUnitConfig{
  has_fixed_membership_fee: boolean;
  fixed_membership_fee: number;
  
  constructor(has_fixed_membership_fee: boolean, fixed_membership_fee: number){
    this.has_fixed_membership_fee = has_fixed_membership_fee;
    this.fixed_membership_fee = fixed_membership_fee;
  }
}

class Client extends OrganisationUnit{
  divisions: Array<Division>;

  createDivision(name: string, organisation_unit_config?: OrganisationUnitConfig){
    this.divisions.push(new Division(name, this, organisation_unit_config));
  }
}

class Division extends OrganisationUnit {
  parent: Client;
  areas: Array<Area>;

  constructor(name: string, parent: Client, organisation_unit_config?: OrganisationUnitConfig) {
    super(name, organisation_unit_config);
    this.parent = parent;
  }
  createArea(name: string, organisation_unit_config?: OrganisationUnitConfig) {
    this.areas.push(new Area(name, this, organisation_unit_config));
  }
}

class Area extends OrganisationUnit {
  parent: Division;
  branches: Array<Branch>;

  constructor(name: string, parent: Division, organisation_unit_config?: OrganisationUnitConfig) {
    super(name, organisation_unit_config);
    this.parent = parent;
  }
  createBranch(name: string, organisation_unit_config?: OrganisationUnitConfig) {
    this.branches.push(new Branch(name, this, organisation_unit_config));
  }
}

class Branch extends OrganisationUnit {
  parent: Area;

  constructor(name: string, parent: Area, organisation_unit_config?: OrganisationUnitConfig) {
    super(name, organisation_unit_config);
    this.parent = parent;
  }
}

function calculate_membership_fee(rent_amount: number, rent_period: string, organisation_unit: OrganisationUnit): number{
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
  

  return 5;
}

function testProgram(){
  let client = new Client("client_a");
  client.createDivision("division_a", new OrganisationUnitConfig(true, 500));
  client.divisions[0].createArea("area_a");
  client.divisions[0].areas[0].createBranch("branch_a");


}