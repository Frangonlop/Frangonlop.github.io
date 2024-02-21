var S=(r,i,t)=>{if(!i.has(r))throw TypeError("Cannot "+t)};var s=(r,i,t)=>(S(r,i,"read from private field"),t?t.call(r):i.get(r)),g=(r,i,t)=>{if(i.has(r))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(r):i.set(r,t)},f=(r,i,t,a)=>(S(r,i,"write to private field"),a?a.call(r,t):i.set(r,t),t);(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const e of o.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&a(e)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();var D=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function G(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var j={exports:{}};/*!
 * Toastify js 1.12.0
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */(function(r){(function(i,t){r.exports?r.exports=t():i.Toastify=t()})(D,function(i){var t=function(e){return new t.lib.init(e)},a="1.12.0";t.defaults={oldestFirst:!0,text:"Toastify is awesome!",node:void 0,duration:3e3,selector:void 0,callback:function(){},destination:void 0,newWindow:!1,close:!1,gravity:"toastify-top",positionLeft:!1,position:"",backgroundColor:"",avatar:"",className:"",stopOnFocus:!0,onClick:function(){},offset:{x:0,y:0},escapeMarkup:!0,ariaLive:"polite",style:{background:""}},t.lib=t.prototype={toastify:a,constructor:t,init:function(e){return e||(e={}),this.options={},this.toastElement=null,this.options.text=e.text||t.defaults.text,this.options.node=e.node||t.defaults.node,this.options.duration=e.duration===0?0:e.duration||t.defaults.duration,this.options.selector=e.selector||t.defaults.selector,this.options.callback=e.callback||t.defaults.callback,this.options.destination=e.destination||t.defaults.destination,this.options.newWindow=e.newWindow||t.defaults.newWindow,this.options.close=e.close||t.defaults.close,this.options.gravity=e.gravity==="bottom"?"toastify-bottom":t.defaults.gravity,this.options.positionLeft=e.positionLeft||t.defaults.positionLeft,this.options.position=e.position||t.defaults.position,this.options.backgroundColor=e.backgroundColor||t.defaults.backgroundColor,this.options.avatar=e.avatar||t.defaults.avatar,this.options.className=e.className||t.defaults.className,this.options.stopOnFocus=e.stopOnFocus===void 0?t.defaults.stopOnFocus:e.stopOnFocus,this.options.onClick=e.onClick||t.defaults.onClick,this.options.offset=e.offset||t.defaults.offset,this.options.escapeMarkup=e.escapeMarkup!==void 0?e.escapeMarkup:t.defaults.escapeMarkup,this.options.ariaLive=e.ariaLive||t.defaults.ariaLive,this.options.style=e.style||t.defaults.style,e.backgroundColor&&(this.options.style.background=e.backgroundColor),this},buildToast:function(){if(!this.options)throw"Toastify is not initialized";var e=document.createElement("div");e.className="toastify on "+this.options.className,this.options.position?e.className+=" toastify-"+this.options.position:this.options.positionLeft===!0?(e.className+=" toastify-left",console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.")):e.className+=" toastify-right",e.className+=" "+this.options.gravity,this.options.backgroundColor&&console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');for(var d in this.options.style)e.style[d]=this.options.style[d];if(this.options.ariaLive&&e.setAttribute("aria-live",this.options.ariaLive),this.options.node&&this.options.node.nodeType===Node.ELEMENT_NODE)e.appendChild(this.options.node);else if(this.options.escapeMarkup?e.innerText=this.options.text:e.innerHTML=this.options.text,this.options.avatar!==""){var w=document.createElement("img");w.src=this.options.avatar,w.className="toastify-avatar",this.options.position=="left"||this.options.positionLeft===!0?e.appendChild(w):e.insertAdjacentElement("afterbegin",w)}if(this.options.close===!0){var u=document.createElement("button");u.type="button",u.setAttribute("aria-label","Close"),u.className="toast-close",u.innerHTML="&#10006;",u.addEventListener("click",(function(T){T.stopPropagation(),this.removeElement(this.toastElement),window.clearTimeout(this.toastElement.timeOutValue)}).bind(this));var c=window.innerWidth>0?window.innerWidth:screen.width;(this.options.position=="left"||this.options.positionLeft===!0)&&c>360?e.insertAdjacentElement("afterbegin",u):e.appendChild(u)}if(this.options.stopOnFocus&&this.options.duration>0){var m=this;e.addEventListener("mouseover",function(T){window.clearTimeout(e.timeOutValue)}),e.addEventListener("mouseleave",function(){e.timeOutValue=window.setTimeout(function(){m.removeElement(e)},m.options.duration)})}if(typeof this.options.destination<"u"&&e.addEventListener("click",(function(T){T.stopPropagation(),this.options.newWindow===!0?window.open(this.options.destination,"_blank"):window.location=this.options.destination}).bind(this)),typeof this.options.onClick=="function"&&typeof this.options.destination>"u"&&e.addEventListener("click",(function(T){T.stopPropagation(),this.options.onClick()}).bind(this)),typeof this.options.offset=="object"){var L=n("x",this.options),k=n("y",this.options),F=this.options.position=="left"?L:"-"+L,W=this.options.gravity=="toastify-top"?k:"-"+k;e.style.transform="translate("+F+","+W+")"}return e},showToast:function(){this.toastElement=this.buildToast();var e;if(typeof this.options.selector=="string"?e=document.getElementById(this.options.selector):this.options.selector instanceof HTMLElement||typeof ShadowRoot<"u"&&this.options.selector instanceof ShadowRoot?e=this.options.selector:e=document.body,!e)throw"Root element is not defined";var d=t.defaults.oldestFirst?e.firstChild:e.lastChild;return e.insertBefore(this.toastElement,d),t.reposition(),this.options.duration>0&&(this.toastElement.timeOutValue=window.setTimeout((function(){this.removeElement(this.toastElement)}).bind(this),this.options.duration)),this},hideToast:function(){this.toastElement.timeOutValue&&clearTimeout(this.toastElement.timeOutValue),this.removeElement(this.toastElement)},removeElement:function(e){e.className=e.className.replace(" on",""),window.setTimeout((function(){this.options.node&&this.options.node.parentNode&&this.options.node.parentNode.removeChild(this.options.node),e.parentNode&&e.parentNode.removeChild(e),this.options.callback.call(e),t.reposition()}).bind(this),400)}},t.reposition=function(){for(var e={top:15,bottom:15},d={top:15,bottom:15},w={top:15,bottom:15},u=document.getElementsByClassName("toastify"),c,m=0;m<u.length;m++){o(u[m],"toastify-top")===!0?c="toastify-top":c="toastify-bottom";var L=u[m].offsetHeight;c=c.substr(9,c.length-1);var k=15,F=window.innerWidth>0?window.innerWidth:screen.width;F<=360?(u[m].style[c]=w[c]+"px",w[c]+=L+k):o(u[m],"toastify-left")===!0?(u[m].style[c]=e[c]+"px",e[c]+=L+k):(u[m].style[c]=d[c]+"px",d[c]+=L+k)}return this};function n(e,d){return d.offset[e]?isNaN(d.offset[e])?d.offset[e]:d.offset[e]+"px":"0px"}function o(e,d){return!e||typeof d!="string"?!1:!!(e.className&&e.className.trim().split(/\s+/gi).indexOf(d)>-1)}return t.lib.init.prototype=t.lib,t})})(j);var A=j.exports;const I=G(A);var N,E;class H{constructor(i="marcador"){g(this,N,void 0);g(this,E,[{name:"X",puntos:0},{name:"O",puntos:0}]);f(this,N,i),this.imprimir()}addPuntos(i){let t=s(this,E).find(a=>a.name===i);t.puntos++,this.imprimir()}imprimir(){let i=document.getElementById(s(this,N)),t=document.createElement("ul");s(this,E).forEach(a=>{let n=document.createElement("li");n.textContent=`Jugador ${a.name} tiene ${a.puntos} puntos`,t.append(n)}),i.innerHTML="",i.append(t)}resetMarcador(){s(this,E).forEach(i=>{i.puntos=0}),this.imprimir()}getGanador(){const i=s(this,E).find(a=>a.name==="X").puntos,t=s(this,E).find(a=>a.name==="O").puntos;return i>t?"X":t>i?"O":"Empate"}}N=new WeakMap,E=new WeakMap;var h,l,p,x,C,B,v,M;class ${constructor(i=3,t=!1,a){g(this,h,void 0);g(this,l,void 0);g(this,p,void 0);g(this,x,void 0);g(this,C,void 0);g(this,B,void 0);g(this,v,!1);g(this,M,void 0);f(this,h,new Array),f(this,l,i),f(this,B,t),f(this,M,a);for(let n=0;n<s(this,l);n++){s(this,h)[n]=new Array;for(let o=0;o<s(this,l);o++)s(this,h)[n][o]=null}f(this,p,"X"),f(this,C,new H)}imprimir(i="tablero"){let t=document.getElementById(i);f(this,x,i),t.innerHTML="";for(let a=0;a<s(this,l);a++)for(let n=0;n<s(this,l);n++){let o=document.createElement("div");o.dataset.fila=a,o.dataset.columna=n,o.dataset.libre="",s(this,h)[a][n]&&(o.textContent=s(this,h)[a][n],o.dataset.libre=s(this,h)[a][n]),t.appendChild(o),this.addEventClick(o)}t.style.gridTemplateColumns=`repeat(${s(this,l)}, 1fr)`}isFree(i,t){return s(this,h)[i][t]===null}setCasilla(i,t,a){if(this.isFree(i,t)){const n=new Date,o=n.getHours().toString().padStart(2,"0"),e=n.getMinutes().toString().padStart(2,"0"),d=n.getSeconds().toString().padStart(2,"0"),w=`${o}:${e}:${d}`;s(this,h)[i][t]=a;let u=document.getElementById("registro");return u.innerHTML+=`El jugador ${a} ha puesto una ficha en la casilla ${i},${t} a las ${w}<br>`,!0}return!1}getCasilla(i,t){return s(this,h)[i][t]}toogleTurno(){if(s(this,v))return!1;if(s(this,p)==="X"){if(f(this,p,"O"),s(this,B)){let i=this.getCasillaFreeRandom();if(this.setCasilla(i.i,i.j,"O"),this.imprimir(),this.comprobarResultados(),s(this,v))return!1;this.toogleTurno()}}else f(this,p,"X")}comprobarResultados(){let i,t,a=!1;for(i=0;i<s(this,l)&&!a;i++){let o=0;for(t=0;t<s(this,l);t++)t!==0&&this.getCasilla(i,t)===this.getCasilla(i,t-1)&&this.getCasilla(i,t)!==null&&o++;o===s(this,l)-1&&(console.log("Linea"),a=!0)}for(t=0;t<s(this,l)&&!a;t++){let o=0;for(i=0;i<s(this,l);i++)i!==0&&this.getCasilla(i,t)===this.getCasilla(i-1,t)&&this.getCasilla(i,t)!==null&&o++;o===s(this,l)-1&&(console.log("Columna"),a=!0)}let n=0;for(let o=0;o<s(this,l);o++)o!==0&&this.getCasilla(o,o)===this.getCasilla(o-1,o-1)&&this.getCasilla(o,o)!==null&&n++;n===s(this,l)-1&&(console.log("Diagonal de izq a derecha"),a=!0),n=0;for(let o=s(this,l)-1;o>=0;o--)if(o!==s(this,l)-1){let e=s(this,l)-1-o;this.getCasilla(o,e)===this.getCasilla(o+1,e-1)&&this.getCasilla(o,e)!==null&&n++}n===s(this,l)-1&&(console.log("Diagonal de derecha a izquierda"),a=!0),a?(f(this,v,!0),I({text:`Ha ganado el jugador ${s(this,p)}`,newWindow:!0,close:!0,gravity:"top",position:"center",stopOnFocus:!0,style:{background:"blue"},onClick:function(){}}).showToast(),document.querySelectorAll('div[data-libre=""]').forEach(e=>{e.dataset.libre="-"}),s(this,C).addPuntos(s(this,p))):this.isFull()&&(I({text:"Han sido tablas",newWindow:!0,close:!0,gravity:"top",position:"center",stopOnFocus:!0,style:{background:"blue"},onClick:function(){}}).showToast(),f(this,v,!0))}isFull(){return!s(this,h).some(i=>i.some(t=>t===null))}addEventClick(i){i.addEventListener("click",t=>{let a=t.currentTarget;a.dataset.libre===""&&(a.textContent=s(this,p),this.setCasilla(a.dataset.fila,a.dataset.columna,s(this,p)),a.dataset.libre=s(this,p),this.comprobarResultados(),this.toogleTurno())}),i.addEventListener("mouseover",t=>{t.currentTarget.dataset.libre===""&&(t.currentTarget.textContent=s(this,p))}),i.addEventListener("mouseleave",t=>{t.currentTarget.dataset.libre===""&&(t.currentTarget.textContent="")})}get dimension(){return s(this,l)}get elementID(){return s(this,x)}limpiar(){f(this,h,s(this,h).map(i=>i.map(t=>null))),f(this,v,!1),this.imprimir(),document.getElementById("registro").textContent="",document.getElementById("ganador").textContent="",document.getElementById("ganador").style.backgroundColor="transparent",document.querySelector(".clearGame").classList.remove("show")}getCasillaFreeRandom(){let i,t;do i=Math.floor(Math.random()*s(this,l)),t=Math.floor(Math.random()*s(this,l));while(!this.isFree(i,t));return{i,j:t}}async jugarRondas(i){s(this,C).resetMarcador();let t=0;for(;t<i;){for(this.limpiar(),this.imprimir();!s(this,v);)await new Promise(n=>setTimeout(n,1e3));t++,f(this,v,!1)}const a=s(this,C).getGanador();document.getElementById("ganador").textContent=`El ganador de todas las rondas es: ${a}`,document.getElementById("ganador").style.backgroundColor="#fff45a9f",document.querySelector(".clearGame").classList.add("show")}}h=new WeakMap,l=new WeakMap,p=new WeakMap,x=new WeakMap,C=new WeakMap,B=new WeakMap,v=new WeakMap,M=new WeakMap;const q=document.getElementById("createTable"),y=document.getElementById("dimension"),V=document.getElementById("resetGame"),X=document.querySelectorAll(".clearGameButton"),P=document.querySelector(".preGame"),R=document.querySelector(".inGame"),b=document.getElementById("rondas");let O;document.getElementById("option1").addEventListener("click",()=>{document.body.style.backgroundImage="url('img/fondo1.webp')"});document.getElementById("option2").addEventListener("click",()=>{document.body.style.backgroundImage="url('img/fondo2.jpg')"});document.getElementById("option3").addEventListener("click",()=>{document.body.style.backgroundImage="url('img/lavidaesuna.jpeg')"});q.addEventListener("click",r=>{if(!y.value)return I({text:"Debe indicar una dimensión válida",duration:3e3,newWindow:!1,close:!0,gravity:"top",position:"right",stopOnFocus:!0,style:{background:"red"},onClick:function(){}}).showToast(),y.classList.add("error"),y.focus(),!1;if(isNaN(y.value))return I({text:"Debe introducir un número válido",duration:3e3,newWindow:!0,close:!0,gravity:"top",position:"right",stopOnFocus:!0,style:{background:"red"},onClick:function(){}}).showToast(),y.classList.add("error"),y.focus(),!1;if(!b.value||isNaN(b.value))return I({text:"Debe indicar un número de rondas válido",duration:3e3,newWindow:!1,close:!0,gravity:"top",position:"right",stopOnFocus:!0,style:{background:"red"},onClick:function(){}}).showToast(),b.classList.add("error"),b.focus(),!1;let i=document.getElementById("machine");O=new $(parseInt(y.value),i.checked,parseInt(b.value)),O.jugarRondas(parseInt(b.value)),P.classList.toggle("hide"),R.classList.toggle("hide")});y.addEventListener("keydown",()=>{y.classList.remove("error")});b.addEventListener("keydown",()=>{b.classList.remove("error")});for(let r of X)r.addEventListener("click",()=>{O.limpiar(),O.jugarRondas(parseInt(b.value))});V.addEventListener("click",r=>{document.getElementById("registro").textContent="",document.getElementById(O.elementID).innerHTML="",document.getElementById("marcador").innerHTML="",document.getElementById("ganador").textContent="",document.getElementById("ganador").style.backgroundColor="transparent",document.querySelector(".clearGame").classList.remove("show"),O=null,P.classList.toggle("hide"),R.classList.toggle("hide"),y.value="",b.value="",y.focus()});
