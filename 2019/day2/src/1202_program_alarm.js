const add = (operand1, operand2) => operand1 + operand2;
const mul = (multiplier, multiplicand) => multiplicand * multiplier;

const actions = {
  1: add, 2: mul
};

export const executeOppcode = (instructions) => { 
    let index = 0;
    while (index < instructions.length && instructions[index] !== 99) {
      if (instructions[index] in actions) {   
        const operand1Index = instructions[index + 1];
        const operand2Index = instructions[index + 2]
        const operand1 = instructions[operand1Index];
        const operand2 = instructions[operand2Index];
        const operation = actions[instructions[index]]
        const answerIndex = instructions[index + 3];
        instructions[answerIndex] = operation(operand1, operand2);
        index = index + 3;
      }      
      index = index + 1;
    }
  return instructions;
}

export const parseInput = (input) => {
  return input.split(",").map(ele => parseInt(ele));
}

export const executeInputs = (input, noun, verb) => {
  
  const instructions = parseInput(input);
  instructions[1] = noun;
  instructions[2] = verb;
  return executeOppcode(instructions)[0];
}

export const findNounAndVerb = (answer, input) => {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const result = executeInputs(input, noun, verb);
      if (answer === result) {
        return 100 * noun + verb
      }
    }    
  }
}
