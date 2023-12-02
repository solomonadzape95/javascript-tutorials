'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Functions

// Format Dates
const formatMovementDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(locale).format(date);
};
//  Display Account Movements
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
   <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div> <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Formatting
const formatCur = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
//Create Usernames
inputLoginUsername.value = inputLoginPin.value = '';
const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
const calcDisplayBal = function (acc) {
  acc.balance = acc.movements.reduce((a, b) => {
    return a + b;
  });
  labelBalance.textContent = `${formatCur(
    acc.balance,
    acc.locale,
    acc.currency
  )}`;
};

// Calculate Account Summary

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatCur(incomes, acc.locale, acc.currency)}`;
  const expenditures = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);
  labelSumOut.textContent = `${formatCur(
    expenditures,
    acc.locale,
    acc.currency
  )}`;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formatCur(
    interest,
    acc.locale,
    acc.currency
  )}`;
};

// Updating the UI
const updateUI = function () {
  labelWelcome.textContent = `Welcome Back, ${
    currentAccount.owner.split(' ')[0]
  }`;
  containerApp.style.opacity = 100;

  // Create Current date
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    // weekday: 'long',
  };
  // const locale = navigator.language
  labelDate.textContent = new Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format(now);
  // const now = new Date();
  // const day = `${now.getDate()}`.padStart(2, 0);
  // const month = `${now.getMonth() + 1}`.padStart(2, 0);
  // const year = now.getFullYear();
  // const hour = `${now.getHours()}`.padStart(2, 0);
  // const minutes = `${now.getMinutes()}`.padStart(2, 0);
  // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;

  // Clear and Blur Input Fields
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();

  // Display Movements
  displayMovements(currentAccount);

  // Display Balance
  calcDisplayBal(currentAccount);

  // Display Summary
  calcDisplaySummary(currentAccount);
  // console.log(currentAccount.balance);
  // Clear Transfer Fields
  inputClosePin.value = inputCloseUsername.value = '';
  inputTransferAmount.value = inputTransferTo.value = '';
};
const startLogOutTimer = () => {
  let time = 300;
  const tick = () => {
    const min = String(time / 60).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${Math.trunc(min)}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Log in to get started`;
    }
    time--;
  };
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// Event Handlers
let currentAccount, timer;

// Fake Always Logged IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', e => {
  // Prevent Form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if(timer) clearInterval(timer)
  timer = startLogOutTimer();
  currentAccount?.pin === Number(inputLoginPin.value)
    ? // Display UI and Welcome Message
      updateUI()
    : // Display Balance, Summary and Movements
      '';
});

// Implementing Transfers

const transfer = (amount, receiver) => {
  currentAccount.movements.push(-amount);
  receiver.movements.push(amount);
  // Add Transfer Date
  currentAccount.movementsDates.push(new Date().toISOString());
  receiver.movementsDates.push(new Date().toISOString());
  updateUI();
};

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiver = accounts.find(acc => acc.username === inputTransferTo.value);
  amount > 0 &&
  currentAccount.balance >= amount &&
  receiver &&
  receiver?.username !== currentAccount.username
    ? transfer(amount, receiver)
    : '';
  clearInterval(timer)
  timer = startLogOutTimer()
});

// Requesting Loan
btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const getLoan = () => {
    inputLoanAmount.value = '';
    setTimeout(() => {
      currentAccount.movements.push(amount);
      // Add Loan Date
      currentAccount.movementsDates.push(new Date());
      updateUI();
    }, 2000);
  };
  const amount = Math.floor(inputLoanAmount.value);
  amount > 0 && currentAccount.movements.some(mov => mov > amount / 10)
    ? getLoan()
    : '';
    clearInterval(timer);
    timer = startLogOutTimer();
});

// Closing An Account

btnClose.addEventListener('click', e => {
  e.preventDefault();
  const logOut = () => {
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to Get Started`;
  };
  const closeAcc = acc => {
    const i = acc.findIndex(user => user === currentAccount);
    acc.splice(i, 1);
    logOut();
  };
  inputCloseUsername.value === currentAccount.username &&
  currentAccount?.pin === Number(inputClosePin.value)
    ? closeAcc(accounts)
    : '';
});

// Sorting The Movements
let sortedState = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount, !sortedState);
  sortedState = !sortedState;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// // Conversion
// console.log(Number(`23`));
// console.log(+`23`);

// // Parsing
// // Here we use the parseInt and ParseFloat functions which can be called on their own but can be called with the Number 'namspace'
// console.log(
//   Number.parseInt(
//     '30.5px',
//     10 /* This is the base we want the conversion to be done in */
//   )
// );
// console.log(
//   Number.parseFloat(
//     '30.5px',
//     10 /* This is the base we want the conversion to be done in */
//   )
// );

// // Using isNan is NaN
// console.log(Number.isNaN(20));
// console.log(Number.isNaN(+`20`));
// console.log(Number.isNaN(+`20px`));
// console.log(Number.isNaN(`20`));

// // Using isFinite to check if value is a number
// console.log(Number.isFinite(20));
// console.log(Number.isFinite(+`20`));
// console.log(Number.isFinite(+`20px`));
// console.log(Number.isFinite(`20`));

// // Using isInteger to check if a value is an integer
// console.log(Number.isInteger(20));
// console.log(Number.isInteger(+`20`));
// console.log(Number.isInteger(+`20px`));
// console.log(Number.isInteger(`20`));

// // Creating a random integer between a min and max value
// const randomInt = (min, max) => {
//   Math.trunc(Math.random() * (max - min) + 1) + min;
// };
// labelBalance.addEventListener('click', () => {
// [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
//   if (i % 2 === 0) {
//     row.style.backgroundColor = 'orangered';
//   }
// })
// })
// Number or Numeric Separators
// const diameter = 287_460_000_000;
// console.log(diameter);

// BigInt
// console.log(22222222222424242424242422342424242424242424242424242424242424n);

// Dates and Times
// Creating Dates
// 1
// const now = new Date();
// console.log(now);
// 2
// console.log(new Date('Aug 02 2020 18:05:41'));
// console.log(new Date('December 24, 2025'));
// 3
// new Date(2037, 10, 19, 15, 23);
// 4
// console.log(new Date(0));
// console.log(new Date(account1.movementsDates[0]));

// // Working With Dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDay());
// console.log(future.getDate());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());
// console.log(future.getTime());
// console.log(Date.now());
// Internalization API
// const num = 23444444.6679;
// const options = {
//   style:
//     'unit' /* Could also be currency or percent. Takes currency value as string */,
//   unit: 'mile-per-hour',
//   useGrouping: false,
// };
// console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));
// console.log('GER: ', new Intl.NumberFormat('de-DE', options).format(num));
// console.log('SYR: ', new Intl.NumberFormat('ar-SY', options).format(num));
// console.log('IND: ', new Intl.NumberFormat('hi-IN', options).format(num));

// SetTimeout And SetInterval
// setTimeout(() => console.log(`Here is your Pizza!! 🍕🍕`), 3000);
// You can use the clear Timeout and Clear Interval to remove the setTimeout and SetInterval functions
// setInterval(() => {
//   const now = new Date();
//   console.log(now);
// }, 1000);
