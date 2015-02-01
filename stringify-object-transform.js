var Transform = require('stream').Transform;
var util = require('util');

function StringifyObjectTransform() {
  Transform.call(this);
  this._readableState.objectMode = false;
  this._writableState.objectMode = true;
  this.setEncoding('utf8');
  this._first = true;
}

util.inherits(StringifyObjectTransform, Transform);

var prototype = StringifyObjectTransform.prototype;

prototype._transform = function(array, encoding, callback) {
  if (
    !Array.isArray(array) ||
    array.length !== 2 ||
    typeof array[0] !== 'string'
  ) {
    this.emit('error', new Error(
      'Input to StringifyObjectTransform was not of type [key, value]'
    ));
  } else {
    if (this._first) {
      this.push('{');
      this._first = false;
    } else {
      this.push(',');
    }
    this.push(
      JSON.stringify(array[0]) + ':' + JSON.stringify(array[1])
    );
    callback();
  }
};

prototype._flush = function(callback) {
  if (!this._first) {
    this.push('}');
  }
  callback();
};

module.exports = StringifyObjectTransform;
