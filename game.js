/*
Antony Qin
Sparkle
Single sound taken from freesound.org


Basic flowchart of the toy:
Click screen
triggers function makeExplosion
triggers function pulse

Because of the constant update function:
triggers function makeFire
triggers function fade
triggers function moveSpark

*/

// game.js for Perlenspiel 3.2

/*
Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
Perlenspiel is Copyright © 2009-15 Worcester Polytechnic Institute.
This file is part of Perlenspiel.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with Perlenspiel. If not, see <http://www.gnu.org/licenses/>.

Perlenspiel uses dygraphs (Copyright © 2009 by Dan Vanderkam) under the MIT License for data visualization.
See dygraphs License.txt, <http://dygraphs.com> and <http://opensource.org/licenses/MIT> for more information.
*/

// The following comment lines are for JSLint. Don't remove them!

/*jslint nomen: true, white: true */
/*global PS */

// This is a template for creating new Perlenspiel games

// All of the functions below MUST exist, or the engine will complain!

// PS.init( system, options )
// Initializes the game
// This function should normally begin with a call to PS.gridSize( x, y )
// where x and y are the desired initial dimensions of the grid
// [system] = an object containing engine and platform information; see documentation for details
// [options] = an object with optional parameters; see documentation for details

(function ()
{
	G =
	{
		width : 32,
		height : 32,
		baseColor : PS.COLOR_BLACK,
		fadeTimer : 5, //	60 divided by fadeTimer is the FPS of the game
		maxSize : 2,
		workingArray : [],
		whereArray :
			[//whereArray represents the map, "00" stands for the origin, or click point, and the rest of the non-null indices symbolizes a potential explosion
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//0
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//1
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//2
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//3
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//4
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//5
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//6
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//7
			[null, null, null, null, null, null, null, null, null, null, null, "33", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//8
			[null, null, null, null, null, null, null, null, null, null, "33", "22", "#3", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//9
			[null, null, null, null, null, null, null, null, null, "33", "22", "11", "22", "33", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//10
			[null, null, null, null, null, null, null, null, "33", "22", "11", "00", "11", "22", "33", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//11
			[null, null, null, null, null, null, null, null, null, "33", "22", "11", "22", "33", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//12
			[null, null, null, null, null, null, null, null, null, null, "33", "22", "33", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//13
			[null, null, null, null, null, null, null, null, null, null, null, "33", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//14
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//15
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//16
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//17
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//18
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//19
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//20
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//21
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//22
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//23
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//24
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//25
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//26
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//27
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//28
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//29
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//30
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null] //31
			],//0     1     2     3     4     5     6     7     8     9    10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
		makeBead : function(x, y)
		{
			var bead =
			{
				x : x,
				y : y
			};
			return bead;
		},
		makeExplosion : function(x, y) //Spawn point of an explosion
		{
			var maxSize;
            if(G.whereArray[x][y].age === 0) //If we clicked on an inactive spark
            {
                maxSize = G.maxSize; //Firework will be default size
				G.workingArray.push(G.makeBead(x, y)); //Make a new spark and place it in the workingArray, an array that runs through every frame
                G.whereArray[x][y].color = PS.makeRGB(getRandomInt(1, 255), getRandomInt(1, 255), getRandomInt(1, 255)); //Give the new spark a random color that can't be black
            }
            else //If we clicked on an active spark,change it to a new origin of an explosion, with the random color getting ever closer to RGB(255, 255, 255), or white, also grid shadow becomes that random color
            {
				//Firework size will get bigger with successive clicks on active sparks
				G.whereArray[x][y].maxSize += 1;
				if(G.whereArray[x][y].maxSize > 10)
				{
					G.whereArray[x][y].maxSize = 10;
				}
				maxSize = G.whereArray[x][y].maxSize;

				var RGBArray = [];
                PS.unmakeRGB(G.whereArray[x][y].color, RGBArray);
                var lowest = RGBArray[0];
                if(RGBArray[0] < RGBArray[1])
                {
                    lowest = RGBArray[0];
                    if(RGBArray[0] < RGBArray[2])
                    {
                        lowest = RGBArray[0];
                    }
                    else
                    {
                        lowest = RGBArray[2];
                    }
                }
                else
                {
                    lowest = RGBArray[1];
                    if(RGBArray[1] > RGBArray[2])
                    {
                        lowest = RGBArray[2];
                    }
                }
                var max = lowest + 100;
                if(max > 255)
                {
                    max = 255;
                }

                var r = getRandomInt(lowest, max);
                var g = getRandomInt(lowest, max);
                var b = getRandomInt(lowest, max);
                PS.gridShadow(true, PS.makeRGB(r, g, b));

				//Reset this "new" spark
                G.whereArray[x][y].color = PS.makeRGB(r, g, b);
                G.whereArray[x][y].scale = 100;
                G.whereArray[x][y].alpha = 255;
                G.whereArray[x][y].age = 0;
				//G.whereArray[x][y].maxSize = G.maxSize;
            }

			PS.audioPlay("fireworkBamAndFizz", {path : "audio/", volume : ((maxSize / 10) / 2)});
			G.pulse(x, y, maxSize);
		},
		pulse : function(x, y, maxSize)//Checks around the origin of the explosion for potential sparks. Looking at the picture in whereArray above, "11"'s are very likely to become sparks, "22"'s less so, and so on
		{
			for(var countX = (x - maxSize); countX < (x + maxSize); countX += 1)
			{
				for(var countY = (y - maxSize); countY < (y + maxSize); countY += 1)
				{
					if(countX >= 0 && countX < G.width && countY >= 0 && countY < G.height)
					{
						if((PS.random(101) - 1) <= (100 / G.stepsTo(x, y, countX, countY)) && G.stepsTo(x, y, countX, countY) < maxSize && (countX !== x || countY !== y))
						{
							if(G.whereArray[countX][countY].age === 0)//If a potential spark is inactive
							{
								G.workingArray.push(G.makeBead(countX, countY));//Make a new spark and place it in the workingArray, an array that runs through every frame

								//The new spark is the same color as the origin of the explosion, but brighter(closer to white) the further away from the origin
                                var RGBArray = [];
                                PS.unmakeRGB(G.whereArray[x][y].color, RGBArray);
                                var newColor = hexToRgb(increase_brightness(RGBToHex(RGBArray[0], RGBArray[1], RGBArray[2]), (G.stepsTo(x, y, countX, countY) * getRandomInt(1, 30))));//Changes RBG to hex, brightens it, changes hex back to RGB

                                G.whereArray[countX][countY].color = newColor;
								G.whereArray[countX][countY].moveToX = countX - x;
								G.whereArray[countX][countY].moveToY = countY - y;
								G.whereArray[countX][countY].maxSize = maxSize;
							}
							else//If a potential spark is active, then average the resulting color from above with the color of the active spark
                            {
                                var RGBOriginalArray = [];
                                var RGBNewArray = [];
                                PS.unmakeRGB(hexToRgb(increase_brightness(RGBToHex(RGBOriginalArray[0], RGBOriginalArray[1], RGBOriginalArray[2]), (G.stepsTo(x, y, countX, countY) * getRandomInt(1, 30)))), RGBOriginalArray);//Changes RBG to hex, brightens it, changes hex back to RGB
                                PS.unmakeRGB(G.whereArray[countX][countY].color, RGBNewArray);
                                var averageColor = PS.makeRGB(((RGBOriginalArray[0] + RGBNewArray[0]) / 2), ((RGBOriginalArray[1] + RGBNewArray[1]) / 2), ((RGBOriginalArray[2] + RGBNewArray[2]) / 2));

								//Reset this "new" spark
                                G.whereArray[countX][countY].moveToX = G.whereArray[countX][countY].moveToX + (countX - x);
                                G.whereArray[countX][countY].moveToY = G.whereArray[countX][countY].moveToY + (countY - y);
                                G.whereArray[countX][countY].color = averageColor;
                                G.whereArray[countX][countY].scale = 100;
                                G.whereArray[countX][countY].alpha = 255;
                                G.whereArray[countX][countY].age = 0;
								G.whereArray[countX][countY].maxSize = maxSize;
                            }
						}
					}
				}
			}
		},
		stepsTo : function(x1, y1, x2, y2)//Used to calculate how far a spark is from its origin
		{
			return Math.abs(y2 - y1) + Math.abs(x2 - x1);
		},
		makeFire : function(x, y)//Paint the spark on the grid
		{
			PS.color(x, y, G.whereArray[x][y].color);
		},
		fade : function(x, y)//Shrink the spark, fade the spark to black
		{
			var lastingSecond = (60 / G.fadeTimer) * 2;//lastingSecond is how long the spark should last, in this case it is 2 seconds
			var bead = G.whereArray[x][y];
			bead.age += 1;
			PS.scale(x, y, (bead.scale - (50 / lastingSecond)));
            bead.scale = Math.round(PS.scale(x, y));
			PS.alpha(x, y, (bead.alpha - ((255 / lastingSecond))));
            bead.alpha = Math.round(PS.alpha(x, y));
		},
		moveSpark : function(x, y, beadNum)//Yes, this function moves the spark (depending on its distance from the origin) (closer to the origin less movement, further from the origin more movement)
		{
			var bead = G.whereArray[x][y];
			var newX = x + bead.moveToX;
			var newY = y + bead.moveToY;
            var oldScale = bead.scale;
            var oldAlpha = bead.alpha;

            var newMoveToY = Math.round(G.gravity(bead.moveToY));//Subject gravity to spark

			//Don't let spark move past borders
			if(newX < 0)
			{
				newX = 0;
			}
			else if(newX > G.width - 1)
			{
				newX = G.width - 1;
			}
			if(newY < 0)
			{
				newY = 0;
			}
			else if(newY > G.height - 1)
			{
				newY = G.height - 1;
			}

			if(newX === x && newY === y)//If the spark isn't moving, then don't do anything
			{
                return;
			}

			var sparkOld =
			{
				age : 0,
				color : G.baseColor,
				moveToX : 0,
				moveToY : 0,
                scale : 100,
                alpha : 255,
				maxSize : G.maxSize
			};

			var sparkNew =
			{
				age : bead.age,
				color : bead.color,
				moveToX : bead.moveToX,
				moveToY : newMoveToY,
                scale : bead.scale,
                alpha : bead.alpha,
				maxSize : bead.maxSize
			};

			//Reset past grid space where spark moved out of
			G.whereArray[x][y] = sparkOld;
			G.workingArray.splice(beadNum, 1);
			PS.color(x, y, G.baseColor);
			PS.alpha(x, y, 255);
			PS.scale(x, y, 100);

			//Update new grid space where spark is at
			G.whereArray[newX][newY] = sparkNew;
			G.workingArray.push(G.makeBead(newX, newY));
			PS.color(newX, newY, bead.color);
			PS.alpha(newX, newY, oldAlpha);
			PS.scale(newX, newY, oldScale);
		},
        gravity : function(force)//Yes gravity
        {
            return force + 0.7;
        },
		update : function()//Runs once per frame, in this case 12 per second
		{
			var lastingSecond = (60 / G.fadeTimer) * 2;//lastingSecond is how long the spark should last, in this case it is 2 seconds
			var beadNum = 0;
			while (beadNum < G.workingArray.length)//Iterates through the workingArray(the one holding all the active sparks)
			{
				var bead = G.workingArray[beadNum];
				if(G.whereArray[bead.x][bead.y].age <= lastingSecond)//Spark is still alive
				{
					G.makeFire(bead.x, bead.y);//Paint the spark
					G.fade(bead.x, bead.y);//Shrink and fade the spark
					if(G.whereArray[bead.x][bead.y].age > (lastingSecond / 6) && G.whereArray[bead.x][bead.y].age % 2 === 0)//Let the spark hang for 1/6 of its lifetime, then move it every other frame
					{
						G.moveSpark(bead.x, bead.y, beadNum);//Move the spark
					}
				}
				else if(G.whereArray[bead.x][bead.y].age >= lastingSecond)//Spark is past its lifetime
				{
					G.workingArray.splice(beadNum, 1);  //Remove it from workingArray

					//Reset the now inactive spark
					PS.color(bead.x, bead.y, G.baseColor);
					PS.alpha(bead.x, bead.y, 255);
					PS.scale(bead.x, bead.y, 100);
					var spark =
					{
						age : 0,
						color : G.baseColor,
						moveToX : 0,
						moveToY : 0,
                        scale : 100,
                        alpha : 255,
						maxSize : G.maxSize
					};
					G.whereArray[bead.x][bead.y] = spark;
				}
				beadNum += 1;
			}
		}
	};

	//Initializes the whereArray, or map, of the toy at run time
	//Every bead is a potential spark that has an age, color, force in the X direction, force in the Y direction, scale, alpha, and a maxSize(of the firework its a part of)
	for(var count = 0; count < G.height; count++)
	{
		for(var count2 = 0; count2 < G.width; count2++)
		{
			var spark =
			{
				age : 0,
				color : G.baseColor,
				moveToX : 0,
				moveToY : 0,
                scale : 100,
                alpha : 255,
				maxSize : G.maxSize
			};
			G.whereArray[count2][count] = spark;
		}
	};
}());

//Functions outside of G, I got from the internet
//One function that returns a range integer in a range
//A bunch of functions that work together to brighten a RGB color
var getRandomInt = function(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
var RGBToHex = function(R,G,B) {return toHex(R)+toHex(G)+toHex(B)};
var toHex = function(n)
{
    n = parseInt(n,10);
    if (isNaN(n)) return "00";
    n = Math.max(0,Math.min(n,255));
    return "0123456789ABCDEF".charAt((n-n%16)/16)
        + "0123456789ABCDEF".charAt(n%16);
};
var increase_brightness = function(hex, percent)
{
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(hex.length == 3){
        hex = hex.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);

    return '#' +
        ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
        ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
        ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
};
var hexToR = function(h) {return parseInt((cutHex(h)).substring(0,2),16)};
var hexToG = function(h) {return parseInt((cutHex(h)).substring(2,4),16)};
var hexToB = function(h) {return parseInt((cutHex(h)).substring(4,6),16)};
var cutHex = function(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h};
var hexToRgb = function(hex)
{
    var r = hexToR(hex);
    var g = hexToG(hex);
    var b = hexToB(hex);

    return PS.makeRGB(r, g, b);
};

PS.init = function(system, options)
{
	"use strict";

	// Use PS.gridSize( x, y ) to set the grid to
	// the initial dimensions you want (32 x 32 maximum)
	// Do this FIRST to avoid problems!
	// Otherwise you will get the default 8x8 grid


	//Grid should be all black, no borders, with an initial yellow shadow to draw the player's eyes
	PS.gridSize(G.width, G.height);
	PS.gridColor(G.baseColor);
	PS.gridShadow(true, PS.COLOR_YELLOW);
	PS.color(PS.ALL, PS.ALL, G.baseColor);
	PS.borderAlpha(PS.ALL, PS.ALL, 0);
	PS.statusText("Sparkle");

	PS.audioLoad("fireworkBamAndFizz", {path : "audio/"});

	PS.timerStart(G.fadeTimer, G.update);//Start update function that runs 12 times per second


	// Add any other initialization code you need here
};

// PS.touch ( x, y, data, options )
// Called when the mouse button is clicked on a bead, or when a bead is touched
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.touch = function(x, y, data, options)
{
	"use strict";
    G.makeExplosion(x, y);

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

	// Add code here for mouse clicks/touches over a bead
};

// PS.release ( x, y, data, options )
// Called when the mouse button is released over a bead, or when a touch is lifted off a bead
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.release = function(x, y, data, options)
{
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead
};

// PS.enter ( x, y, button, data, options )
// Called when the mouse/touch enters a bead
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.enter = function(x, y, data, options)
{
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead
};

// PS.exit ( x, y, data, options )
// Called when the mouse cursor/touch exits a bead
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.exit = function(x, y, data, options)
{
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead
};

// PS.exitGrid ( options )
// Called when the mouse cursor/touch exits the grid perimeter
// It doesn't have to do anything
// [options] = an object with optional parameters; see documentation for details

PS.exitGrid = function(options)
{
	"use strict";

	// Uncomment the following line to verify operation
	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid
};

// PS.keyDown ( key, shift, ctrl, options )
// Called when a key on the keyboard is pressed
// It doesn't have to do anything
// [key] = ASCII code of the pressed key, or one of the following constants:
// Arrow keys = PS.ARROW_UP, PS.ARROW_DOWN, PS.ARROW_LEFT, PS.ARROW_RIGHT
// Function keys = PS.F1 through PS.F1
// [shift] = true if shift key is held down, else false
// [ctrl] = true if control key is held down, else false
// [options] = an object with optional parameters; see documentation for details

PS.keyDown = function(key, shift, ctrl, options)
{
	"use strict";

	// Uncomment the following line to inspect parameters
	//	PS.debug( "DOWN: key = " + key + ", shift = " + shift + "\n" );

	// Add code here for when a key is pressed
};

// PS.keyUp ( key, shift, ctrl, options )
// Called when a key on the keyboard is released
// It doesn't have to do anything
// [key] = ASCII code of the pressed key, or one of the following constants:
// Arrow keys = PS.ARROW_UP, PS.ARROW_DOWN, PS.ARROW_LEFT, PS.ARROW_RIGHT
// Function keys = PS.F1 through PS.F12
// [shift] = true if shift key is held down, false otherwise
// [ctrl] = true if control key is held down, false otherwise
// [options] = an object with optional parameters; see documentation for details

PS.keyUp = function(key, shift, ctrl, options)
{
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.keyUp(): key = " + key + ", shift = " + shift + ", ctrl = " + ctrl + "\n" );

	// Add code here for when a key is released
};

// PS.swipe ( data, options )
// Called when a mouse/finger swipe across the grid is detected
// It doesn't have to do anything
// [data] = an object with swipe information; see documentation for details
// [options] = an object with optional parameters; see documentation for details

PS.swipe = function(data, options)
{
	"use strict";

	// Uncomment the following block to inspect parameters

	/*
	 var len, i, ev;
	 PS.debugClear();
	 PS.debug( "PS.swipe(): start = " + data.start + ", end = " + data.end + ", dur = " + data.duration + "\n" );
	 len = data.events.length;
	 for ( i = 0; i < len; i += 1 ) {
	 ev = data.events[ i ];
	 PS.debug( i + ": [x = " + ev.x + ", y = " + ev.y + ", start = " + ev.start + ", end = " + ev.end +
	 ", dur = " + ev.duration + "]\n");
	 }
	 */

	// Add code here for when an input event is detected
};

// PS.input ( sensors, options )
// Called when an input device event (other than mouse/touch/keyboard) is detected
// It doesn't have to do anything
// [sensors] = an object with sensor information; see documentation for details
// [options] = an object with optional parameters; see documentation for details

PS.input = function(sensors, options)
{
	"use strict";

	// Uncomment the following block to inspect parameters
	/*
	PS.debug( "PS.input() called\n" );
	var device = sensors.wheel; // check for scroll wheel
	if ( device )
	{
		PS.debug( "sensors.wheel = " + device + "\n" );
	}
	*/
	
	// Add code here for when an input event is detected
};

