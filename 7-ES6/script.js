// Variable Declarations - let and const.
/**
 * The biggest difference between var and let/const is that var is function scoped and let/const are block scoped.
 * You must also initialize a value in a const declaration. Can't just say const x; Must be const x = value; Let is fine though.
 * Trying to use let/const vars before they're defined won't result in 'undefined' but an error (they're still hoisted though).
 */

let i = 25;

for (let i = 0; i < 5; i++) {
  console.log(i);
}

console.log(i);


// Blocks and IIFES
/**
 * In ES6 we can now achieve data privacy much more simply. We can just use a block (due to block scoping).
 */

// Can create a block as easily as this:

{
  const a = 1;
  let b = 2;
  var c = 3;
}

// console.log(a + b);  // This will error out.
console.log(c); // This still works just fine.


// Destructuring

const [name, age] = ['John', 26];
console.log(name);
console.log(age);

const obj = {
  firstName: 'John',
  lastName: 'Smith',
};

// The variable names have to match the keys:
const {firstName, lastName} = obj;
console.log(firstName);
console.log(lastName);

// or to give them new names:
const {firstName: a, lastName: b} = obj;
console.log(a);
console.log(b);

function calcAgeRetirement(year) {
  const age = new Date().getFullYear() - year;
  return [age, 65 - age];
}

const [anotherAge, retirement] = calcAgeRetirement(1987);
console.log(anotherAge);
console.log(retirement);
