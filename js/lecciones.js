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
 ["Tanques","Orugas, torreta que gira aparte y cañón."]];

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
  const lab={scene,cam,keys:!!def.keys,rebuild(){},tick(){},pl};
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
  const MS={k:0,t:0,state:"activa",start:false,log:"Misión iniciada."};
  const msReset=()=>{MS.k=0;MS.t=p.s;MS.state="activa";MS.log="Misión reiniciada.";TG.forEach(t=>{t.vida=100;t.down=false;t.timer=0})};
  let hud=null;
  const lab={scene,cam,keys:!!def.keys,tick(){},rebuild(){if(usesAmmo&&!A.started){A.ammo=Math.round(p.m);A.started=true}if(mode==="mision"&&!MS.start){MS.t=p.s;MS.start=true}}};
  lab.bind=el=>{el.style.touchAction="none";el.style.cursor="crosshair";
    hud=document.createElement("div");hud.className="hud";hud.innerHTML=`<div class="cross"></div>${usesAmmo?'<div class="ammo"></div>':""}${mode==="mision"?'<div class="obj"></div><div class="banner"></div>':""}<div class="hudmsg"></div>`;el.appendChild(hud);
    const aim=e=>{const b=el.getBoundingClientRect();const nx=(e.clientX-b.left)/b.width*2-1,ny=(e.clientY-b.top)/b.height*2-1;A.ty=-nx*.55;A.tp=-ny*.32};
    el.addEventListener("pointermove",aim);
    el.addEventListener("pointerdown",e=>{aim(e);A.down=true;A.pressed=true;try{el.setPointerCapture(e.pointerId)}catch(_){}});
    ["pointerup","pointercancel"].forEach(ev=>el.addEventListener(ev,()=>A.down=false))};
  function shoot(){
    if(mode==="mision"&&MS.state!=="activa")return;
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
      if(t.vida<=0){t.down=true;t.timer=mode==="mision"?4:2.5;
        if(mode==="mision"){MS.k++;MS.log=`destruida.emit() → derribadas = ${MS.k}`;if(MS.k>=Math.round(p.n)){MS.state="cumplida";MS.log="Temporizador.stop() → completar_objetivo()";blip(1200)}}}
      A.last=`get_collider() = ${t.name}   distancia = ${h.distance.toFixed(1)} m\nget_collision_point() = ${P}\nrecibir_danio(${dmg}) → vida = ${Math.max(0,t.vida)}${t.vida<=0?"  ¡derribada!":""}`}
    else A.last=`get_collider() = ${t?t.name+" (caída)":"Pared"}   distancia = ${h.distance.toFixed(1)} m\nget_collision_point() = ${P}\nhas_method("recibir_danio") = false`;
  }
  lab.tick=dt=>{
    A.yaw+=(A.ty-A.yaw)*Math.min(1,dt*10);A.pitch+=(A.tp-A.pitch)*Math.min(1,dt*10);
    if(!A.can){A.cd-=dt;if(A.cd<=0)A.can=true}
    if(mode==="mision"){if(MS.state!=="activa"){if(A.pressed){A.pressed=false;msReset()}}
      else{MS.t-=dt;if(MS.t<=0){MS.t=0;MS.state="fallida";MS.log="timeout → fallar_mision()";blip(160)}}}
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
    if(mode==="mision"&&hud){const n=Math.round(p.n);
      hud.querySelector(".obj").innerHTML=MS.state==="activa"?`<b>Derribá ${n} dianas</b>${MS.k} / ${n}<small>${Math.ceil(MS.t)} s</small>`:"";
      const bn=hud.querySelector(".banner");bn.textContent=MS.state==="cumplida"?"MISIÓN CUMPLIDA":MS.state==="fallida"?"MISIÓN FALLIDA":"";
      bn.classList.toggle("on",MS.state!=="activa");bn.classList.toggle("bad",MS.state==="fallida");
      hud.querySelector(".hudmsg").textContent=MS.state!=="activa"?"Clic para volver a intentar":""}
    if(mode==="mision")readout(`derribadas = ${MS.k}   dianas_objetivo = ${Math.round(p.n)}   tiempo restante = ${MS.t.toFixed(1)} s
${MS.log}`);
    else if(mode==="tiro")readout(A.last);
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
/* =================== curso FPS 3D · Unidad 4: misiones =================== */
const GESTOR_GD = `extends Node
# Autoload: Proyecto → Configuración del proyecto → Globales → GestorMisiones

signal objetivo_cambiado(texto)
signal mision_completada
signal mision_fallada

var objetivos := [
	"Llegá al punto A",
	"Llegá al punto B",
	"Volvé a la base",
]
var actual := 0

func objetivo_actual() -> String:
	return objetivos[actual]

func completar_objetivo():
	actual += 1
	if actual >= objetivos.size():
		mision_completada.emit()
	else:
		objetivo_cambiado.emit(objetivos[actual])

func fallar_mision():
	mision_fallada.emit()`;

const HUD_MISION_GD = `extends CanvasLayer

@onready var texto: Label = $Objetivo
@onready var cartel: Label = $Cartel

func _ready():
	texto.text = GestorMisiones.objetivo_actual()
	GestorMisiones.objetivo_cambiado.connect(_on_objetivo_cambiado)
	GestorMisiones.mision_completada.connect(func(): mostrar_cartel("MISIÓN CUMPLIDA"))
	GestorMisiones.mision_fallada.connect(func(): mostrar_cartel("MISIÓN FALLIDA"))

func _on_objetivo_cambiado(nuevo: String):
	texto.text = nuevo

func mostrar_cartel(mensaje: String):
	cartel.text = mensaje
	cartel.modulate.a = 0.0
	cartel.show()
	var tween := create_tween()
	tween.tween_property(cartel, "modulate:a", 1.0, 0.5)`;

const GUARDAR_GD = `const RUTA := "user://progreso.cfg"

func guardar_mision_completada(id: String):
	var cfg := ConfigFile.new()
	cfg.load(RUTA)  # si todavía no existe, arranca vacío
	cfg.set_value("misiones", id, true)
	cfg.save(RUTA)

func mision_esta_completada(id: String) -> bool:
	var cfg := ConfigFile.new()
	if cfg.load(RUTA) != OK:
		return false
	return cfg.get_value("misiones", id, false)`;

const TREE_NIVEL_MISION = `<span class="t">Nivel1</span> <span class="m">(Node3D)</span>
├─ <span class="t">Jugador</span> <span class="m">(instancia de jugador.tscn, grupo "jugador")</span>
├─ <span class="t">ZonaA</span> <span class="m">(Area3D)</span>  <span class="m">← zona.gd</span>
│  └─ <span class="t">CollisionShape3D</span> <span class="m">(cilindro)</span>
├─ <span class="t">ZonaB</span> <span class="m">(Area3D)</span>  <span class="m">← zona.gd</span>
├─ <span class="t">Base</span> <span class="m">(Area3D)</span>  <span class="m">← zona.gd</span>
└─ <span class="t">HUD</span> <span class="m">(CanvasLayer)</span>  <span class="m">← hud_mision.gd</span>
   ├─ <span class="t">Objetivo</span> <span class="m">(Label)</span>
   └─ <span class="t">Cartel</span> <span class="m">(Label, oculto)</span>

<span class="m">Autoload (global):</span> <span class="t">GestorMisiones</span>  <span class="m">← gestor_misiones.gd</span>`;

Object.assign(LABS,{
 zonas:{code:`extends Area3D
# zona.gd: va en ZonaA, ZonaB y Base

func _ready():
	$CollisionShape3D.shape.radius = __r__
	body_entered.connect(_on_body_entered)

func _on_body_entered(body):
	if body.is_in_group("jugador"):
		GestorMisiones.completar_objetivo()
		queue_free()`,
  params:{r:{val:2,min:0.5,max:6,step:0.5}},fp:true,move:true,full:true,keys:true,zones:true,
  pad:[["KeyW","W ↑"],["KeyA","A ←"],["KeyS","S ↓"],["KeyD","D →"],["Space","Saltar"],["ShiftLeft","Correr"]],
  hint:"WASD para moverte, arrastrá para mirar. Seguí la columna de luz."},
 eliminar:{code:`extends Node
# mision_dianas.gd

@export var dianas_objetivo := __n__
@export var tiempo_limite := __s__
var derribadas := 0

func _ready():
	for diana in get_tree().get_nodes_in_group("dianas"):
		diana.destruida.connect(_on_diana_destruida)
	$Temporizador.timeout.connect(_on_tiempo_agotado)
	$Temporizador.start(tiempo_limite)

func _on_diana_destruida():
	derribadas += 1
	if derribadas >= dianas_objetivo:
		$Temporizador.stop()
		GestorMisiones.completar_objetivo()

func _on_tiempo_agotado():
	GestorMisiones.fallar_mision()`,
  params:{n:{val:5,min:1,max:20,step:1},s:{val:20,min:5,max:120,step:1}},range:"mision",
  hint:"Derribá las dianas antes de que se acabe el tiempo. Clic para disparar."}
});

function buildZoneLab(def,p,readout){
  p.v??=6;p.c??=10;p.j??=5;
  let fp="";const lab=buildFPLab(def,p,t=>fp=t),T=THREE,pl=lab.pl;
  const Z=[{n:"Punto A",x:9,z:-11,c:0x4f9fe0},{n:"Punto B",x:-11,z:-15,c:0xe3a75b},{n:"Base",x:0,z:4,c:0x41c283}];
  Z.forEach(z=>{const g=new T.Group();g.position.set(z.x,0,z.z);
    z.ring=new T.Mesh(new T.CylinderGeometry(1,1,.06,40),new T.MeshBasicMaterial({color:z.c,transparent:true,opacity:.45}));z.ring.position.y=.04;g.add(z.ring);
    z.col=new T.Mesh(new T.CylinderGeometry(.35,.35,14,16,1,true),new T.MeshBasicMaterial({color:z.c,transparent:true,opacity:.35,side:T.DoubleSide}));z.col.position.y=7;g.add(z.col);
    lab.scene.add(g);z.g=g});
  const M={i:0,state:"activa",log:["Misión iniciada. Objetivo 1: Llegá al punto A"],wait:0};
  let hud=null;const bind0=lab.bind;
  lab.bind=el=>{bind0(el);hud=document.createElement("div");hud.className="hud";hud.innerHTML='<div class="obj"></div><div class="banner"></div>';el.appendChild(hud)};
  const t0=lab.tick;
  lab.tick=dt=>{t0(dt);
    Z.forEach((z,k)=>{const s=p.r;z.ring.scale.set(s,1,s);const on=k===M.i&&M.state==="activa";z.g.visible=k>=M.i||M.state!=="activa";
      z.col.material.opacity=on?.35+.15*Math.sin(performance.now()/250):.1;z.ring.material.opacity=on?.5:.15});
    let d=0;
    if(M.state==="activa"){const z=Z[M.i];d=Math.hypot(pl.x-z.x,pl.z-z.z);
      if(d<p.r){blip(880);M.log.unshift(`body_entered(Jugador) en ${z.n} → completar_objetivo()`);M.i++;
        if(M.i>=Z.length){M.state="cumplida";M.wait=4;M.log.unshift("mision_completada.emit()");blip(1200)}
        else M.log.unshift(`objetivo_cambiado.emit("${M.i===1?"Llegá al punto B":"Volvé a la base"}")`)}}
    else{M.wait-=dt;if(M.wait<=0){M.i=0;M.state="activa";M.log=["Misión reiniciada."];Z.forEach(z=>z.g.visible=true)}}
    M.log.length=Math.min(M.log.length,4);
    if(hud){const txt=["Llegá al punto A","Llegá al punto B","Volvé a la base"][Math.min(M.i,2)];
      hud.querySelector(".obj").innerHTML=M.state==="activa"?`<b>Objetivo ${M.i+1}/3</b>${txt}<small>${d.toFixed(1)} m</small>`:"";
      const bn=hud.querySelector(".banner");bn.textContent=M.state==="cumplida"?"MISIÓN CUMPLIDA":"";bn.classList.toggle("on",M.state==="cumplida")}
    readout(`actual = ${Math.min(M.i,3)}   distancia al objetivo = ${d.toFixed(1)} m   radio = ${p.r}\n${M.log.join("\n")}`);
  };
  return lab;
}

const MIS=[
 {id:"m1",title:"¿Qué es una misión?",sub:"Objetivos, estados y un gestor global",xp:20,steps:[
  {type:"info",kicker:"Concepto",title:"Una lista de cosas para hacer",html:`<p>Una misión es una <b>lista de objetivos en orden</b>: "llegá al punto A", "derribá 5 enemigos", "volvé a la base". El juego tiene que saber en cuál vas, avisar cuando cumplís uno y decidir si la misión salió bien o mal.</p>
   <div class="flow"><div>Activa<small>hay un objetivo actual</small></div><b>→</b><div>Objetivo cumplido<small>pasa al siguiente</small></div><b>→</b><div class="hot">Misión cumplida<small>no quedan objetivos</small></div></div>
   <p>Además puede <b>fallar</b>: se acabó el tiempo, murió un aliado, te descubrieron.</p>
   <p>Para que todas las escenas sepan en qué misión estás, se usa un <b>Autoload</b>: un script que Godot carga una sola vez, al arrancar el juego, y que queda disponible desde cualquier lado con su nombre. Se crea en <b>Proyecto → Configuración del proyecto → Globales</b>.</p>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Para qué sirve un Autoload como GestorMisiones?",options:["Para que el juego cargue más rápido","Para tener un script único que cualquier escena puede usar, como GestorMisiones.completar_objetivo()","Para dibujar el mapa","Para guardar la música"],answer:1,explain:"Un Autoload vive durante todo el juego y se accede por su nombre desde cualquier script."},
  {type:"quiz",kicker:"Pregunta",q:"Cambiás de nivel con change_scene_to_file. ¿Qué pasa con el Autoload GestorMisiones?",options:["Se borra con el nivel","Sigue existiendo con sus datos, porque no es parte del nivel","Se duplica","Se reinicia solo"],answer:1,explain:"Los Autoloads están por fuera de la escena actual. Por eso son ideales para cosas que duran entre niveles: misión, puntaje, configuración."},
  {type:"quiz",kicker:"Pregunta",q:"¿Cuál de estos NO es un objetivo de misión típico?",options:["Llegar a un punto del mapa","Derribar 5 enemigos en 60 segundos","Proteger un vehículo hasta que llegue","Cambiar la resolución de la pantalla"],answer:3,explain:"La resolución es una opción del menú, no un objetivo del juego."}
 ]},
 {id:"m2",title:"Zonas con Area3D",sub:"Detectar cuando el jugador llega a un punto",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Un área invisible que avisa",html:`<p>Un <b>Area3D</b> es una zona invisible que no frena a nadie, pero detecta quién entra y quién sale. Emite la señal <code class="i">body_entered(body)</code> cuando un cuerpo entra.</p>
   <div class="tree">${TREE_NIVEL_MISION}</div>
   <p>Como también podría entrar un enemigo o una caja, se pregunta si el que entró es el jugador. Para eso el jugador tiene que estar en el grupo <code class="i">"jugador"</code> (Inspector → Nodo → Grupos).</p>
   <p>Al llegar, la zona le avisa al gestor y se borra con <code class="i">queue_free()</code>, así no se cuenta dos veces.</p>`},
  {type:"lab",kicker:"Laboratorio 3D",title:"Patrulla: A, B y vuelta a la base",html:`<p>Caminá hasta cada columna de luz, en orden. Arriba a la izquierda ves el objetivo actual y la distancia. Probá un <b>radio</b> de 0.5: hay que pararse justo encima. Con 6, alcanza con acercarse.</p>`,lab:"zonas"},
  {type:"quiz",kicker:"Pregunta",q:"¿Por qué se pregunta body.is_in_group(\"jugador\")?",options:["Porque body_entered solo funciona con grupos","Para que la zona no se cumpla si entra un enemigo, una caja o un vehículo vacío","Para que sea más rápido","No hace falta"],answer:1,explain:"body_entered avisa de cualquier cuerpo. El grupo filtra al que importa."},
  {type:"fill",kicker:"Completá",q:"Escuchar cuando algo entra en la zona:",code:`func _ready():\n\t____.connect(_on_body_entered)`,options:["body_entered","area_entered","pressed","timeout"],answer:0,explain:"body_entered es para cuerpos físicos, como el jugador. area_entered detecta otras áreas."},
  {type:"quiz",kicker:"Pregunta",q:"¿Por qué la zona hace queue_free() al cumplirse?",options:["Para liberar memoria de video","Para que no se vuelva a cumplir si el jugador sale y entra de nuevo","Porque Godot lo exige","Para que el jugador salte"],answer:1,explain:"Si la zona siguiera ahí, cada vez que pasás por encima volvería a llamar a completar_objetivo()."}
 ]},
 {id:"m3",title:"El gestor de misiones",sub:"Lista de objetivos, índice y señales",xp:25,steps:[
  {type:"info",kicker:"Código",title:"GestorMisiones",html:`<p>El gestor guarda la lista de objetivos y en cuál vas (<code class="i">actual</code>). Cuando alguien llama a <code class="i">completar_objetivo()</code>, avanza y emite una señal. No toca el HUD ni el nivel directamente: solo avisa, y el que quiera escuchar, escucha.</p><pre class="code">${hl(GESTOR_GD)}</pre>`},
  {type:"trace",kicker:"Paso a paso",title:"Cumplir los tres objetivos",html:`<p>Mirá cómo avanza <code class="i">actual</code> y qué señal se emite cada vez.</p>`,
   code:`func completar_objetivo():\n\tactual += 1\n\tif actual >= objetivos.size():\n\t\tmision_completada.emit()\n\telse:\n\t\tobjetivo_cambiado.emit(objetivos[actual])`,
   steps:[{line:0,say:"El jugador llegó al punto A. La zona llama a completar_objetivo().",vars:{actual:"0","objetivos.size()":"3"}},
    {line:1,say:"0 + 1 = 1.",vars:{actual:"1"}},{line:2,say:"¿1 es mayor o igual a 3? No."},
    {line:5,say:"objetivos[1] es \"Llegá al punto B\". El HUD escucha la señal y cambia el texto.",out:"objetivo_cambiado: Llegá al punto B"},
    {line:0,say:"Llegó al punto B."},{line:1,say:"1 + 1 = 2.",vars:{actual:"2"}},{line:2,say:"¿2 >= 3? No."},
    {line:5,say:"Siguiente objetivo.",out:"objetivo_cambiado: Volvé a la base"},
    {line:0,say:"Volvió a la base."},{line:1,say:"2 + 1 = 3.",vars:{actual:"3"}},{line:2,say:"¿3 >= 3? Sí: no quedan objetivos."},
    {line:3,say:"¡Misión cumplida!",out:"mision_completada"}]},
  {type:"quiz",kicker:"Pregunta",q:"objetivos tiene 3 elementos. ¿Cuál es el índice del último?",options:["3","2","1","0"],answer:1,explain:"Los índices empiezan en 0: 0, 1 y 2. Por eso cuando actual llega a 3 ya no quedan objetivos."},
  {type:"quiz",kicker:"Pregunta",q:"¿Por qué el gestor emite señales en vez de cambiar el texto del HUD directamente?",options:["Porque los Autoloads no pueden tocar nodos","Para que el gestor no dependa del HUD: cualquiera puede escuchar (HUD, música, sonidos) y el gestor no se entera","Porque es más rápido","Da igual"],answer:1,explain:"Con señales las piezas quedan separadas. Podés cambiar o sacar el HUD sin tocar el gestor."}
 ]},
 {id:"m4",title:"Objetivos con tiempo",sub:"Contar enemigos derribados y fallar con un Timer",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Eliminar antes de que se acabe el tiempo",html:`<p>Otro objetivo clásico: <b>"derribá 5 dianas en 20 segundos"</b>. Se arma con lo que ya sabés:</p>
   <ul><li>Las dianas están en el grupo <code class="i">"dianas"</code> y emiten <code class="i">destruida</code> al caer (lo viste en la Unidad 3).</li>
   <li>El script de la misión recorre el grupo con un <code class="i">for</code> y conecta la señal de cada una.</li>
   <li>Un nodo <code class="i">Timer</code> cuenta el tiempo. Si llega a cero antes de tiempo, emite <code class="i">timeout</code> y la misión falla.</li></ul>`},
  {type:"lab",kicker:"Laboratorio 3D",title:"Contra reloj",html:`<p>Derribá las dianas antes de que se acabe el tiempo. Cada una cae con tres tiros. Probá <b>dianas_objetivo</b> 10 con <b>tiempo_limite</b> 10 para ver cómo falla. Hacé clic para volver a empezar.</p>`,lab:"eliminar"},
  {type:"fill",kicker:"Completá",q:"Arrancar el temporizador con el tiempo límite:",code:`$Temporizador.____(tiempo_limite)`,options:["start","play","run","begin"],answer:0,explain:"Timer.start(segundos) arranca la cuenta. timeout se emite cuando llega a cero."},
  {type:"quiz",kicker:"Pregunta",q:"Derribás la última diana. ¿Por qué se llama $Temporizador.stop()?",options:["Para que el tiempo siga","Para que el timeout no llegue después y haga fallar una misión que ya cumpliste","Para cerrar el juego","No hace falta"],answer:1,explain:"Si el Timer sigue corriendo, al terminar llamaría a fallar_mision() aunque ya ganaste."}
 ]},
 {id:"m5",title:"HUD de misión",sub:"Objetivo en pantalla y cartel con Tween",xp:25,steps:[
  {type:"info",kicker:"Código",title:"El HUD escucha al gestor",html:`<p>El HUD es un <code class="i">CanvasLayer</code> (como el menú de la Unidad 1) con dos Label: el objetivo actual y un cartel grande, oculto al principio. En <code class="i">_ready()</code> se conecta a las señales del gestor:</p><pre class="code">${hl(HUD_MISION_GD)}</pre>
   <p><code class="i">func(): mostrar_cartel("…")</code> es una <b>función anónima</b>: una función sin nombre, escrita en el lugar. Sirve cuando la conexión es cortita y no vale la pena crear otra función aparte.</p>
   <p>El Tween anima <code class="i">modulate:a</code> de 0 a 1, igual que el fundido del menú: el cartel aparece de a poco.</p>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué hace texto.text = GestorMisiones.objetivo_actual() en _ready()?",options:["Nada","Muestra el primer objetivo apenas aparece el HUD, antes de que llegue cualquier señal","Completa la misión","Borra el texto"],answer:1,explain:"objetivo_cambiado recién se emite cuando cumplís el primero. Sin esta línea, el HUD arrancaría vacío."},
  {type:"fill",kicker:"Completá",q:"Que el cartel aparezca de a poco en medio segundo:",code:`var tween := create_tween()\ntween.tween_property(cartel, "____", 1.0, 0.5)`,options:["modulate:a","position","text","visible"],answer:0,explain:"modulate:a es la transparencia del nodo: 0 invisible, 1 totalmente visible."},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué es func(): mostrar_cartel(\"MISIÓN CUMPLIDA\")?",options:["Un error de sintaxis","Una función anónima: una función sin nombre escrita directamente donde se usa","Un comentario","Una variable"],answer:1,explain:"Las funciones anónimas (lambdas) son prácticas para conexiones cortas de señales."}
 ]},
 {id:"m6",title:"Guardar el progreso",sub:"ConfigFile y la carpeta user://",xp:30,steps:[
  {type:"info",kicker:"Concepto",title:"Que el juego se acuerde",html:`<p>Si el jugador cierra el juego, las variables se pierden. Para recordar qué misiones completó, se guardan en un archivo dentro de <code class="i">user://</code>, una carpeta privada del juego en la computadora del jugador. En Windows queda en <code class="i">%APPDATA%\\Godot\\app_userdata\\TuJuego</code>.</p>
   <p><code class="i">ConfigFile</code> guarda datos en secciones y claves, como una libreta ordenada:</p><pre class="code">${hl(GUARDAR_GD)}</pre>
   <p>Así, en el menú de misiones, podés mostrar un tilde verde en las que ya están hechas.</p>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Por qué se guarda en user:// y no en res://?",options:["Porque res:// es más lento","Porque res:// son los archivos del juego y, una vez exportado, son de solo lectura. user:// es donde el juego puede escribir","Porque user:// es más lindo","Da igual"],answer:1,explain:"En el juego exportado no se puede escribir en res://. Partidas y configuraciones van siempre en user://."},
  {type:"fill",kicker:"Completá",q:"Leer si la misión está completada, con false si no existe el dato:",code:`return cfg.____("misiones", id, false)`,options:["get_value","set_value","load","save"],answer:0,explain:"get_value(sección, clave, por_defecto) devuelve el valor guardado o el valor por defecto."},
  {type:"quiz",kicker:"Repaso",q:"El jugador llega a la zona pero no pasa nada. ¿Qué revisás?",options:["Que el Area3D tenga CollisionShape3D, que el jugador esté en el grupo \"jugador\" y que la señal esté conectada","El volumen","La sensibilidad del mouse","El color de la zona"],answer:0,explain:"Son las tres causas más comunes. Con Depurar → Formas de colisión visibles ves el área mientras jugás."},
  {type:"info",kicker:"¡Unidad completa!",title:"Ya tenés misiones",html:`<p>Ya sabés armar misiones con objetivos en orden, zonas, objetivos contra reloj, HUD y guardado. En las próximas unidades vas a sumar vehículos (autos, aviones y tanques) y a usarlos dentro de estas mismas misiones: "llegá a la base en el jeep", "destruí 3 tanques", "aterrizá en la pista".</p>`}
 ]}
];
/* =================== curso FPS 3D · Unidad 5: mapas y mundo abierto =================== */
const BOSQUE_GD = `extends MultiMeshInstance3D

@export var cantidad := 2000
@export var tamanio_mapa := 120.0
@export var nivel_agua := 1.0
@export var terreno: Node3D   # el que sabe la altura de cada punto

func _ready():
	multimesh.instance_count = cantidad
	var colocados := 0
	for i in range(cantidad):
		var x := randf_range(-tamanio_mapa / 2, tamanio_mapa / 2)
		var z := randf_range(-tamanio_mapa / 2, tamanio_mapa / 2)
		var y: float = terreno.altura_en(x, z)
		if y < nivel_agua:
			continue   # no plantar árboles en el agua
		var t := Transform3D()
		t = t.rotated(Vector3.UP, randf() * TAU)
		t = t.scaled(Vector3.ONE * randf_range(0.7, 1.4))
		t.origin = Vector3(x, y, z)
		multimesh.set_instance_transform(colocados, t)
		colocados += 1
	multimesh.visible_instance_count = colocados`;

const ZONAS_GD = `# cargador_zonas.gd: carga la próxima zona sin congelar el juego
var ruta_siguiente := "res://zonas/aldea.tscn"

func empezar_carga():
	ResourceLoader.load_threaded_request(ruta_siguiente)

func _process(delta):
	var estado := ResourceLoader.load_threaded_get_status(ruta_siguiente)
	if estado == ResourceLoader.THREAD_LOAD_LOADED:
		var escena: PackedScene = ResourceLoader.load_threaded_get(ruta_siguiente)
		get_tree().change_scene_to_packed(escena)`;

Object.assign(LABS,{
 terreno:{code:`extends Node3D
# genera un heightmap con ruido

@export var semilla := __s__
@export var frecuencia := __f__
@export var altura_max := __a__

func altura_en(x: float, z: float) -> float:
	var ruido := FastNoiseLite.new()
	ruido.seed = semilla
	ruido.frequency = frecuencia
	ruido.fractal_octaves = 4
	# get_noise_2d devuelve de -1 a 1
	return (ruido.get_noise_2d(x, z) + 1.0) / 2.0 * altura_max`,
  params:{s:{val:7,min:0,max:999,step:1},f:{val:0.02,min:0.003,max:0.08,step:0.001},a:{val:18,min:0,max:45,step:1}},map:"terreno",
  hint:"Arrastrá para girar la vista. Cambiá la semilla para otro mapa."},
 bosque:{code:`extends MultiMeshInstance3D

@export var cantidad := __n__
@export var nivel_agua := __w__

func _ready():
	multimesh.instance_count = cantidad
	for i in range(cantidad):
		var x := randf_range(-60, 60)
		var z := randf_range(-60, 60)
		var y: float = terreno.altura_en(x, z)
		if y < nivel_agua:
			continue
		# ... rotación y escala al azar, después:
		multimesh.set_instance_transform(i, t)`,
  params:{n:{val:1500,min:0,max:6000,step:100},w:{val:2,min:0,max:15,step:0.5}},map:"bosque",
  hint:"Arrastrá para girar. Subí el agua y mirá cómo desaparecen árboles."},
 clima:{code:`extends Node3D
# Dentro del WorldEnvironment y la luz del sol

@onready var entorno: Environment = $WorldEnvironment.environment
@onready var sol: DirectionalLight3D = $Sol

func _ready():
	sol.rotation_degrees.x = -__h__      # altura del sol en grados
	entorno.fog_enabled = true
	entorno.fog_density = __d__
	entorno.volumetric_fog_enabled = true`,
  params:{h:{val:12,min:-10,max:80,step:1},d:{val:0.02,min:0,max:0.12,step:0.005}},map:"clima",
  hint:"Probá el sol en 3° con niebla 0.06: amanecer en el bosque."}
});

function valueNoise(seed){
  const h=(x,y)=>{let n=x*374761393+y*668265263+seed*1442695041;n=(n^(n>>>13))*1274126177;n=n^(n>>>16);return (n&0xffff)/0xffff};
  const sm=t=>t*t*(3-2*t);
  const n2=(x,y)=>{const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi;
    const a=h(xi,yi),b=h(xi+1,yi),c=h(xi,yi+1),d=h(xi+1,yi+1),u=sm(xf),v=sm(yf);
    return (a+(b-a)*u)+((c+(d-c)*u)-(a+(b-a)*u))*v};
  return (x,y,f)=>{let s=0,amp=1,tot=0,fr=f;for(let o=0;o<4;o++){s+=n2(x*fr,y*fr)*amp;tot+=amp;amp*=.5;fr*=2}return s/tot};
}

function buildMapLab(def,p,readout){
  const T=THREE,mode=def.map,scene=new T.Scene();
  const cam=new T.PerspectiveCamera(55,16/9,.5,600);
  const hemi=new T.HemisphereLight(0xdfe8f0,0x3b4434,.7);scene.add(hemi);
  const sun=new T.DirectionalLight(0xffffff,1);scene.add(sun);
  const SIZE=120,SEG=90;
  const geo=new T.PlaneGeometry(SIZE,SIZE,SEG,SEG);geo.rotateX(-Math.PI/2);
  const cols=new Float32Array(geo.attributes.position.count*3);geo.setAttribute("color",new T.BufferAttribute(cols,3));
  const terr=new T.Mesh(geo,new T.MeshStandardMaterial({vertexColors:true,flatShading:true,roughness:1}));scene.add(terr);
  const water=new T.Mesh(new T.PlaneGeometry(SIZE*1.4,SIZE*1.4),new T.MeshStandardMaterial({color:0x3e6a86,transparent:true,opacity:.82,roughness:.3}));water.rotation.x=-Math.PI/2;scene.add(water);
  const S={seed:7,f:.02,a:18,water:2,hfn:null,min:0,max:0};
  if(mode!=="terreno"){S.seed=7;S.f=.02;S.a=18}
  const C=(r,g,b)=>new T.Color(r,g,b);
  const cWater=C(.55,.5,.38),cGrass=C(.33,.42,.24),cDark=C(.22,.3,.18),cRock=C(.42,.41,.39),cSnow=C(.92,.93,.95);
  function regenTerrain(){
    const nz=valueNoise(Math.round(S.seed)),pos=geo.attributes.position;S.min=1e9;S.max=-1e9;
    S.hfn=(x,z)=>Math.max(0,Math.min(1,(nz(x+500,z+500,S.f)-.2)/.6))*S.a;
    for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i);let y=S.hfn(x,z);
      const edge=Math.max(Math.abs(x),Math.abs(z))/(SIZE/2);if(edge>.85)y*=1-(edge-.85)/.15*.6;
      pos.setY(i,y);S.min=Math.min(S.min,y);S.max=Math.max(S.max,y);
      const k=S.a>0?y/S.a:0,c=new T.Color();
      if(y<S.water+.4)c.copy(cWater);else if(k<.45)c.copy(cGrass).lerp(cDark,k/.45);else if(k<.72)c.copy(cDark).lerp(cRock,(k-.45)/.27);else c.copy(cRock).lerp(cSnow,Math.min(1,(k-.72)/.15));
      cols[i*3]=c.r;cols[i*3+1]=c.g;cols[i*3+2]=c.b}
    pos.needsUpdate=true;geo.attributes.color.needsUpdate=true;geo.computeVertexNormals();water.position.y=S.water}
  // bosque
  const MAXT=6000,trunkG=new T.CylinderGeometry(.12,.18,1.2,5),leafG=new T.ConeGeometry(.9,3.2,6);leafG.translate(0,2.6,0);trunkG.translate(0,.6,0);
  const trunks=new T.InstancedMesh(trunkG,new T.MeshStandardMaterial({color:0x5a4330,flatShading:true}),MAXT);
  const leaves=new T.InstancedMesh(leafG,new T.MeshStandardMaterial({color:0x2f4a2c,flatShading:true}),MAXT);
  trunks.count=0;leaves.count=0;if(mode!=="terreno"){scene.add(trunks);scene.add(leaves)}
  let placed=0,skipped=0;
  function scatter(n){let r=1234567;const rnd=()=>(r=(r*16807)%2147483647)/2147483647;
    const m=new T.Matrix4(),q=new T.Quaternion(),e=new T.Euler(),sc=new T.Vector3(),ps=new T.Vector3();placed=0;skipped=0;
    for(let i=0;i<n;i++){const x=(rnd()-.5)*SIZE*.92,z=(rnd()-.5)*SIZE*.92,y=S.hfn(x,z),k=S.a>0?y/S.a:0;
      if(y<S.water+.3||k>.7){skipped++;continue}
      e.set(0,rnd()*Math.PI*2,0);q.setFromEuler(e);const s=.7+rnd()*.7;sc.set(s,s*(.85+rnd()*.4),s);ps.set(x,y-.1,z);m.compose(ps,q,sc);
      trunks.setMatrixAt(placed,m);leaves.setMatrixAt(placed,m);placed++}
    trunks.count=placed;leaves.count=placed;trunks.instanceMatrix.needsUpdate=true;leaves.instanceMatrix.needsUpdate=true}
  // clima
  function sky(h,d){const t=Math.max(-10,Math.min(80,h));
    const night=C(.04,.06,.12),dawn=C(.95,.62,.42),day=C(.62,.76,.9),col=new T.Color();
    if(t<0)col.copy(night).lerp(dawn,(t+10)/10);else if(t<15)col.copy(dawn).lerp(day,t/15);else col.copy(day);
    scene.background=col.clone();scene.fog=d>0?new T.FogExp2(col.clone().lerp(C(.75,.78,.8),.3),d):null;
    const r=t*Math.PI/180;sun.position.set(Math.cos(r)*-80,Math.sin(r)*120+1,-40);
    sun.intensity=Math.max(0,Math.min(1.1,(t+3)/12));sun.color.copy(t<12?C(1,.72,.5):C(1,.97,.9));hemi.intensity=.18+Math.max(0,Math.min(.6,(t+8)/30))}
  const V={yaw:.6,pitch:.5,auto:true,drag:null};
  const lab={scene,cam,keys:false,tick(){},rebuild(){}};
  lab.rebuild=()=>{
    if(mode==="terreno"){S.seed=p.s;S.f=p.f;S.a=p.a}
    if(mode==="bosque")S.water=p.w;
    regenTerrain();if(mode!=="terreno")scatter(Math.round(p.n??2500));
    sky(mode==="clima"?p.h:35,mode==="clima"?p.d:.004)};
  lab.bind=el=>{el.style.touchAction="none";el.style.cursor="grab";
    el.addEventListener("pointerdown",e=>{V.drag={x:e.clientX,y:e.clientY};V.auto=false;try{el.setPointerCapture(e.pointerId)}catch(_){}});
    el.addEventListener("pointermove",e=>{if(!V.drag)return;V.yaw-=(e.clientX-V.drag.x)*.006;V.pitch=Math.max(.12,Math.min(1.25,V.pitch+(e.clientY-V.drag.y)*.004));V.drag={x:e.clientX,y:e.clientY}});
    ["pointerup","pointercancel"].forEach(ev=>el.addEventListener(ev,()=>V.drag=null))};
  lab.tick=dt=>{if(V.auto)V.yaw+=dt*.12;const R=mode==="clima"?95:110;
    cam.position.set(Math.sin(V.yaw)*Math.cos(V.pitch)*R,Math.sin(V.pitch)*R+5,Math.cos(V.yaw)*Math.cos(V.pitch)*R);cam.lookAt(0,4,0);
    if(mode==="terreno")readout(`semilla = ${Math.round(p.s)}   frecuencia = ${p.f}   altura_max = ${p.a}\nalturas: mínima ${S.min.toFixed(1)} m · máxima ${S.max.toFixed(1)} m · ${geo.attributes.position.count} vértices`);
    else if(mode==="bosque")readout(`árboles colocados: ${placed}   descartados (agua o cumbre): ${skipped}\nllamadas de dibujo con MultiMesh: 2   sin MultiMesh: ${placed*2}`);
    else readout(`sol a ${p.h}° · ${p.h<0?"noche":p.h<8?"amanecer":p.h<20?"mañana":"mediodía"}\nfog_density = ${p.d}   se ve hasta ≈ ${p.d>0?Math.round(3/p.d)+" m":"el horizonte"}`)};
  return lab;
}

const MAPA=[
 {id:"p1",title:"Diseñar el mapa",sub:"Papel, puntos de interés y blockout",xp:20,steps:[
  {type:"info",kicker:"Concepto",title:"Primero el plano, después el detalle",html:`<p>Los mapas de juegos como Road to Vostok se sienten reales porque cada lugar tiene un motivo: un puesto de control en el cruce de caminos, una aldea junto al río, un búnker escondido en el bosque. Antes de abrir Godot, dibujá el mapa en papel:</p>
   <ul><li><b>Puntos de interés</b>: lugares que el jugador quiere visitar (botín, misiones, refugio).</li>
   <li><b>Rutas</b>: caminos, senderos y ríos que los conectan. Que haya más de una forma de llegar.</li>
   <li><b>Zonas de peligro</b>: lugares abiertos y expuestos frente a lugares con cobertura.</li>
   <li><b>Límites naturales</b>: montañas, agua o alambrados para que el jugador no se salga del mapa.</li></ul>
   <p>Después armás todo con cajas grises (<b>blockout</b>) y lo caminás con tu jugador FPS. Si es aburrido o muy grande con cajas, también lo va a ser con árboles lindos.</p>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué es un blockout?",options:["El mapa terminado con texturas","Una versión del mapa hecha con formas simples para probar tamaños y recorridos antes de poner el detalle","Un error de Godot","Un tipo de luz"],answer:1,explain:"Con cajas grises probás distancias, escondites y tiempos de recorrido sin perder horas en detalles."},
  {type:"quiz",kicker:"Pregunta",q:"¿Por qué conviene que haya más de un camino a cada punto de interés?",options:["Para gastar más memoria","Para que el jugador elija cómo acercarse: sigiloso por el bosque o rápido por la ruta","Porque Godot lo pide","No conviene"],answer:1,explain:"Las elecciones hacen que el mapa se sienta vivo y que cada partida sea distinta."}
 ]},
 {id:"p2",title:"Terreno con heightmap",sub:"Alturas con ruido: FastNoiseLite",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Un mapa de alturas",html:`<p>Un terreno es una malla gigante donde cada punto tiene una altura. Esas alturas se guardan en un <b>heightmap</b>: una imagen en blanco y negro donde blanco es alto y negro es bajo.</p>
   <p>Para esculpir a mano se usa un plugin gratis de la AssetLib: <b>Terrain3D</b> o <b>HTerrain</b>. Pintás montañas con pincel y después texturas de pasto, tierra y roca.</p>
   <p>Para empezar más rápido podés <b>generar</b> las alturas con ruido. <code class="i">FastNoiseLite</code> viene en Godot y da valores que suben y bajan suave, como colinas:</p>
   <ul><li><b>semilla</b>: el mismo número da siempre el mismo mapa.</li>
   <li><b>frecuencia</b>: baja da colinas anchas, alta da terreno picado.</li>
   <li><b>octavas</b>: suman detalles chicos encima de las formas grandes.</li></ul>`},
  {type:"lab",kicker:"Laboratorio 3D",title:"Generá tu terreno",html:`<p>Cambiá la <b>semilla</b> para otro mapa, la <b>frecuencia</b> para colinas más anchas o más picadas y la <b>altura_max</b> para llanura o montaña. Los colores salen de la altura: pasto abajo, roca arriba y nieve en las cumbres.</p>`,lab:"terreno"},
  {type:"quiz",kicker:"Pregunta",q:"Querés colinas anchas y suaves, como un campo nórdico. ¿Qué hacés con la frecuencia?",options:["La subo","La bajo","La dejo en 0","No importa"],answer:1,explain:"Frecuencia baja: las subidas y bajadas están más separadas."},
  {type:"quiz",kicker:"Pregunta",q:"¿Para qué sirve la semilla?",options:["Para plantar árboles","Para que el mismo número genere siempre el mismo terreno, y otro número uno distinto","Para el agua","Para la música"],answer:1,explain:"El ruido es pseudoaleatorio: con la misma semilla se repite exacto. Así todos los jugadores ven el mismo mapa."}
 ]},
 {id:"p3",title:"Bosques con MultiMesh",sub:"Miles de árboles sin trabar el juego",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Una sola orden para miles de árboles",html:`<p>Si ponés 3000 árboles como nodos separados, la placa de video recibe 3000 órdenes de dibujo por frame y el juego se traba. <code class="i">MultiMeshInstance3D</code> dibuja <b>todas las copias del mismo modelo en una sola orden</b>.</p>
   <p>Cada copia solo guarda su <code class="i">Transform3D</code>: posición, rotación y escala. Con rotación y tamaño al azar, nadie nota que es el mismo pino.</p>
   <pre class="code">${hl(BOSQUE_GD)}</pre>
   <p>Para pintar vegetación a mano en el editor existen plugins como <b>ProtonScatter</b> o <b>Spatial Gardener</b>, que usan esta misma técnica.</p>`},
  {type:"lab",kicker:"Laboratorio 3D",title:"Plantá un bosque",html:`<p>Subí la <b>cantidad</b> a 6000 y mirá que siguen siendo 2 llamadas de dibujo (troncos y copas). Subí el <b>nivel_agua</b>: los árboles que quedarían bajo el agua no se plantan.</p>`,lab:"bosque"},
  {type:"fill",kicker:"Completá",q:"Ubicar la copia número i:",code:`multimesh.____(i, t)`,options:["set_instance_transform","add_child","instantiate","set_position"],answer:0,explain:"set_instance_transform le da a la copia i su posición, rotación y escala."},
  {type:"quiz",kicker:"Pregunta",q:"¿Por qué cada árbol recibe una rotación y escala al azar?",options:["Para que se caigan","Para que no se note que son copias del mismo modelo","Porque es obligatorio","Para que pesen menos"],answer:1,explain:"La variación rompe la repetición. Mezclar 3 o 4 modelos distintos ayuda todavía más."},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué hace continue dentro del for?",options:["Termina el for","Saltea esa vuelta y pasa a la siguiente, sin plantar ese árbol","Repite la vuelta","Cierra el juego"],answer:1,explain:"continue salta al próximo i. break, en cambio, terminaría el for entero."}
 ]},
 {id:"p4",title:"Luz, niebla y hora del día",sub:"WorldEnvironment para el clima opresivo",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"La atmósfera hace el mapa",html:`<p>El mismo bosque puede verse alegre o amenazante solo cambiando la luz. En el <b>WorldEnvironment</b> y la <b>DirectionalLight3D</b> (el sol) se configura casi todo:</p>
   <ul><li><b>Altura del sol</b>: bajo (amanecer, atardecer) da sombras largas y luz naranja.</li>
   <li><b>Niebla</b> (<code class="i">fog_density</code>): esconde lo lejano, da profundidad y miedo a lo que no ves. Además ayuda al rendimiento, porque lo que no se ve no hace falta dibujarlo con detalle.</li>
   <li><b>Niebla volumétrica</b>: los rayos de luz entre los árboles.</li>
   <li><b>SDFGI</b>: la luz rebota en el terreno y las paredes.</li>
   <li><b>Ajustes de color</b> (Adjustments): bajar la saturación da ese look frío de la zona fronteriza.</li></ul>`},
  {type:"lab",kicker:"Laboratorio 3D",title:"Cambiá el clima",html:`<p>Mové la <b>altura del sol</b> entre -10 (noche) y 80 (mediodía) y la <b>niebla</b> entre 0 y 0.12. Buscá la combinación más tensa para una misión de infiltración.</p>`,lab:"clima"},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué efecto da una niebla densa en un FPS?",options:["Más velocidad de disparo","Tensión: no ves quién está lejos. Y además ahorra trabajo de dibujo","Más munición","Ninguno"],answer:1,explain:"La niebla cambia cómo se juega: obliga a acercarse y moverse con cuidado."},
  {type:"fill",kicker:"Completá",q:"Activar la niebla del entorno:",code:`entorno.____ = true`,options:["fog_enabled","fog_visible","niebla","fog_on"],answer:0,explain:"La propiedad es fog_enabled. La densidad se ajusta con fog_density."}
 ]},
 {id:"p5",title:"Rendimiento en mapas grandes",sub:"LOD, visibility range, occlusion y zonas",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Dibujar solo lo que hace falta",html:`<ul><li><b>LOD</b> (nivel de detalle): un árbol lejano se dibuja con menos triángulos. Godot 4 genera los LOD solo al importar los modelos.</li>
   <li><b>Visibility Range</b> (en cada MeshInstance3D): a partir de cierta distancia el objeto deja de dibujarse. Ideal para piedritas y pasto.</li>
   <li><b>Occlusion culling</b>: con un <code class="i">OccluderInstance3D</code>, Godot no dibuja lo que está detrás de una colina o de un edificio.</li>
   <li><b>Zonas</b>: en vez de un mapa gigante, varias zonas conectadas. Al llegar al borde, se carga la siguiente en segundo plano.</li></ul>
   <pre class="code">${hl(ZONAS_GD)}</pre>`},
  {type:"quiz",kicker:"Pregunta",q:"Las piedritas del suelo se ven a 2 km y el juego anda lento. ¿Qué ajustás primero?",options:["El Visibility Range de las piedritas, para que no se dibujen lejos","La música","El tamaño de la ventana","El nombre del nodo"],answer:0,explain:"Visibility Range End corta el dibujo a partir de cierta distancia. Las piedritas lejanas no aportan nada."},
  {type:"quiz",kicker:"Pregunta",q:"¿Para qué sirve load_threaded_request?",options:["Para borrar escenas","Para cargar la próxima zona en segundo plano, sin congelar el juego","Para guardar la partida","Para disparar"],answer:1,explain:"La carga sigue mientras jugás. Cuando el estado es LOADED, cambiás de escena al instante."},
  {type:"fill",kicker:"Completá",q:"Cambiar a una escena ya cargada:",code:`get_tree().____(escena)`,options:["change_scene_to_packed","change_scene_to_file","load","instantiate"],answer:0,explain:"change_scene_to_packed usa un PackedScene que ya tenés en memoria. change_scene_to_file recibe una ruta y carga en el momento."}
 ]},
 {id:"p6",title:"Repaso: tu primera zona",sub:"Lista de pasos para armar un mapa",xp:30,steps:[
  {type:"info",kicker:"Receta",title:"Cómo armar tu primera zona",html:`<div class="flow"><div>1. Plano<small>papel: puntos de interés y rutas</small></div><b>→</b><div>2. Blockout<small>cajas grises, caminarlo</small></div><b>→</b><div>3. Terreno<small>Terrain3D o ruido</small></div></div>
   <div class="flow"><div>4. Vegetación<small>MultiMesh con variación</small></div><b>→</b><div>5. Atmósfera<small>sol, niebla, color</small></div><b>→</b><div class="hot">6. Optimizar<small>LOD, rangos, oclusión</small></div></div>
   <p>Para modelos, texturas y cielos realistas y gratuitos, <b>Poly Haven</b> tiene todo con licencia libre (CC0). Revisá siempre la licencia de cada recurso que uses.</p>`},
  {type:"quiz",kicker:"Repaso",q:"¿En qué orden conviene trabajar?",options:["Detalles primero y después el plano","Plano, blockout, terreno, vegetación, atmósfera y optimización","Optimizar antes de tener nada","Da igual"],answer:1,explain:"Primero se prueba que el mapa sea divertido. El detalle y la optimización vienen después."},
  {type:"quiz",kicker:"Repaso",q:"Tu bosque tiene 5000 pinos como nodos sueltos y el juego va a 15 FPS. ¿Qué cambiás?",options:["Los paso a un MultiMeshInstance3D","Subo la niebla a 0","Agrego más luces","Le saco el sonido"],answer:0,explain:"Con MultiMesh, los 5000 pinos pasan a ser una sola orden de dibujo."}
 ]}
];
/* =================== GDScript · Nivel 2: intermedio =================== */
const ARMA_BASE_GD = `# arma.gd
class_name Arma
extends Node3D

@export var nombre := "Arma"
@export var danio := 10
var balas := 0

func disparar():
	if balas <= 0:
		print(nombre, ": sin balas")
		return
	balas -= 1
	print(nombre, " dispara y hace ", danio, " de daño")`;

const ESCOPETA_GD = `# escopeta.gd
class_name Escopeta
extends Arma

@export var perdigones := 8

func disparar():
	super()   # primero hace todo lo de Arma.disparar()
	print("…y suelta ", perdigones, " perdigones")`;

const DATOS_ARMA_GD = `# datos_arma.gd
class_name DatosArma
extends Resource

@export var nombre := "Rifle"
@export var danio := 34
@export var cadencia := 0.12
@export var cargador := 30
@export var modelo: PackedScene
@export var sonido: AudioStream`;

Object.assign(LABS,{
 estados:{code:`enum Estado { PATRULLA, PERSEGUIR, ATACAR }
var estado := Estado.PATRULLA
@export var distancia_vision := __v__
@export var distancia_ataque := __a__

func _physics_process(delta):
	var d := global_position.distance_to(jugador.global_position)
	match estado:
		Estado.PATRULLA:
			patrullar(delta)
			if d < distancia_vision:
				estado = Estado.PERSEGUIR
		Estado.PERSEGUIR:
			mover_hacia(jugador.global_position, delta)
			if d < distancia_ataque:
				estado = Estado.ATACAR
			elif d > distancia_vision * 1.5:
				estado = Estado.PATRULLA
		Estado.ATACAR:
			disparar()
			if d > distancia_ataque:
				estado = Estado.PERSEGUIR`,
  params:{v:{val:6,min:1,max:12,step:0.5},a:{val:2.5,min:0.5,max:6,step:0.5}},fsm:true,keys:true,
  pad:[["KeyW","W ↑"],["KeyA","A ←"],["KeyS","S ↓"],["KeyD","D →"]],
  hint:"Sos el soldado azul: movete con WASD y acercate al enemigo."}
});

function buildFSMLab(def,p,readout){
  const T=THREE,scene=new T.Scene();scene.background=new T.Color(0x1f2833);
  const cam=new T.PerspectiveCamera(45,16/9,.1,200);cam.position.set(0,22,14);cam.lookAt(0,0,0);
  scene.add(new T.HemisphereLight(0xffffff,0x334455,.9));const dl=new T.DirectionalLight(0xffffff,.6);dl.position.set(5,12,6);scene.add(dl);
  const floor=new T.Mesh(new T.PlaneGeometry(30,22),new T.MeshStandardMaterial({color:0x4a5a3f}));floor.rotation.x=-Math.PI/2;scene.add(floor);
  scene.add(new T.GridHelper(30,30,0x5c6b50,0x55644a));
  const mk=c=>{const g=new T.Group(),m=new T.MeshStandardMaterial({color:c,flatShading:true});
    const b=new T.Mesh(new T.CylinderGeometry(.45,.45,1.2,14),m);b.position.y=.6;g.add(b);
    const nose=new T.Mesh(new T.BoxGeometry(.25,.25,.6),new T.MeshStandardMaterial({color:0x222222}));nose.position.set(0,1,-.5);g.add(nose);scene.add(g);return {g,m}};
  const P=mk(0x4f9fe0),E=mk(0x41c283);P.g.position.set(-9,0,6);E.g.position.set(6,0,-4);
  const ring=(c)=>{const r=new T.Mesh(new T.RingGeometry(.96,1,64),new T.MeshBasicMaterial({color:c,transparent:true,opacity:.6,side:T.DoubleSide}));r.rotation.x=-Math.PI/2;r.position.y=.03;scene.add(r);return r};
  const rv=ring(0xe3a75b),ra=ring(0xe85a50);
  const WP=[[6,-4],[10,4],[0,6],[-4,-5]];WP.forEach(([x,z])=>{const m=new T.Mesh(new T.CylinderGeometry(.15,.15,.05,10),new T.MeshBasicMaterial({color:0x8e9cb1}));m.position.set(x,.03,z);scene.add(m)});
  const bullet=new T.Mesh(new T.SphereGeometry(.12,8,6),new T.MeshBasicMaterial({color:0xffd27a}));bullet.visible=false;scene.add(bullet);
  const NAMES=["PATRULLA","PERSEGUIR","ATACAR"],COL=[0x41c283,0xe3a75b,0xe85a50];
  const F={st:0,wp:1,cd:0,bt:0,log:["estado = PATRULLA"],hits:0};
  const lab={scene,cam,keys:true,rebuild(){},tick(){}};
  const moveTo=(g,x,z,sp,dt)=>{const dx=x-g.position.x,dz=z-g.position.z,d=Math.hypot(dx,dz);if(d<.01)return d;const s=Math.min(d,sp*dt);g.position.x+=dx/d*s;g.position.z+=dz/d*s;g.rotation.y=Math.atan2(-dx,-dz);return d};
  lab.tick=dt=>{
    let x=0,z=0;if(KEYS.has("KeyD")||KEYS.has("ArrowRight"))x+=1;if(KEYS.has("KeyA")||KEYS.has("ArrowLeft"))x-=1;if(KEYS.has("KeyS")||KEYS.has("ArrowDown"))z+=1;if(KEYS.has("KeyW")||KEYS.has("ArrowUp"))z-=1;
    const l=Math.hypot(x,z)||1;P.g.position.x=Math.max(-14,Math.min(14,P.g.position.x+x/l*5*dt));P.g.position.z=Math.max(-10,Math.min(10,P.g.position.z+z/l*5*dt));if(x||z)P.g.rotation.y=Math.atan2(-x,-z);
    const d=Math.hypot(P.g.position.x-E.g.position.x,P.g.position.z-E.g.position.z),prev=F.st;
    if(F.st===0){const w=WP[F.wp];if(moveTo(E.g,w[0],w[1],2.2,dt)<.2)F.wp=(F.wp+1)%WP.length;if(d<p.v)F.st=1}
    else if(F.st===1){moveTo(E.g,P.g.position.x,P.g.position.z,3.6,dt);if(d<p.a)F.st=2;else if(d>p.v*1.5)F.st=0}
    else{E.g.rotation.y=Math.atan2(-(P.g.position.x-E.g.position.x),-(P.g.position.z-E.g.position.z));F.cd-=dt;
      if(F.cd<=0){F.cd=.6;F.bt=.15;F.hits++;blip(180)}if(d>p.a)F.st=1}
    if(F.st!==prev){F.log.unshift(`${NAMES[prev]} → ${NAMES[F.st]}  (d = ${d.toFixed(1)})`);F.log.length=Math.min(F.log.length,3);blip(F.st===2?300:F.st===1?600:450)}
    E.m.color.setHex(COL[F.st]);
    rv.position.x=ra.position.x=E.g.position.x;rv.position.z=ra.position.z=E.g.position.z;rv.scale.set(p.v,p.v,1);ra.scale.set(p.a,p.a,1);
    if(F.bt>0){F.bt-=dt;bullet.visible=true;const k=1-F.bt/.15;bullet.position.set(E.g.position.x+(P.g.position.x-E.g.position.x)*k,1,E.g.position.z+(P.g.position.z-E.g.position.z)*k)}else bullet.visible=false;
    readout(`estado = Estado.${NAMES[F.st]}   distancia = ${d.toFixed(1)}   disparos recibidos: ${F.hits}\n${F.log.join("\n")}`)};
  return lab;
}

const GDS2=[
 {id:"h1",title:"Tipos estáticos",sub:"Decirle a Godot qué guarda cada variable",xp:20,steps:[
  {type:"info",kicker:"Concepto",title:"Avisar el tipo",html:`<p>Hasta ahora usaste <code class="i">:=</code> y Godot adivinaba el tipo. También podés escribirlo vos, con dos puntos:</p>
   <pre class="code">${hl(`var vida: int = 100\nvar velocidad: float = 6.0\nvar nombre: String = "Cabo Burro"\nvar objetivo: Node3D\n\nfunc calcular_danio(base: int, critico: bool) -> int:\n\treturn base * 2 if critico else base`)}</pre>
   <ul><li><code class="i">vida: int</code> dice que esa caja solo acepta números enteros.</li>
   <li><code class="i">-&gt; int</code> después de los paréntesis dice qué devuelve la función. <code class="i">-&gt; void</code> significa que no devuelve nada.</li></ul>
   <p>¿Para qué sirve? Godot te marca errores <b>antes</b> de jugar, el autocompletado funciona mejor y el código corre más rápido.</p>`},
  {type:"quiz",kicker:"¿Qué pasa?",q:"¿Qué pasa con este código?",code:`var balas: int = 30\n\nfunc _ready():\n\tbalas = "muchas"`,options:["balas pasa a valer \"muchas\"","Godot marca error: balas es int y \"muchas\" es texto","Imprime 30","No pasa nada"],answer:1,explain:"Con el tipo escrito, Godot no deja guardar texto en una caja de números. Encontrás el error antes de jugar."},
  {type:"fill",kicker:"Completá",q:"La función no devuelve nada:",code:`func recargar() -> ____:\n\tbalas = 30`,options:["void","null","int","nada"],answer:0,explain:"-> void indica que la función no tiene return con valor."},
  {type:"quiz",kicker:"Pregunta",q:"¿Cuál es la diferencia entre var x := 5 y var x: int = 5?",options:["Ninguna en el resultado: con := Godot deduce int y con : int lo escribís vos","La segunda es más lenta","La primera no se puede cambiar","La segunda es texto"],answer:0,explain:"Los dos quedan tipados como int. := es un atajo cuando el tipo es obvio por el valor."}
 ]},
 {id:"h2",title:"Diccionarios",sub:"Guardar datos con nombre: inventarios y estadísticas",xp:20,steps:[
  {type:"info",kicker:"Concepto",title:"Cajas con etiqueta dentro de una caja",html:`<p>Un <b>Array</b> guarda cosas en orden: [0], [1], [2]. Un <b>Dictionary</b> guarda cosas con <b>nombre</b> (clave → valor). Es perfecto para un inventario:</p>
   <pre class="code">${hl(`var inventario := {\n\t"balas_rifle": 90,\n\t"granadas": 2,\n\t"botiquines": 1,\n}\n\nfunc _ready():\n\tprint(inventario["granadas"])        # 2\n\tinventario["granadas"] -= 1\n\tinventario["llave_bunker"] = 1      # agrega una clave nueva\n\tif inventario.has("botiquines"):\n\t\tprint("Tenés botiquín")\n\tprint(inventario.get("raciones", 0))   # 0 si no existe\n\tfor objeto in inventario:\n\t\tprint(objeto, ": ", inventario[objeto])`)}</pre>`},
  {type:"trace",kicker:"Paso a paso",title:"Usar el inventario",html:`<p>Mirá cómo cambian los valores del diccionario.</p>`,
   code:`var inv := {"balas": 30, "granadas": 2}\n\nfunc _ready():\n\tinv["balas"] -= 5\n\tinv["botiquin"] = 1\n\tprint(inv.get("raciones", 0))\n\tprint(inv.size())`,
   steps:[{line:0,say:"Se crea el diccionario con dos claves.",vars:{'inv["balas"]':"30",'inv["granadas"]':"2"}},
    {line:2,say:"Godot llama a _ready."},{line:3,say:"Buscamos la clave balas y le restamos 5.",vars:{'inv["balas"]':"25"}},
    {line:4,say:"botiquin no existía: al asignarla se crea.",vars:{'inv["botiquin"]':"1"}},
    {line:5,say:"raciones no existe, así que get devuelve el valor por defecto: 0.",out:"0"},
    {line:6,say:"size() cuenta las claves: balas, granadas y botiquin.",out:"3"}]},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué pasa con inventario[\"cohetes\"] si esa clave no existe?",options:["Devuelve 0","Da error: la clave no existe. Por eso conviene usar get(\"cohetes\", 0) o has()","Crea la clave","Devuelve \"cohetes\""],answer:1,explain:"Leer con corchetes una clave que no existe da error. get con valor por defecto es la forma segura."},
  {type:"fill",kicker:"Completá",q:"¿Tiene la llave del búnker?",code:`if inventario.____("llave_bunker"):\n\tabrir_puerta()`,options:["has","get","size","find"],answer:0,explain:"has(clave) devuelve true si la clave está en el diccionario."}
 ]},
 {id:"h3",title:"enum y match",sub:"Nombres para opciones y elegir entre muchos caminos",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Opciones con nombre",html:`<p>Un <b>enum</b> crea una lista de opciones con nombre. Es mucho más claro que usar números sueltos:</p>
   <pre class="code">${hl(`enum TipoArma { PISTOLA, RIFLE, ESCOPETA, FRANCOTIRADOR }\nvar arma_actual := TipoArma.RIFLE`)}</pre>
   <p><code class="i">match</code> compara un valor con varias opciones y ejecuta solo la que coincide. Es como muchos <code class="i">if/elif</code>, pero más prolijo:</p>
   <pre class="code">${hl(`match arma_actual:\n\tTipoArma.PISTOLA:\n\t\tdanio = 20\n\tTipoArma.RIFLE:\n\t\tdanio = 34\n\tTipoArma.ESCOPETA, TipoArma.FRANCOTIRADOR:\n\t\tdanio = 90\n\t_:\n\t\tdanio = 10   # cualquier otro caso`)}</pre>
   <p><code class="i">_</code> es el comodín: se usa si ninguna opción coincidió.</p>`},
  {type:"quiz",kicker:"¿Qué imprime?",q:"¿Qué imprime?",code:`enum Vehiculo { AUTO, AVION, TANQUE }\nvar v := Vehiculo.TANQUE\n\nfunc _ready():\n\tmatch v:\n\t\tVehiculo.AUTO:\n\t\t\tprint("4 ruedas")\n\t\tVehiculo.AVION:\n\t\t\tprint("alas")\n\t\t_:\n\t\t\tprint("orugas")`,options:["4 ruedas","alas","orugas","Nada"],answer:2,explain:"TANQUE no está en ninguna opción, así que entra al comodín _."},
  {type:"quiz",kicker:"Pregunta",q:"Por dentro, ¿qué número vale Vehiculo.AVION?",options:["0","1","2","\"AVION\""],answer:1,explain:"Los enums numeran desde 0: AUTO = 0, AVION = 1, TANQUE = 2. Vos usás los nombres y te olvidás de los números."},
  {type:"fill",kicker:"Completá",q:"El caso para cualquier otro valor:",code:`match estado:\n\tEstado.QUIETO:\n\t\tpass\n\t____:\n\t\tprint("otro estado")`,options:["_","else","default","*"],answer:0,explain:"En GDScript el comodín de match es el guion bajo."}
 ]},
 {id:"h4",title:"Máquina de estados",sub:"Cómo piensa un enemigo",xp:30,steps:[
  {type:"info",kicker:"Concepto",title:"Un estado a la vez",html:`<p>Un enemigo de FPS hace cosas distintas según la situación: patrulla, te persigue, te dispara. Cada una es un <b>estado</b>, y el enemigo está en uno solo por vez. Con <code class="i">enum</code> nombrás los estados y con <code class="i">match</code> decidís qué hacer en cada uno.</p>
   <div class="flow"><div>PATRULLA<small>recorre puntos</small></div><b>→</b><div>PERSEGUIR<small>te vio: d &lt; visión</small></div><b>→</b><div class="hot">ATACAR<small>d &lt; distancia de ataque</small></div></div>
   <p>También se vuelve para atrás: si te alejás del alcance de ataque, vuelve a perseguir. Si te alejás mucho (1.5 veces la visión), te pierde y vuelve a patrullar.</p>
   <p>Esto se llama <b>máquina de estados</b>, y la usan los enemigos, las armas, el jugador (caminar, correr, nadar) y los vehículos.</p>`},
  {type:"lab",kicker:"Laboratorio 3D",title:"Escapá del enemigo",html:`<p>Movete con <b>WASD</b>. El enemigo cambia de color según su estado: verde patrulla, amarillo persigue, rojo ataca. El aro naranja es su visión y el rojo su alcance de ataque. Probá una visión de 2 y escabullite por detrás.</p>`,lab:"estados"},
  {type:"quiz",kicker:"Pregunta",q:"¿Por qué el enemigo vuelve a patrullar recién cuando d > distancia_vision * 1.5, y no apenas d > distancia_vision?",options:["Por un error","Para que no cambie de estado a cada rato cuando estás justo en el borde de su visión","Para que corra más","No hay diferencia"],answer:1,explain:"Ese margen evita que titile entre PATRULLA y PERSEGUIR. Se llama histéresis."},
  {type:"quiz",kicker:"Pregunta",q:"Querés agregar un estado HUIR cuando el enemigo tiene poca vida. ¿Qué hacés?",options:["Reescribir todo","Agregar HUIR al enum, un caso Estado.HUIR en el match y la condición para entrar (vida < 20)","Crear otro enemigo","No se puede"],answer:1,explain:"Las máquinas de estados crecen así: un nombre nuevo, su comportamiento y sus transiciones."}
 ]},
 {id:"h5",title:"Clases propias y herencia",sub:"class_name, extends y super()",xp:30,steps:[
  {type:"info",kicker:"Concepto",title:"Un molde para todas las armas",html:`<p>Pistola, rifle y escopeta disparan, tienen balas y hacen daño. En vez de copiar el mismo código tres veces, creás una clase base <b>Arma</b> y las demás <b>heredan</b> de ella.</p>
   <pre class="code">${hl(ARMA_BASE_GD)}</pre>
   <p><code class="i">class_name Arma</code> registra el nombre en todo el proyecto. Ahora cualquier script puede hacer <code class="i">extends Arma</code>:</p>
   <pre class="code">${hl(ESCOPETA_GD)}</pre>
   <ul><li>La escopeta tiene todo lo de Arma (nombre, daño, balas, disparar) y además perdigones.</li>
   <li>Al escribir su propio <code class="i">disparar()</code>, lo <b>reemplaza</b>.</li>
   <li><code class="i">super()</code> llama a la versión del padre, para no perder lo que ya hacía.</li></ul>`},
  {type:"trace",kicker:"Paso a paso",title:"La escopeta dispara",html:`<p>Una escopeta con 2 balas, 80 de daño y 8 perdigones llama a <code class="i">disparar()</code>.</p>`,
   code:`# escopeta.gd\nfunc disparar():\n\tsuper()\n\tprint("…y suelta ", perdigones, " perdigones")\n\n# arma.gd (el padre)\nfunc disparar():\n\tif balas <= 0:\n\t\treturn\n\tbalas -= 1\n\tprint(nombre, " dispara y hace ", danio, " de daño")`,
   steps:[{line:1,say:"Se llama al disparar() de Escopeta, porque reemplaza al del padre.",vars:{balas:"2"}},
    {line:2,say:"super() salta a la versión de Arma."},{line:7,say:"¿balas <= 0? No, hay 2."},{line:9,say:"Resta una bala.",vars:{balas:"1"}},
    {line:10,say:"Imprime con los datos de esta escopeta.",out:"Escopeta dispara y hace 80 de daño"},
    {line:3,say:"Vuelve a Escopeta y sigue con lo suyo.",out:"…y suelta 8 perdigones"}]},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué pasa si sacás la línea super() de Escopeta.disparar()?",options:["Nada cambia","Ya no resta balas ni imprime el daño: solo suelta perdigones","Da error siempre","Dispara dos veces"],answer:1,explain:"Sin super(), la versión del padre no se ejecuta. El hijo la reemplazó por completo."},
  {type:"fill",kicker:"Completá",q:"Registrar la clase para usarla en todo el proyecto:",code:`____ Arma\nextends Node3D`,options:["class_name","class","name","export"],answer:0,explain:"class_name le da un nombre global. Así podés escribir extends Arma, o var mi_arma: Arma."}
 ]},
 {id:"h6",title:"Recursos con tus datos",sub:"Resource y archivos .tres para armas y enemigos",xp:30,steps:[
  {type:"info",kicker:"Concepto",title:"Separar los datos del código",html:`<p>Un juego tiene decenas de armas que funcionan igual pero con números distintos. En vez de un script por arma, creás un <b>Resource</b> propio: un archivo de datos que se edita en el Inspector.</p>
   <pre class="code">${hl(DATOS_ARMA_GD)}</pre>
   <p>Después, en el panel Sistema de archivos: clic derecho → <b>Nuevo recurso → DatosArma</b>. Guardás <code class="i">rifle.tres</code>, <code class="i">pistola.tres</code>, <code class="i">escopeta.tres</code>, cada uno con sus números.</p>
   <p>El arma solo necesita <code class="i">@export var datos: DatosArma</code>. Arrastrás el .tres que quieras al Inspector y listo: cambiás de arma sin tocar código. Un diseñador puede balancear el juego sin saber programar.</p>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué ventaja tiene guardar las estadísticas de cada arma en un archivo .tres?",options:["El juego pesa más","Podés crear y ajustar armas desde el Inspector sin tocar el código","Es obligatorio en Godot","Para que dispare más rápido"],answer:1,explain:"Datos separados del código: un mismo script sirve para todas las armas."},
  {type:"fill",kicker:"Completá",q:"Un recurso propio hereda de:",code:`class_name DatosEnemigo\nextends ____`,options:["Resource","Node","Node3D","Script"],answer:0,explain:"Resource es la base de los archivos de datos de Godot: texturas, sonidos, materiales y también los tuyos."},
  {type:"quiz",kicker:"Pregunta",q:"Dos soldados usan el mismo soldado.tres. Desde código cambiás datos.vida de uno. ¿Qué pasa?",options:["Solo cambia ese soldado","Cambia en los dos, porque comparten el mismo recurso. Para que sea solo uno, se usa duplicate()","Da error","No cambia nada"],answer:1,explain:"Los recursos se comparten. Por eso los datos fijos van en el .tres, y la vida actual de cada uno va en una variable propia del enemigo, o en una copia hecha con datos.duplicate()."}
 ]},
 {id:"h7",title:"Depurar: encontrar errores",sub:"print, breakpoints, assert y el Depurador",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Cuando algo no funciona",html:`<ul><li><b>print()</b>: lo más simple. Mostrá el valor de una variable para ver qué está pasando: <code class="i">print("vida: ", vida)</code>.</li>
   <li><b>Breakpoints</b>: hacé clic a la izquierda del número de línea en el editor de scripts y aparece un punto rojo. El juego se <b>pausa</b> al llegar ahí y en el Depurador ves el valor de todas las variables.</li>
   <li><b>push_warning("…")</b> y <b>push_error("…")</b>: avisos en amarillo y rojo en el Depurador, sin frenar el juego.</li>
   <li><b>assert(condición, "mensaje")</b>: si la condición es falsa, frena el juego. Solo actúa al probar desde el editor, no en el juego exportado.</li>
   <li><b>Depurar → Formas de colisión visibles</b>: muestra todas las colisiones mientras jugás.</li></ul>
   <pre class="code">${hl(`func recibir_danio(cantidad: int):\n\tassert(cantidad >= 0, "El daño no puede ser negativo")\n\tvida -= cantidad\n\tif vida < -100:\n\t\tpush_warning("Vida muy negativa, ¿doble daño?")`)}</pre>`},
  {type:"quiz",kicker:"Pregunta",q:"Querés ver el valor de todas las variables justo cuando el jugador recarga. ¿Qué usás?",options:["Un breakpoint en la primera línea de recargar()","Cambiar el color del arma","Reiniciar Godot","Borrar la función"],answer:0,explain:"El breakpoint pausa el juego en esa línea. En el Depurador ves todas las variables y podés avanzar línea por línea."},
  {type:"quiz",kicker:"Encontrá el error",q:"El enemigo nunca entra en PERSEGUIR. ¿Cuál es el error?",code:`func _physics_process(delta):\n\tvar d := global_position.distance_to(jugador.global_position)\n\tmatch estado:\n\t\tEstado.PATRULLA:\n\t\t\tif d > distancia_vision:\n\t\t\t\testado = Estado.PERSEGUIR`,options:["Falta delta","La condición está al revés: tiene que ser d < distancia_vision","match no funciona con enum","Falta un print"],answer:1,explain:"Con > te persigue cuando estás lejos, no cuando estás cerca. Un print(d) te mostraría enseguida que la condición no se cumple."},
  {type:"info",kicker:"¡Nivel 2 completo!",title:"Ya programás como en un estudio",html:`<p>Tipos, diccionarios, enum y match, máquinas de estados, herencia, recursos y depuración son las herramientas que se usan todos los días en juegos de verdad. Con esto podés leer y entender el código de casi cualquier proyecto de Godot, y organizar el tuyo para que crezca sin volverse un lío.</p>`}
 ]}
];
/* =================== GDScript · Niveles 3 a 6 =================== */
Object.assign(LABS,{
 vision:{code:`@export var angulo_vision := __g__   # grados del cono
@export var distancia := __d__

func puede_ver(objetivo: Node3D) -> bool:
	var hacia := global_position.direction_to(objetivo.global_position)
	var adelante := -global_transform.basis.z
	var limite := cos(deg_to_rad(angulo_vision / 2))
	var en_cono := adelante.dot(hacia) > limite
	var cerca := global_position.distance_to(objetivo.global_position) < distancia
	return en_cono and cerca`,
  params:{g:{val:90,min:10,max:360,step:5},d:{val:8,min:2,max:14,step:0.5}},topdown:"vision",keys:true,
  pad:[["KeyW","W ↑"],["KeyA","A ←"],["KeyS","S ↓"],["KeyD","D →"]],
  hint:"Movete con WASD. El guardia mira a los costados: entrá en su cono."},
 torreta:{code:`@export var velocidad_giro := __v__   # qué tan rápido gira

func _process(delta):
	var objetivo := jugador.global_position
	var dir := global_position.direction_to(objetivo)
	var angulo_deseado := atan2(-dir.x, -dir.z)
	rotation.y = lerp_angle(rotation.y, angulo_deseado, delta * velocidad_giro)`,
  params:{v:{val:3,min:0.2,max:20,step:0.2}},topdown:"torreta",keys:true,
  pad:[["KeyW","W ↑"],["KeyA","A ←"],["KeyS","S ↓"],["KeyD","D →"]],
  hint:"Corré alrededor de la torreta. Con velocidad baja no te alcanza a seguir."}
});

function buildTopLab(def,p,readout){
  const T=THREE,mode=def.topdown,scene=new T.Scene();scene.background=new T.Color(0x1f2833);
  const cam=new T.PerspectiveCamera(45,16/9,.1,200);cam.position.set(0,24,12);cam.lookAt(0,0,0);
  scene.add(new T.HemisphereLight(0xffffff,0x334455,.9));const dl=new T.DirectionalLight(0xffffff,.6);dl.position.set(5,12,6);scene.add(dl);
  const floor=new T.Mesh(new T.PlaneGeometry(32,24),new T.MeshStandardMaterial({color:0x48503f}));floor.rotation.x=-Math.PI/2;scene.add(floor);
  scene.add(new T.GridHelper(32,32,0x5a6250,0x535b4a));
  const pm=new T.MeshStandardMaterial({color:0x4f9fe0,flatShading:true});const P=new T.Group();
  const pb=new T.Mesh(new T.CylinderGeometry(.45,.45,1.2,14),pm);pb.position.y=.6;P.add(pb);P.position.set(-8,0,5);scene.add(P);
  const em=new T.MeshStandardMaterial({color:0x8e9cb1,flatShading:true});const E=new T.Group();scene.add(E);
  if(mode==="vision"){const b=new T.Mesh(new T.CylinderGeometry(.5,.5,1.3,14),em);b.position.y=.65;E.add(b)}
  else{const base=new T.Mesh(new T.CylinderGeometry(1,1.2,.6,16),new T.MeshStandardMaterial({color:0x4f5d6e,flatShading:true}));base.position.y=.3;scene.add(base);
    const head=new T.Mesh(new T.BoxGeometry(1.2,.7,1.2),em);head.position.y=1;E.add(head)}
  const nose=new T.Mesh(new T.BoxGeometry(.25,.25,mode==="vision"?.7:2),new T.MeshStandardMaterial({color:0x222222}));nose.position.set(0,1.05,mode==="vision"?-.55:-1.4);E.add(nose);
  // cono de visión: abanico dibujado de nuevo cuando cambian los parámetros
  const coneM=new T.MeshBasicMaterial({color:0xe3a75b,transparent:true,opacity:.22,side:T.DoubleSide});let cone=null;
  const beam=new T.Mesh(new T.BoxGeometry(.06,.06,1),new T.MeshBasicMaterial({color:0xff6a5a}));beam.visible=false;scene.add(beam);
  const lab={scene,cam,keys:true,tick(){},rebuild(){}};
  lab.rebuild=()=>{if(mode!=="vision")return;if(cone){E.remove(cone);cone.geometry.dispose()}
    const a=Math.min(359.9,p.g)*Math.PI/180;cone=new T.Mesh(new T.CircleGeometry(p.d,48,Math.PI/2-a/2,a),coneM);cone.rotation.x=-Math.PI/2;cone.position.y=.04;E.add(cone)};
  let t=0,fire=0;
  lab.tick=dt=>{t+=dt;
    let x=0,z=0;if(KEYS.has("KeyD")||KEYS.has("ArrowRight"))x+=1;if(KEYS.has("KeyA")||KEYS.has("ArrowLeft"))x-=1;if(KEYS.has("KeyS")||KEYS.has("ArrowDown"))z+=1;if(KEYS.has("KeyW")||KEYS.has("ArrowUp"))z-=1;
    const l=Math.hypot(x,z)||1;P.position.x=Math.max(-15,Math.min(15,P.position.x+x/l*6*dt));P.position.z=Math.max(-11,Math.min(11,P.position.z+z/l*6*dt));
    const dx=P.position.x-E.position.x,dz=P.position.z-E.position.z,dist=Math.hypot(dx,dz)||1e-6,hx=dx/dist,hz=dz/dist;
    if(mode==="vision"){E.rotation.y=Math.sin(t*.5)*1.3;
      const fx=-Math.sin(E.rotation.y),fz=-Math.cos(E.rotation.y),dot=fx*hx+fz*hz,lim=Math.cos(Math.min(360,p.g)*Math.PI/360);
      const ve=dot>lim&&dist<p.d;em.color.setHex(ve?0xe85a50:0x8e9cb1);coneM.color.setHex(ve?0xe85a50:0xe3a75b);
      beam.visible=ve;if(ve){beam.position.set((P.position.x+E.position.x)/2,1,(P.position.z+E.position.z)/2);beam.scale.z=dist;beam.lookAt(P.position.x,1,P.position.z)}
      readout(`adelante.dot(hacia) = ${dot.toFixed(2)}   límite cos(${(p.g/2).toFixed(0)}°) = ${lim.toFixed(2)}\ndistancia = ${dist.toFixed(1)} / ${p.d}   puede_ver() = ${ve}`)}
    else{const want=Math.atan2(-dx,-dz);let diff=want-E.rotation.y;diff=Math.atan2(Math.sin(diff),Math.cos(diff));
      E.rotation.y+=diff*Math.min(1,dt*p.v);const deg=Math.abs(diff)*180/Math.PI;
      fire-=dt;if(deg<6&&fire<=0){fire=.5;blip(170);beam.visible=true;beam.position.set((P.position.x+E.position.x)/2,1,(P.position.z+E.position.z)/2);beam.scale.z=dist;beam.lookAt(P.position.x,1,P.position.z)}
      if(fire<.4)beam.visible=false;
      readout(`ángulo deseado = ${(want*180/Math.PI).toFixed(0)}°   rotation.y = ${(E.rotation.y*180/Math.PI%360).toFixed(0)}°\nle falta girar ${deg.toFixed(0)}°   ${deg<6?"¡en la mira!":"apuntando…"}`)}};
  return lab;
}

const SPAWN_GD = `const ESCENA_ENEMIGO := preload("res://enemigos/soldado.tscn")

@onready var puntos: Array[Node] = $PuntosDeAparicion.get_children()

func aparecer_enemigo():
	var enemigo: Node3D = ESCENA_ENEMIGO.instantiate()
	var punto: Marker3D = puntos.pick_random()
	enemigo.position = punto.global_position
	add_child(enemigo)`;

const VIDA_GD = `# componente_vida.gd
class_name ComponenteVida
extends Node

signal vida_cambiada(actual, maxima)
signal murio

@export var vida_max := 100
var vida := 0

func _ready():
	vida = vida_max

func recibir_danio(cantidad: int):
	if vida <= 0:
		return
	vida = max(vida - cantidad, 0)
	vida_cambiada.emit(vida, vida_max)
	if vida == 0:
		murio.emit()

func curar(cantidad: int):
	vida = min(vida + cantidad, vida_max)
	vida_cambiada.emit(vida, vida_max)`;

const EVENTOS_GD = `# eventos.gd  (Autoload llamado "Eventos")
extends Node

signal enemigo_eliminado(enemigo, por_arma)
signal objetivo_cumplido(id)
signal jugador_herido(cantidad)
signal vehiculo_destruido(vehiculo)`;

const GUARDAR_JSON_GD = `const RUTA := "user://partida.json"

func guardar(jugador: Node3D, inventario: Dictionary):
	var datos := {
		"posicion": [jugador.position.x, jugador.position.y, jugador.position.z],
		"vida": jugador.vida,
		"inventario": inventario,
		"mision_actual": GestorMisiones.actual,
	}
	var archivo := FileAccess.open(RUTA, FileAccess.WRITE)
	archivo.store_string(JSON.stringify(datos, "\\t"))

func cargar() -> Dictionary:
	if not FileAccess.file_exists(RUTA):
		return {}
	var archivo := FileAccess.open(RUTA, FileAccess.READ)
	var datos = JSON.parse_string(archivo.get_as_text())
	return datos if datos is Dictionary else {}`;

const RAYO_CODIGO_GD = `func hay_linea_de_vision(desde: Vector3, hasta: Vector3) -> bool:
	var espacio := get_world_3d().direct_space_state
	var consulta := PhysicsRayQueryParameters3D.create(desde, hasta)
	consulta.exclude = [get_rid()]   # que el rayo no choque con uno mismo
	var resultado := espacio.intersect_ray(consulta)
	if resultado.is_empty():
		return true                 # no chocó con nada en el medio
	return resultado.collider == jugador`;

const GDS3=[
 {id:"i1",title:"Señales propias y await",sub:"Avisar con datos y esperar eventos",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Señales con parámetros",html:`<p>Ya usaste señales. Ahora creás las tuyas y les pasás datos:</p>
   <pre class="code">${hl(`signal vida_cambiada(actual: int, maxima: int)\n\nfunc recibir_danio(cantidad: int):\n\tvida -= cantidad\n\tvida_cambiada.emit(vida, vida_max)`)}</pre>
   <p>Quien escucha recibe esos datos en su función: <code class="i">func _on_vida_cambiada(actual, maxima):</code>.</p>
   <p><b>await</b> también sirve con señales: pausa la función hasta que la señal ocurra, sin congelar el juego.</p>
   <pre class="code">${hl(`func recargar():\n\t$Animaciones.play("recargar")\n\tawait $Animaciones.animation_finished\n\tbalas = 30   # recién cuando terminó la animación`)}</pre>
   <p>Y si querés escuchar algo <b>una sola vez</b>: <code class="i">senal.connect(funcion, CONNECT_ONE_SHOT)</code>.</p>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué hace await $Animaciones.animation_finished?",options:["Congela todo el juego hasta que termine la animación","Pausa solo esa función hasta que termine la animación; el juego sigue","Saltea la animación","Repite la animación"],answer:1,explain:"await pausa la función que lo contiene. El resto del juego sigue andando."},
  {type:"fill",kicker:"Completá",q:"Avisar la vida nueva a quien escuche:",code:`vida_cambiada.____(vida, vida_max)`,options:["emit","connect","call","send"],answer:0,explain:"emit dispara la señal con sus datos. connect es para escucharla."},
  {type:"quiz",kicker:"Pregunta",q:"¿Para qué sirve CONNECT_ONE_SHOT?",options:["Para disparar una vez","Para que la conexión se borre sola después de la primera vez que llega la señal","Para conectar más rápido","Para que sea global"],answer:1,explain:"Útil para cosas que pasan una sola vez, como el primer contacto con un enemigo."}
 ]},
 {id:"i2",title:"Lambdas y Callable",sub:"Funciones como valores",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Guardar una función en una variable",html:`<p>En GDScript una función también puede ser un valor: un <code class="i">Callable</code>. Lo podés guardar, pasar a otra función o conectar.</p>
   <pre class="code">${hl(`var al_morir := func(): print("Game over")\nal_morir.call()\n\n# bind agrega datos fijos al llamar\nboton_rifle.pressed.connect(_elegir_arma.bind("rifle"))\nboton_escopeta.pressed.connect(_elegir_arma.bind("escopeta"))\n\nfunc _elegir_arma(nombre: String):\n\tprint("Elegiste ", nombre)`)}</pre>
   <p>Las lambdas también sirven con los métodos de los arrays:</p>
   <pre class="code">${hl(`var enemigos_vivos := enemigos.filter(func(e): return e.vida > 0)\nvar vidas := enemigos.map(func(e): return e.vida)\nenemigos.sort_custom(func(a, b): return a.vida < b.vida)`)}</pre>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué devuelve enemigos.filter(func(e): return e.vida > 0)?",options:["El primer enemigo","Un array nuevo solo con los enemigos que tienen vida mayor a 0","La suma de las vidas","true o false"],answer:1,explain:"filter se queda con los elementos para los que la función devuelve true."},
  {type:"quiz",kicker:"Pregunta",q:"¿Para qué sirve .bind(\"rifle\")?",options:["Para borrar la conexión","Para que, cuando llegue la señal, la función se llame con \"rifle\" como dato","Para cambiar el nombre del botón","Para cargar el rifle"],answer:1,explain:"bind fija argumentos. Así una sola función sirve para varios botones."},
  {type:"fill",kicker:"Completá",q:"Ordenar los enemigos del más cercano al más lejano:",code:`enemigos.____(func(a, b): return a.distancia < b.distancia)`,options:["sort_custom","filter","map","sort"],answer:0,explain:"sort_custom ordena con tu propia regla. sort solo funciona con valores simples."}
 ]},
 {id:"i3",title:"Setters y getters",sub:"Código que corre al cambiar una variable",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Variables que se cuidan solas",html:`<p>Un <b>setter</b> es código que corre <b>cada vez que alguien cambia la variable</b>. Ideal para validar y avisar:</p>
   <pre class="code">${hl(`signal vida_cambiada(valor)\n\nvar vida := 100:\n\tset(valor):\n\t\tvida = clamp(valor, 0, 100)\n\t\tvida_cambiada.emit(vida)\n\nfunc _ready():\n\tvida -= 150   # queda en 0, no en -50, y avisa solo`)}</pre>
   <p>Un <b>getter</b> calcula el valor cuando alguien lo lee:</p>
   <pre class="code">${hl(`var esta_vivo: bool:\n\tget:\n\t\treturn vida > 0`)}</pre>
   <p>Así nadie puede dejar la vida en negativo, y el HUD se entera solo de cada cambio.</p>`},
  {type:"trace",kicker:"Paso a paso",title:"El setter en acción",html:`<p>Mirá cómo el setter corrige el valor.</p>`,
   code:`var vida := 100:\n\tset(valor):\n\t\tvida = clamp(valor, 0, 100)\n\t\tvida_cambiada.emit(vida)\n\nfunc _ready():\n\tvida -= 150`,
   steps:[{line:0,say:"La vida arranca en 100.",vars:{vida:"100"}},{line:5,say:"Godot llama a _ready."},
    {line:6,say:"100 - 150 = -50. Pero como vida tiene setter, ese -50 entra al setter como valor.",vars:{valor:"-50"}},
    {line:2,say:"clamp(-50, 0, 100) es 0. Se guarda 0, no -50.",vars:{vida:"0"}},
    {line:3,say:"Avisa el cambio. El HUD lo muestra sin que nadie más haga nada.",out:"vida_cambiada(0)"}]},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué ventaja tiene el setter frente a acordarse de llamar emit en cada lugar donde cambia la vida?",options:["Ninguna","Que no te podés olvidar: cualquier cambio, venga de donde venga, pasa por el setter","Que es más lento","Que la vida no se puede cambiar"],answer:1,explain:"Centraliza la regla. Daño, curación o trucos de prueba: todo pasa por el mismo lugar."}
 ]},
 {id:"i4",title:"Arrays tipados y funciones estáticas",sub:"Array[Enemigo] y static func",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Listas que solo aceptan un tipo",html:`<p>Igual que las variables, los arrays pueden tener tipo:</p>
   <pre class="code">${hl(`var enemigos: Array[Enemigo] = []\nvar puntos: Array[Vector3] = [Vector3.ZERO, Vector3(5, 0, 2)]`)}</pre>
   <p>Godot te avisa si metés algo que no corresponde, y el autocompletado sabe qué tiene cada elemento.</p>
   <p>Una función <b>static</b> no necesita un nodo para usarse. Se llama con el nombre de la clase. Sirve para herramientas generales:</p>
   <pre class="code">${hl(`class_name Utilidades\n\nstatic func distancia_plana(a: Vector3, b: Vector3) -> float:\n\treturn Vector2(a.x, a.z).distance_to(Vector2(b.x, b.z))\n\n# desde cualquier script:\nvar d := Utilidades.distancia_plana(jugador.position, objetivo.position)`)}</pre>`},
  {type:"quiz",kicker:"Pregunta",q:"var armas: Array[String] = []. ¿Qué pasa con armas.append(42)?",options:["Se agrega 42","Error: el array solo acepta String","Se convierte en \"42\" solo","Se borra el array"],answer:1,explain:"Los arrays tipados rechazan otros tipos."},
  {type:"quiz",kicker:"Pregunta",q:"¿Cuándo conviene una función static?",options:["Cuando necesita las variables de un nodo concreto","Cuando es una herramienta general que no depende de ningún nodo, como un cálculo","Siempre","Nunca"],answer:1,explain:"Las static no tienen acceso a self. Son perfectas para cálculos y ayudas."}
 ]},
 {id:"i5",title:"Scripts @tool",sub:"Código que corre dentro del editor",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Ver el resultado sin darle Play",html:`<p>Si ponés <code class="i">@tool</code> en la primera línea, el script también corre <b>en el editor</b>. Sirve para herramientas propias: acomodar objetos, generar terreno o mostrar ayudas visuales mientras armás el nivel.</p>
   <pre class="code">${hl(`@tool\nextends Node3D\n\n@export var cantidad := 5:\n\tset(valor):\n\t\tcantidad = valor\n\t\tif Engine.is_editor_hint():\n\t\t\tacomodar_vallas()\n\nfunc acomodar_vallas():\n\tfor i in get_child_count():\n\t\tget_child(i).position.x = i * 2.0`)}</pre>
   <p><code class="i">Engine.is_editor_hint()</code> es true en el editor y false en el juego, así separás el código de cada caso.</p>
   <p>Ojo: un script @tool con errores puede trabar el editor. Guardá seguido y probalo de a poco.</p>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Para qué sirve Engine.is_editor_hint()?",options:["Para saber si el juego está en pausa","Para saber si el código corre en el editor (true) o en el juego (false)","Para mostrar pistas al jugador","Para exportar"],answer:1,explain:"Con eso decidís qué parte del código corre en cada lugar."},
  {type:"quiz",kicker:"Pregunta",q:"¿Cuál es un buen uso de @tool?",options:["Guardar la partida","Que al cambiar 'cantidad' en el Inspector, las vallas se acomoden solas en el editor","Disparar más rápido","Conectarse a internet"],answer:1,explain:"@tool es para herramientas que te ahorran trabajo mientras armás el nivel."}
 ]},
 {id:"i6",title:"Repaso del Nivel 3",sub:"Todo junto en un caso real",xp:30,steps:[
  {type:"info",kicker:"Caso real",title:"Barra de vida que se actualiza sola",html:`<pre class="code">${hl(`# jugador.gd\nsignal vida_cambiada(actual: int, maxima: int)\nconst VIDA_MAX := 100\n\nvar vida := VIDA_MAX:\n\tset(valor):\n\t\tvida = clamp(valor, 0, VIDA_MAX)\n\t\tvida_cambiada.emit(vida, VIDA_MAX)\n\n# hud.gd\nfunc _ready():\n\tjugador.vida_cambiada.connect(func(actual, maxima):\n\t\t$BarraVida.value = float(actual) / maxima * 100)`)}</pre>
   <p>Setter, señal con datos y lambda: el jugador no conoce al HUD, y el HUD se actualiza solo con cualquier cambio de vida.</p>`},
  {type:"quiz",kicker:"Repaso",q:"¿Por qué se escribe float(actual) / maxima y no actual / maxima?",options:["Por estética","Porque entre dos int la división descarta los decimales: 50 / 100 daría 0","Para que sea negativo","Da igual"],answer:1,explain:"En GDScript, int dividido int da int. Con float(…) el resultado es 0.5."},
  {type:"quiz",kicker:"Repaso",q:"La animación de recarga tiene que terminar antes de sumar balas. ¿Qué usás?",options:["await $Animaciones.animation_finished","Un for","Un setter","static func"],answer:0,explain:"await espera la señal de fin de la animación."}
 ]}
];

const GDS4=[
 {id:"k1",title:"Instanciar escenas",sub:"preload, instantiate y add_child",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Crear enemigos durante el juego",html:`<p>Un enemigo, una bala o una explosión son escenas (.tscn). Para crearlas mientras se juega:</p>
   <ol><li><code class="i">preload("res://...tscn")</code> carga la escena al arrancar.</li><li><code class="i">.instantiate()</code> crea una copia nueva.</li><li><code class="i">add_child(copia)</code> la mete en el juego.</li></ol>
   <pre class="code">${hl(SPAWN_GD)}</pre>
   <p><code class="i">pick_random()</code> elige un punto de aparición al azar entre varios <code class="i">Marker3D</code>.</p>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué diferencia hay entre preload y load?",options:["Ninguna","preload carga cuando se abre el script (más rápido en juego); load carga en el momento en que se ejecuta la línea","load es más nuevo","preload es para imágenes"],answer:1,explain:"preload evita tirones durante el juego. load sirve cuando la ruta cambia o la decidís en el momento."},
  {type:"fill",kicker:"Completá",q:"Crear una copia de la escena:",code:`var bala := ESCENA_BALA.____()`,options:["instantiate","new","duplicate","load"],answer:0,explain:"instantiate crea los nodos de la escena. Después hay que agregarlos con add_child."},
  {type:"quiz",kicker:"Pregunta",q:"Instanciás un enemigo pero no aparece. ¿Qué falta casi seguro?",options:["add_child(enemigo)","queue_free()","print()","Un enum"],answer:0,explain:"Sin add_child la copia existe en memoria pero no está en el árbol, así que no se ve ni hace nada."}
 ]},
 {id:"k2",title:"Componentes",sub:"Piezas reutilizables: vida, daño, botín",xp:30,steps:[
  {type:"info",kicker:"Concepto",title:"Armar con piezas en vez de heredar todo",html:`<p>Un soldado, un barril, un tanque y un helicóptero tienen vida. En vez de copiar el código, creás un <b>componente</b>: un nodo con un solo trabajo que se agrega como hijo a quien lo necesite.</p>
   <pre class="code">${hl(VIDA_GD)}</pre>
   <div class="tree"><span class="t">Barril</span> <span class="m">(RigidBody3D)</span>
├─ <span class="t">ComponenteVida</span>  <span class="m">vida_max = 30</span>
└─ <span class="t">ComponenteExplosion</span>
<span class="t">Tanque</span> <span class="m">(VehicleBody3D)</span>
├─ <span class="t">ComponenteVida</span>  <span class="m">vida_max = 800</span>
└─ <span class="t">ComponenteBotin</span></div>
   <p>El arma ya no pregunta "¿es un enemigo o un barril?". Solo busca si tiene un ComponenteVida y le pasa el daño.</p>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué ventaja tiene el componente de vida frente a programar la vida dentro de cada enemigo?",options:["Ninguna","Se escribe una vez y sirve para soldados, barriles y vehículos; un arreglo vale para todos","Es más lento","Solo sirve para el jugador"],answer:1,explain:"Composición: piezas chicas que se combinan. Es la forma en que Godot está pensado."},
  {type:"fill",kicker:"Completá",q:"Que la vida nunca baje de 0:",code:`vida = ____(vida - cantidad, 0)`,options:["max","min","clamp","abs"],answer:0,explain:"max devuelve el mayor de los dos: si vida - cantidad es negativo, queda 0."}
 ]},
 {id:"k3",title:"Bus de eventos",sub:"Un Autoload con señales globales",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Un tablero de anuncios",html:`<p>A veces cosas muy lejanas en el árbol tienen que enterarse de algo: el HUD, la música, las misiones y los logros quieren saber cuándo muere un enemigo. Conectar todo con todo es un lío.</p>
   <p>Solución: un <b>Autoload</b> llamado <b>Eventos</b> que solo tiene señales. Es un tablero de anuncios: cualquiera publica y cualquiera escucha.</p>
   <pre class="code">${hl(EVENTOS_GD)}</pre>
   <pre class="code">${hl(`# en el enemigo, al morir:\nEventos.enemigo_eliminado.emit(self, arma_actual)\n\n# en la música, en logros o en misiones:\nfunc _ready():\n\tEventos.enemigo_eliminado.connect(_on_enemigo_eliminado)`)}</pre>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué problema resuelve el bus de eventos?",options:["Que el juego cargue más rápido","Que nodos lejanos se comuniquen sin conocerse ni buscarse en el árbol","Que no haya enemigos","Que la física sea mejor"],answer:1,explain:"Quien emite no sabe quién escucha. Podés agregar logros o estadísticas sin tocar al enemigo."},
  {type:"quiz",kicker:"Pregunta",q:"¿Conviene mandar TODO por el bus de eventos?",options:["Sí, siempre","No: para un padre y su hijo directo alcanza con una señal normal. El bus es para eventos de todo el juego","Sí, es más rápido","No se puede"],answer:1,explain:"Usado para todo, después no sabés quién escucha qué. Reservalo para eventos globales."}
 ]},
 {id:"k4",title:"Grupos",sub:"Encontrar y avisar a muchos nodos a la vez",xp:20,steps:[
  {type:"info",kicker:"Concepto",title:"Etiquetas para nodos",html:`<p>Un <b>grupo</b> es una etiqueta. Se pone desde el Inspector (Nodo → Grupos) o con <code class="i">add_to_group("enemigos")</code>.</p>
   <pre class="code">${hl(`# cuántos quedan\nvar quedan := get_tree().get_nodes_in_group("enemigos").size()\n\n# avisar a todos: llama a alerta() en cada uno\nget_tree().call_group("enemigos", "alerta", jugador.position)\n\n# preguntar si un nodo es de un grupo\nif body.is_in_group("jugador"):\n\tpass`)}</pre>`},
  {type:"quiz",kicker:"Pregunta",q:"Sonó la alarma de la base y todos los guardias tienen que ir a tu última posición. ¿Qué usás?",options:["get_tree().call_group(\"guardias\", \"ir_a\", posicion)","Un for sobre todos los nodos del juego","queue_free()","Un setter"],answer:0,explain:"call_group llama a esa función en todos los nodos del grupo."}
 ]},
 {id:"k5",title:"Object pooling",sub:"Reusar balas en vez de crearlas y borrarlas",xp:30,steps:[
  {type:"info",kicker:"Concepto",title:"No tirar, reciclar",html:`<p>Una ametralladora dispara 10 balas por segundo. Crear y borrar nodos tan seguido puede dar tirones. Un <b>pool</b> crea un montón de balas al principio y las <b>reusa</b>: cuando una termina, se esconde y queda lista para el próximo disparo.</p>
   <pre class="code">${hl(`const ESCENA_BALA := preload("res://armas/bala.tscn")\nvar libres: Array[Node3D] = []\n\nfunc _ready():\n\tfor i in 50:\n\t\tvar b: Node3D = ESCENA_BALA.instantiate()\n\t\tb.hide()\n\t\tadd_child(b)\n\t\tlibres.append(b)\n\nfunc pedir_bala() -> Node3D:\n\tif libres.is_empty():\n\t\treturn null   # o crear una más\n\tvar b: Node3D = libres.pop_back()\n\tb.show()\n\treturn b\n\nfunc devolver_bala(b: Node3D):\n\tb.hide()\n\tlibres.append(b)`)}</pre>
   <p>En la mayoría de los juegos chicos no hace falta. Usalo cuando el Profiler te muestre tirones por crear muchos objetos.</p>`},
  {type:"quiz",kicker:"Pregunta",q:"Con el pool, ¿qué se hace en lugar de queue_free() cuando la bala termina?",options:["Se la esconde y se la devuelve a la lista de libres","Se la borra igual","Se la duplica","Nada"],answer:0,explain:"La bala no se destruye: vuelve al pool para el próximo disparo."},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué hace pop_back()?",options:["Saca el último elemento del array y lo devuelve","Agrega al final","Ordena","Borra todo"],answer:0,explain:"pop_back quita y devuelve el último. append agrega al final."}
 ]},
 {id:"k6",title:"Guardar la partida en JSON",sub:"FileAccess, JSON y user://",xp:30,steps:[
  {type:"info",kicker:"Concepto",title:"Una foto del estado del juego",html:`<p>Para guardar la partida completa (posición, vida, inventario, misión) se arma un <b>diccionario</b> con todo y se escribe como texto JSON en <code class="i">user://</code>.</p>
   <pre class="code">${hl(GUARDAR_JSON_GD)}</pre>
   <p>JSON no sabe guardar Vector3, por eso la posición va como lista de tres números. Al cargar, la convertís de nuevo con <code class="i">Vector3(p[0], p[1], p[2])</code>.</p>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Por qué cargar() revisa FileAccess.file_exists antes de abrir?",options:["Por estética","La primera vez que se juega todavía no hay partida guardada, y abrir un archivo que no existe da error","Para que cargue más rápido","No hace falta"],answer:1,explain:"Siempre hay que contemplar la primera vez y los archivos dañados."},
  {type:"fill",kicker:"Completá",q:"Convertir el diccionario en texto JSON:",code:`archivo.store_string(JSON.____(datos))`,options:["stringify","parse_string","save","encode"],answer:0,explain:"stringify convierte a texto. parse_string hace lo contrario: de texto a datos."}
 ]}
];

const GDS5=[
 {id:"n1",title:"Vectores sin miedo",sub:"Posición, dirección y distancia",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Una flecha en 3D",html:`<p>Un <code class="i">Vector3</code> puede ser un <b>punto</b> (dónde está algo) o una <b>flecha</b> (hacia dónde y cuánto). Las operaciones más usadas:</p>
   <pre class="code">${hl(`var desde := Vector3(0, 0, 0)\nvar hasta := Vector3(3, 0, 4)\n\nvar flecha := hasta - desde            # (3, 0, 4): de 'desde' a 'hasta'\nvar largo := flecha.length()           # 5: la distancia\nvar dir := flecha.normalized()         # (0.6, 0, 0.8): solo la dirección, largo 1\nvar d := desde.distance_to(hasta)       # 5, en un paso\nvar d2 := desde.direction_to(hasta)     # (0.6, 0, 0.8), en un paso`)}</pre>
   <p>Regla de oro: <b>destino menos origen</b> da la flecha que va del origen al destino.</p>`},
  {type:"quiz",kicker:"Pregunta",q:"El enemigo está en (2, 0, 2) y el jugador en (5, 0, 6). ¿Cuál es la flecha del enemigo al jugador?",options:["(3, 0, 4)","(-3, 0, -4)","(7, 0, 8)","(5, 0, 6)"],answer:0,explain:"Destino menos origen: (5-2, 0-0, 6-2) = (3, 0, 4). Su largo es 5."},
  {type:"quiz",kicker:"Pregunta",q:"¿Para qué sirve normalized()?",options:["Para que la flecha mida 1 y quede solo la dirección","Para duplicarla","Para que apunte al revés","Para redondear"],answer:0,explain:"Con la dirección de largo 1 multiplicás por la velocidad que quieras, y nadie va más rápido por estar lejos."},
  {type:"fill",kicker:"Completá",q:"Distancia del jugador al objetivo:",code:`var d := jugador.global_position.____(objetivo.global_position)`,options:["distance_to","direction_to","dot","length"],answer:0,explain:"distance_to devuelve un número: los metros entre los dos puntos."}
 ]},
 {id:"n2",title:"Producto punto: el cono de visión",sub:"dot para saber si algo está adelante",xp:30,steps:[
  {type:"info",kicker:"Concepto",title:"¿Me está mirando?",html:`<p>El <b>producto punto</b> (<code class="i">a.dot(b)</code>) entre dos direcciones de largo 1 dice cuánto apuntan para el mismo lado:</p>
   <ul><li><b>1</b>: misma dirección (justo adelante).</li><li><b>0</b>: perpendiculares (al costado).</li><li><b>-1</b>: opuestas (justo atrás).</li></ul>
   <p>En Godot, el frente de un nodo 3D es <code class="i">-transform.basis.z</code>. Si <code class="i">adelante.dot(hacia_jugador)</code> es mayor que el coseno de la mitad del ángulo de visión, el jugador está dentro del cono.</p>`},
  {type:"lab",kicker:"Laboratorio 3D",title:"Entrá en el cono del guardia",html:`<p>El guardia gira la cabeza de un lado a otro. Movete con <b>WASD</b>: cuando quedás dentro del cono y cerca, se pone rojo. Probá <b>angulo_vision</b> 30 (visión de túnel) y 360 (te ve por todos lados).</p>`,lab:"vision"},
  {type:"quiz",kicker:"Pregunta",q:"adelante.dot(hacia_jugador) da -0.9. ¿Dónde está el jugador?",options:["Justo adelante","Casi justo detrás del guardia","Al costado","Arriba"],answer:1,explain:"Cerca de -1 significa direcciones opuestas: está a sus espaldas. Ideal para un ataque sigiloso."},
  {type:"fill",kicker:"Completá",q:"La dirección hacia adelante de un nodo 3D:",code:`var adelante := -global_transform.basis.____`,options:["z","x","y","w"],answer:0,explain:"En Godot, los nodos miran hacia -Z. Por eso va el signo menos."}
 ]},
 {id:"n3",title:"Girar hacia algo",sub:"look_at, atan2 y lerp_angle",xp:30,steps:[
  {type:"info",kicker:"Concepto",title:"Apuntar suave",html:`<p><code class="i">look_at(objetivo, Vector3.UP)</code> gira el nodo para que mire al objetivo <b>de golpe</b>. Para una torreta o un enemigo que gira de a poco, se calcula el ángulo y se interpola:</p>
   <pre class="code">${hl(`var dir := global_position.direction_to(objetivo)\nvar angulo := atan2(-dir.x, -dir.z)\nrotation.y = lerp_angle(rotation.y, angulo, delta * velocidad_giro)`)}</pre>
   <p><code class="i">lerp_angle</code> es como lerp pero entiende los ángulos: sabe que de 350° a 10° conviene girar 20° y no 340°.</p>`},
  {type:"lab",kicker:"Laboratorio 3D",title:"Esquivá la torreta",html:`<p>Corré en círculos alrededor de la torreta con <b>WASD</b>. Con <b>velocidad_giro</b> 1 no te alcanza a seguir. Con 15 te sigue al instante. Dispara cuando le falta girar menos de 6°.</p>`,lab:"torreta"},
  {type:"quiz",kicker:"Pregunta",q:"¿Por qué usar lerp_angle y no lerp común para rotaciones?",options:["Es lo mismo","lerp_angle toma el camino corto: de 350° a 10° gira 20° en vez de dar casi una vuelta entera","lerp_angle es más lento","lerp no existe"],answer:1,explain:"Con lerp común, al cruzar los 360° la torreta daría una vuelta completa al revés."}
 ]},
 {id:"n4",title:"Interpolar y suavizar",sub:"lerp, move_toward y suavizado de cámara",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Llegar de a poco",html:`<ul><li><code class="i">lerp(a, b, t)</code>: un valor entre a y b. Usado cada frame con <code class="i">delta * k</code>, se acerca rápido al principio y lento al final. Queda suave, como una cámara que sigue.</li>
   <li><code class="i">move_toward(a, b, paso)</code>: se acerca a velocidad <b>constante</b> y frena justo en b. Ideal para acelerar un auto o abrir una puerta.</li>
   <li><code class="i">Vector3.lerp</code> y <code class="i">Vector3.move_toward</code>: lo mismo pero con posiciones.</li></ul>
   <pre class="code">${hl(`# cámara de tercera persona que sigue con retraso\ncamara.global_position = camara.global_position.lerp(punto_detras_del_auto, delta * 5)\n\n# acelerar un auto de forma pareja\nvelocidad = move_toward(velocidad, velocidad_max, aceleracion * delta)`)}</pre>`},
  {type:"quiz",kicker:"Pregunta",q:"Querés que un auto acelere de 0 a 100 de forma pareja, siempre igual. ¿Qué usás?",options:["move_toward","lerp","look_at","dot"],answer:0,explain:"move_toward suma un paso fijo cada frame. lerp frenaría al acercarse a 100."},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué da lerp(0, 10, 0.5)?",options:["0","5","10","0.5"],answer:1,explain:"t = 0.5 es justo la mitad entre 0 y 10."}
 ]},
 {id:"n5",title:"Rayos por código",sub:"intersect_ray para línea de visión",xp:30,steps:[
  {type:"info",kicker:"Concepto",title:"¿Hay una pared en el medio?",html:`<p>El cono de visión dice si el jugador está adelante, pero no si hay una pared entre los dos. Para eso se tira un rayo por código, sin necesidad de un nodo RayCast3D:</p>
   <pre class="code">${hl(RAYO_CODIGO_GD)}</pre>
   <p>El resultado es un diccionario con <code class="i">position</code>, <code class="i">normal</code> y <code class="i">collider</code>. Si está vacío, el rayo no chocó con nada.</p>
   <p>Juntando el cono (lección 2) y el rayo, tu guardia ve de verdad: adelante, cerca y sin paredes en el medio.</p>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Por qué se pone consulta.exclude = [get_rid()]?",options:["Para que el rayo no choque con el propio guardia que lo dispara","Para que sea más largo","Para ignorar al jugador","No hace nada"],answer:0,explain:"El rayo sale desde adentro del guardia. Sin excluirlo, chocaría con su propio cuerpo."},
  {type:"quiz",kicker:"Pregunta",q:"¿Cuándo conviene un rayo por código en vez de un nodo RayCast3D?",options:["Nunca","Cuando necesitás rayos en direcciones que cambian, o muchos rayos en el mismo frame","Siempre","Para la música"],answer:1,explain:"El nodo es cómodo para un rayo fijo, como la mira del arma. Por código es más flexible."}
 ]}
];

const GDS6=[
 {id:"q1",title:"Medir antes de optimizar",sub:"Profiler y Monitores",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"No adivines: medí",html:`<p>Antes de cambiar código "para que ande más rápido", medí dónde se va el tiempo. En el panel <b>Depurador</b>, con el juego corriendo:</p>
   <ul><li><b>Profiler</b>: cuánto tarda cada función por frame. Lo que esté arriba es lo que hay que mirar.</li>
   <li><b>Monitores</b>: FPS, memoria, cantidad de objetos y de nodos, llamadas de dibujo.</li>
   <li><b>Visual Profiler</b>: cuánto tarda la placa de video en cada parte del dibujo.</li></ul>
   <p>Para estar fluido a 60 FPS, cada frame tiene que durar menos de 16.6 milisegundos.</p>`},
  {type:"quiz",kicker:"Pregunta",q:"El juego va lento. ¿Qué hacés primero?",options:["Reescribir todo en otro lenguaje","Abrir el Profiler y ver qué función tarda más","Borrar los árboles","Bajar el volumen"],answer:1,explain:"Optimizar sin medir suele mejorar lo que no importa."},
  {type:"quiz",kicker:"Pregunta",q:"Para 60 FPS, ¿cuánto puede durar como máximo cada frame?",options:["60 ms","16.6 ms","1 segundo","100 ms"],answer:1,explain:"1000 ms dividido 60 frames da unos 16.6 ms por frame."}
 ]},
 {id:"q2",title:"Código que no traba",sub:"Errores comunes de rendimiento",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Lo que se ejecuta 60 veces por segundo",html:`<p>Lo que va en <code class="i">_process</code> corre en cada frame. Pequeños descuidos se multiplican:</p>
   <ul><li><b>Buscar nodos en cada frame</b>: <code class="i">get_node()</code> o <code class="i">$</code> dentro de _process. Guardalos una vez con <code class="i">@onready</code>.</li>
   <li><b>Recorrer todos los enemigos en cada frame</b> para algo que puede esperar. Usá un <code class="i">Timer</code> cada 0.2 s.</li>
   <li><b>Crear objetos en cada frame</b>, como <code class="i">FastNoiseLite.new()</code> o arrays grandes. Crealos una vez y reusalos.</li>
   <li><b>Apagar lo que no se usa</b>: <code class="i">set_process(false)</code> en enemigos lejanos o dormidos.</li></ul>
   <pre class="code">${hl(`# mal: busca el nodo 60 veces por segundo\nfunc _process(delta):\n\t$Cabeza/Camera3D.fov = 75\n\n# bien: lo busca una vez\n@onready var camara: Camera3D = $Cabeza/Camera3D`)}</pre>`},
  {type:"quiz",kicker:"Pregunta",q:"Un enemigo revisa cada frame si ve al jugador, con un rayo. Hay 40 enemigos. ¿Qué mejora más?",options:["Revisar con un Timer cada 0.2 s en vez de cada frame","Cambiar el color del enemigo","Usar print()","Nada"],answer:0,explain:"De 60 revisiones por segundo pasás a 5, y el jugador no nota la diferencia."},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué hace set_process(false)?",options:["Borra el nodo","Deja de llamar a _process en ese nodo hasta que lo vuelvas a activar","Pausa el juego","Lo esconde"],answer:1,explain:"Ideal para cosas lejanas o inactivas que no necesitan pensar cada frame."}
 ]},
 {id:"q3",title:"call_deferred y el orden de las cosas",sub:"Cambiar el árbol en el momento seguro",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Esperar al final del frame",html:`<p>Algunos cambios no se pueden hacer mientras Godot está calculando la física, por ejemplo agregar o sacar cuerpos dentro de una señal de colisión. Godot avisa con un error del tipo "can't change this state while flushing queries".</p>
   <p>La solución es pedir que se haga <b>al final del frame</b>, cuando es seguro:</p>
   <pre class="code">${hl(`func _on_body_entered(body):\n\t# en vez de add_child(explosion):\n\tadd_child.call_deferred(explosion)\n\t# o desactivar una colisión:\n\t$CollisionShape3D.set_deferred("disabled", true)`)}</pre>
   <p><code class="i">queue_free()</code> ya funciona así: borra el nodo al final del frame, de forma segura.</p>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué hace algo.call_deferred()?",options:["Lo llama ahora mismo","Lo llama al final del frame, cuando es seguro cambiar el árbol","Nunca lo llama","Lo llama dos veces"],answer:1,explain:"Deferred significa diferido: se hace un poquito después, en un momento seguro."}
 ]},
 {id:"q4",title:"Organizar el proyecto y Git",sub:"Carpetas, nombres y control de versiones",xp:25,steps:[
  {type:"info",kicker:"Concepto",title:"Un proyecto que crece sin volverse un lío",html:`<div class="tree"><span class="t">res://</span>
├─ <span class="t">jugador/</span>      <span class="m">jugador.tscn, jugador.gd</span>
├─ <span class="t">armas/</span>        <span class="m">arma.gd, rifle.tres, escopeta.tres</span>
├─ <span class="t">enemigos/</span>
├─ <span class="t">vehiculos/</span>
├─ <span class="t">niveles/</span>
├─ <span class="t">ui/</span>           <span class="m">menu, hud</span>
├─ <span class="t">globales/</span>     <span class="m">eventos.gd, gestor_misiones.gd</span>
└─ <span class="t">recursos/</span>     <span class="m">modelos, texturas, sonidos</span></div>
   <ul><li>Cada cosa junto a su escena y su script.</li>
   <li>Nombres de archivo en <code class="i">minusculas_con_guion_bajo</code>. Nodos en <code class="i">PascalCase</code>.</li>
   <li><b>Git</b>, como hacés con Aprende Godot Burro: un commit por cada cambio que funciona. Si rompés algo, volvés atrás.</li>
   <li>En el <code class="i">.gitignore</code> va la carpeta <code class="i">.godot/</code>, porque Godot la regenera sola y no hay que subirla.</li></ul>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué carpeta de un proyecto Godot 4 NO se sube a Git?",options:[".godot/","jugador/","niveles/","res://"],answer:0,explain:".godot/ es caché que Godot regenera al abrir el proyecto. Subirla solo trae conflictos."},
  {type:"quiz",kicker:"Pregunta",q:"¿Cada cuánto conviene hacer un commit?",options:["Una vez al terminar el juego","Cada vez que algo nuevo funciona: un paso chico y probado","Nunca","Cada un año"],answer:1,explain:"Commits chicos y frecuentes: si algo se rompe, sabés exactamente qué cambio fue."}
 ]},
 {id:"q5",title:"Exportar tu juego",sub:"Windows, Android y Web",xp:30,steps:[
  {type:"info",kicker:"Concepto",title:"Del editor a un juego que cualquiera abre",html:`<ol><li><b>Editor → Administrar plantillas de exportación</b>: descargá las plantillas de tu versión de Godot (una vez).</li>
   <li><b>Proyecto → Exportar → Añadir…</b>: elegí la plataforma (Windows Desktop, Android, Web, Linux).</li>
   <li>Configurá el nombre, el ícono y la versión. En Android hacen falta el SDK de Android y un keystore para firmar.</li>
   <li><b>Exportar proyecto</b>: con la casilla <b>Exportar con depuración</b> apagada para la versión final.</li></ol>
   <p>Antes de publicar, probá el juego exportado en una computadora que no tenga Godot instalado. Lo que guardás en <code class="i">user://</code> funciona igual, pero <code class="i">res://</code> pasa a ser de solo lectura.</p>
   <p>Si tu juego sale para PC y celular, conviene una escena de opciones de gráficos: en celular bajás sombras, distancia de dibujo y vegetación.</p>`},
  {type:"quiz",kicker:"Pregunta",q:"¿Qué hay que descargar una sola vez antes de exportar?",options:["Las plantillas de exportación de tu versión de Godot","Un antivirus","Otro motor","Nada"],answer:0,explain:"Las plantillas son las versiones del motor para cada plataforma. Tienen que coincidir con tu versión de Godot."},
  {type:"quiz",kicker:"Repaso final",q:"¿Cuál es el orden sano para trabajar en un juego?",options:["Optimizar desde el día uno","Prototipo que funcione → que sea divertido → ordenar el código → medir y optimizar → exportar y probar","Exportar antes de programar","Hacer los gráficos finales primero"],answer:1,explain:"Primero que funcione y sea divertido. Después prolijo y rápido."},
  {type:"info",kicker:"¡Camino completo!",title:"GDScript, de 0 a profesional",html:`<p>Completaste el camino entero: desde qué es una instrucción hasta exportar un juego optimizado. Tenés todo lo necesario para leer cualquier proyecto de Godot y hacer el tuyo con vehículos, misiones y mundo abierto.</p><p>De acá en adelante, lo que más te va a hacer crecer es <b>terminar proyectos chicos</b> y leer el código de otros. ¡A programar, burro!</p>`}
 ]}
];

const COURSES={
 cero:{key:"cero",next:"gds",tag:"GDScript · Nivel 0",title:"De 0 en programación",sub:"Lo más básico de lo básico: qué es una instrucción, un script, una función, qué es _ready() y qué es una variable.",lessons:CERO},
 gds:{key:"gds",next:"gds2",tag:"GDScript · Nivel 1",title:"GDScript para juegos 3D",sub:"Variables, funciones, movimiento, teclado y física con ejemplos de juegos 3D.",lessons:GDS},
 gds2:{key:"gds2",next:"gds3",tag:"GDScript · Nivel 2",title:"GDScript intermedio",sub:"Tipos estáticos, diccionarios, enum y match, máquinas de estados, herencia, recursos propios y depuración.",lessons:GDS2},
 gds3:{key:"gds3",next:"gds4",tag:"GDScript · Nivel 3",title:"GDScript avanzado",sub:"Señales propias y await, lambdas y Callable, setters y getters, arrays tipados, funciones estáticas y scripts @tool.",lessons:GDS3},
 gds4:{key:"gds4",next:"gds5",tag:"GDScript · Nivel 4",title:"Arquitectura de juego",sub:"Instanciar escenas, componentes, bus de eventos, grupos, object pooling y guardar la partida en JSON.",lessons:GDS4},
 gds5:{key:"gds5",next:"gds6",tag:"GDScript · Nivel 5",title:"Matemática 3D para juegos",sub:"Vectores, producto punto y cono de visión, girar hacia objetivos, interpolar y rayos por código.",lessons:GDS5},
 gds6:{key:"gds6",next:"menu",tag:"GDScript · Nivel 6",title:"GDScript profesional",sub:"Medir y optimizar, código que no traba, call_deferred, organizar el proyecto con Git y exportar el juego.",lessons:GDS6},
 menu:{key:"menu",next:"fps2",tag:"Curso FPS 3D · Unidad 1",title:"El menú principal",sub:"Menú plano, menú con fondo 3D cinematográfico, opciones y transición al nivel.",lessons:LESSONS},
 fps2:{key:"fps2",next:"fps3",tag:"Curso FPS 3D · Unidad 2",title:"El jugador",sub:"La escena del jugador, Mapa de entrada, mirar con el mouse, caminar, saltar, correr y agacharse.",lessons:FPS2},
 fps3:{key:"fps3",next:"mis",tag:"Curso FPS 3D · Unidad 3",title:"Armas y disparo",sub:"El arma en la escena, disparo con RayCast3D, cadencia, munición, recarga, retroceso y dianas con vida.",lessons:FPS3},
 mis:{key:"mis",next:"mapa",tag:"Curso FPS 3D · Unidad 4",title:"Misiones",sub:"Objetivos en orden, zonas con Area3D, gestor de misiones, objetivos contra reloj, HUD y guardado del progreso.",lessons:MIS},
 mapa:{key:"mapa",tag:"Curso FPS 3D · Unidad 5",title:"Mapas y mundo abierto",sub:"Diseño del mapa, terreno con heightmap y ruido, bosques con MultiMesh, luz y niebla, y rendimiento en mapas grandes.",lessons:MAPA}
};

