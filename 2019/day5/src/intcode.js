const add = (operand1, operand2) => operand1 + operand2;
const mul = (multiplier, multiplicand) => multiplicand * multiplier;
const jumpIfTrue = (value) => value !== 0;
const jumpIfFalse = (value) => value === 0;
const equalTo = (value1, value2) => value1 === value2 ? 1: 0;
const lessThan = (value1, value2) => value1 < value2 ? 1: 0;

const operations = {
  1: add,
  2: mul,
    7: lessThan,
  8:equalTo
};

const jumps = {
  5: jumpIfTrue,
  6: jumpIfFalse,
};


const positionMode = (instructions, index) => instructions[index];

const valueImmediateMode = (_instructions, index) => index;

const parameterMode = {
  0: positionMode,
  1: valueImmediateMode,
};

const valueOfOperand = (mode, instruction, index) => {
  const reqIndex = parameterMode[mode](instruction, index);
  return instruction[reqIndex];
};

export const parseInput = (input) => {
  return input.split(",").map(Number);
};

const doOperation = (
  opcode,
  modeOfAnswerIndex,
  instructions,
  index,
  modeOfOperand1,
  modeOfOperand2,
) => {
  const operand1 = valueOfOperand(modeOfOperand1, instructions, index + 1);
  const operand2 = valueOfOperand(modeOfOperand2, instructions, index + 2);
  const operation = operations[opcode];
  
  const answerIndex = parameterMode[modeOfAnswerIndex](
    instructions,
    index + 3,
  );
  instructions[answerIndex] = operation(operand1, operand2);
};

const jumpLocation = (opcode, instructions, index,mode) => { 
  const isTrue = jumps[opcode](instructions[index + 1]);
  const jumpIndex = parameterMode[mode](instructions, index + 2);
  return isTrue ? jumpIndex : index + 3 ;
}

export const intcode = (input, id) => {
  let index = 0;
  const instructions = parseInput(input);

  while (index < instructions.length && instructions[index] !== 99) {
    const padInstruction = String(instructions[index]).padStart(5, "0");
    const opcode = +padInstruction.slice(-2);
    const modeOfOperand1 = padInstruction[2];
    const modeOfOperand2 = padInstruction[1];
    const modeOfAnswerIndex = padInstruction[0];

    if (opcode in operations) {
      doOperation(
        opcode,
        modeOfAnswerIndex,
        instructions,
        index,
        modeOfOperand1,
        modeOfOperand2,
      );
      
      index = index + 3;
    }

    if (opcode === 3) {
      const answerIndex = parameterMode[modeOfAnswerIndex](
        instructions,
        index + 1,
      );
      instructions[answerIndex] = id;
      index = index + 1;
    }

    if (opcode in jumps) {
      index = jumpLocation(opcode, instructions, index, modeOfOperand1) - 1;
      console.log(index);
      
    }

    if (opcode === 4) {
      const answerIndex = valueOfOperand(
        modeOfOperand2,
        instructions,
        index + 1,
      );

      console.log("Answer", answerIndex);
      index = index + 1;
    }
    index = index + 1;
  }
  return instructions;
};


console.log(intcode("3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99",8));
