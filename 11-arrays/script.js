"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
   <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
displayMovements(account1.movements);

const createUsernames = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);
const calcDisplayBal = function (movements) {
  const balance = movements.reduce((a, b) => {
    return a + b;
  });
  labelBalance.textContent = `${balance}€`;
};
calcDisplayBal(account1.movements);

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  const expenditures = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);
  labelSumOut.textContent = `${expenditures}€`;
  const interest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * 1.2) / 100).filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

calcDisplaySummary(account1.movements);

// Alan Walker Believers
// Wait a minute willow
// Early Jafaris Jay Crooke
// World We Used To KNow ALan Walker
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// SLICE
// let arr = ["a", "b", "c", "d", "e"];
// console.log(arr.slice(1));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, 4));
// console.log(arr.slice(1, -4));
// console.log(arr.slice());
// console.log(...arr);

// // SPLICE
// // This mutates the original array by removing the extracted part
// // console.log(arr.splice(2));
// arr.splice(-1);
// arr.splice(1, 2);
// console.log(arr);
// // REVERSE
// arr = ["a", "b", "c", "d", "e"];
// const arr2 = ["j", "i", "h", "g", "f"];
// console.log(arr2.reverse());
// console.log(arr2);

// // CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);

// // JOIN
// console.log(letters.join(" - "));

// // At Method
// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));
// // getting last element of array
// console.log(arr.at(arr.length - 1));
// console.log(arr.at(-1));
// console.log("jonas".at(0));

// Looping Over Arrays

// for(const movement of movements){
//   if(movement > 0){
//     console.log(`You deposited ${movement}`);
//   }else{
//     console.log(`You withdrew ${Math.abs(movement)}`);

//   }
// }
// ForEach Method
// The 'break' and 'continue' keywords do not work in this method. You can access the index of the entry by using Array.forEach(function(value,index,arr))

// Maps
// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });
// // Sets
// const uniqueCurrencies = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
// console.log(uniqueCurrencies);
// uniqueCurrencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });
// // You can use underscores '_' in place of 'throwaway' variables i.e. variables that are not useful.
// Coding Challenge 1

// const checkDogs = function (dogsJulia, dogsKate) {
//   const arr1Modified = dogsJulia.slice(1, dogsJulia.length - 2);
//   // console.log(arr1Modified);
//   const combinedArr = [...arr1Modified, ...dogsKate];
//   // console.log(combinedArr);
//   // console.log(dogsJulia);

//   combinedArr.forEach((element, index) => {
//     element >= 3
//       ? console.log(
//           `Dog number ${index + 1} is an adult🐕, and is ${element} years old.`
//         )
//       : console.log(
//           `Dog number ${
//             index + 1
//           } is still a puppy🐶, and is ${element} years old.`
//         );
//   });
// };
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// Map Method
// const eurToUsd = 1.1;
// const movementsUSD = movements.map((mov) => mov * eurToUsd);
// console.log(movementsUSD);

// // Filter
// const deposits = movements.filter((mov) => mov > 0);
// console.log(deposits);
// const withdrawals = movements.filter((mov) => mov < 0);
// console.log(withdrawals);

// Reduce
// const balance = movements.reduce((a, b) => {
//   return a + b;
// });
// console.log(balance);

// Maximum Value
// const max = movements.reduce((acc, curr) => {
//  return acc = curr > acc ? curr : acc;
// });
// console.log(max);

// Coding Challenge 2
// const calcAvgHumanAge = function (ages) {
//   // console.log(ages);

//   const average = ages
//     .map((age) => {
//       return age <= 2 ? age * 2 : 16 + age * 4;
//     })
//     .filter((age) => age >= 18).reduce(
//     (acc, cur, i, arr) => acc + cur / arr.length,
//     0
//   );
//   console.log(average);
// };
// calcAvgHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAvgHumanAge([16, 6, 10, 5, 6, 1, 4]);
