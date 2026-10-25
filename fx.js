/* fx.js – moving light highlight on liquid-glass elements */
document.addEventListener("pointermove",function(e){
  var g=e.target.closest&&e.target.closest(".glass");if(!g)return;
  var r=g.getBoundingClientRect();
  g.style.setProperty("--gx",(e.clientX-r.left)+"px");
  g.style.setProperty("--gy",(e.clientY-r.top)+"px");
});
