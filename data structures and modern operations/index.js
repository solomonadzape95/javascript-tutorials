'use strict';  


  const openingHours = {
    sun: {
      open: '10:30',
      close: '20:30',
    },
    mon: {
      open: '04:30',
      close: '11:30',
    },
    tue: {
      open: '04:30',
      close: '11:30',
    },
    wed: {
      open: '04:30',
      close: '11:30',
    },
    thu: {
      open: '04:30',
      close: '11:30',
    },
    fri: {
      open: '04:30',
      close: '11:30',
    },
    sat: {
      open: '07:00',
      close: '10:00',
    },
  }

const resturant = {
  name: 'Classisco Italiano',
  location: 'Via Angelo Tavanti 23, Firenze Italy',
  categories: ['Italian', 'Pizzeria', 'Vegeterian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
openingHours,
  orderDelivery: function ({ starter, main, time, address }) {
    console.log(starter, main, address, time);
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here\'s your delicious pasta made with ${ing1},${ing2},and ${ing3}`
    );
  },
  orderPizza: function (mainIng, ...otherIngs) {
    console.log(mainIng, otherIngs);
  },
};

const {
  name: resturantName,
  openingHours: hours,
  categories: classes,
} = resturant;
console.log(resturantName, hours, classes);

resturant.orderDelivery({
  starter: 'Orange Juice',
  address: 'Sol de Vin',
  time: '12:43',
  main: 'Lasagna',
});

const menu = [...resturant.starterMenu, ...resturant.mainMenu];
console.log(menu);

// let ingredients = [
//   prompt(`It's time to make some delicious pasta. Ingredient 1:`, ''),
//   prompt(`Ingredient 2:`, ''),
//   prompt(`Ingredient 3:`, ''),
// ];
// resturant.orderPasta(...ingredients)
// Objects

const { sun, sat, ...weekDays } = resturant.openingHours;
console.log(sun, sat, weekDays);

let add = (...numbers) => {
  let result = numbers.reduce((a, b) => {
    return a + b;
  });
  console.log(result);
};
add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
add(23, 45, 67, 89, 10);
add(1, 23, 4, 58, 910);

resturant.orderPizza('mushroom', 'brocolli', 'onions', 'pepperoni', 'pumpkin');

// Short-Circuiting With Logical Operators
// console.log('___OR___');
// console.log(3 || 'Jonas');
// console.log('Jonas' || true);
// console.log('' || undefined);
// console.log(undefined || 0 || '' || 'Hello' || null || 23 || true);
// console.log("___AND___");

// console.log(3 && 'Jonas');
// console.log('Jonas' && true);
// console.log('' && undefined);
// console.log(undefined && 0 && '' && 'Hello' && null && 23 && true);

resturant.numGuests = 0;
const guests2 = resturant.numGuests || 10;
console.log(guests2);

// Nullish Operator works with null and undefined (Not 0, or other falsy values.)
const guestCorrect = resturant.numGuests ?? 10;
console.log(guestCorrect);

// Logical Assignment Operators

const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};
const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// Nullish Assignment Operator
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND Logical Assignment

rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);

// Tests for optional chaining
// Object props
console.log(resturant.openingHours.mon?.open);
// Methods
console.log(resturant.order?.(5, 5) ?? 'Method does not exist');
// Arrays
const user = [{ name: 'Jonas', email: 'hello@jonas.io' }];
console.log(user[0]?.name ?? 'User array is empty');

//Looping over objects
// Names
for(const day of Object.keys(openingHours)){
    console.log(day);
    
} 
// Values
const values = Object.values(openingHours)
console.log(values);
// Entire Object
const entries = Object.entries(openingHours)
console.log(entries);

