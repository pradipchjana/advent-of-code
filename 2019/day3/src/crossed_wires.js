const dbg = (value) => console.log(value) && value;

const offsets = {
  "R": { dx: 0, dy: 1 },
  "L": { dx: 0, dy: -1 },
  "U": { dx: 1, dy: 0 },
  "D": { dx: -1,dy: 0 },
};

export const findCoordinates = (length, coordinateInfo, { dx, dy }) => {
  let x = coordinateInfo.x;
  let y = coordinateInfo.y;
  
  for (let index = 0; index < length; index++) {
    y = y + dy;
    x = x + dx;
 
    coordinateInfo.coordinates.push([x, y]);
  }

  coordinateInfo.x = x;
  coordinateInfo.y = y;

  return coordinateInfo;
};

const executeInstruction = (coordinateInfo, instruction) => {
  const offset = offsets[instruction[0]];
  const length = parseInt(instruction.slice(1));
  
  return findCoordinates(length, coordinateInfo, offset);
};

export const executeInstructions = (instructions) => {
  const allPoints = instructions.split(",").reduce(executeInstruction, {
    coordinates: [],
     x: 0, y: 0 ,
  });
  return allPoints.coordinates;
};

function areEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  for (let index = 0; index < array1.length; index++) {
    if (array1[index] !== array2[index]) {
      return false;
    }
  }
  return true;
}

export const findIntersections = (wire1, wire2) => {
  const wire1Points = executeInstructions(wire1);
  const wire2Points = executeInstructions(wire2);
  
  const intersectPoints = wire1Points.filter(point => wire2Points.some(ele => areEqual(ele,point)));
  return intersectPoints;
}

export const findManhatanDistance = (wire1, wire2) => {
  const instructionPoints = findIntersections(wire1, wire2);
  const distanceOfIntersection = instructionPoints.map(point => Math.abs(point[0]) + Math.abs(point[1]));
  return distanceOfIntersection.sort((a,b)=>a - b).at(0);
}

