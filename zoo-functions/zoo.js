/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]

*/

const data = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((oneSpecies) => ids.includes(oneSpecies.id));
}

function getAnimalsOlderThan(animal, age) {
  const { residents } = data.species.find((oneSpecies) => oneSpecies.name === animal);
  const areOlderThan = residents.every((resident) => resident.age >= age);
  return areOlderThan;
}

function getEmployeeByName(employeeName) {
  const employeeObject = data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  return { ...employeeObject };
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  data.employees.push(newEmployee);
  return newEmployee;
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(species) {
  const counts = {};
  data.species.forEach((oneSpecies) => {
    counts[oneSpecies.name] = oneSpecies.residents.length;
  });
  if (species) {
    return counts[species];
  }
  return counts;
}

function calculateEntry(entrants = {}) {
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return Adult * data.prices.Adult + Child * data.prices.Child + Senior * data.prices.Senior;
}

function getNamesList(residents, sorted, sex) {
  const namesList = residents.reduce((accumulator, current) => {
    if (sex && current.sex !== sex) {
      return accumulator;
    }
    return accumulator.concat(current.name);
  }, []);
  if (sorted) {
    namesList.sort();
  }
  return namesList;
}

function getAnimalMap(options = {}) {
  const { includeNames, sorted, sex } = options;
  const animalMap = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  data.species.forEach((species) => {
    const { name, location, residents } = species;
    if (!includeNames) {
      animalMap[location].push(name);
    } else {
      const namesList = getNamesList(residents, sorted, sex);
      animalMap[location].push({
        [name]: namesList,
      });
    }
  });

  return animalMap;
}

function getSchedule(dayName) {
  const dayEntries = Object.entries(data.hours);

  return dayEntries.reduce((accumulator, current) => {
    const [dayOfWeek, { open, close }] = current;
    if (dayName && dayOfWeek !== dayName) {
      return accumulator;
    }

    let text;
    if (open === 0 && close === 0) {
      text = 'CLOSED';
    } else {
      text = `Open from ${open}am until ${close - 12}pm`;
    }

    return Object.assign(accumulator, {
      [dayOfWeek]: text,
    });
  }, {});
}

function getOldestFromFirstSpecies(id) {
  const firstSpeciesId = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const oldest = data.species.find((oneSpecies) => oneSpecies.id === firstSpeciesId).residents.sort((a, b) => b.age - a.age)[0];
  const { name, sex, age } = oldest;
  return [name, sex, age];
}

function increasePrices(percentage) {
  const priceRanges = Object.keys(data.prices);
  priceRanges.forEach((range) => {
    const newPrice = data.prices[range] * ((100 + percentage) / 100);
    data.prices[range] = Math.round(newPrice * 100) / 100;
  });
}

function getEmployeeCoverage(idOrName) {
  return data.employees.reduce((accumulator, current) => {
    const { id, firstName, lastName, responsibleFor } = current;
    const idOrNames = [id, firstName, lastName];
    if (idOrName && !idOrNames.includes(idOrName)) {
      return accumulator;
    }
    const speciesNames = responsibleFor.map((speciesId) => data.species.find((oneSpecies) => oneSpecies.id === speciesId).name);
    return Object.assign(accumulator, {
      [`${firstName} ${lastName}`]: speciesNames,
    });
  }, {});
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
