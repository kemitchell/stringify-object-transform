/* jshint mocha: true */
var concat = require('concat-stream');
var expect = require('chai').expect;
var ObjectTransform = require('..');

var streamResult = function(object, callback) {
  var keys = Object.keys(object);
  var stream = new ObjectTransform();

  stream.pipe(concat(function(result) {
    callback(result.toString());
  }));

  keys.forEach(function(key) {
    stream.write([key, object[key]]);
  });

  stream.end();
};

describe('sanity checks', function() {
  it('outputs nothing for an empty object', function(done) {
    streamResult({}, function(result) {
      expect(result).to.equal('');
      done();
    });
  });

  it('round-trips an object', function(done) {
    var object = {first: 1, second: 2};
    streamResult(object, function(result) {
      expect(result).to.equal(JSON.stringify(object));
      done();
    });
  });

  it('round-trips an nested object', function(done) {
    var object = {first: 1, second: 2, third: {fourth: 4}};
    streamResult(object, function(result) {
      expect(result).to.equal(JSON.stringify(object));
      done();
    });
  });
});
