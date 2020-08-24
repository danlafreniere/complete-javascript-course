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


// Blocks and IIFES.
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


// Destructuring.

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


// Classes.

// Class definitions are not hoisted in ES6.
// Can only add methods to classes, not properties.

class Person6 {
  constructor (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
  }

  calculateAge() {
    // Person6.prototype.calculateAge not needed anymore :3
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
  }

  // We also have static methods now.
  static greeting() {
    console.log('Hey there, you ever drunk Bailey\'s from a shoe?');
  }
}

const john6 = new Person6('John', 1990, 'teacher');


// Inheritence.

// ES5 way (welcome to my nightmare):

var Person5 = function(name, yearOfBirth) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
}

Person5.prototype.calculateAge = function() {
  var age = new Date().getFullYear() - this.yearOfBirth;
  return age;
}

var Athlete5 = function(name, yearOfBirth, medals) {
  // Call superclass.
  // New keyword will point 'this' to the new empty object.
  // If we want Person name, yearOfBirth, etc to be set on the new Athlete object,
  // then we need to call the person constructor with the 'this'
  // keyword set on our newly created Athlete object.
  // After this, all properties will be set on the new athlete object:
  Person5.call(this, name, yearOfBirth);
  this.medals = medals;
}

// To create the correct prototype chain, we need Object.create
// (allows us to manually create the prototype of the object).
// And we want the prototype of the athlete to be the prototype of the person,
// so that they become connected.

Athlete5.prototype = Object.create(Person5.prototype);

// As you can see, this is fucked. But it's important to understand.

var johnAthlete5 = new Athlete5('John', 1987, 5);
console.log(johnAthlete5.calculateAge());


// ES6 Method (thank fuck):

class Person {
  constructor (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
  }

  calculateAge() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
  }

}

// Extends keyword. BAM.
class Athlete extends Person {
  constructor(name, yearOfBirth, job, medals) {
    super(name, yearOfBirth, job);
    this.medals = medals;
  }
}
