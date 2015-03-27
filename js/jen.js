var jen = function(jen) {
	
	console.log("HI FROM JEN!");
	
		// returns a random number between and including a and b
	// b is optional and if left out will default to 0
	// integer is a boolean and defaults to true
	// if a and b are 0 then just returns Math.random()
	
	jen.rand = function(a, b, integer) { 
		if (not(integer)) integer = true;
		if (not(b)) b = 0;
		if (not(a)) a = 0;
		if (a>b) {a++;} else if (b>a) {b++;}
		var r;
		if (a == 0 && b == 0) {
			return Math.random();
		} else if (b == 0) {
			r = Math.random()*a;
		} else {
			r = Math.min(a,b) + Math.random()*(Math.max(a,b)-Math.min(a,b));
		}	
		if (integer) {
			return Math.floor(r);			
		} else {
			return r;
		} //this is just saying if you dont specify wether it is true or false it defaults to true
	}
	
	jen.Bouncer = function(container, speedMax, speedMin, angleMax, angleMin) {
		
		console.log("hi from bouncer");
		
		if (not(container) || !container.getBounds || !container.getBounds()) {
			console.log("please provide a container with bounds set as first parameter!");
			return;
		}
		
		if (not(speedMax)) speedMax = 10;
		if (not(speedMin)) speedMin = 5;
		if (not(angleMax)) angleMax = 360;
		if (not(angleMin)) angleMin = 1;
		
		var that = this; 
		
		this.speed = jen.rand(speedMax, speedMin, false);
		this.angle = jen.rand(angleMax, angleMin, false);
		
		var b = container.getBounds();
		
		this.x = jen.rand(b.x, b.x + b.width);
		this.y = jen.rand(b.y, b.y + b.height);
		//when you ask from a new object from the class it looks inside the function and accesses anything called this
		//when you put new function anything called this, it gets assigned to it
		
		console.log(this.angle); 
		
		this.advance = function () { //this can be run outside the function 
			
			b = container.getBounds();
			console.log("advance");
			that.x += that.speed * Math.sin(that.angle*Math.PI/180); 
			that.y += that.speed * Math.cos(that.angle*Math.PI/180); 
			//this is how you convert degrees into radians
			
			if (that.x >b.x+b.width) {
				that.x = b.x + b.width;  
				that.angle = 360 - that.angle;
			} else if (that.x < b.x) {
				that.x = b.x;  
				that.angle = 360 - that.angle;
			}
			
			if (that.y >b.y+b.height) {
				that.y = b.y + b.height;  
				that.angle = 180 - that.angle;
			} else if (that.y < b.y) {
				that.y = b.y;  
				that.angle = 180 - that.angle;
			}
		}
		
	}
	
	
	
	
	
	//has namespace so can be jused outside module
	//but is longer
	// mod.not function () {
	//}
	
	//cannot be used outside namespace 
	//can be used in modle
	var not = function (v) {
		if (v === null) return true;
		return typeof v === "undefined";
	}
	
	//global scope can be used outside the module
	//but wipes out any other not or gets wiped out
	//not = function () {
	//}
	
	jen.scaleTo = function(obj, container, percentX, percentY) {
		
		// COLLECTING PARAMETERS
		// zim version of setting a default parameter
		// if ( zot(percentX) ) percentX = 100;
		
		// long version of setting default parameter
		if (not(percentX)) {
			percentX = -1;
		}
		
		if (percentY === null || typeof percentY === "undefined") {
			percentY = -1;
		}
		 
		// short version but be careful with false, 0, ""
		// percentX = (percentX || 100);
		
		console.log("percentX = " + percentX);
		
		if (zot(obj)) return;
		
		if (zot(container)) {
			if (!obj.getStage()) {
				zog("please add obj to stage before scaling");
				return;
			}
			container = obj.getStage();		
		}
		
		//if (percentX != -1 && percentY != -1) { OR you can write...
		
		if (percentX >=0 || percentY >= 0) {
			
			var sX; 
			var sY;
			
			if (percentX >= 0) {
				var w = container.getBounds().width * percentX / 100;
				sX = w / obj.getBounds().width;
			}
			
			if (percentY >= 0) {
				var h = container.getBounds().width * percentY / 100;
				sY = h / obj.getBounds().height;
			}
			
			if (sX && sY) {
				s = Math.min(sX, sY);
			} else if (sX) {
				s = sX;
			} else if (sY) {
				s= sY;
			}
			
			obj.scaleX = obj.scaleY = s;
		}
	}
	
	
	jen.Waiter = function(speed) {
		
		var makeWaiter = function() {
			console.log("hi from Waiter");
			
			this.maxTime = 1; // public
			// this.body = new createjs.Container(); // public
			
			var shape = new createjs.Shape();
			var w=100;
			var h=50;
			shape.graphics.f("#EF6D3B").rr(0,0,w,h,20);
			shape.setBounds(0,0,w,h);
			shape.regX = w/2;
			shape.regY = h/2;
			this.addChild(shape);
			
			var ticker = createjs.Ticker.on("tick", function() {
				shape.rotation += speed;
				stage.update();
			});
			
			console.log("speed = " + speed);
			
			if (not(speed)) {
			shape.rotation += 40;
			console.log("DEFAULT SPEED ACTIVATED!");
			}
			
			//speed = Math.min(60, speed);
			//speed = Math.max(10, speed);
			speed = Math.max(10,Math.min(60,speed));
			
			checkTime(); // private (local) function
			function checkTime() {
				console.log("checkTime");
			}
			
			this.pause = function() { // public method
				console.log("pause");
			}
			
		}
		makeWaiter.prototype = new createjs.Container();
		makeWaiter.constructor = makeWaiter;
		return new makeWaiter();
		
	}
	
	
	return jen;
}(jen || {});

/*
var jen = function (jen) {
	console.log("hi from jen!");
	jen.name = "boo";
	//return "hello";
	
	jen.think= function () { //objects can also have values of functions
		console.log("thinking!");
	}
	return jen; 
	
	
} (jen || {});

var jen = function (jen) {
	console.log("hi from jen2!");
	jen.name = "sam";
	//return "hello";
	
	jen.sleep= function () { //objects can also have values of functions
		console.log("sleeping!");
	}
	return jen; 
} (jen || {}); //

*/

