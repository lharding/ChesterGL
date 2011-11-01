var vec2={create:function(h){var a=new Float32Array(2);h&&(a[0]=h[0],a[1]=h[1]);return a}};
(function(h){var a={};h.requestAnimFrame=function(){return h.requestAnimationFrame||h.webkitRequestAnimationFrame||h.mozRequestAnimationFrame||h.oRequestAnimationFrame||h.msRequestAnimationFrame||function(a){h.setTimeout(a,1E3/60)}}();a.gl=null;a.useGoogleAnalytics=!0;a.programs={};a.currentProgram=null;a.pMatrix=null;a.runningScene=null;a.canvas=null;a.projection="3d";a.projection=a.projection;a.webglMode=!0;a.webglMode=a.webglMode;a.usesOffscreenBuffer=!1;a.usesOffscreenBuffer=a.usesOffscreenBuffer;
a.assets={};a.assetsHandlers={};a.assetsLoadedListeners={};a.lastTime=new Date;a.delta=0;a.fps=0;a.debugSpan=null;a.debugSpanId="debug-info";a.update=null;a.selectProgram=function(a){var b=this.programs[a],d=this.gl;if(a!=this.currentProgram){this.currentProgram=a;d.validateProgram(b);d.useProgram(b);for(var e in b.attribs)d.enableVertexAttribArray(b.attribs[e]);d.uniformMatrix4fv(b.pMatrixUniform,!1,this.pMatrix)}return b};a.setup=function(a){this.initGraphics(document.getElementById(a));this.webglMode&&
this.initDefaultShaders();this.debugSpan=document.getElementById("debug-info");this.registerAssetHandler("texture",this.defaultTextureHandler)};a.initGraphics=function(a){try{if(this.canvas=a,this.webglMode)this.gl=a.getContext("experimental-webgl")}catch(b){console.log("ERROR: "+b)}if(!this.gl){this.gl=a.getContext("2d");this.usesOffscreenBuffer?(this.offCanvas=document.createElement("canvas"),this.offCanvas.width=a.width,this.offCanvas.height=a.height,this.offContext=this.offCanvas.getContext("2d"),
this.offContext.viewportWidth=a.width,this.offContext.viewportHeight=a.height,this.offContext=this.offContext,this.offContext.viewportWidth=this.offContext.viewportWidth,this.offContext.viewportHeight=this.offContext.viewportHeight):this.offContext=this.gl;if(!this.gl||!this.offContext)throw"Error initializing graphic context!";this.webglMode=!1}this.gl=this.gl;this.gl.viewportWidth=a.width;this.gl.viewportHeight=a.height;this.gl.viewportWidth=this.gl.viewportWidth;this.gl.viewportHeight=this.gl.viewportHeight};
a.initDefaultShaders=function(){var a=this.gl;this.initShader("default",function(b){b.pMatrixUniform=a.getUniformLocation(b,"uPMatrix");b.mvMatrixUniform=a.getUniformLocation(b,"uMVMatrix");b.attribs={vertexPositionAttribute:a.getAttribLocation(b,"aVertexPosition"),vertexColorAttribute:a.getAttribLocation(b,"aVertexColor")}});this.initShader("texture",function(b){b.pMatrixUniform=a.getUniformLocation(b,"uPMatrix");b.mvMatrixUniform=a.getUniformLocation(b,"uMVMatrix");b.samplerUniform=a.getUniformLocation(b,
"uSampler");b.attribs={vertexColorAttribute:a.getAttribLocation(b,"aVertexColor"),textureCoordAttribute:a.getAttribLocation(b,"aTextureCoord"),vertexPositionAttribute:a.getAttribLocation(b,"aVertexPosition")}})};a.initShader=function(a,b){var d=this.gl,e=this.loadShader(a,"frag"),f=this.loadShader(a,"vert"),j=d.createShader(d.FRAGMENT_SHADER);d.shaderSource(j,e);d.compileShader(j);d.getShaderParameter(j,d.COMPILE_STATUS)?(e=d.createShader(d.VERTEX_SHADER),d.shaderSource(e,f),d.compileShader(e),d.getShaderParameter(e,
d.COMPILE_STATUS)?(d=this.createShader(a,j,e),b&&b(d),this.initShader1=!0):console.log("problem compiling vertex shader "+a+"("+d.getShaderInfoLog(e)+"):\n"+f)):console.log("problem compiling fragment shader "+a+"("+d.getShaderInfoLog(j)+"):\n"+e)};a.loadShader=function(a,b){var d=null;$.ajax({url:"shaders/"+a+"."+b,async:!1,type:"GET",success:function(a,b){b=="success"?d=a:console.log("error getting the shader data")}});return d};a.createShader=function(a,b,d){var e=this.gl,f=e.createProgram();e.attachShader(f,
b);e.attachShader(f,d);e.linkProgram(f);e.getProgramParameter(f,e.LINK_STATUS)||console.log("problem linking shader");console.log("creating shader "+a);return this.programs[a]=f};a.registerAssetHandler=function(a,b){this.assetsHandlers[a]=b};a.loadAsset=function(c,b,d){var e=void 0;if(typeof b=="object")e=b.dataType,b=b.path;this.assets[c]||(this.assets[c]={});var f=this.assets[c];if(f[b])if(f[b].status=="loading")d&&f[b].listeners.push(d);else if(f[b].status=="loaded")d&&d(f[b].data);else{if(f[b].status==
"try")f[b].status="loading",$.ajax({url:b,dataType:e,beforeSend:function(a){a.overrideMimeType("text/plain; charset=x-user-defined")},success:function(d,g){if(g=="success")a.assetsHandlers[c](b,d,function(d){if(d){for(f[b].status="loaded";d=f[b].listeners.shift();)d(f[b].data);a.assetsLoaded(c);a.assetsLoaded("all")}else f[b].status="try",console.log("fetching "+b+" - again"),a.loadAsset(c,{path:b,dataType:e})});else console.log("Error loading asset "+b)}})}else console.log("loading asset ["+c+"] "+
b),f[b]={data:null,status:"try",listeners:[]},d&&f[b].listeners.push(d),this.loadAsset(c,{path:b,dataType:e})};a.assetsLoaded=function(a,b){var d=this.assetsLoadedListeners[a];d||(this.assetsLoadedListeners[a]=[],d=this.assetsLoadedListeners[a]);b&&d.push(b);var e=!0;if(a=="all")for(var f in this.assets){var j=this.assets[f],g;for(g in j)if(j[g].status!="loaded"){e=!1;break}if(!e)break}else for(g in j=this.assets[a],j)if(j[g].status!="loaded"){e=!1;break}if(e)for(;e=d.shift();)e()};a.getAsset=function(a,
b){return this.assets[a][b].data};a.prepareWebGLTexture=function(a){var b=this.gl,d=!0;try{var e=0;b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,1);b.bindTexture(b.TEXTURE_2D,a.tex);b.texImage2D(b.TEXTURE_2D,0,b.RGBA,b.RGBA,b.UNSIGNED_BYTE,a);e=b.getError();e!=0&&(console.log("gl error "+e),d=!1);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.LINEAR);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.LINEAR);b.bindTexture(b.TEXTURE_2D,null)}catch(f){console.log("got some error: "+f),d=!1}return d};a.defaultTextureHandler=
function(c,b,d){var e=/[.]/.exec(c)?/[^.]+$/.exec(c):void 0,f=new Image,b=base64.encode(b);f.onload=function(){if(a.webglMode)f.tex=a.gl.createTexture();a.assets.texture[c].data=f;var b=!0;a.webglMode&&(b=a.prepareWebGLTexture(f));d&&d(b)};f.src="data:image/"+e+";base64,"+b};a.setupPerspective=function(){var a=this.gl;if(this.webglMode){a.clearColor(0,0,0,1);a.clearDepth(1);var b=a.viewportWidth,d=a.viewportHeight;a.viewport(0,0,b,d);this.pMatrix=mat4.create();if(this.projection=="2d")console.log("setting up 2d projection ("+
b+","+d+")"),mat4.ortho(0,b,0,d,-1024,1024,this.pMatrix);else if(this.projection=="3d"){console.log("setting up 3d projection ("+b+","+d+")");var e=d/1.1566,a=mat4.perspective(60,b/d,0.5,1500),e=vec3.create([b/2,d/2,e]),b=vec3.create([b/2,d/2,0]),d=vec3.create([0,1,0]),b=mat4.lookAt(e,b,d);mat4.multiply(a,b,this.pMatrix)}else throw"Invalid projection: "+this.projection;}};a.drawScene=function(){if(this.webglMode){var a=this.gl;a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT);a.blendFunc(a.SRC_ALPHA,
a.ONE_MINUS_SRC_ALPHA);a.enable(a.BLEND)}else a=this.offContext,a.setTransform(1,0,0,1,0,0),a.fillRect(0,0,a.viewportWidth,a.viewportHeight);this.runningScene&&this.runningScene.visit();!this.webglMode&&this.usesOffscreenBuffer&&(this.gl.fillRect(0,0,a.viewportWidth,a.viewportHeight),this.gl.drawImage(this.offCanvas,0,0));a=new Date;this.delta=a-this.lastTime;if(this.delta>150)this.delta=30;this.lastTime=a};a.lastDebugSecond_=new Date;a.elapsed_=0;a.frames_=0;a.sampledAvg=0;a.sumAvg=0;a.updateDebugTime=
function(){var c=new Date;this.elapsed_+=this.delta;this.frames_++;if(c-this.lastDebugSecond_>1E3){var b=this.elapsed_/this.frames_;this.sumAvg+=b;this.sampledAvg++;if(this.debugSpan)this.debugSpan.textContent=b.toFixed(2);if(this.sampledAvg>8&&this.useGoogleAnalytics)_gaq.push(["_trackEvent","ChesterGL","renderTime",a.runningScene.title,this.sumAvg/this.sampledAvg]),this.sumAvg=this.sampledAvg=0;this.elapsed_=this.frames_=0;this.lastDebugSecond_=c}};a.run=function(){h.requestAnimFrame(a.run,a.canvas);
a.drawScene();a.ActionManager.tick(a.delta);a.updateDebugTime()};a.setup=a.setup;a.registerAssetHandler=a.registerAssetHandler;a.loadAsset=a.loadAsset;a.assetsLoaded=a.assetsLoaded;a.getAsset=a.getAsset;a.drawScene=a.drawScene;a.run=a.run;h.ChesterGL=a})(window);(function(h){var a=h.ChesterGL;a.Block=function(c,b,d){this.type=b||a.Block.TYPE.STANDALONE;if(d)this.parent=d;this.children=[];this.program=a.Block.PROGRAM.DEFAULT;c&&(typeof c==="string"?(c=a.BlockFrames.getFrame(c),this.setTexture(c.texture),this.setFrame(c.frame)):this.setFrame(c));this.type==a.Block.TYPE.STANDALONE&&this.setColor([1,1,1,1]);if(a.webglMode&&this.type==a.Block.TYPE.STANDALONE&&(!d||d.type!=a.Block.TYPE.BLOCKGROUP))this.glBuffer=a.gl.createBuffer(),this.glBufferData=new Float32Array(a.Block.BUFFER_SIZE);
this.mvMatrix=mat4.create();mat4.identity(this.mvMatrix)};a.Block.PROGRAM={DEFAULT:0,TEXTURE:1};a.Block.PROGRAM_NAME=["default","texture"];a.Block.TYPE={STANDALONE:0,BLOCKGROUP:1,SCENE:2,TMXBLOCK:3};a.Block.QUAD_SIZE=36;a.Block.BUFFER_SIZE=36;a.Block.DEG_TO_RAD=Math.PI/180;a.Block.FullFrame=quat4.create([0,0,1,1]);a.Block.SizeZero=vec2.create([0,0]);a.Block.prototype.title="";a.Block.prototype.mvMatrix=null;a.Block.prototype.visible=!0;a.Block.prototype.isTransformDirty=!1;a.Block.prototype.isColorDirty=
!1;a.Block.prototype.isFrameDirty=!1;a.Block.prototype.baseBufferIndex=0;a.Block.prototype.glBuffer=null;a.Block.prototype.glBufferData=null;a.Block.prototype.position=vec3.create();a.Block.prototype.contentSize=null;a.Block.prototype.color=quat4.create([1,1,1,1]);a.Block.prototype.texture=null;a.Block.prototype.opacity=1;a.Block.prototype.rotation=0;a.Block.prototype.scale=1;a.Block.prototype.update=null;a.Block.prototype.frame=null;a.Block.prototype.parent=null;a.Block.prototype.children=null;a.Block.prototype.setFrame=
function(a){this.frame=quat4.create(a);this.setContentSize([a[2],a[3]]);this.isFrameDirty=!0};a.Block.prototype.setContentSize=function(a){this.contentSize=vec2.create(a);this.isFrameDirty=!0};a.Block.prototype.setScale=function(a){this.scale=a;this.isTransformDirty=!0};a.Block.prototype.setColor=function(a){this.color=quat4.create(a);this.isColorDirty=!0};a.Block.prototype.setTexture=function(c){this.texture=c;this.program=a.Block.PROGRAM.TEXTURE;var b=this;a.loadAsset("texture",c,function(a){b.contentSize||
b.setContentSize([a.width,a.height]);b.frame||b.setFrame([0,0,a.width,a.height])})};a.Block.prototype.moveTo=function(c,b){if(b){var d=new a.MoveAction(this,b,c);a.ActionManager.scheduleAction(d)}else this.position=vec3.create(c),this.isTransformDirty=!0};a.Block.prototype.moveBy=function(a){vec3.add(this.position,a);this.isTransformDirty=!0};a.Block.prototype.rotateTo=function(c){this.rotation=(a.webglMode?-1:1)*c*a.Block.DEG_TO_RAD;this.isTransformDirty=!0};a.Block.prototype.rotateBy=function(c){this.rotation+=
(a.webglMode?-1:1)*c*a.Block.DEG_TO_RAD;this.isTransformDirty=!0};a.Block.prototype.addChild=function(a){if(a.parent)throw"can't add a block twice!";this.children.push(a);a.parent=this};a.Block.prototype.transform=function(){var c=a.gl;if(this.isTransformDirty||this.parent&&this.parent.isTransformDirty){mat4.identity(this.mvMatrix);mat4.translate(this.mvMatrix,this.position);mat4.rotate(this.mvMatrix,this.rotation,[0,0,1]);mat4.scale(this.mvMatrix,[this.scale,this.scale,1]);var b=this.parent?this.parent.mvMatrix:
null;b&&mat4.multiply(b,this.mvMatrix,this.mvMatrix)}if(this.type!=a.Block.TYPE.BLOCKGROUP){var b=this.glBufferData,d=this.parent&&this.parent.type==a.Block.TYPE.BLOCKGROUP;if(a.webglMode){!d&&(this.isFrameDirty||this.isColorDirty)&&c.bindBuffer(c.ARRAY_BUFFER,this.glBuffer);if(this.isFrameDirty||d&&this.isTransformDirty){var e=9,f=this.contentSize[0]*0.5,j=this.contentSize[1]*0.5,g=this.baseBufferIndex*a.Block.BUFFER_SIZE,h=this.position[2];if(d){var l=[f,j,0],k=[-f,j,0],i=[f,-j,0],f=[-f,-j,0];mat4.multiplyVec3(this.mvMatrix,
l);mat4.multiplyVec3(this.mvMatrix,k);mat4.multiplyVec3(this.mvMatrix,f);mat4.multiplyVec3(this.mvMatrix,i);b[g]=f[0];b[g+1]=f[1];b[g+2]=h;b[g+e]=k[0];b[g+1+e]=k[1];b[g+2+e]=h;b[g+2*e]=i[0];b[g+1+2*e]=i[1];b[g+2+2*e]=h;b[g+3*e]=l[0];b[g+1+3*e]=l[1];b[g+2+3*e]=h}else b[g]=-f,b[g+1]=-j,b[g+2]=0,b[g+e]=-f,b[g+1+e]=j,b[g+2+e]=0,b[g+2*e]=f,b[g+1+2*e]=-j,b[g+2+2*e]=0,b[g+3*e]=f,b[g+1+3*e]=j,b[g+2+3*e]=0;if(this.program==a.Block.PROGRAM.TEXTURE)h=a.getAsset("texture",this.texture),k=h.width,i=h.height,h=
this.frame[0]/k,l=this.frame[1]/i,k=this.frame[2]/k,i=this.frame[3]/i,g+=3,b[g]=h,b[g+1]=l,b[g+e]=h,b[g+1+e]=l+i,b[g+2*e]=h+k,b[g+1+2*e]=l,b[g+3*e]=h+k,b[g+1+3*e]=l+i}if(this.isColorDirty){g=5+this.baseBufferIndex*a.Block.BUFFER_SIZE;h=this.color;l=this.opacity;for(k=0;k<4;k++)b[g+e*k]=h[0]*l,b[g+1+e*k]=h[1]*l,b[g+2+e*k]=h[2]*l,b[g+3+e*k]=h[3]*l}a.webglMode&&!d&&(this.isFrameDirty||this.isColorDirty)&&c.bufferData(c.ARRAY_BUFFER,this.glBufferData,c.STATIC_DRAW)}}};a.Block.prototype.visit=function(){this.update&&
this.update();if(this.visible){this.transform();for(var c=this.children,b=c.length,d=0;d<b;d++)c[d].visit();(!this.parent||this.parent.type!=a.Block.TYPE.BLOCKGROUP)&&this.render();this.isFrameDirty=this.isColorDirty=this.isTransformDirty=!1}};a.Block.prototype.render=function(){if(this.type==a.Block.TYPE.BLOCKGROUP)throw"Cannot call render on a BlockGroup block!";if(this.type!=a.Block.TYPE.SCENE)if(a.webglMode){var c=a.gl,b=a.selectProgram(a.Block.PROGRAM_NAME[this.program]);c.bindBuffer(c.ARRAY_BUFFER,
this.glBuffer);var d=a.Block.QUAD_SIZE;c.vertexAttribPointer(b.attribs.vertexPositionAttribute,3,c.FLOAT,!1,d,0);c.vertexAttribPointer(b.attribs.vertexColorAttribute,4,c.FLOAT,!1,d,20);if(this.program!=a.Block.PROGRAM.DEFAULT&&this.program==a.Block.PROGRAM.TEXTURE){var e=a.getAsset("texture",this.texture);c.vertexAttribPointer(b.attribs.textureCoordAttribute,2,c.FLOAT,!1,d,12);c.activeTexture(c.TEXTURE0);c.bindTexture(c.TEXTURE_2D,e.tex);c.uniform1i(b.samplerUniform,0)}c.uniformMatrix4fv(b.mvMatrixUniform,
!1,this.mvMatrix);c.drawArrays(c.TRIANGLE_STRIP,0,4)}else if(c=a.offContext,this.program==a.Block.PROGRAM.TEXTURE){b=this.mvMatrix;e=a.getAsset("texture",this.texture);c.globalAlpha=this.opacity;c.setTransform(b[0],b[1],b[4],b[5],b[12],b[13]);var b=this.contentSize[0],d=this.contentSize[1],f=this.frame;c.drawImage(e,f[0],e.height-(f[1]+d),f[2],f[3],-b/2,-d/2,b,d)}};a.Block.FullFrame=a.Block.FullFrame;a.Block.SizeZero=a.Block.SizeZero;a.Block.TYPE=a.Block.TYPE;a.Block.create=a.Block.create;a.Block.prototype.visible=
a.Block.prototype.visible;a.Block.prototype.position=a.Block.prototype.position;a.Block.prototype.contentSize=a.Block.prototype.contentSize;a.Block.prototype.color=a.Block.prototype.color;a.Block.prototype.texture=a.Block.prototype.texture;a.Block.prototype.opacity=a.Block.prototype.opacity;a.Block.prototype.rotation=a.Block.prototype.rotation;a.Block.prototype.scale=a.Block.prototype.scale;a.Block.prototype.update=a.Block.prototype.update;a.Block.prototype.frame=a.Block.prototype.frame;a.Block.prototype.parent=
a.Block.prototype.parent;a.Block.prototype.children=a.Block.prototype.children;a.Block.prototype.setFrame=a.Block.prototype.setFrame;a.Block.prototype.setContentSize=a.Block.prototype.setContentSize;a.Block.prototype.setScale=a.Block.prototype.setScale;a.Block.prototype.setColor=a.Block.prototype.setColor;a.Block.prototype.setTexture=a.Block.prototype.setTexture;a.Block.prototype.moveTo=a.Block.prototype.moveTo;a.Block.prototype.moveBy=a.Block.prototype.moveBy;a.Block.prototype.rotateTo=a.Block.prototype.rotateTo;
a.Block.prototype.rotateBy=a.Block.prototype.rotateBy;a.Block.prototype.addChild=a.Block.prototype.addChild;h.ChesterGL.Block=a.Block})(window);(function(h){var a=h.ChesterGL;a.BlockGroup=function(c,b){if(!a.webglMode)throw"BlockGroup only works on WebGL mode";a.Block.call(this,null,a.Block.TYPE.BLOCKGROUP);c?(this.texture=c,this.program=a.Block.PROGRAM.TEXTURE):this.program=a.Block.PROGRAM.DEFAULT;this.maxChildren=b||10;this.createBuffers()};a.BlockGroup.prototype=Object.create(a.Block.prototype);a.BlockGroup.prototype.maxChildren=0;a.BlockGroup.prototype.isChildDirty=!1;a.BlockGroup.prototype.indexBuffer=null;a.BlockGroup.prototype.indexBufferData=
null;a.BlockGroup.prototype.createBuffers=function(){var c=a.gl;this.glBuffer=c.createBuffer();this.glBufferData=new Float32Array(a.Block.QUAD_SIZE*this.maxChildren);this.indexBuffer=c.createBuffer();this.indexBufferData=new Uint16Array(6*this.maxChildren)};a.BlockGroup.prototype.createBlock=function(c){c=new a.Block(c,a.Block.TYPE.STANDALONE,this);this.texture&&c.setTexture(this.texture);return c};a.BlockGroup.prototype.addChild=function(a){if(this.children.length>=this.maxChildren)throw"Error: too many children - Make the initial size of the BlockGroup larger";
if(this.texture){if(this.texture!=a.texture)throw"Invalid child: only can add child with the same texture";}else this.texture=a.texture;if(a.parent!=this)throw"Invalid child: can only add children created with BlockGroup.create";this.children.push(a);a.baseBufferIndex=this.children.length-1;a.glBufferData=this.glBufferData;this.isChildDirty=!0};a.BlockGroup.prototype.recreateIndices=function(c){for(var b=(this.indexBufferData[c*6-1]||-1)+1,d=Math.max(this.children.length,1);c<d;c++){var e=c*6;this.indexBufferData[e+
0]=b;this.indexBufferData[e+1]=b+1;this.indexBufferData[e+2]=b+2;this.indexBufferData[e+3]=b+2;this.indexBufferData[e+4]=b+1;this.indexBufferData[e+5]=b+3;b+=4}b=a.gl;b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,this.indexBuffer);b.bufferData(b.ELEMENT_ARRAY_BUFFER,this.indexBufferData,b.STATIC_DRAW)};a.BlockGroup.prototype.removeBlock=function(){throw"not implemented";};a.BlockGroup.prototype.visit=function(){this.update&&this.update();if(this.visible){this.transform();for(var c=this.children,b=c.length,
d=0;d<b;d++)c[d].visit();c=a.gl;c.bindBuffer(c.ARRAY_BUFFER,this.glBuffer);c.bufferData(c.ARRAY_BUFFER,this.glBufferData,c.STATIC_DRAW);if(this.isChildDirty)this.recreateIndices(0),this.isChildDirty=!1;this.render();this.isFrameDirty=this.isColorDirty=this.isTransformDirty=!1}};a.BlockGroup.prototype.render=function(){var c=a.gl,b=a.selectProgram(a.Block.PROGRAM_NAME[this.program]),d=this.children.length,e=a.Block.QUAD_SIZE;c.bindBuffer(c.ARRAY_BUFFER,this.glBuffer);c.vertexAttribPointer(b.attribs.vertexPositionAttribute,
3,c.FLOAT,!1,e,0);if(this.program!=a.Block.PROGRAM.DEFAULT&&this.program==a.Block.PROGRAM.TEXTURE){var f=a.getAsset("texture",this.texture);c.vertexAttribPointer(b.attribs.textureCoordAttribute,2,c.FLOAT,!1,e,12);c.activeTexture(c.TEXTURE0);c.bindTexture(c.TEXTURE_2D,f.tex);c.uniform1i(b.samplerUniform,0)}c.vertexAttribPointer(b.attribs.vertexColorAttribute,4,c.FLOAT,!1,e,20);c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,this.indexBuffer);c.uniformMatrix4fv(b.mvMatrixUniform,!1,this.mvMatrix);c.drawElements(c.TRIANGLES,
d*6,c.UNSIGNED_SHORT,0)};a.BlockGroup=a.BlockGroup})(window);(function(h){var a=h.ChesterGL,c={frames:{}};c.loadJSON=function(b){if(b.meta&&b.meta.version=="1.0"){var d=b.meta.image;a.loadAsset("texture",d,function(a){var a=a.height,f=b.frames,h;for(h in f){var g=f[h];c.frames[h]={};c.frames[h].frame=quat4.create([g.frame.x,a-(g.frame.y+g.frame.h),g.frame.w,g.frame.h]);c.frames[h].texture=d}})}else throw"Unkown json data";};c.getFrame=function(a){return c.frames[a]};c.loadFrames=function(a){$.ajax({url:a,async:!1,dataType:"json",success:function(a,b){b=="success"&&
c.loadJSON(a)}})};c.getFrame=c.getFrame;c.loadFrames=c.loadFrames;h.ChesterGL.BlockFrames=c})(window);(function(h){var a=h.ChesterGL;a.TMXBlock=function(c){c=a.TMXBlock.maps[c];if(!c)throw"Invalid map - make sure you call loadTMX first";a.Block.call(this,null,a.Block.TYPE.TMXBLOCK);for(var b=0;b<c.layers.length;b++){for(var d=c.layers[b],e=a.webglMode?new a.BlockGroup(c.texture,d.blocks.length):new a.Block,f=0;f<d.blocks.length;f++){var h=d.blocks[f],g=void 0;a.webglMode?g=e.createBlock(h.frame):(g=new a.Block(h.frame),g.setTexture(c.texture));g.moveTo(h.position);e.addChild(g)}this.addChild(e)}};
a.TMXBlock.prototype=Object.create(a.Block.prototype);a.TMXBlock.prototype.render=function(){};a.TMXBlock.prototype.tileSize=null;a.TMXBlock.prototype.mapTileSize=null;a.TMXBlock.prototype.totalTiles=0;a.TMXBlock.prototype.spacing=0;a.TMXBlock.prototype.margin=0;a.TMXBlock.maps={};a.TMXBlock.loadTMX=function(c){a.loadAsset("tmx",{path:c,dataType:"xml"},function(b){var d={},b=$(b).find("map"),e=b.find("tileset").first(),f=b.attr("orientation");if(e){d.tileSize=vec2.create([parseInt(e.attr("tilewidth"),
10),parseInt(e.attr("tileheight"),10)]);d.mapTileSize=vec2.create([parseInt(b.attr("tilewidth"),10),parseInt(b.attr("tileheight"),10)]);e.attr("spacing")&&(d.spacing=parseInt(e.attr("spacing"),10));e.attr("margin")&&(d.margin=parseInt(e.attr("margin"),10));var e=e.find("image").first(),h=vec2.create([parseInt(e.attr("width"),10),parseInt(e.attr("height"),10)]);d.texture=e.attr("source");a.loadAsset("texture",d.texture);d.layers=[];b.find("layer").each(function(a,b){var c={blocks:[]},e=vec2.create([parseInt($(b).attr("width"),
10),parseInt($(b).attr("height"),10)]),i=$(b).find("data").first();if(i){if(i.attr("encoding")!="base64"||i.attr("compression"))throw"Invalid TMX Data";for(var i=i.text().trim(),i=base64.decode(i),o=0,p=0;p<e[1];p++)for(var q=0;q<e[0];q++){var n=((i.charCodeAt(o+3)&255)<<24|(i.charCodeAt(o+2)&255)<<16|(i.charCodeAt(o+1)&255)<<8|i.charCodeAt(o+0)&255)-1,u={},s=d.margin||0,r=d.spacing||0,m=d.tileSize,t=d.mapTileSize,v=parseInt((h[0]-s*2+r)/(m[0]+r),10),n=quat4.create([n%v*(m[0]+r)+s,h[1]-m[1]-s-r-parseInt(n/
v,10)*(m[1]+r)+s,m[0],m[1]]);u.frame=n;if(f=="orthogonal")n=q*t[0]+m[0]/2,m=(e[1]-p-1)*t[1]+m[1]/2;else if(f=="isometric")n=t[0]/2*(e[0]+q-p-1)+m[0]/2,m=t[1]/2*(e[1]*2-q-p-2)+m[1]/2;else throw"Invalid orientation";u.position=[n,m,0];c.blocks.push(u);o+=4}}else throw"No data for layer!";d.layers.push(c)})}a.TMXBlock.maps[c]=d})};a.registerAssetHandler("tmx",function(c,b,d){console.log("tmx loaded: "+c);a.assets.tmx[c].data=b;d&&d(!0)});a.TMXBlock.loadTMX=a.TMXBlock.loadTMX;a.TMXBlock=a.TMXBlock})(window);(function(h){var a=h.ChesterGL;a.Action=function(a,b){this.block=a;this.totalTime=b*1E3;this.elapsed=0};a.Action.prototype.block=null;a.Action.prototype.totalTime=0;a.Action.prototype.elapsed=0;a.Action.prototype.currentTime=0;a.Action.prototype.finished=!1;a.Action.prototype.update=function(a){this.elapsed+=a;if(this.elapsed>=this.totalTime)this.finished=!0};a.MoveAction=function(c,b,d){a.Action.call(this,c,b);this.finalPosition=d;this.startPosition=vec3.create(c.position);this.deltaPosition=vec3.create();
vec3.subtract(this.finalPosition,this.startPosition,this.deltaPosition)};a.MoveAction.prototype=Object.create(a.Action.prototype);a.MoveAction.prototype.finalPosition=null;a.MoveAction.prototype.update=function(c){a.Action.prototype.update.call(this,c);if(this.finished)this.block.moveTo(this.finalPosition);else{var c=Math.min(1,this.elapsed/this.totalTime),b=this.startPosition,d=this.deltaPosition;this.block.moveTo([b[0]+d[0]*c,b[1]+d[1]*c,b[2]+d[2]*c])}};a.ActionManager={};a.ActionManager.scheduledActions_=
[];a.ActionManager.scheduleAction=function(a){this.scheduledActions_.push(a)};a.ActionManager.tick=function(a){for(var b=0,d=this.scheduledActions_.length,b=0;b<d;b++){var e=this.scheduledActions_[b];!e.finished&&e.update(a)}}})(window);
