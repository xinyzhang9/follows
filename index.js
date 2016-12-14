var Rx = require('rx');
var source = Rx.Observable.create(function (observer) {
  // Yield a single value and complete
  observer.onNext(42);
  observer.onCompleted();

  // Any cleanup logic might go here
  return function () {
    console.log('disposed');
  }
});

var subscription = source.subscribe(
  function (x) { console.log('onNext: %s', x); },
  function (e) { console.log('onError: %s', e); },
  function () { console.log('onCompleted'); });

// => onNext: 42
// => onCompleted

subscription.dispose();
// => disposed

// Creates an observable sequence of 5 integers, starting from 1
var source = Rx.Observable.range(1, 5);

// Prints out each item
var subscription = source.subscribe(
  function (x) { console.log('onNext: %s', x); },
  function (e) { console.log('onError: %s', e); },
  function () { console.log('onCompleted'); });

// => onNext: 1
// => onNext: 2
// => onNext: 3
// => onNext: 4
// => onNext: 5
// => onCompleted