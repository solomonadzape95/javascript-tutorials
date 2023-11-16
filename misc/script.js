'use strict';
// const bookings = [];
// const createBooking = function (flightNum, numPassengers = 1, price = 199) {
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123',2,800);
// createBooking('LH123',undefined,800);

// const flight = 'LH234';
// const jonas = {
//   name: 'Jonas Schemdtmann',
//   passport: 2424242789,
// };
// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 2424242789) {
//     alert('Check In');
//   } else {
//     alert('Wrong Passport!');
//   }
// };

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };
// const transformer = function (str, fn) {
//   console.log(str);
//   console.log(`Transformed string: ${fn(str)}`);

//   console.log(`Transformed by: ${fn.name}`);
// };
// transformer('JavaScript is the best!', upperFirstWord);
// transformer('JavaScript is the best!', oneWord);

// const greet = greeting => name => console.log(`${greeting} ${name}`);

// const greeterHey = greet('Hey');
// greeterHey('Jonas');
// greet('Hello')('Adam');

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };

// lufthansa.book(549, 'John Shelby');
// lufthansa.book(239, 'Jonas Schemdtmann');

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };
// const swiss = {
//   airline: 'Swiss Air Lines',
//   iataCode: 'LX',
//   bookings: [],
// };
// const book = lufthansa.book;

// // Manually manipulating the "this" keyword using the call() method. NB: The call() method calls the function
// book.call(lufthansa, 239, 'Mary Cooper');
// console.log(lufthansa);
// book.call(swiss, 239, 'Mary Cooper');
// console.log(swiss);
// book.call(eurowings, 23, 'Sarah Williams');
// console.log(eurowings);

// // Apply() Method
// // This works like the call() method but it recieves an array of the values. NB: Just like the call( method it calls the function)

// const flightData = [534, 'George Cooper'];
// book.apply(swiss, flightData);
// console.log(swiss);
// book.call(eurowings, ...flightData);
// console.log(eurowings);
// // Bind() Method
// // This returns a new function to which the 'this' keyword is bound. NB: This does not call the function, rather it returns a function where the 'this' keyword or any other argument has been pre-defined

// const bookEW = book.bind(eurowings);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);
// bookEW(...flightData);
// console.log(eurowings);
// bookLX(...flightData);
// console.log(eurowings);
// bookLH(...flightData);
// console.log(eurowings);
// // Passing other args to the bind() method ie. Partial Application(Where some arguments are already pre-defined)

// const bookEW23 = book.bind(eurowings, 5523);
// bookEW23('Martha Smith');
// bookEW23('Jonas Schmedtmann');

// // Using Bind() with objects and eventListeners

// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);

//   this.planes++;
//   console.log(this.planes);
// };

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial Application
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);
// console.log(addVAT(1000));
// Challenge: Redo the above function in a different way
// const addTax = rate => value => value + value * rate;
// const addVAT = addTax(0.23);
// console.log(addVAT(100));
// console.log(addVAT(23));

// Coding Challenge
// Create a simple poll

// const poll = {
//   question: 'What is your favorite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   //   This generates [0,0,0,0] as the answers variable
//   answers: new Array(4).fill(0),
//   displayResults(type = 'array') {
//     type === 'string'
//       ? console.log(`Poll results are ${this.answers.join(', ')}.`)
//       : type === 'array'
//       ? console.log(this.answers)
//       : '';
//   },
// };

// // Task 1: Create a method 'registerNewAnswer' to ask a question adn register the answer given by the user, into the answers array of the poll object.
// console.log(poll);
// poll.registerNewAnswer = function () {
//   let answer = prompt(
//     `${this.question}\n${this.options.join('\n')}\n(Write option number)`
//   );
//   answer === '' || answer === undefined || answer === null
//     ? alert('Please enter a valid option⁉️')
//     : (answer = Number(answer));
//   const checker = function (index) {
//     this.answers[index]++;
//     // console.log(this.answers[index]++) ;
//   };
//   // console.log(answer);
//   typeof answer === 'number' &&
//     answer < this.answers.length &&
//     this.answers[answer]++;

//   this.displayResults('string');
//   this.displayResults();
// };

// document
//   .querySelector('.answer')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// poll.displayResults.call({ answers: [5, 2, 3] });
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');

// IIFE (Immediately Invoked Function Expressions)
// (function () {
//   console.log('This will never run again');
// })();
// (() => console.log('This will never run again'))();

// {
//   const isPrivate = 23
//   var dffd = 33
// }
// // console.log(isPrivate);
// console.log(dffd);

// Closures
// const secureBooking = function () {
//   let passengerCount = 0;

//   return function () {
//     passengerCount++;
//     console.log(passengerCount, `passengers`);
//   };
// };
// const booker = secureBooking();
// booker();
// booker();
// booker();

// console.dir(booker);
// Example 1
// let f;
// const g = function () {
//   const a = 23;
//   f = function () {
//     console.log(a * 2);
//   };
// };
// const h = function () {
//   const b = 253;
//   f = function () {
//     console.log(b * 2);
//   };
// };
// g();
// f();
// // Reassigning Functions
// h();
// f();

// // Example 2
// const boardPassengers = function (n, wait) {
//   const pergroup = n / 3;
//   setTimeout(function () {
//     console.log('We are now boarding all', n, 'passengers');
//     console.log(`There are three groups each with ${pergroup} passengers`);
//   }, wait * 1000);
//   console.log(`Will start boarding in ${wait} seconds`);
// };
// const perGroup = 1000;
// boardPassengers(180, 3);

// Coding Challenge 2
(() => {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.body.addEventListener('click', () => {
    header.style.color = 'blue';
  });
})();
