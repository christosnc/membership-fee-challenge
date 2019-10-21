export class OrganisationUnitConfig {
  has_fixed_membership_fee: boolean;
  fixed_membership_fee: number;

  constructor(has_fixed_membership_fee: boolean, fixed_membership_fee: number) {
    this.has_fixed_membership_fee = has_fixed_membership_fee;
    this.fixed_membership_fee = fixed_membership_fee;
  }
}