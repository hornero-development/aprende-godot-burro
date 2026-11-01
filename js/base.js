/* =================== utilidades =================== */
function esc(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function hl(code){
  const re=/(#.*$)|("(?:[^"\\]|\\.)*")|(\$[A-Za-z_\/]+)|(@\w+)|\b(extends|func|var|const|if|else|elif|for|in|return|await|true|false|and|or|not|signal|pass|is)\b|\b(\d+\.?\d*)\b|\b([A-Za-z_]\w*)(?=\()/gm;
  let out="",last=0,m;
  while((m=re.exec(code))){out+=esc(code.slice(last,m.index));
    const cls=m[1]?"c":m[2]?"s":m[3]?"d":m[4]?"a":m[5]?"k":m[6]?"n":"f";
    out+=`<span class="${cls}">${esc(m[0])}</span>`;last=re.lastIndex}
  return out+esc(code.slice(last));
}
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const $=s=>document.querySelector(s);
const app=$("#app");
const FLAME=`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.5 2c.6 3.4 4.8 5.2 4.8 10.4A5.3 5.3 0 0 1 12 18a5.3 5.3 0 0 1-5.3-5.6c0-2.6 1.6-4 2.3-6.4.9 1 1.6 2.2 1.6 3.8 1.3-1.8 2.2-4.6 1.9-7.8zM12 22a3 3 0 0 1-3-3c0-1.6 1.4-2.3 1.8-3.8.6.6 1 1.3 1 2.2.9-.9 1.5-2 1.4-3.3 1.1 1 1.8 2.5 1.8 4A3 3 0 0 1 12 22z"/></svg>`;

/* =================== usuario y racha =================== */
let user=store.get("agb-usuario",null);
let progress=store.get("agb-progreso",{done:[],xp:0});
const pad=n=>String(n).padStart(2,"0");
function dayStr(d=new Date()){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate())}
function parseDay(s){const [y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d)}
function dayDiff(a,b){return Math.round((parseDay(b)-parseDay(a))/864e5)}
function currentStreak(){if(!user||!user.lastDay)return 0;return dayDiff(user.lastDay,dayStr())<=1?user.streak:0}
function studiedToday(){return !!user&&user.lastDay===dayStr()}
function registerStudy(){
  if(!user)return false; const t=dayStr(); if(user.lastDay===t)return false;
  const diff=user.lastDay?dayDiff(user.lastDay,t):99;
  user.streak=diff===1?user.streak+1:1; user.lastDay=t;
  user.days=(user.days||[]).filter(d=>dayDiff(d,t)<60); user.days.push(t);
  user.best=Math.max(user.best||0,user.streak); store.set("agb-usuario",user); updStats(); return true;
}
function updStats(){const w=$("#who");if(w){w.textContent=user?user.name:"";w.hidden=!user}}

/* =================== sonido =================== */
let actx=null, vol=0.6;
function blip(f=520){try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();const o=actx.createOscillator(),g=actx.createGain();
  o.type="triangle";o.frequency.value=f;g.gain.value=0.15*vol+0.0001;g.gain.exponentialRampToValueAtTime(0.0001,actx.currentTime+0.12);
  o.connect(g).connect(actx.destination);o.start();o.stop(actx.currentTime+0.13)}catch(e){}}

/* =================== escena 3D compartida =================== */
const S={ok:false,sway:true,amp:0.12,spd:0.35,theme:"nieve",mouse:{x:0,y:0},cur:{x:0,y:0},t:0,running:false};
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)S.sway=false;
const THEMES={
  nieve:{fog:0xc9d6e3,ground:0xe9eef3,rock:0x7b8ea3,part:0xffffff,light:0xffffff,amb:0xb8c8dc,pspeed:2.2},
  desierto:{fog:0xe8b07a,ground:0xd9a36a,rock:0x9b6240,part:0xf3d3a3,light:0xffe0b0,amb:0xd8a070,pspeed:0.5},
  noche:{fog:0x0b1430,ground:0x1a2547,rock:0x0e1630,part:0x9fc4ff,light:0x8fb0ff,amb:0x2a3a70,pspeed:6}
};
function init3D(){
  if(!window.THREE)return;
  try{
    const r=new THREE.WebGLRenderer({antialias:true});r.setPixelRatio(Math.min(devicePixelRatio,2));
    const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(55,16/9,0.1,400);
    cam.position.set(0,7,34);cam.lookAt(0,5,0);const base={x:cam.rotation.x,y:cam.rotation.y};
    const fog=new THREE.Fog(0xc9d6e3,25,150);scene.fog=fog;
    const hemi=new THREE.HemisphereLight(0xffffff,0x445566,0.7);scene.add(hemi);
    const sun=new THREE.DirectionalLight(0xffffff,0.9);sun.position.set(-30,40,10);scene.add(sun);
    const g=new THREE.PlaneGeometry(260,220,70,60);g.rotateX(-Math.PI/2);const p=g.attributes.position;
    for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i),d=Math.min(1,Math.abs(x)/40);
      let h=Math.sin(x*.09)*4+Math.sin(z*.13+x*.04)*3+Math.sin(x*.21+z*.17)*1.5+Math.random()*1.2;
      h=h*d*d+(z<-30?(-z-30)*0.35*d:0)+d*d*8;p.setY(i,h)}
    g.computeVertexNormals();
    const terrMat=new THREE.MeshStandardMaterial({color:0xe9eef3,flatShading:true,roughness:1});
    const terrain=new THREE.Mesh(g,terrMat);scene.add(terrain);
    const rockMat=new THREE.MeshStandardMaterial({color:0x7b8ea3,flatShading:true,roughness:.9});
    const ruins=new THREE.Group();
    [[-9,-6,9],[-5,-9,6],[5,-8,10],[9,-5,4],[-4,-14,12],[4,-14,12]].forEach(([x,z,h])=>{
      const m=new THREE.Mesh(new THREE.BoxGeometry(1.7,h,1.7),rockMat);m.position.set(x,h/2-0.5,z);m.rotation.y=Math.random()*.5;ruins.add(m)});
    const lintel=new THREE.Mesh(new THREE.BoxGeometry(11,1.4,1.8),rockMat);lintel.position.set(0,11.8,-14);ruins.add(lintel);scene.add(ruins);
    const fire=new THREE.PointLight(0xff8a3a,1.6,30);fire.position.set(3,1.5,6);scene.add(fire);
    const ember=new THREE.Mesh(new THREE.ConeGeometry(.5,1.2,6),new THREE.MeshBasicMaterial({color:0xffa04a}));ember.position.set(3,.4,6);scene.add(ember);
    const N=1600,pg=new THREE.BufferGeometry(),pos=new Float32Array(N*3);
    for(let i=0;i<N;i++){pos[i*3]=(Math.random()-.5)*90;pos[i*3+1]=Math.random()*40;pos[i*3+2]=(Math.random()-.5)*70}
    pg.setAttribute("position",new THREE.BufferAttribute(pos,3));
    const pm=new THREE.PointsMaterial({color:0xffffff,size:.28,transparent:true,opacity:.9});
    const pts=new THREE.Points(pg,pm);scene.add(pts);
    Object.assign(S,{ok:true,r,scene,cam,base,fog,hemi,sun,terrMat,rockMat,fire,ember,pts,pos,N,pm,
      objs:{Montanas:[terrain],Ruinas:[ruins],Fogata:[fire,ember],Nieve:[pts],DirectionalLight3D:[sun]}});
    applyTheme(S.theme);
  }catch(e){S.ok=false}
}
function applyTheme(name){S.theme=name;if(!S.ok)return;const t=THEMES[name];
  S.fog.color.setHex(t.fog);S.r.setClearColor(t.fog);S.terrMat.color.setHex(t.ground);S.rockMat.color.setHex(t.rock);
  S.pm.color.setHex(t.part);S.pm.size=name==="noche"?.12:name==="desierto"?.18:.28;S.sun.color.setHex(t.light);S.hemi.color.setHex(t.amb);
  S.sun.intensity=name==="noche"?.35:.9}
function loop(now){
  if(!S.running)return;requestAnimationFrame(loop);
  const dt=Math.min(.05,(now-(S.last||now))/1000);S.last=now;
  if(S.lab){S.lab.tick(dt);S.r.render(S.lab.scene,S.lab.cam);return}
  if(S.sway)S.t+=dt*S.spd;
  S.cur.x+=(S.mouse.x-S.cur.x)*Math.min(1,dt*2);S.cur.y+=(S.mouse.y-S.cur.y)*Math.min(1,dt*2);
  const a=S.sway?S.amp:0;
  S.cam.rotation.y=S.base.y+Math.sin(S.t)*a*0.6-S.cur.x*0.06;
  S.cam.rotation.x=S.base.x+Math.sin(S.t*.7)*a*0.25-S.cur.y*0.03;
  S.cam.position.x=Math.sin(S.t*.5)*1.5*(S.sway?a/0.12:0);
  const t=THEMES[S.theme],P=S.pos;
  for(let i=0;i<S.N;i++){P[i*3+1]-=dt*t.pspeed*(0.6+(i%7)/7);P[i*3]+=Math.sin(now*.0004+i)*dt*(S.theme==="desierto"?3:.6);if(P[i*3+1]<0)P[i*3+1]=40}
  S.pts.geometry.attributes.position.needsUpdate=true;
  S.fire.intensity=(S.theme==="noche"?2.6:1.4)+Math.sin(now*.02)*.3+Math.random()*.2;
  S.r.render(S.scene,S.cam);
}
function attach3D(stage,lab=null){
  if(!S.ok||!stage)return false;S.lab=lab;KEYS.clear();stage.appendChild(S.r.domElement);
  const size=()=>{const w=stage.clientWidth||1,h=stage.clientHeight||1,c=S.lab?S.lab.cam:S.cam;S.r.setSize(w,h,false);c.aspect=w/h;c.updateProjectionMatrix()};
  size();if(S.ro)S.ro.disconnect();S.ro=new ResizeObserver(size);S.ro.observe(stage);
  if(!S.running){S.running=true;S.last=0;requestAnimationFrame(loop)}return true;
}
function stop3D(){S.running=false;S.lab=null;if(S.ro)S.ro.disconnect()}
function trackMouse(el){el.addEventListener("pointermove",e=>{const b=el.getBoundingClientRect();S.mouse.x=(e.clientX-b.left)/b.width*2-1;S.mouse.y=(e.clientY-b.top)/b.height*2-1});
  el.addEventListener("pointerleave",()=>{S.mouse.x=0;S.mouse.y=0})}

