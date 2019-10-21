import {calculate_membership_fee} from "../src/calculate_membership_fee";
import * as models from "../models";

let client = new models.Client("client_a");
client.createDivision("division_a", new models.OrganisationUnitConfig(true, 500));
client.divisions[0].createArea("area_a");
client.divisions[0].areas[0].createBranch("branch_a");
let branch = client.divisions[0].areas[0].branches[0];

let client2 = new models.Client("client_b");
client2.createDivision("division_a");
client2.divisions[0].createArea("area_a");
client2.divisions[0].areas[0].createBranch("branch_a");
let branch2 = client2.divisions[0].areas[0].branches[0];

test('Should calculate membership fee from weekly input', () => {
  expect(calculate_membership_fee(1000, "week", branch2)).toBe(1200);
});

test('Should calculate membership fee from monthly input', () => {
  expect(calculate_membership_fee(4000, "month", branch2)).toBe(1200);
});

test('Should get fixed fee from parent', () => {
  expect(calculate_membership_fee(30, "week", branch)).toBe(600);
});

test('Should throw error for minimum weekly limit', () => {
  expect(() => {calculate_membership_fee(24, "week", branch)}).toThrow();
});

test('Should throw error for maximum weekly limit', () => {
  expect(() => {calculate_membership_fee(2001, "week", branch)}).toThrow();
});

test('Should throw error for minimum monthly limit', () => {
  expect(() => {calculate_membership_fee(109, "month", branch)}).toThrow();
});

test('Should throw error for maximum monthly limit', () => {
  expect(() => {calculate_membership_fee(8661, "month", branch)}).toThrow();
});