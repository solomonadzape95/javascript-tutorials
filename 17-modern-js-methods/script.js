// Importing Module
// Imported Module executes before code in this module
console.log('Importing Module');

// import { addToCart, totalPrice as price, tq, shippingCost } from './shoppingCart.js';
// console.log(price,tq,shippingCost);
// addToCart({'rice':34})
// console.log(shippingCost);

// import * as ShoppingCart
//     /* Importing everything exported from the specified module */
//     from './shoppingCart.js'
// ShoppingCart.addToCart({'bread':5})
// console.log(ShoppingCart.cart);

// Importing default exports
// import add from './shoppingCart.js'
// add()
// add()
// add()
// add()
// Imports are not copies of the exports. However they are live copies of the exports.

// Top Level Await
// const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
// const data = await res.json()
// console.log(data);
// console.log('Something');

// const getLastPost = async function () {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//   const data = await res.json();
//     console.log(data);
//     return {title:data.at(-1).title, text: data.at(-1).body}
// };
// const lastPost = getLastPost()

// Using top level await
// const lastPost = await getLastPost()
// console.log(lastPost);

// lastPost.then(last => console.log(last)
// )
// Using top level await blocks the entire module.
// Blocking code in the imported module can slow down code in the importing module.

// Module Pattern
// const shoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;
//   const addToCart = (prod, quant) => {
//     cart.push({ prod, quant });
//   };
//   const orderStock = function (prod, quant) {
//     console.log(`${quant} ${prod} ordered from the supplier`);
//   };
//   return { addToCart, cart, totalPrice, totalQuantity };
// })();
// shoppingCart2.addToCart('apple', 4);
// shoppingCart2.addToCart('pizza', 2);
// console.log(shoppingCart2);
// console.log(shoppingCart2.totalPrice);

// CommonJS Modules:
// export.addToCart = (prod, quant) => {
//     cart.push({ prod, quant });
// };
//   const {addToCart} = require('./shoppingCart')
// Introduction to NPM
import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'meat', quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone =
  /* Object.assign is used to clone an object and attach it or merge it with another */ Object.assign(
    {},
    state
  );
console.log(stateClone);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}
