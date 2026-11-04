/* =================== GUÍA VISUAL: réplica del editor de Godot con el lugar señalado ===================
   Se monta debajo de un paso de lección. Cada guía es una lista de pasos; cada paso cambia el estado
   de la réplica (lo que no cambia se hereda del paso anterior) y señala UNA parte con un aro naranja. */
const GG_W=1100,GG_H=640;

const GG_SCENE_MENU=[["New Scene","Ctrl+N"],["New Inherited Scene...","Ctrl+Shift+N"],["Open Scene...","Ctrl+O"],["Reopen Closed Scene","Ctrl+Shift+T"],["Open Recent",""],"-",
  ["Save Scene","Ctrl+S"],["Save Scene As...","Ctrl+Shift+S"],["Save All Scenes","Ctrl+Shift+Alt+S"],"-",["Quick Open...","Shift+Alt+O"],"-",["Close Scene","Ctrl+Shift+W"],["Quit","Ctrl+Q"]];
const GG_DEBUG_MENU=[["Deploy with Remote Debug",""],["Small Deploy with Network Filesystem",""],"-",["☐ Visible Collision Shapes",""],["☐ Visible Paths",""],["☐ Visible Navigation",""],["☐ Visible Avoidance",""],"-",["Debug CanvasItem Redraws",""],["Synchronize Script Changes",""],["Synchronize Scene Changes",""],"-",["Keep Debug Server Open",""],["Customize Run Instances...",""]];
const GG_PROJECT_MENU=[["Project Settings...",""],["Version Control",""],"-",["Export...",""],["Install Android Build Template...",""],"-",["Open User Data Folder",""],["Reload Current Project",""],["Quit to Project List","Ctrl+Shift+Q"]];

/* propiedades que muestra el Inspector según el tipo de nodo */
const GG_PROPS={
 Control:[["#Control"],["Clip Contents","off"],["Custom Minimum Size","0  0"],["@Layout"],["Layout Mode","Anchors"],["Anchors Preset","Full Rect"],["@Theme"],["Theme","<empty>"]],
 Button:[["#Button"],["Text",""],["Icon","<empty>"],["Flat","off"],["@Text Behavior"],["Alignment","Center"],["#BaseButton"],["Disabled","off"],["Toggle Mode","off"],["#Control"],["@Layout"],["Custom Minimum Size","0  0"]],
 Label:[["#Label"],["Text",""],["Label Settings","<empty>"],["Horizontal Alignment","Left"],["Vertical Alignment","Top"],["Autowrap Mode","Off"],["#Control"],["@Layout"],["Anchors Preset","Top Left"]],
 TextureRect:[["#TextureRect"],["Texture","<empty>"],["Expand Mode","Keep Size"],["Stretch Mode","Scale"],["Flip H","off"],["#Control"],["@Layout"],["Anchors Preset","Top Left"]],
 VBoxContainer:[["#BoxContainer"],["Alignment","Begin"],["#Control"],["@Layout"],["Layout Mode","Anchors"],["Anchors Preset","Top Left"],["@Theme Overrides"],["Separation","4"]]
};
/* tipos que la réplica usa y el editor interactivo no traía */
[["Marker3D","3d","Una marca invisible con posición y rotación."],["Label3D","3d","Un texto que vive en el mundo 3D."],["PanelContainer","ui","Un panel con fondo que acomoda a su hijo."],["StaticBody3D","3d","Un cuerpo que no se mueve, como una pared."]]
  .forEach(([n,c,d])=>{if(typeof TYPES!=="undefined"&&!TYPES[n])TYPES[n]={c,d}});
const GG_T3D=[["@Transform"],["Position","0  0  0"],["Rotation","0  0  0"],["Scale","1  1  1"]];
Object.assign(GG_PROPS,{
 Node3D:[["#Node3D"],...GG_T3D,["@Visibility"],["Visible","on"]],
 MeshInstance3D:[["#MeshInstance3D"],["Mesh","<empty>"],["Skeleton","..",],["#GeometryInstance3D"],["@Geometry"],["Material Override","<empty>"],["Cast Shadow","On"],["#Node3D"],...GG_T3D],
 Camera3D:[["#Camera3D"],["Keep Aspect","Keep Height"],["Current","off"],["FOV","75"],["Near","0.05"],["Far","4000"],["#Node3D"],...GG_T3D],
 OmniLight3D:[["#OmniLight3D"],["@Omni"],["Range","5"],["Attenuation","1"],["#Light3D"],["@Light"],["Color","color:#ffffff"],["Energy","1"],["@Shadow"],["Enabled","off"],["#Node3D"],...GG_T3D],
 WorldEnvironment:[["#WorldEnvironment"],["Environment","<empty>"],["Camera Attributes","<empty>"],["Compositor","<empty>"]],
 Marker3D:[["#Marker3D"],["Gizmo Extents","0.25"],["#Node3D"],...GG_T3D],
 Area3D:[["#Area3D"],["Monitoring","on"],["Monitorable","on"],["#CollisionObject3D"],["Input Ray Pickable","on"],["#Node3D"],...GG_T3D],
 CollisionShape3D:[["#CollisionShape3D"],["Shape","<empty>"],["Disabled","off"],["#Node3D"],...GG_T3D],
 Label3D:[["#Label3D"],["Text",""],["Font Size","32"],["Billboard","Disabled"],["Modulate","color:#ffffff"],["#Node3D"],...GG_T3D],
 CanvasLayer:[["#CanvasLayer"],["Layer","1"],["Visible","on"],["Offset","0  0"]],
 PanelContainer:[["#Control"],["@Layout"],["Layout Mode","Anchors"],["Anchors Preset","Top Left"],["@Visibility"],["Visible","on"]]
});
[["RayCast3D","3d","Un rayo que detecta lo que toca."],["AudioStreamPlayer3D","3d","Sonido con posición en el espacio."],["CharacterBody3D","3d","El cuerpo del jugador."],["DirectionalLight3D","3d","Luz como el sol."],["GPUParticles3D","3d","Partículas."],["StaticBody3D","3d","Cuerpo quieto."]].forEach(([n,c,d])=>{if(typeof TYPES!=="undefined"&&!TYPES[n])TYPES[n]={c,d}});
Object.assign(GG_PROPS,{
 HSlider:[["#Range"],["Min Value","0"],["Max Value","100"],["Step","1"],["Value","0"],["#Control"],["@Layout"],["Custom Minimum Size","0  0"]],
 CheckButton:[["#Button"],["Text",""],["#BaseButton"],["Button Pressed","off"],["Toggle Mode","on"],["#Control"],["@Layout"],["Custom Minimum Size","0  0"]],
 ColorRect:[["#ColorRect"],["Color","color:#ffffff"],["#Control"],["@Layout"],["Anchors Preset","Top Left"],["@Mouse"],["Filter","Stop"],["#CanvasItem"],["@Visibility"],["Modulate","color:#ffffff"]],
 CharacterBody3D:[["#CharacterBody3D"],["Motion Mode","Grounded"],["Up Direction","0  1  0"],["@Floor"],["Max Angle","45"],["#Node3D"],...GG_T3D],
 DirectionalLight3D:[["#DirectionalLight3D"],["#Light3D"],["@Light"],["Color","color:#ffffff"],["Energy","1"],["@Shadow"],["Enabled","off"],["#Node3D"],...GG_T3D],
 GPUParticles3D:[["#GPUParticles3D"],["Emitting","on"],["Amount","8"],["@Drawing"],["Visibility AABB",".."],["Process Material","<empty>"],["@Draw Passes"],["Pass 1","<empty>"]],
 RayCast3D:[["#RayCast3D"],["Enabled","on"],["Exclude Parent","on"],["Target Position","0  -1  0"],["Collision Mask","1"],["Hit From Inside","off"],["#Node3D"],...GG_T3D],
 AudioStreamPlayer3D:[["#AudioStreamPlayer3D"],["Stream","<empty>"],["Volume dB","0"],["Unit Size","10"],["Autoplay","off"],["Max Distance","0"],["Bus","Master"],["#Node3D"],...GG_T3D],
 AnimationPlayer:[["#AnimationPlayer"],["Current Animation","[stop]"],["Autoplay on Load","[stop]"],["#AnimationMixer"],["Active","on"],["Root Node",".."]],
 StaticBody3D:[["#StaticBody3D"],["Physics Material Override","<empty>"],["#CollisionObject3D"],["@Collision"],["Layer","1"],["#Node3D"],...GG_T3D]
});
const GG_SIGNALS={
 Button:[["BaseButton",["button_down()","button_up()","pressed()","toggled(toggled_on: bool)"]],["Control",["focus_entered()","focus_exited()","gui_input(event: InputEvent)","mouse_entered()","mouse_exited()","resized()"]],["CanvasItem",["draw()","hidden()","visibility_changed()"]],["Node",["ready()","tree_entered()","tree_exited()"]]],
 HSlider:[["Range",["changed()","value_changed(value: float)"]],["Slider",["drag_ended(value_changed: bool)","drag_started()"]],["Control",["focus_entered()","mouse_entered()","resized()"]],["Node",["ready()"]]],
 CheckButton:[["BaseButton",["button_down()","button_up()","pressed()","toggled(toggled_on: bool)"]],["Control",["focus_entered()","mouse_entered()","resized()"]],["Node",["ready()"]]],
 Control:[["Control",["focus_entered()","focus_exited()","gui_input(event: InputEvent)","mouse_entered()","mouse_exited()","resized()"]],["CanvasItem",["draw()","hidden()","visibility_changed()"]],["Node",["ready()","tree_entered()","tree_exited()"]]]
};
const GG_SCRIPT_TPL=`extends Control


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass`;

/* colores de GDScript como en el editor de Godot */
function ggHL(line){
  const re=/(#.*$)|("(?:[^"\\]|\\.)*")|(\$[A-Za-z_\/]+)|(@\w+)|\b(extends|func|var|const|if|else|elif|for|in|return|await|true|false|and|or|not|signal|pass|is)\b|\b(void|float|int|bool|String|Vector2|Vector3|Control|Node3D|Node)\b|\b(\d+\.?\d*)\b|\b([A-Za-z_]\w*)(?=\()/g;
  let out="",last=0,m;
  while((m=re.exec(line))){out+=esc(line.slice(last,m.index));
    const c=m[1]?"c":m[2]?"s":m[3]?"np":m[4]?"an":m[5]?"k":m[6]?"ty":m[7]?"n":"f";
    out+=`<span class="g-${c}">${esc(m[0])}</span>`;last=re.lastIndex}
  return out+esc(line.slice(last));
}

function ggTree(st){
  if(!st.tree||!st.tree.length)return `<div class="gg-empty"><div class="gg-muted">Create Root Node:</div>
    <button data-t="root-2d">${nodeIcon("Node2D")}2D Scene</button><button data-t="root-3d">${nodeIcon("Node3D")}3D Scene</button>
    <button data-t="root-ui">${nodeIcon("Control")}User Interface</button><button data-t="root-other">${ic("plus")}Other Node</button></div>`;
  return st.tree.map(([name,type,d,flags=""])=>`<div class="gg-tr ${name===st.sel?"sel":""} ${flags.includes("hid")?"hid":""}" data-t="node-${name}" style="padding-left:${6+d*16}px">
    ${nodeIcon(type)}<span class="nm">${esc(st.rename===name?"":name)}${st.rename===name?`<span class="gg-edit">${esc(name)}</span>`:""}</span>
    <span class="ri">${flags.includes("sig")?`<span class="gg-sig" data-t="sigic-${name}">${ic("signal")}</span>`:""}${flags.includes("scr")?`<span data-t="scric-${name}">${ic("script")}</span>`:""}${flags.includes("inst")?`<span data-t="instic-${name}">${ic("link")}</span>`:""}${["ui","3d","2d"].includes((TYPES[type]||{}).c)||type==="CanvasLayer"?`<span data-t="eye-${name}">${ic(flags.includes("hid")?"eyeoff":"eye")}</span>`:""}</span></div>`).join("");
}
function ggType(st,name){const r=(st.tree||[]).find(x=>x[0]===name);return r?r[1]:null}
function ggVal(st,node,prop,def){return (st.vals&&st.vals[node]&&st.vals[node][prop]!==undefined)?st.vals[node][prop]:def}

function ggInspector(st){
  const t=ggType(st,st.sel);
  if(!t)return `<div class="gg-muted gg-pad">Seleccioná un nodo para ver sus propiedades.</div>`;
  if(st.dock==="grp"){const gs=(st.groups&&st.groups[st.sel])||[];
    return `<div class="gg-ibar"><span class="gg-tb" data-t="grp-add">${ic("plus")}</span><span class="gg-search">Filter Groups</span></div>
      <div class="gg-ihead">${nodeIcon(t)}<b>${esc(st.sel)}</b><span class="gg-muted">Scene Groups</span></div>
      <div class="gg-props">${gs.length?gs.map(g=>`<div class="gg-prop" data-t="grp-${g}"><span><span class="gg-chk on"></span>${esc(g)}</span><span></span></div>`).join(""):'<div class="gg-muted gg-pad">Sin grupos todavía.</div>'}</div>`}
  if(st.dock==="sig"){
    const groups=GG_SIGNALS[t]||GG_SIGNALS.Control,con=(st.conn&&st.conn[st.sel])||{};
    return `<div class="gg-ibar"><span class="gg-search">Filter Signals</span></div><div class="gg-sigs">`+groups.map(([g,list])=>`<div class="gg-grp">${nodeIcon(g==="BaseButton"?"Button":g==="Range"||g==="Slider"?"HSlider":g==="Node"?"Node":"Control")}${g}</div>`+
      list.map(s=>{const k=s.split("(")[0],c=con[k];return `<div class="gg-srow ${c?"on":""}" data-t="sig-${k}">${ic("signal")}<span>${esc(s)}</span></div>`+
        (c?`<div class="gg-srow sub" data-t="conn-${k}"><span class="gg-arrow">↳</span>${esc(c)}</div>`:"")}).join("")).join("")+
      `</div><div class="gg-sigfoot"><button data-t="sig-connect">Connect...</button></div>`;
  }
  const ex=(st.exports&&st.exports[st.sel])||null,meta=(st.meta&&st.meta[st.sel])||[],expd=(st.expand||{});
  const rows=[...(ex?[["#"+ex.script],...ex.vars]:[]),...(GG_PROPS[t]||GG_PROPS.Control)];
  return `<div class="gg-ibar">${ic("tscn")}${ic("folder")}<span class="gg-sp"></span>${ic("tri")}</div>
    <div class="gg-ihead" data-t="insp-head">${nodeIcon(t)}<b>${t}</b><span class="gg-muted">${esc(st.sel)}</span></div>
    <div class="gg-ibar"><span class="gg-search">Filter Properties</span></div><div class="gg-props">`+
    rows.map(([k,v])=>{
      if(k[0]==="#")return `<div class="gg-sec">${nodeIcon(t)}${k.slice(1)}</div>`;
      if(k[0]==="@")return `<div class="gg-sub">${ic("tridown")}${k.slice(1)}</div>`;
      const val=ggVal(st,st.sel,k,v);let body;
      if(val==="off"||val==="on")body=`<span><span class="gg-chk ${val==="on"?"on":""}"></span>On</span>`;
      else if(String(val).startsWith("color:"))body=`<span class="gg-field gg-swatch" style="background:${val.slice(6)}"></span>`;
      else if(String(val).startsWith("file:"))body=`<span class="gg-field gg-filef">${esc(val.slice(5))}<span>${ic("folder")}</span></span>`;
      else if(/^-?[\d.]+(\s+-?[\d.]+){1,2}$/.test(String(val).trim()))body=`<span class="gg-vec">${String(val).trim().split(/\s+/).map((n,j)=>`<span class="gg-field"><i class="ax${j}">${"xyz"[j]}</i>${esc(n)}</span>`).join("")}</span>`;
      else body=`<span class="gg-field ${val==="<empty>"?"mut":""} ${expd[k]?"res":""}">${expd[k]?ic("tridown"):""}${esc(val)}${val==="<empty>"||expd[k]?'<span class="gg-dd">▾</span>':""}</span>`;
      const sub=expd[k]?`<div class="gg-resbox">${expd[k].map(([a,b])=>a[0]==="@"?`<div class="gg-sub">${ic("tridown")}${a.slice(1)}</div>`:`<div class="gg-prop" data-t="prop-${a}"><span class="k">${a}</span>${String(b).startsWith("color:")?`<span class="gg-field gg-swatch" style="background:${b.slice(6)}"></span>`:`<span class="gg-field">${esc(b)}</span>`}</div>`).join("")}</div>`:"";
      return `<div class="gg-prop" data-t="prop-${k}"><span class="k">${k}</span>${body}</div>${sub}`}).join("")+
    `<div class="gg-sub">${ic("tridown")}Metadata</div>${meta.map(([a,b])=>`<div class="gg-prop" data-t="meta-${a}"><span class="k">${a}</span><span class="gg-field">${esc(b)}</span></div>`).join("")}
     <div class="gg-addmeta"><button data-t="add-meta">${ic("plus")}Add Metadata</button></div></div>`;
}

function ggCanvas(st){
  const t=ggType(st,st.sel),isUI=["Control","Button","Label","TextureRect","VBoxContainer"].includes(t);
  const tools=["select","move","rotate","scale","ruler","lock","group","magnet"].map((n,i)=>`<span class="gg-tb ${i===0?"on":""}" ${i===0?'data-t="tool-select"':""}>${ic(n)}</span>`).join("");
  const anchor=isUI?`<span class="gg-sepv"></span><span class="gg-tb gg-anchor" data-t="anchor">${ggAnchorIcon()}</span>`:"";
  const has=n=>(st.tree||[]).some(x=>x[0]===n);
  const tr=st.tree||[],vi=tr.findIndex(x=>x[0]==="VBox"),vd=vi>=0?tr[vi][2]:0,inV=[];
  if(vi>=0)for(let j=vi+1;j<tr.length&&tr[j][2]>vd;j++)inV.push(tr[j]);
  const btns=inV.filter(x=>x[1]==="Button").map(x=>`<span class="gg-cbtn ${x[0]===st.sel?"sel":""}" data-t="cv-${x[0]}">${esc(ggVal(st,x[0],"Text","")||" ")}</span>`).join("");
  const title=has("Titulo")?`<span class="gg-ctitle ${st.centered?"cen":""}" data-t="cv-Titulo">${esc(ggVal(st,"Titulo","Text",""))||"&nbsp;"}</span>`:"";
  const vbox=has("VBox")?`<div class="gg-cvbox ${st.centered?"cen":""} ${st.sel==="VBox"?"sel":""}" data-t="cv-VBox">${btns}</div>`:"";
  const fondo=has("Fondo")&&ggVal(st,"Fondo","Texture","<empty>")!=="<empty>"?'<div class="gg-cfondo"></div>':"";
  const fund=has("Fundido")?`<div class="gg-cfund ${st.sel==="Fundido"?"sel":""}" data-t="cv-Fundido" style="background:rgba(0,0,0,${ggVal(st,"Fundido","alpha",0)})"></div>`:"";
  return `<div class="gg-vtb">${tools}${anchor}<span class="gg-sp"></span><span class="gg-muted">View</span></div>
    <div class="gg-canvas" data-t="canvas"><div class="gg-axx"></div><div class="gg-axy"></div>
      <div class="gg-vrect" data-t="vrect">${st.tree&&st.tree.length&&ggType(st,st.tree[0][0])==="Control"?`<div class="gg-root ${st.sel===st.tree[0][0]?"sel":""}"></div>`:""}${fondo}${title}${vbox}${fund}</div></div>
    ${st.anchorMenu?ggAnchorMenu():""}`;
}
/* vista 3D: una sala dibujada en perspectiva con SVG. Cada pieza aparece si su nodo está en el árbol. */
const GG_3D={
 Piso:{c:[280,300],d:'<path d="M60 300 L500 300 L420 220 L140 220 Z" fill="#6d6f73" stroke="#8a8c90"/>'},
 ParedFondo:{c:[280,160],d:'<path d="M140 220 L420 220 L420 90 L140 90 Z" fill="#7c7e82" stroke="#9a9ca0"/>'},
 ParedIzq:{c:[110,200],d:'<path d="M60 300 L140 220 L140 90 L60 40 Z" fill="#696b6f" stroke="#86888c"/>'},
 MesaRadio:{c:[150,258],d:'<path d="M110 270 L190 270 L190 250 L110 250 Z" fill="#8a7f72"/><path d="M110 250 L190 250 L178 240 L122 240 Z" fill="#a39686"/>'},
 MesaTelefonos:{c:[400,262],d:'<path d="M360 274 L450 274 L450 254 L360 254 Z" fill="#8a7f72"/><path d="M360 254 L450 254 L438 244 L372 244 Z" fill="#a39686"/>'},
 ModeloMapa:{c:[280,150],d:'<rect x="200" y="110" width="160" height="82" fill="#5d7a56" stroke="#d8cfae" stroke-width="2"/><path d="M215 170 q30 -30 60 -10 t70 -25 M230 125 q20 20 50 10" fill="none" stroke="#3d5a8a" stroke-width="3"/><path d="M200 140 L360 140 M260 110 L260 192" stroke="rgba(0,0,0,.18)"/>'},
 Camera3D:{c:[280,330],d:'<g stroke="#c58cff" stroke-width="1.3" fill="none"><path d="M268 338 L292 338 L292 324 L268 324 Z" fill="#7d55b5"/><path d="M280 324 L220 230 M280 324 L340 230 M280 324 L230 200 M280 324 L330 200" stroke-dasharray="4 3"/><path d="M220 230 L340 230 L330 200 L230 200 Z"/></g>'},
 Lampara1:{c:[200,70],d:'<path d="M200 40 V62" stroke="#888"/><circle cx="200" cy="70" r="9" fill="#ffd27a"/><circle cx="200" cy="70" r="26" fill="rgba(255,200,110,.18)"/>'},
 Lampara2:{c:[360,70],d:'<path d="M360 40 V62" stroke="#888"/><circle cx="360" cy="70" r="9" fill="#ffd27a"/><circle cx="360" cy="70" r="26" fill="rgba(255,200,110,.18)"/>'},
 General:{c:[280,318],d:'<g stroke-width="2"><path d="M280 318 h16" stroke="#f05a5a"/><path d="M280 318 v-16" stroke="#7ad36a"/><path d="M280 318 l-10 8" stroke="#5a8cf0"/></g>'},
 Mapa:{c:[280,226],d:'<g stroke-width="2"><path d="M280 226 h16" stroke="#f05a5a"/><path d="M280 226 v-16" stroke="#7ad36a"/><path d="M280 226 l-10 8" stroke="#5a8cf0"/></g>'},
 Radio:{c:[170,232],d:'<g stroke-width="2"><path d="M170 232 h16" stroke="#f05a5a"/><path d="M170 232 v-16" stroke="#7ad36a"/><path d="M170 232 l-10 8" stroke="#5a8cf0"/></g>'},
 CollisionShape3D:{c:[280,150],d:'<rect x="194" y="104" width="172" height="94" fill="rgba(90,200,255,.08)" stroke="#5ac8ff" stroke-width="1.5" stroke-dasharray="5 3"/>'},
 Cartel:{c:[280,58],d:'<text x="280" y="62" text-anchor="middle" font-family="Chakra Petch,Arial" font-weight="700" font-size="15" fill="#f4e6c4">CUARTEL GENERAL</text>'},
 Pin1:{c:[235,165],d:'<circle cx="235" cy="165" r="5" fill="#e33"/>'},Pin2:{c:[300,135],d:'<circle cx="300" cy="135" r="5" fill="#e33"/>'},Pin3:{c:[330,175],d:'<circle cx="330" cy="175" r="5" fill="#e33"/>'},
 Esfera:{c:[280,170],d:'<circle cx="280" cy="170" r="26" fill="#d83a3a"/><circle cx="272" cy="161" r="8" fill="rgba(255,255,255,.35)"/>'},
 Capsula:{c:[280,250],d:'<rect x="250" y="150" width="60" height="180" rx="30" fill="rgba(90,200,255,.10)" stroke="#5ac8ff" stroke-width="1.6" stroke-dasharray="6 3"/>'},
 CuerpoJug:{c:[280,250],d:'<rect x="256" y="160" width="48" height="164" rx="24" fill="#c9cdd3"/>'},
 Cabeza:{c:[280,178],d:'<g stroke-width="2"><path d="M280 178 h14" stroke="#f05a5a"/><path d="M280 178 v-14" stroke="#7ad36a"/><path d="M280 178 l-9 7" stroke="#5a8cf0"/></g>'},
 CamJug:{c:[280,178],d:'<g stroke="#c58cff" stroke-width="1.3" fill="none"><path d="M270 184 L290 184 L290 172 L270 172 Z" fill="#7d55b5"/><path d="M280 172 L230 110 M280 172 L330 110 M230 110 L330 110" stroke-dasharray="4 3"/></g>'},
 Montanas:{c:[280,200],d:'<path d="M0 260 L90 150 L150 210 L240 110 L330 200 L410 130 L560 260 Z" fill="#59636e"/><path d="M240 110 L262 135 L248 132 L232 140 Z M410 130 L428 150 L414 148 L398 154 Z M90 150 L106 170 L94 168 L80 174 Z" fill="#eef2f6"/>'},
 Nieve:{c:[280,120],d:'<g fill="#fff" opacity=".85">'+Array.from({length:40},(_,i)=>`<circle cx="${(i*137)%560}" cy="${(i*71)%300}" r="${i%3?1.3:2}"/>`).join("")+'</g>'},
 Sol:{c:[470,60],d:'<circle cx="470" cy="60" r="10" fill="#ffe08a"/><path d="M470 60 l-40 50" stroke="#ffe08a" stroke-width="2"/><path d="M426 106 l2 -9 l6 6z" fill="#ffe08a"/>'},
 PisoNivel:{c:[280,300],d:'<path d="M20 340 L540 340 L440 230 L120 230 Z" fill="#6d7a62" stroke="#8a9a7c"/>'},
 PisoColision:{c:[280,300],d:'<path d="M20 340 L540 340 L440 230 L120 230 Z" fill="none" stroke="#5ac8ff" stroke-width="1.5" stroke-dasharray="6 3"/>'},
 JugInst:{c:[280,250],d:'<rect x="262" y="190" width="36" height="110" rx="18" fill="rgba(90,200,255,.12)" stroke="#5ac8ff" stroke-width="1.5" stroke-dasharray="5 3"/><path d="M272 206 L288 206 L288 198 L272 198 Z" fill="#7d55b5"/>'},
 RayoAbajo:{c:[280,200],d:'<path d="M280 180 V232" stroke="#ff6b6b" stroke-width="2.5" stroke-dasharray="5 3"/><path d="M274 228 l6 10 l6 -10z" fill="#ff6b6b"/>'},
 Rayo:{c:[350,150],d:'<path d="M282 176 L452 116" stroke="#ff6b6b" stroke-width="2.5" stroke-dasharray="6 3"/><path d="M448 108 l14 4 l-10 10z" fill="#ff6b6b"/><text x="458" y="104" fill="#ff8a8a" font-size="12" font-family="JetBrains Mono,monospace">-Z · 50 m</text>'},
 ArmaModelo:{c:[312,196],d:'<path d="M296 190 L336 188 L336 198 L314 200 L310 212 L302 212 L304 200 L296 199 Z" fill="#3b4048" stroke="#9aa1ab"/>'},
 ArmaPunto:{c:[312,196],d:'<g stroke-width="2"><path d="M312 196 h12" stroke="#f05a5a"/><path d="M312 196 v-12" stroke="#7ad36a"/></g>'},
 Fogonazo:{c:[340,192],d:'<circle cx="340" cy="192" r="6" fill="#ffd27a"/><circle cx="340" cy="192" r="16" fill="rgba(255,190,90,.3)"/>'},
 Sonido:{c:[320,214],d:'<path d="M316 210 h4 l6 -5 v18 l-6 -5 h-4z" fill="#9fd0ff"/>'},
 Diana:{c:[400,236],d:'<rect x="396" y="250" width="8" height="50" fill="#7a5a3a"/><circle cx="400" cy="236" r="28" fill="#f3f3f3"/><circle cx="400" cy="236" r="20" fill="#d33"/><circle cx="400" cy="236" r="12" fill="#f3f3f3"/><circle cx="400" cy="236" r="5" fill="#d33"/>'},
 DianaCol:{c:[400,236],d:'<rect x="368" y="204" width="64" height="98" fill="none" stroke="#5ac8ff" stroke-width="1.5" stroke-dasharray="5 3"/>'},
 JugRoot:{c:[280,322],d:'<circle cx="280" cy="322" r="3" fill="#fc7f7f"/>'},
 PinCollision:{c:[280,170],d:'<circle cx="280" cy="170" r="32" fill="none" stroke="#5ac8ff" stroke-width="1.5" stroke-dasharray="5 3"/>'}
};
function ggView3D(st){
  const has=n=>(st.tree||[]).some(x=>x[0]===n&&!(x[3]||"").includes("hid"));
  const t=ggType(st,st.sel);
  const tools=[["select","Q"],["move","W"],["rotate","E"],["scale","R"]].map(([n])=>`<span class="gg-tb ${((st.tool||"select")===n)?"on":""}" data-t="tool-${n}">${ic(n)}</span>`).join("");
  const dark=st.dark?'<rect x="0" y="0" width="560" height="380" fill="rgba(5,8,12,.55)"/>':"";
  let parts="";const al=st.alias||{},key=n=>al[n]||n;
  (st.tree||[]).forEach(([k,ty,dd,fl=""])=>{const sh=GG_3D[key(k)];if(!sh||fl.includes("hid"))return;
    if(ty==="MeshInstance3D"&&ggVal(st,k,"Mesh","<empty>")==="<empty>")return;if(ty==="CollisionShape3D"&&ggVal(st,k,"Shape","<empty>")==="<empty>")return;
    parts+=`<g data-t="v-${k}">${sh.d}</g>`});
  if(st.dark&&has("Lampara1"))parts+='<defs><radialGradient id="gglamp"><stop offset="0" stop-color="#ffc46e" stop-opacity=".32"/><stop offset="1" stop-color="#ffc46e" stop-opacity="0"/></radialGradient></defs>';
  const g=GG_3D[(st.alias||{})[st.sel]||st.sel];
  const giz=g&&(st.tool==="move")?`<g data-t="gizmo" stroke-width="3"><path d="M${g.c[0]} ${g.c[1]} h40" stroke="#f05a5a"/><path d="M${g.c[0]+40} ${g.c[1]-5} l8 5 l-8 5z" fill="#f05a5a"/>
      <path d="M${g.c[0]} ${g.c[1]} v-40" stroke="#7ad36a"/><path d="M${g.c[0]-5} ${g.c[1]-40} l5 -8 l5 8z" fill="#7ad36a"/><path d="M${g.c[0]} ${g.c[1]} l-26 22" stroke="#5a8cf0"/><path d="M${g.c[0]-30} ${g.c[1]+19} l-4 9 l9 -3z" fill="#5a8cf0"/></g>`:
    g?`<circle cx="${g.c[0]}" cy="${g.c[1]}" r="4" fill="#ff9b3d"/>`:"";
  const sky=st.preview?'<rect width="560" height="380" fill="#20252c"/>':'<defs><linearGradient id="ggsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5b6a80"/><stop offset=".52" stop-color="#a7b2bf"/><stop offset=".52" stop-color="#4a4640"/><stop offset="1" stop-color="#2d2a26"/></linearGradient></defs><rect width="560" height="380" fill="url(#ggsky)"/>';
  const grid=st.preview?"":Array.from({length:13},(_,k)=>`<path d="M${-200+k*80} 380 L${200+k*14} 198" stroke="rgba(255,255,255,.12)"/>`).join("")+[210,240,290,380].map(y=>`<path d="M0 ${y} H560" stroke="rgba(255,255,255,.1)"/>`).join("")+'<path d="M0 300 H560" stroke="rgba(240,90,90,.7)"/><path d="M280 380 L280 198" stroke="rgba(90,140,240,.7)"/>';
  const sel=st.sel&&g&&parts.includes(`data-t="v-${st.sel}"`)?`<g class="gg-selo">${g.d}</g>`:"";
  return `<div class="gg-vtb">${tools}<span class="gg-sepv"></span>${["local","lock","group","magnet"].map(n=>`<span class="gg-tb">${ic(n)}</span>`).join("")}<span class="gg-sepv"></span><span class="gg-tb">${ic("cam")}</span><span class="gg-muted" style="margin-left:8px">Transform</span><span class="gg-muted" style="margin-left:10px">View</span></div>
    <div class="gg-canvas gg-c3d" data-t="canvas3d"><svg viewBox="0 0 560 380" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%">${sky}${grid}${parts}${dark}${st.dark&&has("Lampara1")?'<ellipse cx="200" cy="150" rx="150" ry="130" fill="url(#gglamp)"/><ellipse cx="360" cy="150" rx="150" ry="130" fill="url(#gglamp)"/>':""}${sel}${giz}</svg>
      <div class="gg-vpmenu"><span data-t="persp" class="${st.perspMenu?"on":""}">[ Perspective ]</span>${t==="Camera3D"?`<span data-t="preview" class="gg-prevchk"><span class="gg-chk ${st.preview?"on":""}"></span>Preview</span>`:""}</div>
      <div class="gg-axgiz"><svg viewBox="0 0 40 40" style="width:40px;height:40px"><path d="M20 20 h14" stroke="#f05a5a" stroke-width="2"/><path d="M20 20 v-14" stroke="#7ad36a" stroke-width="2"/><path d="M20 20 l-9 9" stroke="#5a8cf0" stroke-width="2"/><circle cx="34" cy="20" r="4" fill="#f05a5a"/><circle cx="20" cy="6" r="4" fill="#7ad36a"/><circle cx="11" cy="29" r="4" fill="#5a8cf0"/></svg></div>
    </div>`;
}
function ggAnchorIcon(){return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" fill="none" stroke="#8eef97" stroke-width="2"/><path d="M12 7v10M7 12h10" stroke="#8eef97" stroke-width="2"/></svg>`}
function ggAnchorMenu(){
  const names=["Top Left","Center Top","Top Right","Top Wide","Center Left","Center","Center Right","HCenter Wide","Bottom Left","Center Bottom","Bottom Right","Bottom Wide","Left Wide","VCenter Wide","Right Wide","Full Rect"];
  const pos=[[0,0],[.5,0],[1,0],["w",0],[0,.5],[.5,.5],[1,.5],["w",.5],[0,1],[.5,1],[1,1],["w",1],[0,"h"],[.5,"h"],[1,"h"],["w","h"]];
  return `<div class="gg-pop gg-anchors"><div class="gg-muted" style="margin-bottom:6px">Anchor Presets</div><div class="gg-agrid">`+names.map((n,i)=>{const [x,y]=pos[i];
    const r=`<rect x="${x==="w"?4:4+x*12}" y="${y==="h"?4:4+y*12}" width="${x==="w"?16:4}" height="${y==="h"?16:4}" fill="#8eef97"/>`;
    return `<span class="gg-ai" data-t="anchor-${n}" title="${n}"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" fill="none" stroke="#6b7484" stroke-width="1.5"/>${r}</svg></span>`}).join("")+`</div></div>`;
}

function ggScript(st){
  const lines=(st.code||GG_SCRIPT_TPL).split("\n"),hi=st.hiLines||[],sig=st.sigLines||[];
  return `<div class="gg-script"><div class="gg-slist"><div class="gg-sfilter">Filter Scripts</div>
      <div class="gg-sfile sel" data-t="script-file">${ic("gd")}${st.scriptName||"menu.gd"}</div>
      <div class="gg-smeth"><div class="gg-muted" style="margin-bottom:4px">Methods</div>${lines.filter(l=>/^func /.test(l)).map(l=>`<div>${esc(l.slice(5).split("(")[0])}</div>`).join("")}</div></div>
    <div class="gg-code" data-t="code"><div class="gg-cmenu"><span>File</span><span>Edit</span><span>Search</span><span>Go To</span><span>Debug</span></div>
      <div class="gg-lines">${lines.map((l,i)=>`<div class="gg-ln ${hi.includes(i+1)?"hi":""}" data-t="line-${i+1}"><i>${sig.includes(i+1)?`<b class="gg-gut">${ic("signal")}</b>`:""}${i+1}</i><span>${ggHL(l).replace(/\t/g,'<span class="g-tab">\t</span>')||" "}</span></div>`).join("")}</div></div></div>`;
}

function ggFS(st){
  const rows=st.fs?[["folder","res://",0],...st.fs]:[["folder","res://",0],["folder","escenas",1],...(st.saved?[["tscn","menu_plano.tscn",2]]:[]),["tscn","nivel_1.tscn",2],["folder","scripts",1],...(st.hasScript?[["gd","menu.gd",2]]:[]),["svg","icon.svg",1]];
  return rows.map(([i,n,d])=>`<div class="gg-fs ${st.fsSel===n?"sel":""}" data-t="fs-${n}" style="padding-left:${6+d*14}px">${ic(i)}${n}</div>`).join("");
}

function ggDialog(d){
  if(!d)return "";
  let inner="";
  if(d.kind==="newnode"){const rows=[["Node","Node",0],["CanvasItem","Node2D",1],["Control","Control",2],["BaseButton","Button",3],["Button","Button",4],["Container","VBoxContainer",3],["BoxContainer","VBoxContainer",4],["VBoxContainer","VBoxContainer",5],["Label","Label",3],["TextureRect","TextureRect",3]];
    const show=d.matches?d.matches.map(m=>Array.isArray(m)?[m[0],m[1],m[2]||0]:[m,m,0]):d.search?rows.filter(r=>r[0].toLowerCase().includes(d.search.toLowerCase())||rows.indexOf(r)<1):rows;
    inner=`<div class="gg-dt">Create New Node</div><div class="gg-dbody gg-nn"><div class="gg-nnside"><div class="gg-muted">Favorites:</div><div class="gg-box"></div><div class="gg-muted">Recent:</div><div class="gg-box">${(d.recent||[]).map(r=>`<div>${nodeIcon(r)}${r}</div>`).join("")}</div></div>
      <div class="gg-nnmain"><div class="gg-muted">Search:</div><div class="gg-input" data-t="dlg-search">${esc(d.search||"")}<span class="gg-caret"></span></div><div class="gg-muted">Matches:</div>
      <div class="gg-box gg-nnlist">${show.map(([n,ic2,dp])=>`<div class="${n===d.pick?"sel":""}" data-t="dlg-item-${n}" style="padding-left:${6+dp*14}px">${nodeIcon(ic2==="Node2D"?"Node":ic2)}${n}</div>`).join("")}</div>
      <div class="gg-muted">Description:</div><div class="gg-box gg-desc">${esc(d.desc||"")}</div></div></div>
      <div class="gg-dfoot"><button class="pri" data-t="dlg-ok">Create</button><button>Cancel</button></div>`}
  if(d.kind==="script")inner=`<div class="gg-dt">Attach Node Script</div><div class="gg-dbody gg-form">
      ${[["Language","GDScript"],["Inherits",d.inherits||"Control"],["Class Name","N/A"],["Template","Node: Default"],["Built-in Script","off"],["Path",d.path||"res://scripts/menu.gd"]].map(([k,v])=>`<div class="gg-frow" data-t="dlg-${k}"><span>${k}</span>${v==="off"?'<span class="gg-chk"></span>':`<span class="gg-input">${esc(v)}</span>`}</div>`).join("")}
      <div class="gg-ok">✔ Script path/name is valid. Will create a new script file.</div></div>
      <div class="gg-dfoot"><button class="pri" data-t="dlg-ok">Create</button><button>Cancel</button></div>`;
  if(d.kind==="connect")inner=`<div class="gg-dt">Connect a Signal to a Method</div><div class="gg-dbody">
      <div class="gg-muted">From Signal:</div><div class="gg-input" style="margin-bottom:8px">${esc(d.signal)}</div>
      <div class="gg-muted">Connect to Node:</div><div class="gg-box gg-ctree">${d.tree.map(([n,t,dp])=>`<div class="${n===d.to?"sel":""} ${n===d.to?"":"dim"}" data-t="dlg-node-${n}" style="padding-left:${6+dp*14}px">${nodeIcon(t)}${n}${n===d.to?ic("script"):""}</div>`).join("")}</div>
      <div class="gg-frow" data-t="dlg-method"><span>Receiver Method:</span><span class="gg-input">${esc(d.method)}</span></div></div>
      <div class="gg-dfoot"><span class="gg-muted">Advanced ☐</span><span class="gg-sp"></span><button class="pri" data-t="dlg-ok">Connect</button><button>Cancel</button></div>`;
  if(d.kind==="save")inner=`<div class="gg-dt">Save Scene As...</div><div class="gg-dbody">
      <div class="gg-frow"><span>Path:</span><span class="gg-input" data-t="dlg-path">${esc(d.path||"res://escenas/")}</span><span class="gg-tb" data-t="dlg-newfolder" title="Create Folder">${ic("folder")}+</span></div>
      <div class="gg-box gg-files">${(d.files||["..","nivel_1.tscn"]).map(f=>`<div data-t="dlg-f-${f}">${ic(f.endsWith("/")||f===".."?"folder":"tscn")}${f}</div>`).join("")}</div>
      <div class="gg-frow"><span>File:</span><span class="gg-input" data-t="dlg-file">${esc(d.file||"menu_plano.tscn")}<span class="gg-caret"></span></span><span class="gg-muted">All Recognized</span></div></div>
      <div class="gg-dfoot"><button class="pri" data-t="dlg-ok">Save</button><button>Cancel</button></div>`;
  if(d.kind==="confirm")inner=`<div class="gg-dt">Please Confirm...</div><div class="gg-dbody"><p style="margin:6px 0 4px">No main scene has ever been defined. Select one?<br>You can change it later in "Project Settings" under the 'application' category.</p></div>
      <div class="gg-dfoot"><button data-t="dlg-select">Select</button><button class="pri" data-t="dlg-current">Select Current</button><button>Cancel</button></div>`;
  if(d.kind==="settings")inner=`<div class="gg-dt">Project Settings (project.godot)</div><div class="gg-stabs2">${["General","Input Map","Localization","Globals","Plugins","Import Defaults"].map(t=>`<span class="${t===(d.tab||"Input Map")?"on":""}" data-t="set-tab-${t}">${t}</span>`).join("")}</div>
      <div class="gg-dbody"><div class="gg-frow" style="grid-template-columns:1fr auto auto"><span class="gg-input" data-t="dlg-newaction">${esc(d.newAction||"Add New Action")}${d.newAction?'<span class="gg-caret"></span>':""}</span><button data-t="dlg-addaction" class="gg-btn">${ic("plus")}Add</button><span class="gg-muted"><span class="gg-chk"></span>Show Built-in Actions</span></div>
      <div class="gg-acts"><div class="gg-acth"><span>Action</span><span>Deadzone</span><span></span></div>${(d.actions||[]).map(([a,evs])=>`<div class="gg-act" data-t="act-${a}">${ic("tridown")}<b>${a}</b><span class="gg-field">0.5</span><span class="gg-acti"><span data-t="act-${a}-add">${ic("plus")}</span><span>✕</span></span></div>`+evs.map(e=>`<div class="gg-act ev" data-t="ev-${a}-${e}"><span>${esc(e)}</span><span></span><span class="gg-acti"><span>✎</span><span>✕</span></span></div>`).join("")).join("")}</div></div>
      <div class="gg-dfoot"><button class="pri" data-t="dlg-close">Close</button></div>`;
  if(d.kind==="event")inner=`<div class="gg-dt">Event Configuration for "${esc(d.action)}"</div><div class="gg-dbody">
      <div class="gg-input gg-listen" data-t="dlg-listen">${d.got?`<b>${esc(d.got)}</b>`:'<span class="gg-muted">Listening for Input...</span>'}</div>
      <div class="gg-box gg-files" style="height:150px">${["Keyboard Keys","Mouse Buttons","Joypad Buttons","Joypad Axes"].map(x=>`<div>${ic("tri")}${x}</div>`).join("")}</div></div>
      <div class="gg-dfoot"><button class="pri" data-t="dlg-ok">OK</button><button>Cancel</button></div>`;
  if(d.kind==="meta")inner=`<div class="gg-dt">Add Metadata Property for "${esc(d.node)}"</div><div class="gg-dbody gg-form">
      <div class="gg-frow" data-t="dlg-name"><span>Name:</span><span class="gg-input">${esc(d.name)}<span class="gg-caret"></span></span></div>
      <div class="gg-frow" data-t="dlg-type"><span>Type:</span><span class="gg-input">String ▾</span></div></div>
      <div class="gg-dfoot"><button class="pri" data-t="dlg-ok">Add</button><button>Cancel</button></div>`;
  if(d.kind==="instance")inner=`<div class="gg-dt">Instantiate Child Scene</div><div class="gg-dbody">
      <div class="gg-input" data-t="dlg-search">${esc(d.search||"")}<span class="gg-caret"></span></div>
      <div class="gg-box gg-files" style="height:150px">${d.files.map(f=>`<div class="${f===d.pick?"sel":""}" data-t="dlg-file-${f}">${ic("tscn")}${f}</div>`).join("")}</div></div>
      <div class="gg-dfoot"><button class="pri" data-t="dlg-ok">Open</button><button>Cancel</button></div>`;
  return `<div class="gg-dim"></div><div class="gg-dlg ${d.kind}">${inner}</div>`;
}

function ggStage(st){
  const tabName=st.tab===undefined?null:st.tab;
  const menu=st.menu?`<div class="gg-pop gg-drop" style="left:${{Scene:6,Project:58,Debug:118,Editor:172}[st.menu.name]||6}px">${({Scene:GG_SCENE_MENU,Project:GG_PROJECT_MENU,Debug:GG_DEBUG_MENU}[st.menu.name]||GG_SCENE_MENU).map(x=>x==="-"?"<hr>":`<div data-t="mi-${x[0]}"><span>${x[0]}</span><span class="gg-muted">${x[1]}</span></div>`).join("")}</div>`:"";
  const center=st.ws==="script"?ggScript(st):st.ws==="3d"?ggView3D(st):ggCanvas(st);
  return `<div class="gg-title">${tabName?tabName+(tabName[0]==="["?"":".tscn")+" - ":""}${st.project||"Mi FPS"} - Godot Engine<span class="gg-sp"></span><span>—</span><span>▢</span><span>✕</span></div>
  <div class="gg-top">
    <div class="gg-menus">${["Scene","Project","Debug","Editor","Help"].map(m=>`<span data-t="menu-${m}" class="${st.menu&&st.menu.name===m?"on":""}">${m}</span>`).join("")}</div>
    <div class="gg-ws">${[["2d","ws2d","2D"],["3d","ws3d","3D"],["script","wsscript","Script"],["game","play","Game"],["asset","wsasset","Asset Store"]].map(([k,i,n])=>`<span data-t="ws-${k}" class="${st.ws===k?"on":""}">${ic(i)}${n}</span>`).join("")}</div>
    <div class="gg-run"><span data-t="run-play" title="Run Project (F5)">${ic("play")}</span><span>${ic("pause")}</span><span>${ic("stop")}</span><span data-t="run-scene" title="Run Current Scene (F6)">${ic("sceneplay")}</span><span data-t="run-custom">${ic("customplay")}</span></div>
    ${menu}
  </div>
  <div class="gg-body">
    <div class="gg-left">
      <section class="gg-dock" data-t="dock-scene"><div class="gg-tabs"><span class="on">Scene</span><span>Import</span></div>
        <div class="gg-bar"><span class="gg-tb" data-t="add">${ic("plus")}</span><span class="gg-tb" data-t="link-inst">${ic("link")}</span><span class="gg-search">Filter Nodes</span><span class="gg-tb" data-t="attach">${ic("scriptadd")}</span></div>
        <div class="gg-scroll">${ggTree(st)}</div></section>
      <section class="gg-dock" data-t="dock-fs"><div class="gg-tabs"><span class="on">FileSystem</span><span>History</span></div>
        <div class="gg-bar"><span class="gg-search">res://</span></div><div class="gg-scroll" style="position:relative">${ggFS(st)}</div></section>
    </div>
    <div class="gg-center">
      <div class="gg-stabs">${tabName?`<span class="on" data-t="scene-tab">${nodeIcon(st.tree&&st.tree[0]?st.tree[0][1]:"Node")}${tabName}${st.dirty?"(*)":""}<em>✕</em></span>`:`<span class="on" data-t="scene-tab">[empty]<em>✕</em></span>`}<span>${ic("plus")}</span></div>
      <div class="gg-main" data-t="main">${center}</div>
      <div class="gg-bottom">${st.bottom==="audio"?`<div class="gg-log gg-audio"><div class="gg-muted">Bus layout: default_bus_layout.tres</div><div class="gg-bus" data-t="bus-Master"><b>Master</b><span class="gg-meter"><i></i></span><span class="gg-muted">0 dB</span></div></div>`:`<div class="gg-log">${(st.log||["--- Debug adapter server started on port 6006 ---","--- GDScript language server started on port 6005 ---"]).map(l=>`<div>${esc(l)}</div>`).join("")}</div>`}
        <div class="gg-btabs"><span class="${st.bottom==="audio"?"":"on"}" data-t="tab-out">Output</span><span>Debugger</span><span data-t="tab-audio" class="${st.bottom==="audio"?"on":""}">Audio</span><span>Animation</span><span>Shader Editor</span><span class="gg-sp"></span><span class="gg-muted">4.7.stable</span></div></div>
    </div>
    <div class="gg-right"><div class="gg-tabs"><span data-t="tab-insp" class="${st.dock!=="sig"&&st.dock!=="grp"?"on":""}">Inspector</span><span data-t="tab-sig" class="${st.dock==="sig"?"on":""}">Signals</span>${st.showGroups||st.dock==="grp"?`<span data-t="tab-grp" class="${st.dock==="grp"?"on":""}">Groups</span>`:""}</div>${ggInspector(st)}</div>
  </div>
  ${st.fsMenu?`<div class="gg-pop gg-ctx" style="left:130px;top:${st.fsMenuTop||380}px">${["Open","Copy Path","Copy Absolute Path","Copy UID","-","Rename...","Duplicate...","Move/Duplicate To...","-","Show in File Manager"].map(x=>x==="-"?'<hr>':`<div data-t="ctx-${x}">${x}</div>`).join("")}</div>`:""}
  ${st.pop?`<div class="gg-pop gg-ctx" style="left:${st.pop.x}px;top:${st.pop.y}px;min-width:${st.pop.w||200}px">${st.pop.title?`<div class="gg-muted" style="padding:2px 10px 4px">${st.pop.title}</div>`:""}${st.pop.items.map(x=>x==="-"?"<hr>":`<div data-t="pop-${Array.isArray(x)?x[0]:x}"><span>${Array.isArray(x)?x[0]:x}</span>${Array.isArray(x)?`<span class="gg-muted">${x[1]}</span>`:""}</div>`).join("")}</div>`:""}
  ${ggDialog(st.dlg)}${st.dlg2?ggDialog(st.dlg2).replace('class="gg-dim"','class="gg-dim two"').replace('class="gg-dlg','class="gg-dlg two'):""}`;
}

/* monta la guía: host = elemento, pasos = [{say, target, tag, ...estado}] */
function mountGuia(host,guia){
  if(!host||!guia)return;
  const pasos=guia.pasos,states=[];let acc={ws:"2d",tree:[],dock:"insp"};
  pasos.forEach(p=>{const {say,target,tag,also,...rest}=p;const vals={...(acc.vals||{})};
    if(rest.vals)Object.entries(rest.vals).forEach(([n,o])=>vals[n]={...(vals[n]||{}),...o});
    acc={...acc,menu:null,dlg:null,dlg2:null,pop:null,perspMenu:false,anchorMenu:false,fsMenu:false,rename:null,hiLines:null,...rest,vals};states.push(acc)});
  let i=0;
  host.innerHTML=`<section class="guia" aria-label="Dónde se hace en Godot">
    <div class="guia-h"><span class="ears" aria-hidden="true"><i></i><i></i></span><div><div class="kicker" style="margin:0">Hacelo en Godot</div><b>${esc(guia.titulo||"Dónde se toca en el editor")}</b></div></div>
    <div class="gg-fit"><div class="gg-size"><div class="gg gg-stage" aria-hidden="true"></div></div></div>
    <div class="guia-say" aria-live="polite"></div>
    <div class="guia-nav"><button class="btn ghost" data-g="prev">◀ Anterior</button><div class="guia-dots"></div><button class="btn" data-g="next">Siguiente ▶</button></div>
  </section>`;
  const fit=host.querySelector(".gg-fit"),size=host.querySelector(".gg-size"),stage=host.querySelector(".gg-stage");
  let scale=1;
  const layout=()=>{const w=fit.clientWidth||GG_W;scale=Math.min(1,Math.max(.56,w/GG_W));stage.style.transform=`scale(${scale})`;size.style.width=GG_W*scale+"px";size.style.height=GG_H*scale+"px";place()};
  function place(){
    stage.querySelectorAll(".gg-ring,.gg-tag").forEach(e=>e.remove());
    const p=pasos[i];
    /* que lo señalado se vea aunque esté más abajo en una lista larga */
    const reveal=el=>{if(!el)return;const box=el.closest(".gg-scroll,.gg-props,.gg-sigs,.gg-lines");if(!box)return;
      const top=el.getBoundingClientRect().top-box.getBoundingClientRect().top+box.scrollTop;
      if(top<box.scrollTop||top+el.offsetHeight*scale>box.scrollTop+box.clientHeight*scale)box.scrollTop=Math.max(0,top/scale-box.clientHeight/3)};
    const selRow=stage.querySelector(".gg-tr.sel");reveal(selRow);
    [p.target,...(p.also||[])].forEach(k=>k&&reveal(stage.querySelector(`[data-t="${CSS.escape(k)}"]`)));
    const sr=stage.getBoundingClientRect();
    const mark=(key,n,main)=>{const el=stage.querySelector(`[data-t="${CSS.escape(key)}"]`);if(!el)return null;const r=el.getBoundingClientRect();
      const x=(r.left-sr.left)/scale,y=(r.top-sr.top)/scale,w=r.width/scale,h=r.height/scale,pad=4;
      const ring=document.createElement("div");ring.className="gg-ring"+(main?"":" alt");
      ring.style.cssText=`left:${x-pad}px;top:${y-pad}px;width:${w+pad*2}px;height:${h+pad*2}px`;
      ring.innerHTML=`<b>${n}</b>`;stage.appendChild(ring);
      if(main&&p.tag!==false){const tg=document.createElement("div");tg.className="gg-tag";tg.textContent=p.tag||"Tocá acá";
        const below=y<GG_H-80;tg.style.cssText=`left:${Math.min(GG_W-170,Math.max(6,x+w/2-70))}px;top:${below?y+h+10:y-40}px`;if(!below)tg.classList.add("up");stage.appendChild(tg)}
      return {x,w}};
    const m=p.target?mark(p.target,i+1,true):null;(p.also||[]).forEach(k=>mark(k,"+",false));
    if(m&&fit.scrollWidth>fit.clientWidth)fit.scrollTo({left:Math.max(0,(m.x+m.w/2)*scale-fit.clientWidth/2),behavior:"smooth"});
  }
  function show(){
    stage.innerHTML=ggStage(states[i]);
    host.querySelector(".guia-say").innerHTML=`<span class="guia-n">Paso ${i+1} de ${pasos.length}</span>${pasos[i].say}`;
    host.querySelector('[data-g="prev"]').disabled=i===0;
    const nx=host.querySelector('[data-g="next"]');nx.disabled=i===pasos.length-1;
    host.querySelector(".guia-dots").innerHTML=pasos.map((_,k)=>`<button aria-label="Paso ${k+1}" aria-pressed="${k===i}" data-k="${k}"></button>`).join("");
    host.querySelectorAll(".guia-dots button").forEach(b=>b.onclick=()=>{i=+b.dataset.k;show()});
    requestAnimationFrame(place);
  }
  host.querySelector('[data-g="prev"]').onclick=()=>{if(i>0){i--;show()}};
  host.querySelector('[data-g="next"]').onclick=()=>{if(i<pasos.length-1){i++;show()}};
  show();layout();
  if(window.ResizeObserver){const ro=new ResizeObserver(layout);ro.observe(fit)}else addEventListener("resize",layout);
}
