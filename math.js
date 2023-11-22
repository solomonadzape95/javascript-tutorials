"use strict";

const mathChallenge = (str) => {
  //   const str = prompt("Enter your mathematical expression:");
  return new Function("return " + str)();
};

console.log(mathChallenge("(2-0)(6/2)"));

