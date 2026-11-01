/* =================== arranque =================== */
document.querySelectorAll("#nav button").forEach(b=>b.onclick=()=>go(b.dataset.go));
$("#go-home").onclick=()=>go("inicio");
init3D();updStats();
(function route(){const h=location.hash.slice(1);
  if(!user)return renderWelcome();
  if(h==="lecciones")renderLessons();else if(h==="gdscript")renderGDSChoice();else if(h==="godot")renderGodot();else if(h==="patio")renderPatio();
  else if(/^leccion-(cero|gds|menu|fps2|fps3|mis)-\d+$/.test(h)){const [,c,n]=h.split("-"),i=+n-1;if(COURSES[c].lessons[i]&&isUnlocked(c,i))startLesson(c,i);else renderInicio()}
  else renderInicio()})();
