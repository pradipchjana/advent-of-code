export const convertIntoArray = (password) => {
  const answer = [];
while (password > 0) {
  const unitPlace = password % 10;
  password = (password - unitPlace) / 10;
  answer.unshift(unitPlace);
}
  return answer;
} 

export const hasSixDigit = (password) => password.length === 6;

export const isAnyDecreasing = password => {
  for (let index = 0; index < password.length - 1; index++) {
      if (password[index] > password[index + 1]) {
        return false;
      }
  }
  return true;
}

export const hasAnyDublicateDigit = (password) => {
  const countDuplicate = { };
  for (let index = 0; index < password.length; index++) {
    countDuplicate[password[index]] = (countDuplicate[password[index]] || 0) + 1;
  }
  return Object.values(countDuplicate).some(number => number ===2);
}

const isValid =(password) => hasSixDigit(password) && isAnyDecreasing(password) && hasAnyDublicateDigit(password)

export const findAllPossibility = (start, end) => {
  let count = 0;
  for (let index = start; index < end; index++) {
    const password = convertIntoArray(index);
    if (isValid(password)) {
      count++;
    }
  }
  return count;
}
