import { findIntersections } from "../day3/src/crossed_wires.js";
import { intersect } from "@std/collections";

const parseOrbitsData = input => {
  return input.split("\n").map(ele => ele.split(")")).reduce((object, orbitData) => {
    object[orbitData[1]] = orbitData[0];
    return object;
  }, {})
}



const findOrbit = (orbitData,planet,totalOrbit) => {
  if (orbitData[planet] === undefined) {
    return totalOrbit;
  }
  const nextPlanet = orbitData[planet];
  return findOrbit(orbitData, nextPlanet, totalOrbit + 1);
}

const countTotalOrbit = (input) => {
  const orbitData = parseOrbitsData(input);
  return Object.keys(orbitData).reduce((totalCount, planet) => {
    const orbit = findOrbit(orbitData, planet, 0);
    return totalCount + orbit;
  }, 0);
}

const allOrbitsOfAPlanet = (orbitData, planet, allOrbits) => {
    if (orbitData[planet] === undefined) {
    return allOrbits;
    }
   
  const nextPlanet = orbitData[planet];
  allOrbits.push(nextPlanet);
  return allOrbitsOfAPlanet(orbitData, nextPlanet, allOrbits);
}

const findReqOrbitTransfer = (orbitData, planet1, planet2) => {

  const planet1Orbits = allOrbitsOfAPlanet(orbitData, planet1, []);
  const planet2Orbits = allOrbitsOfAPlanet(orbitData, planet2, []);
  const nextCommonPlanet = intersect(planet1Orbits, planet2Orbits)[0];
  
  return planet1Orbits.indexOf(nextCommonPlanet) + planet2Orbits.indexOf(nextCommonPlanet); 
}
const main = () => {
  const input = Deno.readTextFileSync("./data.txt")
const orbitData = parseOrbitsData(input)
  console.log(findReqOrbitTransfer(orbitData, "YOU", "SAN"));
}
main();
