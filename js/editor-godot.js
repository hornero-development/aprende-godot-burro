/* =================== GODOT INTERACTIVO =================== */
const IC={
 play:'<path d="M7 4v16l13-8z" fill="currentColor"/>',pause:'<path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor"/>',stop:'<path d="M5 5h14v14H5z" fill="currentColor"/>',
 sceneplay:'<path d="M3 4h10v4H3zM3 10h10v10H3z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 9v11l7-5.5z" fill="currentColor"/>',
 customplay:'<circle cx="8" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 6v12l7-6z" fill="currentColor"/>',
 plus:'<path d="M12 4v16M4 12h16" stroke="currentColor" stroke-width="2.6"/>',link:'<path d="M9 15l6-6M7 11l-2 2a3.5 3.5 0 0 0 5 5l2-2M17 13l2-2a3.5 3.5 0 0 0-5-5l-2 2" fill="none" stroke="currentColor" stroke-width="2"/>',
 filter:'<path d="M3 5h18l-7 8v6l-4-2v-4z" fill="none" stroke="currentColor" stroke-width="2"/>',
 script:'<path d="M6 3h9l4 4v14H6z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 11h7M9 15h7" stroke="currentColor" stroke-width="2"/>',
 scriptadd:'<path d="M5 3h9l4 4v6M5 3v18h8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M18 15v7M14.5 18.5h7" stroke="#8fe388" stroke-width="2.4"/>',
 eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',
 eyeoff:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" fill="none" stroke="currentColor" stroke-width="2" opacity=".4"/><path d="M4 20 20 4" stroke="currentColor" stroke-width="2"/>',
 signal:'<path d="M4 18c2-6 6-9 12-9M16 5l4 4-4 4" fill="none" stroke="currentColor" stroke-width="2.2"/>',
 folder:'<path d="M3 6h7l2 2h9v11H3z" fill="#7aa8d6"/>',tscn:'<rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="#e0e0e0" stroke-width="2"/><path d="M8 9h8M8 13h8M8 17h5" stroke="#e0e0e0" stroke-width="2"/>',
 gd:'<rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="#8fd1ff" stroke-width="2"/><path d="M8 10l3 2-3 2M12 16h4" stroke="#8fd1ff" stroke-width="2" fill="none"/>',
 svg:'<rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="#ff8c7a" stroke-width="2"/><circle cx="12" cy="11" r="3" fill="#ff8c7a"/>',
 cfg:'<circle cx="12" cy="12" r="4" fill="none" stroke="#c3cad5" stroke-width="2"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" stroke="#c3cad5" stroke-width="2"/>',
 select:'<path d="M5 3l14 8-6 2-2 6z" fill="currentColor"/>',move:'<path d="M12 2v20M2 12h20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M2 12l3-3M2 12l3 3M22 12l-3-3M22 12l-3 3" fill="none" stroke="currentColor" stroke-width="2"/>',
 rotate:'<path d="M20 12a8 8 0 1 1-3-6.2M20 3v6h-6" fill="none" stroke="currentColor" stroke-width="2.2"/>',scale:'<path d="M4 4h7v2H6v5H4zM20 20h-7v-2h5v-5h2zM8 8l8 8" fill="currentColor" stroke="currentColor" stroke-width="1.5"/>',
 ruler:'<path d="M3 17 17 3l4 4L7 21z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 12l2 2M11 9l2 2M14 6l2 2" stroke="currentColor" stroke-width="2"/>',
 lock:'<path d="M7 10V8a5 5 0 0 1 10 0v2h1v11H6V10z" fill="none" stroke="currentColor" stroke-width="2"/>',group:'<rect x="3" y="3" width="8" height="8" fill="none" stroke="currentColor" stroke-width="2"/><rect x="13" y="13" width="8" height="8" fill="none" stroke="currentColor" stroke-width="2"/>',
 magnet:'<path d="M6 3v9a6 6 0 0 0 12 0V3h-4v9a2 2 0 0 1-4 0V3z" fill="none" stroke="currentColor" stroke-width="2"/>',cam:'<rect x="2" y="7" width="14" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 11l6-3v9l-6-3z" fill="currentColor"/>',
 local:'<path d="M12 3v18M3 12h18" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/>',
 x:'<path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2.4"/>',tri:'<path d="M8 5l10 7-10 7z" fill="currentColor"/>',tridown:'<path d="M5 8l7 10 7-10z" fill="currentColor"/>',
 ws2d:'<rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M7 15l4-5 3 3 3-4" fill="none" stroke="currentColor" stroke-width="2"/>',
 ws3d:'<path d="M12 2 21 7v10l-9 5-9-5V7z M12 12l9-5M12 12v10M12 12 3 7" fill="none" stroke="currentColor" stroke-width="2"/>',
 wsscript:'<path d="M8 6 3 12l5 6M16 6l5 6-5 6" fill="none" stroke="currentColor" stroke-width="2.2"/>',wsasset:'<path d="M4 7h16v13H4zM8 7V4h8v3" fill="none" stroke="currentColor" stroke-width="2"/>',
 search:'<circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 15l6 6" stroke="currentColor" stroke-width="2"/>'
};
const ic=(n,extra="")=>`<svg viewBox="0 0 24 24" aria-hidden="true" ${extra}>${IC[n]}</svg>`;

const TYPES={
 Node:{c:"node",d:"El nodo más básico. No se dibuja ni tiene posición. Sirve para lógica, por ejemplo un administrador de puntajes."},
 Timer:{c:"node",d:"Cuenta tiempo y emite la señal timeout. Ideal para recargas de armas, respawn o una bomba con cuenta regresiva."},
 AnimationPlayer:{c:"node",d:"Guarda y reproduce animaciones de casi cualquier propiedad: posición, color, transparencia, incluso llamar funciones."},
 AudioStreamPlayer:{c:"node",d:"Reproduce sonido sin posición, como la música del menú. Para sonidos en el espacio 3D se usa AudioStreamPlayer3D."},
 CanvasLayer:{c:"node",d:"Una capa 2D aparte que se dibuja encima (o debajo) del resto. Se usa para el HUD y los menús sobre un mundo 3D, porque no se mueve con la cámara."},
 WorldEnvironment:{c:"node",d:"Define el ambiente de la escena 3D: cielo, niebla, brillo (glow), color de la luz ambiente y corrección de color."},
 Node2D:{c:"2d",d:"La base de todo lo 2D que tiene posición, rotación y escala. Para juegos de plataformas o vista desde arriba."},
 Sprite2D:{c:"2d",d:"Muestra una imagen en un juego 2D."},
 Node3D:{c:"3d",d:"La base de todo lo 3D: tiene posición, rotación y escala en el espacio. Muchas escenas 3D usan uno como raíz."},
 Camera3D:{c:"3d",d:"Es el ojo del jugador. Lo que ve la cámara activa es lo que se muestra en pantalla. En un FPS va pegada a la cabeza del jugador."},
 DirectionalLight3D:{c:"3d",d:"Una luz que viene de una dirección, como el sol. Ilumina toda la escena por igual y puede proyectar sombras."},
 OmniLight3D:{c:"3d",d:"Una luz que sale de un punto hacia todos lados, como una lámpara o una fogata."},
 MeshInstance3D:{c:"3d",d:"Muestra un modelo 3D (una malla): montañas, edificios, el cuerpo del tanque. No tiene colisión por sí solo."},
 GPUParticles3D:{c:"3d",d:"Genera muchas partículas usando la placa de video: nieve, humo, chispas, polvo de un tanque, fuego de escape de un avión."},
 CharacterBody3D:{c:"3d",d:"Un cuerpo que movés con código y choca con paredes. Es la base del jugador FPS."},
 VehicleBody3D:{c:"3d",d:"Un cuerpo con física de vehículo. Le agregás hijos VehicleWheel3D y ya tenés un auto o un tanque con ruedas que aceleran, frenan y doblan."},
 RigidBody3D:{c:"3d",d:"Un objeto que se mueve solo con la física: cae, rebota, se empuja. Barriles, cajas, restos de una explosión."},
 Area3D:{c:"3d",d:"Una zona invisible que detecta cuándo algo entra o sale. Para puntos de control, minas o zonas de misión."},
 CollisionShape3D:{c:"3d",d:"Le da forma de choque a su padre (CharacterBody3D, RigidBody3D, Area3D). Sin esto, los cuerpos no chocan con nada."},
 Control:{c:"ui",d:"La base de toda la interfaz: menús, HUD, botones. Tiene tamaño, anclas y se adapta a distintas resoluciones."},
 Button:{c:"ui",d:"Un botón que se puede tocar con mouse, teclado o joystick. Emite la señal pressed cuando lo apretás."},
 Label:{c:"ui",d:"Muestra texto: títulos, munición, puntaje, nombre de la misión."},
 TextureRect:{c:"ui",d:"Muestra una imagen dentro de la interfaz, como el fondo de un menú plano o un ícono."},
 ColorRect:{c:"ui",d:"Un rectángulo de un color. Muy usado para fundidos a negro o para oscurecer la pantalla en una pausa."},
 HSlider:{c:"ui",d:"Una barra deslizable horizontal. Perfecta para volumen o sensibilidad del mouse. Emite value_changed."},
 CheckButton:{c:"ui",d:"Un interruptor de encendido y apagado. Para opciones como pantalla completa o sincronización vertical."},
 VBoxContainer:{c:"ui",d:"Acomoda a sus hijos uno debajo del otro automáticamente. Ideal para la lista de botones del menú."}
};
const CATCOL={node:"#e0e0e0","2d":"#8da5f3","3d":"#fc7f7f",ui:"#8eef97"};
function nodeIcon(type){const c=CATCOL[(TYPES[type]||{c:"node"}).c];
  if(type==="Label")return `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h12M12 5v14" stroke="${c}" stroke-width="3"/></svg>`;
  if(type==="Button")return `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="10" rx="3" fill="${c}"/></svg>`;
  if(type==="Camera3D")return `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" style="color:${c}">${IC.cam}</svg>`;
  if(type==="VBoxContainer")return `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="5" fill="none" stroke="${c}" stroke-width="2"/><rect x="4" y="10" width="16" height="5" fill="none" stroke="${c}" stroke-width="2"/><rect x="4" y="17" width="16" height="4" fill="none" stroke="${c}" stroke-width="2"/></svg>`;
  if(/Light/.test(type))return `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="${c}"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.5 2.5M16.5 16.5 19 19M5 19l2.5-2.5M16.5 7.5 19 5" stroke="${c}" stroke-width="2"/></svg>`;
  const cat=(TYPES[type]||{c:"node"}).c;
  if(cat==="ui")return `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="${c}" stroke-width="2.5"/></svg>`;
  if(cat==="3d")return `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="${c}" stroke-width="2.5"/><circle cx="12" cy="12" r="2.5" fill="${c}"/></svg>`;
  if(cat==="2d")return `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="${c}" stroke-width="2.5"/></svg>`;
  return `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="${c}" stroke-width="2.5"/></svg>`;
}

const HELP={
 "menu-Escena":["Menú Escena","Crear, abrir, guardar y cerrar escenas. En Godot cada pantalla o pieza del juego es una escena (archivo .tscn)."],
 "menu-Proyecto":["Menú Proyecto","Configuración de todo el juego: escena principal, resolución, controles (Mapa de entrada) y Exportar para Windows, Android o Web."],
 "menu-Depurar":["Menú Depurar","Opciones para encontrar errores mientras el juego corre, como ver las formas de colisión o la navegación."],
 "menu-Editor":["Menú Editor","Ajustes del propio editor: tema de colores, atajos de teclado, idioma y diseño de paneles."],
 "menu-Ayuda":["Menú Ayuda","Abre la documentación. Apretando F1 buscás cualquier clase, por ejemplo VehicleBody3D, y ves todas sus funciones."],
 "ws-2d":["Espacio 2D","Muestra el editor 2D. Acá armás las interfaces (menús, HUD) y los juegos 2D. Atajo: Ctrl+F1."],
 "ws-3d":["Espacio 3D","Muestra el mundo 3D: niveles, vehículos, el jugador. Atajo: Ctrl+F2."],
 "ws-script":["Espacio Script","El editor de código GDScript. Muestra el script del nodo que elijas. Atajo: Ctrl+F3."],
 "ws-asset":["AssetLib","La biblioteca de recursos gratis de la comunidad: plugins, ejemplos y plantillas. Necesita internet."],
 "run-play":["Ejecutar proyecto (F5)","Arranca el juego desde la escena principal, la que pusiste en Proyecto → Configuración. Probalo: abre el juego en una ventana."],
 "run-pause":["Pausar (F7)","Congela el juego que está corriendo para inspeccionar qué pasa en ese momento."],
 "run-stop":["Detener (F8)","Cierra el juego que está corriendo y volvés al editor."],
 "run-scene":["Ejecutar escena actual (F6)","Corre solo la escena que tenés abierta. Muy útil para probar un vehículo o un menú sin pasar por todo el juego."],
 "run-custom":["Ejecutar escena específica (Ctrl+Mayús+F5)","Te deja elegir cualquier escena del proyecto para probarla."],
 "renderer":["Renderizador","Forward+ es el modo con mejores gráficos para PC. Mobile es más liviano para celulares. Compatibility funciona en máquinas viejas y en la web."],
 "dock-escena":["Pestaña Escena","Muestra el árbol de nodos de la escena abierta. Cada escena es un árbol: un nodo raíz con hijos, nietos, etc."],
 "dock-importar":["Pestaña Importar","Configura cómo Godot importa un archivo: calidad de imagen, si un modelo 3D trae colisiones, si un sonido se repite en bucle."],
 "tb-add":["Añadir nodo hijo (Ctrl+A)","Abre la lista de todos los tipos de nodo. El nuevo nodo queda como hijo del que tengas seleccionado. Probalo."],
 "tb-instance":["Instanciar escena hija","Mete otra escena entera como hijo. Así ponés tu tanque.tscn adentro de nivel_1.tscn las veces que quieras."],
 "tb-filter":["Filtrar nodos","Busca nodos por nombre o tipo cuando el árbol es muy grande."],
 "tb-script":["Adjuntar script","Crea o asigna un archivo .gd al nodo seleccionado para darle comportamiento con código."],
 "eye":["Visibilidad","El ojito muestra u oculta el nodo y todos sus hijos en el editor y en el juego. Tocalo para probar."],
 "scr-ic":["Script adjunto","Este nodo tiene un script. Tocá el ícono para abrirlo en el espacio Script."],
 "sig-ic":["Señales conectadas","Este nodo tiene señales conectadas a funciones. Tocá para ver la pestaña Nodo del Inspector."],
 "dock-fs":["Sistema de archivos","Todos los archivos del proyecto. res:// es la carpeta raíz del juego. Arrastrá escenas al árbol o hacé doble clic para abrir."],
 "fs-path":["Ruta actual","res:// significa recurso del proyecto. Todas las rutas de tu código empiezan así, por ejemplo res://escenas/nivel_1.tscn."],
 "fs-search":["Buscar archivos","Filtra los archivos por nombre."],
 "fs-folder":["Carpeta","Ordená tu proyecto en carpetas: escenas, scripts, modelos, sonidos. Godot no te obliga, pero ayuda muchísimo."],
 "fs-tscn":["Archivo de escena (.tscn)","Una escena guardada. Doble clic para abrirla en una pestaña."],
 "fs-gd":["Script GDScript (.gd)","Un archivo de código. Doble clic para abrirlo en el editor de scripts."],
 "fs-svg":["icon.svg","El ícono del juego. Se usa en la ventana y al exportar."],
 "fs-cfg":["project.godot","El archivo de configuración del proyecto. Godot lo edita solo cuando cambiás cosas en Proyecto → Configuración."],
 "scene-tab":["Pestaña de escena","Cada escena abierta tiene su pestaña. Podés tener el menú, el nivel y el tanque abiertos a la vez."],
 "vp":["Viewport","El área de trabajo. Ves y acomodás los nodos de la escena. En 2D el rectángulo violeta es el tamaño de la pantalla del juego."],
 "vp3d":["Viewport 3D","Ves el mundo 3D. En Godot real lo recorrés con clic derecho + WASD, como en un FPS. Acá mové el mouse para mirar."],
 "tool-select":["Modo selección (Q)","Hacé clic sobre algo en el viewport para seleccionarlo. Probalo tocando un botón del menú."],
 "tool-move":["Modo mover (W)","Arrastrás el nodo para cambiarle la posición."],
 "tool-rotate":["Modo rotar (E)","Gira el nodo seleccionado."],
 "tool-scale":["Modo escalar (S)","Agranda o achica el nodo seleccionado."],
 "tool-ruler":["Regla (R)","Mide distancias en píxeles dentro del viewport 2D."],
 "tool-lock":["Bloquear","Traba el nodo para no moverlo sin querer, por ejemplo el fondo del menú."],
 "tool-group":["Agrupar","Hace que al hacer clic en un hijo se seleccione el padre. Útil para mover todo un grupo junto."],
 "tool-snap":["Ajuste (snap)","Hace que al mover las cosas se peguen a una grilla. Ideal para alinear botones o piezas de un nivel."],
 "tool-zoom":["Zoom","Acercar o alejar la vista. Con la rueda del mouse en Godot real."],
 "tool-local":["Espacio local / global (T)","Decide si mover usa los ejes del objeto (local) o los del mundo (global). En un avión inclinado se nota mucho la diferencia."],
 "tool-persp":["Perspectiva","El menú de vista: perspectiva, vista de arriba, de frente, de costado. También muestra estadísticas como FPS del editor."],
 "tool-camprev":["Vista previa de cámara","Muestra exactamente lo que ve la Camera3D seleccionada, como lo vería el jugador."],
 "gizmo":["Gizmo de ejes","X rojo, Y verde (arriba) y Z azul. Tocá un eje en Godot real para mirar desde ese lado."],
 "insp":["Inspector","Muestra todas las propiedades del nodo seleccionado. Cambiás un valor y se aplica al instante. Probá cambiar el texto de un botón."],
 "insp-tab":["Pestaña Inspector","Las propiedades del nodo: posición, tamaño, texto, color y las variables @export de tu script."],
 "nodo-tab":["Pestaña Nodo","Señales y grupos del nodo. Desde acá conectás pressed de un botón a una función de tu script."],
 "bp-Salida":["Salida","Muestra los mensajes del juego y los print() de tu código. Es tu mejor amigo para encontrar errores."],
 "bp-Depurador":["Depurador","Errores, advertencias, puntos de interrupción y rendimiento (FPS, memoria) mientras el juego corre."],
 "bp-Audio":["Audio","Los buses de audio: Master, Música, Efectos. Ajustás volúmenes y agregás efectos como eco. Movés el slider y cambia el volumen de los clics."],
 "bp-Animación":["Animación","El editor de animaciones de un AnimationPlayer: línea de tiempo con fotogramas clave."],
 "bp-Shader":["Editor de shaders","Para escribir shaders: efectos visuales programados, como agua, calor del motor o un escudo."],
 "sc-list":["Lista de scripts","Los scripts abiertos. Tocá uno para verlo."],
 "sc-methods":["Lista de funciones","Todas las funciones del script. Tocá una para saltar a esa línea."],
 "game":["Ventana del juego","Así corre tu juego. Lo que pase acá se registra en el panel Salida de abajo. Cerralo con Detener (F8) o la X."],
 "dlg":["Crear nuevo nodo","Elegí un tipo de nodo. Abajo aparece su descripción. Verde es interfaz, azul es 2D, rojo es 3D, blanco es general."]
};
const MENUS={
 Escena:[["Nueva escena","Crea una escena vacía."],["Abrir escena…","Abre un .tscn del proyecto."],["Guardar escena (Ctrl+S)","Guarda la escena abierta. Hacelo seguido."],["Guardar todas las escenas","Guarda todo lo que tengas abierto."],["Cerrar escena","Cierra la pestaña actual."]],
 Proyecto:[["Configuración del proyecto…","Escena principal, resolución, nombre del juego y el Mapa de entrada, donde definís teclas como disparar o acelerar."],["Exportar…","Genera el ejecutable del juego para Windows, Linux, Android, iOS o Web."],["Abrir carpeta de datos del usuario","Donde se guardan las partidas y configuraciones (user://)."],["Recargar proyecto actual","Reinicia el editor con el proyecto."]],
 Depurar:[["Formas de colisión visibles","Dibuja las colisiones mientras el juego corre. Clave para ver por qué un tanque se traba."],["Navegación visible","Muestra por dónde pueden caminar los enemigos."],["Sincronizar cambios de escena","Lo que cambiás en el editor aparece en el juego mientras corre."]],
 Editor:[["Configuración del editor…","Tema, fuentes, idioma, atajos."],["Diseño del editor","Guardar o cargar cómo acomodaste los paneles."],["Administrar plantillas de exportación","Descarga lo necesario para exportar el juego."]],
 Ayuda:[["Buscar en la ayuda (F1)","Busca cualquier clase de Godot y ves su documentación completa."],["Documentación en línea","Abre docs.godotengine.org."],["Acerca de Godot","Versión del motor y créditos."]]
};

let uid=1;
const mk=(name,type,extra={},children=[])=>({id:uid++,name,type,visible:true,open:true,children,...extra});
function mkButtons(){return [mk("BotonCampana","Button",{text:"Campaña",act:"campana",sig:"_on_boton_campana_pressed"}),mk("BotonVehiculos","Button",{text:"Misiones con vehículos",act:"vehiculos",sig:"_on_boton_vehiculos_pressed"}),
  mk("BotonOpciones","Button",{text:"Opciones",act:"opciones",sig:"_on_boton_opciones_pressed"}),mk("BotonSalir","Button",{text:"Salir",act:"salir",sig:"_on_boton_salir_pressed"})]}
function makeScenes(){return {
  plano:{file:"menu_plano.tscn",root:mk("MenuPrincipal","Control",{script:"menu.gd"},[mk("Fondo","TextureRect"),mk("Titulo","Label",{text:"OPERACIÓN BURRO"}),mk("VBox","VBoxContainer",{sep:4},mkButtons())])},
  tres:{file:"menu_3d.tscn",root:mk("MenuPrincipal","Node3D",{script:"fondo.gd"},[mk("Camera3D","Camera3D"),mk("WorldEnvironment","WorldEnvironment"),mk("DirectionalLight3D","DirectionalLight3D"),
    mk("Montanas","MeshInstance3D"),mk("Ruinas","MeshInstance3D"),mk("Fogata","OmniLight3D"),mk("Nieve","GPUParticles3D"),
    mk("CanvasLayer","CanvasLayer",{},[mk("Menu","Control",{script:"menu.gd"},[mk("Titulo","Label",{text:"OPERACIÓN BURRO"}),mk("VBox","VBoxContainer",{sep:4},mkButtons())])])])}
}}
const SCRIPTS={"menu.gd":MENU_GD,"fondo.gd":FONDO_GD,"opciones.gd":OPCIONES_GD,"jugador.gd":JUGADOR_GD};

function walk(n,f,d=0,p=null){f(n,d,p);n.children.forEach(c=>walk(c,f,d+1,n))}
function findNode(id){let r=null,par=null;walk(G.scenes[G.scene].root,(n,d,p)=>{if(n.id===id){r=n;par=p}});return r?{n:r,p:par}:null}
function curRoot(){return G.scenes[G.scene].root}
function uiRoot(){const r=curRoot();if(r.type==="Control")return r;let u=null;walk(r,n=>{if(!u&&n.type==="Control")u=n});return u}

function lineHelp(line){
  const t=line.trim();
  if(!t)return["Línea vacía","Separar bloques con líneas vacías hace el código más fácil de leer."];
  if(t.startsWith("#"))return["Comentario","Todo lo que va después de # lo ignora Godot. Sirve para dejarte notas a vos mismo."];
  if(/^extends/.test(t))return["extends",`Dice de qué tipo de nodo hereda el script. <code>${esc(t)}</code> significa que este script solo se puede poner en un nodo de ese tipo (o hijos de ese tipo).`];
  if(/^@export/.test(t))return["@export","Hace que la variable aparezca en el Inspector. Así la cambiás desde el editor sin tocar el código. Probá elegir MenuPrincipal y cambiar Amplitud."];
  if(/^@onready/.test(t))return["@onready","La variable se llena recién cuando el nodo está listo. <code>$Camera3D</code> busca el hijo llamado Camera3D."];
  if(/^var /.test(t))return["var","Declara una variable. <code>:=</code> hace que Godot deduzca el tipo solo (número, texto, vector)."];
  if(/^func _ready/.test(t))return["_ready()","Se ejecuta una sola vez, cuando el nodo y todos sus hijos ya están en la escena. Ideal para preparar cosas."];
  if(/^func _process/.test(t))return["_process(delta)","Se ejecuta en cada frame (60 veces por segundo o más). delta es el tiempo desde el frame anterior, para que todo vaya a la misma velocidad en cualquier PC."];
  if(/^func _input/.test(t))return["_input(event)","Se ejecuta cada vez que hay una entrada: tecla, mouse, joystick."];
  if(/^func _on_/.test(t))return["Función de señal","Esta función la llama una señal. Godot la creó al conectar, por ejemplo, pressed del botón. Mirala en Inspector → Nodo."];
  if(/^func /.test(t))return["func","Define una función: un bloque de código con nombre que podés llamar cuando quieras."];
  if(/grab_focus/.test(t))return["grab_focus()","Deja el botón seleccionado al abrir el menú, así se puede usar con teclado o joystick sin mouse."];
  if(/change_scene_to_file/.test(t))return["change_scene_to_file()","Cierra la escena actual y abre la que indica la ruta. Así pasás del menú al nivel."];
  if(/quit\(\)/.test(t))return["quit()","Cierra el juego."];
  if(/\.show\(\)|^show\(\)/.test(t))return["show()","Hace visible el nodo."];
  if(/\.hide\(\)|^hide\(\)/.test(t))return["hide()","Oculta el nodo. Sigue existiendo, solo no se ve."];
  if(/sin\(/.test(t))return["sin()","Seno: un valor que oscila suave entre -1 y 1. Multiplicado por amplitud da el balanceo de la cámara."];
  if(/rot_base = /.test(t))return["Guardar la rotación inicial","Recordamos cómo estaba la cámara al principio para balancearla alrededor de esa posición."];
  if(/t \+= delta/.test(t))return["Acumular tiempo","t crece un poco cada frame. Usar delta hace que el movimiento sea igual en una PC rápida o lenta."];
  if(/AudioServer/.test(t))return["AudioServer","Controla los buses de audio. set_bus_volume_db cambia el volumen en decibeles."];
  if(/DisplayServer/.test(t))return["DisplayServer","Controla la ventana: pantalla completa, tamaño, título."];
  if(/mouse_mode/.test(t))return["Capturar el mouse","Esconde el cursor y lo encierra en la ventana, como en todo FPS. Con Esc se suele liberar."];
  if(/^func _unhandled_input/.test(t))return["_unhandled_input(event)","Recibe las entradas que la interfaz no usó. Así, si hacés clic en un botón del HUD, el jugador no gira."];
  if(/^func _physics_process/.test(t))return["_physics_process(delta)","Como _process, pero a ritmo fijo de 60 por segundo. Todo lo de física y movimiento del jugador va acá."];
  if(/event\.relative/.test(t)&&/rotate_y/.test(t))return["Girar el cuerpo con el mouse","event.relative es cuánto se movió el mouse. El movimiento horizontal gira todo el cuerpo en el eje Y."];
  if(/rotate_x/.test(t))return["Mirar arriba y abajo","El movimiento vertical del mouse gira solo la cabeza en X, así la cámara mira arriba y abajo sin inclinar el cuerpo."];
  if(/clamp\(/.test(t))return["clamp()","Limita un valor entre un mínimo y un máximo. Acá evita que la cabeza dé la vuelta entera (1.4 rad son unos 80°)."];
  if(/ProjectSettings/.test(t))return["Gravedad del proyecto","Lee la gravedad que está en Proyecto → Configuración → Física (9.8 por defecto). Así todo el juego usa la misma."];
  if(/is_on_floor/.test(t)&&/velocity\.y = /.test(t)===false&&/not is_on_floor/.test(t))return["not is_on_floor()","Si el jugador está en el aire, la gravedad lo va tirando hacia abajo."];
  if(/is_action_just_pressed/.test(t))return["is_action_just_pressed()","Es true solo en el frame en que apretás la acción. Para saltar o disparar semiautomático."];
  if(/velocity\.y = /.test(t))return["Saltar","Le das velocidad hacia arriba de golpe. La gravedad la va frenando hasta que vuelve a caer."];
  if(/velocity\.y -= /.test(t))return["Aplicar gravedad","Cada frame la velocidad vertical baja un poco. Por eso el salto sube, frena y cae."];
  if(/get_vector/.test(t))return["Input.get_vector()","Junta 4 acciones en un Vector2: x es izquierda/derecha, y es adelante/atrás. Funciona igual con teclado o joystick."];
  if(/transform\.basis/.test(t))return["Dirección según adonde mirás","transform.basis gira la entrada para que adelante sea hacia donde mira el jugador, no siempre hacia el norte del mapa."];
  if(/velocity\.(x|z) = /.test(t))return["Velocidad horizontal","La dirección por la velocidad da cuánto se mueve en X y Z."];
  if(/move_and_slide/.test(t))return["move_and_slide()","Mueve el cuerpo con velocity y lo hace deslizar contra el piso y las paredes en vez de atravesarlos."];
  if(/^if |^else/.test(t))return["if / else","Decide qué hacer según una condición."];
  return["Línea de código",esc(t)];
}

function propsFor(n){
  const P=[];const sec=s=>P.push({sec:s});
  const add=(k,label,val,kind,help)=>P.push({k,label,val,kind,help});
  if(n.script==="fondo.gd"){sec("Variables del script (fondo.gd)");
    add("amp","Amplitud",S.amp,"num","Viene de @export var amplitud. Cuánto gira la cámara. Probá 0.4 y mirá la pestaña 3D.");
    add("spd","Velocidad",S.spd,"num","Viene de @export var velocidad. Qué tan rápido respira la cámara.")}
  const cat=(TYPES[n.type]||{}).c;
  if(n.type==="Button"){sec("Button");
    add("text","Text",n.text,"text","El texto que muestra el botón. Cambialo y mirá el viewport y el juego.");
    add("flat","Flat",!!n.flat,"bool","Sin fondo: solo el texto, como en los menús de juegos AAA.");
    add("disabled","Disabled",!!n.disabled,"bool","Desactiva el botón: se ve gris y no se puede apretar.");
    add("icon","Icon","<vacío>","res","Una imagen al lado del texto, por ejemplo un ícono de tanque.")}
  if(n.type==="Label"){sec("Label");add("text","Text",n.text,"text","El texto que se muestra.");
    add("align","Horizontal Alignment","Left","ro","Alineación: izquierda, centro o derecha.");add("wrap","Autowrap Mode","Off","ro","Si el texto largo baja a la línea siguiente.")}
  if(n.type==="TextureRect"){sec("TextureRect");add("tex","Texture","fondo_montanas.png","res","La imagen que se muestra.");add("exp","Expand Mode","Ignore Size","ro","Cómo se adapta la imagen al tamaño del nodo.");add("str","Stretch Mode","Keep Aspect Covered","ro","Cubre toda la pantalla sin deformarse.")}
  if(n.type==="VBoxContainer"){sec("VBoxContainer");add("sep","Separation",n.sep,"num","Espacio en píxeles entre cada hijo. Está en Theme Overrides → Constants.");add("al","Alignment","Begin","ro","Si los hijos se juntan arriba, al centro o abajo.")}
  if(n.type==="HSlider"){sec("Range");add("min","Min Value",0,"ro","Valor mínimo.");add("max","Max Value",1,"ro","Valor máximo.");add("stepv","Step",0.05,"ro","De a cuánto cambia.")}
  if(n.type==="CheckButton"){sec("BaseButton");add("tp","Button Pressed",false,"ro","Si arranca encendido.")}
  if(n.type==="ColorRect"){sec("ColorRect");add("col","Color","#000000","ro","El color del rectángulo.")}
  if(n.type==="Camera3D"){sec("Camera3D");add("fov","Fov",S.ok?S.cam.fov:55,"num","Campo de visión en grados. En un FPS se usa entre 70 y 90. Bajalo para hacer zoom de mira.");
    add("current","Current",true,"ro","Si esta es la cámara activa.");add("far","Far",400,"ro","Hasta qué distancia se dibuja.")}
  if(n.type==="WorldEnvironment"){sec("Environment");add("fog","Fog Enabled",!!(S.ok&&S.scene.fog),"bool","Niebla: da profundidad y esconde el final del mapa. Apagala y mirá la pestaña 3D.");
    add("bg","Background Mode","Sky","ro","El fondo: cielo, color liso o una imagen.");add("glow","Glow Enabled",true,"ro","Brillo alrededor de las luces fuertes.")}
  if(n.type==="DirectionalLight3D"){sec("Light3D");add("energy","Energy",S.ok?+S.sun.intensity.toFixed(2):1,"num","Intensidad de la luz del sol.");add("shadow","Shadow Enabled",true,"ro","Proyectar sombras.")}
  if(n.type==="OmniLight3D"){sec("Light3D");add("omni","Omni Range",30,"ro","Hasta dónde llega la luz.");add("lc","Color","#ff8a3a","ro","Color naranja de fogata.")}
  if(n.type==="MeshInstance3D"){sec("MeshInstance3D");add("mesh","Mesh",n.name==="Montanas"?"ArrayMesh (montañas)":"BoxMesh","res","El modelo 3D que se muestra.");add("mat","Material Override","StandardMaterial3D","res","Color y textura de la superficie.")}
  if(n.type==="GPUParticles3D"){sec("GPUParticles3D");add("emit","Emitting",S.ok?S.pts.visible:true,"bool","Si está generando partículas. Apagalo y la nieve desaparece.");add("amount","Amount",1600,"ro","Cuántas partículas.");add("life","Lifetime",8,"ro","Cuántos segundos vive cada una.")}
  if(n.type==="CanvasLayer"){sec("CanvasLayer");add("layer","Layer",1,"ro","El orden de las capas. Más alto se dibuja encima.");add("follow","Follow Viewport",false,"ro","Si se mueve con la cámara. Apagado para menús y HUD.")}
  if(n.type==="Timer"){sec("Timer");add("wait","Wait Time",1,"ro","Segundos hasta emitir timeout.");add("auto","Autostart",false,"ro","Si arranca solo.")}
  if(cat==="ui"){sec("Control");add("vis","Visible",n.visible,"bool","Mostrar u ocultar. Es lo mismo que el ojito del árbol.");
    add("layout","Layout Mode","Anchors","ro","Anclas: cómo se pega a los bordes de la pantalla para adaptarse a cualquier resolución.");add("tip","Tooltip Text","","ro","Texto de ayuda al dejar el mouse encima.")}
  if(cat==="3d"){sec("Node3D · Transform");add("vis","Visible",n.visible,"bool","Mostrar u ocultar el nodo en el mundo 3D.");
    add("pos","Position","(0, 0, 0)","ro","Posición en metros: X derecha, Y arriba, Z hacia la cámara.");add("rot","Rotation","(0°, 0°, 0°)","ro","Rotación en grados.");add("scl","Scale","(1, 1, 1)","ro","Tamaño.")}
  sec("Node");add("pm","Process Mode","Inherit","ro","Si el nodo sigue funcionando cuando el juego está en pausa. Para el menú de pausa se usa Always.");
  return P;
}
function onProp(n,k,v){
  if(k==="amp"){S.amp=Math.max(0,Math.min(1,v));log(`amplitud = ${S.amp}`,"inf")}
  else if(k==="spd"){S.spd=Math.max(0,Math.min(3,v));log(`velocidad = ${S.spd}`,"inf")}
  else if(k==="text"){n.text=v;rViewport()}
  else if(k==="flat"){n.flat=v;rViewport()}
  else if(k==="disabled"){n.disabled=v;rViewport()}
  else if(k==="sep"){n.sep=Math.max(0,Math.min(40,v));rViewport()}
  else if(k==="fov"&&S.ok){S.cam.fov=Math.max(20,Math.min(120,v));S.cam.updateProjectionMatrix()}
  else if(k==="fog"&&S.ok){S.scene.fog=v?S.fog:null}
  else if(k==="energy"&&S.ok){S.sun.intensity=Math.max(0,Math.min(5,v))}
  else if(k==="emit"&&S.ok){S.pts.visible=v}
  else if(k==="vis"){setVis(n,v);rTree()}
}
function setVis(n,v){n.visible=v;if(S.ok&&S.objs[n.name]&&G.scene==="tres")S.objs[n.name].forEach(o=>o.visible=v);rViewport()}
function signalsFor(n){const S2=[];
  if(n.type==="Button")S2.push(["pressed()","Se emite al apretar y soltar el botón. Es la que usás para el menú."],["button_down()","Al empezar a apretar."],["button_up()","Al soltar."],["toggled(toggled_on: bool)","Para botones que quedan encendidos o apagados."]);
  if(n.type==="HSlider")S2.push(["value_changed(value: float)","Cada vez que movés la barra. Ideal para el volumen."]);
  if(n.type==="CheckButton")S2.push(["toggled(toggled_on: bool)","Al encender o apagar el interruptor."]);
  if(n.type==="Timer")S2.push(["timeout()","Cuando termina la cuenta."]);
  if(n.type==="Area3D")S2.push(["body_entered(body)","Cuando un cuerpo entra al área: el jugador llega al punto de control."],["body_exited(body)","Cuando sale."]);
  const cat=(TYPES[n.type]||{}).c;
  if(cat==="ui")S2.push(["mouse_entered()","El mouse pasa por encima. Sirve para sonidos de hover."],["focus_entered()","Quedó seleccionado con teclado o joystick."],["resized()","Cambió de tamaño."]);
  if(cat==="3d")S2.push(["visibility_changed()","Se mostró u ocultó."]);
  S2.push(["ready()","El nodo está listo en la escena."],["tree_exiting()","El nodo está por salir de la escena."]);
  return S2;
}

/* ---- log ---- */
function log(txt,cls=""){G.log.push({txt,cls});if(G.log.length>200)G.log.shift();if(G.bottom==="Salida")rBottom(true)}

/* ---- editor: render ---- */
function renderGodot(){
  setNav("");location.hash="godot";stop3D();
  if(!G){G={scenes:makeScenes(),scene:"tres",ws:"3d",sel:null,script:"menu.gd",bottom:"Salida",inspTab:"insp",explain:true,tour:-1,running:false,menuOpen:null,dlg:false,dlgType:"Node3D",
    log:[{txt:"Godot Engine v4.3.stable.official - https://godotengine.org",cls:"inf"},{txt:"Vulkan 1.3 - Forward+ - Usando dispositivo: tu placa de video",cls:"mut"},{txt:"Simulación educativa de Aprende Godot Burro. Pasá el mouse por cualquier parte para ver qué hace.",cls:"mut"}]};
    G.sel=G.scenes.tres.root.id}
  G.running=false;G.tour=-1;G.dlg=false;G.menuOpen=null;
  app.innerHTML=`<div class="gd-head"><div><h1>Godot interactivo</h1>
      <p class="lead">Una réplica del editor de Godot 4. Pasá el mouse o tocá cualquier botón, panel o nodo y te explico para qué sirve. Podés seleccionar nodos, cambiar propiedades y ejecutar el juego.</p></div>
    <div class="gd-tools"><label class="toggle"><input type="checkbox" id="g-explain" ${G.explain?"checked":""}> Explicar al pasar el mouse</label>
      <button class="btn" id="g-tour">Recorrido guiado</button></div></div>
  <div class="explain" id="explain" aria-live="polite"><span class="ears" aria-hidden="true"><i></i><i></i></span><div class="ex-body" id="ex-body"></div></div>
  <div class="gd" id="gd">
    <div class="gd-top">
      <div class="gd-menubar">${Object.keys(MENUS).map(m=>`<div><button data-h="menu-${m}" data-menu="${m}" aria-expanded="false">${m}</button></div>`).join("")}</div>
      <div class="ws-tabs" id="ws-tabs">
        <button data-h="ws-2d" data-ws="2d">${ic("ws2d")}2D</button><button data-h="ws-3d" data-ws="3d">${ic("ws3d")}3D</button>
        <button data-h="ws-script" data-ws="script">${ic("wsscript")}Script</button><button data-h="ws-asset" data-ws="asset">${ic("wsasset")}AssetLib</button></div>
      <div class="run-btns" id="run-btns">
        <button class="ib play" data-h="run-play" data-run="play" aria-label="Ejecutar proyecto">${ic("play")}</button>
        <button class="ib" data-h="run-pause" data-run="pause" aria-label="Pausar">${ic("pause")}</button>
        <button class="ib" data-h="run-stop" data-run="stop" aria-label="Detener">${ic("stop")}</button>
        <button class="ib" data-h="run-scene" data-run="scene" aria-label="Ejecutar escena actual">${ic("sceneplay")}</button>
        <button class="ib" data-h="run-custom" data-run="custom" aria-label="Ejecutar escena específica">${ic("customplay")}</button></div>
      <button class="renderer" data-h="renderer">Forward+</button>
    </div>
    <div class="gd-left">
      <section class="dock" id="dock-escena">
        <div class="dtabs"><button aria-pressed="true" data-h="dock-escena">Escena</button><button aria-pressed="false" data-h="dock-importar">Importar</button></div>
        <div class="dbar"><button class="ib" data-h="tb-add" id="tb-add" aria-label="Añadir nodo hijo">${ic("plus")}</button><button class="ib" data-h="tb-instance" aria-label="Instanciar escena hija">${ic("link")}</button>
          <span class="search" data-h="tb-filter">Filtrar: nombre, t:tipo</span><button class="ib" data-h="tb-script" aria-label="Adjuntar script">${ic("scriptadd")}</button></div>
        <div class="dbody" id="tree" tabindex="0"></div>
      </section>
      <section class="dock" id="dock-fs">
        <div class="dtabs"><button aria-pressed="true" data-h="dock-fs">Sistema de archivos</button></div>
        <div class="fs-path" data-h="fs-path">res://</div>
        <div class="dbar"><span class="search" data-h="fs-search">Filtrar archivos</span></div>
        <div class="dbody" id="fs"></div>
      </section>
    </div>
    <div class="gd-center">
      <div class="scene-tabs" id="scene-tabs"></div>
      <div class="vp-area" id="vp-area"><div class="vbar" id="vbar"></div><div class="vp" id="vp"></div></div>
      <div class="bp" id="bp"><div class="bp-body" id="bp-body"></div><div class="bp-tabs" id="bp-tabs"></div></div>
    </div>
    <div class="gd-right dock" id="insp">
      <div class="dtabs" id="insp-tabs"></div>
      <div class="dbody" id="insp-body"></div>
    </div>
  </div>
  <p class="gd-note">Esto es una simulación hecha para aprender: replica la interfaz y el comportamiento básico de Godot 4, pero no es el motor real. Para hacer tu juego, descargá Godot gratis desde godotengine.org.</p>`;
  bindEditor();rAll();explainShow("Bienvenido al editor","Arriba están los menús y los botones para ejecutar. A la izquierda el árbol de la escena y los archivos. En el centro ves la escena. A la derecha el Inspector. Pasá el mouse por cualquier parte, o tocá Recorrido guiado.","Editor");
}
function rAll(){rTabs();rTree();rFS();rSceneTabs();rViewport();rBottom();rInsp()}
function rTabs(){document.querySelectorAll("#ws-tabs button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.ws===G.ws))}
function rTree(){
  let h="";walk(curRoot(),(x,dd,pp)=>{x._p=pp});
  walk(curRoot(),(n,d,p)=>{
    // ocultar hijos de nodos contraídos
    let hidden=false,cur=n;while(cur._p){if(!cur._p.open){hidden=true;break}cur=cur._p}
    if(hidden)return;
    const canVis=["ui","3d","2d"].includes((TYPES[n.type]||{}).c)||n.type==="CanvasLayer";
    const hasSig=n.sig;
    h+=`<div class="tr ${n.id===G.sel?"sel":""} ${n.visible?"":"hid"}" data-h="node:${n.id}" data-node="${n.id}" style="padding-left:${6+d*14}px">
      ${n.children.length?`<button class="tw" data-tog="${n.id}" aria-label="${n.open?"Contraer":"Expandir"}">${ic(n.open?"tridown":"tri")}</button>`:'<span class="tw"></span>'}
      ${nodeIcon(n.type)}<span class="nm">${esc(n.name)}</span>
      <span class="ri">${hasSig?`<button class="sig" data-h="sig-ic" data-sigic="${n.id}" aria-label="Señales">${ic("signal")}</button>`:""}${n.script?`<button class="scr" data-h="scr-ic" data-scr="${n.script}" aria-label="Abrir script">${ic("script")}</button>`:""}${canVis?`<button data-h="eye" data-eye="${n.id}" aria-label="Visibilidad">${ic(n.visible?"eye":"eyeoff")}</button>`:""}</span></div>`});
  $("#tree").innerHTML=h;
}
function rFS(){
  const rows=[["fs-folder","folder","escenas/",0],["fs-tscn","tscn","menu_plano.tscn",1,"plano"],["fs-tscn","tscn","menu_3d.tscn",1,"tres"],["fs-tscn","tscn","nivel_1.tscn",1],["fs-tscn","tscn","misiones_vehiculos.tscn",1],
    ["fs-folder","folder","scripts/",0],["fs-gd","gd","menu.gd",1],["fs-gd","gd","fondo.gd",1],["fs-gd","gd","opciones.gd",1],["fs-gd","gd","jugador.gd",1],["fs-folder","folder","texturas/",0],["fs-svg","svg","icon.svg",0],["fs-cfg","cfg","project.godot",0]];
  $("#fs").innerHTML=rows.map(r=>`<div class="fs-row" data-h="${r[0]}" ${r[4]?`data-open="${r[4]}"`:""} ${r[1]==="gd"?`data-gdopen="${r[2]}"`:""} style="padding-left:${8+r[3]*14}px">${ic(r[1])}${r[2]}</div>`).join("");
}
function rSceneTabs(){$("#scene-tabs").innerHTML=Object.entries(G.scenes).map(([k,s])=>`<button data-h="scene-tab" data-scene="${k}" aria-pressed="${k===G.scene}">${ic(k==="tres"?"ws3d":"ws2d")}${s.file}</button>`).join("")}
function rViewport(){
  const vbar=$("#vbar"),vp=$("#vp");if(!vp)return;
  const ws=G.ws;
  if(ws==="script"){vbar.hidden=true;rScript();return}
  vbar.hidden=false;
  if(ws==="asset"){stop3D();vbar.innerHTML=`<span data-h="ws-asset">Buscar recursos</span>`;vp.className="vp";vp.innerHTML=`<div class="asset" data-h="ws-asset"><div><b>AssetLib</b><br>Plugins, plantillas y ejemplos gratis de la comunidad. En Godot real necesita internet. Acá está vacío.</div></div>`;return}
  const base=`<button class="ib on" data-h="tool-select" aria-label="Seleccionar">${ic("select")}</button><button class="ib" data-h="tool-move" aria-label="Mover">${ic("move")}</button><button class="ib" data-h="tool-rotate" aria-label="Rotar">${ic("rotate")}</button><button class="ib" data-h="tool-scale" aria-label="Escalar">${ic("scale")}</button><span class="sepv"></span>`;
  if(ws==="2d"){
    stop3D();vbar.innerHTML=base+`<button class="ib" data-h="tool-ruler" aria-label="Regla">${ic("ruler")}</button><button class="ib" data-h="tool-lock" aria-label="Bloquear">${ic("lock")}</button><button class="ib" data-h="tool-group" aria-label="Agrupar">${ic("group")}</button><button class="ib" data-h="tool-snap" aria-label="Ajuste">${ic("magnet")}</button><span class="zoom" data-h="tool-zoom">100%</span>`;
    vp.className="vp grid2d";const u=uiRoot();
    let inner="";
    if(u){
      const fondo=u.children.find(c=>c.type==="TextureRect");
      const title=u.children.find(c=>c.type==="Label");
      const vbox=u.children.find(c=>c.type==="VBoxContainer");
      const rects=u.children.filter(c=>c.type==="ColorRect");
      const vis=n=>n&&n.visible&&u.visible;
      if(G.scene==="plano"&&fondo&&vis(fondo))inner+=`<div class="bg flat ${S.theme} ${fondo.id===G.sel?"selbox":""}" data-n="${fondo.id}"><div class="m1"></div><div class="m2"></div><div class="m3"></div></div>`;
      if(G.scene==="tres")inner+=`<div class="note">El fondo 3D se ve en la pestaña 3D. Acá solo está la capa de interfaz (CanvasLayer).</div>`;
      if(title&&vis(title))inner+=`<div class="w-title ${title.id===G.sel?"selbox":""}" data-n="${title.id}">${esc(title.text||"")}</div>`;
      if(vbox&&vis(vbox)){inner+=`<div class="w-vbox ${vbox.id===G.sel?"selbox":""}" data-n="${vbox.id}" style="gap:${(vbox.sep||0)/10}cqw">`+
        vbox.children.filter(c=>c.visible).map(c=>{const sc=c.id===G.sel?"selbox":"";
          if(c.type==="Button")return `<div class="w-btn ${sc}" data-n="${c.id}" style="${c.flat?"background:none;border-color:transparent;":""}${c.disabled?"opacity:.4;":""}">${esc(c.text||"")}</div>`;
          if(c.type==="Label")return `<div class="w-label ${sc}" data-n="${c.id}">${esc(c.text||c.name)}</div>`;
          if(c.type==="HSlider")return `<div class="w-ctl ${sc}" data-n="${c.id}">${esc(c.name)} <input type="range" tabindex="-1" style="width:14cqw"></div>`;
          if(c.type==="CheckButton")return `<div class="w-ctl ${sc}" data-n="${c.id}">${esc(c.name)} <input type="checkbox" tabindex="-1"></div>`;
          return `<div class="w-label ${sc}" data-n="${c.id}">[${esc(c.name)}]</div>`}).join("")+`</div>`}
      rects.filter(vis).forEach((r,i)=>inner+=`<div class="w-rect ${r.id===G.sel?"selbox":""}" data-n="${r.id}" style="top:${6+i*12}%">${esc(r.name)}</div>`);
      if(!u.visible)inner+=`<div class="note">El nodo ${esc(u.name)} está oculto.</div>`;
    }
    vp.innerHTML=`<div class="win" data-h="vp">${inner}</div>`;
  } else if(ws==="3d"){
    vbar.innerHTML=base+`<button class="ib" data-h="tool-local" aria-label="Espacio local">${ic("local")}</button><button class="ib" data-h="tool-snap" aria-label="Ajuste">${ic("magnet")}</button><span class="sepv"></span><button class="ib" data-h="tool-camprev" aria-label="Vista previa de cámara">${ic("cam")}</button>`;
    vp.className="vp";
    if(G.scene==="tres"&&S.ok){
      vp.innerHTML=`<div class="stage" data-h="vp3d"></div><span class="persp" data-h="tool-persp">Perspectiva</span>
       <svg class="gizmo" data-h="gizmo" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="rgba(0,0,0,.25)"/><line x1="32" y1="32" x2="54" y2="40" stroke="#ff5f5f" stroke-width="3"/><line x1="32" y1="32" x2="32" y2="8" stroke="#8fe388" stroke-width="3"/><line x1="32" y1="32" x2="18" y2="48" stroke="#6fa8ff" stroke-width="3"/>
       <circle cx="54" cy="40" r="6" fill="#ff5f5f"/><circle cx="32" cy="8" r="6" fill="#8fe388"/><circle cx="18" cy="48" r="6" fill="#6fa8ff"/><text x="54" y="43" font-size="8" text-anchor="middle" fill="#1d2229" font-weight="700">X</text><text x="32" y="11" font-size="8" text-anchor="middle" fill="#1d2229" font-weight="700">Y</text><text x="18" y="51" font-size="8" text-anchor="middle" fill="#1d2229" font-weight="700">Z</text></svg>`;
      if(!G.running)attach3D(vp.querySelector(".stage"));
      if(G.running)vp.querySelector(".stage").innerHTML=`<div class="empty3d" style="background:#1d2229">El juego está corriendo en su ventana.</div>`;
      trackMouse(vp);
    } else {stop3D();vp.innerHTML=`<div class="empty3d" data-h="vp3d"><div>${G.scene==="plano"?"Esta escena es solo interfaz: no tiene nodos 3D.<br>Abrí <b>menu_3d.tscn</b> en las pestañas de arriba para ver el mundo 3D.":"Tu navegador no pudo iniciar WebGL, así que el 3D no se puede mostrar."}</div></div>`}
  }
}
function rScript(){
  stop3D();const vp=$("#vp");vp.className="vp";
  const code=SCRIPTS[G.script]||"",lines=code.split("\n");
  const methods=[];lines.forEach((l,i)=>{const m=l.match(/^func (\w+)/);if(m)methods.push([m[1],i])});
  vp.innerHTML=`<div class="scr"><div class="scr-list"><h5 data-h="sc-list">Scripts</h5>${Object.keys(SCRIPTS).map(s=>`<button data-h="sc-list" data-sopen="${s}" aria-pressed="${s===G.script}">${s}</button>`).join("")}
    <h5 data-h="sc-methods">Funciones</h5>${methods.map(([m,i])=>`<button data-h="sc-methods" data-jump="${i}">${m}</button>`).join("")}</div>
    <div class="scr-code" id="scr-code">${lines.map((l,i)=>`<div class="ln" data-h="line:${i}" id="ln-${i}"><i>${i+1}</i><span>${hl(l)||" "}</span></div>`).join("")}</div></div>`;
}
function rBottom(onlyBody){
  const body=$("#bp-body");if(!body)return;const t=G.bottom;
  if(t==="Salida"){body.innerHTML=G.log.map(l=>`<div class="lg ${l.cls}">${esc(l.txt)}</div>`).join("");body.scrollTop=body.scrollHeight}
  else if(t==="Depurador")body.innerHTML=`<div class="lg">Errores: 0 · Advertencias: 0</div><div class="lg mut">${G.running?"FPS: 60 · Memoria estática: 48 MB":"Ejecutá el juego para ver el rendimiento."}</div>`;
  else if(t==="Audio")body.innerHTML=`<div class="bus" data-h="bp-Audio"><b>Master</b><input type="range" id="g-bus" min="0" max="1" step="0.05" value="${vol}" aria-label="Volumen del bus Master"><span>${vol===0?"-∞":(20*Math.log10(vol)).toFixed(1)} dB</span></div>`;
  else if(t==="Animación")body.innerHTML=`<div class="lg mut">Seleccioná un nodo AnimationPlayer para editar sus animaciones.</div>`;
  else body.innerHTML=`<div class="lg mut">Seleccioná un ShaderMaterial para editar su shader.</div>`;
  if(onlyBody)return;
  $("#bp-tabs").innerHTML=["Salida","Depurador","Audio","Animación","Shader"].map(x=>`<button data-h="bp-${x}" data-bp="${x}" aria-pressed="${x===t}">${x==="Shader"?"Editor de shaders":x}</button>`).join("");
}
function rInsp(){
  $("#insp-tabs").innerHTML=`<button data-h="insp-tab" data-it="insp" aria-pressed="${G.inspTab==="insp"}">Inspector</button><button data-h="nodo-tab" data-it="nodo" aria-pressed="${G.inspTab==="nodo"}">Nodo</button>`;
  const f=G.sel&&findNode(G.sel),body=$("#insp-body");
  if(!f){body.innerHTML=`<div class="empty-insp" data-h="insp">Seleccioná un nodo en el árbol para ver sus propiedades.</div>`;return}
  const n=f.n;
  let h=`<div class="insp-head" data-h="node:${n.id}">${nodeIcon(n.type)}${esc(n.name)}<span class="ty">${n.type}</span></div>`;
  if(G.inspTab==="insp"){
    propsFor(n).forEach(p=>{
      if(p.sec){h+=`<div class="sect">${p.sec}</div>`;return}
      const id=`p-${n.id}-${p.k}`;let ctl;
      if(p.kind==="text")ctl=`<input type="text" id="${id}" data-p="${p.k}" value="${esc(p.val??"")}">`;
      else if(p.kind==="num")ctl=`<input type="number" id="${id}" data-p="${p.k}" step="any" value="${p.val}">`;
      else if(p.kind==="bool")ctl=`<input type="checkbox" id="${id}" data-p="${p.k}" ${p.val?"checked":""}>`;
      else ctl=`<span class="ro ${p.kind==="res"?"res":""}">${esc(String(p.val))}</span>`;
      h+=`<div class="prop" data-h="prop:${p.k}"><label for="${id}">${p.label}</label>${ctl}</div>`;
      G._props=G._props||{};G._props[p.k]=[p.label,p.help];
    });
  } else {
    h+=`<div class="sect">Señales</div>`;
    signalsFor(n).forEach(([s,d],i)=>{G._sigs=G._sigs||{};G._sigs[n.type+i]=[s,d];
      const con=s==="pressed()"&&n.sig;
      h+=`<div class="sigrow" data-h="sig:${n.type+i}">${ic("signal")}<span>${s}</span>${con?`<span class="cn">→ ${G.scenes[G.scene].root.name}::${n.sig}()</span>`:""}</div>`});
    h+=`<div class="sect">Grupos</div><div class="empty-insp">Sin grupos. Los grupos sirven para, por ejemplo, encontrar todos los enemigos con get_nodes_in_group("enemigos").</div>`;
  }
  body.innerHTML=h;
}

/* ---- explicador ---- */
function explainShow(t,d,tag){if(G.tour>=0)return;$("#ex-body").innerHTML=`<div class="ex-t">${t}${tag?`<em>${tag}</em>`:""}</div><p class="ex-d">${d}</p>`}
function helpFor(key){
  if(!key)return null;
  if(key.startsWith("node:")){const f=findNode(+key.slice(5));if(!f)return null;const n=f.n,T=TYPES[n.type]||{d:""};
    return [n.name,`${T.d}${n.script?` Tiene el script <code>${n.script}</code>.`:""}${n.sig?" Su señal pressed está conectada.":""}`,n.type]}
  if(key.startsWith("prop:")){const p=(G._props||{})[key.slice(5)];return p?[p[0],p[1],"Propiedad"]:null}
  if(key.startsWith("sig:")){const s=(G._sigs||{})[key.slice(4)];return s?[s[0],s[1],"Señal"]:null}
  if(key.startsWith("line:")){const l=(SCRIPTS[G.script]||"").split("\n")[+key.slice(5)]||"";const [t,d]=lineHelp(l);return [t,d,"Línea "+(+key.slice(5)+1)]}
  if(key.startsWith("type:")){const ty=key.slice(5);return [ty,(TYPES[ty]||{}).d||"","Tipo de nodo"]}
  if(key.startsWith("mi:")){const [,m,i]=key.split(":");const it=MENUS[m][+i];return [it[0],it[1],"Menú "+m]}
  const h=HELP[key];return h?[h[0],h[1]]:null;
}

/* ---- recorrido ---- */
const TOUR=[
 [".gd-menubar","Barra de menús","Escena, Proyecto, Depurar, Editor y Ayuda. En Proyecto → Configuración elegís la escena principal y definís los controles del FPS."],
 ["#ws-tabs","Espacios de trabajo","Cambiás entre 2D (interfaces), 3D (el mundo) y Script (código). Es lo que más vas a tocar."],
 ["#run-btns","Probar el juego","▶ ejecuta el proyecto entero (F5). El ícono de la escena con ▶ corre solo la escena abierta (F6). El cuadrado detiene (F8)."],
 ["#dock-escena","Árbol de la escena","Cada escena es un árbol de nodos. El de arriba es la raíz. El + agrega un nodo hijo al seleccionado."],
 ["#dock-fs","Sistema de archivos","Los archivos del proyecto: escenas .tscn, scripts .gd, texturas y sonidos. Todo vive dentro de res://."],
 ["#scene-tabs","Escenas abiertas","Una pestaña por escena abierta. Cambiá entre el menú plano y el 3D."],
 ["#vp-area","Viewport","Acá ves la escena. Seleccioná cosas con clic, movelas, rotalas. En 3D ves el mundo con el gizmo de ejes arriba a la derecha."],
 ["#insp","Inspector","Las propiedades del nodo elegido. La pestaña Nodo tiene las señales, que conectan botones con funciones de tu código."],
 ["#bp","Panel inferior","Salida muestra mensajes y errores. También están el Depurador, los buses de Audio y el editor de Animación."],
 ["#run-btns .play","Tu turno","Tocá ▶ para ejecutar el juego. Después elegí un botón en el árbol, cambiá su Text en el Inspector y volvé a ejecutar."]
];
function tourGo(i){
  document.querySelectorAll(".tour-hi").forEach(e=>e.classList.remove("tour-hi"));
  if(i<0||i>=TOUR.length){G.tour=-1;
    if(i>=TOUR.length){const grew=registerStudy();explainShow("¡Recorrido completo!",`Ya conocés las partes del editor de Godot.${grew?` Sumaste un día a tu racha: ${currentStreak()}.`:""} Ahora probá ejecutar el juego o cambiar propiedades.`,"Listo")}
    else explainShow("Recorrido cerrado","Podés volver a empezarlo cuando quieras.","");return}
  G.tour=i;const [sel,t,d]=TOUR[i];const el=document.querySelector(sel);if(el){el.classList.add("tour-hi");el.scrollIntoView({block:"nearest",behavior:"smooth"})}
  $("#ex-body").innerHTML=`<div class="ex-t">${t}<em>Paso ${i+1} de ${TOUR.length}</em></div><p class="ex-d">${d}</p>
   <div class="ex-nav">${i>0?'<button class="btn ghost" data-tour="prev">Anterior</button>':""}<button class="btn" data-tour="next">${i===TOUR.length-1?"Terminar":"Siguiente"}</button><button class="btn ghost" data-tour="exit">Salir</button></div>`;
}

/* ---- ejecutar juego ---- */
function runGame(which){
  closeGame(true);const sk=which==="play"?"tres":G.scene,sc=G.scenes[sk];
  let u=null;walk(sc.root,n=>{if(!u&&n.type==="Control")u=n});
  const title=u&&u.children.find(c=>c.type==="Label"&&c.visible),vbox=u&&u.children.find(c=>c.type==="VBoxContainer");
  const btns=vbox&&vbox.visible?vbox.children.filter(c=>c.type==="Button"&&c.visible).map(c=>({text:c.text||c.name,act:c.act||"custom"})):[];
  G.running=true;
  const w=document.createElement("div");w.className="gwin";w.id="gwin";w.dataset.h="game";
  w.innerHTML=`<div class="gwin-bar"><span>Operación Burro (DEBUG) · ${sc.file}</span><button class="ib" id="gwin-x" aria-label="Cerrar juego">${ic("x")}</button></div><div id="gwin-host"></div>`;
  $("#gd").appendChild(w);
  log(`--- Ejecutando ${sc.file} ---`,"ok");
  mountPreview($("#gwin-host"),{mode:sk==="tres"?"3d":"flat",console:false,bare:true,title:title?esc(title.text).replace(" ","<br>"):"",buttons:btns,
    onLog:(c,n)=>log(c+(n?"   # "+n:""))});
  $("#gwin-x").onclick=()=>closeGame();
  if(G.bottom!=="Salida"){G.bottom="Salida";rBottom()}
}
function closeGame(silent){const w=$("#gwin");if(w){w.remove();if(!silent)log("--- Juego detenido ---","mut")}G.running=false;stop3D();if(!silent)rViewport()}

/* ---- diálogo de nodo ---- */
function openDialog(){
  closeDrop();const d=document.createElement("div");d.className="gdlg";d.id="gdlg";d.dataset.h="dlg";
  const cats=[["General (blanco)","node"],["2D (azul)","2d"],["3D (rojo)","3d"],["Interfaz (verde)","ui"]];
  const list=f=>cats.map(([cn,c])=>{const items=Object.keys(TYPES).filter(t=>TYPES[t].c===c&&t.toLowerCase().includes(f));
    return items.length?`<div class="dcat">${cn}</div>`+items.map(t=>`<button class="ditem" data-h="type:${t}" data-ty="${t}" aria-pressed="${t===G.dlgType}">${nodeIcon(t)}${t}</button>`).join(""):""}).join("")||'<div class="dcat">Sin resultados</div>';
  d.innerHTML=`<header>Crear nuevo nodo</header><input class="dsearch" id="dsearch" placeholder="Buscar: Button, Camera3D, VehicleBody3D…" aria-label="Buscar tipo de nodo">
    <div class="dlist" id="dlist">${list("")}</div><div class="ddesc" id="ddesc"></div>
    <footer><button id="dcancel">Cancelar</button><button class="pri" id="dok">Crear</button></footer>`;
  $("#gd").appendChild(d);G.dlg=true;
  const desc=()=>$("#ddesc").innerHTML=`<b>${G.dlgType}</b><br>${TYPES[G.dlgType].d}`;desc();
  $("#dsearch").focus();
  $("#dsearch").oninput=e=>{$("#dlist").innerHTML=list(e.target.value.toLowerCase().trim())};
  $("#dlist").onclick=e=>{const b=e.target.closest(".ditem");if(!b)return;G.dlgType=b.dataset.ty;$("#dlist").querySelectorAll(".ditem").forEach(x=>x.setAttribute("aria-pressed",x===b));desc()};
  $("#dlist").ondblclick=()=>createNode();
  $("#dcancel").onclick=closeDialog;$("#dok").onclick=createNode;
}
function closeDialog(){const d=$("#gdlg");if(d)d.remove();G.dlg=false}
function createNode(){
  const f=findNode(G.sel)||{n:curRoot()},parent=f.n,ty=G.dlgType;
  let name=ty,k=2;const names=new Set();walk(curRoot(),n=>names.add(n.name));while(names.has(name))name=ty+k++;
  const n=mk(name,ty,ty==="Button"?{text:"Botón nuevo",act:"custom"}:ty==="Label"?{text:"Texto nuevo"}:{});
  parent.children.push(n);parent.open=true;G.sel=n.id;closeDialog();
  log(`Nodo ${name} (${ty}) agregado como hijo de ${parent.name}`,"ok");
  rTree();rInsp();rViewport();
  const tip=ty==="Button"&&parent.type==="VBoxContainer"?" Como es hijo del VBox, ya aparece en la lista de botones. Ejecutá el juego para verlo.":ty==="Button"?" Para que aparezca en la lista del menú, crealo con el nodo VBox seleccionado.":"";
  explainShow(`Creaste ${name}`,TYPES[ty].d+tip,ty);
}

/* ---- menús desplegables ---- */
function closeDrop(){document.querySelectorAll(".gd-drop").forEach(d=>d.remove());document.querySelectorAll("[data-menu]").forEach(b=>b.setAttribute("aria-expanded","false"));G.menuOpen=null}
function openDrop(btn){const m=btn.dataset.menu;if(G.menuOpen===m){closeDrop();return}closeDrop();G.menuOpen=m;btn.setAttribute("aria-expanded","true");
  const d=document.createElement("div");d.className="gd-drop";d.innerHTML=MENUS[m].map((it,i)=>`<button data-h="mi:${m}:${i}" data-mi="1">${it[0]}</button>`).join("");btn.parentElement.appendChild(d)}

/* ---- eventos ---- */
function bindEditor(){
  const gd=$("#gd");
  $("#g-explain").onchange=e=>{G.explain=e.target.checked};
  $("#g-tour").onclick=()=>tourGo(0);
  $("#explain").onclick=e=>{const b=e.target.closest("[data-tour]");if(!b)return;const a=b.dataset.tour;
    if(a==="next")tourGo(G.tour+1);else if(a==="prev")tourGo(G.tour-1);else tourGo(-1)};
  const show=el=>{const h=helpFor(el.dataset.h);if(h)explainShow(h[0],h[1],h[2])};
  gd.addEventListener("pointerover",e=>{if(!G.explain)return;const el=e.target.closest("[data-h]");if(el&&gd.contains(el))show(el)});
  gd.addEventListener("focusin",e=>{if(!G.explain)return;const el=e.target.closest("[data-h]");if(el)show(el)});
  gd.addEventListener("click",e=>{
    const t=e.target;const hEl=t.closest("[data-h]");if(hEl)show(hEl);
    let b;
    if((b=t.closest("[data-menu]"))){openDrop(b);return}
    if(t.closest("[data-mi]")){closeDrop();return}
    if(G.menuOpen&&!t.closest(".gd-drop"))closeDrop();
    if((b=t.closest("[data-ws]"))){G.ws=b.dataset.ws;rTabs();rViewport();return}
    if((b=t.closest("[data-run]"))){const r=b.dataset.run;
      if(r==="play"||r==="scene"||r==="custom")runGame(r==="custom"?"scene":r);
      else if(r==="stop"){if(G.running)closeGame();else log("No hay ningún juego corriendo.","mut")}
      else if(r==="pause"){log(G.running?"Juego en pausa (en esta simulación el juego sigue animado).":"No hay ningún juego corriendo.","mut")}
      return}
    if((b=t.closest("#tb-add"))){openDialog();return}
    if((b=t.closest("[data-tog]"))){const f=findNode(+b.dataset.tog);f.n.open=!f.n.open;rTree();return}
    if((b=t.closest("[data-eye]"))){const f=findNode(+b.dataset.eye);setVis(f.n,!f.n.visible);rTree();if(G.sel===f.n.id)rInsp();return}
    if((b=t.closest("[data-scr]"))){G.script=b.dataset.scr;G.ws="script";rTabs();rViewport();return}
    if((b=t.closest("[data-sigic]"))){G.sel=+b.dataset.sigic;G.inspTab="nodo";rTree();rInsp();return}
    if((b=t.closest("[data-node]"))){G.sel=+b.dataset.node;rTree();rInsp();if(G.ws==="2d")rViewport();return}
    if((b=t.closest("[data-n]"))){G.sel=+b.dataset.n;rTree();rInsp();rViewport();return}
    if((b=t.closest("[data-scene]"))){if(G.scene===b.dataset.scene)return;G.scene=b.dataset.scene;G.sel=curRoot().id;G.ws=G.scene==="tres"?"3d":"2d";rAll();return}
    if((b=t.closest("[data-bp]"))){G.bottom=b.dataset.bp;rBottom();return}
    if((b=t.closest("[data-it]"))){G.inspTab=b.dataset.it;rInsp();return}
    if((b=t.closest("[data-sopen]"))){G.script=b.dataset.sopen;rScript();return}
    if((b=t.closest("[data-jump]"))){const ln=$("#ln-"+b.dataset.jump);document.querySelectorAll(".ln.hl").forEach(x=>x.classList.remove("hl"));if(ln){ln.classList.add("hl");ln.scrollIntoView({block:"center",behavior:"smooth"})}return}
    if((b=t.closest(".dtabs button[data-h='dock-importar']"))){return}
  });
  gd.addEventListener("dblclick",e=>{const r=e.target.closest(".fs-row");if(!r)return;
    if(r.dataset.open){G.scene=r.dataset.open;G.sel=curRoot().id;G.ws=G.scene==="tres"?"3d":"2d";rAll();log(`Escena abierta: res://escenas/${G.scenes[G.scene].file}`,"mut")}
    else if(r.dataset.gdopen){G.script=r.dataset.gdopen;G.ws="script";rTabs();rViewport()}
    else if(/tscn/.test(r.textContent))log(`${r.textContent.trim()} todavía no existe en esta simulación. Lo vas a crear en las próximas unidades.`,"mut")});
  gd.addEventListener("change",e=>{const i=e.target;if(i.dataset.p){const f=findNode(G.sel);if(!f)return;
      const v=i.type==="checkbox"?i.checked:i.type==="number"?parseFloat(i.value)||0:i.value;onProp(f.n,i.dataset.p,v);
      if(i.type!=="text")rInsp()}
    if(i.id==="g-bus"){vol=+i.value;blip(600);rBottom(true);log(`AudioServer: bus Master a ${vol===0?"-∞":(20*Math.log10(vol)).toFixed(1)} dB`,"mut")}});
  gd.addEventListener("input",e=>{const i=e.target;if(i.dataset.p==="text"){const f=findNode(G.sel);if(f)onProp(f.n,"text",i.value)}});
  $("#tree").addEventListener("keydown",e=>{if(e.key!=="Delete")return;const f=findNode(G.sel);if(!f||!f.p)return;
    f.p.children=f.p.children.filter(c=>c!==f.n);log(`Nodo ${f.n.name} eliminado`,"mut");G.sel=f.p.id;rTree();rInsp();rViewport()});
}

