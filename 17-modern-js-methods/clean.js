'use strict';
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
const getLimit = (limits, user) => limits?.[user] ?? 0;

// Pure Function
const addExpense = function (state, limit, value, description, user = 'Jonas') {
  const cleanUser = user.toLowerCase();

  // const limit = spendingLimits([user]) ? spendingLimits[user] : 0
  return value <= getLimit(limit, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;

  //   budget.push({ value: -value, description, user: cleanUser });
  // }
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');

const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 2000, 'Stuff', 'Jay');

const checkExpenses = (state, limits) => {
  // const limit = spendingLimits?.[entry.user] ?? 0;
  return state.map(entry => {
    return entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry;
  });
  // for (const entry of newBudget3)
  // if (entry.value < -getLimit(entry.user)) {
  //   entry.flag = 'limit';
  // }
};
const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// Impure Function--Since it creates a side effect ie "console.log"
const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  // state.filter(entry => entry.value <= -bigLimit).reduce((str, cur) => `${str} ${cur.description.slice(-2)}`, '');
  console.log(bigExpenses);

  // let output = '';
  // for (let entry of budget)
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : ''; // Emojis are 2 chars
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};
logBigExpenses(finalBudget, 1000);
