/* ============ EDIT YOUR STORY HERE (placeholders – replace with the real ones) ============
   y: year · t: title · d: description · m: place / issuer
   img: path to your photo or certificate image (e.g. "img/2025-set.jpg") – optional */
const PHOTOS=[
 {y:2026,t:"Behind the lens",d:"Replace this with the story of this photo – where you were, who you were with and what it meant.",m:"Location",img:"",g:"radial-gradient(60% 70% at 50% 40%,#c71f5d,#3a0a22 60%,#0a0105)"},
 {y:2025,t:"On set",d:"A moment from a shoot that changed how you see filmmaking.",m:"Location",img:"",g:"radial-gradient(60% 70% at 40% 40%,#e8a37a,#6d2540 55%,#12040b)"},
 {y:2025,t:"The first screening",d:"The day people watched your work in a dark room together.",m:"Location",img:"",g:"radial-gradient(60% 70% at 55% 40%,#1c3cff,#0b1252 60%,#02030f)"},
 {y:2024,t:"Learning the craft",d:"Film school, late nights and the first projects that went wrong in useful ways.",m:"Location",img:"",g:"radial-gradient(60% 70% at 50% 40%,#2b6d6d,#10393d 60%,#031114)"},
 {y:2023,t:"Where it started",d:"The first camera, the first idea, the first reason to keep going.",m:"Location",img:"",g:"linear-gradient(135deg,#d8d4cf,#4a4846 55%,#0e0e0e)"}
];
const CERTS=[
 {y:2026,t:"Certificate title",d:"What you achieved and what it proves. Add a short line about the programme or award.",m:"Issued by – Organisation",img:"",g:"linear-gradient(135deg,#2a2927,#0c0c0c)"},
 {y:2025,t:"Certificate title",d:"Festival selection, workshop, course or competition result.",m:"Issued by – Organisation",img:"",g:"linear-gradient(135deg,#3a1226,#0c0c0c)"},
 {y:2024,t:"Certificate title",d:"Your first recognised step in film.",m:"Issued by – Organisation",img:"",g:"linear-gradient(135deg,#122044,#0c0c0c)"}
];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function render(list,el){
  const years=[...new Set(list.map(x=>x.y))].sort((a,b)=>b-a);
  el.innerHTML=years.map(y=>`<section class="yr"><h2 class="num">${y}</h2>`+
    list.filter(x=>x.y===y).map(x=>`<article class="row"><div class="ph">${x.img?`<img src="${esc(x.img)}" alt="${esc(x.t)}">`:`<div class="pic" style="background:${x.g}"></div>`}</div>
    <div class="tx"><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p><small>${esc(x.m)}</small></div></article>`).join("")+`</section>`).join("");
}
const views={photos:document.getElementById("photos"),certs:document.getElementById("certs")};
render(PHOTOS,views.photos);render(CERTS,views.certs);
function show(k){
  for(const n in views){views[n].hidden=n!==k;document.getElementById("t-"+n).setAttribute("aria-pressed",n===k)}
  history.replaceState(null,"","#"+k);
}
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>show(b.dataset.v));
show(location.hash==="#certs"?"certs":"photos");

/* FIX: Hilangkan blur bila di bawah, munculkan bila skrol naik (Untuk Know-Me page) */
const botLens = document.querySelector(".lens.bot");
if (botLens) {
  botLens.style.transition = "opacity 0.4s ease";
  let lastScroll = window.scrollY;
  window.addEventListener("scroll", () => {
    let currentScroll = window.scrollY;
    let docHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    let maxScroll = docHeight - window.innerHeight;
    
    // Toleransi 10px supaya tak tersangkut pada peranti mobile
    if (currentScroll >= maxScroll - 10) {
      botLens.style.opacity = "0";
    } else if (currentScroll < lastScroll) {
      botLens.style.opacity = "1";
    }
    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  }, { passive: true });
}