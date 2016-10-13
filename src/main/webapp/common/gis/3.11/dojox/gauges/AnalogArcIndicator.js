//>>built
define("dojox/gauges/AnalogArcIndicator",["dojo/_base/declare","dojo/_base/lang","dojo/_base/connect","dojo/_base/fx","./AnalogIndicatorBase"],function(k,l,m,n,p){return k("dojox.gauges.AnalogArcIndicator",[p],{_createArc:function(g){if(this.shape){var d=this._gauge._mod360(this._gauge.startAngle),a=this._gauge._getRadians(this._gauge._getAngle(g)),b=this._gauge._getRadians(d);"cclockwise"==this._gauge.orientation&&(d=a,a=b,b=d);d=0;(b<=a?a-b:2*Math.PI+a-b)>Math.PI&&(d=1);var f=Math.cos(a),a=Math.sin(a),
h=Math.cos(b),b=Math.sin(b),e=this.offset+this.width,c=["M"];c.push(this._gauge.cx+this.offset*b);c.push(this._gauge.cy-this.offset*h);c.push("A",this.offset,this.offset,0,d,1);c.push(this._gauge.cx+this.offset*a);c.push(this._gauge.cy-this.offset*f);c.push("L");c.push(this._gauge.cx+e*a);c.push(this._gauge.cy-e*f);c.push("A",e,e,0,d,0);c.push(this._gauge.cx+e*b);c.push(this._gauge.cy-e*h);c.push("z");this.shape.setShape(c.join(" "));this.currentValue=g}},draw:function(g,d){var a=this.value;a<this._gauge.min&&
(a=this._gauge.min);a>this._gauge.max&&(a=this._gauge.max);if(this.shape)d?this._createArc(a):(a=new n.Animation({curve:[this.currentValue,a],duration:this.duration,easing:this.easing}),m.connect(a,"onAnimate",l.hitch(this,this._createArc)),a.play());else{var b=this.color?this.color:"black",f={color:this.strokeColor?this.strokeColor:b,width:1};this.color.type&&!this.strokeColor&&(f.color=this.color.colors[0].color);this.shape=g.createPath().setStroke(f).setFill(b);this._createArc(a);this.shape.connect("onmouseover",
this,this.handleMouseOver);this.shape.connect("onmouseout",this,this.handleMouseOut);this.shape.connect("onmousedown",this,this.handleMouseDown);this.shape.connect("touchstart",this,this.handleTouchStart)}}})});