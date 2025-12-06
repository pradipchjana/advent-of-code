import { assertEquals } from "@std/assert/equals";
import { permutations } from "@std/collections/permutations";
import { executeInputs } from "../day2/src/1202_program_alarm.js";

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

export const intcode = (machine, systemInput) => {
  let { memory, pointer, halted } = machine;
  let inputIndex = 0;
  let output = 0;

  while (!halted) {
    const instruction = String(memory[pointer]).padStart(5, "0");
    const opcode = +instruction.slice(3);
    const mode1 = instruction[2];
    const mode2 = instruction[1];
    const mode3 = instruction[0];

    if (opcode === 99) {
      machine.halted = true;
      return { output: null, halted: true };
    }

    if (opcode in operations) {
      pointer = executeOperation(opcode, memory, pointer, mode1, mode2, mode3);
      continue;
    }

    if (opcode === 3) { 
      if (systemInput.length === 0) break;
      const destination = parameterModeHandlers[mode1](memory, pointer + 1);
      memory[destination] = systemInput.shift();
      pointer += 2;
      continue;
    }

    if (opcode === 4) {
      const outputValue = value(mode1, memory, pointer + 1);
      pointer += 2;
      machine.pointer = pointer;
      return { output: outputValue, halted: false };
    }

    if (opcode in jumpConditions) {
      pointer = executeJump(opcode, memory, pointer, mode1, mode2);
      continue;
    }
  }
  machine.pointer = pointer;
  return {output:null,halted:machine.halted};
};

// const part1 = (input ,range) => {
//   const allPosibility = permutations(range);
//  const allSignals =  allPosibility.map(trusters => trusters.reduce((inputSecond, phase) => {
//    inputSecond = intcode(input, [phase, inputSecond]);    
//     return inputSecond;
//  },0))
//   return allSignals.sort((a, b) =>b-a).at(0);
// }

const createMachine = (input) =>
({
    memory: parseInput(input),
    pointer: 0,
    halted: false,
  })

const main = (input, range) => {
  const perms = permutations(range);
  let maxSignal = 0;
  for (const phases of perms) {
    const amps = [0, 1, 2, 3, 4].map(() => createMachine(input));
    phases.forEach((phase, i) => intcode(amps[i], [phase]));
    let signal = 0;
    let halted = false;
    while (!halted) {
      for (let i = 0; i < 5; i++) {
        const res = intcode(amps[i], [signal]);
        if (res.output !== null) {
          signal = res.output;
        }
        if (amps[4].halted) {
          halted = true;
        }
      }
    }
    maxSignal = Math.max(maxSignal, signal);
  }
  return maxSignal;
}

const input = Deno.readTextFileSync("./data.txt");
console.log(main(input, [5,6,7,8,9]));