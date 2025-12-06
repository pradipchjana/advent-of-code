import {
  part1,
  part2,
  requiredFuelInDoubleChecker,
  requiredFuel,
} from "../src/01_calculate_fuel_requirement.js";
import { assertEquals } from "@std/assert";

const input = Deno.readTextFileSync("./2019/data/problem1.txt");

Deno.test("test problem 1 Part 1| 12", () => {
  assertEquals(requiredFuel(12), 2);
});

Deno.test("test problem 1 Part 1| 14", () => {
  assertEquals(requiredFuel(14), 2);
});

Deno.test("test problem 1 Part 1| 1969", () => {
  assertEquals(requiredFuel(1969), 654);
});

Deno.test("test problem 1 Part 1|given data", () => {
  assertEquals(part1(input), 3301059);
});

Deno.test("test problem 1 Part 2| 14", () => {
  assertEquals(requiredFuel(14), 2);
});

Deno.test("test problem 1 Part 2| 1969", () => {
  assertEquals(requiredFuelInDoubleChecker(1969), 966);
});

Deno.test("test problem 1 Part 2| 100756", () => {
  assertEquals(requiredFuelInDoubleChecker(100756), 50346);
});

Deno.test("test problem 1 Part 2| 100756", () => {
  assertEquals(part2(input), 50346);
});