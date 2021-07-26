(()=>{"use strict";class t extends class{constructor(t){this.mWebglRenderVo=t}get x(){return this.$x}set x(t){this.$x=t,this.render()}get y(){return this.$y}set y(t){this.$y=t,this.render()}get width(){return this.$width}set width(t){this.$width=t,this.render()}get height(){return this.$height}set height(t){this.$height=t,this.render()}get visible(){return this.$visible}set visible(t){this.$visible=t,this.render()}get alpha(){return this.$alpha}set alpha(t){this.$alpha=t,this.render()}get scaleX(){return this.$scaleX}set scaleX(t){this.$scaleX=t,this.render()}get scaleY(){return this.$scaleY}set scaleY(t){this.$scaleY=t,this.render()}get rotation(){return this.$rotation}set rotation(t){this.$rotation=t,this.render()}render(){}}{constructor(t){super(t),this.rotationValues=[],this.color=[Math.random(),Math.random(),Math.random()]}transform(t,e,i,r,n){this.$x=t,this.$y=e,this.$width=i,this.$height=r,this.$rotation=n,this.render()}scale(t,e){this.$scaleX=t,this.$scaleY=e,this.render()}render(){let t=this.mWebglRenderVo,e=t.gl,i=t.colorUniformLocation,r=t.translationLocation,n=t.rotationLocation,o=t.scaleLocation;this.setRectangle(e,0,0,this.$width,this.$height),e.uniform4f(i,this.color[0],this.color[1],this.color[2],1),e.uniform2fv(r,[this.$x,this.$y]);var s=(360-this.$rotation)*Math.PI/180;this.rotationValues[0]=Math.sin(s),this.rotationValues[1]=Math.cos(s),e.uniform2fv(n,this.rotationValues),e.uniform2fv(o,[this.$scaleX,this.$scaleY]);var a=e.TRIANGLES;e.drawArrays(a,0,6)}setRectangle(t,e,i,r,n){var o=e,s=e+r,a=i,h=i+n;t.bufferData(t.ARRAY_BUFFER,new Float32Array([o,a,s,a,o,h,o,h,s,a,s,h]),t.STATIC_DRAW)}}class e{}class i{constructor(t=null,e=null,i=null,r=!1){this.once=!1,this._id=0,this.setTo(t,e,i,r)}setTo(t,e,r,n=!1){return this._id=i._gid++,this.caller=t,this.method=e,this.args=r,this.once=n,this}run(){if(null==this.method)return null;var t,e=this._id;return t=this.args?this.method.apply(this.caller,this.args):this.method.apply(this.caller),this._id===e&&this.once&&this.recover(),t}runWith(t){if(null==this.method)return null;var e=this._id;if(null==t)var i=this.method.apply(this.caller,this.args);else i=this.args||t.unshift?this.args?this.method.apply(this.caller,this.args.concat(t)):this.method.apply(this.caller,t):this.method.call(this.caller,t);return this._id===e&&this.once&&this.recover(),i}clear(){return this.caller=null,this.method=null,this.args=null,this}recover(){this._id>0&&(this._id=0)}static create(t,e,r=null,n=!0){return new i(t,e,r,n)}}var r;i._gid=0,function(t){class e{constructor(){this.eventMap={}}on(t,e,r,n=null,o=!0){let s=this.eventMap[t];if(s){if(this.getHandler(t,e,r))return}else this.eventMap[t]=s=[];s.push(i.create(r,e,n,o))}off(t,e,i){let r=this.eventMap[t];if(r)for(let t=r.length-1;t>=0;t--){let n=r[t];if(n.caller==i&&e==n.method)return void r.splice(t,1)}}getHandler(t,e,i){let r=this.eventMap[t];if(r)for(let t=r.length-1;t>=0;t--){let n=r[t];if(n.caller==i&&e==n.method)return n}return null}send(t,e=null){let i=this.eventMap[t];if(console.log("发送事件",t),i){console.log("有监听",t);for(let t of i)e?t.runWith(e):t.run()}}}e.ERROR="ERROR",e.COMPLETE="COMPLETE",t.EventDispatcher=e;class r extends t.EventDispatcher{load(t,e){}}t.Loader=r;class n{constructor(t,e,i){this.source=null,this.audioBuffer=null;let r=this;r.ctx=t,r.url=i,t.decodeAudioData(e,(function(t){r.audioBuffer=t,r.playSound()}),(function(t){window.alert(t)}))}stopSound(){let t=this.source;t&&t.stop(0)}playSound(){let t=this.source,e=this.ctx;t=e.createBufferSource();let i=this.analyser=e.createAnalyser();i.fftSize=512,t.connect(i),i.connect(e.destination),t.buffer=this.audioBuffer,t.loop=!0,t.connect(e.destination),t.start(0)}getAnalyser(){let t=this.analyser;if(t){var e=new Uint8Array(t.frequencyBinCount);return t.getByteFrequencyData(e),e}return null}}t.WebAudio=n;class o extends t.EventDispatcher{constructor(){super(),this._dataCache={},this.__loadingSound={},this.webAudioEnabled=window.AudioContext||window.webkitAudioContext||window.mozAudioContext||window.msAudioContext,this.sounds={},this.ctx=this.webAudioEnabled?new(window.AudioContext||window.webkitAudioContext||window.mozAudioContext||window.msAudioContext):void 0,this.ctx||window.alert("ctx报错")}play(t){let i=this;if(!i.sounds[t]){var r=this.mXMLHttpRequest;this.mXMLHttpRequest||(r=new XMLHttpRequest),r.open("GET",t,!0),r.responseType="arraybuffer",r.onload=function(){i.data=r.response;let o=new n(i.ctx,i.data,t);i.sounds[t]=o,i.send(e.COMPLETE)},r.onerror=function(r){i.__loadingSound[t]=!1,i.send(e.ERROR)},r.send()}}getSound(t){return this.sounds[t]}}t.SoundMgr=o}(r||(r={}));class n{constructor(){this.vertexShaderSource="\n    attribute vec2 a_position;\n\n    uniform vec2 u_resolution;\n    uniform vec2 u_translation;\n    uniform vec2 u_rotation;\n    uniform vec2 u_scale;\n    \n    void main() {\n      // Scale the position\n      vec2 scaledPosition = a_position * u_scale;\n    \n      // Rotate the position\n      vec2 rotatedPosition = vec2(\n         scaledPosition.x * u_rotation.y + scaledPosition.y * u_rotation.x,\n         scaledPosition.y * u_rotation.y - scaledPosition.x * u_rotation.x);\n    \n      // Add in the translation.\n      vec2 position = rotatedPosition + u_translation;\n    \n      // convert the position from pixels to 0.0 to 1.0\n      vec2 zeroToOne = position / u_resolution;\n    \n      // convert from 0->1 to 0->2\n      vec2 zeroToTwo = zeroToOne * 2.0;\n    \n      // convert from 0->2 to -1->+1 (clipspace)\n      vec2 clipSpace = zeroToTwo - 1.0;\n    \n      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\n    }\n\n",this.fragmentShaderSource="\n    precision mediump float;\n\n    uniform vec4 u_color;\n    \n    void main() {\n        //vec4(1.0, 0.5, 0.2, 1.0);\n       gl_FragColor =u_color; \n    }\n",this.direction=1,this.postion=[0,0],this.width=25,this.lenth=256,this.speed=1;const t=document.getElementById("glcanvas");var e=window.innerWidth;t.style.width=e+"px",t.offsetWidth,t.style.marginLeft="0px";let i=this;t.onmousedown=()=>{let t=i.mSoundMgr;t||(i.mSoundMgr=t=new r.SoundMgr);let e="./sounds/2.mp3";t.on(r.EventDispatcher.COMPLETE,i.onSound,i,[e]),t.play(e)};var n=window.innerHeight;t.style.height=n+"px",t.offsetHeight,t.style.marginTop="0px",this.init(),this.render()}onSound(t){let e=this.mSoundMgr.getSound(t);setInterval((()=>{let t=e.getAnalyser();t&&(this.lenth=t.length,this.barHeights=t,this.render())}),30)}init(){const t=document.getElementById("glcanvas");var i=t.offsetWidth,r=(window.innerWidth-i)/2;t.style.left=r+"px";const n=t.getContext("webgl");if(window.onkeydown=t=>{switch(console.log("---"+t.code),t.code){case"ArrowLeft":this.direction=0;break;case"ArrowRight":this.direction=2;break;case"ArrowUp":this.direction=3;break;case"ArrowDown":this.direction=1}},!n)return void alert("Unable to initialize WebGL. Your browser or machine may not support it.");var o=this.createShader(n,n.VERTEX_SHADER,this.vertexShaderSource),s=this.createShader(n,n.FRAGMENT_SHADER,this.fragmentShaderSource),a=this.createProgram(n,o,s),h=n.getAttribLocation(a,"a_position"),l=n.getUniformLocation(a,"u_resolution"),c=n.getUniformLocation(a,"u_color"),d=n.getUniformLocation(a,"u_translation"),u=n.getUniformLocation(a,"u_rotation"),f=n.getUniformLocation(a,"u_scale"),g=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,g),webglUtils.resizeCanvasToDisplaySize(n.canvas),n.viewport(0,0,n.canvas.width,n.canvas.height),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.useProgram(a),n.enableVertexAttribArray(h),n.bindBuffer(n.ARRAY_BUFFER,g);var m=n.FLOAT;n.vertexAttribPointer(h,2,m,!1,0,0),n.uniform2f(l,n.canvas.width,n.canvas.height);let v=this.renderVo=new e;v.gl=n,v.colorUniformLocation=c,v.rotationLocation=u,v.translationLocation=d,v.scaleLocation=f}gameTick(){let t=this.postion,e=this.direction;console.log(e);let i=this.speed;switch(e){case 0:t[0]-=i;break;case 1:t[1]+=i;break;case 2:t[0]+=i;break;case 3:t[1]-=i}this.move(t[0],t[1])}move(t,e){this.render()}render(){let e=this.lenth-75;if(!this.lineList){let i=window.innerWidth,r=window.innerHeight,n=.005*i,o=.3*r;this.lineList=[];let s=[Math.random(),Math.random(),1];for(let a=0;a<e;a++){let h=new t(this.renderVo);h.transform(i/2+(a-e/2)*n,r/2+r/4,n,o,0),h.color=s,this.lineList.push(h)}}let i=this.barHeights;for(let t=0;t<e;t++){let e=this.lineList[t],r=(i?i[t]:256*Math.random())/256;e.color[2]=r,e.scale(1,-r)}}renderPoints(t,e,i,r,n){t.bufferData(t.ARRAY_BUFFER,new Float32Array([e,i]),t.STATIC_DRAW),t.uniform4f(n,Math.random(),Math.random(),Math.random(),1);var o=t.POINTS;t.drawArrays(o,0,1)}renderTriangles(t,e,i,r,n){t.bindBuffer(t.ARRAY_BUFFER,e);var o=t.FLOAT,s=0;t.vertexAttribPointer(i,2,o,!1,0,s),t.uniform2f(r,t.canvas.width,t.canvas.height);var a=t.TRIANGLES;s=0,t.uniform4f(n,1,.5,.2,1),t.drawArrays(a,s,6)}createPointBuffer(t){var e=[];for(let t=0;t<500;t+=100)for(let i=0;i<500;i+=100)e.push(i,t);console.log(e);let i=t.createBuffer();return t.bindBuffer(t.ARRAY_BUFFER,i),t.bufferData(t.ARRAY_BUFFER,new Float32Array(e),t.STATIC_DRAW),i}createBuffer(t,e,i,r,n){var o=e+r,s=i+n;let a=[e,i,o,i,e,s,e,s,o,i,o,s],h=t.createBuffer();return t.bindBuffer(t.ARRAY_BUFFER,h),t.bufferData(t.ARRAY_BUFFER,new Float32Array(a),t.STATIC_DRAW),h}createShader(t,e,i){var r=t.createShader(e);return t.shaderSource(r,i),t.compileShader(r),t.getShaderParameter(r,t.COMPILE_STATUS)?r:(console.log(t.getShaderInfoLog(r)),t.deleteShader(r),null)}createProgram(t,e,i){var r=t.createProgram();return t.attachShader(r,e),t.attachShader(r,i),t.linkProgram(r),t.getProgramParameter(r,t.LINK_STATUS)?r:(console.log(t.getProgramInfoLog(r)),t.deleteProgram(r),null)}}new class{constructor(){new n}}})();