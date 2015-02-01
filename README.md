stringify-object-transform.js
============================

[![NPM version](https://img.shields.io/npm/v/stringify-object-transform.svg)](https://www.npmjs.com/package/stringify-object-transform)
[![build status](https://img.shields.io/travis/kemitchell/stringify-object-transform.js.svg)](http://travis-ci.org/kemitchell/stringify-object-transform.js)

Trivial Transform wrapping `JSON.stringify` for `Object` output. Inputs are `[key, value]` pairs. Outputs nothing for an empty `Object`.

```javascript
var StringifyObjectTransform = require('stringify-object-transform');
require('http').createServer(function(request, response) {
  response.statusCode = 404;
  // ...
  .on('data', function() {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
  })
  .pipe(new StringifyObjectTransform())
  .pipe(response);
});
```
