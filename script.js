/* ============ EDIT YOUR FILMS HERE ============
   img:   path to a still (e.g. "img/silat.jpg")  – optional
   video: path to a looping mp4 preview           – optional
   Without them, a cinematic gradient is used.   
   Note: Boleh tukar wide atau duo
   */
const FILMS=[
 {t:"Sementara Ada",cat:"Short Film",yr:"2026",d:"Kisah seorang penghantar makanan, menemui harapan baharu menerusi kerja amal.",
  g:"radial-gradient(60% 70% at 55% 35%,#e8a37a 0,#8a2d45 45%,#2b0a17 100%)",img:"",video:"ASSETS/TEASERSA.mp4",wide:1},
 {t:"Langkah Wanita Di Litar",cat:"Magazine",yr:"2026",d:"Majalah sukan permotoran yang mengetengahkan pelumba wanita.",
  g:"linear-gradient(135deg,#d8d4cf,#4a4846 55%,#0e0e0e)",img:"",video:"ASSETS/TEASER_LWDL.mp4",wide:1}, 
 {t:"COMING SOON",cat:"COMING SOON",yr:"2025",d:"COMING SOON",
  g:"radial-gradient(70% 60% at 50% 40%,#1c3cff 0,#0b1252 55%,#02030f)",img:"",video:"",wide:1},
 {t:"COMING SOON",cat:"COMING SOON",yr:"2026",d:"COMING SOON",
  g:"radial-gradient(60% 70% at 45% 40%,#c71f5d 0,#5a0b34 50%,#12020b)",img:"",video:"",wide:1},
 {t:"COMING SOON",cat:"COMING SOON",yr:"2026",d:"COMING SOON",
  g:"radial-gradient(70% 70% at 50% 45%,#2b6d6d 0,#10393d 50%,#031114)",img:"",video:"",wide:1} 
];
const $=s=>document.querySelector(s);
const media=f=>f.video?`<video src="${f.video}" muted loop autoplay playsinline></video>`:f.img?`<img src="${f.img}" alt="${f.t}">`:`<div class="pic" style="background:${f.g}"></div>`;

/* FIX: Teks besar di tengah gambar dibuang, hanya media dipaparkan */
const card=f=>`<button class="film" data-i="${FILMS.indexOf(f)}" type="button"><div class="frame">${media(f)}</div>
<div class="cap"><div><b>${f.t}</b><em>${f.d}</em></div><span>${f.cat}</span><span>${f.yr}</span></div></button>`;

let html="",i=0;
while(i<FILMS.length){
  if(FILMS[i].duo&&FILMS[i+1]&&FILMS[i+1].duo){html+=`<div class="duo">${card(FILMS[i])}${card(FILMS[i+1])}</div>`;i+=2}
  else{html+=card(FILMS[i]);i++}
}
$("#films").innerHTML=html;

/* timecode */
const tc=$("#tc"),t0=performance.now();
setInterval(()=>{const s=(performance.now()-t0)/1000,p=n=>String(n|0).padStart(2,"0");
  if(tc) tc.textContent=`${p(s/3600)}:${p(s/60%60)}:${p(s%60)}:${p((s%1)*24)}`},42);

/* torchlight reveal */
const hero=$("#top");let tx=50,ty=50,auto=true,t=0;
const set=(x,y)=>{hero.style.setProperty("--mx",x+"px");hero.style.setProperty("--my",y+"px")};
if(hero) {
  hero.addEventListener("pointermove",e=>{auto=false;const r=hero.getBoundingClientRect();set(e.clientX-r.left,e.clientY-r.top)});
  hero.addEventListener("pointerleave",()=>auto=true);
  (function loop(){ if(auto){t+=.008;const r=hero.getBoundingClientRect();
    set(r.width*(.5+.32*Math.sin(t)),r.height*(.42+.12*Math.cos(t*1.7)))} requestAnimationFrame(loop)})();
}

/* cursor */
const cur=$("#cur");
if(cur) {
  addEventListener("pointermove",e=>{cur.style.transform=`translate(${e.clientX}px,${e.clientY}px)`});
  document.addEventListener("pointerover",e=>cur.classList.toggle("big",!!e.target.closest(".film")));
}

/* projector */
const proj=$("#proj");let last=null;
function open(i){
  const f=FILMS[i];
  last=document.activeElement;
  
  const pbg = $("#pbg");
  // Render video without controls and muted for seamless background autoplay
  if (f.video) {
    pbg.innerHTML = `<video src="${f.video}" autoplay loop muted playsinline style="width:100%; height:100%; object-fit:cover; position:absolute; inset:0; z-index:1;"></video>`;
    pbg.style.background = "#000"; 
  } else {
    pbg.innerHTML = "";
    pbg.style.background = f.img ? `url(${f.img}) center/cover` : f.g;
  }

  $("#pt").textContent=f.t;$("#pd").textContent=f.d;$("#pm").textContent=f.cat+" · "+f.yr;
  proj.classList.add("open");document.body.style.overflow="hidden";$("#close").focus();
}

function close(){
  proj.classList.remove("open");
  document.body.style.overflow="";
  // Clear HTML to stop video automatically when closed
  $("#pbg").innerHTML = ""; 
  last&&last.focus();
}

if($("#films")) $("#films").addEventListener("click",e=>{const b=e.target.closest(".film");if(b)open(+b.dataset.i)});
if($("#close")) $("#close").onclick=close;
addEventListener("keydown",e=>{if(e.key==="Escape")close()});

/* copy email */
if($("#mail")) {
  $("#mail").onclick=async e=>{const b=e.currentTarget,o=b.textContent;
    try{await navigator.clipboard.writeText(o)}catch(_){}
    b.textContent="Copied. Talk soon.";setTimeout(()=>b.textContent=o,1800);
    location.href="mailto:"+o};
}

/* Hilangkan blur bila di bawah, munculkan bila skrol naik */
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
    if (currentScroll >= maxScroll - 10) {
      botLens.style.opacity = "0";
    } else if (currentScroll < lastScroll) {
      botLens.style.opacity = "1";
    }
    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  }, { passive: true });
}