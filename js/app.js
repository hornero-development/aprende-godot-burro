/* =================== laboratorio 3D =================== */
const KEYS=new Set();let jumpQ=false;
addEventListener("keydown",e=>{if(!S.lab||!S.lab.keys||e.target.closest&&e.target.closest("input,textarea"))return;KEYS.add(e.code);
  if(e.code==="Space")jumpQ=true;if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.code))e.preventDefault()});
addEventListener("keyup",e=>KEYS.delete(e.code));
function buildLab(kind,p,readout){
  if(LABS[kind].sala)return buildSalaLab(LABS[kind],p,readout);
  if(LABS[kind].topdown)return buildTopLab(LABS[kind],p,readout);
  if(LABS[kind].fsm)return buildFSMLab(LABS[kind],p,readout);
  if(LABS[kind].map)return buildMapLab(LABS[kind],p,readout);
  if(LABS[kind].zones)return buildZoneLab(LABS[kind],p,readout);
  if(LABS[kind].fp)return buildFPLab(LABS[kind],p,readout);
  if(LABS[kind].range)return buildRangeLab(LABS[kind],p,readout);
  const T=THREE,scene=new T.Scene();scene.background=new T.Color(0x1f2833);
  const cam=new T.PerspectiveCamera(50,16/9,.1,200);cam.position.set(0,6,11);cam.lookAt(0,.5,0);
  scene.add(new T.HemisphereLight(0xffffff,0x334455,.85));const dl=new T.DirectionalLight(0xffffff,.8);dl.position.set(5,10,6);scene.add(dl);
  scene.add(new T.GridHelper(20,20,0x70bafa,0x3a4250));
  const mat=new T.MeshStandardMaterial({color:0xe3a75b,flatShading:true}),box=new T.BoxGeometry(1,1,1);
  const soldier=()=>{const g=new T.Group(),m=new T.MeshStandardMaterial({color:0x6f8f5a,flatShading:true});
    const b=new T.Mesh(new T.CylinderGeometry(.4,.4,1,12),m);b.position.y=.9;g.add(b);
    const h=new T.Mesh(new T.SphereGeometry(.4,12,8),m);h.position.y=1.6;g.add(h);
    const f=new T.Mesh(new T.SphereGeometry(.4,12,8),m);f.position.y=.4;g.add(f);
    const v=new T.Mesh(new T.BoxGeometry(.5,.15,.2),new T.MeshStandardMaterial({color:0x222222}));v.position.set(0,1.65,-.35);g.add(v);return g};
  const lab={scene,cam,keys:false,tick(){},rebuild(){}};
  if(kind==="mover"){const c=new T.Mesh(box,mat);c.position.set(-6,.5,0);scene.add(c);
    lab.tick=dt=>{c.position.x+=p.v*dt;if(c.position.x>6)c.position.x=-6;if(c.position.x<-6)c.position.x=6;readout(`position.x = ${c.position.x.toFixed(2)}\ndelta ≈ ${dt.toFixed(3)} s`)}}
  if(kind==="rotar"){const c=new T.Mesh(new T.BoxGeometry(2,1,1),mat);c.position.y=.5;scene.add(c);
    const n=new T.Mesh(new T.BoxGeometry(.3,.3,1.4),new T.MeshStandardMaterial({color:0x4f5d6e}));n.position.set(0,.6,-1);c.add(n);
    lab.tick=dt=>{c.rotation.y+=p.v*dt;let deg=(c.rotation.y*180/Math.PI)%360;if(deg<0)deg+=360;readout(`rotation.y = ${(c.rotation.y%(Math.PI*2)).toFixed(2)} rad\nrotation_degrees.y = ${deg.toFixed(0)}°`)}}
  if(kind==="fila"){const g=new T.Group();scene.add(g);cam.position.set(0,9,14);cam.lookAt(0,0,0);let born=0;
    lab.rebuild=()=>{while(g.children.length)g.remove(g.children[0]);const n=Math.round(p.n);
      for(let i=0;i<n;i++){const c=new T.Mesh(box,mat);c.position.set(i*p.s,.5,0);c.scale.setScalar(.01);c.userData.d=i*.06;g.add(c)}
      g.position.x=-(Math.max(n-1,0))*p.s/2;born=0;
      readout(`cubos creados: ${n}${n?`\nprimero en x = 0, último en x = ${((n-1)*p.s).toFixed(2)}`:"\nrange(0) no repite nada"}`,true)};
    lab.tick=dt=>{born+=dt;g.children.forEach(c=>{const k=Math.min(1,Math.max(0,(born-c.userData.d)*5));c.scale.setScalar(.01+k*.99)})}}
  if(kind==="input"){const s=soldier();scene.add(s);lab.keys=true;
    lab.tick=dt=>{let x=0,z=0;if(KEYS.has("KeyD")||KEYS.has("ArrowRight"))x+=1;if(KEYS.has("KeyA")||KEYS.has("ArrowLeft"))x-=1;
      if(KEYS.has("KeyS")||KEYS.has("ArrowDown"))z+=1;if(KEYS.has("KeyW")||KEYS.has("ArrowUp"))z-=1;
      const len=Math.hypot(x,z)||1;s.position.x=Math.max(-9,Math.min(9,s.position.x+x/len*p.v*dt));s.position.z=Math.max(-9,Math.min(9,s.position.z+z/len*p.v*dt));
      if(x||z)s.rotation.y=Math.atan2(-x,-z);
      readout(`dir = (${x}, 0, ${z})   normalizada = (${(x/len).toFixed(2)}, 0, ${(z/len).toFixed(2)})\nposition = (${s.position.x.toFixed(2)}, 0.00, ${s.position.z.toFixed(2)})`)}}
  if(kind==="salto"){const s=soldier();scene.add(s);lab.keys=true;cam.position.set(7,3.5,9);cam.lookAt(0,2,0);
    const mark=new T.Mesh(new T.BoxGeometry(1.6,.04,1.6),new T.MeshBasicMaterial({color:0xff7a3d,transparent:true,opacity:.6}));scene.add(mark);
    let vy=0;lab.tick=dt=>{const floor=s.position.y<=0;
      if(!floor)vy-=p.g*dt;if(jumpQ&&floor)vy=p.j;jumpQ=false;
      s.position.y=Math.max(0,s.position.y+vy*dt);if(s.position.y===0&&vy<0)vy=0;
      const hmax=p.j*p.j/(2*p.g);mark.position.y=hmax+.02;
      readout(`velocity.y = ${vy.toFixed(2)}\nis_on_floor() = ${s.position.y<=0}\naltura máxima ≈ ${hmax.toFixed(2)} m  (la marca naranja)`)}}
  return lab;
}
function mountLab(host,kind){
  stop3D();const def=LABS[kind],p={};Object.entries(def.params).forEach(([k,v])=>p[k]=v.val);
  const codeHtml=hl(def.code).replace(/__(\w)__/g,(m,k)=>{const d=def.params[k];if(d.bool)return `<select class="pv" id="pv-${kind}-${k}" data-k="${k}" aria-label="Valor editable"><option value="1"${d.val?" selected":""}>true</option><option value="0"${d.val?"":" selected"}>false</option></select>`;return `<input class="pv" type="number" id="pv-${kind}-${k}" data-k="${k}" value="${d.val}" min="${d.min}" max="${d.max}" step="${d.step}" aria-label="Valor editable">`});
  host.innerHTML=`<pre class="code">${codeHtml}</pre>
    <div class="labview" tabindex="0" aria-label="Escena 3D del laboratorio"><div class="stage"></div>${S.ok?`<span class="hint">${def.hint}</span>`:'<div class="nogl">Tu navegador no pudo iniciar 3D. Igual podés leer el código y responder las preguntas.</div>'}</div>
    <div class="readout" aria-live="off"></div>
    ${def.pad?`<div class="pad">${def.pad.map(([k,t])=>`<button data-key="${k}">${t}</button>`).join("")}</div>`:def.keys?`<div class="pad">${def.jump?'<button data-key="Space">Saltar</button>':'<button data-key="ArrowLeft">←</button><button data-key="ArrowUp">↑</button><button data-key="ArrowDown">↓</button><button data-key="ArrowRight">→</button>'}</div>`:""}`;
  const ro=host.querySelector(".readout");let last=0,lab=null;
  const readout=(t,force)=>{const now=performance.now();if(!force&&now-last<80)return;last=now;ro.textContent=t};
  host.querySelectorAll(".pv").forEach(i=>i.addEventListener(i.tagName==="SELECT"?"change":"input",()=>{const d=def.params[i.dataset.k];let v=parseFloat(i.value);if(isNaN(v))return;
    v=Math.max(d.min,Math.min(d.max,v));p[i.dataset.k]=v;if(lab)lab.rebuild()}));
  host.querySelectorAll("[data-key]").forEach(b=>{const k=b.dataset.key;
    b.addEventListener("pointerdown",e=>{e.preventDefault();if(k==="Space")jumpQ=true;else KEYS.add(k)});
    ["pointerup","pointerleave","pointercancel"].forEach(ev=>b.addEventListener(ev,()=>KEYS.delete(k)))});
  if(!S.ok){ro.textContent="(sin vista 3D)";return}
  lab=buildLab(kind,p,readout);lab.keys=!!def.keys;lab.rebuild();
  attach3D(host.querySelector(".stage"),lab);
  if(lab.bind)lab.bind(host.querySelector(".labview"));
  host.querySelector(".labview").addEventListener("pointerdown",()=>host.querySelector(".labview").focus());
}

/* =================== menú del juego (vista previa reutilizable) =================== */
const DEFAULT_BTNS=[{text:"Campaña",act:"campana"},{text:"Misiones con vehículos",act:"vehiculos"},{text:"Opciones",act:"opciones"},{text:"Salir",act:"salir"}];
function mountPreview(host,{mode="3d",openOptions=false,onLog,console:showCon=true,bare=false,title="OPERACIÓN<br>BURRO",buttons=DEFAULT_BTNS}={}){
  stop3D();
  host.innerHTML=`<div class="preview ${bare?"bare":""}">
    <div class="flat ${S.theme}" hidden><div class="m1"></div><div class="m2"></div><div class="m3"></div></div>
    <div class="stage"></div><div class="vignette"></div>
    ${bare?"":'<span class="pv-tag"></span>'}
    <div class="gmenu">
      <div class="gtitle"><small>FRENTE NORTE</small>${title}</div>
      ${buttons.map(b=>`<button class="gbtn" data-a="${b.act}" data-t="${esc(b.text)}">${esc(b.text)}</button>`).join("")}
    </div>
    <div class="gpanel" hidden>
      <h4>Opciones</h4>
      <label>Volumen <input type="range" min="0" max="1" step="0.05" value="${vol}" data-o="vol"></label>
      <label>Sensibilidad del mouse <input type="range" min="0.1" max="2" step="0.1" value="1" data-o="sens"></label>
      <label class="inl">Movimiento de cámara <input type="checkbox" ${S.sway?"checked":""} data-o="sway"></label>
      <label class="inl">Pantalla completa <input type="checkbox" data-o="fs"></label>
      <button class="close" data-a="volver">Volver</button>
    </div>
    <div class="fade"></div>
  </div>
  ${showCon?'<div class="console" aria-live="polite"><b>›</b> Tocá una opción del menú para ver qué código se ejecuta.</div>':""}`;
  const pv=host.querySelector(".preview"),stage=pv.querySelector(".stage"),flat=pv.querySelector(".flat"),
        panel=pv.querySelector(".gpanel"),menu=pv.querySelector(".gmenu"),fade=pv.querySelector(".fade"),cons=host.querySelector(".console"),tag=pv.querySelector(".pv-tag");
  let sens=1;
  const log=(code,note)=>{if(cons)cons.innerHTML=`<b>›</b> <span>${esc(code)}</span>${note?`  <span style="color:var(--muted)"># ${esc(note)}</span>`:""}`;onLog&&onLog(code,note)};
  function setMode(m){const use3d=m==="3d"&&attach3D(stage);if(!use3d)stop3D();
    flat.hidden=use3d;stage.hidden=!use3d;flat.className="flat "+S.theme;
    if(tag)tag.textContent=use3d?"Fondo 3D · Node3D + CanvasLayer":"Plano · Control + TextureRect"}
  setMode(mode);
  pv.addEventListener("pointermove",e=>{const b=pv.getBoundingClientRect();S.mouse.x=((e.clientX-b.left)/b.width*2-1)*sens;S.mouse.y=((e.clientY-b.top)/b.height*2-1)*sens});
  pv.addEventListener("pointerleave",()=>{S.mouse.x=0;S.mouse.y=0});
  menu.querySelectorAll(".gbtn").forEach(b=>b.addEventListener("mouseenter",()=>blip(760)));
  pv.addEventListener("click",e=>{
    const a=e.target.closest("[data-a]");if(!a)return;blip(520);const act=a.dataset.a;
    if(act==="campana"){log('get_tree().change_scene_to_file("res://escenas/nivel_1.tscn")',"con fundido a negro");
      fade.textContent="Cargando nivel_1.tscn…";fade.classList.add("on");
      setTimeout(()=>{fade.textContent="nivel_1.tscn cargado. Acá empezaría tu FPS."},900);setTimeout(()=>fade.classList.remove("on"),2400)}
    else if(act==="vehiculos")log('get_tree().change_scene_to_file("res://escenas/misiones_vehiculos.tscn")',"autos, aviones y tanques llegan en las próximas unidades");
    else if(act==="opciones"){panel.hidden=false;menu.hidden=true;log("$Opciones.show(); $VBox.hide()")}
    else if(act==="volver"){panel.hidden=true;menu.hidden=false;log('hide(); get_parent().get_node("VBox").show()')}
    else if(act==="salir")log("get_tree().quit()","en la página no se cierra nada, en Godot sí");
    else log(`# "${a.dataset.t}" emitió pressed(), pero no tiene ninguna función conectada`,"conectala en Nodo → Señales");
  });
  panel.addEventListener("input",e=>{const o=e.target.dataset.o;
    if(o==="vol"){vol=+e.target.value;log(`AudioServer.set_bus_volume_db(bus, linear_to_db(${vol.toFixed(2)}))`,vol===0?"silencio total":(20*Math.log10(vol)).toFixed(1)+" dB")}
    if(o==="sens"){sens=+e.target.value;log(`sensibilidad = ${sens.toFixed(1)}`,"la usará el jugador FPS")}});
  panel.addEventListener("change",e=>{const o=e.target.dataset.o;
    if(o==="vol")blip(600);
    if(o==="sway"){S.sway=e.target.checked;log(`set_process(${S.sway})`,"activa o pausa el balanceo de cámara")}
    if(o==="fs"){const on=e.target.checked;log(`DisplayServer.window_set_mode(DisplayServer.${on?"WINDOW_MODE_FULLSCREEN":"WINDOW_MODE_WINDOWED"})`);
      try{if(on&&pv.requestFullscreen)pv.requestFullscreen().catch(()=>{});else if(!on&&document.fullscreenElement)document.exitFullscreen().catch(()=>{})}catch(err){}}});
  if(openOptions){panel.hidden=false;menu.hidden=true}
  return {setMode,refreshTheme(){flat.className="flat "+S.theme}};
}

/* =================== navegación =================== */
let G=null; // estado del editor
const NAVOF={cero:"gds",gds:"gds",gds2:"gds",gds3:"gds",gds4:"gds",gds5:"gds",gds6:"gds",menu:"lecciones",fps2:"lecciones",fps3:"lecciones",mis:"lecciones",mapa:"lecciones"};
const FPS_COURSES=["menu","fps2","fps3","mis","mapa"];
function nextFPS(){for(const c of FPS_COURSES){const i=COURSES[c].lessons.findIndex(l=>!progress.done.includes(l.id));if(i>=0)return {c,i,all:false}}return {c:"menu",i:0,all:true}}
function setNav(v){document.querySelectorAll("#nav button").forEach(b=>b.setAttribute("aria-current",b.dataset.go===v))}
function go(v){if(!user){renderWelcome();return}
  if(v==="lecciones")renderLessons();else if(v==="godot")renderGodot();else if(v==="patio")renderPatio();
  else if(v==="empezar"){const n=nextFPS();startLesson(n.c,n.i)}
  else if(v==="usuario"){renderWelcome(true)}
  else if(v==="gds"){renderGDSChoice()}
  else renderInicio();
  scrollTo(0,0)}
function nextIn(c){const ls=COURSES[c].lessons,i=ls.findIndex(l=>!progress.done.includes(l.id));return i<0?0:i}
function courseDone(c){return COURSES[c].lessons.filter(l=>progress.done.includes(l.id)).length}
function nextLesson(){for(const c of ["cero","gds","menu"]){const i=COURSES[c].lessons.findIndex(l=>!progress.done.includes(l.id));if(i>=0)return {c,i}}return {c:"gds",i:0}}
function isUnlocked(c,i){return i===0||progress.done.includes(COURSES[c].lessons[i-1].id)}
const TOTAL=CERO.length+GDS.length+LESSONS.length;

/* =================== bienvenida / usuario =================== */
function renderWelcome(rename=false){
  setNav("");location.hash="usuario";
  app.innerHTML=`<section class="hall" id="hall"><div class="stage"></div><div class="shade"></div>
    <div class="hall-in"><form class="welcome" id="f-user" novalidate>
      <div class="eyebrow">${rename?"TU USUARIO":"NUEVO RECLUTA"}</div>
      <h1>${rename?"Cambiá tu nombre":"¿Cómo te llamás, burro?"}</h1>
      <p>${rename?"Tu racha y tus lecciones se mantienen.":"Con tu nombre guardamos tu racha de días aprendiendo y las lecciones que completes."}</p>
      <div class="field"><label for="u-name">Nombre de usuario</label>
        <input id="u-name" maxlength="20" autocomplete="nickname" placeholder="Ej: Tutuca" value="${rename&&user?esc(user.name):""}">
        <small>Se guarda solo en este navegador de tu computadora. No se envía a ningún lado.</small></div>
      <div class="err" id="u-err"></div>
      <div class="row-btns" style="justify-content:flex-start">
        <button class="btn" type="submit">${rename?"Guardar nombre":"Crear mi usuario"}</button>
        ${rename?'<button class="btn ghost" type="button" id="u-cancel">Cancelar</button>':""}
      </div>
    </form></div></section>`;
  const hall=$("#hall");attach3D(hall.querySelector(".stage"));trackMouse(hall);
  $("#u-name").focus();
  $("#f-user").onsubmit=e=>{e.preventDefault();const n=$("#u-name").value.trim();
    if(n.length<2){$("#u-err").textContent="Escribí al menos 2 letras.";return}
    if(user)user.name=n;else user={name:n,streak:0,best:0,lastDay:null,days:[],created:dayStr()};
    store.set("agb-usuario",user);updStats();blip(880);renderInicio()};
  if(rename)$("#u-cancel").onclick=renderInicio;
}

/* =================== inicio =================== */
function renderInicio(){
  setNav("inicio");location.hash="inicio";
  const st=currentStreak(),today=studiedToday(),nf=nextFPS(),fpsDone=FPS_COURSES.reduce((a,c)=>a+courseDone(c),0),fpsTot=FPS_COURSES.reduce((a,c)=>a+COURSES[c].lessons.length,0),GDS_ALL=["cero","gds","gds2","gds3","gds4","gds5","gds6"],gd=GDS_ALL.reduce((a,c)=>a+courseDone(c),0),gdT=GDS_ALL.reduce((a,c)=>a+COURSES[c].lessons.length,0);
  const letters=["D","L","M","M","J","V","S"],days=new Set(user.days||[]);
  let week="";for(let k=6;k>=0;k--){const d=new Date();d.setDate(d.getDate()-k);const s=dayStr(d);
    week+=`<div><span>${letters[d.getDay()]}</span><i class="${days.has(s)?"on":""} ${k===0?"today":""}" title="${s}"></i></div>`}
  const msg=today?"Ya aprendiste hoy. Volvé mañana para sumar otro día."
    :st>0?"Completá una lección hoy para no perder la racha.":"Completá una lección para empezar tu racha.";
  app.innerHTML=`<section class="hall" id="hall"><div class="stage"></div><div class="shade"></div>
    <div class="hall-in">
      <div>
        <div class="hello"><small>BIENVENIDO AL CUARTEL</small><h1>Hola, ${esc(user.name)}</h1></div>
        <nav class="hmenu" aria-label="Menú principal">
          <button class="hbtn" data-go="empezar">Empezar lección<small>Curso FPS 3D · ${nf.all?"Repasar: ":""}${esc(COURSES[nf.c].lessons[nf.i].title)}</small></button>
          <button class="hbtn" data-go="gds">GDScript<small>7 niveles: de 0 en programación a profesional · ${gd} de ${gdT} lecciones</small></button>
          <button class="hbtn" data-go="lecciones">Elegir lecciones<small>Curso FPS 3D · ${fpsDone} de ${fpsTot} completas · ${progress.xp} XP</small></button>
          <button class="hbtn" data-go="godot">Godot interactivo<small>Explorá el editor y descubrí para qué sirve cada botón</small></button>
          <button class="hbtn" data-go="patio">Patio de juegos<small>Probá el menú plano y el 3D</small></button>
          <button class="hbtn minor" data-go="usuario">Cambiar nombre</button>
        </nav>
      </div>
      <aside class="streak" aria-label="Racha">
        <div class="big ${st?"":"off"}">${FLAME}<div><div class="num">${st}</div><div class="lbl">${st===1?"día de racha":"días de racha"}</div></div></div>
        <div class="week">${week}</div>
        <p>${msg}</p>
        <div class="best">Mejor racha: ${user.best||0} ${user.best===1?"día":"días"}</div>
      </aside>
    </div></section>`;
  const hall=$("#hall");attach3D(hall.querySelector(".stage"));trackMouse(hall);
  hall.querySelectorAll("[data-go]").forEach(b=>{b.addEventListener("mouseenter",()=>blip(760));
    b.onclick=()=>{blip(520);b.dataset.go==="usuario"?renderWelcome(true):go(b.dataset.go)}});
}

/* =================== elegir lecciones =================== */
function runTrace(st){
  let k=-1,vars={};
  const draw=()=>{document.querySelectorAll(".tl.cur").forEach(x=>x.classList.remove("cur"));
    const say=$("#tsay"),out=$("#tout"),tv=$("#tvars"),nb=$("#tnext");
    if(k<0){say.innerHTML='<b>Qué hace Godot</b>Tocá Siguiente línea para ver qué hace Godot, paso a paso.';out.innerHTML='<div class="h">Salida</div>';
      if(tv)tv.innerHTML='<span style="color:var(--muted);font-size:14px">Todavía no hay cajas.</span>';nb.disabled=false;nb.textContent="▶ Siguiente línea";return}
    const p=st.steps[k],ln=$("#tl-"+p.line);if(ln){ln.classList.add("cur");ln.scrollIntoView({block:"nearest"})}
    say.innerHTML=`<b>Línea ${p.line+1}</b>${esc(p.say)}`;
    if(p.out!==undefined){const d=document.createElement("div");d.textContent=p.out;out.appendChild(d)}
    if(p.vars){Object.assign(vars,p.vars);if(tv)tv.innerHTML=Object.entries(vars).map(([n,v])=>`<span class="box3"><span>${esc(n)}</span><b>${esc(v)}</b></span>`).join("")}
    if(k===st.steps.length-1){nb.disabled=true;nb.textContent="Terminó ✓"}};
  $("#tnext").onclick=()=>{if(k<st.steps.length-1){k++;draw();blip(560+k*30)}};
  $("#treset").onclick=()=>{k=-1;vars={};draw()};
}

const lockSvg='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 10V8a5 5 0 0 1 10 0v2h1v11H6V10h1zm2 0h6V8a3 3 0 0 0-6 0v2z"/></svg>';
const okSvg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>';
function coursePath(c){const C=COURSES[c];return `<section class="unit" id="curso-${c}">
    <div class="unit-head"><span class="tag">${C.tag}</span><h2>${C.title}</h2><p>${C.sub} · ${courseDone(c)} de ${C.lessons.length} completas</p></div>
    <div class="path">${C.lessons.map((l,i)=>{const d=progress.done.includes(l.id),u=isUnlocked(c,i);
      return `<button class="node ${d?"done":""} ${u?"":"locked"}" data-c="${c}" data-i="${i}" ${u?"":'aria-disabled="true"'}>
        <span class="disc">${u?(d?okSvg:i+1):lockSvg}</span>
        <span class="txt"><b>${esc(l.title)}</b><span>${esc(l.sub)} · ${l.xp} XP${u?"":" · completá la anterior"}</span></span></button>`}).join("")}
    </div></section>`}
function bindPaths(){app.querySelectorAll(".node").forEach(n=>n.onclick=()=>{const c=n.dataset.c,i=+n.dataset.i;if(isUnlocked(c,i))startLesson(c,i)})}
function renderGDSChoice(){
  stop3D();setNav("gds");location.hash="gdscript";
  const card=(c,rec,pts,btn)=>{const C=COURSES[c],d=courseDone(c),n=C.lessons.length;
    return `<article class="ccard ${rec?"rec":""}"><div class="tag"><span>${C.tag.split("· ")[1]}</span>${rec?"<em>Recomendado</em>":""}</div>
      <h2>${C.title}</h2><p>${C.sub}</p><ul>${pts.map(x=>`<li>${x}</li>`).join("")}</ul>
      <div class="bar"><span style="width:${d/n*100}%"></span></div><div class="meta">${d} de ${n} lecciones${d===n?" · completo":""}</div>
      <button class="btn ${rec?"":"ghost"}" data-c="${c}">${d===0?btn:d===n?"Repasar":"Seguir: "+esc(C.lessons[nextIn(c)].title)}</button></article>`};
  const ceroDone=courseDone("cero")===CERO.length;
  app.innerHTML=`<section class="choice-head"><div class="kicker">GDScript</div><h1>¿Por dónde empezás?</h1>
    ${(()=>{const g=gdsTotals();return `<button class="dip-banner ${g.all?"on":""}" id="to-dip"><span class="dip-medal" aria-hidden="true"></span><span><b>Diploma de GDScript</b>${g.all?"¡Desbloqueado! Poné tu nombre y descargalo.":`Completá los 7 niveles para obtenerlo · ${g.done} de ${g.tot} lecciones`}</span><em>${g.all?"Ver diploma":"Ver progreso"}</em></button>`})()}
    <p>Elegí según lo que ya sabés. Si nunca escribiste código, empezá de 0 en programación. Si ya sabés lo básico, andá directo a GDScript para juegos 3D. Después seguí nivel por nivel hasta el 6: avanzado, arquitectura, matemática 3D y profesional.</p></section>
    <div class="choice">
      ${card("cero",!ceroDone,["Qué es programar y por qué el orden importa","Qué es un nodo y qué es un script","Qué es una función: definir y llamar","Qué es _ready() y quién la llama","Qué es una variable","Cómo leer los errores"],"Empezar de 0 en programación")}
      ${card("gds",ceroDone,["Tipos de datos y Vector3","Condiciones, bucles y listas","Mover y girar objetos en 3D","Leer el teclado","Señales y física del jugador FPS"],"Empezar directo en GDScript 3D")}
      ${card("gds2",false,["Tipos estáticos y diccionarios","enum y match","Máquina de estados de un enemigo","Clases propias y herencia","Recursos .tres y depuración"],"Empezar el Nivel 2")}
      ${card("gds3",false,["Señales propias y await","Lambdas y Callable","Setters y getters","Arrays tipados y static","Scripts @tool"],"Empezar el Nivel 3")}
      ${card("gds4",false,["Instanciar escenas","Componentes reutilizables","Bus de eventos y grupos","Object pooling","Guardar partida en JSON"],"Empezar el Nivel 4")}
      ${card("gds5",false,["Vectores y distancias","Cono de visión con dot","Torretas con lerp_angle","lerp y move_toward","Rayos por código"],"Empezar el Nivel 5")}
      ${card("gds6",false,["Profiler y Monitores","Código que no traba","call_deferred","Proyecto ordenado y Git","Exportar a PC, Android y Web"],"Empezar el Nivel 6")}
    </div>
    <div style="margin-top:36px">${coursePath("cero")}${coursePath("gds")}${coursePath("gds2")}${coursePath("gds3")}${coursePath("gds4")}${coursePath("gds5")}${coursePath("gds6")}</div>`;
  $("#to-dip").onclick=renderDiploma;
  app.querySelectorAll(".ccard [data-c]").forEach(b=>b.onclick=()=>startLesson(b.dataset.c,nextIn(b.dataset.c)));
  bindPaths();
}

function renderLessons(){
  stop3D();setNav("lecciones");location.hash="lecciones";
  app.innerHTML=`${coursePath("menu")}${coursePath("fps2")}${coursePath("fps3")}${coursePath("mis")}${coursePath("mapa")}
  <section class="unit">
    <div class="unit-head"><span class="tag">Próximas unidades del FPS</span><h2>Del menú al campo de batalla</h2></div>
    <div class="soon">${SOON.map((s,i)=>`<div class="card"><span class="lock">Unidad ${i+6}</span><b>${s[0]}</b>${s[1]}</div>`).join("")}</div>
  </section>
  <p class="lead">¿Te cuesta el código de las lecciones? Aprendé GDScript primero en la sección <button class="btn ghost" id="to-gds" style="padding:6px 12px;font-size:14px">GDScript</button></p>`;
  bindPaths();$("#to-gds").onclick=()=>go("gds");
}

/* =================== reproductor de lección =================== */
let L=null;
function startLesson(c,i){L={c,i,s:0,sel:null,checked:false,mistakes:0};setNav(NAVOF[c]);location.hash="leccion-"+c+"-"+(i+1);renderStep();scrollTo(0,0)}
function renderStep(){
  stop3D();const les=COURSES[L.c].lessons[L.i],st=les.steps[L.s];
  L.sel=null;L.checked=!(st.type==="quiz"||st.type==="fill");
  const head=`<div class="kicker">${st.kicker}</div>`;
  let body="";
  if(st.type==="info"||st.type==="preview")body=`${head}<h2>${st.title}</h2>${st.html}${st.type==="preview"?'<div id="pvhost"></div>':""}`;
  if(st.type==="trace")body=`${head}<h2>${st.title}</h2>${st.html}<div class="trace"><div class="tcode">${st.code.split("\n").map((l,i)=>`<div class="tl" id="tl-${i}"><i>${i+1}</i><span>${hl(l)||" "}</span></div>`).join("")}</div>
    <div class="tside"><div class="tsay" id="tsay"><b>Qué hace Godot</b>Tocá <b style="display:inline;letter-spacing:0;text-transform:none;font-family:inherit;font-size:inherit;color:inherit">Siguiente línea</b> para ver qué hace Godot, paso a paso.</div>
    ${st.steps.some(x=>x.vars)?'<div><div class="kicker" style="margin-bottom:6px">Cajas (variables)</div><div class="vars" id="tvars"><span style="color:var(--muted);font-size:14px">Todavía no hay cajas.</span></div></div>':""}
    <div class="out" id="tout"><div class="h">Salida</div></div></div></div>
    <div class="tbtns"><button class="btn" id="tnext">▶ Siguiente línea</button><button class="btn ghost" id="treset">Reiniciar</button></div>`;
  if(st.type==="lab")body=`${head}<h2>${st.title}</h2>${st.html}<div id="labhost"></div>`;
  if(st.type==="run")body=`${head}<h2>${st.title}</h2>${st.html}<pre class="code">${hl(st.code)}</pre>
    <div class="runrow"><button class="btn" id="runbtn">▶ Ejecutar (F6)</button></div><div class="out" id="out"><div class="h">Salida vacía. Tocá Ejecutar.</div></div>`;
  if(st.type==="quiz")body=`${head}<h2>${esc(st.q)}</h2>${st.code?`<pre class="code">${hl(st.code)}</pre>`:""}<div class="opts">${st.options.map((o,k)=>`<button class="opt" data-k="${k}" aria-pressed="false">${esc(o)}</button>`).join("")}</div>`;
  if(st.type==="fill"){const parts=st.code.split("____");
    body=`${head}<h2>${esc(st.q)}</h2><pre class="code">${hl(parts[0])}<span class="blank" id="blank">&nbsp;</span>${hl(parts[1]||"")}</pre>
    <div class="chips">${st.options.map((o,k)=>`<button class="chip" data-k="${k}" aria-pressed="false">${esc(o)}</button>`).join("")}</div>`}
  app.innerHTML=`<div class="lesson">
    <div class="lhead"><button class="xbtn" id="quit" aria-label="Salir de la lección"><svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      <div class="bar"><span style="width:${L.s/les.steps.length*100}%"></span></div></div>
    <div class="step">${body}</div>
    <div class="lfoot"><div class="fb" id="fb"></div><button class="btn" id="next" ${L.checked?"":"disabled"}>${L.checked?"Continuar":"Comprobar"}</button></div>
  </div>`;
  $("#quit").onclick=()=>FPS_COURSES.includes(L.c)?renderLessons():renderGDSChoice();
  if(st.type==="preview")mountPreview($("#pvhost"),{mode:st.mode,openOptions:st.openOptions});
  if(st.type==="lab")mountLab($("#labhost"),st.lab);
  if(st.type==="trace")runTrace(st);
  if(st.type==="run")$("#runbtn").onclick=()=>{const out=$("#out");blip(520);
    out.innerHTML='<div class="h">--- Ejecutando escena ---</div>';
    st.out.forEach((line,k)=>setTimeout(()=>{const d=document.createElement("div");d.textContent=line;out.appendChild(d);blip(700+k*40)},300+k*260))};
  const pick=sel=>{app.querySelectorAll(sel).forEach(b=>b.onclick=()=>{if(L.checked)return;
      app.querySelectorAll(sel).forEach(x=>x.setAttribute("aria-pressed","false"));b.setAttribute("aria-pressed","true");L.sel=+b.dataset.k;
      if(st.type==="fill")$("#blank").textContent=st.options[L.sel];$("#next").disabled=false;blip(640)})};
  if(st.type==="quiz")pick(".opt");if(st.type==="fill")pick(".chip");
  $("#next").onclick=()=>{
    if(L.checked){L.s++;if(L.s>=les.steps.length)finish();else{renderStep();scrollTo(0,0)}return}
    const ok=L.sel===st.answer,fb=$("#fb"),nx=$("#next");L.checked=true;
    if(st.type==="quiz"){app.querySelectorAll(".opt").forEach(b=>{const k=+b.dataset.k;if(k===st.answer)b.classList.add("right");else if(k===L.sel)b.classList.add("wrong")})}
    else{const bl=$("#blank");bl.classList.add(ok?"right":"wrong");if(!ok)bl.textContent=st.options[st.answer]}
    if(ok){fb.className="fb ok";fb.innerHTML=`¡Bien, burro sabio!<small>${esc(st.explain)}</small>`;nx.className="btn ok";blip(880)}
    else{L.mistakes++;fb.className="fb bad";fb.innerHTML=`No era esa. La correcta está marcada.<small>${esc(st.explain)}</small>`;nx.className="btn bad";blip(200)}
    nx.textContent="Continuar";
  };
}
function finish(){
  stop3D();
  const ls=COURSES[L.c].lessons,les=ls[L.i],first=!progress.done.includes(les.id),gain=first?les.xp:5;
  if(first)progress.done.push(les.id);progress.xp+=gain;store.set("agb-progreso",progress);
  const grew=registerStudy();updStats();const st=currentStreak();
  const nextI=L.i+1<ls.length?L.i+1:null,c=L.c;
  const nx=COURSES[c].next,courseEnd=nextI===null&&!!nx;
  app.innerHTML=`<div class="lesson"><div class="step finish">
    <div class="kicker">${nextI===null?((c==="cero"||c.startsWith("gds"))?`¡${COURSES[c].tag.split("· ")[1]} completo!`:"¡Unidad completa!"):"Lección completa"}</div><div class="big">+${gain} XP</div>
    <div class="fire">${FLAME}${grew?`¡Racha de ${st} ${st===1?"día":"días"}!`:`Racha: ${st} ${st===1?"día":"días"} (hoy ya contaba)`}</div>
    <h2 style="margin-top:12px">${esc(les.title)}</h2>
    <p>${L.mistakes===0?"Sin errores. Impecable.":`Tuviste ${L.mistakes} error${L.mistakes>1?"es":""}. Podés repetirla cuando quieras.`} ${first?"":"Por repasar sumás 5 XP."}${courseEnd?` Lo siguiente es: ${esc(COURSES[nx].title)}.`:nextI===null?" Pronto llegan las próximas unidades.":""}</p>
    ${GDS_PATH.includes(c)&&gdsTotals().all?`<p class="dip-unlock"><b>¡Completaste los 7 niveles de GDScript!</b> Ya podés obtener tu diploma.</p>`:""}
    <div class="row-btns">
      ${GDS_PATH.includes(c)&&gdsTotals().all?'<button class="btn ok" id="f-dip">Obtener mi diploma</button>':""}
      <button class="btn ghost" id="f-home">Volver al inicio</button>
      <button class="btn ghost" id="f-godot">Abrir Godot interactivo</button>
      ${nextI!==null?`<button class="btn" id="f-next">Siguiente: ${esc(ls[nextI].title)}</button>`:courseEnd?`<button class="btn" id="f-menu">Seguir con: ${esc(COURSES[nx].title)}</button>`:""}
    </div></div></div>`;
  $("#f-home").onclick=renderInicio;$("#f-godot").onclick=()=>go("godot");
  if($("#f-dip"))$("#f-dip").onclick=renderDiploma;
  if(nextI!==null)$("#f-next").onclick=()=>startLesson(c,nextI);
  if(courseEnd)$("#f-menu").onclick=()=>startLesson(nx,nextIn(nx));
}

/* =================== diploma de GDScript =================== */
const GDS_PATH=["cero","gds","gds2","gds3","gds4","gds5","gds6"];
const GDS_SHORT=["Fundamentos","GDScript 3D","Intermedio","Avanzado","Arquitectura","Matemática 3D","Profesional"];
function gdsTotals(){const tot=GDS_PATH.reduce((a,c)=>a+COURSES[c].lessons.length,0),done=GDS_PATH.reduce((a,c)=>a+courseDone(c),0);return {tot,done,all:done>=tot}}
function diplomaCode(nombre,fecha){let h=2166136261;for(const ch of nombre+"|"+fecha){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)>>>0}
  const s=h.toString(36).toUpperCase().padStart(7,"0");return `AGB-${s.slice(0,4)}-${s.slice(4)}`}
function fechaLarga(iso){const m=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];const d=parseDay(iso);return `${d.getDate()} de ${m[d.getMonth()]} de ${d.getFullYear()}`}

function dibujarDiploma(cv,nombre,fecha){
  const W=2000,H=1414,x=cv.getContext("2d");cv.width=W;cv.height=H;
  const NAVY="#16202c",ORANGE="#c98a3c",PAPER="#f7f5ef",INK="#3d4652",SOFT="#8a93a0";
  x.fillStyle=PAPER;x.fillRect(0,0,W,H);
  // trama sutil de grilla, como papel milimetrado de editor
  x.strokeStyle="rgba(22,32,44,.035)";x.lineWidth=1;for(let i=0;i<W;i+=40){x.beginPath();x.moveTo(i,0);x.lineTo(i,H);x.stroke()}for(let j=0;j<H;j+=40){x.beginPath();x.moveTo(0,j);x.lineTo(W,j);x.stroke()}
  x.strokeStyle=NAVY;x.lineWidth=16;x.strokeRect(44,44,W-88,H-88);
  x.strokeStyle=ORANGE;x.lineWidth=3;x.strokeRect(78,78,W-156,H-156);
  x.fillStyle=ORANGE;[[78,78],[W-78,78],[78,H-78],[W-78,H-78]].forEach(([a,b])=>{x.save();x.translate(a,b);x.rotate(Math.PI/4);x.fillRect(-11,-11,22,22);x.restore()});
  const C=(t,y,font,color,ls=0)=>{x.font=font;x.fillStyle=color;x.textAlign="center";x.textBaseline="alphabetic";
    if(ls){const chars=[...t],w=chars.reduce((a,c)=>a+x.measureText(c).width,0)+ls*(chars.length-1);let px=W/2-w/2;x.textAlign="left";chars.forEach(c=>{x.fillText(c,px,y);px+=x.measureText(c).width+ls})}else x.fillText(t,W/2,y)};
  // orejas de burro
  const ear=(cx,rot)=>{x.save();x.translate(cx,215);x.rotate(rot);x.fillStyle=ORANGE;x.beginPath();x.ellipse(0,0,22,58,0,0,Math.PI*2);x.fill();x.fillStyle="#f1cf9f";x.beginPath();x.ellipse(0,6,11,40,0,0,Math.PI*2);x.fill();x.restore()};
  ear(W/2-30,-.25);ear(W/2+30,.25);
  C("APRENDE GODOT BURRO",318,'600 30px "Chakra Petch", Arial, sans-serif',NAVY,10);
  C("DIPLOMA",450,'700 128px "Chakra Petch", Arial, sans-serif',NAVY,14);
  C("CAMINO COMPLETO DE GDSCRIPT · GODOT 4",510,'700 28px "Chakra Petch", Arial, sans-serif',ORANGE,7);
  C("Se otorga a",612,'600 36px Nunito, Arial, sans-serif',SOFT);
  let size=118;x.font=`italic 600 ${size}px "Cormorant Garamond", Georgia, serif`;while(x.measureText(nombre).width>1500&&size>50){size-=4;x.font=`italic 600 ${size}px "Cormorant Garamond", Georgia, serif`}
  C(nombre,740,x.font,NAVY);
  x.strokeStyle=ORANGE;x.lineWidth=2;x.beginPath();x.moveTo(W/2-560,772);x.lineTo(W/2+560,772);x.stroke();
  C("por completar los 7 niveles y las 43 lecciones del camino de GDScript,",850,'400 34px Nunito, Arial, sans-serif',INK);
  C("desde los fundamentos de la programación hasta el desarrollo profesional de juegos 3D.",900,'400 34px Nunito, Arial, sans-serif',INK);
  // los 7 niveles
  const y0=1005,gap=228,start=W/2-gap*3;
  x.strokeStyle="rgba(201,138,60,.55)";x.lineWidth=3;x.beginPath();x.moveTo(start,y0);x.lineTo(start+gap*6,y0);x.stroke();
  GDS_SHORT.forEach((t,i)=>{const cx=start+gap*i;x.fillStyle=NAVY;x.beginPath();x.arc(cx,y0,32,0,Math.PI*2);x.fill();
    x.font='700 30px "Chakra Petch", Arial, sans-serif';x.fillStyle="#fff";x.textAlign="center";x.fillText(String(i),cx,y0+11);
    x.font='700 22px Nunito, Arial, sans-serif';x.fillStyle=INK;x.fillText(t,cx,y0+72)});
  // firmas
  const sig=(cx,big,small)=>{x.strokeStyle=NAVY;x.lineWidth=2;x.beginPath();x.moveTo(cx-230,1218);x.lineTo(cx+230,1218);x.stroke();
    x.textAlign="center";x.font='600 34px Nunito, Arial, sans-serif';x.fillStyle=NAVY;x.fillText(big,cx,1200);
    x.font='700 20px "Chakra Petch", Arial, sans-serif';x.fillStyle=SOFT;x.fillText(small,cx,1252)};
  sig(470,fechaLarga(fecha),"FECHA");sig(W-470,"Hornero Development","EMITIDO POR");
  x.textAlign="center";x.font='600 22px "JetBrains Mono", monospace';x.fillStyle=SOFT;x.fillText(`N.º ${diplomaCode(nombre,fecha)}`,W/2,1212);
  x.font='400 19px Nunito, Arial, sans-serif';x.fillText("Certificado de finalización de un curso en línea · hornero-development.github.io/aprende-godot-burro",W/2,1300);
}

function renderDiploma(){
  stop3D();setNav("gds");location.hash="diploma";
  const g=gdsTotals();
  if(!g.all){
    app.innerHTML=`<section class="dip-wrap"><div class="kicker">Diploma de GDScript</div><h1>Todavía te falta un poco</h1>
      <p class="lead">El diploma se desbloquea cuando completás las ${g.tot} lecciones de los 7 niveles de GDScript. Vas ${g.done} de ${g.tot}.</p>
      <div class="bar dip-bar"><span style="width:${g.done/g.tot*100}%"></span></div>
      <ul class="dip-levels">${GDS_PATH.map((c,i)=>{const d=courseDone(c),n=COURSES[c].lessons.length;
        return `<li class="${d===n?"ok":""}"><b>${i}</b><span>${esc(COURSES[c].title)}</span><em>${d} / ${n}</em></li>`}).join("")}</ul>
      <button class="btn" id="dip-go">Seguir aprendiendo</button></section>`;
    $("#dip-go").onclick=()=>{const c=GDS_PATH.find(c=>courseDone(c)<COURSES[c].lessons.length);startLesson(c,nextIn(c))};return}
  user.diploma=user.diploma||{nombre:"",apellido:"",fecha:dayStr()};
  const D=user.diploma;
  app.innerHTML=`<section class="dip-wrap"><div class="kicker">¡Completaste GDScript!</div><h1>Tu diploma</h1>
    <p class="lead">Escribí tu nombre y apellido tal como querés que aparezcan. Se guarda en este navegador.</p>
    <form class="dip-form" id="dip-form" novalidate>
      <div class="field"><label for="dip-nom">Nombre</label><input id="dip-nom" maxlength="30" autocomplete="given-name" value="${esc(D.nombre)}" placeholder="Leandro"></div>
      <div class="field"><label for="dip-ape">Apellido</label><input id="dip-ape" maxlength="30" autocomplete="family-name" value="${esc(D.apellido)}" placeholder="Fernández"></div>
    </form>
    <div class="err" id="dip-err"></div>
    <div class="dip-sheet"><img id="dip-img" alt="Diploma de GDScript de Aprende Godot Burro"></div>
    <div class="row-btns" style="justify-content:flex-start">
      <button class="btn" id="dip-dl">Descargar imagen (PNG)</button>
      <button class="btn ghost" id="dip-print">Imprimir o guardar en PDF</button>
    </div>
    <p class="dip-note" id="dip-note">Si la descarga no arranca, hacé clic derecho sobre el diploma y elegí "Guardar imagen como…".</p></section>
    <canvas id="dip-cv" hidden></canvas>`;
  const cv=$("#dip-cv"),img=$("#dip-img");
  const full=()=>`${$("#dip-nom").value.trim()} ${$("#dip-ape").value.trim()}`.trim();
  const draw=()=>{const n=full()||"Tu nombre y apellido";dibujarDiploma(cv,n,D.fecha);try{img.src=cv.toDataURL("image/png")}catch(e){}};
  const save=()=>{D.nombre=$("#dip-nom").value.trim();D.apellido=$("#dip-ape").value.trim();store.set("agb-usuario",user)};
  const fonts=['700 40px "Chakra Petch"','italic 600 40px "Cormorant Garamond"','400 20px Nunito','600 20px "JetBrains Mono"'];
  Promise.all(fonts.map(f=>document.fonts&&document.fonts.load?document.fonts.load(f).catch(()=>{}):null)).then(draw);draw();
  $("#dip-form").addEventListener("input",()=>{save();draw();$("#dip-err").textContent=""});
  const ok=()=>{if(!$("#dip-nom").value.trim()||!$("#dip-ape").value.trim()){$("#dip-err").textContent="Escribí tu nombre y tu apellido para completar el diploma.";return false}return true};
  $("#dip-dl").onclick=()=>{if(!ok())return;draw();
    cv.toBlob(b=>{if(!b)return;const u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download=`diploma-gdscript-${full().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-")}.png`;
      document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000);blip(880)},"image/png")};
  $("#dip-print").onclick=()=>{if(!ok())return;draw();try{window.print()}catch(e){}};
}

/* =================== patio =================== */
function renderPatio(){
  setNav("patio");location.hash="patio";let mode=S.ok?"3d":"flat";
  app.innerHTML=`<section class="patio">
    <h1>Patio de juegos</h1>
    <p class="lead">Compará el menú plano con el 3D, probá escenarios y mirá a la derecha el árbol de nodos y el script que usarías en Godot.</p>
    <div style="min-width:0"><div id="pvhost"></div>
      <div class="ctrls">
        <div class="seg"><span>Estilo</span><div id="seg-mode">
          <button data-v="flat" aria-pressed="${mode==="flat"}">Plano</button>
          <button data-v="3d" aria-pressed="${mode==="3d"}" ${S.ok?"":"disabled"}>3D en movimiento</button></div></div>
        <div class="seg"><span>Escenario</span><div id="seg-theme">
          ${["nieve","desierto","noche"].map(t=>`<button data-v="${t}" aria-pressed="${S.theme===t}">${t[0].toUpperCase()+t.slice(1)}</button>`).join("")}</div></div>
      </div></div>
    <aside class="side"><h3>Árbol de la escena</h3><div class="tree" id="p-tree"></div><h3 id="p-scr-t"></h3><pre class="code" id="p-code"></pre></aside></section>`;
  const pv=mountPreview($("#pvhost"),{mode});
  const side=()=>{$("#p-tree").innerHTML=mode==="3d"?TREE_3D:TREE_PLANO;$("#p-scr-t").textContent=mode==="3d"?"fondo.gd":"menu.gd";$("#p-code").innerHTML=hl(mode==="3d"?FONDO_GD:MENU_GD)};side();
  $("#seg-mode").onclick=e=>{const b=e.target.closest("button");if(!b||b.disabled)return;mode=b.dataset.v;$("#seg-mode").querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));pv.setMode(mode);side()};
  $("#seg-theme").onclick=e=>{const b=e.target.closest("button");if(!b)return;applyTheme(b.dataset.v);$("#seg-theme").querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));pv.refreshTheme()};
}

