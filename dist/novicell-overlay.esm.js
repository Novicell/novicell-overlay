export default function e(t){var o=t.selector,i=void 0===o?null:o,n=t.className,s=t.onCreate,r=t.onLoaded,a=t.onDestroy,l=t.overlayElem,d=void 0===l?"":l,c=t.overlayContainer,v=void 0===c?"":c,h=t.overlayContent,u=void 0===h?"":h,y=t.backdrop,p=void 0===y?"":y,m=t.content,f=void 0===m?null:m,C=t.isVideo,E=void 0!==C&&C,b=t.type,L=void 0===b?"":b,k=t.videoId,w=void 0===k?null:k,O=t.element,P=void 0===O?null:O,T=t.autoplay,_=void 0===T?null:T;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.self=this,this.className=n,this.options={},this.selector=i,this.overlayElem=d,this.overlayContainer=v,this.overlayContent=u,this.backdrop=p,this.content=f,this.onCreate=s,this.onLoaded=r,this.onDestroy=a,this.isVideo=E,this.type=L,this.videoId=w,this.element=P,this.content=f,this.autoplay=_,this.create=function(){if("function"==typeof this.onCreate&&this.onCreate(),this.destroy(),this.hasOwnProperty("selector")&&null!==this.selector){var e=document.querySelector(this.selector);if(!e)return void console.warn("novicell.overlay: element does not exist. Please provide a valid selector for use in document.querySelector.");this.content=e.innerHTML,this.constructOverlay()}else if(this.hasOwnProperty("element")&&null!==this.element){if(!this.element)return void console.warn("novicell.overlay: element does not exist. Please provide a valid DOM element.");f=this.element.innerHTML,this.constructOverlay()}else{if(!this.hasOwnProperty("videoId"))return void console.error("novicell.overlay: no content to display! Please set a selector or a url to load.");if(null===this.videoId)return void console.warn("novicell.overlay: video-id is empty. Please provide a video-id for use in video embed code (we support only Vimeo and YouTube).");var t="";if(this.isVideo=!0,"vimeo"==this.type)t="https://player.vimeo.com/video/"+this.videoId+"?autoplay="+this.autoplay;else{if("youtube"!=this.type)return;t="https://www.youtube.com/embed/"+this.videoId+"?autoplay="+this.autoplay+"&rel=0"}var o=document.createElement("iframe");o.setAttribute("src",t),o.setAttribute("frameborder",0),o.setAttribute("allowfullscreen",""),o.setAttribute("width","100%"),o.setAttribute("height","100%"),this.content=o.outerHTML,this.constructOverlay()}},this.destroy=function(){var e=this;document.querySelector("#js-novi-overlay")&&(this.overlayElem.parentElement.removeChild(this.overlayElem),this.backdrop.parentElement.removeChild(this.backdrop),document.removeEventListener("keyup",function(t){e.destroy()}),document.documentElement.classList.remove("no-scroll","novi-overlay--open"),this.isVideo=!1,"function"==typeof this.onDestroy&&this.onDestroy())},this.constructOverlay=function(){this.setupBackdrop(),this.setupOverlay(),this.setupOverlayContainer(),this.setupCloseButton(),document.documentElement.classList.add("no-scroll"),"function"==typeof this.onLoaded&&this.onLoaded()},this.setupBackdrop=function(){var e=this;this.backdrop=document.createElement("div"),this.backdrop.classList.add("novi-backdrop"),this.backdrop.id="js-novi-backdrop",this.backdrop.addEventListener("click",function(t){(t.target.classList.contains("novi-overlay")||t.target.classList.contains("novi-overlay__container"))&&e.destroy()}),document.querySelector("body").appendChild(this.backdrop)},this.setupOverlay=function(){this.overlayElem=document.createElement("div"),this.overlayElem.classList.add("novi-overlay"),this.overlayElem.id="js-novi-overlay",this.hasOwnProperty("className")&&this.overlayElem.classList.add(this.className),this.backdrop.appendChild(this.overlayElem)},this.setupOverlayContainer=function(){this.overlayContainer=document.createElement("div"),this.overlayContainer.classList.add("novi-overlay__container"),this.overlayContent=document.createElement("div"),this.overlayContent.classList.add("novi-overlay__content"),this.isVideo&&this.overlayContent.classList.add("novi-overlay__content--video"),this.overlayContent.innerHTML=this.content,this.overlayContainer.appendChild(this.overlayContent),this.overlayElem.appendChild(this.overlayContainer)},this.setupCloseButton=function(){var e=this,t=document.createElement("button");t.classList.add("novi-overlay-close","button--close"),t.type="button",t.id="js-novi-overlay-close",t.addEventListener("click",function(t){e.destroy()}),document.addEventListener("keydown",function(t){27===t.keyCode&&e.destroy()}),this.overlayContent.appendChild(t)},this.get=function(e){return new Promise(function(t,o){var i=new XMLHttpRequest;i.open("GET",e),i.onload=function(){i.status>=200&&i.status<400?t(i.response):o(Error(i.statusText))},i.onerror=function(){o(Error("Network Error"))},i.send()})}}
