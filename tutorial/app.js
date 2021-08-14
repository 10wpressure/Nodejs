// CommonJS, every file is a module (by default)
// Modules - Encapsulated Code (only share minimum)
// import variables/constants:
// either destructure, or use . notation
//const names = require("./4-names");
const { john, peter } = require("./4-names");
const sayHi = require("./5-utils");

sayHi("susan");
sayHi(john);
sayHi(peter);
//sayHi(names.john);
//sayHi(names.peter);
