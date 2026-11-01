/* =================== contenido de lecciones =================== */
const MENU_GD = `extends Control

func _ready():
	# El primer botón queda seleccionado para jugar con teclado o joystick
	$VBox/BotonCampana.grab_focus()

func _on_boton_campana_pressed():
	get_tree().change_scene_to_file("res://escenas/nivel_1.tscn")

func _on_boton_vehiculos_pressed():
	get_tree().change_scene_to_file("res://escenas/misiones_vehiculos.tscn")

func _on_boton_opciones_pressed():
	$Opciones.show()
	$VBox.hide()

func _on_boton_salir_pressed():
	get_tree().quit()`;

const FONDO_GD = `extends Node3D

@export var amplitud := 0.12   # cuánto gira la cámara
@export var velocidad := 0.35  # qué tan rápido respira
@onready var camara: Camera3D = $Camera3D

var t := 0.0
var rot_base: Vector3

func _ready():
	rot_base = camara.rotation

func _process(delta):
	t += delta * velocidad
	camara.rotation.y = rot_base.y + sin(t) * amplitud
	camara.rotation.x = rot_base.x + sin(t * 0.7) * amplitud * 0.4`;

const PARALLAX_GD = `var objetivo := Vector2.ZERO

func _input(event):
	if event is InputEventMouseMotion:
		var centro = get_viewport().get_visible_rect().size / 2
		objetivo = (event.position - centro) / centro

func _process(delta):
	# lerp suaviza: la cámara persigue al mouse sin saltos
	camara.rotation.y = lerp(camara.rotation.y, rot_base.y - objetivo.x * 0.05, delta * 2)`;

const OPCIONES_GD = `extends Control

func _on_volumen_value_changed(valor: float):
	var bus = AudioServer.get_bus_index("Master")
	AudioServer.set_bus_volume_db(bus, linear_to_db(valor))

func _on_pantalla_completa_toggled(activado: bool):
	if activado:
		DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_FULLSCREEN)
	else:
		DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_WINDOWED)

func _on_volver_pressed():
	hide()
	get_parent().get_node("VBox").show()`;

const FUNDIDO_GD = `func _on_boton_campana_pressed():
	var tween = create_tween()
	tween.tween_property($Fundido, "modulate:a", 1.0, 0.6)
	await tween.finished
	get_tree().change_scene_to_file("res://escenas/nivel_1.tscn")`;

const TREE_PLANO = `<span class="t">MenuPrincipal</span> <span class="m">(Control)</span>
├─ <span class="t">Fondo</span> <span class="m">(TextureRect)</span>
├─ <span class="t">Titulo</span> <span class="m">(Label)</span>
└─ <span class="t">VBox</span> <span class="m">(VBoxContainer)</span>
   ├─ <span class="t">BotonCampana</span> <span class="m">(Button)</span>
   ├─ <span class="t">BotonVehiculos</span> <span class="m">(Button)</span>
   ├─ <span class="t">BotonOpciones</span> <span class="m">(Button)</span>
   └─ <span class="t">BotonSalir</span> <span class="m">(Button)</span>`;

const TREE_3D = `<span class="t">MenuPrincipal</span> <span class="m">(Node3D)</span>  <span class="m">← fondo.gd</span>
├─ <span class="t">Camera3D</span>
├─ <span class="t">WorldEnvironment</span> <span class="m">(niebla y cielo)</span>
├─ <span class="t">DirectionalLight3D</span>
├─ <span class="t">Montanas</span> <span class="m">(MeshInstance3D)</span>
├─ <span class="t">Nieve</span> <span class="m">(GPUParticles3D)</span>
└─ <span class="t">CanvasLayer</span>
   └─ <span class="t">Menu</span> <span class="m">(Control)</span>  <span class="m">← menu.gd</span>
      └─ <span class="t">VBox</span> <span class="m">(VBoxContainer)</span>
         └─ <span class="t">BotonCampana, BotonOpciones…</span>`;

const LESSONS = [
 { id:"l1", title:"Tu primer menú plano", sub:"Nodos Control, botones y señales", xp:20, steps:[
   {type:"info", kicker:"Concepto", title:"Un menú es una escena más",
    html:`<p>En Godot todo es una <b>escena</b>: el nivel, el jugador, el tanque y también el menú. Cuando el juego arranca, Godot abre la escena principal. Si esa escena es el menú, lo primero que ve el jugador son tus botones.</p>
    <p>Para interfaces se usan nodos verdes de tipo <code class="i">Control</code>. Este es el árbol de un menú plano:</p><div class="tree">${TREE_PLANO}</div>
    <p>El <code class="i">VBoxContainer</code> acomoda los botones uno debajo del otro solo. No tenés que calcular posiciones a mano.</p>`},
   {type:"quiz", kicker:"Pregunta", q:"¿Qué tipo de nodo usás como raíz de un menú plano?",
    options:["Node3D","Control","CharacterBody3D","RigidBody3D"], answer:1,
    explain:"Los nodos Control son los de interfaz: botones, textos, barras. Node3D es para el mundo 3D."},
   {type:"info", kicker:"Señales", title:"Cómo sabe Godot que tocaste un botón",
    html:`<p>Cada <code class="i">Button</code> emite la señal <code class="i">pressed</code> cuando lo apretás. La conectás desde la pestaña <b>Nodo → Señales</b> del editor, y Godot crea una función en tu script con el nombre <code class="i">_on_boton_campana_pressed</code>.</p>
    <pre class="code">${hl(MENU_GD)}</pre>
    <ul><li><code class="i">change_scene_to_file</code> cambia a otra escena (el nivel).</li><li><code class="i">quit()</code> cierra el juego.</li><li><code class="i">grab_focus()</code> deja un botón seleccionado para usar teclado o joystick.</li></ul>`},
   {type:"fill", kicker:"Completá el código", q:"El botón Salir tiene que cerrar el juego:",
    code:`func _on_boton_salir_pressed():\n\tget_tree().____`, options:["quit()","close()","exit()","free()"], answer:0,
    explain:"get_tree().quit() termina el juego. close() y exit() no existen en SceneTree."},
   {type:"fill", kicker:"Completá el código", q:"Campaña tiene que abrir el nivel 1:",
    code:`func _on_boton_campana_pressed():\n\tget_tree().____("res://escenas/nivel_1.tscn")`,
    options:["load_scene","change_scene_to_file","open","goto"], answer:1,
    explain:"En Godot 4 se usa change_scene_to_file con la ruta res:// de la escena."},
   {type:"preview", kicker:"Probalo", title:"Así se ve tu menú plano",
    html:`<p>Pasá el mouse por las opciones y tocalas. Abajo vas a ver qué línea de GDScript se ejecutaría en Godot.</p>`, mode:"flat"}
 ]},
 { id:"l2", title:"Menú con fondo 3D en movimiento", sub:"Cámara que respira, como en los AAA", xp:30, steps:[
   {type:"info", kicker:"Concepto", title:"El truco de los menús cinematográficos",
    html:`<p>Los menús de juegos grandes muestran un paisaje 3D detrás de los botones y la cámara se mueve apenas, como si respirara. El paisaje es un nivel chico; los botones flotan encima.</p>
    <p>La clave es el nodo <code class="i">CanvasLayer</code>: todo lo que pongas adentro se dibuja <b>sobre</b> el mundo 3D y no se mueve con la cámara.</p><div class="tree">${TREE_3D}</div>`},
   {type:"quiz", kicker:"Pregunta", q:"¿Qué nodo hace que los botones queden quietos encima del mundo 3D?",
    options:["Camera3D","WorldEnvironment","CanvasLayer","SubViewport"], answer:2,
    explain:"CanvasLayer dibuja su contenido en una capa 2D aparte, encima de la escena 3D."},
   {type:"info", kicker:"Código", title:"La cámara que respira",
    html:`<p>La función <code class="i">sin()</code> devuelve un valor que va y viene entre -1 y 1. Si se lo sumás a la rotación de la cámara en cada frame, la cámara se balancea suave y sin fin.</p><pre class="code">${hl(FONDO_GD)}</pre>
    <p><code class="i">@export</code> hace que <code class="i">amplitud</code> y <code class="i">velocidad</code> aparezcan en el Inspector para ajustarlas sin tocar código.</p>`},
   {type:"fill", kicker:"Completá el código", q:"¿Qué función matemática da un movimiento de ida y vuelta?",
    code:`camara.rotation.y = rot_base.y + ____(t) * amplitud`, options:["sin","abs","randf","floor"], answer:0,
    explain:"sin(t) oscila de forma suave y continua. randf() daría saltos al azar."},
   {type:"info", kicker:"Extra", title:"Que la cámara siga al mouse",
    html:`<p>Para el efecto de profundidad, la cámara mira un poquito hacia donde está el mouse. <code class="i">lerp</code> hace que llegue de a poco, sin tirones.</p><pre class="code">${hl(PARALLAX_GD)}</pre>`},
   {type:"quiz", kicker:"Pregunta", q:"¿Qué función de Godot se ejecuta en cada frame?",
    options:["_ready()","_process(delta)","_init()","_enter_tree()"], answer:1,
    explain:"_process corre en cada frame. _ready corre una sola vez cuando el nodo entra a la escena."},
   {type:"preview", kicker:"Probalo", title:"Tu menú 3D",
    html:`<p>Mové el mouse sobre la escena: la cámara te sigue y además respira sola.</p>`, mode:"3d"}
 ]},
 { id:"l3", title:"Pantalla de opciones", sub:"Volumen, pantalla completa y volver", xp:30, steps:[
   {type:"info", kicker:"Concepto", title:"Un panel que aparece y desaparece",
    html:`<p>Opciones suele ser otro <code class="i">Control</code> dentro del mismo menú, escondido al principio. Al tocar <b>Opciones</b> lo mostrás con <code class="i">show()</code> y escondés los botones con <code class="i">hide()</code>.</p>
    <p>Para el volumen se usa un <code class="i">HSlider</code> de 0 a 1 y para pantalla completa un <code class="i">CheckButton</code>.</p><pre class="code">${hl(OPCIONES_GD)}</pre>`},
   {type:"quiz", kicker:"Pregunta", q:"¿Por qué se usa linear_to_db(valor)?",
    options:["Porque el slider da texto","Porque el volumen de Godot se mide en decibeles","Para que el juego vaya más rápido","No hace falta, es decorativo"], answer:1,
    explain:"Los buses de audio usan decibeles. linear_to_db convierte el 0 a 1 del slider a esa escala."},
   {type:"fill", kicker:"Completá el código", q:"Activar pantalla completa:",
    code:`DisplayServer.window_set_mode(DisplayServer.____)`,
    options:["FULLSCREEN_ON","WINDOW_MODE_FULLSCREEN","SCREEN_FULL","MODE_MAX"], answer:1,
    explain:"La constante correcta es DisplayServer.WINDOW_MODE_FULLSCREEN."},
   {type:"quiz", kicker:"Pregunta", q:"Tocaste Volver en Opciones. ¿Qué tiene que pasar?",
    options:["get_tree().quit()","Esconder Opciones y mostrar los botones del menú","Cambiar al nivel 1","Borrar el nodo Opciones con queue_free()"], answer:1,
    explain:"hide() en el panel y show() en los botones. Si lo borrás con queue_free(), la próxima vez no existe."},
   {type:"preview", kicker:"Probalo", title:"Opciones funcionando",
    html:`<p>Abrí <b>Opciones</b>: el volumen cambia el sonido de los clics y podés apagar el movimiento de cámara.</p>`, mode:"3d", openOptions:true}
 ]},
 { id:"l4", title:"Transición al nivel", sub:"Fundido a negro con Tween", xp:25, steps:[
   {type:"info", kicker:"Concepto", title:"Nada de cortes bruscos",
    html:`<p>Si cambiás de escena de golpe se nota feo. Lo prolijo es oscurecer la pantalla, cambiar la escena y aclarar de nuevo.</p>
    <p>Agregá un <code class="i">ColorRect</code> negro llamado <code class="i">Fundido</code> que tape todo, con transparencia en 0. Un <code class="i">Tween</code> lo anima hasta 1:</p><pre class="code">${hl(FUNDIDO_GD)}</pre>
    <p><code class="i">await</code> pausa la función hasta que el Tween termina. Sin eso, la escena cambiaría antes de que se vea el fundido.</p>`},
   {type:"fill", kicker:"Completá el código", q:"Esperar a que termine la animación:",
    code:`____ tween.finished\nget_tree().change_scene_to_file("res://escenas/nivel_1.tscn")`,
    options:["await","wait","yield","pause"], answer:0, explain:"En Godot 4 se usa await. yield era de Godot 3."},
   {type:"quiz", kicker:"Pregunta", q:"¿Qué propiedad se anima para que el ColorRect aparezca de a poco?",
    options:["position","modulate:a","size","rotation"], answer:1, explain:"modulate:a es el canal alfa (transparencia) del color del nodo."},
   {type:"preview", kicker:"Probalo", title:"Menú completo con fundido",
    html:`<p>Tocá <b>Campaña</b> y mirá la transición. Ya tenés el menú base para tu FPS.</p>`, mode:"3d"}
 ]}
];
const SOON=[
 ["Autos","VehicleBody3D: ruedas, aceleración y freno de mano."],["Aviones","Empuje, sustentación, alabeo y cabeceo."],
 ["Tanques","Orugas, torreta que gira aparte y cañón."],["Misiones","Objetivos, puntos de control y misiones con vehículos."]];

/* =================== curso GDScript desde 0 =================== */
const JUGADOR_GD = `extends CharacterBody3D

@export var velocidad := 6.0
@export var fuerza_salto := 5.0
@export var sensibilidad := 0.003
var gravedad: float = ProjectSettings.get_setting("physics/3d/default_gravity")
@onready var cabeza: Node3D = $Cabeza

func _ready():
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED

func _unhandled_input(event):
	if event is InputEventMouseMotion:
		rotate_y(-event.relative.x * sensibilidad)
		cabeza.rotate_x(-event.relative.y * sensibilidad)
		cabeza.rotation.x = clamp(cabeza.rotation.x, -1.4, 1.4)

func _physics_process(delta):
	if not is_on_floor():
		velocity.y -= gravedad * delta
	if Input.is_action_just_pressed("saltar") and is_on_floor():
		velocity.y = fuerza_salto
	var entrada := Input.get_vector("izquierda", "derecha", "adelante", "atras")
	var dir := (transform.basis * Vector3(entrada.x, 0, entrada.y)).normalized()
	velocity.x = dir.x * velocidad
	velocity.z = dir.z * velocidad
	move_and_slide()`;

const LABS={
 mover:{code:`extends MeshInstance3D

var velocidad := __v__   # metros por segundo

func _process(delta):
	position.x += velocidad * delta
	if position.x > 6:
		position.x = -6`, params:{v:{val:2,min:-10,max:10,step:0.5}}, hint:"Cambiá el número amarillo. Probá 8, 0.5 o -3."},
 rotar:{code:`extends MeshInstance3D

var velocidad_giro := __v__   # radianes por segundo (3.14 = media vuelta)

func _process(delta):
	rotate_y(velocidad_giro * delta)`, params:{v:{val:1.5,min:-12,max:12,step:0.5}}, hint:"Con 6.28 da una vuelta completa por segundo."},
 fila:{code:`extends Node3D

@export var cubo: PackedScene
var cantidad := __n__
var separacion := __s__

func _ready():
	for i in range(cantidad):
		var c = cubo.instantiate()
		c.position.x = i * separacion
		add_child(c)`, params:{n:{val:5,min:0,max:15,step:1},s:{val:1.5,min:1,max:3,step:0.25}}, hint:"El for repite el bloque una vez por cada número de range()."},
 input:{code:`extends Node3D

var velocidad := __v__

func _process(delta):
	var dir := Vector3.ZERO
	if Input.is_action_pressed("ui_right"): dir.x += 1
	if Input.is_action_pressed("ui_left"): dir.x -= 1
	if Input.is_action_pressed("ui_down"): dir.z += 1
	if Input.is_action_pressed("ui_up"): dir.z -= 1
	position += dir.normalized() * velocidad * delta`, params:{v:{val:4,min:0,max:15,step:0.5}}, keys:true, hint:"Tocá la escena y usá WASD o las flechas."},
 salto:{code:`extends CharacterBody3D

var gravedad := __g__
var fuerza_salto := __j__

func _physics_process(delta):
	if not is_on_floor():
		velocity.y -= gravedad * delta
	if Input.is_action_just_pressed("ui_accept") and is_on_floor():
		velocity.y = fuerza_salto
	move_and_slide()`, params:{g:{val:9.8,min:1,max:40,step:0.2},j:{val:5,min:1,max:20,step:0.5}}, keys:true, jump:true, hint:"Apretá Espacio para saltar. Probá gravedad 1.6, la de la Luna."}
};

const GDS=[
 {id:"g1",title:"Tu primer script",sub:"extends, print y _ready",xp:15,steps:[
  {type:"info",kicker:"Concepto",title:"¿Qué es GDScript?",html:`<p>GDScript es el lenguaje de programación de Godot. Se parece a Python: se lee casi como inglés y no lleva punto y coma.</p>
   <p style="color:var(--muted);font-size:14px">Si no sabés qué es una función o qué es _ready(), hacé primero el Nivel 0: De 0 en programación.</p>
   <p>Un script se <b>pega a un nodo</b> y le da comportamiento. Sin script, un tanque es un modelo quieto. Con script, se mueve, dispara y recibe daño.</p>
   <pre class="code">${hl(`extends Node3D\n\nfunc _ready():\n\tprint("¡Hola, soldado!")`)}</pre>
   <ul><li><code class="i">extends Node3D</code>: este script va en un nodo de tipo Node3D.</li><li><code class="i">func _ready():</code> es una función que Godot llama sola cuando el nodo aparece.</li><li><code class="i">print()</code> escribe un mensaje en el panel Salida.</li><li>La sangría (Tab) dice qué líneas están <b>adentro</b> de la función.</li></ul>`},
  {type:"run",kicker:"Ejecutalo",title:"Corré tu primer script",html:`<p>Tocá Ejecutar y mirá qué aparece en Salida.</p>`,code:`extends Node3D\n\nfunc _ready():\n\tprint("¡Hola, soldado!")\n\tprint("Godot está listo")`,out:["¡Hola, soldado!","Godot está listo"]},
  {type:"quiz",kicker:"Pregunta",q:"¿Cuándo se ejecuta _ready()?",options:["En cada frame","Una sola vez, cuando el nodo entra en la escena","Al cerrar el juego","Cada vez que apretás una tecla"],answer:1,explain:"_ready corre una vez cuando el nodo y sus hijos ya están en la escena. Para cada frame existe _process."},
  {type:"fill",kicker:"Completá el código",q:"Mostrá un mensaje en Salida:",code:`func _ready():\n\t____("Listo para la misión")`,options:["print","echo","console.log","say"],answer:0,explain:"En GDScript se usa print(). console.log es de JavaScript."},
  {type:"quiz",kicker:"¿Qué pasa?",q:"¿Qué pasa con este código?",code:`func _ready():\nprint("Hola")`,options:["Imprime Hola","Da error: a print le falta la sangría","No imprime nada, pero no da error","Imprime Hola dos veces"],answer:1,explain:"Lo que va adentro de una función tiene que tener un Tab de sangría. Sin eso Godot marca error."}
 ]},
 {id:"g2",title:"Variables y tipos",sub:"int, float, String, bool y Vector3",xp:20,steps:[
  {type:"info",kicker:"Concepto",title:"Las variables guardan datos",html:`<p>Una variable es una caja con nombre donde guardás un valor que puede cambiar: la vida, las balas, la velocidad del auto.</p>
   <pre class="code">${hl(`var vida := 100            # int: número entero\nvar velocidad := 5.5       # float: con decimales\nvar nombre := "Cabo Burro" # String: texto\nvar tiene_arma := true     # bool: verdadero o falso\nvar posicion := Vector3(0, 1, 0)  # x, y, z en 3D\nconst GRAVEDAD := 9.8      # constante: no cambia nunca`)}</pre>
   <p><code class="i">:=</code> crea la variable y Godot deduce el tipo solo. En 3D vas a usar muchísimo <code class="i">Vector3</code>: tres números para <b>x</b> (derecha), <b>y</b> (arriba) y <b>z</b> (hacia atrás).</p>`},
  {type:"run",kicker:"Ejecutalo",title:"El jugador recibe daño",html:`<p>Fijate cómo cambia la variable.</p>`,code:`var vida := 100\nvar danio := 25\n\nfunc _ready():\n\tvida -= danio\n\tprint("Vida: ", vida)\n\tprint("¿Sigue vivo? ", vida > 0)`,out:["Vida: 75","¿Sigue vivo? true"]},
  {type:"quiz",kicker:"Pregunta",q:"¿De qué tipo es el valor 5.5?",options:["int","float","String","bool"],answer:1,explain:"Los números con decimales son float. Los enteros, como 100, son int."},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué representa Vector3(0, 1, 0)?",options:["Tres armas","Un punto o dirección en 3D: 1 metro hacia arriba","Un color","Una lista de tres textos"],answer:1,explain:"Vector3 tiene x, y, z. En Godot el eje Y apunta hacia arriba."},
  {type:"fill",kicker:"Completá el código",q:"Creá una variable con 30 balas:",code:`var municion ____ 30`,options:[":=","==","=>","->"],answer:0,explain:":= crea la variable con su valor. == sirve para comparar."},
  {type:"quiz",kicker:"¿Qué imprime?",q:"¿Qué número imprime?",code:`var balas := 10\n\nfunc _ready():\n\tbalas = balas - 3\n\tbalas += 5\n\tprint(balas)`,options:["12","2","8","18"],answer:0,explain:"10 - 3 = 7, y += 5 suma 5 más: 12."}
 ]},
 {id:"g3",title:"Funciones y condiciones",sub:"func, return, if, elif y else",xp:20,steps:[
  {type:"info",kicker:"Concepto",title:"Decidir qué hacer",html:`<p>Una <b>función</b> es un bloque de código con nombre que podés llamar cuando quieras. Puede recibir datos (parámetros) y devolver un resultado con <code class="i">return</code>.</p>
   <p>Con <code class="i">if</code>, <code class="i">elif</code> y <code class="i">else</code> el código elige un camino según una condición.</p>
   <pre class="code">${hl(`func recibir_danio(cantidad: int) -> void:\n\tvida -= cantidad\n\tif vida <= 0:\n\t\tmorir()\n\telif vida < 30:\n\t\tprint("¡Vida baja!")\n\telse:\n\t\tprint("Todo bien")\n\nfunc calcular_danio(base: int, critico: bool) -> int:\n\tif critico:\n\t\treturn base * 2\n\treturn base`)}</pre>
   <p>Para comparar: <code class="i">==</code> igual, <code class="i">!=</code> distinto, <code class="i">&lt;</code> <code class="i">&gt;</code> <code class="i">&lt;=</code> <code class="i">&gt;=</code>. Para combinar: <code class="i">and</code>, <code class="i">or</code>, <code class="i">not</code>.</p>`},
  {type:"run",kicker:"Ejecutalo",title:"Combustible del auto",html:`<p>Solo se ejecuta uno de los tres caminos.</p>`,code:`func _ready():\n\tvar combustible := 15\n\tif combustible > 50:\n\t\tprint("Tanque lleno")\n\telif combustible > 10:\n\t\tprint("Queda poco combustible")\n\telse:\n\t\tprint("¡Sin combustible!")`,out:["Queda poco combustible"]},
  {type:"quiz",kicker:"¿Qué devuelve?",q:"Con la función calcular_danio de antes, ¿qué devuelve calcular_danio(20, true)?",options:["20","40","22","true"],answer:1,explain:"critico es true, así que entra al if y devuelve base * 2 = 40."},
  {type:"fill",kicker:"Completá el código",q:"Si la vida llegó a 0 o menos:",code:`if vida ____ 0:\n\tmorir()`,options:["<=","=<",":=","="],answer:0,explain:"Menor o igual se escribe <=."},
  {type:"quiz",kicker:"Pregunta",q:"¿Cuándo se abre la puerta?",code:`if tiene_llave and cerca_de_puerta:\n\tabrir_puerta()`,options:["Cuando una de las dos es true","Solo cuando las dos son true","Nunca","Siempre"],answer:1,explain:"and necesita que las dos condiciones sean verdaderas. Con or alcanzaría con una."}
 ]},
 {id:"g4",title:"Bucles y arrays",sub:"for, range, Array y append",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Listas y repeticiones",html:`<p>Un <b>Array</b> es una lista de valores. Con <code class="i">for</code> recorrés la lista o repetís algo varias veces.</p>
   <pre class="code">${hl(`var armas := ["Pistola", "Rifle", "Escopeta"]\n\nfunc _ready():\n\tarmas.append("Lanzacohetes")\n\tprint(armas.size())\n\tfor arma in armas:\n\t\tprint(arma)\n\tprint(armas[0])`)}</pre>
   <p>Los índices empiezan en <b>0</b>: <code class="i">armas[0]</code> es la primera. <code class="i">range(3)</code> da 0, 1 y 2.</p>`},
  {type:"run",kicker:"Ejecutalo",title:"Tu arsenal",html:`<p>Mirá el orden en que salen.</p>`,code:`var armas := ["Pistola", "Rifle", "Escopeta"]\n\nfunc _ready():\n\tarmas.append("Lanzacohetes")\n\tprint(armas.size())\n\tfor arma in armas:\n\t\tprint(arma)`,out:["4","Pistola","Rifle","Escopeta","Lanzacohetes"]},
  {type:"lab",kicker:"Laboratorio 3D",title:"Un for que crea cubos",html:`<p>Este script crea cubos en fila con un <code class="i">for</code>. Cambiá <b>cantidad</b> y <b>separacion</b> y mirá cómo se arma el nivel solo.</p>`,lab:"fila"},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué números da range(4)?",options:["1, 2, 3, 4","0, 1, 2, 3","0, 1, 2, 3, 4","4"],answer:1,explain:"range(4) arranca en 0 y llega hasta 3: cuatro números en total."},
  {type:"quiz",kicker:"¿Qué imprime?",q:"¿Qué imprime este código?",code:`var vehiculos := ["Auto", "Tanque", "Avión"]\nprint(vehiculos[1])`,options:["Auto","Tanque","Avión","Error"],answer:1,explain:"El índice 0 es Auto, el 1 es Tanque."}
 ]},
 {id:"g5",title:"Mover cosas en 3D",sub:"position, rotate_y, _process y delta",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Cada frame, un poquito",html:`<p>Para que algo se mueva, cambiás su <code class="i">position</code> un poquito en cada frame, dentro de <code class="i">_process(delta)</code>.</p>
   <p><code class="i">delta</code> es el tiempo que pasó desde el frame anterior (unos 0.016 segundos a 60 FPS). Si multiplicás la velocidad por delta, el auto va igual de rápido en una PC potente o en una lenta.</p>
   <pre class="code">${hl(`func _process(delta):\n\tposition.x += velocidad * delta  # avanza\n\trotate_y(giro * delta)           # gira`)}</pre>`},
  {type:"lab",kicker:"Laboratorio 3D",title:"Mover un cubo",html:`<p>El número amarillo es editable. Cambialo y mirá cómo cambia el movimiento. Abajo ves el valor de <code class="i">position.x</code> en vivo.</p>`,lab:"mover"},
  {type:"lab",kicker:"Laboratorio 3D",title:"Hacerlo girar",html:`<p>Los ángulos en código van en <b>radianes</b>: 3.14 es media vuelta y 6.28 una vuelta entera. Así gira la torreta de un tanque.</p>`,lab:"rotar"},
  {type:"quiz",kicker:"Pregunta",q:"Si velocidad = 2 y pasa 1 segundo entero, ¿cuánto avanzó?",options:["1 metro","2 metros","60 metros","120 metros"],answer:1,explain:"Sumando velocidad * delta en todos los frames de un segundo, el total es velocidad × 1 = 2 metros."},
  {type:"fill",kicker:"Completá el código",q:"Que avance igual en cualquier PC:",code:`position.x += velocidad * ____`,options:["delta","60","frame","tiempo"],answer:0,explain:"Multiplicar por delta hace el movimiento independiente de los FPS."}
 ]},
 {id:"g6",title:"Leer el teclado",sub:"Input, acciones y get_vector",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Acciones, no teclas",html:`<p>En Godot no preguntás por la tecla W. Creás <b>acciones</b> en <b>Proyecto → Configuración del proyecto → Mapa de entrada</b> (adelante, saltar, disparar) y les asignás teclas o botones del joystick.</p>
   <ul><li><code class="i">Input.is_action_pressed("disparar")</code>: true mientras la mantenés apretada.</li><li><code class="i">Input.is_action_just_pressed("saltar")</code>: true solo en el frame en que la apretás.</li><li><code class="i">Input.get_vector(...)</code>: junta 4 acciones en una dirección.</li></ul>
   <pre class="code">${hl(`func _process(delta):\n\tvar entrada := Input.get_vector("izquierda", "derecha", "adelante", "atras")\n\tvar dir := Vector3(entrada.x, 0, entrada.y)\n\tposition += dir * velocidad * delta`)}</pre>`},
  {type:"lab",kicker:"Laboratorio 3D",title:"Mové al soldado",html:`<p>Tocá la escena y usá <b>WASD</b> o las flechas (o los botones de abajo). <code class="i">ui_up</code>, <code class="i">ui_down</code> y compañía son acciones que Godot ya trae.</p>`,lab:"input"},
  {type:"quiz",kicker:"Pregunta",q:"Un rifle semiautomático dispara una bala por cada clic. ¿Qué usás?",options:["is_action_pressed","is_action_just_pressed","_ready","get_vector"],answer:1,explain:"just_pressed es true un solo frame por clic. pressed dispararía en cada frame mientras mantenés, como una ametralladora."},
  {type:"quiz",kicker:"Pregunta",q:"¿Para qué sirve dir.normalized()?",options:["Para que en diagonal no vaya más rápido","Para que el código compile","Para girar la cámara","Para que salte"],answer:0,explain:"En diagonal, dir vale (1, 0, 1), que mide 1.41. Normalizar lo deja en largo 1, así la velocidad es igual en todas direcciones."}
 ]},
 {id:"g7",title:"Nodos, $ y señales",sub:"get_node, @onready, signal y emit",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Hablar con otros nodos",html:`<p>Con <code class="i">$</code> buscás un nodo hijo por su nombre. <code class="i">$Cabeza/Camera3D</code> es la cámara que está dentro de Cabeza. Lo normal es guardarlo con <code class="i">@onready</code>, que espera a que los hijos existan.</p>
   <p>Las <b>señales</b> avisan que algo pasó. Un nodo las emite y otros las escuchan, sin conocerse entre sí.</p>
   <pre class="code">${hl(`# jugador.gd\nextends CharacterBody3D\n\nsignal murio\n\n@onready var camara: Camera3D = $Cabeza/Camera3D\nvar vida := 100\n\nfunc recibir_danio(cantidad: int):\n\tvida -= cantidad\n\tif vida <= 0:\n\t\tmurio.emit()`)}</pre>
   <pre class="code">${hl(`# nivel.gd\nfunc _ready():\n\t$Jugador.murio.connect(_on_jugador_murio)\n\nfunc _on_jugador_murio():\n\tprint("Game over")`)}</pre>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué significa $Cabeza/Camera3D?",options:["Un archivo llamado Camera3D","El nodo Camera3D que es hijo de Cabeza","Crear una cámara nueva","Dividir Cabeza por Camera3D"],answer:1,explain:"La barra separa niveles del árbol de nodos, como carpetas."},
  {type:"fill",kicker:"Completá el código",q:"Avisar que el jugador murió:",code:`if vida <= 0:\n\tmurio.____()`,options:["emit","send","call","print"],answer:0,explain:"En Godot 4 una señal se emite con nombre_senal.emit()."},
  {type:"quiz",kicker:"Pregunta",q:"¿Por qué se usa @onready con $Camera3D?",options:["Para que sea más rápido","Porque antes de _ready los nodos hijos todavía no están listos","Porque es obligatorio en todas las variables","Para que aparezca en el Inspector"],answer:1,explain:"@onready asigna la variable justo antes de _ready, cuando ya existen los hijos. Para el Inspector se usa @export."}
 ]},
 {id:"g8",title:"Física: gravedad y salto",sub:"CharacterBody3D, velocity y move_and_slide",xp:30,steps:[
  {type:"info",kicker:"Concepto",title:"El cuerpo del jugador",html:`<p>Para el jugador se usa <code class="i">CharacterBody3D</code>. Tiene una variable <code class="i">velocity</code> (un Vector3) y la función <code class="i">move_and_slide()</code>, que lo mueve con esa velocidad y lo hace deslizar contra el piso y las paredes en vez de atravesarlos.</p>
   <p>La física va en <code class="i">_physics_process(delta)</code>, que corre a ritmo fijo (60 veces por segundo) para que los choques sean estables.</p>`},
  {type:"lab",kicker:"Laboratorio 3D",title:"Gravedad y salto",html:`<p>Apretá <b>Espacio</b> o el botón Saltar. Cambiá la gravedad y la fuerza de salto. La altura máxima se calcula en vivo.</p>`,lab:"salto"},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué hace move_and_slide()?",options:["Teletransporta al jugador al origen","Mueve el cuerpo usando velocity y lo hace deslizar contra paredes y piso","Reproduce una animación","Borra al jugador"],answer:1,explain:"Usa la velocity que calculaste y resuelve los choques automáticamente."},
  {type:"fill",kicker:"Completá el código",q:"Aplicar gravedad mientras está en el aire:",code:`if not is_on_floor():\n\tvelocity.y -= gravedad * ____`,options:["delta","2","velocidad","fuerza_salto"],answer:0,explain:"Como todo lo que cambia con el tiempo, la gravedad se multiplica por delta."},
  {type:"info",kicker:"Graduación",title:"Ya podés leer un jugador FPS completo",html:`<p>Este es el script de un jugador de FPS real: camina con WASD, mira con el mouse y salta. Todo lo que tiene ya lo viste en este curso.</p><pre class="code">${hl(JUGADOR_GD)}</pre>
   <p>Lo vas a encontrar en <b>Godot interactivo</b> como <code class="i">jugador.gd</code>, con explicación línea por línea.</p>`}
 ]}
];
const CERO=[
 {id:"c1",title:"¿Qué es programar?",sub:"Instrucciones en orden y tu primer print",xp:10,steps:[
  {type:"info",kicker:"Empecemos de cero",title:"Programar es dar órdenes",html:`<p>Programar es escribir <b>órdenes</b> para que la computadora las cumpla. Cada orden se llama <b>instrucción</b> y ocupa una línea.</p>
   <p>La computadora es muy obediente, pero <b>no adivina nada</b>. Hace exactamente lo que escribiste, en el orden en que lo escribiste: <b>de arriba hacia abajo, una línea por vez</b>.</p>
   <p>Pensalo como un burro bien entrenado. Si le decís "caminá, girá, pará", hace eso. Si te olvidás de decirle "pará", sigue caminando para siempre.</p>
   <div class="flow"><div>Línea 1<small>se ejecuta primero</small></div><b>→</b><div>Línea 2<small>después</small></div><b>→</b><div>Línea 3<small>al final</small></div></div>`},
  {type:"info",kicker:"Tu primera instrucción",title:"print: mostrar un mensaje",html:`<p>La primera orden que vas a aprender es <code class="i">print</code>. Muestra un mensaje en el panel <b>Salida</b> de Godot, abajo de todo en el editor.</p>
   <pre class="code">${hl(`print("Hola, soldado")`)}</pre>
   <ul><li><code class="i">print</code> es la orden.</li><li>Entre los paréntesis va lo que querés mostrar.</li><li>Las comillas <code class="i">" "</code> marcan dónde empieza y dónde termina un texto. Las comillas no se muestran, solo lo de adentro.</li></ul>
   <p>En Salida aparece: <code class="i">Hola, soldado</code></p>`},
  {type:"trace",kicker:"Paso a paso",title:"Mirá cómo lee Godot",html:`<p>Tocá <b>Siguiente línea</b> y seguí la marca naranja. Así lee Godot: una línea, después la otra.</p><p style="color:var(--muted);font-size:14px">En un script real estas líneas van dentro de una función. Eso lo vemos en la lección 3. Por ahora fijate solo en el orden.</p>`,
   code:`print("Me despierto")\nprint("Me pongo el casco")\nprint("Salgo a la misión")`,
   steps:[{line:0,say:"Godot empieza por la primera línea. print muestra el texto que está entre comillas.",out:"Me despierto"},
     {line:1,say:"Recién cuando terminó la línea 1, pasa a la línea 2.",out:"Me pongo el casco"},
     {line:2,say:"Y después a la 3. No quedan más líneas, así que termina.",out:"Salgo a la misión"}]},
  {type:"quiz",kicker:"Pregunta",q:"Si movés print(\"Salgo a la misión\") a la primera línea, ¿qué pasa?",options:["Godot lo acomoda solo en el orden correcto","Se muestra primero \"Salgo a la misión\", porque ahora está arriba","Da error","No se muestra nada"],answer:1,explain:"Godot no entiende la historia, solo sigue el orden de las líneas. Si está primero, se ejecuta primero."},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué aparece en Salida con print(\"Vida: 100\")?",options:["Vida: 100","\"Vida: 100\" con las comillas","print","Nada"],answer:0,explain:"Las comillas solo marcan dónde empieza y termina el texto. No se muestran."},
  {type:"fill",kicker:"Completá",q:"Escribí la orden que muestra un mensaje:",code:`____("Hola, soldado")`,options:["print","mostrar","decir","Print"],answer:0,explain:"La orden es print, en minúsculas. Godot distingue mayúsculas: Print con P grande no existe."}
 ]},
 {id:"c2",title:"Nodos y scripts",sub:"Las piezas del juego y su libreta de órdenes",xp:10,steps:[
  {type:"info",kicker:"Concepto",title:"Un juego hecho de piezas",html:`<p>En Godot el juego se arma con <b>nodos</b>, como piezas de Lego. Hay un nodo para la cámara, otro para la luz, otro para un botón, otro para el jugador.</p>
   <p>Cada nodo ya sabe hacer <b>una cosa</b>: la cámara muestra lo que ve, la luz ilumina, el botón se puede apretar. Pero no sabe qué hacer en <b>tu</b> juego. La cámara no sabe que tiene que seguir al tanque.</p>
   <p>Para eso existe el <b>script</b>: un archivo de texto con instrucciones que le pegás a un nodo. Es su libreta de órdenes.</p>
   <div class="flow"><div>Nodo<small>la pieza: un tanque quieto</small></div><b>+</b><div>Script<small>tanque.gd, las órdenes</small></div><b>=</b><div class="hot">Tanque que se mueve y dispara<small>el nodo hace lo que dice el script</small></div></div>`},
  {type:"info",kicker:"La primera línea",title:"extends: ¿para qué nodo es?",html:`<p>Casi todos los scripts empiezan con una línea así:</p><pre class="code">${hl(`extends Node3D`)}</pre>
   <p>Quiere decir: <b>"este script es para un nodo de tipo Node3D"</b>. Es como escribir en la tapa de la libreta "para el tanque". El script puede usar todo lo que ese tipo de nodo ya sabe hacer.</p>
   <p>Si es para una cámara dice <code class="i">extends Camera3D</code>. Si es para un botón, <code class="i">extends Button</code>.</p>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué es un script?",options:["Un nodo nuevo","Un archivo con instrucciones que le da comportamiento a un nodo","Una imagen del juego","Un sonido"],answer:1,explain:"El script es la libreta de órdenes. Se pega a un nodo y le dice qué hacer."},
  {type:"quiz",kicker:"Pregunta",q:"Un script empieza con extends Camera3D. ¿Qué significa?",options:["Que crea 3 cámaras","Que el script es para un nodo de tipo Camera3D","Que extiende el juego a 3D","Que borra la cámara"],answer:1,explain:"extends dice para qué tipo de nodo es el script."},
  {type:"quiz",kicker:"Pregunta",q:"Ponés una luz en tu nivel y no le pegás ningún script. ¿Qué hace?",options:["Nada, ni siquiera ilumina","Ilumina, porque eso ya lo sabe hacer, pero nada especial de tu juego","Da error","Se mueve sola"],answer:1,explain:"Cada nodo ya sabe hacer lo suyo. El script agrega lo que vos quieras, por ejemplo que la luz parpadee."}
 ]},
 {id:"c3",title:"¿Qué es una función?",sub:"Recetas con nombre: definir y llamar",xp:15,steps:[
  {type:"info",kicker:"Concepto",title:"Una función es una receta",html:`<p>Una <b>función</b> es un grupo de instrucciones al que le ponés un <b>nombre</b>.</p>
   <p>Pensala como una receta de cocina. La receta tiene un nombre ("Milanesa") y una lista de pasos. <b>Escribir la receta no cocina nada.</b> Recién cuando alguien dice "hacé una milanesa", se siguen los pasos. Y la podés usar todas las veces que quieras sin volver a escribirla.</p>
   <div class="recipe"><div><h4>1. Definir (escribir la receta)</h4><p>Le decís a Godot qué pasos tiene. Todavía no pasa nada.</p><pre class="code">${hl(`func saludar():\n\tprint("Hola")\n\tprint("Bienvenido")`)}</pre></div>
   <div><h4>2. Llamar (usar la receta)</h4><p>Escribís el nombre con paréntesis. Ahí se ejecutan los pasos.</p><pre class="code">${hl(`saludar()`)}</pre></div></div>`},
  {type:"info",kicker:"Las partes",title:"Cada símbolo tiene su trabajo",html:`<pre class="code">${hl(`func saludar():\n\tprint("Hola")\n\tprint("Bienvenido")`)}</pre>
   <ul class="anat">
    <li><code>func</code><span>Avisa: "acá empieza una función". Viene de <i>function</i>, función en inglés.</span></li>
    <li><code>saludar</code><span>El nombre. Lo elegís vos. Sin espacios ni tildes: si son dos palabras se unen con guion bajo, como <code class="i">recibir_danio</code>.</span></li>
    <li><code>( )</code><span>Los paréntesis son el lugar para pasarle datos a la función. Vacíos quiere decir que no necesita ninguno. Siempre van, aunque estén vacíos.</span></li>
    <li><code>:</code><span>Los dos puntos dicen "ahora vienen los pasos".</span></li>
    <li><code>Tab</code><span>La sangría: las líneas corridas a la derecha son los pasos de la función. Cuando una línea vuelve al borde izquierdo, la función terminó.</span></li>
   </ul>`},
  {type:"trace",kicker:"Paso a paso",title:"Seguí el salto",html:`<p>Mirá cómo el programa <b>salta</b> a la receta cuando la llamás y después <b>vuelve</b> a donde estaba.</p>`,
   code:`func saludar():\n\tprint("Hola")\n\tprint("Bienvenido al cuartel")\n\nfunc _ready():\n\tsaludar()\n\tprint("---")\n\tsaludar()`,
   steps:[{line:0,say:"Godot lee la receta saludar y la guarda en memoria. ¡Todavía no ejecuta los print de adentro!"},
     {line:4,say:"El juego arranca acá, en _ready. Quién la llama lo vemos en la próxima lección. Entramos a sus pasos."},
     {line:5,say:"saludar() con paréntesis significa \"usá la receta saludar\". El programa salta a la línea 1."},
     {line:1,say:"Primer paso de la receta.",out:"Hola"},
     {line:2,say:"Segundo paso. La receta no tiene más pasos.",out:"Bienvenido al cuartel"},
     {line:5,say:"saludar terminó. El programa vuelve a la línea que la llamó y sigue con la de abajo."},
     {line:6,say:"Una instrucción normal.",out:"---"},
     {line:7,say:"Otra vez saludar(). Usamos la misma receta sin volver a escribirla."},
     {line:1,say:"Primer paso, de nuevo.",out:"Hola"},
     {line:2,say:"Segundo paso, de nuevo.",out:"Bienvenido al cuartel"},
     {line:7,say:"Terminó. Escribiste la receta una sola vez y la usaste dos."}]},
  {type:"quiz",kicker:"Pregunta",q:"Escribís func recargar(): con sus pasos, pero nunca escribís recargar() en ningún lado. ¿Qué pasa?",options:["Se ejecuta sola al empezar","No pasa nada: la receta existe, pero nadie la usa","Se ejecuta dos veces","Da error"],answer:1,explain:"Definir una función solo escribe la receta. Para que se ejecute, alguien la tiene que llamar con recargar()."},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué líneas son parte de la función disparar?",code:`func disparar():\n\tprint("¡Bang!")\n\tprint("Bala -1")\n\nfunc recargar():\n\tprint("Recargando")`,options:["Solo print(\"¡Bang!\")","Los dos print corridos a la derecha debajo de disparar","Los tres print","Ninguna"],answer:1,explain:"Los pasos de una función son las líneas con sangría debajo de ella. func recargar vuelve al borde, así que empieza otra función."},
  {type:"fill",kicker:"Completá",q:"Definí (escribí) la función recargar:",code:`____ recargar():\n\tprint("Recargando")`,options:["func","function","def","receta"],answer:0,explain:"En GDScript se usa func. def es de Python y function de JavaScript."},
  {type:"fill",kicker:"Completá",q:"Ahora llamá (usá) la función recargar:",code:`func _ready():\n\t____`,options:["recargar()","func recargar","recargar","\"recargar\""],answer:0,explain:"Para llamar una función escribís su nombre con paréntesis. Sin paréntesis, Godot no la ejecuta."}
 ]},
 {id:"c4",title:"¿Qué es _ready()?",sub:"Las funciones que Godot llama solo",xp:15,steps:[
  {type:"info",kicker:"La gran pregunta",title:"¿Quién llama a la primera función?",html:`<p>Ya sabés que una función no hace nada hasta que alguien la llama. Pero entonces, ¿quién llama a la primera?</p>
   <p><b>Godot.</b> Hay funciones con nombres especiales que Godot llama <b>automáticamente</b> en momentos importantes del juego. Se reconocen porque empiezan con guion bajo: <code class="i">_ready</code>, <code class="i">_process</code>, <code class="i">_input</code>.</p>
   <p>Vos solo las definís. Nunca escribís <code class="i">_ready()</code> para llamarla: Godot lo hace por vos.</p>
   <div class="flow"><div>Tocás ▶ Ejecutar</div><b>→</b><div>Godot crea los nodos<small>la cámara, el tanque, el menú…</small></div><b>→</b><div class="hot">Llama a _ready()<small>de cada nodo, UNA sola vez</small></div><b>→</b><div>Llama a _process()<small>en cada frame, unas 60 veces por segundo, hasta que cerrás</small></div></div>`},
  {type:"info",kicker:"Qué significa",title:"ready = listo",html:`<p><i>Ready</i> en inglés significa <b>listo</b>. Godot llama a <code class="i">_ready()</code> cuando el nodo ya está listo, metido en el juego.</p>
   <p>Pensalo como un soldado que llega al cuartel. Al llegar hace su rutina una sola vez: deja la mochila, se pone el uniforme, se presenta. Eso es <code class="i">_ready()</code>.</p>
   <p>Después hace guardia todo el día, mirando alrededor sin parar. Eso es <code class="i">_process()</code>, que vas a ver en el Nivel 1.</p>
   <p><b>¿Para qué se usa _ready?</b> Para preparar todo al empezar: darle la vida inicial al jugador, mostrar el menú, arrancar la música, seleccionar el primer botón.</p>
   <pre class="code">${hl(`extends Node3D\n\nfunc _ready():\n\tprint("El tanque llegó al campo")`)}</pre>`},
  {type:"trace",kicker:"Paso a paso",title:"_ready se llama sola, disparar no",html:`<p>Fijate qué funciones se ejecutan y cuáles no.</p>`,
   code:`extends Node3D\n\nfunc _ready():\n\tprint("El tanque llegó al campo")\n\tprint("Motor encendido")\n\nfunc disparar():\n\tprint("¡Bang!")`,
   steps:[{line:0,say:"extends dice que este script es para un nodo Node3D. No ejecuta nada."},
     {line:2,say:"Apretaste ▶. Godot creó el nodo, y como está listo, llama a _ready() solo. Nadie escribió _ready() en ningún lado."},
     {line:3,say:"Primer paso de _ready.",out:"El tanque llegó al campo"},
     {line:4,say:"Segundo paso.",out:"Motor encendido"},
     {line:6,say:"_ready terminó. ¿Y disparar? Es una función tuya y nadie la llamó, así que nunca se ejecuta. Por eso no aparece ¡Bang! en Salida."}]},
  {type:"quiz",kicker:"Pregunta",q:"¿Quién llama a _ready()?",options:["Vos, escribiendo _ready() en otra parte","Godot, automáticamente, cuando el nodo está listo","El jugador al apretar una tecla","Nadie, no se ejecuta"],answer:1,explain:"Las funciones que empiezan con guion bajo, como _ready, las llama Godot solo."},
  {type:"quiz",kicker:"Pregunta",q:"¿Cuántas veces se ejecuta _ready() en un nodo?",options:["Una sola vez","60 veces por segundo","Cada vez que movés el mouse","Nunca"],answer:0,explain:"_ready corre una vez, cuando el nodo entra al juego. Lo que se repite todo el tiempo va en _process."},
  {type:"quiz",kicker:"Pregunta",q:"Querés que la música del menú empiece apenas se abre el juego. ¿Dónde ponés esa orden?",options:["Dentro de _ready()","En una función que nadie llama","Fuera de todas las funciones","En el nombre del archivo"],answer:0,explain:"Lo que tiene que pasar una vez al empezar va en _ready."},
  {type:"quiz",kicker:"Pregunta",q:"La cámara tiene que moverse todo el tiempo mientras el menú está abierto. ¿Alcanza con _ready()?",options:["Sí, _ready se repite siempre","No, _ready se ejecuta una sola vez. Para algo continuo se usa _process()","Sí, si escribís _ready() dos veces","No se puede mover una cámara con código"],answer:1,explain:"_ready es la rutina de llegada. Lo continuo va en _process, que corre en cada frame."}
 ]},
 {id:"c5",title:"Variables: cajas con nombre",sub:"Guardar datos y cambiarlos",xp:15,steps:[
  {type:"info",kicker:"Concepto",title:"Una variable es una caja",html:`<p>Un juego necesita recordar cosas: cuánta vida tenés, cuántas balas quedan, cuánta nafta tiene el auto. Para eso están las <b>variables</b>.</p>
   <p>Una variable es una <b>caja con una etiqueta</b>. La etiqueta es el nombre y adentro guardás un valor.</p>
   <pre class="code">${hl(`var balas = 10`)}</pre>
   <div><span class="box3"><span>balas</span><b>10</b></span></div>
   <ul class="anat"><li><code>var</code><span>"Creá una caja nueva". Viene de <i>variable</i>.</span></li><li><code>balas</code><span>La etiqueta de la caja. La elegís vos.</span></li><li><code>=</code><span>"Guardá adentro lo que está a la derecha". No es igual de matemática: es guardar.</span></li><li><code>10</code><span>El valor que queda adentro.</span></li></ul>`},
  {type:"info",kicker:"Concepto",title:"Cambiar y usar la caja",html:`<p>Para <b>cambiar</b> lo que hay adentro, escribís el nombre, el igual y el valor nuevo. Ya no va <code class="i">var</code>, porque la caja ya existe:</p>
   <pre class="code">${hl(`balas = 9`)}</pre>
   <p>Para <b>usar</b> lo que hay adentro, escribís el nombre <b>sin comillas</b>:</p>
   <pre class="code">${hl(`print(balas)    # muestra 9, lo que hay en la caja\nprint("balas")  # muestra la palabra balas`)}</pre>
   <p>Las cajas pueden guardar números (<code class="i">10</code>, <code class="i">5.5</code>), texto entre comillas (<code class="i">"Cabo Burro"</code>) o verdadero y falso (<code class="i">true</code>, <code class="i">false</code>).</p>
   <p style="color:var(--muted);font-size:14px">Lo que va después de # es un comentario: una nota para vos. Godot lo ignora.</p>`},
  {type:"trace",kicker:"Paso a paso",title:"Mirá cómo cambia la caja",html:`<p>Además de Salida, ahora vas a ver la caja <b>balas</b> y su contenido.</p>`,
   code:`var balas = 10\n\nfunc _ready():\n\tprint(balas)\n\tbalas = balas - 1\n\tprint(balas)\n\tprint("balas")`,
   steps:[{line:0,say:"Se crea la caja balas y se guarda un 10 adentro.",vars:{balas:"10"}},
     {line:2,say:"Godot llama a _ready, como siempre al empezar."},
     {line:3,say:"balas sin comillas: Godot abre la caja y muestra lo que hay.",out:"10"},
     {line:4,say:"Primero calcula lo de la derecha: balas - 1 es 10 - 1 = 9. Después guarda el 9 en la caja. El 10 se reemplaza.",vars:{balas:"9"}},
     {line:5,say:"Ahora la caja tiene 9.",out:"9"},
     {line:6,say:"Con comillas es texto: muestra la palabra, no abre la caja.",out:"balas"}]},
  {type:"quiz",kicker:"Pregunta",q:"Si vida tiene 100 adentro, ¿qué muestra print(vida)?",options:["vida","100","\"vida\"","Nada"],answer:1,explain:"Sin comillas, Godot muestra lo que hay en la caja. Con comillas mostraría la palabra vida."},
  {type:"quiz",kicker:"¿Qué muestra?",q:"¿Qué número aparece en Salida?",code:`var x = 5\n\nfunc _ready():\n\tx = x + 3\n\tprint(x)`,options:["5","3","8","x"],answer:2,explain:"x + 3 es 5 + 3 = 8, y ese 8 se guarda en la caja x."},
  {type:"fill",kicker:"Completá",q:"Creá una caja municion con 30 adentro:",code:`____ municion = 30`,options:["var","caja","func","print"],answer:0,explain:"var crea una variable nueva."}
 ]},
 {id:"c6",title:"Errores comunes",sub:"Cómo leer lo que Godot te marca",xp:15,steps:[
  {type:"info",kicker:"Tranquilo",title:"Todos nos equivocamos",html:`<p>Hasta los programadores con años de experiencia escriben errores todos los días. Godot te avisa: subraya la línea en rojo y abajo explica qué pasa.</p>
   <p>Los errores más comunes al empezar son:</p>
   <ul class="anat">
    <li><code>:</code><span>Te olvidaste los dos puntos al final de <code class="i">func nombre()</code>.</span></li>
    <li><code>Tab</code><span>Los pasos de la función no tienen sangría, o tienen de más.</span></li>
    <li><code>" "</code><span>Abriste comillas y no las cerraste.</span></li>
    <li><code>Aa</code><span>Una mayúscula de más: <code class="i">Print</code> no es lo mismo que <code class="i">print</code>.</span></li>
    <li><code>( )</code><span>Abriste un paréntesis y no lo cerraste.</span></li>
    <li><code>?</code><span>Llamaste a una función que no existe o tiene el nombre mal escrito.</span></li>
   </ul>`},
  {type:"quiz",kicker:"Encontrá el error",q:"¿Qué está mal?",code:`func _ready()\n\tprint("Hola")`,options:["Faltan los dos puntos después de _ready()","print va con mayúscula","Sobran los paréntesis","No hay error"],answer:0,explain:"Después de func _ready() van los dos puntos. Sin ellos Godot no sabe que empiezan los pasos."},
  {type:"quiz",kicker:"Encontrá el error",q:"¿Qué está mal?",code:`func _ready():\n\tPrint("Hola")`,options:["Falta la sangría","Print está con mayúscula y no existe","Las comillas están mal","No hay error"],answer:1,explain:"Godot distingue mayúsculas y minúsculas. La orden es print, todo en minúscula."},
  {type:"quiz",kicker:"Encontrá el error",q:"¿Qué está mal?",code:`func _ready():\n\tprint("Hola)`,options:["Falta cerrar las comillas","Falta el punto y coma","print no lleva paréntesis","No hay error"],answer:0,explain:"Las comillas se abren antes de Hola y se tienen que cerrar después: \"Hola\". GDScript no usa punto y coma."},
  {type:"quiz",kicker:"Encontrá el error",q:"Este es todo el script. ¿Qué pasa?",code:`func _ready():\n\tsaludar()`,options:["Muestra Hola","Error: la función saludar no existe, nunca se definió","No pasa nada","Godot la crea sola"],answer:1,explain:"Para llamar a saludar() primero hay que definirla con func saludar(): y sus pasos."},
  {type:"info",kicker:"¡Nivel 0 completo!",title:"Ya sabés lo más básico",html:`<p>Repasemos lo que aprendiste:</p>
   <ul><li>Un programa son <b>instrucciones</b> que se ejecutan de arriba hacia abajo.</li><li><code class="i">print</code> muestra mensajes en Salida.</li><li>El juego se arma con <b>nodos</b> y los <b>scripts</b> les dan órdenes. <code class="i">extends</code> dice para qué nodo es el script.</li>
   <li>Una <b>función</b> es una receta con nombre: primero se <b>define</b> con <code class="i">func</code> y después se <b>llama</b> con su nombre y paréntesis.</li><li><code class="i">_ready()</code> es una función que Godot llama solo, una vez, cuando el nodo está listo.</li><li>Una <b>variable</b> es una caja con nombre para guardar datos.</li></ul>
   <p>Ya podés seguir con el <b>Nivel 1</b>, donde todo esto se usa para mover cosas en 3D.</p>`}
 ]}
];
/* =================== curso FPS 3D · Unidad 2: el jugador =================== */
const TREE_JUGADOR = `<span class="t">Jugador</span> <span class="m">(CharacterBody3D)</span>  <span class="m">← jugador.gd</span>
├─ <span class="t">CollisionShape3D</span> <span class="m">(forma: cápsula de 1.8 m)</span>
├─ <span class="t">Cuerpo</span> <span class="m">(MeshInstance3D, opcional)</span>
└─ <span class="t">Cabeza</span> <span class="m">(Node3D, a 1.6 m de altura)</span>
   └─ <span class="t">Camera3D</span>`;

const JUGADOR_COMPLETO_GD = `extends CharacterBody3D

@export var velocidad := 6.0
@export var velocidad_correr := 10.0
@export var fuerza_salto := 5.0
@export var sensibilidad := 0.003
var gravedad: float = ProjectSettings.get_setting("physics/3d/default_gravity")
@onready var cabeza: Node3D = $Cabeza

func _ready():
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED

func _unhandled_input(event):
	if event is InputEventMouseMotion and Input.mouse_mode == Input.MOUSE_MODE_CAPTURED:
		rotate_y(-event.relative.x * sensibilidad)
		cabeza.rotate_x(-event.relative.y * sensibilidad)
		cabeza.rotation.x = clamp(cabeza.rotation.x, -1.4, 1.4)
	if event.is_action_pressed("ui_cancel"):
		Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
	if event is InputEventMouseButton and event.pressed:
		Input.mouse_mode = Input.MOUSE_MODE_CAPTURED

func _physics_process(delta):
	if not is_on_floor():
		velocity.y -= gravedad * delta
	if Input.is_action_just_pressed("saltar") and is_on_floor():
		velocity.y = fuerza_salto

	var vel_actual := velocidad
	if Input.is_action_pressed("correr"):
		vel_actual = velocidad_correr
	if Input.is_action_pressed("agacharse"):
		vel_actual = velocidad * 0.5
		cabeza.position.y = lerp(cabeza.position.y, 0.9, delta * 10)
	else:
		cabeza.position.y = lerp(cabeza.position.y, 1.6, delta * 10)

	var entrada := Input.get_vector("izquierda", "derecha", "adelante", "atras")
	var dir := (transform.basis * Vector3(entrada.x, 0, entrada.y)).normalized()
	velocity.x = dir.x * vel_actual
	velocity.z = dir.z * vel_actual
	move_and_slide()`;

Object.assign(LABS,{
 mirar:{code:`extends CharacterBody3D

@export var sensibilidad := __s__
@onready var cabeza: Node3D = $Cabeza

func _ready():
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED

func _unhandled_input(event):
	if event is InputEventMouseMotion:
		rotate_y(-event.relative.x * sensibilidad)
		cabeza.rotate_x(-event.relative.y * sensibilidad)
		cabeza.rotation.x = clamp(cabeza.rotation.x, -__l__, __l__)`,
  params:{s:{val:0.003,min:0.0005,max:0.02,step:0.0005},l:{val:1.4,min:0.2,max:1.57,step:0.1}},fp:true,move:false,
  hint:"Arrastrá con el mouse (o el dedo) sobre la escena para mirar."},
 caminar:{code:`extends CharacterBody3D

@export var velocidad := __v__

func _physics_process(delta):
	var entrada := Input.get_vector("izquierda", "derecha", "adelante", "atras")
	var dir := (transform.basis * Vector3(entrada.x, 0, entrada.y)).normalized()
	velocity.x = dir.x * velocidad
	velocity.z = dir.z * velocidad
	move_and_slide()`,
  params:{v:{val:6,min:0,max:20,step:0.5}},fp:true,move:true,keys:true,pad:[["KeyW","W ↑"],["KeyA","A ←"],["KeyS","S ↓"],["KeyD","D →"]],
  hint:"WASD para caminar. Arrastrá para girar: adelante siempre es hacia donde mirás."},
 fps:{code:`@export var velocidad := __v__
@export var velocidad_correr := __c__
@export var fuerza_salto := __j__

func _physics_process(delta):
	if not is_on_floor():
		velocity.y -= gravedad * delta
	if Input.is_action_just_pressed("saltar") and is_on_floor():
		velocity.y = fuerza_salto
	var vel_actual := velocidad
	if Input.is_action_pressed("correr"):
		vel_actual = velocidad_correr
	if Input.is_action_pressed("agacharse"):
		vel_actual = velocidad * 0.5
		cabeza.position.y = lerp(cabeza.position.y, 0.9, delta * 10)
	else:
		cabeza.position.y = lerp(cabeza.position.y, 1.6, delta * 10)
	# ... dirección y move_and_slide() como antes`,
  params:{v:{val:6,min:0,max:20,step:0.5},c:{val:10,min:0,max:30,step:0.5},j:{val:5,min:0,max:15,step:0.5}},fp:true,move:true,full:true,keys:true,
  pad:[["KeyW","W ↑"],["KeyA","A ←"],["KeyS","S ↓"],["KeyD","D →"],["Space","Saltar"],["ShiftLeft","Correr"],["KeyC","Agacharse"]],
  hint:"WASD caminar · Espacio saltar · Shift correr · C agacharse · arrastrá para mirar. Subite a las cajas."}
});

function buildFPLab(def,p,readout){
  const T=THREE,scene=new T.Scene();const sky=0x9fb6cc;scene.background=new T.Color(sky);scene.fog=new T.Fog(sky,18,60);
  const cam=new T.PerspectiveCamera(70,16/9,.05,200);cam.rotation.order="YXZ";
  scene.add(new T.HemisphereLight(0xffffff,0x556677,.9));const dl=new T.DirectionalLight(0xffffff,.7);dl.position.set(-8,14,6);scene.add(dl);
  const floor=new T.Mesh(new T.PlaneGeometry(60,60),new T.MeshStandardMaterial({color:0x6d7a5c,roughness:1}));floor.rotation.x=-Math.PI/2;scene.add(floor);
  const grid=new T.GridHelper(40,40,0x55613f,0x5d6a4c);grid.position.y=.01;scene.add(grid);
  const wallM=new T.MeshStandardMaterial({color:0x8a8f96,flatShading:true});
  [[0,-20,40,.5],[0,20,40,.5],[-20,0,.5,40],[20,0,.5,40]].forEach(([x,z,w,d])=>{const m=new T.Mesh(new T.BoxGeometry(w,2.5,d),wallM);m.position.set(x,1.25,z);scene.add(m)});
  const crateM=new T.MeshStandardMaterial({color:0xb07a3e,flatShading:true}),edge=new T.MeshStandardMaterial({color:0x6e4a22});
  const CR=[[3,-6,1,1],[5,-6,1,1],[4,-8,1.2,2.2],[-5,-4,1.5,.8],[-6,-9,1,1.8],[0,-13,2,1.2],[8,2,1,1],[-9,4,1.2,1.4]];
  CR.forEach(([x,z,s,h])=>{const m=new T.Mesh(new T.BoxGeometry(s*2,h,s*2),crateM);m.position.set(x,h/2,z);scene.add(m);
    const t=new T.Mesh(new T.BoxGeometry(s*2+.04,.08,s*2+.04),edge);t.position.set(x,h,z);scene.add(t)});
  const tgt=new T.Mesh(new T.CylinderGeometry(.6,.6,.1,24),new T.MeshStandardMaterial({color:0xe85a50}));tgt.rotation.x=Math.PI/2;tgt.position.set(0,1.6,-19.6);scene.add(tgt);
  const pl={x:0,z:2,y:0,vy:0,yaw:0,pitch:0,head:1.6};
  const lab={scene,cam,keys:!!def.keys,rebuild(){},tick(){}};
  let drag=null;
  lab.bind=el=>{el.style.touchAction="none";el.style.cursor="grab";
    el.addEventListener("pointerdown",e=>{drag={x:e.clientX,y:e.clientY};try{el.setPointerCapture(e.pointerId)}catch(_){}});
    el.addEventListener("pointermove",e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag={x:e.clientX,y:e.clientY};
      pl.yaw-=dx*p.s_eff();pl.pitch-=dy*p.s_eff();const L=p.l??1.4;pl.pitch=Math.max(-L,Math.min(L,pl.pitch))});
    ["pointerup","pointercancel"].forEach(ev=>el.addEventListener(ev,()=>drag=null))};
  p.s_eff=()=>p.s??0.003;
  const R=.4,G=9.8;
  lab.tick=dt=>{
    let vel=p.v??0,crouch=false;
    if(def.full){if(KEYS.has("ShiftLeft")||KEYS.has("ShiftRight"))vel=p.c;if(KEYS.has("KeyC")){vel=p.v*.5;crouch=true}}
    let ix=0,iz=0;
    if(def.move){if(KEYS.has("KeyD")||KEYS.has("ArrowRight"))ix+=1;if(KEYS.has("KeyA")||KEYS.has("ArrowLeft"))ix-=1;if(KEYS.has("KeyS")||KEYS.has("ArrowDown"))iz+=1;if(KEYS.has("KeyW")||KEYS.has("ArrowUp"))iz-=1}
    const len=Math.hypot(ix,iz)||1;ix/=len;iz/=len;
    const c=Math.cos(pl.yaw),s=Math.sin(pl.yaw),dx=ix*c+iz*s,dz=-ix*s+iz*c;
    pl.x+=dx*vel*dt;pl.z+=dz*vel*dt;
    // suelo bajo los pies y choque con cajas
    let ground=0;
    CR.forEach(([bx,bz,hs,h])=>{const inX=Math.abs(pl.x-bx)<hs+R,inZ=Math.abs(pl.z-bz)<hs+R;if(!inX||!inZ)return;
      if(pl.y>=h-.35){if(Math.abs(pl.x-bx)<hs+R*.5&&Math.abs(pl.z-bz)<hs+R*.5)ground=Math.max(ground,h);return}
      const ox=hs+R-Math.abs(pl.x-bx),oz=hs+R-Math.abs(pl.z-bz);
      if(ox<oz)pl.x+=Math.sign(pl.x-bx||1)*ox;else pl.z+=Math.sign(pl.z-bz||1)*oz});
    pl.x=Math.max(-19.3,Math.min(19.3,pl.x));pl.z=Math.max(-19.3,Math.min(19.3,pl.z));
    let onFloor=pl.y<=ground+.001;
    if(def.full){if(!onFloor)pl.vy-=G*dt;if(jumpQ&&onFloor)pl.vy=p.j;jumpQ=false;
      pl.y+=pl.vy*dt;if(pl.y<=ground){pl.y=ground;if(pl.vy<0)pl.vy=0}onFloor=pl.y<=ground+.001}
    else{pl.y=ground;jumpQ=false}
    const target=crouch?.9:1.6;pl.head+=(target-pl.head)*Math.min(1,dt*10);
    cam.position.set(pl.x,pl.y+pl.head,pl.z);cam.rotation.y=pl.yaw;cam.rotation.x=pl.pitch;
    const deg=v=>(v*180/Math.PI).toFixed(0)+"°";
    if(!def.move)readout(`rotation.y (cuerpo) = ${deg(pl.yaw)}\ncabeza.rotation.x = ${deg(pl.pitch)}   (límite ±${deg(p.l)})`);
    else if(!def.full)readout(`entrada = (${ix.toFixed(2)}, ${iz.toFixed(2)})   rotation.y = ${deg(pl.yaw)}\ndir = (${dx.toFixed(2)}, 0, ${dz.toFixed(2)})   velocity = (${(dx*vel).toFixed(1)}, 0, ${(dz*vel).toFixed(1)})`);
    else readout(`vel_actual = ${vel.toFixed(1)}${crouch?"  (agachado)":vel===p.c&&vel!==p.v?"  (corriendo)":""}\nvelocity.y = ${pl.vy.toFixed(2)}   is_on_floor() = ${onFloor}\ncabeza.position.y = ${pl.head.toFixed(2)}   altura del salto ≈ ${(p.j*p.j/(2*G)).toFixed(2)} m`);
  };
  return lab;
}

const FPS2=[
 {id:"f1",title:"La escena del jugador",sub:"CharacterBody3D, colisión, cabeza y cámara",xp:20,steps:[
  {type:"info",kicker:"Concepto",title:"El jugador es una escena propia",html:`<p>En un FPS no ves al jugador: <b>sos</b> el jugador. Lo que ves es lo que ve su cámara. Igual, el jugador es una escena aparte (<code class="i">jugador.tscn</code>) que después metés en cada nivel.</p>
   <div class="tree">${TREE_JUGADOR}</div>
   <ul><li><b>CharacterBody3D</b>: el cuerpo. Lo movés con código y choca contra paredes y el piso.</li>
   <li><b>CollisionShape3D</b>: la forma con la que choca. Se usa una <b>cápsula</b> porque no se traba en los escalones ni en las esquinas.</li>
   <li><b>Cabeza</b>: un Node3D vacío a la altura de los ojos. Sirve para mirar arriba y abajo sin inclinar todo el cuerpo.</li>
   <li><b>Camera3D</b>: los ojos. Va adentro de Cabeza, así la sigue a todos lados.</li></ul>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Por qué la cámara va dentro de un nodo Cabeza y no directo en el cuerpo?",options:["Porque Godot no deja poner cámaras en un CharacterBody3D","Para que el cuerpo gire a los costados y solo la cabeza mire arriba y abajo","Para que la cámara se vea más grande","Es solo decoración"],answer:1,explain:"Si el cuerpo entero se inclinara para mirar arriba, el jugador se tumbaría. Separándolos, el cuerpo gira en Y y la cabeza en X."},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué forma de colisión conviene para el jugador?",options:["Una caja","Una cápsula","Una esfera chiquita","Ninguna, no hace falta"],answer:1,explain:"La cápsula es redondeada abajo y se desliza sobre escalones y bordes. Sin forma de colisión, el jugador atravesaría todo."},
  {type:"fill",kicker:"Completá",q:"El primer renglón de jugador.gd:",code:`extends ____`,options:["CharacterBody3D","RigidBody3D","Camera3D","Control"],answer:0,explain:"El script va en el nodo raíz, que es un CharacterBody3D. RigidBody3D se mueve solo por física y es difícil de controlar con precisión."}
 ]},
 {id:"f2",title:"El Mapa de entrada",sub:"Acciones: adelante, saltar, correr…",xp:20,steps:[
  {type:"info",kicker:"Concepto",title:"Nombres de acciones, no teclas",html:`<p>Antes de programar el movimiento, definí las <b>acciones</b> del juego en <b>Proyecto → Configuración del proyecto → Mapa de entrada</b>. Escribís el nombre, tocás <b>Añadir</b> y después el <b>+</b> para asignarle teclas o botones del joystick.</p>
   <div class="tree"><span class="t">adelante</span>   <span class="m">W · stick izquierdo arriba</span>
<span class="t">atras</span>      <span class="m">S · stick izquierdo abajo</span>
<span class="t">izquierda</span>  <span class="m">A · stick izquierdo a la izquierda</span>
<span class="t">derecha</span>    <span class="m">D · stick izquierdo a la derecha</span>
<span class="t">saltar</span>     <span class="m">Espacio · botón A / X</span>
<span class="t">correr</span>     <span class="m">Shift izquierdo · L3</span>
<span class="t">agacharse</span>  <span class="m">C · B / Círculo</span>
<span class="t">disparar</span>   <span class="m">Clic izquierdo · R2</span></div>
   <p>Así el código pregunta por <code class="i">"saltar"</code> y no por la tecla Espacio. Si después querés que se pueda jugar con joystick, o que el jugador cambie las teclas, no tocás ni una línea de código.</p>`},
  {type:"quiz",kicker:"Pregunta",q:"Querés que también se pueda saltar con el botón A del joystick. ¿Qué cambiás?",options:["Reescribís todo el script del jugador","Agregás el botón A a la acción saltar en el Mapa de entrada","Creás un segundo jugador","No se puede"],answer:1,explain:"Las acciones pueden tener varias teclas y botones. El código sigue preguntando por \"saltar\"."},
  {type:"fill",kicker:"Completá",q:"Juntá las cuatro direcciones en un solo vector:",code:`var entrada := Input.____("izquierda", "derecha", "adelante", "atras")`,options:["get_vector","get_axis","is_action_pressed","get_direction"],answer:0,explain:"get_vector toma 4 acciones y devuelve un Vector2. get_axis toma solo 2, para un eje."},
  {type:"quiz",kicker:"Pregunta",q:"Si en get_vector escribís \"adelamte\" (mal escrito), ¿qué pasa?",options:["Godot lo corrige solo","Esa acción no existe: Godot avisa en Salida y esa dirección no responde","El jugador corre más rápido","Nada, funciona igual"],answer:1,explain:"El nombre tiene que ser exactamente igual al del Mapa de entrada, con las mismas minúsculas y sin tildes."}
 ]},
 {id:"f3",title:"Mirar con el mouse",sub:"Capturar el mouse, girar y limitar la vista",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Dos giros separados",html:`<p>En todo FPS el mouse está <b>capturado</b>: el cursor desaparece y queda encerrado en la ventana. Eso se hace en <code class="i">_ready()</code> con <code class="i">Input.mouse_mode = Input.MOUSE_MODE_CAPTURED</code>.</p>
   <p>Cada vez que movés el mouse, Godot manda un evento <code class="i">InputEventMouseMotion</code>. Su <code class="i">relative</code> dice cuánto se movió:</p>
   <ul><li><b>Movimiento horizontal (x)</b>: gira todo el cuerpo en el eje Y. Así "adelante" pasa a ser hacia donde mirás.</li>
   <li><b>Movimiento vertical (y)</b>: gira solo la cabeza en el eje X.</li>
   <li><code class="i">clamp</code> limita cuánto puede mirar arriba y abajo. Sin eso, la vista daría la vuelta entera.</li></ul>
   <p>La <b>sensibilidad</b> es un número chiquito, como 0.003, porque el mouse se mueve en píxeles y los giros van en radianes.</p>`},
  {type:"lab",kicker:"Laboratorio 3D",title:"Probá la vista en primera persona",html:`<p>Arrastrá sobre la escena para mirar. En Godot real no hace falta arrastrar: el mouse está capturado. Probá una sensibilidad muy alta (0.015) y un límite chico (0.3) para ver qué cambia.</p>`,lab:"mirar"},
  {type:"quiz",kicker:"Pregunta",q:"Movés el mouse hacia la derecha. ¿Qué nodo gira?",options:["La Camera3D sola","La Cabeza, en el eje X","El cuerpo entero (CharacterBody3D), en el eje Y","Ninguno"],answer:2,explain:"El movimiento horizontal gira el cuerpo con rotate_y. Como la cabeza y la cámara son hijas, giran con él."},
  {type:"quiz",kicker:"Pregunta",q:"¿Por qué rotate_y lleva un signo menos: rotate_y(-event.relative.x * sensibilidad)?",options:["Es un error, va sin signo","Porque si no, al mover el mouse a la derecha la vista giraría a la izquierda","Para que gire más rápido","Para que no se pase del límite"],answer:1,explain:"En Godot, rotar en positivo alrededor de Y gira hacia la izquierda. El menos invierte el giro para que coincida con el mouse."},
  {type:"fill",kicker:"Completá",q:"Que la vista no pase de mirar recto arriba o recto abajo:",code:`cabeza.rotation.x = ____(cabeza.rotation.x, -1.4, 1.4)`,options:["clamp","lerp","abs","min"],answer:0,explain:"clamp(valor, mínimo, máximo) deja el valor dentro del rango. 1.4 rad son unos 80°."}
 ]},
 {id:"f4",title:"Caminar hacia donde mirás",sub:"get_vector, transform.basis y move_and_slide",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Adelante depende de adónde mirás",html:`<p><code class="i">get_vector</code> te da la entrada del jugador: x es izquierda o derecha, y es adelante o atrás. Pero ese "adelante" es fijo, siempre hacia el mismo lado del mapa.</p>
   <p><code class="i">transform.basis</code> es la orientación del jugador. Multiplicar por ella <b>gira</b> la entrada para que adelante sea hacia donde está mirando el cuerpo.</p>
   <pre class="code">${hl(`var entrada := Input.get_vector("izquierda", "derecha", "adelante", "atras")\nvar dir := (transform.basis * Vector3(entrada.x, 0, entrada.y)).normalized()\nvelocity.x = dir.x * velocidad\nvelocity.z = dir.z * velocidad\nmove_and_slide()`)}</pre>
   <p>Fijate que <code class="i">entrada.y</code> va en la <b>z</b> del Vector3: en 3D, adelante y atrás es el eje Z, no el Y (que es arriba).</p>`},
  {type:"lab",kicker:"Laboratorio 3D",title:"Caminá por el campo de entrenamiento",html:`<p>Usá <b>WASD</b> y arrastrá para girar. Mirá cómo <code class="i">dir</code> cambia según hacia dónde mirás, aunque apretes la misma tecla. Probá velocidad 2 y velocidad 15.</p>`,lab:"caminar"},
  {type:"quiz",kicker:"Pregunta",q:"Sin multiplicar por transform.basis, ¿qué pasaría al apretar W?",options:["El jugador iría siempre hacia el mismo lado del mapa, aunque gires","No se movería","Saltaría","Iría el doble de rápido"],answer:0,explain:"La entrada sola no sabe hacia dónde mirás. transform.basis la convierte a la orientación del jugador."},
  {type:"fill",kicker:"Completá",q:"Mover el cuerpo y chocar con paredes y piso:",code:`velocity.x = dir.x * velocidad\nvelocity.z = dir.z * velocidad\n____()`,options:["move_and_slide","move_and_collide","translate","position"],answer:0,explain:"move_and_slide usa la velocity y resuelve los choques, deslizándose contra las paredes."},
  {type:"quiz",kicker:"Pregunta",q:"¿Por qué no se toca velocity.y en estas líneas?",options:["Porque Y es arriba y abajo: lo maneja la gravedad y el salto","Porque Y no existe en 3D","Porque está prohibido","Por error"],answer:0,explain:"Caminar cambia X y Z. Y queda para la gravedad y el salto, que se calculan aparte."}
 ]},
 {id:"f5",title:"Saltar, correr y agacharse",sub:"Velocidad variable y cabeza que baja con lerp",xp:30,steps:[
  {type:"info",kicker:"Concepto",title:"Movimientos de soldado",html:`<p>Con tres acciones más el jugador se siente de un FPS de verdad:</p>
   <ul><li><b>Saltar</b>: si está en el piso, le das velocidad hacia arriba. La gravedad la va frenando.</li>
   <li><b>Correr</b>: mientras mantenés Shift, se usa <code class="i">velocidad_correr</code> en lugar de <code class="i">velocidad</code>.</li>
   <li><b>Agacharse</b>: baja la cabeza de 1.6 a 0.9 metros y camina a la mitad de velocidad.</li></ul>
   <p>Para que la cabeza no baje de golpe se usa <code class="i">lerp(desde, hasta, cuánto)</code>: cada frame se acerca un poco al valor que querés. Queda un movimiento suave.</p>
   <pre class="code">${hl(`cabeza.position.y = lerp(cabeza.position.y, 0.9, delta * 10)`)}</pre>`},
  {type:"lab",kicker:"Laboratorio 3D",title:"El jugador completo",html:`<p>Usá <b>WASD</b>, <b>Espacio</b> para saltar, <b>Shift</b> para correr, <b>C</b> para agacharte, y arrastrá para mirar. Probá subirte a las cajas. Con fuerza de salto 3 no llegás a las altas; con 8 sí.</p>`,lab:"fps"},
  {type:"quiz",kicker:"Pregunta",q:"¿Por qué el salto pregunta también is_on_floor()?",options:["Para poder saltar infinitas veces en el aire","Para que solo salte si está apoyado, y no vuele apretando Espacio en el aire","Para que corra más","No hace falta"],answer:1,explain:"Sin is_on_floor(), cada Espacio en el aire sumaría otro salto y el jugador volaría."},
  {type:"fill",kicker:"Completá",q:"Mientras corre, usá la velocidad de correr:",code:`if Input.____("correr"):\n\tvel_actual = velocidad_correr`,options:["is_action_pressed","is_action_just_pressed","get_vector","_ready"],answer:0,explain:"is_action_pressed es true mientras mantenés la tecla. just_pressed solo duraría un frame."},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué hace lerp(cabeza.position.y, 0.9, delta * 10)?",options:["Pone la cabeza en 0.9 de golpe","Acerca la cabeza a 0.9 un poquito cada frame, con un movimiento suave","Hace saltar al jugador","Duplica la altura"],answer:1,explain:"lerp mezcla dos valores. Repetido en cada frame, la cabeza se desliza hasta la altura buscada."}
 ]},
 {id:"f6",title:"Soltar el mouse y repaso",sub:"Esc para liberar el cursor y el script final",xp:30,steps:[
  {type:"info",kicker:"Detalle importante",title:"Que el jugador pueda salir",html:`<p>Con el mouse capturado no podés tocar nada fuera del juego. Lo normal es que <b>Esc</b> lo libere y que un clic lo vuelva a capturar:</p>
   <pre class="code">${hl(`if event.is_action_pressed("ui_cancel"):\n\tInput.mouse_mode = Input.MOUSE_MODE_VISIBLE\nif event is InputEventMouseButton and event.pressed:\n\tInput.mouse_mode = Input.MOUSE_MODE_CAPTURED`)}</pre>
   <p><code class="i">ui_cancel</code> es una acción que Godot ya trae configurada con Esc. Además, la vista solo gira si el mouse está capturado, así no se mueve mientras usás el menú.</p>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué modo de mouse muestra el cursor normal otra vez?",options:["MOUSE_MODE_CAPTURED","MOUSE_MODE_VISIBLE","MOUSE_MODE_HIDDEN","MOUSE_MODE_CONFINED"],answer:1,explain:"VISIBLE es el cursor normal. CAPTURED lo esconde y lo encierra; HIDDEN lo esconde pero lo deja salir de la ventana."},
  {type:"info",kicker:"Repaso",title:"Tu jugador FPS completo",html:`<p>Este es el script final de la unidad. Ya entendés cada línea. Copialo en <code class="i">jugador.gd</code>, armá la escena como en la lección 1 y creá las acciones del Mapa de entrada.</p><pre class="code">${hl(JUGADOR_COMPLETO_GD)}</pre>
   <p>Para probarlo: creá un nivel con un <code class="i">StaticBody3D</code> con su <code class="i">CollisionShape3D</code> como piso, una luz, instanciá <code class="i">jugador.tscn</code> encima y apretá F6.</p>`},
  {type:"quiz",kicker:"Repaso",q:"El jugador atraviesa el piso y cae para siempre. ¿Qué es lo más probable?",options:["Falta la Camera3D","El piso no tiene CollisionShape3D (o el jugador tampoco)","La sensibilidad es muy alta","Falta el Mapa de entrada"],answer:1,explain:"Para chocar, los dos necesitan forma de colisión: el jugador y el piso."},
  {type:"quiz",kicker:"Repaso",q:"¿En qué función va el movimiento y la gravedad del jugador?",options:["_ready()","_process(delta)","_physics_process(delta)","_unhandled_input(event)"],answer:2,explain:"La física va en _physics_process, que corre a ritmo fijo. La vista con el mouse va en _unhandled_input."}
 ]}
];
/* =================== curso FPS 3D · Unidad 3: armas y disparo =================== */
const TREE_ARMA = `<span class="t">Jugador</span> <span class="m">(CharacterBody3D)</span>
└─ <span class="t">Cabeza</span> <span class="m">(Node3D)</span>
   └─ <span class="t">Camera3D</span>
      ├─ <span class="t">RayCast3D</span> <span class="m">(apunta hacia adelante: 0, 0, -50)</span>
      └─ <span class="t">Arma</span> <span class="m">(Node3D)</span>  <span class="m">← arma.gd</span>
         ├─ <span class="t">Modelo</span> <span class="m">(MeshInstance3D)</span>
         ├─ <span class="t">Fogonazo</span> <span class="m">(OmniLight3D, oculto)</span>
         ├─ <span class="t">SonidoDisparo</span> <span class="m">(AudioStreamPlayer3D)</span>
         └─ <span class="t">Animaciones</span> <span class="m">(AnimationPlayer)</span>`;

const DIANA_GD = `extends StaticBody3D

signal destruida

@export var vida := 100

func recibir_danio(cantidad: int):
	vida -= cantidad
	print("Diana: ", vida, " de vida")
	if vida <= 0:
		destruida.emit()
		queue_free()`;

const ARMA_COMPLETA_GD = `extends Node3D

signal municion_cambiada(en_cargador, reserva)

@export var danio := 34
@export var alcance := 50.0
@export var tiempo_entre_disparos := 0.12
@export var automatico := true
@export var tamanio_cargador := 30
@export var tiempo_recarga := 1.5
@export var retroceso := 0.03
@export var recuperacion := 8.0

@onready var rayo: RayCast3D = $"../RayCast3D"
@onready var camara: Camera3D = get_parent()

var en_cargador := 0
var reserva := 90
var puede_disparar := true
var recargando := false
var patada := 0.0

func _ready():
	rayo.target_position = Vector3(0, 0, -alcance)
	en_cargador = tamanio_cargador
	municion_cambiada.emit(en_cargador, reserva)

func _process(delta):
	var quiere := Input.is_action_pressed("disparar") if automatico else Input.is_action_just_pressed("disparar")
	if quiere and puede_disparar:
		disparar()
	if Input.is_action_just_pressed("recargar"):
		recargar()
	patada = lerp(patada, 0.0, delta * recuperacion)
	camara.rotation.x = patada

func disparar():
	if recargando or en_cargador <= 0:
		return
	en_cargador -= 1
	municion_cambiada.emit(en_cargador, reserva)
	patada += retroceso
	$SonidoDisparo.play()
	$Fogonazo.visible = true
	rayo.force_raycast_update()
	if rayo.is_colliding():
		var objetivo = rayo.get_collider()
		if objetivo.has_method("recibir_danio"):
			objetivo.recibir_danio(danio)
	puede_disparar = false
	await get_tree().create_timer(tiempo_entre_disparos).timeout
	$Fogonazo.visible = false
	puede_disparar = true

func recargar():
	if recargando or reserva <= 0 or en_cargador == tamanio_cargador:
		return
	recargando = true
	await get_tree().create_timer(tiempo_recarga).timeout
	var cargar := mini(tamanio_cargador - en_cargador, reserva)
	en_cargador += cargar
	reserva -= cargar
	recargando = false
	municion_cambiada.emit(en_cargador, reserva)`;

Object.assign(LABS,{
 tiro:{code:`extends Node3D

@export var alcance := __a__
@export var danio := __d__
@onready var rayo: RayCast3D = $"../RayCast3D"

func _ready():
	rayo.target_position = Vector3(0, 0, -alcance)

func _unhandled_input(event):
	if event.is_action_pressed("disparar"):
		disparar()

func disparar():
	rayo.force_raycast_update()
	if rayo.is_colliding():
		var objetivo = rayo.get_collider()
		print("Le diste a ", objetivo.name, " en ", rayo.get_collision_point())
		if objetivo.has_method("recibir_danio"):
			objetivo.recibir_danio(danio)`,
  params:{a:{val:30,min:1,max:60,step:1},d:{val:34,min:1,max:200,step:1}},range:"tiro",
  hint:"Mové el mouse para apuntar y hacé clic para disparar."},
 cadencia:{code:`@export var tiempo_entre_disparos := __t__
@export var automatico := __b__
var puede_disparar := true

func _process(delta):
	var quiere := Input.is_action_pressed("disparar") if automatico else Input.is_action_just_pressed("disparar")
	if quiere and puede_disparar:
		disparar()

func disparar():
	# ... el raycast de la lección anterior ...
	puede_disparar = false
	await get_tree().create_timer(tiempo_entre_disparos).timeout
	puede_disparar = true`,
  params:{t:{val:0.12,min:0.03,max:1.5,step:0.01},b:{val:1,min:0,max:1,step:1,bool:true}},range:"cadencia",
  hint:"Mantené apretado el clic. Probá automatico en false."},
 municion:{code:`@export var tamanio_cargador := __m__
@export var tiempo_recarga := __r__
var en_cargador := 0
var reserva := 60
var recargando := false

func _ready():
	en_cargador = tamanio_cargador

func disparar():
	if recargando or en_cargador <= 0:
		return  # clic vacío: no sale nada
	en_cargador -= 1
	# ... raycast ...

func recargar():
	if recargando or reserva <= 0 or en_cargador == tamanio_cargador:
		return
	recargando = true
	await get_tree().create_timer(tiempo_recarga).timeout
	var cargar := mini(tamanio_cargador - en_cargador, reserva)
	en_cargador += cargar
	reserva -= cargar
	recargando = false`,
  params:{m:{val:12,min:1,max:100,step:1},r:{val:1.5,min:0.2,max:5,step:0.1}},range:"municion",keys:true,pad:[["KeyR","Recargar (R)"]],
  hint:"Disparás con clic. Con R recargás. Mirá la munición abajo a la derecha."},
 retroceso:{code:`@export var retroceso := __k__     # cuánto sube la vista por disparo
@export var recuperacion := __v__  # qué tan rápido vuelve
var patada := 0.0

func disparar():
	patada += retroceso
	$Fogonazo.visible = true
	# ... raycast ...
	await get_tree().create_timer(0.05).timeout
	$Fogonazo.visible = false

func _process(delta):
	patada = lerp(patada, 0.0, delta * recuperacion)
	camara.rotation.x = patada`,
  params:{k:{val:0.03,min:0,max:0.3,step:0.01},v:{val:8,min:0.5,max:30,step:0.5}},range:"retroceso",
  hint:"Disparo automático: mantené el clic y mirá cómo sube la mira."}
});

function buildRangeLab(def,p,readout){
  const T=THREE,mode=def.range,scene=new T.Scene(),sky=0xb7c6d4;scene.background=new T.Color(sky);scene.fog=new T.Fog(sky,25,70);
  const cam=new T.PerspectiveCamera(65,16/9,.05,200);cam.rotation.order="YXZ";cam.position.set(0,1.6,6);scene.add(cam);
  scene.add(new T.HemisphereLight(0xffffff,0x5a6470,.9));const dl=new T.DirectionalLight(0xffffff,.7);dl.position.set(-6,12,8);scene.add(dl);
  const floor=new T.Mesh(new T.PlaneGeometry(40,80),new T.MeshStandardMaterial({color:0x8c8576,roughness:1}));floor.rotation.x=-Math.PI/2;floor.position.z=-20;scene.add(floor);
  const lineM=new T.MeshBasicMaterial({color:0xf2efe6});
  [-6,-2,2,6].forEach(x=>{const l=new T.Mesh(new T.BoxGeometry(.06,.01,40),lineM);l.position.set(x,.01,-18);scene.add(l)});
  const wallM=new T.MeshStandardMaterial({color:0x6c7480,flatShading:true});
  const back=new T.Mesh(new T.BoxGeometry(24,6,.5),wallM);back.position.set(0,3,-38);back.userData.name="Pared";scene.add(back);
  [-12,12].forEach(x=>{const w=new T.Mesh(new T.BoxGeometry(.5,3,44),wallM);w.position.set(x,1.5,-16);w.userData.name="Pared";scene.add(w)});
  const counter=new T.Mesh(new T.BoxGeometry(6,1,.6),new T.MeshStandardMaterial({color:0x5b4632}));counter.position.set(0,.5,4.6);scene.add(counter);
  const hitables=[back];
  const white=new T.MeshStandardMaterial({color:0xf4f1ea}),red=new T.MeshStandardMaterial({color:0xd8443a}),post=new T.MeshStandardMaterial({color:0x4a3a2a});
  const TG=[[-4,0],[0,-6],[4,-12],[-3,-20],[3,-28]].map(([x,z],i)=>{
    const g=new T.Group();g.position.set(x,0,z);scene.add(g);
    const pst=new T.Mesh(new T.BoxGeometry(.12,1.2,.12),post);pst.position.y=.6;g.add(pst);
    const d1=new T.Mesh(new T.CylinderGeometry(.5,.5,.06,28),white);d1.rotation.x=Math.PI/2;d1.position.y=1.5;g.add(d1);
    const d2=new T.Mesh(new T.CylinderGeometry(.22,.22,.08,24),red);d2.rotation.x=Math.PI/2;d2.position.y=1.5;g.add(d2);
    const t={name:"Diana"+(i+1),g,vida:100,fall:0,down:false,timer:0};d1.userData.t=t;d2.userData.t=t;hitables.push(d1,d2);return t});
  // arma pegada a la cámara
  const gunM=new T.MeshStandardMaterial({color:0x2b2f35,flatShading:true});
  const gun=new T.Group();gun.position.set(.28,-.26,-.6);cam.add(gun);
  const body=new T.Mesh(new T.BoxGeometry(.11,.14,.5),gunM);gun.add(body);
  const barrel=new T.Mesh(new T.CylinderGeometry(.025,.025,.35,10),gunM);barrel.rotation.x=Math.PI/2;barrel.position.set(0,.03,-.4);gun.add(barrel);
  const grip=new T.Mesh(new T.BoxGeometry(.08,.16,.08),gunM);grip.position.set(0,-.12,.12);grip.rotation.x=.3;gun.add(grip);
  const flash=new T.Mesh(new T.SphereGeometry(.07,10,8),new T.MeshBasicMaterial({color:0xffd27a}));flash.position.set(0,.03,-.62);flash.visible=false;gun.add(flash);
  const flashL=new T.PointLight(0xffb347,0,6);flashL.position.set(0,.03,-.7);gun.add(flashL);
  const markM=new T.MeshBasicMaterial({color:0x1b1b1b}),markG=new T.SphereGeometry(.035,6,5),marks=[];
  const rc=new T.Raycaster(),center=new T.Vector2(0,0);
  const A={yaw:0,pitch:0,ty:0,tp:0,down:false,pressed:false,can:true,cd:0,kick:0,flashT:0,shots:0,ammo:0,res:60,reloading:false,rt:0,rPrev:false,last:"Todavía no disparaste."};
  const auto=()=>mode==="cadencia"?p.b>=.5:mode==="retroceso";
  const cooldown=()=>mode==="cadencia"?p.t:mode==="retroceso"?0.1:0.12;
  const usesAmmo=mode==="municion";
  let hud=null;
  const lab={scene,cam,keys:!!def.keys,tick(){},rebuild(){if(usesAmmo&&!A.started){A.ammo=Math.round(p.m);A.started=true}}};
  lab.bind=el=>{el.style.touchAction="none";el.style.cursor="crosshair";
    hud=document.createElement("div");hud.className="hud";hud.innerHTML=`<div class="cross"></div>${usesAmmo?'<div class="ammo"></div>':""}<div class="hudmsg"></div>`;el.appendChild(hud);
    const aim=e=>{const b=el.getBoundingClientRect();const nx=(e.clientX-b.left)/b.width*2-1,ny=(e.clientY-b.top)/b.height*2-1;A.ty=-nx*.55;A.tp=-ny*.32};
    el.addEventListener("pointermove",aim);
    el.addEventListener("pointerdown",e=>{aim(e);A.down=true;A.pressed=true;try{el.setPointerCapture(e.pointerId)}catch(_){}});
    ["pointerup","pointercancel"].forEach(ev=>el.addEventListener(ev,()=>A.down=false))};
  function shoot(){
    if(usesAmmo){if(A.reloading)return;if(A.ammo<=0){A.last="Clic vacío: el cargador está en 0. Apretá R para recargar.";blip(900);A.can=false;A.cd=.25;return}A.ammo--}
    A.shots++;A.can=false;A.cd=cooldown();A.flashT=.05;flash.visible=true;flashL.intensity=2.5;
    A.kick+=mode==="retroceso"?p.k:.012;blip(110);
    cam.updateMatrixWorld();rc.setFromCamera(center,cam);rc.far=mode==="tiro"?p.a:60;
    const hits=rc.intersectObjects(hitables,false);
    if(!hits.length){A.last=`is_colliding() = false${mode==="tiro"?`  (nada a menos de ${p.a} m)`:""}`;return}
    const h=hits[0],t=h.object.userData.t,pt=h.point;
    const m=new T.Mesh(markG,markM);
    if(t){t.g.worldToLocal(m.position.copy(pt));t.g.add(m)}else{m.position.copy(pt);scene.add(m)}
    marks.push(m);if(marks.length>40){const o=marks.shift();o.parent&&o.parent.remove(o)}
    const P=`(${pt.x.toFixed(1)}, ${pt.y.toFixed(1)}, ${pt.z.toFixed(1)})`;
    if(t&&!t.down){const dmg=mode==="tiro"?p.d:34;t.vida-=dmg;hud&&hud.classList.add("hitm");setTimeout(()=>hud&&hud.classList.remove("hitm"),90);
      if(t.vida<=0){t.down=true;t.timer=2.5}
      A.last=`get_collider() = ${t.name}   distancia = ${h.distance.toFixed(1)} m\nget_collision_point() = ${P}\nrecibir_danio(${dmg}) → vida = ${Math.max(0,t.vida)}${t.vida<=0?"  ¡derribada!":""}`}
    else A.last=`get_collider() = ${t?t.name+" (caída)":"Pared"}   distancia = ${h.distance.toFixed(1)} m\nget_collision_point() = ${P}\nhas_method("recibir_danio") = false`;
  }
  lab.tick=dt=>{
    A.yaw+=(A.ty-A.yaw)*Math.min(1,dt*10);A.pitch+=(A.tp-A.pitch)*Math.min(1,dt*10);
    if(!A.can){A.cd-=dt;if(A.cd<=0)A.can=true}
    const want=auto()?A.down:A.pressed;A.pressed=false;
    if(want&&A.can)shoot();
    if(usesAmmo){const r=KEYS.has("KeyR");if(r&&!A.rPrev&&!A.reloading&&A.res>0&&A.ammo<Math.round(p.m)){A.reloading=true;A.rt=p.r;blip(300)}A.rPrev=r;
      if(A.reloading){A.rt-=dt;if(A.rt<=0){const c=Math.min(Math.round(p.m)-A.ammo,A.res);A.ammo+=c;A.res-=c;A.reloading=false;blip(500)}}}
    A.kick+=(0-A.kick)*Math.min(1,dt*(mode==="retroceso"?p.v:10));
    cam.rotation.y=A.yaw;cam.rotation.x=A.pitch+A.kick;
    gun.position.z=-.6+Math.min(.08,A.kick*1.5);gun.rotation.x=A.kick*2;
    if(usesAmmo&&A.reloading)gun.rotation.x=-.6*Math.sin(Math.min(1,(p.r-A.rt)/p.r)*Math.PI);
    if(A.flashT>0){A.flashT-=dt;if(A.flashT<=0){flash.visible=false;flashL.intensity=0}}
    TG.forEach(t=>{if(t.down){t.fall=Math.min(1,t.fall+dt*4);t.timer-=dt;if(t.timer<=0){t.down=false;t.vida=100}}else t.fall=Math.max(0,t.fall-dt*3);
      t.g.rotation.x=-Math.PI/2*t.fall});
    if(hud){const am=hud.querySelector(".ammo");if(am)am.innerHTML=`${A.ammo}<small> / ${A.res}</small>`;
      hud.querySelector(".hudmsg").textContent=usesAmmo&&A.reloading?"Recargando…":usesAmmo&&A.ammo===0?(A.res>0?"Sin balas: R para recargar":"Sin munición"):""}
    if(mode==="tiro")readout(A.last);
    else if(mode==="cadencia")readout(`automatico = ${p.b>=.5}   puede_disparar = ${A.can}\nmáximo ${(1/p.t).toFixed(1)} disparos por segundo   disparos: ${A.shots}`);
    else if(mode==="municion")readout(`en_cargador = ${A.ammo}   reserva = ${A.res}   recargando = ${A.reloading}${A.reloading?`  (faltan ${Math.max(0,A.rt).toFixed(1)} s)`:""}\n${A.last.startsWith("Clic")?A.last:"disparos: "+A.shots}`);
    else readout(`patada = ${A.kick.toFixed(3)} rad  (${(A.kick*180/Math.PI).toFixed(1)}°)\ncamara.rotation.x = patada`);
  };
  return lab;
}

const FPS3=[
 {id:"a1",title:"El arma en la escena",sub:"Dónde va el arma y el RayCast3D",xp:20,steps:[
  {type:"info",kicker:"Concepto",title:"El arma va pegada a la cámara",html:`<p>En un FPS el arma está siempre en la misma esquina de la pantalla y apunta adonde mirás. Para lograrlo, el arma se pone como <b>hija de la Camera3D</b>: si la cámara gira, el arma gira con ella.</p>
   <div class="tree">${TREE_ARMA}</div>
   <ul><li><b>RayCast3D</b>: un rayo invisible que sale de la cámara hacia adelante y detecta lo primero que toca. Es la "bala".</li>
   <li><b>Fogonazo</b>: una luz que se prende un instante al disparar.</li>
   <li><b>AudioStreamPlayer3D</b>: el sonido del disparo, que se escucha desde la posición del arma.</li>
   <li><b>AnimationPlayer</b>: animaciones de disparo y recarga.</li></ul>
   <p>En Godot, el RayCast3D apunta por defecto hacia abajo. Cambiá su <b>Target Position</b> a <code class="i">(0, 0, -50)</code> para que apunte 50 metros hacia adelante: en Godot, adelante es Z negativo.</p>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Por qué el arma es hija de la Camera3D?",options:["Para que se vea más grande","Para que gire junto con la vista y siempre apunte adonde mirás","Porque no puede estar en otro lado","Para que haga ruido"],answer:1,explain:"Los hijos copian la posición y rotación del padre. Así el arma acompaña cada movimiento de la cámara."},
  {type:"fill",kicker:"Completá",q:"Que el rayo apunte 50 metros hacia adelante:",code:`rayo.target_position = Vector3(0, 0, ____)`,options:["-50","50","0","-1"],answer:0,explain:"En Godot, adelante es Z negativo. Por eso la cámara mira hacia -Z."},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué es un disparo hitscan?",options:["Una bala que vuela despacio y cae por la gravedad","Un rayo que impacta en el mismo instante en que disparás","Un disparo que no hace daño","Una granada"],answer:1,explain:"Con un RayCast el impacto es instantáneo. La mayoría de los rifles y pistolas de los FPS funcionan así. Los cohetes y granadas, en cambio, son objetos que viajan."}
 ]},
 {id:"a2",title:"Disparar con RayCast3D",sub:"is_colliding, get_collider y recibir_danio",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Preguntarle al rayo qué tocó",html:`<p>Cuando disparás, le preguntás tres cosas al RayCast3D:</p>
   <ul><li><code class="i">is_colliding()</code>: ¿tocó algo? Devuelve true o false.</li>
   <li><code class="i">get_collider()</code>: ¿qué nodo tocó? Por ejemplo, una diana o un enemigo.</li>
   <li><code class="i">get_collision_point()</code>: ¿en qué punto exacto? Sirve para dibujar el impacto.</li></ul>
   <p>Antes de preguntar se llama a <code class="i">force_raycast_update()</code>, para que el rayo mire justo en ese momento y no use el resultado del frame anterior.</p>
   <p>Después, si lo que tocaste sabe recibir daño, le avisás. <code class="i">has_method("recibir_danio")</code> evita errores al pegarle a una pared, que no tiene esa función.</p>`},
  {type:"lab",kicker:"Laboratorio 3D",title:"Polígono de tiro",html:`<p>Apuntá con el mouse y hacé clic. Abajo ves lo que devuelve el rayo. Probá un <b>alcance</b> de 10: las dianas lejanas dejan de recibir impactos. Con <b>danio</b> 100 caen de un tiro.</p>`,lab:"tiro"},
  {type:"quiz",kicker:"Pregunta",q:"Disparás a una pared. ¿Por qué no da error al llamar a recibir_danio?",options:["Porque las paredes tienen vida","Porque antes se pregunta has_method(\"recibir_danio\") y la pared no lo tiene","Porque el rayo no toca paredes","Sí da error"],answer:1,explain:"has_method revisa si el nodo tiene esa función antes de llamarla."},
  {type:"fill",kicker:"Completá",q:"Obtener el nodo que tocó el rayo:",code:`if rayo.is_colliding():\n\tvar objetivo = rayo.____()`,options:["get_collider","get_collision_point","get_node","target_position"],answer:0,explain:"get_collider devuelve el nodo. get_collision_point devuelve la posición del impacto."},
  {type:"quiz",kicker:"Pregunta",q:"Con alcance = 10, disparás a una diana que está a 20 metros. ¿Qué pasa?",options:["Le das igual","is_colliding() da false: el rayo no llega","La diana se acerca","El juego se cierra"],answer:1,explain:"El rayo solo mide target_position. Lo que está más lejos no existe para él."}
 ]},
 {id:"a3",title:"Cadencia: semiautomático y automático",sub:"Esperar entre disparos con un temporizador",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Cuántos tiros por segundo",html:`<p>Si disparás en cada frame, el arma tiraría 60 balas por segundo. Para controlar la <b>cadencia</b> se usa una variable <code class="i">puede_disparar</code> y un temporizador:</p>
   <pre class="code">${hl(`puede_disparar = false\nawait get_tree().create_timer(0.12).timeout\npuede_disparar = true`)}</pre>
   <p><code class="i">await</code> pausa esa función hasta que el temporizador termina, sin congelar el juego.</p>
   <ul><li><b>Semiautomático</b> (pistola, rifle de precisión): un tiro por clic. Se usa <code class="i">is_action_just_pressed</code>.</li>
   <li><b>Automático</b> (ametralladora): dispara mientras mantenés. Se usa <code class="i">is_action_pressed</code>.</li></ul>
   <p>La línea <code class="i">a if condición else b</code> elige uno de los dos según la variable <code class="i">automatico</code>.</p>`},
  {type:"lab",kicker:"Laboratorio 3D",title:"Ametralladora o pistola",html:`<p>Mantené apretado el clic. Con <b>automatico = true</b> dispara solo. Cambialo a <b>false</b> y vas a tener que hacer clic por cada tiro. Probá <b>tiempo_entre_disparos</b> 0.05 y 1.0.</p>`,lab:"cadencia"},
  {type:"quiz",kicker:"Pregunta",q:"tiempo_entre_disparos = 0.1. ¿Cuántos tiros por segundo como máximo?",options:["1","10","60","0.1"],answer:1,explain:"1 dividido 0.1 da 10 disparos por segundo."},
  {type:"fill",kicker:"Completá",q:"Esperar sin congelar el juego:",code:`____ get_tree().create_timer(tiempo_entre_disparos).timeout`,options:["await","wait","sleep","yield"],answer:0,explain:"await espera la señal timeout del temporizador. sleep no existe en GDScript y yield era de Godot 3."}
 ]},
 {id:"a4",title:"Munición y recarga",sub:"Cargador, reserva y la señal para el HUD",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Contar balas",html:`<p>Con tres variables llevás la cuenta: <code class="i">en_cargador</code>, <code class="i">reserva</code> y <code class="i">recargando</code>.</p>
   <ul><li>Al disparar: si el cargador está vacío o estás recargando, no sale nada. Si no, restás una bala.</li>
   <li>Al recargar: esperás <code class="i">tiempo_recarga</code> y pasás balas de la reserva al cargador. <code class="i">mini(a, b)</code> da el menor de los dos números, para no cargar más balas de las que tenés.</li></ul>
   <p>Ojo: <code class="i">en_cargador</code> se llena en <code class="i">_ready()</code> y no al declararla. Las variables @export reciben el valor del Inspector recién después de crearse.</p>
   <p>Para mostrar las balas en pantalla, el arma emite una señal <code class="i">municion_cambiada(en_cargador, reserva)</code> y el HUD la escucha y actualiza su Label.</p>`},
  {type:"lab",kicker:"Laboratorio 3D",title:"Cargador y recarga",html:`<p>Disparás con clic y recargás con <b>R</b> o con el botón de abajo. Probá un cargador de 3 balas y un tiempo de recarga de 4 segundos para sentir la diferencia.</p>`,lab:"municion"},
  {type:"trace",kicker:"Paso a paso",title:"La cuenta de recargar()",html:`<p>Cargador de 12, te quedan 4 balas y tenés 60 en reserva. Seguí la cuenta.</p>`,
   code:`func recargar():\n\trecargando = true\n\tawait get_tree().create_timer(tiempo_recarga).timeout\n\tvar cargar := mini(tamanio_cargador - en_cargador, reserva)\n\ten_cargador += cargar\n\treserva -= cargar\n\trecargando = false`,
   steps:[{line:0,say:"Apretaste R. Empieza la recarga.",vars:{en_cargador:"4",reserva:"60",recargando:"false"}},
    {line:1,say:"Marcamos que estamos recargando: mientras tanto no se puede disparar.",vars:{recargando:"true"}},
    {line:2,say:"Esperamos tiempo_recarga segundos. El juego sigue andando mientras tanto."},
    {line:3,say:"Faltan 12 - 4 = 8 balas. mini(8, 60) es 8: hay de sobra en la reserva.",vars:{cargar:"8"}},
    {line:4,say:"4 + 8 = 12. Cargador lleno.",vars:{en_cargador:"12"}},
    {line:5,say:"60 - 8 = 52 quedan en la reserva.",vars:{reserva:"52"}},
    {line:6,say:"Terminó la recarga. Ya se puede disparar.",vars:{recargando:"false"}}]},
  {type:"quiz",kicker:"Pregunta",q:"Cargador de 12, tenés 2 balas y solo 5 en reserva. ¿Cuántas quedan en el cargador después de recargar?",options:["12","7","5","2"],answer:1,explain:"Faltan 10, pero mini(10, 5) da 5. 2 + 5 = 7, y la reserva queda en 0."}
 ]},
 {id:"a5",title:"Retroceso y fogonazo",sub:"Que el arma se sienta poderosa",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"La patada del arma",html:`<p>Un arma sin retroceso se siente de juguete. Un truco simple: cada disparo suma un poco a una variable <code class="i">patada</code> que sube la cámara. En cada frame, <code class="i">lerp</code> la vuelve suavemente a 0.</p>
   <ul><li><b>retroceso</b>: cuánto sube la vista por disparo, en radianes.</li>
   <li><b>recuperacion</b>: qué tan rápido vuelve a su lugar.</li></ul>
   <p>Se aplica en la <b>cámara</b> y no en la <b>Cabeza</b>, así el retroceso no pisa lo que hace el mouse.</p>
   <p>El <b>fogonazo</b> es una luz o un brillo que se prende 0.05 segundos y se apaga. Junto con el sonido, le da peso a cada tiro.</p>`},
  {type:"lab",kicker:"Laboratorio 3D",title:"Sentí el retroceso",html:`<p>Mantené el clic: esta arma es automática. Probá <b>retroceso</b> 0.1 con <b>recuperacion</b> 2: la mira se va para arriba. Con retroceso 0 no se mueve nada.</p>`,lab:"retroceso"},
  {type:"quiz",kicker:"Pregunta",q:"Subís recuperacion de 8 a 25. ¿Qué cambia?",options:["La mira vuelve a su lugar mucho más rápido","Dispara más rápido","Sube más la mira","Nada"],answer:0,explain:"recuperacion multiplica a delta dentro del lerp: cuanto más alto, más rápido llega patada a 0."},
  {type:"quiz",kicker:"Pregunta",q:"¿Por qué el retroceso se aplica a la cámara y no a la Cabeza?",options:["Porque la cabeza no se puede rotar","Para no pisar la rotación que hace el mouse en la Cabeza","Porque así dispara más fuerte","Da igual"],answer:1,explain:"La Cabeza guarda adónde mirás con el mouse. La cámara, que es su hija, suma la patada encima sin borrar eso."}
 ]},
 {id:"a6",title:"Dianas con vida y el arma completa",sub:"recibir_danio, señales y el script final",xp:30,steps:[
  {type:"info",kicker:"Concepto",title:"Lo que recibe los tiros",html:`<p>Para que algo reciba tiros necesita una colisión (un <code class="i">StaticBody3D</code> o <code class="i">CharacterBody3D</code> con su <code class="i">CollisionShape3D</code>) y una función <code class="i">recibir_danio</code>. Esta es una diana:</p>
   <pre class="code">${hl(DIANA_GD)}</pre>
   <p><code class="i">queue_free()</code> borra el nodo de forma segura al final del frame. La señal <code class="i">destruida</code> le avisa al nivel, por ejemplo para sumar puntos o completar un objetivo de misión.</p>
   <p>Si a todos los enemigos los ponés en un <b>grupo</b> llamado <code class="i">enemigos</code> (Inspector → Nodo → Grupos), después podés contar cuántos quedan con <code class="i">get_tree().get_nodes_in_group("enemigos").size()</code>.</p>`},
  {type:"trace",kicker:"Paso a paso",title:"Tres tiros a la diana",html:`<p>Cada tiro hace 34 de daño. Mirá cómo baja la vida.</p>`,
   code:`func recibir_danio(cantidad: int):\n\tvida -= cantidad\n\tif vida <= 0:\n\t\tdestruida.emit()\n\t\tqueue_free()`,
   steps:[{line:0,say:"Primer tiro: el arma llama a recibir_danio(34).",vars:{vida:"100",cantidad:"34"}},
    {line:1,say:"100 - 34 = 66.",vars:{vida:"66"}},{line:2,say:"¿66 es menor o igual a 0? No. Termina la función."},
    {line:0,say:"Segundo tiro.",vars:{cantidad:"34"}},{line:1,say:"66 - 34 = 32.",vars:{vida:"32"}},{line:2,say:"¿32 es menor o igual a 0? No."},
    {line:0,say:"Tercer tiro."},{line:1,say:"32 - 34 = -2.",vars:{vida:"-2"}},{line:2,say:"¿-2 es menor o igual a 0? Sí. Entramos al if."},
    {line:3,say:"Avisamos al resto del juego que la diana cayó.",out:"señal destruida emitida"},{line:4,say:"La diana se borra del juego al terminar este frame."}]},
  {type:"quiz",kicker:"Pregunta",q:"¿Por qué el if dice vida <= 0 y no vida == 0?",options:["Es lo mismo","Porque la vida puede quedar en negativo (como -2) y con == 0 nunca moriría","Para que muera más rápido","Por error"],answer:1,explain:"El daño casi nunca deja la vida justo en 0. Con <= 0 se cubren los negativos."},
  {type:"info",kicker:"Repaso",title:"Tu arma completa",html:`<p>Todo lo de la unidad en un solo script: raycast, cadencia, munición, recarga y retroceso. Va en el nodo <b>Arma</b> que está dentro de la cámara. Acordate de crear las acciones <code class="i">disparar</code> y <code class="i">recargar</code> en el Mapa de entrada.</p><pre class="code">${hl(ARMA_COMPLETA_GD)}</pre>`},
  {type:"quiz",kicker:"Repaso",q:"Disparás pero el rayo nunca toca nada. ¿Qué revisás primero?",options:["El color del arma","Que el RayCast3D esté habilitado, que su target_position apunte a -Z y que los objetivos tengan CollisionShape3D","La música","El nombre del proyecto"],answer:1,explain:"Son las tres causas más comunes. Activá Depurar → Formas de colisión visibles para ver las colisiones mientras jugás."}
 ]}
];

const COURSES={
 cero:{key:"cero",next:"gds",tag:"GDScript · Nivel 0",title:"De 0 en programación",sub:"Lo más básico de lo básico: qué es una instrucción, un script, una función, qué es _ready() y qué es una variable.",lessons:CERO},
 gds:{key:"gds",next:"menu",tag:"GDScript · Nivel 1",title:"GDScript para juegos 3D",sub:"Variables, funciones, movimiento, teclado y física con ejemplos de juegos 3D.",lessons:GDS},
 menu:{key:"menu",next:"fps2",tag:"Curso FPS 3D · Unidad 1",title:"El menú principal",sub:"Menú plano, menú con fondo 3D cinematográfico, opciones y transición al nivel.",lessons:LESSONS},
 fps2:{key:"fps2",next:"fps3",tag:"Curso FPS 3D · Unidad 2",title:"El jugador",sub:"La escena del jugador, Mapa de entrada, mirar con el mouse, caminar, saltar, correr y agacharse.",lessons:FPS2},
 fps3:{key:"fps3",tag:"Curso FPS 3D · Unidad 3",title:"Armas y disparo",sub:"El arma en la escena, disparo con RayCast3D, cadencia, munición, recarga, retroceso y dianas con vida.",lessons:FPS3}
};

