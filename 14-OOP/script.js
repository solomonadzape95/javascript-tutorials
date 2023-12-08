'use strict';
// Object Oriented Programming (OOP)
// Constructor Functions
// Note: Do not use arrow functions as constructors since they do not have their own "this" keyword!!
const Person = function (firstName, birthYear) {
  // Instance Properties
  (this.firstName = firstName), (this.birthYear = birthYear);
  // Never Do This
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};
// What happens when a function is called with the "new" keyword
// 1.A new {} is created
// 2. Function is called and "this" keyword = {}
// 3. New {} is linked to prototype
// 4. Functions automatically returns newly created object
const jonas = new Person('Jonas', 1991);

const matilda = new Person('Matilda', 2017);

const jack = new Person('Jack', 2007);

// console.log(jonas, matilda, jack);
// console.log(jonas instanceof Person);

// Prototypes
// console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
jonas.calcAge();
console.log(jonas.__proto__);
console.log(Person.prototype.isPrototypeOf(matilda));

// Setting Props on Prototype
// Person.prototype.species = 'Homo Sapiens';
// console.log(jonas.species, matilda.species);
// OwnProperties are props that are actually declared on the object itself
// console.log(jonas.hasOwnProperty('species'));
// console.log(jonas.hasOwnProperty('firstName'));
// console.log(Person.prototype.isPrototypeOf(jonas));

//NB: The prototype of an object is the prototype of its constructor function

// console.dir(Person.__proto__);
// Creating new Array methods
// Array.prototype.unique = function () {
//   return [...new Set(this)]
// }
// const arr = [1, 1, 2, 3, 4, 4, 5, 6, 6, 7, 8, 8]
// console.log(arr.unique());

// Coding Challenge
// Using a Constructor, implement a simple Car
const Car = function (make, speed) {
  (this.make = make), (this.speed = speed);
};
// const mercedes = new Car('Mercedes', '95 km/h');
// const bmw = new Car('BMW', '120 km/h');
Car.prototype.accelerate = function () {
  this.speed = `${parseFloat(this.speed) + 10} km/h`;
  console.log(`${this.make} going at ${this.speed}`);
};
Car.prototype.brake = function () {
  this.speed = `${parseFloat(this.speed) - 5} km/h`;
  console.log(`${this.make} going at ${this.speed}`);
};
// bmw.accelerate();
// mercedes.accelerate();
// bmw.brake();
// mercedes.accelerate();
// mercedes.brake();
// mercedes.brake();
// bmw.accelerate();
// bmw.brake();

// ES6 Classes
// class expression
// const PersonCl = class{}

// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  get age() {
    return 2037 - this.birthYear;
  }
  // Setting a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!!`);
  }
  get fullName() {
    return this._fullName;
  }
  static hey() {
    console.log(`Hey There 👋`);
  }
}
const jessica = new PersonCl('Jessica Davies', 1996);
console.log(jessica);
jessica.calcAge();
PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};
jessica.greet();
jessica.fullName = 'Jessica Davies';

// 1. Classes are not hoisted ie they can't be used before declaration
// 2. Classes are first-class citizens ie we can pass them into functions
// 3. Classes are executed in strict mode

const walter = new PersonCl('Walter White', 1965);
//Accesser Properties: Getters and Setters
// Getters help you retrieve things from objects while setters help you set things in the object.
// const account = {
//   owner: 'Jonas',
//   movements: [1, 2, 3, 4, 5],

//   get latest() {
//     return this.movements.slice(-1).pop();
//   },
//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };
// console.log(account.latest);
// account.latest = 50;
// console.log(account.movements);

// Static Methods
// Static Methods are functions that are attached to the constructor.
// Person.hey = function () {
//   console.log(`Hey There 👋`);
//   // console.log(this);

// };
PersonCl.hey();

// Object.create
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven.__proto__);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

///////////
// Coding Challenge 2
class CarCL {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }
  set speedUS(speed) {
    this._speed = speed * 1.6;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
}
const ford = new CarCL('Ford', 120);
ford.brake();
ford.accelerate();
ford.speedUS = 78.125;
console.log(ford.speed);

//////////////////////////////
// Inheritance Between Classes
const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};
Student.prototype = Object.create(Person.prototype);
// 09073517858 -Anthel Geo
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();
/////////////////////////
// Coding Challenge 3
// Crreate an electric car class to inherit the features of the main Car class.
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};
const tesla = new EV('Tesla', 120, 23);
tesla.accelerate();
tesla.chargeBattery(50);
tesla.accelerate();
tesla.brake();

// Inheritance Between Classes
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!! So we can access the 'this' keyword
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I am studying ${this.course}`);
  }
  calcAge() {
    console.log(
      `I am ${2037 - this.birthYear} years old, but as a student i feel like ${
        2037 - this.birthYear + 10
      } years old`
    );
  }
}
// const martha = new StudentCl('Martha Jones',2019)
const martha = new StudentCl('Martha Jones', 2019, 'Computer Science');
martha.calcAge();
martha.introduce();

// Inheritance With Object.create
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I am studying ${this.course}`);
};
const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();

// More Examples On Classes
// Types of Class Fields
// Public Fields and Methods
// Private Methods and fields
// These all have their static forms too!!!!
class Account {
  //1) Public Fields (Added to instances... not the prototype)
  locale = navigator.language;

  // 2) Private Fields (Added to instances... not the prototype)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // Protected Property
    this.#pin = pin;
    this.#movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an acount ${owner}`);
  }
  // 3) Public Methods
  // Public Interfaces
  getMovements() {
    return this.#movements;
  }
  deposit(val) {
    this.#movements.push(val);
    return this;
  }
  withdraw(val) {
    this.deposit(-val);
    return this;
  }
  requestLoan(val) {
    if (this._approveLoan()) {
      this.deposit(val);
      console.log(`Loan Approved`);
    }
    return this;
  }

  // 4) Private Methods
  // #approveLoan
  _approveLoan(val) {
    return true;
  }
}
const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);
// Its better to create methods that interact with props rather than interacting with the props yourself!!
// Chaining Methods
// You can do this by returning the instance at the end of the method you want to chain ie "return this"
acc1
  .deposit(250)
  .deposit(5000)
  .withdraw(140)
  .requestLoan(2500)
  .withdraw(100)
  .deposit(50);
// console.log(acc1.#movements);

///////////////////////////////////
// Coding Challenge #4
class EVCl extends CarCL {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
  brake() {
    this.speed -= 5;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}
const rivian = new EVCl('Rivian', 120, 23);
rivian.accelerate();
rivian.brake();
rivian.chargeBattery(50);
rivian.accelerate()
  .brake()
  .chargeBattery(100)
  .accelerate()
  .accelerate()
  .brake()
  .brake()
  .chargeBattery(100);
// rivian.#charge