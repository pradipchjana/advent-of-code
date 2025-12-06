export const requiredFuel = (mass) => {
  return Math.floor(mass / 3) - 2;
};

export const requiredFuelInDoubleChecker = (mass) => {
  const fuel = requiredFuel(mass);
  if (fuel <= 0) {
    return 0;
  }
  
  return fuel + requiredFuelInDoubleChecker(fuel);
};

export const part2 = (instructions) => {
  return instructions.split("\n").map((instruction) => parseInt(instruction))
    .reduce((result, mass) => result + requiredFuelInDoubleChecker(mass), 0);
};

export const part1 = (instructions) => {
  return instructions.split("\n").map((instruction) => parseInt(instruction))
    .reduce((result, mass) => result + requiredFuel(mass), 0);
};
