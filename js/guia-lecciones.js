/* =================== GUÍAS VISUALES POR LECCIÓN ===================
   GUIAS[idLeccion][númeroDePaso] = {titulo, despues?, pasos:[...]}
   despues:true → la guía aparece recién después de Comprobar (para no regalar la respuesta). */
const GT={
  root:[["MenuPrincipal","Control",0]],
  fondo:[["MenuPrincipal","Control",0],["Fondo","TextureRect",1]],
  tres:[["MenuPrincipal","Control",0],["Fondo","TextureRect",1],["Titulo","Label",1],["VBox","VBoxContainer",1]],
  full:(f={})=>[["MenuPrincipal","Control",0,f.MenuPrincipal||""],["Fondo","TextureRect",1],["Titulo","Label",1],["VBox","VBoxContainer",1],
    ["BotonCampana","Button",2,f.BotonCampana||""],["BotonVehiculos","Button",2,f.BotonVehiculos||""],["BotonOpciones","Button",2,f.BotonOpciones||""],["BotonSalir","Button",2,f.BotonSalir||""]]
};
const GV={Titulo:{Text:"OPERACIÓN BURRO"},BotonCampana:{Text:"Campaña"},BotonVehiculos:{Text:"Misiones con vehículos"},BotonOpciones:{Text:"Opciones"},BotonSalir:{Text:"Salir"}};
const G_CONN=`

func _on_boton_campana_pressed() -> void:
	pass # Replace with function body.`;
const G_FULL=`extends Control


func _ready() -> void:
	$VBox/BotonCampana.grab_focus()


func _on_boton_campana_pressed() -> void:
	get_tree().change_scene_to_file("res://escenas/nivel_1.tscn")


func _on_boton_salir_pressed() -> void:
	get_tree().quit()`;

const GUIAS={
 l1:{
  0:{titulo:"Armar el árbol del menú plano, clic por clic",pasos:[
    {say:"Arriba a la izquierda abrí el menú <b>Scene</b> (Escena) y elegí <b>New Scene</b>. Atajo: <kbd>Ctrl</kbd>+<kbd>N</kbd>. Se abre una pestaña vacía llamada <i>[empty]</i>.",
     menu:{name:"Scene"},target:"mi-New Scene",tag:"New Scene",tab:null,tree:[]},
    {say:"Con la escena vacía, el panel <b>Scene</b> (arriba a la izquierda) te muestra cuatro botones. Tocá <b>User Interface</b>: crea la raíz de tipo <code class=\"i\">Control</code> (ícono verde), que es la base de cualquier menú.",
     target:"root-ui",tag:"User Interface"},
    {say:"Apareció un nodo llamado <b>Control</b>. Hacé <b>doble clic</b> sobre el nombre (o seleccionalo y apretá <kbd>F2</kbd>), escribí <code class=\"i\">MenuPrincipal</code> y apretá <kbd>Enter</kbd>.",
     tab:"[unsaved]",tree:[["MenuPrincipal","Control",0]],sel:"MenuPrincipal",rename:"MenuPrincipal",target:"node-MenuPrincipal",tag:"Doble clic y renombrar"},
    {say:"Ahora vamos a meterle hijos. Con <b>MenuPrincipal</b> seleccionado (fondo azul), tocá el <b>+</b> de la barrita del panel Scene: es <i>Add Child Node</i>. Atajo: <kbd>Ctrl</kbd>+<kbd>A</kbd>.",
     target:"add",tag:"Add Child Node (+)",also:["node-MenuPrincipal"]},
    {say:"Se abre la ventana <b>Create New Node</b>. Arriba, en <b>Search</b>, escribí <code class=\"i\">TextureRect</code>, elegilo en la lista y tocá <b>Create</b> (abajo). Después renombralo <code class=\"i\">Fondo</code> como hiciste antes.",
     dlg:{kind:"newnode",search:"TextureRect",pick:"TextureRect",desc:"A control that displays a texture."},target:"dlg-item-TextureRect",tag:"Elegí TextureRect",also:["dlg-search","dlg-ok"]},
    {say:"Repetí lo mismo dos veces más: <code class=\"i\">Label</code> (renombralo <code class=\"i\">Titulo</code>) y <code class=\"i\">VBoxContainer</code> (renombralo <code class=\"i\">VBox</code>). <b>Ojo:</b> antes de tocar <b>+</b> volvé a seleccionar <b>MenuPrincipal</b>, así los tres quedan colgando de él (con la misma sangría).",
     tree:GT.tres,sel:"VBox",target:"node-VBox",tag:"Los tres al mismo nivel",also:["node-Fondo","node-Titulo"]},
    {say:"Ahora los botones van <b>adentro</b> del VBox. Seleccioná <b>VBox</b>, tocá <b>+</b>, buscá <code class=\"i\">Button</code> y creá cuatro. Renombralos <code class=\"i\">BotonCampana</code>, <code class=\"i\">BotonVehiculos</code>, <code class=\"i\">BotonOpciones</code> y <code class=\"i\">BotonSalir</code>. Fijate que quedan más corridos a la derecha: eso significa que son hijos de VBox.",
     tree:GT.full(),sel:"BotonSalir",target:"node-BotonCampana",tag:"Hijos de VBox",also:["node-BotonSalir"]},
    {say:"Para escribir el texto de un botón: seleccionalo en el árbol y mirá el <b>Inspector</b> (panel de la derecha). En la propiedad <b>Text</b> escribí <i>Campaña</i>. Hacé lo mismo con los otros botones y con <b>Titulo</b>. En el centro ves cómo va quedando.",
     sel:"BotonCampana",vals:GV,target:"prop-Text",tag:"Escribí el texto acá",also:["node-BotonCampana"]},
    {say:"Los botones están pegados arriba a la izquierda. Para centrarlos: seleccioná <b>VBox</b> y, en la barra de arriba de la vista 2D, tocá el ícono verde de <b>anclas</b> (Anchor Presets).",
     sel:"VBox",target:"anchor",tag:"Anchor Presets"},
    {say:"En la grilla que se abre elegí <b>Center</b> (el del medio). Listo: el VBox queda centrado en la pantalla y los botones se acomodan solos, uno abajo del otro.",
     anchorMenu:true,centered:true,vals:{...GV,VBox:{"Anchors Preset":"Center"}},target:"anchor-Center",tag:"Center"},
    {say:"Guardá la escena: <kbd>Ctrl</kbd>+<kbd>S</kbd>. Entrá a la carpeta <code class=\"i\">escenas</code>, en <b>File</b> escribí <code class=\"i\">menu_plano.tscn</code> y tocá <b>Save</b>. Ahora aparece en el panel <b>FileSystem</b> (abajo a la izquierda).",
     dlg:{kind:"save"},target:"dlg-file",tag:"Nombre del archivo",also:["dlg-ok"]},
    {say:"Así queda en Godot: el árbol a la izquierda igual al de la lección, el archivo guardado en <code class=\"i\">res://escenas/</code> y el menú dibujado en el centro.",
     tab:"menu_plano",saved:true,fsSel:"menu_plano.tscn",sel:"MenuPrincipal",target:"dock-scene",tag:"Tu árbol terminado",also:["fs-menu_plano.tscn"]}
  ]},
  2:{titulo:"Agregar el script y conectar la señal pressed",pasos:[
    {say:"Primero el menú necesita un script. Seleccioná <b>MenuPrincipal</b> (la raíz) y tocá el ícono del <b>pergamino con +</b> en la barra del panel Scene: es <i>Attach Script</i>.",
     tab:"menu_plano",saved:true,tree:GT.full(),vals:GV,centered:true,sel:"MenuPrincipal",target:"attach",tag:"Attach Script",also:["node-MenuPrincipal"]},
    {say:"En la ventana <b>Attach Node Script</b> dejá todo como está, cambiá solo <b>Path</b> a <code class=\"i\">res://scripts/menu.gd</code> y tocá <b>Create</b>.",
     dlg:{kind:"script"},target:"dlg-Path",tag:"Ruta del script",also:["dlg-ok"]},
    {say:"Godot te lleva solo a la pestaña <b>Script</b> (arriba al centro) con el archivo nuevo. En el árbol, MenuPrincipal ahora tiene un pergamino al lado: eso indica que tiene script. Volvé a la pestaña <b>2D</b> para seguir.",
     ws:"script",hasScript:true,tree:GT.full({MenuPrincipal:"scr"}),code:GG_SCRIPT_TPL,target:"ws-2d",tag:"Volvé a 2D",also:["scric-MenuPrincipal"]},
    {say:"Seleccioná <b>BotonCampana</b> en el árbol. Después, en el panel de la derecha, tocá la pestaña <b>Signals</b> (está al lado de Inspector).",
     ws:"2d",sel:"BotonCampana",target:"tab-sig",tag:"Pestaña Signals",also:["node-BotonCampana"]},
    {say:"Aparece la lista de señales del botón. En la sección <b>BaseButton</b> buscá <code class=\"i\">pressed()</code> y hacele <b>doble clic</b> (o seleccionala y tocá <b>Connect...</b> abajo).",
     dock:"sig",target:"sig-pressed",tag:"Doble clic en pressed()"},
    {say:"En <b>Connect a Signal to a Method</b> elegí <b>MenuPrincipal</b> (el que tiene el script). Abajo, en <b>Receiver Method</b>, Godot ya escribió <code class=\"i\">_on_boton_campana_pressed</code>. Tocá <b>Connect</b>.",
     dlg:{kind:"connect",signal:"pressed()",to:"MenuPrincipal",method:"_on_boton_campana_pressed",tree:GT.full()},target:"dlg-node-MenuPrincipal",tag:"Elegí MenuPrincipal",also:["dlg-method","dlg-ok"]},
    {say:"Godot vuelve a <b>Script</b> y agrega la función al final. El ícono verde en el número de línea indica que está conectada a una señal. Lo que escribas adentro (con un <kbd>Tab</kbd> de sangría, en lugar de <code class=\"i\">pass</code>) se ejecuta al tocar el botón. Repetí esto con cada botón.",
     ws:"script",tree:GT.full({MenuPrincipal:"scr",BotonCampana:"sig"}),conn:{BotonCampana:{pressed:"MenuPrincipal :: _on_boton_campana_pressed()"}},
     code:GG_SCRIPT_TPL+G_CONN,hiLines:[13,14],sigLines:[13],target:"line-13",tag:"Función creada por la señal",also:["sigic-BotonCampana"]},
    {say:"Para verificar: seleccioná el botón y mirá <b>Signals</b>. Debajo de <code class=\"i\">pressed()</code> aparece a quién está conectada.",
     ws:"2d",dock:"sig",sel:"BotonCampana",target:"conn-pressed",tag:"Conectada"}
  ]},
  3:{titulo:"Dónde se escribe esta línea",despues:true,pasos:[
    {say:"Esto va en la pestaña <b>Script</b>, dentro de <code class=\"i\">menu.gd</code>, adentro de la función que creó la señal de <b>BotonSalir</b> (la conectás igual que BotonCampana). Borrá el <code class=\"i\">pass</code> y escribí la línea con un <kbd>Tab</kbd> al principio.",
     tab:"menu_plano",saved:true,hasScript:true,ws:"script",tree:GT.full({MenuPrincipal:"scr",BotonCampana:"sig",BotonSalir:"sig"}),vals:GV,centered:true,
     code:G_FULL,sel:"MenuPrincipal",hiLines:[13],sigLines:[8,12],target:"line-13",tag:"Escribila acá"}
  ]},
  4:{titulo:"De dónde sacás la ruta del nivel",despues:true,pasos:[
    {say:"No hace falta escribir la ruta de memoria. En el panel <b>FileSystem</b> (abajo a la izquierda) hacé <b>clic derecho</b> sobre <code class=\"i\">nivel_1.tscn</code> y elegí <b>Copy Path</b>.",
     tab:"menu_plano",saved:true,hasScript:true,ws:"script",tree:GT.full({MenuPrincipal:"scr",BotonCampana:"sig",BotonSalir:"sig"}),vals:GV,centered:true,code:G_FULL,sigLines:[8,12],
     fsSel:"nivel_1.tscn",fsMenu:true,fsMenuTop:400,sel:"MenuPrincipal",target:"ctx-Copy Path",tag:"Copy Path",also:["fs-nivel_1.tscn"]},
    {say:"En el script, dentro de <code class=\"i\">_on_boton_campana_pressed</code>, escribí <code class=\"i\">get_tree().change_scene_to_file(\"\")</code> y pegá la ruta entre las comillas con <kbd>Ctrl</kbd>+<kbd>V</kbd>.",
     hiLines:[9],target:"line-9",tag:"Pegá la ruta acá"}
  ]},
  5:{titulo:"Probarlo en Godot de verdad",pasos:[
    {say:"Con la pestaña <b>menu_plano</b> abierta, tocá arriba a la derecha <b>Run Current Scene</b> (el ícono de la claqueta con ▶). Atajo: <kbd>F6</kbd>. Se abre una ventana con tu menú funcionando.",
     tab:"menu_plano",saved:true,hasScript:true,ws:"2d",tree:GT.full({MenuPrincipal:"scr",BotonCampana:"sig",BotonSalir:"sig"}),vals:GV,centered:true,sel:"MenuPrincipal",target:"run-scene",tag:"Run Current Scene (F6)"},
    {say:"Para que el juego <b>arranque siempre</b> en el menú, tocá <b>Run Project</b> (▶, o <kbd>F5</kbd>). La primera vez Godot pregunta cuál es la escena principal.",
     target:"run-play",tag:"Run Project (F5)"},
    {say:"Tocá <b>Select Current</b>: el menú queda como escena principal. Después lo podés cambiar en <b>Project → Project Settings → Application → Run → Main Scene</b>.",
     dlg:{kind:"confirm"},target:"dlg-current",tag:"Select Current"},
    {say:"Si apretás un botón y no pasa nada, mirá el panel <b>Output</b> de abajo: ahí Godot escribe los errores en rojo. Por ejemplo, si la ruta del nivel está mal vas a ver un error de que no encuentra el archivo.",
     log:["--- Debug adapter server started on port 6006 ---","--- GDScript language server started on port 6005 ---","Godot Engine v4.7.stable.official - https://godotengine.org","Vulkan - Forward+"],target:"tab-out",tag:"Output"}
  ]}
 }
};
function guiaPara(lessonId,stepIdx){return (GUIAS[lessonId]&&GUIAS[lessonId][stepIdx])||null}

/* =================== MENÚ 3D: SALA DE GUERRA =================== */
const S3={proj:"Mi FPS",
  fs:[["folder","ui",1],["tscn","sala_de_guerra.tscn",2],["folder","texturas",1],["svg","mapa.png",2],["folder","niveles",1],["tscn","mision_1.tscn",2],["svg","icon.svg",1]],
  fsPin:[["folder","ui",1],["tscn","pin_mision.tscn",2],["gd","pin_mision.gd",2],["tscn","sala_de_guerra.tscn",2],["gd","sala_de_guerra.gd",2],["folder","texturas",1],["svg","mapa.png",2],["folder","niveles",1],["tscn","mision_1.tscn",2]],
  meshPop:{x:870,y:224,w:210,items:["New BoxMesh","New CapsuleMesh","New CylinderMesh","New PlaneMesh","New PrismMesh","New QuadMesh","New SphereMesh","New TorusMesh","-","Load...","Quick Load..."]},
  nodeCtx:(y)=>({x:120,y,w:230,items:[["Add Child Node...","Ctrl+A"],["Instantiate Child Scene...","Ctrl+Shift+A"],"-",["Cut","Ctrl+X"],["Copy","Ctrl+C"],["Paste","Ctrl+V"],"-",["Rename","F2"],["Change Type...",""],["Attach Script",""],"-",["Save Branch as Scene...",""],"-",["Delete","Del"]]}),
  persp:{x:266,y:140,w:250,items:["Top View","Bottom View","Left View","Right View","Front View","Rear View","-","Switch Perspective/Orthogonal","-","Display Normal","Display Wireframe","-",["Align Transform with View","Ctrl+Alt+M"],["Align Rotation with View","Ctrl+Alt+F"]]}
};
const T3={
  base:[["SalaDeGuerra","Node3D",0]],
  sala:[["SalaDeGuerra","Node3D",0],["Piso","MeshInstance3D",1],["ParedFondo","MeshInstance3D",1],["ParedIzq","MeshInstance3D",1],["MesaRadio","MeshInstance3D",1],["MesaTelefonos","MeshInstance3D",1],["ModeloMapa","MeshInstance3D",1]],
};
T3.luz=[...T3.sala,["Camera3D","Camera3D",1],["Lampara1","OmniLight3D",1],["Lampara2","OmniLight3D",1],["WorldEnvironment","WorldEnvironment",1]];
T3.vistas=[...T3.luz,["Vistas","Node3D",1],["General","Marker3D",2],["Mapa","Marker3D",2],["Radio","Marker3D",2]];
T3.objetos=(f="")=>[["SalaDeGuerra","Node3D",0,f],...T3.luz.slice(1).filter(x=>x[0]!=="ModeloMapa"),["Vistas","Node3D",1],["General","Marker3D",2],["Mapa","Marker3D",2],["Radio","Marker3D",2],
  ["ObjetoMapa","Area3D",1],["CollisionShape3D","CollisionShape3D",2],["ModeloMapa","MeshInstance3D",2],["Cartel","Label3D",1]];
const V3_CAJA={Piso:{Mesh:"BoxMesh"},ParedFondo:{Mesh:"BoxMesh"},ParedIzq:{Mesh:"BoxMesh"},MesaRadio:{Mesh:"BoxMesh"},MesaTelefonos:{Mesh:"BoxMesh"},CollisionShape3D:{Shape:"BoxShape3D"},Esfera:{Mesh:"SphereMesh"},PinCollision:{Shape:"SphereShape3D"},ModeloMapa:{Mesh:"QuadMesh","Material Override":"StandardMaterial3D"},Lampara1:{Color:"color:#ffc978",Shadow:"on",Enabled:"on"},WorldEnvironment:{Environment:"Environment"}};
const SALA_GD_HEAD="extends Node3D\n\n";
const SAL_ST={tab:"sala_de_guerra",ws:"3d",project:S3.proj,fs:S3.fs,vals:V3_CAJA,dark:true,tool:"select"};

Object.assign(GUIAS,{
 s1:{
  1:{titulo:"Crear la escena 3D",pasos:[
    {say:"Arriba a la izquierda: menú <b>Scene</b> (Escena) → <b>New Scene</b>. Atajo <kbd>Ctrl</kbd>+<kbd>N</kbd>.",
     project:S3.proj,fs:S3.fs.slice(2),ws:"3d",tab:null,tree:[],menu:{name:"Scene"},target:"mi-New Scene",tag:"New Scene"},
    {say:"En el panel <b>Scene</b> tocá <b>3D Scene</b> (Escena 3D). Se crea un <code class=\"i\">Node3D</code>, el nodo rojo: la raíz que va a contener toda la sala.",
     target:"root-3d",tag:"3D Scene"},
    {say:"Hacé <b>doble clic</b> sobre el nombre <i>Node3D</i> (o <kbd>F2</kbd>), escribí <code class=\"i\">SalaDeGuerra</code> y <kbd>Enter</kbd>.",
     tab:"[unsaved]",tree:T3.base,sel:"SalaDeGuerra",rename:"SalaDeGuerra",target:"node-SalaDeGuerra",tag:"Doble clic y renombrar"},
    {say:"<kbd>Ctrl</kbd>+<kbd>S</kbd> para guardar. Tocá el botón de <b>carpeta con +</b> (Create Folder) y creá la carpeta <code class=\"i\">ui</code>. Entrá, en <b>File</b> escribí <code class=\"i\">sala_de_guerra.tscn</code> y tocá <b>Save</b>.",
     dlg:{kind:"save",path:"res://ui/",files:["..","texturas/"],file:"sala_de_guerra.tscn"},target:"dlg-newfolder",tag:"Create Folder",also:["dlg-file","dlg-ok"]},
    {say:"Fijate que arriba en el centro esté elegido <b>3D</b> (en azul). Si estás en 2D o Script, tocá 3D para ver el espacio tridimensional con su piso cuadriculado.",
     tab:"sala_de_guerra",fs:S3.fs,target:"ws-3d",tag:"Espacio 3D",also:["canvas3d"]}
  ]},
  2:{titulo:"Armar la sala con cajas",pasos:[
    {say:"Seleccioná <b>SalaDeGuerra</b> y tocá el <b>+</b> (Add Child Node, <kbd>Ctrl</kbd>+<kbd>A</kbd>).",
     ...SAL_ST,dark:false,tree:T3.base,sel:"SalaDeGuerra",target:"add",tag:"Add Child Node (+)",also:["node-SalaDeGuerra"]},
    {say:"En <b>Search</b> escribí <code class=\"i\">MeshInstance3D</code>, elegilo y tocá <b>Create</b>. Es el nodo que muestra un objeto 3D.",
     dlg:{kind:"newnode",search:"MeshInstance3D",matches:[["MeshInstance3D","MeshInstance3D"],["MultiMeshInstance3D","MeshInstance3D"]],pick:"MeshInstance3D",desc:"Node that instances meshes into a scenario."},target:"dlg-item-MeshInstance3D",tag:"Elegí MeshInstance3D",also:["dlg-search","dlg-ok"]},
    {say:"Renombralo <code class=\"i\">Piso</code> (doble clic). Todavía no se ve nada: un MeshInstance3D vacío no tiene forma.",
     tree:[...T3.base,["Piso","MeshInstance3D",1]],sel:"Piso",rename:"Piso",vals:{Piso:{Mesh:"<empty>"}},target:"node-Piso",tag:"Renombrar a Piso"},
    {say:"Con Piso seleccionado, en el <b>Inspector</b> (derecha) tocá el campo <b>Mesh</b>, que dice <i>&lt;empty&gt;</i>, y elegí <b>New BoxMesh</b>. Aparece una caja.",
     pop:S3.meshPop,target:"pop-New BoxMesh",tag:"New BoxMesh",also:["prop-Mesh"]},
    {say:"Tocá la palabra <b>BoxMesh</b> para desplegar sus opciones y cambiá <b>Size</b>: para el piso, <code class=\"i\">10</code> × <code class=\"i\">0.1</code> × <code class=\"i\">9</code>. La caja se aplasta y se vuelve un piso.",
     tree:[...T3.base,["Piso","MeshInstance3D",1]],vals:{Piso:{Mesh:"BoxMesh"}},expand:{Mesh:[["Size","10  0.1  9"],["Subdivide Width","0"],["Subdivide Height","0"]]},target:"prop-Size",tag:"Tamaño X · Y · Z"},
    {say:"Para moverla, apretá <kbd>W</kbd> (herramienta <b>Move</b>) y arrastrá las flechas: <span style=\"color:#f07070\">roja = X</span>, <span style=\"color:#8fe388\">verde = Y (arriba)</span>, <span style=\"color:#7aa8ff\">azul = Z</span>.",
     expand:null,tool:"move",target:"tool-move",tag:"Move (W)",also:["gizmo"]},
    {say:"Repetí lo mismo para las paredes y las mesas, cambiando el Size de cada caja. Ponele nombre a cada una: <b>ParedFondo</b>, <b>ParedIzq</b>, <b>MesaRadio</b>, <b>MesaTelefonos</b>.",
     tree:T3.sala.slice(0,6),sel:"MesaRadio",vals:V3_CAJA,target:"node-MesaRadio",tag:"Una caja por cosa",also:["v-MesaRadio"]},
    {say:"<b>El mapa</b>: otro MeshInstance3D llamado <b>ModeloMapa</b>, pero en Mesh elegí <b>New QuadMesh</b> (un rectángulo plano). Ubicalo apoyado contra la pared del fondo.",
     tree:T3.sala,sel:"ModeloMapa",vals:{ModeloMapa:{Mesh:"<empty>","Material Override":"<empty>"}},pop:S3.meshPop,tool:"select",target:"pop-New QuadMesh",tag:"New QuadMesh"},
    {say:"Abajo en el Inspector: <b>Material Override</b> → <b>New StandardMaterial3D</b>. Tocalo para abrirlo, entrá a <b>Albedo</b> y <b>arrastrá</b> tu imagen del mapa desde el panel FileSystem hasta <b>Texture</b>.",
     vals:{ModeloMapa:{Mesh:"QuadMesh","Material Override":"StandardMaterial3D"}},expand:{"Material Override":[["@Albedo"],["Color","color:#ffffff"],["Texture","mapa.png"]]},fsSel:"mapa.png",target:"prop-Texture",tag:"Soltá la imagen acá",also:["fs-mapa.png"]}
  ]},
  3:{titulo:"Cámara, lámparas y ambiente",pasos:[
    {say:"Con <b>SalaDeGuerra</b> seleccionado, <b>+</b> → buscá <code class=\"i\">Camera3D</code> → <b>Create</b>.",
     ...SAL_ST,dark:false,tree:T3.sala,sel:"SalaDeGuerra",dlg:{kind:"newnode",search:"Camera3D",matches:[["Camera3D","Camera3D"],["XRCamera3D","Camera3D"]],pick:"Camera3D",desc:"Camera node, displays from a point of view."},target:"dlg-item-Camera3D",tag:"Camera3D",also:["dlg-ok"]},
    {say:"El cono violeta es lo que ve la cámara. Con <kbd>W</kbd> (Move) ponela donde estaría tu cabeza al entrar a la sala, mirando al mapa. Con <kbd>E</kbd> (Rotate) la girás.",
     tree:[...T3.sala,["Camera3D","Camera3D",1]],sel:"Camera3D",tool:"move",target:"v-Camera3D",tag:"Tu cámara"},
    {say:"Con la cámara seleccionada aparece arriba a la izquierda del visor la casilla <b>Preview</b>. Tildala para ver exactamente lo que va a ver el jugador. Destildala para volver a moverte libre.",
     tool:"select",target:"preview",tag:"Preview"},
    {say:"Ahora las lámparas: <b>+</b> → <code class=\"i\">OmniLight3D</code> (luz que sale de un punto hacia todos lados). Creá dos, <b>Lampara1</b> y <b>Lampara2</b>, y subilas cerca del techo con Move.",
     preview:false,tree:[...T3.sala,["Camera3D","Camera3D",1],["Lampara1","OmniLight3D",1],["Lampara2","OmniLight3D",1]],sel:"Lampara1",vals:{Lampara1:{Color:"color:#ffffff",Enabled:"off"}},tool:"move",target:"v-Lampara1",tag:"Lámpara",also:["node-Lampara2"]},
    {say:"En el Inspector de cada lámpara: tocá <b>Color</b> y elegí un amarillo cálido. Más abajo, en <b>Shadow</b>, tildá <b>Enabled</b> para que proyecte sombras.",
     tool:"select",vals:{Lampara1:{Color:"color:#ffc978",Enabled:"on"}},target:"prop-Color",tag:"Color cálido",also:["prop-Enabled"]},
    {say:"Agregá un <code class=\"i\">WorldEnvironment</code>. En el Inspector tocá <b>Environment</b> (&lt;empty&gt;) → <b>New Environment</b>.",
     tree:T3.luz,sel:"WorldEnvironment",vals:{WorldEnvironment:{Environment:"<empty>"}},pop:{x:870,y:224,w:200,items:["New Environment","-","Load...","Quick Load..."]},target:"pop-New Environment",tag:"New Environment"},
    {say:"Tocá <b>Environment</b> para abrirlo y en <b>Ambient Light</b> poné <b>Source</b> en Color, un color casi negro y <b>Energy</b> bajo (0.2). La sala se oscurece y las lámparas pasan a hacer todo el trabajo.",
     vals:{WorldEnvironment:{Environment:"Environment"}},expand:{Environment:[["@Background"],["Mode","Sky"],["@Ambient Light"],["Source","Color"],["Color","color:#1b1e24"],["Energy","0.2"]]},dark:true,target:"prop-Energy",tag:"Luz ambiente baja"}
  ]}
 },
 s2:{
  0:{titulo:"Poner los puntos de vista (Marker3D)",pasos:[
    {say:"Seleccioná <b>SalaDeGuerra</b>, tocá <b>+</b> y creá un <code class=\"i\">Node3D</code>. Renombralo <b>Vistas</b>: es solo una carpeta para ordenar.",
     ...SAL_ST,tree:[...T3.luz,["Vistas","Node3D",1]],sel:"Vistas",rename:"Vistas",target:"node-Vistas",tag:"Node3D llamado Vistas"},
    {say:"Con <b>Vistas</b> seleccionado, <b>+</b> → <code class=\"i\">Marker3D</code> tres veces. Llamalos <b>General</b>, <b>Mapa</b> y <b>Radio</b>. Quedan corridos a la derecha porque son hijos de Vistas.",
     tree:T3.vistas,sel:"Mapa",target:"node-Mapa",tag:"Hijos de Vistas",also:["node-General","node-Radio"]},
    {say:"Mové la vista del editor hasta que veas el mapa como querés: <b>mantené apretado el clic derecho</b> adentro del visor y usá <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> para caminar y el mouse para mirar.",
     target:"canvas3d",tag:"Clic derecho + WASD"},
    {say:"Con el Marker3D <b>Mapa</b> seleccionado, tocá <b>[ Perspective ]</b> arriba a la izquierda del visor y elegí <b>Align Transform with View</b> (<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>M</kbd>). El marcador salta justo a donde está tu vista. Hacé lo mismo con General y Radio.",
     perspMenu:true,pop:S3.persp,target:"pop-Align Transform with View",tag:"Align Transform with View",also:["persp"]}
  ]},
  1:{titulo:"Dónde va el script",pasos:[
    {say:"Hacé <b>clic derecho</b> sobre <b>SalaDeGuerra</b> en el árbol y elegí <b>Attach Script</b>.",
     ...SAL_ST,tree:T3.vistas,sel:"SalaDeGuerra",pop:S3.nodeCtx(140),target:"pop-Attach Script",tag:"Attach Script",also:["node-SalaDeGuerra"]},
    {say:"<b>Inherits</b> ya dice <i>Node3D</i>. En <b>Path</b> dejá <code class=\"i\">res://ui/sala_de_guerra.gd</code> y tocá <b>Create</b>.",
     dlg:{kind:"script",inherits:"Node3D",path:"res://ui/sala_de_guerra.gd"},target:"dlg-Path",tag:"Ruta del script",also:["dlg-ok"]},
    {say:"Se abre la pestaña <b>Script</b>. Borrá lo que trae de ejemplo y escribí el código de la lección <b>debajo de</b> <code class=\"i\">extends Node3D</code>. La función <code class=\"i\">ir_a_vista</code> es la que mueve la cámara.",
     ws:"script",scriptName:"sala_de_guerra.gd",tree:[["SalaDeGuerra","Node3D",0,"scr"],...T3.vistas.slice(1)],code:SALA_GD_HEAD+VIAJE_GD,hiLines:[12],target:"line-12",tag:"La función que viaja",also:["scric-SalaDeGuerra"]},
    {say:"Para probarlo con la escena abierta: <b>Run Current Scene</b> (<kbd>F6</kbd>). Si algo falla, el error aparece en <b>Output</b>, abajo.",
     target:"run-scene",tag:"Run Current Scene (F6)",also:["tab-out"]}
  ]},
  5:{titulo:"Dónde está esta línea",despues:true,pasos:[
    {say:"En la pestaña <b>Script</b>, dentro de <code class=\"i\">ir_a_vista</code>. El Tween se crea justo antes de decirle cómo moverse.",
     ...SAL_ST,ws:"script",scriptName:"sala_de_guerra.gd",tree:[["SalaDeGuerra","Node3D",0,"scr"],...T3.vistas.slice(1)],sel:"SalaDeGuerra",code:SALA_GD_HEAD+VIAJE_GD,hiLines:[18],target:"line-18",tag:"Acá"}
  ]}
 },
 s3:{
  0:{titulo:"Hacer que el mapa se pueda tocar",pasos:[
    {say:"Seleccioná <b>SalaDeGuerra</b>, <b>+</b> → <code class=\"i\">Area3D</code> → <b>Create</b>, y renombralo <b>ObjetoMapa</b>.",
     ...SAL_ST,tree:[...T3.vistas,["ObjetoMapa","Area3D",1]],sel:"ObjetoMapa",rename:"ObjetoMapa",target:"node-ObjetoMapa",tag:"Area3D: ObjetoMapa"},
    {say:"Ahora <b>arrastrá</b> en el árbol el nodo <b>ModeloMapa</b> y soltalo <b>encima de ObjetoMapa</b>. Así el mapa pasa a ser hijo del Area3D.",
     target:"node-ModeloMapa",tag:"Arrastralo…",also:["node-ObjetoMapa"]},
    {say:"Con <b>ObjetoMapa</b> seleccionado, <b>+</b> → <code class=\"i\">CollisionShape3D</code>. En el Inspector, en <b>Shape</b>, elegí <b>New BoxShape3D</b>.",
     tree:T3.objetos().filter(x=>x[0]!=="Cartel"),sel:"CollisionShape3D",vals:{CollisionShape3D:{Shape:"<empty>"}},pop:{x:870,y:224,w:220,items:["New BoxShape3D","New CapsuleShape3D","New ConvexPolygonShape3D","New CylinderShape3D","New SphereShape3D","New WorldBoundaryShape3D","-","Load...","Quick Load..."]},target:"pop-New BoxShape3D",tag:"New BoxShape3D"},
    {say:"Aparece una caja celeste: es la zona que se puede tocar. Abrí <b>BoxShape3D</b> y ajustá <b>Size</b> hasta que cubra todo el mapa (bien finita de profundidad).",
     vals:{CollisionShape3D:{Shape:"BoxShape3D"}},expand:{Shape:[["Size","1.6  0.9  0.05"]]},target:"prop-Size",tag:"Que cubra el mapa",also:["v-CollisionShape3D"]},
    {say:"Seleccioná <b>ObjetoMapa</b> y en el panel de la derecha abrí la pestaña <b>Groups</b> (en algunas versiones está dentro de la pestaña Node). Tocá el <b>+</b>.",
     sel:"ObjetoMapa",expand:null,dock:"grp",target:"grp-add",tag:"Nuevo grupo",also:["tab-grp"]},
    {say:"Escribí <code class=\"i\">objeto_menu</code> y aceptá. Queda tildado: ese grupo es como una etiqueta que después el script busca.",
     groups:{ObjetoMapa:["objeto_menu"]},target:"grp-objeto_menu",tag:"Grupo objeto_menu"},
    {say:"Volvé a <b>Inspector</b>, bajá hasta el final y tocá <b>Add Metadata</b>.",
     dock:"insp",target:"add-meta",tag:"Add Metadata",also:["tab-insp"]},
    {say:"En <b>Name</b> escribí <code class=\"i\">vista</code>, dejá <b>Type</b> en String y tocá <b>Add</b>. Repetí para <code class=\"i\">titulo</code>.",
     dlg:{kind:"meta",node:"ObjetoMapa",name:"vista"},target:"dlg-name",tag:"Nombre del dato",also:["dlg-ok"]},
    {say:"Escribí los valores: <b>vista</b> = <i>Mapa</i> y <b>titulo</b> = <i>CAMPAÑA</i>. Hacé lo mismo con la radio (Radio / OPCIONES) y los teléfonos.",
     meta:{ObjetoMapa:[["vista","Mapa"],["titulo","CAMPAÑA"]]},target:"meta-vista",tag:"Los datos del objeto",also:["meta-titulo"]},
    {say:"El cartel: <b>+</b> desde SalaDeGuerra → <code class=\"i\">Label3D</code>, renombralo <b>Cartel</b>, en <b>Text</b> escribí <i>CUARTEL GENERAL</i> y subilo con Move.",
     tree:T3.objetos(),sel:"Cartel",vals:{Cartel:{Text:"CUARTEL GENERAL"}},target:"prop-Text",tag:"Texto del cartel",also:["v-Cartel"]}
  ]},
  1:{titulo:"Dónde va este código",pasos:[
    {say:"Todo esto va en el mismo <code class=\"i\">sala_de_guerra.gd</code> (pestaña <b>Script</b>). Si ya tenías un <code class=\"i\">_ready</code>, no hagas otro: agregá estas líneas adentro del que ya existe. La más importante es esta:",
     ...SAL_ST,ws:"script",scriptName:"sala_de_guerra.gd",tree:T3.objetos("scr"),sel:"SalaDeGuerra",code:SALA_GD_HEAD+"# ... las variables e ir_a_vista de la lección anterior ...\n\n"+TOCAR_GD,hiLines:[7],target:"line-7",tag:"¡Sin esto no hay clics!"}
  ]},
  2:{titulo:"La lámpara que se prende",pasos:[
    {say:"Seleccioná <b>ObjetoMapa</b>, <b>+</b> → <code class=\"i\">OmniLight3D</code> y llamalo exactamente <b>Luz</b> (el script lo busca por ese nombre).",
     ...SAL_ST,tree:[...T3.objetos("scr").slice(0,-1),["Luz","OmniLight3D",2],["Cartel","Label3D",1]],sel:"Luz",rename:"Luz",target:"node-Luz",tag:"Hijo de ObjetoMapa"},
    {say:"En el Inspector de <b>Luz</b> poné <b>Energy</b> en <code class=\"i\">0</code>: arranca apagada y el código la prende cuando pasás el mouse.",
     vals:{Luz:{Energy:"0",Color:"color:#ffd59a"}},target:"prop-Energy",tag:"Energy = 0"}
  ]},
  5:{titulo:"Dónde está esta línea",despues:true,pasos:[
    {say:"En <code class=\"i\">sala_de_guerra.gd</code>, dentro de <code class=\"i\">_on_objeto_input_event</code>: lee el metadato <b>vista</b> que cargaste en el Inspector.",
     ...SAL_ST,ws:"script",scriptName:"sala_de_guerra.gd",tree:T3.objetos("scr"),sel:"SalaDeGuerra",code:SALA_GD_HEAD+"# ... las variables e ir_a_vista de la lección anterior ...\n\n"+TOCAR_GD,hiLines:[18],target:"line-18",tag:"Acá"}
  ]}
 },
 s4:{
  0:{titulo:"Hacer el pin y clavarlo en el mapa",pasos:[
    {say:"El pin es una escena aparte. <b>Scene → New Scene</b> y en el panel Scene tocá <b>Other Node</b>.",
     project:S3.proj,fs:S3.fs,ws:"3d",tab:null,tree:[],target:"root-other",tag:"Other Node"},
    {say:"Buscá <code class=\"i\">Area3D</code> y tocá <b>Create</b>. Renombralo <b>Pin</b>.",
     dlg:{kind:"newnode",search:"Area3D",matches:[["Area3D","Area3D"]],pick:"Area3D",desc:"A region of 3D space that detects other CollisionObject3Ds entering or exiting it."},target:"dlg-item-Area3D",tag:"Area3D",also:["dlg-ok"]},
    {say:"Agregale dos hijos con <b>+</b>: un <code class=\"i\">CollisionShape3D</code> (Shape → New SphereShape3D, chiquita) y un <code class=\"i\">MeshInstance3D</code> llamado <b>Esfera</b> (Mesh → New SphereMesh, con un material rojo).",
     tab:"[unsaved]",tree:[["Pin","Area3D",0],["PinCollision","CollisionShape3D",1],["Esfera","MeshInstance3D",1]],sel:"Esfera",vals:{Esfera:{Mesh:"SphereMesh"}},target:"node-Esfera",tag:"Los dos hijos",also:["node-PinCollision","v-Esfera"]},
    {say:"Seleccioná <b>Pin</b> y tocá el <b>pergamino con +</b> (Attach Script). Path: <code class=\"i\">res://ui/pin_mision.gd</code> → <b>Create</b>. Pegá el código de la lección.",
     sel:"Pin",dlg:{kind:"script",inherits:"Area3D",path:"res://ui/pin_mision.gd"},target:"dlg-Path",tag:"pin_mision.gd",also:["dlg-ok"]},
    {say:"Guardá con <kbd>Ctrl</kbd>+<kbd>S</kbd> en la carpeta <code class=\"i\">ui</code> como <code class=\"i\">pin_mision.tscn</code>.",
     tree:[["Pin","Area3D",0,"scr"],["PinCollision","CollisionShape3D",1],["Esfera","MeshInstance3D",1]],dlg:{kind:"save",path:"res://ui/",files:["..","sala_de_guerra.tscn"],file:"pin_mision.tscn"},target:"dlg-file",tag:"pin_mision.tscn",also:["dlg-ok"]},
    {say:"Volvé a la sala (doble clic en <code class=\"i\">sala_de_guerra.tscn</code> en FileSystem). Agregá un <code class=\"i\">Node3D</code> llamado <b>PinesMapa</b>, seleccionalo y tocá la <b>cadenita</b> (Instantiate Child Scene, <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd>).",
     ...SAL_ST,fs:S3.fsPin,tree:[...T3.objetos("scr"),["PinesMapa","Node3D",1]],sel:"PinesMapa",target:"link-inst",tag:"Instantiate Child Scene",also:["node-PinesMapa"]},
    {say:"Elegí <code class=\"i\">pin_mision.tscn</code> y tocá <b>Open</b>. Repetí para tener varios pines (Pin1, Pin2, Pin3). Tienen la cadenita al lado: son copias de la escena del pin.",
     dlg:{kind:"instance",search:"pin",files:["res://ui/pin_mision.tscn","res://ui/sala_de_guerra.tscn"],pick:"res://ui/pin_mision.tscn"},target:"dlg-file-res://ui/pin_mision.tscn",tag:"pin_mision.tscn",also:["dlg-ok"]},
    {say:"Seleccioná un pin: arriba del Inspector aparecen las variables <code class=\"i\">@export</code> del script. Escribí el nombre y la descripción, y en <b>Escena</b> tocá la carpetita para elegir el nivel.",
     tree:[...T3.objetos("scr"),["PinesMapa","Node3D",1],["Pin1","Area3D",2,"inst scr"],["Pin2","Area3D",2,"inst scr"],["Pin3","Area3D",2,"inst scr"]],sel:"Pin1",
     exports:{Pin1:{script:"pin_mision.gd",vars:[["Nombre Mision","Operación Puente"],["Descripcion","Tomá el puente del río al amanecer."],["Escena","file:res://niveles/mision_1.tscn"]]}},target:"prop-Escena",tag:"Elegí el nivel",also:["prop-Nombre Mision"]},
    {say:"Por último, con <kbd>W</kbd> (Move) llevá cada pin sobre su lugar del mapa.",
     sel:"Pin2",tool:"move",target:"v-Pin2",tag:"Ubicá el pin",also:["v-Pin1","v-Pin3"]}
  ]},
  1:{titulo:"Armar el panel de la misión",pasos:[
    {say:"Desde <b>SalaDeGuerra</b> agregá un <code class=\"i\">CanvasLayer</code> llamado <b>UI</b>. Todo lo que pongas adentro se dibuja <b>encima</b> del 3D, como una pantalla pegada al vidrio.",
     ...SAL_ST,fs:S3.fsPin,tree:[...T3.objetos("scr"),["PinesMapa","Node3D",1],["UI","CanvasLayer",1]],sel:"UI",rename:"UI",target:"node-UI",tag:"CanvasLayer: UI"},
    {say:"Dentro de <b>UI</b>: un <code class=\"i\">Button</code> <b>BotonVolver</b> y un <code class=\"i\">PanelContainer</code> <b>PanelMision</b>. Dentro del panel: dos <code class=\"i\">Label</code> (<b>Titulo</b>, <b>Descripcion</b>) y un <code class=\"i\">Button</code> <b>BotonEmpezar</b>.",
     tree:[...T3.objetos("scr"),["PinesMapa","Node3D",1],["UI","CanvasLayer",1],["BotonVolver","Button",2],["PanelMision","PanelContainer",2],["Titulo","Label",3],["Descripcion","Label",3],["BotonEmpezar","Button",3]],sel:"PanelMision",target:"node-PanelMision",tag:"El panel y sus hijos",also:["node-BotonEmpezar"]},
    {say:"El panel tiene que empezar oculto: tocá el <b>ojito</b> a la derecha de <b>PanelMision</b>. Queda tachado y el nombre se ve gris. El script lo muestra con <code class=\"i\">show()</code> cuando elegís un pin.",
     target:"eye-PanelMision",tag:"Ocultar"},
    {say:"Así queda: el ojito tachado. Ahora sumá el código de la lección al final de <code class=\"i\">sala_de_guerra.gd</code>, en la pestaña <b>Script</b>.",
     tree:[...T3.objetos("scr"),["PinesMapa","Node3D",1],["UI","CanvasLayer",1],["BotonVolver","Button",2],["PanelMision","PanelContainer",2,"hid"],["Titulo","Label",3,"hid"],["Descripcion","Label",3,"hid"],["BotonEmpezar","Button",3,"hid"]],target:"eye-PanelMision",tag:"Oculto",also:["ws-script"]}
  ]},
  4:{titulo:"Dónde está esta línea",despues:true,pasos:[
    {say:"Esta va en el script del pin, <code class=\"i\">pin_mision.gd</code>, dentro de <code class=\"i\">_input_event</code>. Abrilo desde FileSystem o con el pergamino al lado de un pin.",
     ...SAL_ST,fs:S3.fsPin,tab:"pin_mision",ws:"script",scriptName:"pin_mision.gd",tree:[["Pin","Area3D",0,"scr"],["PinCollision","CollisionShape3D",1],["Esfera","MeshInstance3D",1]],sel:"Pin",code:PIN_GD,hiLines:[13],target:"line-13",tag:"Acá"}
  ]}
 }
});

/* =================== MENÚ: opciones, fundido y fondo 3D =================== */
const lineOf=(code,txt)=>code.split("\n").findIndex(l=>l.includes(txt))+1;
const PL={tab:"menu_plano",saved:true,hasScript:true,ws:"2d",vals:GV,centered:true};
const T_OPC=(f={})=>[...GT.full({MenuPrincipal:"scr",BotonCampana:"sig",BotonSalir:"sig"}),["Opciones","Control",1,f.Opciones||""],["Volumen","HSlider",2,f.Volumen||""],["PantallaCompleta","CheckButton",2,f.PantallaCompleta||""],["Volver","Button",2,f.Volver||""]];
const OPC_FS=[["folder","escenas",1],["tscn","menu_plano.tscn",2],["tscn","nivel_1.tscn",2],["folder","scripts",1],["gd","menu.gd",2],["gd","opciones.gd",2]];
const MENU_FUND=G_FULL.replace(`func _on_boton_campana_pressed() -> void:
	get_tree().change_scene_to_file("res://escenas/nivel_1.tscn")`,`func _on_boton_campana_pressed() -> void:
	var tween = create_tween()
	tween.tween_property($Fundido, "modulate:a", 1.0, 0.6)
	await tween.finished
	get_tree().change_scene_to_file("res://escenas/nivel_1.tscn")`);

Object.assign(GUIAS,{
 l3:{
  0:{titulo:"Armar el panel de opciones",pasos:[
    {say:"En <code class=\"i\">menu_plano.tscn</code> seleccioná <b>MenuPrincipal</b>, <b>+</b> → <code class=\"i\">Control</code> y llamalo <b>Opciones</b>. Queda al mismo nivel que VBox (los dos son hijos de MenuPrincipal).",
     ...PL,fs:OPC_FS.slice(0,5),tree:[...GT.full({MenuPrincipal:"scr",BotonCampana:"sig",BotonSalir:"sig"}),["Opciones","Control",1]],sel:"Opciones",rename:"Opciones",target:"node-Opciones",tag:"Hermano de VBox"},
    {say:"Con <b>Opciones</b> seleccionado agregá tres hijos: un <code class=\"i\">HSlider</code> llamado <b>Volumen</b>, un <code class=\"i\">CheckButton</code> llamado <b>PantallaCompleta</b> y un <code class=\"i\">Button</code> llamado <b>Volver</b>.",
     tree:T_OPC(),sel:"Volumen",target:"node-Volumen",tag:"Los tres hijos",also:["node-PantallaCompleta","node-Volver"]},
    {say:"Seleccioná <b>Volumen</b>. En el Inspector, sección <b>Range</b>: <b>Max Value</b> = <code class=\"i\">1</code>, <b>Step</b> = <code class=\"i\">0.01</code> y <b>Value</b> = <code class=\"i\">1</code>. Así va de 0 (mudo) a 1 (todo).",
     vals:{Volumen:{"Max Value":"1",Step:"0.01",Value:"1"}},target:"prop-Max Value",tag:"De 0 a 1",also:["prop-Step","prop-Value"]},
    {say:"El script pide el bus <code class=\"i\">\"Master\"</code>. Lo ves abajo, en la pestaña <b>Audio</b>: es el canal principal por donde sale todo el sonido.",
     bottom:"audio",target:"bus-Master",tag:"Bus Master",also:["tab-audio"]},
    {say:"Seleccioná <b>PantallaCompleta</b> y en <b>Text</b> escribí <i>Pantalla completa</i>. A <b>Volver</b> ponele <i>Volver</i>.",
     bottom:null,sel:"PantallaCompleta",vals:{PantallaCompleta:{Text:"Pantalla completa"},Volver:{Text:"Volver"}},target:"prop-Text",tag:"Texto"},
    {say:"Opciones tiene que empezar escondido: tocá el <b>ojito</b> a la derecha de <b>Opciones</b>.",
     sel:"Opciones",target:"eye-Opciones",tag:"Ocultar"},
    {say:"Con <b>Opciones</b> seleccionado tocá el <b>pergamino con +</b> (Attach Script). Path: <code class=\"i\">res://scripts/opciones.gd</code> → <b>Create</b>.",
     tree:T_OPC({Opciones:"hid"}).map(x=>x[2]===2&&["Volumen","PantallaCompleta","Volver"].includes(x[0])?[...x.slice(0,3),"hid"]:x),dlg:{kind:"script",path:"res://scripts/opciones.gd"},target:"dlg-Path",tag:"opciones.gd",also:["dlg-ok"]},
    {say:"Ahora las señales. Seleccioná <b>Volumen</b>, abrí <b>Signals</b> y hacé doble clic en <code class=\"i\">value_changed(value: float)</code>. Conectala a <b>Opciones</b>: Godot crea <code class=\"i\">_on_volumen_value_changed</code>.",
     fs:OPC_FS,tree:T_OPC({Opciones:"hid scr"}),sel:"Volumen",dock:"sig",target:"sig-value_changed",tag:"Doble clic"},
    {say:"Lo mismo con <b>PantallaCompleta</b> → <code class=\"i\">toggled(toggled_on: bool)</code>, y con <b>Volver</b> → <code class=\"i\">pressed()</code>. Las tres van a <b>Opciones</b>.",
     sel:"PantallaCompleta",target:"sig-toggled",tag:"toggled"},
    {say:"En <code class=\"i\">opciones.gd</code> quedan las tres funciones con su ícono verde. Escribí adentro lo que muestra la lección.",
     ws:"script",dock:"insp",sel:"Opciones",scriptName:"opciones.gd",tree:T_OPC({Opciones:"hid scr",Volumen:"sig",PantallaCompleta:"sig",Volver:"sig"}),code:OPCIONES_GD,sigLines:[3,7,13],hiLines:[3,4,5],target:"line-3",tag:"Funciones de las señales"},
    {say:"Falta que el botón <b>Opciones</b> del menú abra el panel: conectá <b>BotonOpciones</b> → <code class=\"i\">pressed()</code> a <b>MenuPrincipal</b> y escribí <code class=\"i\">$Opciones.show()</code> y <code class=\"i\">$VBox.hide()</code> en <code class=\"i\">menu.gd</code>.",
     ws:"2d",sel:"BotonOpciones",dock:"sig",target:"sig-pressed",tag:"pressed de BotonOpciones"}
  ]},
  2:{titulo:"Dónde va esta línea",despues:true,pasos:[
    {say:"En <code class=\"i\">opciones.gd</code>, dentro de <code class=\"i\">_on_pantalla_completa_toggled</code>, en la parte del <code class=\"i\">if activado:</code>.",
     ...PL,fs:OPC_FS,ws:"script",scriptName:"opciones.gd",tree:T_OPC({Opciones:"hid scr",Volumen:"sig",PantallaCompleta:"sig",Volver:"sig"}),sel:"Opciones",code:OPCIONES_GD,sigLines:[3,7,13],hiLines:[9],target:"line-9",tag:"Acá"}
  ]},
  4:{titulo:"Probarlo",pasos:[
    {say:"<kbd>F6</kbd> (Run Current Scene) con <code class=\"i\">menu_plano.tscn</code> abierta. Tocá Opciones, mové el volumen, prendé pantalla completa y volvé.",
     ...PL,fs:OPC_FS,tree:T_OPC({Opciones:"hid scr",Volumen:"sig",PantallaCompleta:"sig",Volver:"sig"}),sel:"MenuPrincipal",target:"run-scene",tag:"Run Current Scene (F6)"}
  ]}
 },
 l4:{
  0:{titulo:"El telón negro del fundido",pasos:[
    {say:"Seleccioná <b>MenuPrincipal</b>, <b>+</b> → <code class=\"i\">ColorRect</code> y llamalo <b>Fundido</b>. Tiene que quedar <b>último</b> en la lista: en Godot lo de más abajo se dibuja encima de todo. Si no queda último, arrastralo hasta el final.",
     ...PL,fs:OPC_FS,tree:[...T_OPC({Opciones:"hid scr",Volumen:"sig",PantallaCompleta:"sig",Volver:"sig"}),["Fundido","ColorRect",1]],sel:"Fundido",rename:"Fundido",target:"node-Fundido",tag:"Último de la lista"},
    {say:"En el Inspector, <b>Color</b>: elegí negro.",
     vals:{Fundido:{Color:"color:#000000",alpha:0}},target:"prop-Color",tag:"Negro"},
    {say:"Para que tape toda la pantalla: tocá el ícono verde de <b>anclas</b> en la barra del 2D y elegí <b>Full Rect</b> (el de abajo a la derecha).",
     anchorMenu:true,target:"anchor-Full Rect",tag:"Full Rect"},
    {say:"Abajo en el Inspector, en <b>CanvasItem → Visibility → Modulate</b>, tocá el color y bajá la <b>A</b> (transparencia) a <code class=\"i\">0</code>. Queda invisible hasta que el Tween lo suba a 1.",
     vals:{Fundido:{"Anchors Preset":"Full Rect"}},expand:{Modulate:[["R","255"],["G","255"],["B","255"],["A","0"]]},target:"prop-A",tag:"A = 0"},
    {say:"<b>Muy importante:</b> en <b>Mouse → Filter</b> elegí <b>Ignore</b>. Si no, aunque sea invisible, el rectángulo tapa los botones y los clics no llegan.",
     expand:null,vals:{Fundido:{Filter:"Ignore"}},target:"prop-Filter",tag:"Filter = Ignore"},
    {say:"En <code class=\"i\">menu.gd</code>, cambiá lo que hace <code class=\"i\">_on_boton_campana_pressed</code>: primero el Tween que oscurece, después <code class=\"i\">await</code> y recién ahí el cambio de escena.",
     ws:"script",sel:"MenuPrincipal",code:MENU_FUND,sigLines:[8,15],hiLines:[9,10,11,12],target:"line-10",tag:"El fundido"}
  ]},
  1:{titulo:"Dónde va el await",despues:true,pasos:[
    {say:"En <code class=\"i\">menu.gd</code>, justo después de crear el Tween y antes de <code class=\"i\">change_scene_to_file</code>.",
     ...PL,fs:OPC_FS,ws:"script",tree:[...T_OPC({Opciones:"hid scr"}),["Fundido","ColorRect",1]],sel:"MenuPrincipal",code:MENU_FUND,sigLines:[8,15],hiLines:[11],target:"line-11",tag:"Acá"}
  ]},
  3:{titulo:"Probarlo",pasos:[
    {say:"<kbd>F6</kbd> y tocá <b>Campaña</b>: la pantalla se oscurece y recién después carga el nivel. Si los botones no responden, revisá que Fundido tenga <b>Mouse → Filter = Ignore</b>.",
     ...PL,fs:OPC_FS,tree:[...T_OPC({Opciones:"hid scr"}),["Fundido","ColorRect",1]],sel:"Fundido",vals:{Fundido:{Color:"color:#000000",Filter:"Ignore",alpha:0}},target:"run-scene",tag:"Run Current Scene (F6)",also:["prop-Filter"]}
  ]}
 }
});

/* =================== UNIDAD 2: EL JUGADOR =================== */
const JG=JUGADOR_COMPLETO_GD;
const JFS=[["folder","jugador",1],["tscn","jugador.tscn",2],["gd","jugador.gd",2],["folder","niveles",1],["tscn","prueba.tscn",2]];
const TJ=(f="")=>[["Jugador","CharacterBody3D",0,f],["CollisionShape3D","CollisionShape3D",1],["Cuerpo","MeshInstance3D",1],["Cabeza","Node3D",1],["Camera3D","Camera3D",2]];
const ALJ={Jugador:"JugRoot",CollisionShape3D:"Capsula",Cuerpo:"CuerpoJug",Camera3D:"CamJug"};
const JV={CollisionShape3D:{Shape:"CapsuleShape3D"},Cuerpo:{Mesh:"CapsuleMesh"},Cabeza:{Position:"0  1.6  0"}};
const JST={project:"Mi FPS",tab:"jugador",ws:"3d",alias:ALJ,vals:JV,fs:JFS};
const JSCR={...JST,ws:"script",scriptName:"jugador.gd",tree:TJ("scr"),sel:"Jugador",code:JG};
const jl=t=>lineOf(JG,t);
const ACC=[["adelante",["W (Physical)"]],["atras",["S (Physical)"]],["izquierda",["A (Physical)"]],["derecha",["D (Physical)"]],["saltar",["Space (Physical)"]],["correr",["Shift (Physical)"]],["agacharse",["C (Physical)"]],["disparar",["Left Mouse Button"]]];
const JEXP={Jugador:{script:"jugador.gd",vars:[["Velocidad","6"],["Velocidad Correr","10"],["Fuerza Salto","5"],["Sensibilidad","0.003"]]}};

Object.assign(GUIAS,{
 f1:{
  0:{titulo:"Armar la escena del jugador",pasos:[
    {say:"<b>Scene → New Scene</b> y en el panel Scene tocá <b>Other Node</b>.",
     ...JST,tab:null,fs:JFS.slice(3),tree:[],target:"root-other",tag:"Other Node"},
    {say:"Buscá <code class=\"i\">CharacterBody3D</code> y tocá <b>Create</b>. Renombralo <b>Jugador</b>.",
     dlg:{kind:"newnode",search:"CharacterBody3D",matches:[["CharacterBody3D","CharacterBody3D"]],pick:"CharacterBody3D",desc:"A 3D physics body specialized for characters moved by script."},target:"dlg-item-CharacterBody3D",tag:"CharacterBody3D",also:["dlg-ok"]},
    {say:"Godot marca un triangulito amarillo al lado: avisa que le falta la forma de choque. Con Jugador seleccionado, <b>+</b> → <code class=\"i\">CollisionShape3D</code>.",
     tab:"[unsaved]",tree:[["Jugador","CharacterBody3D",0],["CollisionShape3D","CollisionShape3D",1]],sel:"CollisionShape3D",vals:{CollisionShape3D:{Shape:"<empty>"}},target:"node-CollisionShape3D",tag:"Forma de choque"},
    {say:"En el Inspector, <b>Shape</b> → <b>New CapsuleShape3D</b>. Abrila y poné <b>Height</b> en <code class=\"i\">1.8</code> (la altura de una persona). Con Move subila para que la base quede en el piso.",
     vals:{CollisionShape3D:{Shape:"CapsuleShape3D"}},expand:{Shape:[["Radius","0.4"],["Height","1.8"]]},target:"prop-Height",tag:"1.8 m",also:["v-CollisionShape3D"]},
    {say:"Opcional, para verte en el editor: un <code class=\"i\">MeshInstance3D</code> <b>Cuerpo</b> con <b>New CapsuleMesh</b>. Después, desde Jugador, un <code class=\"i\">Node3D</code> llamado <b>Cabeza</b>.",
     expand:null,tree:TJ().slice(0,4),sel:"Cabeza",target:"node-Cabeza",tag:"Cabeza (Node3D)",also:["node-Cuerpo"]},
    {say:"Subí la cabeza a la altura de los ojos: en el Inspector, <b>Transform → Position</b>, poné <b>y</b> = <code class=\"i\">1.6</code>.",
     target:"prop-Position",tag:"y = 1.6",also:["v-Cabeza"]},
    {say:"Seleccioná <b>Cabeza</b> y agregale un <code class=\"i\">Camera3D</code>. Queda corrido a la derecha: es hijo de Cabeza, así cuando la cabeza mira arriba, la cámara también.",
     tree:TJ(),sel:"Camera3D",target:"node-Camera3D",tag:"Hijo de Cabeza",also:["v-Camera3D"]},
    {say:"Seleccioná <b>Jugador</b> y <b>Attach Script</b>. En <b>Template</b> elegí <i>Object: Empty</i> (el código lo vamos a escribir nosotros) y en Path <code class=\"i\">res://jugador/jugador.gd</code>.",
     sel:"Jugador",dlg:{kind:"script",inherits:"CharacterBody3D",path:"res://jugador/jugador.gd"},target:"dlg-Template",tag:"Object: Empty",also:["dlg-Path"]},
    {say:"Guardá con <kbd>Ctrl</kbd>+<kbd>S</kbd> como <code class=\"i\">jugador/jugador.tscn</code>. Ese es tu jugador: después lo metés en cada nivel.",
     tree:TJ("scr"),dlg:{kind:"save",path:"res://jugador/",files:[".."],file:"jugador.tscn"},target:"dlg-file",tag:"jugador.tscn",also:["dlg-ok"]}
  ]},
  3:{titulo:"Dónde va esta línea",despues:true,pasos:[
    {say:"Es la <b>primera línea</b> de <code class=\"i\">jugador.gd</code>. Si en Attach Script dejaste Inherits en CharacterBody3D, Godot ya la escribe solo.",
     ...JSCR,code:"extends CharacterBody3D\n\n",hiLines:[1],target:"line-1",tag:"Línea 1"}
  ]}
 },
 f2:{
  0:{titulo:"Crear las acciones en el Mapa de entrada",pasos:[
    {say:"Arriba: menú <b>Project</b> → <b>Project Settings...</b>.",
     ...JST,tree:TJ("scr"),sel:"Jugador",menu:{name:"Project"},target:"mi-Project Settings...",tag:"Project Settings"},
    {say:"Arriba de la ventana, pestaña <b>Input Map</b>. En el campo <b>Add New Action</b> escribí <code class=\"i\">adelante</code> y tocá <b>+ Add</b>.",
     dlg:{kind:"settings",newAction:"adelante",actions:[]},target:"dlg-newaction",tag:"Nombre de la acción",also:["dlg-addaction","set-tab-Input Map"]},
    {say:"La acción aparece en la lista. Tocá el <b>+</b> de su fila para asignarle una tecla.",
     dlg:{kind:"settings",actions:[["adelante",[]]]},target:"act-adelante-add",tag:"Asignar tecla"},
    {say:"Se abre una ventana que dice <i>Listening for Input...</i>: <b>apretá la tecla W</b> en tu teclado y tocá <b>OK</b>. Para el joystick, apretá el stick o elegilo en <b>Joypad Axes</b>.",
     dlg:{kind:"settings",actions:[["adelante",[]]]},dlg2:{kind:"event",action:"adelante",got:"W (Physical)"},target:"dlg-listen",tag:"Apretá W",also:["dlg-ok"]},
    {say:"Repetí para todas: <b>atras</b> (S), <b>izquierda</b> (A), <b>derecha</b> (D), <b>saltar</b> (Espacio), <b>correr</b> (Shift), <b>agacharse</b> (C), <b>disparar</b> (clic izquierdo). Escribilas igual, en minúscula y sin tildes.",
     dlg:{kind:"settings",actions:ACC},target:"act-saltar",tag:"Todas las acciones",also:["dlg-close"]}
  ]},
  2:{titulo:"Dónde está esta línea",despues:true,pasos:[
    {say:"En <code class=\"i\">jugador.gd</code>, dentro de <code class=\"i\">_physics_process</code>. Los cuatro nombres tienen que ser idénticos a los del Input Map.",
     ...JSCR,hiLines:[jl("get_vector")],target:"line-"+jl("get_vector"),tag:"Los nombres del Input Map"}
  ]}
 },
 f3:{
  0:{titulo:"Dónde va cada parte en jugador.gd",pasos:[
    {say:"Arriba, junto a las otras variables, va la sensibilidad con <code class=\"i\">@export</code>, para poder ajustarla desde el Inspector.",
     ...JSCR,hiLines:[jl("sensibilidad :=")],target:"line-"+jl("sensibilidad :="),tag:"Sensibilidad"},
    {say:"En <code class=\"i\">_ready</code> se captura el mouse: el cursor desaparece y queda encerrado en la ventana del juego.",
     hiLines:[jl("func _ready"),jl("func _ready")+1],target:"line-"+(jl("func _ready")+1),tag:"Capturar el mouse"},
    {say:"En <code class=\"i\">_unhandled_input</code>: <code class=\"i\">rotate_y</code> gira el cuerpo, <code class=\"i\">cabeza.rotate_x</code> la cabeza, y <code class=\"i\">clamp</code> pone el límite.",
     hiLines:[15,16,17],target:"line-15",tag:"Los dos giros",also:["line-17"]},
    {say:"Para probar la sensibilidad sin tocar el código: abrí la pestaña <b>3D</b>, seleccioná <b>Jugador</b> y cambiá <b>Sensibilidad</b> arriba del Inspector.",
     ws:"3d",exports:JEXP,target:"prop-Sensibilidad",tag:"Ajustala acá"}
  ]},
  4:{titulo:"Dónde está esta línea",despues:true,pasos:[
    {say:"En <code class=\"i\">_unhandled_input</code>, justo después de girar la cabeza.",
     ...JSCR,hiLines:[jl("clamp(")],target:"line-"+jl("clamp("),tag:"Acá"}
  ]}
 },
 f4:{
  0:{titulo:"Dónde va el movimiento",pasos:[
    {say:"Al final de <code class=\"i\">_physics_process</code> en <code class=\"i\">jugador.gd</code>. Va en <i>physics</i> y no en <code class=\"i\">_process</code> porque mueve un cuerpo que choca.",
     ...JSCR,hiLines:[38,39,40,41,42],target:"line-39",tag:"Caminar hacia donde mirás",also:["line-42"]},
    {say:"<b>Truco:</b> en la escena del jugador, el lado hacia donde mira es la <span style=\"color:#7aa8ff\">flecha azul (Z) pero al revés</span>: en Godot, adelante es -Z. Fijate que la cámara mire para ese lado.",
     ws:"3d",sel:"Jugador",tool:"move",target:"gizmo",tag:"Adelante = -Z"}
  ]},
  3:{titulo:"Dónde está esta línea",despues:true,pasos:[
    {say:"Última línea de <code class=\"i\">_physics_process</code>: primero calculás la velocity y al final la aplicás.",
     ...JSCR,hiLines:[42],target:"line-42",tag:"Acá"}
  ]}
 },
 f5:{
  0:{titulo:"Dónde va saltar, correr y agacharse",pasos:[
    {say:"El salto va arriba en <code class=\"i\">_physics_process</code>, después de la gravedad.",
     ...JSCR,hiLines:[26,27],target:"line-26",tag:"Saltar"},
    {say:"Después se elige la velocidad: normal, correr o agachado. Acá también baja la cabeza con <code class=\"i\">lerp</code>.",
     hiLines:[29,30,31,32,33,34,35,36],target:"line-34",tag:"Correr y agacharse"},
    {say:"Las velocidades y la fuerza del salto son <code class=\"i\">@export</code>: en <b>3D</b>, con Jugador seleccionado, las cambiás arriba del Inspector mientras probás.",
     ws:"3d",exports:JEXP,target:"prop-Fuerza Salto",tag:"Ajustá el salto",also:["prop-Velocidad Correr"]}
  ]},
  3:{titulo:"Dónde está esta línea",despues:true,pasos:[
    {say:"En <code class=\"i\">_physics_process</code>, después de <code class=\"i\">var vel_actual := velocidad</code>.",
     ...JSCR,hiLines:[30],target:"line-30",tag:"Acá"}
  ]}
 },
 f6:{
  0:{titulo:"Dónde va soltar el mouse",pasos:[
    {say:"Al final de <code class=\"i\">_unhandled_input</code>. <code class=\"i\">ui_cancel</code> ya existe en el Input Map (es Esc): no hace falta crearla.",
     ...JSCR,hiLines:[18,19,20,21],target:"line-18",tag:"Esc suelta el mouse"}
  ]},
  2:{titulo:"Armar un nivel de prueba",pasos:[
    {say:"<b>Scene → New Scene</b> → <b>3D Scene</b>, llamala <b>Prueba</b>. Agregá un <code class=\"i\">StaticBody3D</code> <b>Piso</b>: es un cuerpo que no se mueve.",
     project:"Mi FPS",ws:"3d",tab:"prueba",fs:JFS,alias:{Piso:"PisoNivel",ColisionPiso:"PisoColision",DirectionalLight3D:"Sol",Jugador:"JugInst"},tree:[["Prueba","Node3D",0],["Piso","StaticBody3D",1]],sel:"Piso",target:"node-Piso",tag:"StaticBody3D"},
    {say:"Dentro de Piso: un <code class=\"i\">CollisionShape3D</code> (<b>ColisionPiso</b>, New BoxShape3D grande y finito) y un <code class=\"i\">MeshInstance3D</code> con BoxMesh del mismo tamaño para verlo.",
     tree:[["Prueba","Node3D",0],["Piso","StaticBody3D",1],["ColisionPiso","CollisionShape3D",2],["Malla","MeshInstance3D",2]],vals:{ColisionPiso:{Shape:"BoxShape3D"}},sel:"ColisionPiso",expand:{Shape:[["Size","20  0.2  20"]]},target:"prop-Size",tag:"Piso de 20 × 20",also:["v-ColisionPiso"]},
    {say:"Agregá una <code class=\"i\">DirectionalLight3D</code> para que no quede todo oscuro.",
     expand:null,tree:[["Prueba","Node3D",0],["Piso","StaticBody3D",1],["ColisionPiso","CollisionShape3D",2],["Malla","MeshInstance3D",2],["DirectionalLight3D","DirectionalLight3D",1]],sel:"DirectionalLight3D",target:"v-DirectionalLight3D",tag:"El sol"},
    {say:"Seleccioná <b>Prueba</b> y tocá la <b>cadenita</b> (Instantiate Child Scene). Elegí <code class=\"i\">jugador/jugador.tscn</code>.",
     sel:"Prueba",dlg:{kind:"instance",search:"jugador",files:["res://jugador/jugador.tscn"],pick:"res://jugador/jugador.tscn"},target:"dlg-file-res://jugador/jugador.tscn",tag:"jugador.tscn",also:["dlg-ok"]},
    {say:"El jugador aparece con la cadenita al lado. Subilo un poco con Move para que no arranque metido en el piso, guardá y apretá <kbd>F6</kbd>.",
     tree:[["Prueba","Node3D",0],["Piso","StaticBody3D",1],["ColisionPiso","CollisionShape3D",2],["Malla","MeshInstance3D",2],["DirectionalLight3D","DirectionalLight3D",1],["Jugador","CharacterBody3D",1,"inst scr"]],sel:"Jugador",tool:"move",target:"run-scene",tag:"F6 para jugar",also:["instic-Jugador"]}
  ]}
 }
});
