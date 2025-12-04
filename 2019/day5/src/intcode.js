const add = (a, b) => a + b;
const mul = (a, b) => a * b;
const eq = (a, b) => (a === b ? 1 : 0);
const lt = (a, b) => (a < b ? 1 : 0);


const operations = {
  1: add,
  2: mul,
  7: lt,
  8: eq,
};

const jumps = {
  5: (v) => v !== 0,
  6: (v) => v === 0,
};

const positionMode = (instructions, index) => instructions[index];
const immediateMode = (_instructions, index) => index;

const parameterMode = {
  0: positionMode,
  1: immediateMode,
};

const valueOfOperand = (mode, instructions, index) => {
  const addr = parameterMode[mode](instructions, index);
  return instructions[addr];
};

export const parseInput = (input) =>
  input.split(",").map(Number);

const doOperation = (opcode, instructions, index, m1, m2, m3) => {
  const op1 = valueOfOperand(m1, instructions, index + 1);
  const op2 = valueOfOperand(m2, instructions, index + 2);
  const dest = parameterMode[m3](instructions, index + 3);

  instructions[dest] = operations[opcode](op1, op2);
  return index + 4;
};

const doJump = (opcode, instructions, index, m1, m2) => {
  const a = valueOfOperand(m1, instructions, index + 1);
  const b = valueOfOperand(m2, instructions, index + 2);

  if (jumps[opcode](a)) return b;
  return index + 3;
};

export const intcode = (input, id) => {
  const instructions = parseInput(input);
  let index = 0;

  while (instructions[index] !== 99) {
    const instr = String(instructions[index]).padStart(5, "0");
    const opcode = +instr.slice(3);
    const m1 = instr[2];
    const m2 = instr[1];
    const m3 = instr[0];

    if (opcode in operations) {
      index = doOperation(opcode, instructions, index, m1, m2, m3);
      continue;
    }

    if (opcode === 3) {
      const dest = parameterMode[m1](instructions, index + 1);
      instructions[dest] = id;
      index += 2;
      continue;
    }

    if (opcode === 4) {
      const value = valueOfOperand(m1, instructions, index + 1);
      console.log("Output:", value);
      index += 2;
      continue;
    }

    if (opcode in jumps) {
      index = doJump(opcode, instructions, index, m1, m2);
      continue;
    }
  }

  return instructions;
};

console.log(intcode("3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99",
  9
));
