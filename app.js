"use strict";
const $ = id => document.getElementById(id);
const STORAGE = "aveMariaReader_v2";
let pages = [], pageImages = {}, current = 1, font = 100, bookmarks = [], notes = {}, theme = "light", fontFamily = "serif", brightness = 100;

const toc = [
  ["Sumário",5],["Pentateuco",6],["Livros históricos",7],["Livros sapienciais",8],
  ["Livros proféticos",9],["Novo Testamento",10],["Índice doutrinal e anexos",11],
  ["As grandes datas da Bíblia",12],["Como ler a Sagrada Bíblia",15],
  ["Como ler as citações bíblicas",19],["Introdução geral à Bíblia",21],
  ["Introdução ao Antigo Testamento",28],["Gênesis",48]
];
const books = [
"Gênesis","Êxodo","Levítico","Números","Deuteronômio","Josué","Juízes","Rute",
"1º Livro de Samuel","2º Livro de Samuel","1º Livro dos Reis","2º Livro dos Reis",
"1º Livro das Crônicas","2º Livro das Crônicas","Esdras","Neemias","Tobias","Judite",
"Ester","1º Livro dos Macabeus","2º Livro dos Macabeus","Jó","Salmos","Provérbios",
"Eclesiastes","Cântico dos Cânticos","Sabedoria","Eclesiástico","Isaías","Jeremias",
"Lamentações","Baruc","Ezequiel","Daniel","Oseias","Joel","Amós","Abdias","Jonas",
"Miqueias","Naum","Habacuc","Sofonias","Ageu","Zacarias","Malaquias","Mateus","Marcos",
"Lucas","João","Atos dos Apóstolos","Romanos","1ª Coríntios","2ª Coríntios","Gálatas",
"Efésios","Filipenses","Colossenses","1ª Tessalonicenses","2ª Tessalonicenses",
"1ª Timóteo","2ª Timóteo","Tito","Filêmon","Hebreus","Tiago","1ª Pedro","2ª Pedro",
"1ª João","2ª João","3ª João","Judas","Apocalipse"
];

function safeRead(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch (_) { return fallback; }
}
function save() {
  try { localStorage.setItem(STORAGE, JSON.stringify({current,font,bookmarks,notes,theme,fontFamily,brightness})); }
  catch (_) { /* O leitor continua funcionando mesmo se o armazenamento estiver bloqueado. */ }
}
function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function applyAppearance() {
  document.body.dataset.theme = theme;
  document.body.dataset.font = fontFamily;
  document.documentElement.style.setProperty("--reading-brightness", brightness / 100);
  $("fontLabel").textContent = font + "%";
  $("fontFamily").value = fontFamily;
  $("brightness").value = brightness;
  $("themeBtn").textContent = theme === "light" ? "◐" : theme === "sepia" ? "☼" : "☾";
}
function openDrawer() { $("drawer").classList.add("open"); $("scrim").classList.add("show"); $("drawer").setAttribute("aria-hidden","false"); }
function closeDrawer() { $("drawer").classList.remove("open"); $("scrim").classList.remove("show"); $("drawer").setAttribute("aria-hidden","true"); }
function render() {
  const text = pages[current-1] ?? "";
  const img = pageImages[String(current)];
  const isBlank = !text.trim();
  let html = isBlank ? '<p class="hint">Esta página não possui texto digital extraível; o fac-símile original está preservado abaixo.</p>' :
    `<div class="page-text" style="font-size:${font}%">${escapeHTML(text.trim())}</div>`;
  if (img) {
    html += `<figure class="facsimile"><figcaption>${isBlank ? "Imagem original desta página" : "Ver fac-símile da página original"}</figcaption><a href="${escapeHTML(img)}" target="_blank" rel="noopener"><img src="${escapeHTML(img)}" alt="Fac-símile da página ${current}" loading="lazy"></a></figure>`;
  }
  html += `<section id="notePanel" class="note-panel" ${notes[current] ? "" : "hidden"}><label for="pageNote">Anotação desta página</label><textarea id="pageNote" rows="4" placeholder="Escreva sua anotação…">${escapeHTML(notes[current] || "")}</textarea><button id="saveNote" class="toolbtn">Salvar anotação</button></section>`;
  html += `<div class="page-number">Página ${current} de ${pages.length}</div>`;
  $("reader").innerHTML = html;
  const noteBtn = $("notesBtn");
  noteBtn.textContent = notes[current] ? "✎ Ver anotação" : "✎ Anotar";
  if ($("pageNote")) $("saveNote").onclick = saveNote;
  $("pageInput").value = current;
  $("pageTotal").textContent = "/ " + pages.length;
  $("progressFill").style.width = (current / pages.length * 100) + "%";
  $("bookmarkBtn").textContent = bookmarks.includes(current) ? "★ Favoritada" : "☆ Favoritar";
  $("prevBtn").disabled = current <= 1;
  $("nextBtn").disabled = current >= pages.length;
  applyAppearance();
  save();
}
function saveNote() {
  const value = $("pageNote").value.trim();
  if (value) notes[current] = value; else delete notes[current];
  save(); render();
}
function go(n) {
  current = Math.max(1, Math.min(pages.length, Number(n) || 1));
  render(); closeDrawer();
  window.scrollTo({top:0,behavior:"smooth"});
}
function buildNav() {
  $("tocLinks").innerHTML = "";
  toc.forEach(([name,p]) => { const b=document.createElement("button"); b.textContent=name; b.onclick=()=>go(p); $("tocLinks").append(b); });
  $("bookLinks").innerHTML = "";
  books.forEach(name => { const b=document.createElement("button"); b.textContent=name; b.onclick=()=>findBook(name); $("bookLinks").append(b); });
}
function findBook(name) {
  const aliases = {
    "Salmos":"SALMOS","Mateus":"EVANGELHO SEGUNDO SÃO MATEUS","Marcos":"EVANGELHO SEGUNDO SÃO MARCOS",
    "Lucas":"EVANGELHO SEGUNDO SÃO LUCAS","João":"EVANGELHO SEGUNDO SÃO JOÃO","Apocalipse":"APOCALIPSE"
  };
  const term = (aliases[name] || name).toLocaleUpperCase("pt-BR");
  for (let i=0; i<pages.length; i++) {
    if ((pages[i] || "").toLocaleUpperCase("pt-BR").includes(term)) { go(i+1); return; }
  }
  $("searchStatus").textContent = "Não foi possível localizar automaticamente esse título. Use a busca pelo nome.";
  $("searchInput").value = name; search();
}
function search() {
  const q = $("searchInput").value.trim().toLocaleLowerCase("pt-BR");
  $("results").innerHTML = "";
  if (!q) { $("searchStatus").textContent = "Digite uma palavra ou trecho."; return; }
  const found = [];
  for (let i=0; i<pages.length; i++) {
    const p = (pages[i] || "").toLocaleLowerCase("pt-BR");
    const at = p.indexOf(q);
    if (at >= 0) {
      const excerpt = p.slice(Math.max(0,at-65),Math.min(p.length,at+q.length+100)).replace(/\s+/g," ");
      found.push({page:i+1,excerpt});
      if (found.length >= 80) break;
    }
  }
  $("searchStatus").textContent = found.length ? `${found.length}${found.length===80?" ou mais":""} resultado(s) encontrado(s).` : "Nenhum resultado encontrado.";
  found.forEach(r => {
    const b=document.createElement("button");
    b.innerHTML=`Página ${r.page}<small>${escapeHTML(r.excerpt)}</small>`;
    b.onclick=()=>go(r.page); $("results").append(b);
  });
  if (!found.length) $("results").innerHTML='<div class="empty">Tente outra palavra ou trecho.</div>';
}
function showFavorites() {
  $("results").innerHTML="";
  $("searchStatus").textContent="Suas páginas favoritas";
  if (!bookmarks.length) $("results").innerHTML='<div class="empty">Você ainda não favoritou nenhuma página.</div>';
  bookmarks.forEach(p => { const b=document.createElement("button"); b.textContent="Página "+p; b.onclick=()=>go(p); $("results").append(b); });
  openDrawer();
}
function showNotes() {
  const panel=$("notePanel");
  if (panel) { panel.hidden=!panel.hidden; if (!panel.hidden) $("pageNote").focus(); }
  else {
    const box=document.createElement("section"); box.className="note-panel"; box.innerHTML=`<label for="pageNote">Anotação desta página</label><textarea id="pageNote" rows="4" placeholder="Escreva sua anotação…">${escapeHTML(notes[current]||"")}</textarea><button id="saveNote" class="toolbtn">Salvar anotação</button>`;
    $("reader").insertBefore(box,$("reader").lastElementChild); $("saveNote").onclick=saveNote; $("pageNote").focus();
  }
}
$("menuBtn").onclick=openDrawer; $("closeMenu").onclick=closeDrawer; $("scrim").onclick=closeDrawer;
$("prevBtn").onclick=()=>go(current-1); $("nextBtn").onclick=()=>go(current+1);
$("pageInput").onchange=e=>go(e.target.value);
$("themeBtn").onclick=()=>{ theme = theme==="light" ? "sepia" : theme==="sepia" ? "dark" : "light"; applyAppearance(); save(); };
$("smallerBtn").onclick=()=>{ font=Math.max(70,font-10); render(); };
$("biggerBtn").onclick=()=>{ font=Math.min(180,font+10); render(); };
$("fontFamily").onchange=e=>{ fontFamily=e.target.value; applyAppearance(); save(); };
$("brightness").oninput=e=>{ brightness=Number(e.target.value); applyAppearance(); save(); };
$("bookmarkBtn").onclick=()=>{ bookmarks=bookmarks.includes(current)?bookmarks.filter(x=>x!==current):[...bookmarks,current].sort((a,b)=>a-b); render(); };
$("notesBtn").onclick=showNotes;
$("favoritesBtn")?.addEventListener("click",showFavorites);
$("searchBtn").onclick=search;
$("searchInput").addEventListener("keydown",e=>{if(e.key==="Enter")search();});
document.addEventListener("keydown",e=>{
  if (e.key==="ArrowLeft" && !e.target.matches("input,textarea,select")) go(current-1);
  if (e.key==="ArrowRight" && !e.target.matches("input,textarea,select")) go(current+1);
  if (e.key==="Escape") closeDrawer();
});

(async function init() {
  try {
    const saved=safeRead(STORAGE,{});
    current=Number(saved.current)||1; font=Number(saved.font)||100;
    bookmarks=Array.isArray(saved.bookmarks)?saved.bookmarks:[];
    notes=saved.notes && typeof saved.notes==="object" ? saved.notes : {};
    theme=["light","sepia","dark"].includes(saved.theme)?saved.theme:"light";
    fontFamily=["serif","sans"].includes(saved.fontFamily)?saved.fontFamily:"serif";
    brightness=Math.min(120,Math.max(70,Number(saved.brightness)||100));
    const [pageResponse,imageResponse]=await Promise.all([fetch("data/pages.json"),fetch("data/images.json")]);
    if (!pageResponse.ok) throw new Error("Não foi possível carregar data/pages.json.");
    if (!imageResponse.ok) throw new Error("Não foi possível carregar data/images.json.");
    pages=await pageResponse.json(); pageImages=await imageResponse.json();
    if (!Array.isArray(pages) || pages.length!==5163) throw new Error("O arquivo de conteúdo está incompleto ou inválido.");
    current=Math.max(1,Math.min(pages.length,current));
    buildNav(); render();
  } catch(e) {
    $("reader").innerHTML=`<div class="error"><strong>Não foi possível abrir o conteúdo.</strong><p>${escapeHTML(e.message)}</p><p>Confira se a pasta <b>data</b> e a pasta <b>images</b> foram enviadas junto com o aplicativo e mantenha os nomes dos arquivos.</p></div>`;
  }
})();