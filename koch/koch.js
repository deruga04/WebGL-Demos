
var canvas;
var gl;
const d60 = Math.PI/3; //represents 60 degrees

var points = [];

var numTimesToSubdivide = 0;

var bufferId;

function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
        
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );

    /* Clear canvas with white */
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU
    
    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, 8*Math.pow(5, 8)+8, gl.STATIC_DRAW );



    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
        document.getElementById("slider").onchange = function(event) {
        numTimesToSubdivide = event.target.value;
        render();
    };


    render();
};


function divideKoch( p1, p5, count )
{
    // check for end of recursion
    if ( count <= 0 ) {
        points.push(p5);
    }
    else {
        var p2 = vec2(
            p1[0] + (p5[0] - p1[0]) / 3,
            p1[1] + (p5[1] - p1[1]) / 3
        );
        var p4 = vec2(
            p1[0] + (p5[0] - p1[0]) * 2 / 3,
            p1[1] + (p5[1] - p1[1]) * 2 / 3
        );
        var p3 = vec2(
            p4[0] * Math.cos(d60) - p4[1] * Math.sin(d60) + p2[0] - p2[0] * Math.cos(d60) + p2[1] * Math.sin(d60),
            p4[0] * Math.sin(d60) + p4[1] * Math.cos(d60) + p2[1] - p2[0] * Math.sin(d60) - p2[1] * Math.cos(d60)
        );
        divideKoch(p1, p2, count - 1);
        divideKoch(p2, p3, count - 1);
        divideKoch(p3, p4, count - 1);
        divideKoch(p4, p5, count - 1);
    }
}

window.onload = init;

function render()
{
    var vertices = [
        vec2( -0.9, -0.9 ),
        vec2(  0.9, -0.9 )
    ];
    points = [];
    points.push(vertices[0]);

    divideKoch( vertices[0], vertices[1], numTimesToSubdivide);

    console.log(points);

    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.LINE_STRIP, 0, points.length );
    points = [];
    //requestAnimFrame(render);
}

