#CanvasGamepad
----

So you want to add a gamepad to a html5/canvas based app in [html5](http://html5.apache.org/)

***npm i html5-plugin-canvas-gamepad***

###CanvasGamepad setup and configurations
---
in you html file add *CanvasGamepad.setup()*

```
/*
** this is a basic joystick and 1 button setup with start and select buttons
*/
onDeviceReady: function() {
	CanvasGamepad.setup();
}
```

##Configuration options

*CanvasGamepad is fully customizable, from button names, colors, layout and more.*

| property | type | value(s) | description | example |
|-:|:-|:-|:-|:-|
|debug|boolean|true\|false|show or hide event debug info<br>*default is false*|```debug:false```|
|trace|boolean|true\|false|show or hide gamepad trace info<br>*default is false*|```trace:false```|
|canvas|string|id of target canvas|*if left out, creates a new canvas object*|```canvas:"game"```|
|buttons|array|[]|collection of button objects|```[{name:"x",color:"rgba(255,255,0,0.5)"}]```|
|button|object|{name:string,color:hex\|rgb\|rgba}|properties for custom buttons|```[{name:"x",color:"rgba(255,255,0,0.5)"},{name:"y",color:"rgba(255,0,255,0.5)"}]```|
|layout|string|TOP_LEFT \| TOP_RIGHT \| BOTTOM_LEFT \| BOTTOM_RIGHT|cardinal position of buttons<br>*default is **BOTTOM_RIGHT***|```layout:"BOTTOM_RIGHT"```|
|start|boolean|true\|false|display start button<br>*default is true*|```start:false```|
|select|boolean|true\|false|display select button<br>*default is false*|```select:false```|
|joystick|boolean|true\|false|display joystick/dpad<br>*default is false*|```debug:false```|
|hidden|boolean|true\|false|show or hide the gamepad<br>*default is false*|<br>this can be used to *hide* the gamepad if you are doing something else on screen|```hidden:false```|

***if you are using [multikey.js](http://multikey.32teeth.org/) to extend the CanvasGamepad for keyboard access***

| property | type | value(s) | description | example |
|-:|:-|:-|:-|:-|
|buttons|array|[]|collection of button objects|```[{name:"x",color:"rgba(255,255,0,0.5)", key:"[keyboard letter]"}]```|
|button|object|{name:string,color:hex\|rgb\|rgba}|properties for custom buttons|```[{name:"x",color:"rgba(255,255,0,0.5)", key:"w"},{name:"y",color:"rgba(255,0,255,0.5)", key:"q"}]```|
|hint|boolean|true\|false|show or hidekeyboard hint<br>*default is false*|```hint:true```|

###Config examples
######*default options*

![default options](https://raw.githubusercontent.com/32teeth/html5-plugin-canvas-gamepad/master/images/CDVGamepad-1.png)

```
CanvasGamepad.setup();
```

######*one button, custom name, no start button*

![default options](https://raw.githubusercontent.com/32teeth/html5-plugin-canvas-gamepad/master/images/CDVGamepad-2.png)

```
CanvasGamepad.setup({
	start:false,
	buttons:[
		{name:"jump"}
	]
});
```

######*two buttons, custom names, custom colors, with select button*

![default options](https://raw.githubusercontent.com/32teeth/html5-plugin-canvas-gamepad/master/images/CDVGamepad-3.png)

```
CanvasGamepad.setup({
	select:true,
	buttons:[
		{name:"x",color:"rgba(255,255,0,0.5)"},
		{name:"y",color:"rgba(0,255,255,0.75)"}
	]
});
```

######*target canvas*

![default options](https://raw.githubusercontent.com/32teeth/html5-plugin-canvas-gamepad/master/images/CDVGamepad-4.png)

```
CanvasGamepad.setup({
	canvas:"game"
});
```

######*change layout canvas*

![default options](https://raw.githubusercontent.com/32teeth/html5-plugin-canvas-gamepad/master/images/CDVGamepad-5.png)

```
CanvasGamepad.setup({
	layout:"BOTTOM_LEFT"
});
```

######*show trace & debug info*


![default options](https://raw.githubusercontent.com/32teeth/html5-plugin-canvas-gamepad/master/images/CDVGamepad-6.png)

```
CanvasGamepad.setup({
	trace:true,
	debug:true
});
```

######*all out everything*


![default options](https://raw.githubusercontent.com/32teeth/html5-plugin-canvas-gamepad/master/images/CDVGamepad-7.png)

```
CanvasGamepad.setup({
	select:true,
	trace:true,
	debug:true,
	canvas:"game",
	buttons:[
		{name:"z", color:"#17861c"},
		{name:"y", color:"rgb(134, 83, 23)"},
		{name:"x", color:"rgba(204, 0, 51, 0.5)"},		
	]
});
```

######*hidden gamepad*

![default options](https://raw.githubusercontent.com/32teeth/html5-plugin-canvas-gamepad/master/images/CDVGamepad-8.png)

```
CanvasGamepad.setup({
	hidden:true
});
```

######*real world example*

![default options](https://raw.githubusercontent.com/32teeth/html5-plugin-canvas-gamepad/master/images/CDVGamepad-9.png)

```
/*
** @description start the game
*/
game.init();
/*
** @description setup gamepad, no stick, no start, one button
*/    
CanvasGamepad.setup({
	canvas:"controller",
	joystick:false,
	start:false, 
	buttons:[
		{name:"jump", color:"rgba(0,0,0,0.25)"}
	]
});  
```

######*example using key binding with [multikey.js](http://multikey.32teeth.org/)*

![default options](https://raw.githubusercontent.com/32teeth/html5-plugin-canvas-gamepad/master/images/CDVGamepad-10.png)

```
CanvasGamepad.setup(
  {
    canvas:"controller",
    start:{name:"start", key:"b"},
    select:{name:"select", key:"v"},
    trace:true,
    debug:true,
    hint:true,
    buttons:[
      {name:"a", "key":"s"},
      {name:"b", "key":"a"},
      {name:"x", "key":"w"},
      {name:"y", "key":"q"}
    ]      
  }
);
multikey.setup(CanvasGamepad.events, "qwasbv", true);
```
the above code is running in [this example](http://32teeth.github.io/html5-plugin-canvas-gamepad/)

###CanvasGamepad observable method
---
CanvasGamepad has an observable method that returns the current state map of the gamepad

**observe();**

```
CanvasGamepad.setup()
/*
** @description the below example simply logs out the observe method return
*/
setInterval(
	function()
	{
		var map = CanvasGamepad.observe();
		console.log(new Date() + ":" + JSON.stringify(map))
	}
	,1000
);
```


```
/*
** @description additionally, you can throw it into your main loop in canvas
*/
function draw()
{
	if(CanvasGamepad)
	{
		gamepad(CanvasGamepad.observe())
	}
}
```