import { assertEquals } from "@std/assert/equals";
import {
  convertIntoArray,
  findAllPossibility,
  hasAnyDublicateDigit,
  hasSixDigit,
  isIncreasing,
} from "../src/secure_container.js";

Deno.test("test convert into array", () => {
  assertEquals(convertIntoArray(123456), [1, 2, 3, 4, 5, 6]);
});

Deno.test("test has six digit", () => {
  assertEquals(hasSixDigit([1, 2, 3, 4, 5, 6]), true);
});

Deno.test("test any decresasing", () => {
  assertEquals(isIncreasing([1, 2, 3, 4, 3, 6]), false);
  assertEquals(isIncreasing([1, 2, 3, 4, 5, 6]), true);
});

Deno.test("test has any dublicate digit", () => {
  assertEquals(hasAnyDublicateDigit([1, 2, 3, 4, 5, 6]), false);
  assertEquals(hasAnyDublicateDigit([1, 2, 3, 4, 4, 6]), true);
});

Deno.test("test find all posibility", () => {
  assertEquals(findAllPossibility(123257, 647015), 2220);
});
