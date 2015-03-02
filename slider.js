var MobileMenu = {
	menu : null,
	button : null,
	isOn : false,
	header : null,
	headerText : null,
	bodyContent : null
}
var facebook = null;
var twitter = null;
var google = null;
$.get("http://ipinfo.io", function(response) {
    console.log(response.city, response.country);
}, "jsonp");

var Slider = {
	noFrames : 10,
	position : [],
	positionTop : [],
	currentFrame : "45px",
	currentPosition : 0,
	sliderContainer : document.getElementById('homepage-countries'),
	sliderObject : document.getElementsByClassName('country'),
	locator : null,
	dots : null,
	flagTopPositions : [-327, -300, -325, -318, -270, -310, -313, -323, -200, -319, -245, -327, -320],
	flagLeftPositions : [382, 48, 414, 390, 616, 372, 422, 393, 796, 173, 250, 364, 418],	
	//firstPosition : -1275,
	firstPosition : null,
	topSpacing : 40,
	firstTop : this.topSpacing * 4,
	maxTop : this.topSpacing * 4,
	firstFixedPosition: null, //set on window load
	lastFixedPosition: null, //set on window load
	images : [],

	setUp : function(){
		this.firstPosition = this.firstFixedPosition;
		for(var i = 0; i < this.sliderObject.length; i++){
			this.position[i] = this.firstPosition + "px";
			this.firstPosition += 330;
			this.sliderObject[i].style.left = this.position[i];
			this.sliderObject[i].style.top = this.positionTop[i];

			// Find Current
				if (this.sliderObject[i].style.left === this.currentFrame){
					this.sliderObject[i].className = this.sliderObject[i].className + " current"
				} else {
					this.sliderObject[i].className = "country"
				}
		};
		// Reset Current
		this.currentPosition = 0;
				
	},
	// Slider Functions
	slideRight : function(){
			this.currentPosition++;
			for(var i = 0; i < this.sliderObject.length; i++) {
				//Check if Offscreen & loop round
				if(this.sliderObject[i].style.left === Slider.firstFixedPosition + "px"){
					this.sliderObject[i].style.display = "none";
					this.sliderObject[i].style.left = Slider.lastFixedPosition + "px";
				}
				else{
					this.sliderObject[i].style.display = "block"
					var nextPosition = this.sliderObject[i].style.left.substring(0 ,this.sliderObject[i].style.left.length - 2);
					nextPosition -= 330;
					this.sliderObject[i].style.left = nextPosition + "px";	
				}
				// Find Current
				if (this.sliderObject[i].style.left === this.currentFrame){
					this.sliderObject[i].className = this.sliderObject[i].className + " current";
					this.placeFlag(i);
				} else {
					this.sliderObject[i].className = "country"
				}

			}
	},
	slideLeft : function(){
			this.currentPosition--;
			for(var i = 0; i < this.sliderObject.length; i++) {
			//Check if Offscreen & loop round
				if(this.sliderObject[i].style.left === Slider.lastFixedPosition + "px"){
					this.sliderObject[i].style.display = "none";
					this.sliderObject[i].style.left = Slider.firstFixedPosition + "px";
				}
				else{
					this.sliderObject[i].style.display = "block"
					var nextPosition = parseInt(this.sliderObject[i].style.left.substring(0 ,this.sliderObject[i].style.left.length - 2));
					nextPosition += 330;
					this.sliderObject[i].style.left = nextPosition + "px";	
				}
				// Find Current
				if (this.sliderObject[i].style.left === this.currentFrame){
					this.sliderObject[i].className = this.sliderObject[i].className + " current";
					this.placeFlag(i);
				} else {
					this.sliderObject[i].className = "country";
				}		
				
			}
	},
	goToCountry : function(int){
		this.currentPosition++;
		var loopCount = 0;
		while(this.sliderObject[int].style.left != "45px" && loopCount < 50){
			loopCount ++;
			Slider.slideRight();						
			
		}this.placeFlag(int);
	},
	placeFlag : function(int){		
		this.locator.style.top = -500 + "px";
		this.locator.style.opacity = 0;
		setTimeout(function () { 
	       this.locator.style.left = Slider.flagLeftPositions[int] + "px";
    		} , 100);		
		setTimeout(function () { 
	        this.locator.style.top = Slider.flagTopPositions[int] + "px";	        
			this.locator.style.opacity = 1;
    		} , 300);
	},
}
	var slider = document.getElementById('main');
	var countryImages = [
	"http://savoo.com/wp-content/uploads/2014/03/savoodotcomhomeimage3.png"
	]
	var imageHolder = document.getElementById("header-image")

function initiateGeolocationSequence(){
		// GeoLocation
	//console.log(geoip_country_code());
	if(typeof geoip_country_code == 'function'){	
	var countrycode = geoip_country_code();
	switch(countrycode){
		case "GB":
			Slider.goToCountry(0);
			facebook.setAttribute('href', 'https://www.facebook.com/Savoo.co.uk');
			twitter.setAttribute('href', 'https://twitter.com/Savoo');
			google.setAttribute('href', 'https://plus.google.com/+SavooCoUkvouchers');
			break;
		case "US":
			Slider.goToCountry(1);
			facebook.setAttribute('href', 'https://www.facebook.com/Savings');
			twitter.setAttribute('href', 'https://twitter.com/savings');
			google.setAttribute('href', 'https://plus.google.com/+SavingsdotCom');
			break;
		case "DE":
			Slider.goToCountry(2);
			facebook.setAttribute('href', 'https://en-gb.facebook.com/Savoo.de');
			twitter.setAttribute('href', 'https://twitter.com/Savoo_DE');
			break;
		case "FR":
			Slider.goToCountry(3);
			facebook.setAttribute('href', 'https://en-gb.facebook.com/Savoo.fr');
			twitter.setAttribute('href', 'https://twitter.com/Savoofr');
			break;
		case "IN":
			Slider.goToCountry(4);
			break;
		case "ES":
			Slider.goToCountry(5);
			facebook.setAttribute('href', 'https://en-gb.facebook.com/Savoo.es');
			break;
		case "IT":
			Slider.goToCountry(6);
			facebook.setAttribute('href', 'https://en-gb.facebook.com/Savoo.it');
			break;
		case "NL":
			Slider.goToCountry(7);
			break;
		case "AU":
			Slider.goToCountry(8);
			break;
		case "CA":
			Slider.goToCountry(10);
			break;
		case "BR":
			Slider.goToCountry(9);
			break;		
		case "IE":
			Slider.goToCountry(11);
			break;
		case "AT":
			Slider.goToCountry(12);
			break;
		default:
			Slider.goToCountry(0);
			break;
		}
	} else{console.log("Error")}

}
	var rightArrow;
	var leftArrow;

window.onload = function () {	/* Set Flags */
	//mobile menu
	MobileMenu.button = document.getElementById("mobilise");
	MobileMenu.menu = document.getElementById("links-top");
	MobileMenu.header = document.getElementById("header-image-container");
	MobileMenu.bodyContent = document.getElementById("main");
	MobileMenu.headerText = document.getElementById("header-text");

	//Social Stuff
	facebook = document.getElementById("fbook");
	twitter = document.getElementById("twitt");
	google = document.getElementById("goog");

	Slider.firstFixedPosition = -Math.abs((45 - (((Slider.sliderObject.length - 1) / 2) * 330)));
	//Slider.firstFixedPosition = -Math.abs((45 - (((Slider.sliderObject.length) / 2) * 330)));
	Slider.lastFixedPosition = Math.abs((45 + (((Slider.sliderObject.length - 1) / 2) * 330)));

	Slider.locator = document.getElementById('locator');
	Slider.setUp();
	initiateGeolocationSequence();

	rightArrow = document.getElementById('rightArrow');
	leftArrow = document.getElementById('leftArrow');

	rightArrow.onclick = function(){
		Slider.slideRight();
	}
	leftArrow.onclick = function(){
		Slider.slideLeft();
	}
	// Smooth Keyboard Helper 
	var Key = { 
	  _pressed: {}, 
	  LEFT: 37, 
	  UP: 38, 
	  RIGHT: 39, 
	  DOWN: 40, 
	  SPACE: 32, 
	  
	  isDown: function(keyCode) { 
	    return this._pressed[keyCode]; 
	  }, 
	  
	  onKeydown: function(event) { 
	    this._pressed[event.keyCode] = true; 
	    // Handle Input 

	  if (Key.isDown(Key.LEFT) && !Key.isDown(Key.RIGHT)) { 
	    Slider.slideLeft();
	  } 
	  if (Key.isDown(Key.RIGHT) && !Key.isDown(Key.LEFT)) { 
	    Slider.slideRight();
	  } 
	  if (Key.isDown(Key.SPACE)) { 
	    initiateGeolocationSequence();
	  }
	  }, 
	  
	  onKeyup: function(event) { 
	    delete this._pressed[event.keyCode]; 
	  } 
	}; 
  
	window.addEventListener('keyup', function(event) { Key.onKeyup(event);}, false); 
	window.addEventListener('keydown', function(event) { Key.onKeydown(event); event.preventDefault();}, false); 

	// Hammertime!
    var swipeRight = Hammer(slider).on("swiperight", function(event) {
        Slider.slideLeft();
    });
    var swipeLeft = Hammer(slider).on("swipeleft", function(event) {
        Slider.slideRight();
    });
    var tapHeader = Hammer(MobileMenu.header).on("tap", function(event) {
        if (MobileMenu.isOn) {
        	mobilise();
        };
    });
    var tabHeaderText = Hammer(MobileMenu.headerText).on("tap", function(event) {
        if (MobileMenu.isOn) {
        	mobilise();
        };
    });
    var slamDunk = Hammer(MobileMenu.bodyContent).on("tap", function(event) {
        if (MobileMenu.isOn) {
        	mobilise();
        };
    });
    
var flags = document.getElementsByClassName("flagImage");
}

var flagClicked = function(){

}

mobilise = function(){
	if (MobileMenu.isOn) {
		MobileMenu.menu.style.left = "-200px";
		MobileMenu.isOn = false;
	} else{
	MobileMenu.menu.style.left = "0px";
	MobileMenu.isOn = true;
	}
}



