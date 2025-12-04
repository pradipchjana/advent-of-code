const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const equals = (a, b) => (a === b ? 1 : 0);
const lessThan = (a, b) => (a < b ? 1 : 0);
const jumpIfTrue = (value) => value !== 0;
const jumpIfFalse = (value) => value !== 0;

const operations = {
  1: add,
  2: multiply,
  7: lessThan,
  8: equals,
};

const jumpConditions = {
  5: jumpIfTrue,
  6: jumpIfFalse,
};

const positionMode = (memory, index) => memory[index];
const immediateMode = (_memory, index) => index;

const parameterModeHandlers = {
  0: positionMode,
  1: immediateMode,
};

const value = (mode, memory, index) => {
  const address = parameterModeHandlers[mode](memory, index);
  return memory[address];
};

export const parseInput = (input) => input.split(",").map(Number);

const executeOperation = (opcode, memory, instructionPointer, mode1, mode2, mode3) => {
  const operand1 = value(mode1, memory, instructionPointer + 1);
  const operand2 = value(mode2, memory, instructionPointer + 2);
  const destination = parameterModeHandlers[mode3](memory, instructionPointer + 3);

  memory[destination] = operations[opcode](operand1, operand2);
  return instructionPointer + 4;
};

const executeJump = (opcode, memory, instructionPointer, mode1, mode2) => {
  const conditionValue = value(mode1, memory, instructionPointer + 1);
  const targetAddress = value(mode2, memory, instructionPointer + 2);

  if (jumpConditions[opcode](conditionValue)) return targetAddress;
  return instructionPointer + 3;
};

export const intcode = (input, systemInput) => {
  const memory = parseInput(input);
  let instructionPointer = 0;

  while (memory[instructionPointer] !== 99) {
    const instruction = String(memory[instructionPointer]).padStart(5, "0");
    const opcode = +instruction.slice(3);
    const mode1 = instruction[2];
    const mode2 = instruction[1];
    const mode3 = instruction[0];

    if (opcode in operations) {
      instructionPointer = executeOperation(opcode, memory, instructionPointer, mode1, mode2, mode3);
      continue;
    }

    if (opcode === 3) { 
      const destination = parameterModeHandlers[mode1](memory, instructionPointer + 1);
      memory[destination] = systemInput;
      instructionPointer += 2;
      continue;
    }

    if (opcode === 4) {
      const outputValue = value(mode1, memory, instructionPointer + 1);
      console.log("Output:", outputValue);
      instructionPointer += 2;
      continue;
    }

    if (opcode in jumpConditions) {
      instructionPointer = executeJump(opcode, memory, instructionPointer, mode1, mode2);
      continue;
    }
  }

  return memory;
};

console.log(intcode(
  "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99",
  9
));