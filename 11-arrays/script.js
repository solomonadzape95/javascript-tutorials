"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, 
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

//  Display Account Movements
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
   <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

//Create Usernames
inputLoginUsername.value = inputLoginPin.value = "";
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
const calcDisplayBal = function (acc) {
  acc.balance = acc.movements.reduce((a, b) => {
    return a + b;
  });
  labelBalance.textContent = `${acc.balance}€`;
};

// Calculate Account Summary

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  const expenditures = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);
  labelSumOut.textContent = `${expenditures}€`;
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// Updating the UI
const updateUI = function () {
  labelWelcome.textContent = `Welcome Back, ${
    currentAccount.owner.split(" ")[0]
  }`;
  containerApp.style.opacity = 100;

  // Clear and Blur Input Fields
  inputLoginUsername.value = inputLoginPin.value = "";
  inputLoginPin.blur();

  // Display Movements
  displayMovements(currentAccount.movements);

  // Display Balance
  calcDisplayBal(currentAccount);

  // Display Summary
  calcDisplaySummary(currentAccount);
  // console.log(currentAccount.balance);
  // Clear Transfer Fields
  inputClosePin.value = inputCloseUsername.value = "";
  inputTransferAmount.value = inputTransferTo.value = "";
};
// Event Handlers
let currentAccount;
btnLogin.addEventListener("click", (e) => {
  // Prevent Form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  currentAccount?.pin === Number(inputLoginPin.value)
    ? // Display UI and Welcome Message
      updateUI()
    : // Display Balance, Summary and Movements
      "";
});

// Implementing Transfers

const transfer = (amount, receiver) => {
  currentAccount.movements.push(-amount);
  receiver.movements.push(amount);
  updateUI();
};

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiver = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  amount > 0 &&
  currentAccount.balance >= amount &&
  receiver &&
  receiver?.username !== currentAccount.username
    ? transfer(amount, receiver)
    : "";
});

// Requesting Loan
btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const getLoan = () => {
    currentAccount.movements.push(amount);
    inputLoanAmount.value = "";
    updateUI();
  };
  const amount = Number(inputLoanAmount.value);
  amount > 0 && currentAccount.movements.some((mov) => mov > amount / 10)
    ? getLoan()
    : "";
});

// Closing An Account

btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  const logOut = () => {
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to Get Started`;
  };
  const closeAcc = (acc) => {
    const i = acc.findIndex((user) => user === currentAccount);
    acc.splice(i, 1);
    logOut();
  };
  inputCloseUsername.value === currentAccount.username &&
  currentAccount?.pin === Number(inputClosePin.value)
    ? closeAcc(accounts)
    : "";
});

// Sorting The Movements
let sortedState = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sortedState);
  sortedState = !sortedState;
});

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

// Find Method
// console.log(movements.find((mov) => mov < 0));
// const account = accounts.find((acc) => acc.owner === "Jessica Davis");
// console.log(account);

// // Some Method
// const anyDepo = movements.some((mov) => mov > 1500);
// console.log(anyDepo);
// // Every Method
// console.log(accounts4.movements.every((mov) => mov > 0));

// Flat and FlatMap methods
// const arr = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];
// console.log(arr.flat());
// const arrDeep = [
//   [1, [1, 2, 3], 3],
//   [[1, 2, 3], 5, 6],
//   [7, 8, [1, 2, 3]],
// ];
// console.log(arrDeep.flat(2));

// const allMovements = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce((acc, cur) => acc + cur, 0);
// console.log(allMovements);
// // FlatMap

// Sorting arrays
// if a +ve num is returned, B comes before A i.e switched order
// If a -ve num is returned, A comes before B i.e the order remains
// const ascend = movements.sort((a, b) => a - b);
// console.log(movements);

// const descend = movements.sort((a, b) => b - a);
// console.log(movements);
// // console.log(ascend,descend);

// Other ways of creating and filling arrays
// Fill Method
const x = new Array(7);
console.log(x);
x.fill(9, 3, 5);
console.log(x);

// Creating and array programmatically using Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);
// Creating an array with 100 random dice rolls

const diceRolls = Array.from(
  { length: 100 },
  () => Math.floor(Math.random() * 6) + 1
);
console.log(diceRolls);
// const list = Array.from(document.querySelectorAll('p'))
const movementUI = Array.from(document.querySelectorAll(".movements__value"));
console.log(movementUI);
