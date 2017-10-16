var cameraLookFrom = vec3(5, 3, 8);
var cameraLookAt = vec3(0, 0, 0);
var cameraLookUp = vec3(0, 1, 0);
var fovY = 50;
var near = .1;
var far = 100;

var cameraVerticies;
var cameraBufferID;
var circleBuffer;
var lineBuffer;
var points;
var xPrev;
var yPrev;
var moveCamera;


function mouseButtonDown(x, y)
{
	// your code goes here
	moveCamera = true;
}

function mouseButtonUp(x,y)
{
	// your code goes here
	moveCamera = false;
	xPrev = undefined;
	yPrev = undefined;
}

function mouseMove(x,y)
{
	// your code goes here
	if (moveCamera){
		if (xPrev === undefined){
			xPrev = x;
		}
		if (yPrev === undefined){
			yPrev = y;
		}

		var quadrant = getQuadrant(x, y);
		if (quadrant === "xy"){
			// if cursor is within bounded box of camera and moveCamera is true
			if (moveCamera){
				cameraLookFrom[0] += x > xPrev ? 0.1 : -0.1;
				cameraLookFrom[1] += y > yPrev ? -0.1 : 0.1;
			}
		}
		else if (quadrant ==="xz")
		xPrev = x;
		yPrev = y;
	}


	document.getElementById("ScreenInfo").innerHTML = "(" + x + ", " + y + ")\n" + "cameraLookFrom" + cameraLookFrom[0] + " " + cameraLookFrom[1] + " " + cameraLookFrom[2];
}

function initCamera()
{
	// your code goes here
	cameraBufferID = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cameraBufferID);
	gl.bufferData(gl.ARRAY_BUFFER, 16 * 64, gl.STATIC_DRAW);
	
}

function computeCameraOrientation()
{
	// your code goes here
	
}

function drawCameraControls()
{
	// your code goes here
/*
	gl.uniform4fv(objectColor, white);
	cameraVerticies = [];
	x = cameraLookFrom[0] / 30;
	y = cameraLookFrom[1] / 30;
	z = cameraLookFrom[2] / 30;

	points.push(vec3(x - 1/30, y, z));
	points.push(vec3(x + 1/30, y, z));
	points.push(vec3(x, y - 1/30, z));
	points.push(vec3(x, y + 1/30, z));
	

	cameraVerticies.push(vec3(1, 0, 0));
	cameraVerticies.push(vec3(0, 1, 0));
	cameraVerticies.push(vec3(0, 0, 1));
	cameraVerticies.push(vec3(0, 0, 0));

	gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(cameraVerticies));
	gl.drawArrays(gl.LINES, 0, cameraVerticies.length);
	*/
}

function getQuadrant(x, y){
	if (x > 0 && x < middleX){
		if (y > 0 && y < middleY){
			return "xy";
		}
		else{
			return "xz";
		}
	}
	else if (y > middleY){
		return "yz";
	}
}

