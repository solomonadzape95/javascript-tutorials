// Exporting Module
console.log('Exporting Module');

const shippingCost = 10;
let totalPrice = 237
let totalQuantity = 54;
export const cart = [];
// export default shippingCost, cart

// Named Exports
export const addToCart = (prod, quant)=>{
    cart.push({prod, quant})
}
export { totalPrice, totalQuantity as tq, shippingCost }

// default exports
export default function () {
    totalPrice++
    console.log(totalPrice);
    
}
