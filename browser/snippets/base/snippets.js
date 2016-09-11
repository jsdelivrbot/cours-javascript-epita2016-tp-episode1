'use strict';

import _ from 'lodash';

'ABCD'.toLowerCase();

[ 1, 2 ].length;

[ 1, 2, 3, 4 ].slice(2, 3);

[ 'Hi', 'World' ].map(function(t) {
  return t.toLowerCase();
});

[ 'Hi', 'World' ].map(
  T => t.toLowerCase()
);


let foo = [
typeof 0,    // "number"
typeof true, // "boolean"
typeof 'foo', // "string"
typeof {}, // "object"
typeof undefined, // "undefined"

typeof null,  // "object"
typeof function(){}, // "function"
typeof NaN,  // "number"

typeof [],  // "object"
typeof new String('lalala'),  // "object"
];


_.isBoolean(foo);


function hello (name, options) {
  if (_.isObject(name)) {
    options = name;
    name = undefined;
  }
  name = name || 'John';
  options = options || {};
  options.color = options.color || 'blue';
  options.lang = options.lang || 'fr';

  console.log(name, options);
}



function find(filter, cb) {
  let result;

  // look in db.... (async)

  if (result) return cb(null, result);

  return cb(new Error('Not found !'));
}

