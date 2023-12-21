'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const renderCountry = function (data, className = '') {
  let curKey, langKey;
  for (const key in data.currencies) {
    curKey = key;
  }
  for (const key in data.languages) {
    langKey = key;
  }

  const html = `<article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>🏴</span>${data.capital}</p>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} million people</p>
            <p class="country__row"><span>🗣️</span>${
              data.languages[langKey]
            }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[curKey].name
            }</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} 💣💣💣 ${response.status}`);
    return response.json();
  });
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbor = data[0]['borders'][0];
//       if (!neighbor) return;
//       //   console.log(data, neighbor, data[0]['borders']);

//       // Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => renderError(`Something went wrong 💣💣💣 ${err.message}`))
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      // const neighbor = 'data[0].borders[0]';
      const neighbor = 'fff';
      if (!neighbor) return;

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbor}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      renderError(`Something went wrong${err.message}. Try Again!`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};
///////////////////////////////////////

// const getCountryAndNeighbor = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     renderCountry(data);

//     const [neighbour] = data.borders;
//     if (!neighbour) return;
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };
// getCountryAndNeighbor('nigeria');
// Modern way of making ajax calls using fetch api
// const request = fetch('https://restcountries.com/v3.1/name/nigeria');
// console.log(request);

// btn.addEventListener('click', function () {
//   getCountryData('sweden');
// });
// BEM CSS class naming convention(Block__Element--Modifier)
// ////////////////////////////////////////////////////////////
// Coding Challenge #1
// Create a function 'whereAmI' that takes the coords of a particular place and renders a country from them using reverse geocoding
// Geocode API Auth code 281982291448210970692x7083
// 1) Create the function to take in the inputs

// whereAmI(3.508, 12.504, `Coordinates not found!`);
// whereAmI(-33.933, 18.474, `Coordinates not found!`);
// whereAmI(19.037, 72.873, `Coordinates not found!`);
// 2) Reverse Geocode the coords and log the data to the console -33.933, 18, 474; 52.508,13.381;19.037,72.873

// Event Loop in Practice
// console.log('Test Start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1')
//   .then(res => console.log(res));
// Promise.resolve('Resolved promise 2')
//   .then(res => {
//   for (let i = 0; i < 1000; i++) {}
//   console.log(res);
// });
// console.log('Test End');

//Building Promises From Scratch
// const lottery = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening 🔮🔮');

//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 💰💰');
//     } else {
//       reject(new Error('You LOST 💩💩'));
//     }
//   }, 2000);
// });
// lottery.then(res => console.log(res)).catch(err => console.error(err));

// // Promisifying: Converting callback based behaviours into promises
const wait = sec => {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
};
// wait(1)
//   .then(() => {
//     console.log('1 second passed');
//     return wait(2);
//   })
//   .then(() => {
//     console.log('2 second passed');
//     return wait(3);
//   })
//   .then(() => {
//     console.log('3 second passed');
//     return wait(4);
//   })
//   .then(() => {
//     console.log('4 second passed');
//     return wait(3);
//   })
//   .then(() => {
//     console.log('5 second passed');
//     // return wait(3);
//   });

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject('abc').catch(x => console.error(x));

// Promisifying the geolocation api
// navigator.geolocation.getCurrentPosition(
//   pos => console.log(pos),
//   err => console.error(err)
// );
// console.log('Code not blocked!!');

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     // ,
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// let res;
const my_api_key = '281982291448210970692x7083';
// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(
//         `https://geocode.xyz/${lat},${lng}?geoit=json&auth=${my_api_key}`
//       );
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found💥💥${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       // if (!data) throw new Error(`${errorMsg}💥💥${res.status}`);
//       // 3) Display a string in the console that tells you where you are in the world based on the coords you provide.
//       return getJSON(
//         `https://restcountries.com/v3.1/name/${data.country}`,
//         'Country not found'
//       ).then(data => renderCountry(data[0]));
//     })
//     .catch(err => console.error(`${err.message}`))
//     .finally(() => (countriesContainer.style.opacity = 1));
// };
// btn.addEventListener('click', whereAmI);
////////////////////////////////////////////////////////
// Coding Challenge #2
// Create an image loading effect that loads, disappears after two secs and then reloads a different image
// 1) Create and load images using the 'createImage' function.
// let img;
const createImage = function (imgPath) {
  return new Promise(
    /* Executor Function */
    function (resolve, reject) {
      let img = document.createElement('img');
      img.src = imgPath;
      img.addEventListener('load', function () {
        document.querySelector('.images').appendChild(this);
        resolve(img);
      });
      img.addEventListener(/* 'error' event for listening */ 'error', () => {
        reject(new Error('Image Not Found 404'));
      });
    }
  );
};
// createImage('./img/img-1.jpg')
//   .then(() => wait(2))
//   .then(() => {
//     img.style.display = 'none';
//     return createImage('./img/img-2.jpg');
//   })
//   .then(() => wait(2))
//   .then(() => {
//     img.style.display = 'none';
//     return createImage('./img/img-3.jpg');
//   })
//   .catch(err => {
//     console.error(`${err.message} 💥💥`);
//   });

// Consuming Promises with 'async_await'
// Adding 'async' to a function sets it as an asynchronous function. While adding await anywhere inside stops the code exec and waits for a response from a promise. This does not block the code exec because of the async keyword. When the promise's response is received, whatever was stopped will continue executing.
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     // ,
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// const whereAmI = async function () {
//   try {
//     // Geolocation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;
//     // Reverse Geocoding
//     const resGeo = await fetch(
//       `https://geocode.xyz/${lat},${lng}?geoit=json&auth=${my_api_key}`
//     );
//     console.log(resGeo);

//     if (!resGeo.ok) throw new Error('Problem Getting Location Data!!');
//     const dataGeo = await resGeo.json();
//     // Country Data
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.country}`
//     );
//     if (!res.ok) throw new Error('Problem Getting Country!!');
//     const data = await res.json();
//     console.log(data);
//     renderCountry(data[0]);
//     return `You are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     console.error(err.message);
//     // rethrowing errors
//     throw err;
//   }
// };
// const city = whereAmI();
/* Value returned here will be a promise. whode fufilled value is the returned value. */

// whereAmI()
//   .then(city => console.log(city))
//   .catch(err => console.error(err))
//   .finally(() => console.log(`3: Finished getting location`));

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(city);

//   } catch (err) {
//     console.error(err);
//   }
//   console.log(`3: Finished getting Location`);
// })();
// console.log('async working...');

//Error handling with async-await
// Since we can't attach the catch statement to the async-await method, we use a try-catch method to catch errors.
// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   console.error(err.message);
// }
// Running many promises at once
// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);console.log([data1.capital, data2.capital, data3.capital]);

//     // Promise.all combinator: allows you to run promises in parallel
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//     ]);
//     console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// Other promise combinators:
// Promise.race : Here the first settled promise wins the race
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/egypt`),
//     getJSON(`https://restcountries.com/v3.1/name/mexico`),
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//   ]);
//   // Recall it shortcircuits if any promise gets settled.
//   console.log(res[0]);
// });
// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long'));
//     }),
//       s * 1000;
//   });
// };
// Promise.race([getJSON(`https://restcountries.com/v3.1/name/spain`), timeout(1)])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// // 2) Promise.allSettled: Takes in an array of promises and returns an array of all settled.NB It does not shortcircuit if a promise is rejected
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.resolve('Success'),
//   Promise.reject('Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// // 3) Promise.any: Modern combinator. Takes in an array of promises and returns the first fufilled promise.
//   Promise.any([
//     Promise.resolve('Success'),
//     Promise.resolve('Success'),
//     Promise.reject('Success'),
//   ])
//     .then(res => console.log(res))
//     .catch(err => console.error(err));

/////////////////////////////////////////
// Coding Challeng #4
// 1) Recreate #2 with async-await
// const loadNPause = async function () {
//   const waiter = async url => {
//     const img = await createImage(url);
//     await wait(2);
//     img.style.display = 'none';
//   };
//   try {
//     await waiter('./img/img-1.jpg');
//     await waiter('./img/img-2.jpg');
//     await waiter('./img/img-3.jpg');
//     // waiter(img1);
//     // const img2 = await createImage('./img/img-2.jpg');
//     // await wait(2);
//     // img2.style.display = 'none';
//     // // waiter(img2);
//     // const img3 = await createImage('./img/img-3.jpg');
//     // await wait(2);
//     // img3.style.display = 'none';
//     // waiter(img3);
//   } catch (err) /* You can now use the catch method without the error argument */ {
//     console.error(`${err.message} 💥💥`);
//   }
// };
// loadNPause();

// 2) Create a load ALl function to take an array of imgs and load em all
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async i => await createImage(i));
    console.log(imgs);
    
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (error) {
    console.error(`${error.message}💥💥💥`);
  }
};
loadAll(['./img/img-1.jpg', './img/img-2.jpg', './img/img-3.jpg']);
