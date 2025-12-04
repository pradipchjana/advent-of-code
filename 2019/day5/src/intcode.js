const add = (operand1, operand2) => operand1 + operand2;
const mul = (multiplier, multiplicand) => multiplicand * multiplier;
const jumpIfTrue = (value) => value !== 0;
const jumpIfFalse = (value) => value === 0;

const operations = {
  1: add,
  2: mul,
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

export const intcode = (input) => {
  let index = 0;
  const instructions = parseInput(input);

  while (index < instructions.length && instructions[index] !== 99) {
    const padInstruction = String(instructions[index]).padStart(5, "0");
    const opcode = +padInstruction.slice(-2);
    const modeOfOperand1 = padInstruction[2];
    const modeOfOperand2 = padInstruction[1];
    const modeOfAnswerIndex = padInstruction[0];

    if (opcode in operations) {
      const operand1 = valueOfOperand(modeOfOperand1, instructions, index + 1);
      const operand2 = valueOfOperand(modeOfOperand2, instructions, index + 2);
      const operation = operations[opcode];
      const answerIndex = parameterMode[modeOfAnswerIndex](
        instructions,
        index + 3,
      );
      instructions[answerIndex] = operation(operand1, operand2);
      index = index + 3;
    }

    if (opcode === 3) {
      const answerIndex = parameterMode[modeOfAnswerIndex](
        instructions,
        index + 1,
      );
      instructions[answerIndex] = 1;
      index = index + 1;
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

const input = Deno.readTextFileSync("./data.txt");
intcode(input);
