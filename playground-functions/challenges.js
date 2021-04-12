// Desafio 1
function compareTrue(bool1, bool2) {
  return bool1 && bool2;
}

// Desafio 2
function calcArea(base, height) {
  return (base * height) / 2;
}

// Desafio 3
function splitSentence(string) {
  return string.split(' ');
}

// Desafio 4
function concatName(strArray) {
  return [strArray[strArray.length - 1], strArray[0]].join(', ');
}

// Desafio 5
function footballPoints(wins, ties) {
  return (wins * 3) + ties;
}

// Desafio 6
function highestCount(numbers) {
  let highest = numbers[0];
  let count = 0;
  for (let num of numbers) {
    if (num > highest) {
      highest = num;
      count = 1;
    } else if (num === highest) {
      count += 1;
    }
  }
  return count;
}

// Desafio 7
function catAndMouse(mousePosition, cat1Position, cat2Position) {
  const dist1 = Math.abs(mousePosition - cat1Position);
  const dist2 = Math.abs(mousePosition - cat2Position);
  if (dist1 > dist2) {
    return 'cat2';
  } if (dist1 < dist2) {
    return 'cat1';
  }
  return 'os gatos trombam e o rato foge';
}

// Desafio 8
function fizzBuzz(numbers) {
  return numbers.map((n) => {
    const isDivisibleBy3 = (n % 3) === 0;
    const isDivisibleBy5 = (n % 5) === 0;
    if (isDivisibleBy3 && isDivisibleBy5) {
      return 'fizzBuzz';
    }
    if (isDivisibleBy3) {
      return 'fizz';
    }
    if (isDivisibleBy5) {
      return 'buzz';
    }
    return 'bug!';
  });
}

// Desafio 9
const codeTable = {
  a: '1',
  e: '2',
  i: '3',
  o: '4',
  u: '5',
};

function encode(str) {
  return str.split('').map((char) => (
    codeTable[char] ? codeTable[char] : char
  )).join('');
}

function decode(str) {
  return str.split('').map((char) => {
    const index = Object.values(codeTable).findIndex((value) => value === char);
    return index >= 0 ? Object.keys(codeTable)[index] : char;
  }).join('');
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};
