// Function constructor.

var john = {
  name: 'John',
  yearOfBirth: 1990,
  job: 'teacher',
}

var Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
  this.calculateAge = function() {
    console.log(2020 - this.yearOfBirth);
  }
}

Person.prototype.testMethod = function() {
  console.log('This is another way we can add methods to our objects!');
}

// Instantiation.
// When we use the new operator - a brand new empty object is created.
// Then the function is called - which creates a new execution context.
// In a regular function call, 'this' points to the global object.
// However, the 'new' operator makes it so the 'this' variable of
// the function points to the empty object created initially by the 'new' operator.
var dan = new Person('Dan', 1987, 'developer');
dan.calculateAge();
dan.testMethod();


// Primitives vs. Objects.

// Primitives.
var a = 23;
var b = a;
a = 46;

console.log(a);  // 46.
console.log(b);  // 23.

// Objects.
var obj1 = {
  name: 'John',
  age: 26,
};

var obj2 = obj1;
obj1.age = 30;

console.log(obj1.age);  // 30.
console.log(obj2.age);  // 30.

// Functions.
var age = 27;
var obj = {
  name: 'Dan',
  city: 'Vancouver',
};

function change(a, b) {
  a = 30;
  b.city = 'San Francisco';
}

change(age, obj);
console.log(age);  // 27.
console.log(obj.city);  // San Francisco.

// Callback Functions.
function arrayCalc(arr, fn) {
  result = [];
  for (var i = 0; i < arr.length; i++) {
    result.push(fn(arr[i]));
  }
  return result;
}

function calculateAge(yearOfBirth) {
  return 2020 - yearOfBirth;
}

birthYears = [1987, 1986, 1995, 2000, 1958];

var ages = arrayCalc(birthYears, calculateAge);
console.log(ages);


// Immediately Invoked Function Expressions (IIFE).

// Tricks the parser and makes it think we have an expression.
// In JS, anything in parentheses cannot be a declaration, therefore, it thinks it's an expression.
(function(goodluck) {
  var score = Math.random() * 10;
  // You can also pass vars in:
  console.log(score >= 5 - goodluck);
})(5);

// score cannot be accessed from outside, creating data privacy (or code modularity).


// Closures.
function retirement(retirementAge) {
  var statement = ' years left until retirement';
  return function(yearOfBirth) {
    var age = 2020 - yearOfBirth;
    console.log((retirementAge - age) + statement);
  }
}

var retirementUs = retirement(66);
retirementUs(1987);
// or:
retirement(66)(1995);

var retireIceland = retirement(67);
retirementIceland(1987);


// Think about this: we are able to still use the statement & retirementAge vars
// even after the retirement function stopped its execution...
// This is a closure...

// Closure: an inner function always has access to the variables and
// parameters of its outer function, even after the outer function has returned.
