function Eyes(parent){

	this.parent = parent;
	this.canvas = null;
	this.context = null;
	this.x = 0;
	this.y = 0;
	
	this.init = function(){
		this.canvas = this.parent.getElementsByTagName("canvas")[0];
		this.context = this.canvas.getContext("2d");
		
		this.canvas.width = this.parent.offsetWidth;
		this.canvas.height = this.parent.offsetHeight;

		this.x = 0;
		this.y = 0;
		
		this.update(null);
	};
	
	this.update = function(event){
		this.x = event != null ? event.pageX : 0;
		this.y = event != null ? event.pageY : 0;
		this.render();
	}
	
	this.render = function(){	
		this.ow = this.canvas.width;
		this.oh = this.canvas.height;
		
		this.context.clearRect(0, 0, this.ow, this.oh);
		
		this.ox = this.parent.offsetLeft + (this.ow / 2);
		this.oy = this.parent.offsetTop + (this.oh / 2);
		
		this.dx = this.x - this.ox;
		this.dy = this.y - this.oy;

		this.c = Math.sqrt((this.dx*this.dx) + (this.dy*this.dy));
		this.r = this.ow / 2 * 0.5;
		if (Math.abs(this.dx) < this.r && Math.abs(this.dy) < this.r && this.c < this.r) {
			this.r = this.c;
		} 
		this.alfa = Math.asin(this.dy / this.c);

		this.xi = Math.cos(this.alfa) * this.r;
		this.xi = (this.dx < 0 ? this.xi * -1 : this.xi);
		this.yi = Math.sin(this.alfa) * this.r;
		
		
		this.context.fillStyle = "#fff";
		this.context.beginPath();
		this.context.arc((this.ow / 2), (this.oh / 2), this.ow / 2, 0, 2 * Math.PI);
		this.context.closePath();
		this.context.fill();
		
		this.context.fillStyle = "#111";
		this.context.beginPath();
		this.context.arc((this.ow / 2) + this.xi, (this.oh / 2) + this.yi, this.ow / 4, 0, 2 * Math.PI);
		this.context.closePath();
		this.context.fill();
	};
	
	this.init();
}

var eyes = [];
var deyes = document.getElementsByClassName("eyes");
for(var i = 0; i < deyes.length; i++){
	deyes[i].innerHTML = "<canvas style=\"width: 100%; height: 100%;\">Your browser does not support canvas</canvas>";
	var eye = new Eyes(deyes[i]);
	eyes.push(eye);
}

document.addEventListener("mousemove", function(event){
	for(var i = 0; i < eyes.length; i++){
		eyes[i].update(event);
	}
}, false);