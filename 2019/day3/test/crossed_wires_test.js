import { assertEquals } from "@std/assert/equals";
import { findCoordinates,executeInstructions, findIntersections, findManhatanDistance } from "../src/crossed_wires.js";

Deno.test("test find Coordinates", () => {
  assertEquals(
    findCoordinates(4, { coordinates: [], x: 0, y: 0 }, { dx: 0, dy: 1 }),
    { coordinates: [[0, 1], [0, 2], [0, 3], [0,4]], x: 0, y: 4}
  );
});

Deno.test("find intersections", () => {
  assertEquals(findIntersections("R8,U5,L5,D3","U7,R6,D4,L4"),[[5,6],[3,3]])
})

Deno.test("find manhattan distance", () => {
  assertEquals(findManhatanDistance("R8,U5,L5,D3","U7,R6,D4,L4"),6)
})

Deno.test("find intersections| long data", () => {
  assertEquals(findManhatanDistance("R75,D30,R83,U83,L12,D49,R71,U7,L72",
"U62,R66,U55,R34,D71,R55,D58,R83"),159)
})

Deno.test("find intersections| long data", () => {
  const input = Deno.readTextFileSync("./data/input.txt").split("\n");
  assertEquals(findManhatanDistance(input[0],input[1]),4981)
})