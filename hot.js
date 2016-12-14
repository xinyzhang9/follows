var Rx = require('rx');
console.log('Current time: '+Date.now());

//create a sequence
var source = Rx.Observable.interval(1000);

//convert the sequence into a hot sequence
var hot = source.publish();

//no value is pushed to 1st subscription at this point
var subscription1 = hot.subscribe(
	function(x){ console.log('Observer 1: onNext: %s',x);},
	function(e){ console.log('Observer 1: onError: %s',e);},
	function(){ console.log('Observer 3: onCompleted');}	
);

console.log('Current time after 1st subscription: '+Date.now());

//Idle for 3 seconds
setTimeout(function(){
	//Hot is connected to source and starts pushing value to subscribers
	hot.connect();
	console.log('Current time after connect: '+Date.now());

	//Idle for another 3 seconds
	setTimeout(function(){
		console.log('Current time after 2nd subscription: '+Date.now());

		var subscription2 = hot.subscribe(
			function(x){ console.log('Observer 1: onNext: %s',x);},
			function(e){ console.log('Observer 1: onError: %s',e);},
			function(){ console.log('Observer 3: onCompleted');}	
		)
	},3000);
},3000);

