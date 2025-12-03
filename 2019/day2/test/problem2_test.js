import { assertEquals } from "@std/assert/equals";
import { executeInputs, findNounAndVerb } from "../src/1202_program_alarm.js";


Deno.test("test problem 2 | 1,0,0,3,99", () => {
  assertEquals(executeInputs("1,0,0,3,99",12,2), 1);
});

Deno.test("test problem 2 | long data", () => {
  assertEquals(executeInputs("1,10,10,3,2,3,11,0,99,30,40,50,30",12, 2),
    1600);
});

Deno.test("test problem 2 | long data", () => {
  const input = Deno.readTextFileSync("./data/input.txt")
  assertEquals(executeInputs(input, 12, 2), 3166704);
});
Deno.test("test problem 2 | find noun and verb", () => {
  const input = Deno.readTextFileSync("./data/input.txt")
  assertEquals(findNounAndVerb(19690720,input), 3166704);
});