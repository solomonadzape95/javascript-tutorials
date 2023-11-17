'use strict';

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnabry',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sanxho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnabry', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// // Task 1: Arrays for each team's players
// const [players1, players2] = game.players;

// console.log(players1, players2);

// // Task 2: Variable 'gk' for Bayern Munich's goalkeeper and an array 'fieldPlayers' for the rest of the players
// const [gk, ...fieldPlayers] = game.players[0];
// console.log(gk, fieldPlayers);

// // Task 3: An array 'allPlayers' containing all the players of both teams
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// // Task 4: Create an array 'playersFinal' containing all team 1's players including 'Thiago', 'Coutinho', and 'Perisic'
// const playersFinal = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(playersFinal);

// // Task 5: From the game.odds object, create three variables: 'team1', 'draw',and 'team2' for each odd
// const { team1, x: draw, team2 } = game.odds;
// console.log(team1, team2, draw);

// // Task 6: A function 'printGoals' that prints goalscorers and the number of goals scored from an array with an arbitrary number of goalscorers.
// const printGoals = function (...goalscorers) {
//   let goals = 0;
//   goalscorers.forEach(scorer => {
//     console.log(scorer);
//     goals += 1;
//   });
//   console.log(goals);
// };
// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// printGoals(...game.scored);

// // Task 7: Print the team with the greater chance of winning without using IF/ELSE statements or the ternary operator
// team1 < team2 && console.log(game.team1);
// team1 > team2 && console.log(game.team2);

// // Coding Challenge #2
// // Task 1: Loop over game.scored and print the player name with the goal number. Eg{Goal 1 : Lewandowski}...
// let index = 1;
// // NB: Use Object.entries when you need the index of the entry too. And use .entries() method for arrays and Object.entries() for objects

// for (const scorer of game.scored) {
//   console.log(`Goal ${index}: ${scorer}`);
//   index++;
// }

// // Task 2: Use a loop to caculate the average odd and log it to the console.
// let average = 0;
// for (const odd of Object.values(game.odds)) {
//   average += odd / 3;
// }
// console.log(average);

// // Task 3: Print the 3 odds to the console in a nice formatted way
// let entry = Object.entries(game.odds);

// for (const [category, odd] of entry) {
//   let team = category == 'x' ? 'draw' : `victory ${game[category]}`;
//   console.log(`Odd of ${team}: ${odd}`);
// }

// // Task 3: Create an object that contains the nm=ames of all the goalscorers and the number of goals scored ny each

// let scorerObj = {};
// for (const scorer of game.scored) {
//   scorerObj[scorer] = scorerObj[scorer] + 1 || 1;
// }
// console.log(scorerObj);

// // Sets
// const ordersSet = new Set([
//   'Pasta',
//   'Pizza',
//   'Pizza',
//   'Risotto',
//   'Pizza',
//   'Pasta',
// ]);
// console.log(ordersSet);

// console.log(new Set('Jonas'));
// console.log(ordersSet.size);
// console.log(ordersSet.has('Pizza'));
// console.log(ordersSet.has('Bread'));
// ordersSet.add('Garlic Bread');
// ordersSet.add('Garlic Bread');
// ordersSet.delete('Risotto');
// // ordersSet.clear()
// console.log(ordersSet);
// // Looping over sets

// for (const order of ordersSet) console.log(order);
// // Use Case Example
// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// const staffUnique = [...new Set(staff)];
// console.log(staffUnique);

// console.log(new Set(staff).size);
// console.log(new Set('solomonadzape').size);

// Maps
// const rest = new Map();
// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Firenze, Italy');
// console.log(rest.set(2, 'Lisbon, Portugal'));
// rest
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian'])
//   .set('open', 11)
//   .set('close', 23)
//   .set(true, 'We are open')
//   .set(false, 'We are Closed');

// console.log(rest.get('name'));

// const time = 1;
// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// console.log(rest.has('categories'));
// rest.delete(2);
// console.log(rest.size);
// rest.clear()
//  Filling Mapps without using .set()
// const question = new Map([
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct'],
//   [false, 'Try Again!'],
// ]);
// // converting object to map
// console.log(Object.entries(openingHours));
// console.log(new Map(Object.entries(openingHours)));

// // Quiz App
// console.log(question.get('question'));
// for (const [key, value] of question) {
//   if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
// }
// // const answer = Number(prompt('Your Answer'));
// // console.log(question.get(answer === question.get('correct')));

// // Map to Array
// console.log([...question]);

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🟨 Yellow Card'],
  [69, '🔴 Red Card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🟨 Yellow Card'],
]);
// // Task 1: Create an events array with all unique events from the game
// const events = [...new Set(gameEvents.values())];
// console.log(events);

// // Task 2: Remove the 64 minute 'Yellow Card' event from the game events log since it is deemed to be unfair
// gameEvents.delete(64);
// console.log(gameEvents);

// // Task 3: Log to the console the average time taken before an event occurs
// let average = 0;
// console.log(
//   `An event happened, on average, every ${90/gameEvents.size} minutes`
// );

// // Task 4: Log to the console whether each event that occured in the game happened in the first or second halves
// for (const [key, value] of gameEvents) {
//   let half = key >= 45 ? '[SECOND HALF]' : '[FIRST HALF]';
//   console.log(`${half} ${key}: ${value}`);
// }

// Working with Strings
// const airline = 'TAP Air Portugal';
// const plane = 'A320';
// console.log(plane[0]);
// console.log(plane[20]);
// console.log(airline[8]);
// console.log('B737'[0]);

// console.log(airline.slice(0, airline.indexOf(' ')));
// console.log(airline.slice(airline.lastIndexOf(' ') + 1));

// const checkMid = function (seat) {
//   seat.indexOf('B') > 0 || seat.indexOf('E') > 0
//     ? console.log(`You got the middle seat 😬`)
//     : console.log(`You got lucky 😎`);
// };
// checkMid('11B');
// checkMid('23C');
// checkMid('3E');

// Regular Expressions
// Put the substring to be replaced between slashes like /door/g **g stands for global.
// The string methods that return boleans are .includes(), .startsWith() and .endsWith()

// Real World Examples
// 1:
// const maskCreditCard = function (number) {
//   const str = number + '';
//   const last = str.slice(-4);
//   return last.padStart(str.length, '*');
// };
// console.log(maskCreditCard(2235343534552542544));
// console.log(maskCreditCard('22353435345525425445555555'));
// console.log(maskCreditCard(455254254383748));

// // 2:
// const msg = 'Bad Weather... All Departures DElayed...';
// console.log(msg.repeat(5));

// const planesInLine = function (n) {
//   console.log(`There are ${n} planes in line${'✈️'.repeat(n)}`);
// };
// planesInLine(5);
// planesInLine(3);
// planesInLine(13);

// String Challenge
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const checkLocation = function (text) {
  return text.slice(0, 3).toUpperCase();
};
const flight = flights.split('+');
console.log(flight);
for (const msg of flight) {
  let [state, from, to, time] = msg.split(';');
  state = state.includes('Delayed')
    ? state.replace('_', '🔴').replace('_', ' ')
    : state.replace(/_/g, ' ').trimStart();
  from = from.slice(0, 3).toUpperCase();
  to = to.slice(0, 3).toUpperCase();
  const [hr, min] = time.split(':');
  const output = `${state} from ${from} to ${to} (${hr}h${min})`.padStart(45)
  console.log(output);
}
