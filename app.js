/* Professor de Inglês | Brevemito. JavaScript puro, sem dependências.
   Conteúdos em lessons/index.json e lessons/[ficheiro].json. Progresso em localStorage. */
(function () {
"use strict";

/* TESTE DE NIVEL: 30 perguntas (10 B2, 10 C1, 10 C2).
   n = nivel, q = pergunta, o = opções, a = índice da resposta certa (0 é a primeira). */
var TESTE = [
{"n": "B2", "q": "By the time we arrived, the film ___.", "o": ["had already started", "already started", "has already started", "was already starting"], "a": 0},
{"n": "B2", "q": "He suggested ___ a taxi because it was raining.", "o": ["to take", "taking", "take", "that taking"], "a": 1},
{"n": "B2", "q": "I wish I ___ harder for the exam last year.", "o": ["studied", "had studied", "would study", "have studied"], "a": 1},
{"n": "B2", "q": "If I ___ more time, I would learn another language.", "o": ["had", "will have", "have", "would have"], "a": 0},
{"n": "B2", "q": "She has lived in Maputo ___ 2015.", "o": ["since", "for", "during", "from"], "a": 0},
{"n": "B2", "q": "The bridge ___ in 1998.", "o": ["is building", "built", "has built", "was built"], "a": 3},
{"n": "B2", "q": "She told me she ___ the film the day before.", "o": ["has seen", "had seen", "would see", "sees"], "a": 1},
{"n": "B2", "q": "The company decided to ___ the meeting because half the staff were ill.", "o": ["prevent", "predict", "prefer", "postpone"], "a": 3},
{"n": "B2", "q": "I'm not used to ___ up so early.", "o": ["got", "have got", "get", "getting"], "a": 3},
{"n": "B2", "q": "Despite ___ tired, she finished the race.", "o": ["being", "be", "was", "to be"], "a": 0},
{"n": "C1", "q": "Hardly had we sat down ___ the lights went out.", "o": ["than", "when", "that", "then"], "a": 1},
{"n": "C1", "q": "It is high time the government ___ action.", "o": ["take", "takes", "took", "would take"], "a": 2},
{"n": "C1", "q": "The evidence was ___, so the jury reached a verdict quickly.", "o": ["ambiguous", "overwhelming", "negligible", "tentative"], "a": 1},
{"n": "C1", "q": "No sooner had she left the room ___ the phone rang.", "o": ["when", "that", "than", "then"], "a": 2},
{"n": "C1", "q": "I would rather you ___ me the truth yesterday.", "o": ["would tell", "tell", "had told", "told"], "a": 2},
{"n": "C1", "q": "The new law is designed to ___ the spread of misinformation.", "o": ["curtain", "curve", "cure", "curb"], "a": 3},
{"n": "C1", "q": "His argument was so ___ that nobody could find a flaw in it.", "o": ["casual", "lengthy", "fragile", "watertight"], "a": 3},
{"n": "C1", "q": "Not only ___ the exam, but she also won a prize.", "o": ["passed she", "she did pass", "did she pass", "she passed"], "a": 2},
{"n": "C1", "q": "The manager, ___ decisions are rarely questioned, has retired.", "o": ["which", "whose", "whom", "who"], "a": 1},
{"n": "C1", "q": "By the time the results are announced, we ___ for three weeks.", "o": ["will have been waiting", "will wait", "are waiting", "have waited"], "a": 0},
{"n": "C2", "q": "Were it not for her support, the project ___ collapsed long ago.", "o": ["would have", "will have", "had", "would"], "a": 0},
{"n": "C2", "q": "Which word is closest in meaning to 'ephemeral'?", "o": ["lasting", "short-lived", "ancient", "hidden"], "a": 1},
{"n": "C2", "q": "The minister's remarks were deliberately ___, leaving room for several interpretations.", "o": ["categorical", "explicit", "equivocal", "peremptory"], "a": 2},
{"n": "C2", "q": "Little ___ that the decision would change her life.", "o": ["she knew", "she did know", "did she know", "knew she"], "a": 2},
{"n": "C2", "q": "His ___ manner concealed a ruthless ambition.", "o": ["flamboyant", "belligerent", "unassuming", "tyrannical"], "a": 2},
{"n": "C2", "q": "In 'She remained sanguine about the outcome', 'sanguine' means", "o": ["optimistic", "anxious", "angry", "indifferent"], "a": 0},
{"n": "C2", "q": "Scarcely ___ the door when the alarm sounded.", "o": ["he had opened", "had he opened", "opened he", "he opened"], "a": 1},
{"n": "C2", "q": "The policy was ___ by critics as a cosmetic gesture rather than genuine reform.", "o": ["dismissed", "disposed", "dissolved", "dispersed"], "a": 0},
{"n": "C2", "q": "'The report damns with faint praise.' What does the writer imply?", "o": ["The praise is so weak that it actually suggests criticism", "The report is too long", "The report is sincerely enthusiastic", "The writer cannot decide"], "a": 0},
{"n": "C2", "q": "It is essential that every member ___ informed of the changes.", "o": ["is", "be", "are", "was"], "a": 1}
];

var NIVEIS = ["B2", "C1", "C2"];
var LIMIAR = 6; /* acertos (em 10) para considerar um nível "passado" no teste */
var TIPOS = {
  literal: "Literal comprehension",
  vocabulary: "Vocabulary in context",
  inference: "Inference",
  structure: "Meaning / structure",
  interpretation: "Interpretation / critical reading"
};
var ERRO_LEITURA = "Não foi possível carregar esta leitura. Verifique a ligação ou tente novamente.";
var ERRO_INDICE = "Não foi possível carregar a lista de leituras. Verifique a ligação ou tente novamente. Se abriste o ficheiro directamente no computador, usa o endereço do GitHub Pages.";

function $(id) { return document.getElementById(id); }
function el(tag, cls, txt) {
  var e = document.createElement(tag);
  if (cls) { e.className = cls; }
  if (txt !== undefined) { e.textContent = txt; }
  return e;
}
function limpa(n) { while (n.firstChild) { n.removeChild(n.firstChild); } }
function guardar(k, v) { try { window.localStorage.setItem("bmprof_" + k, JSON.stringify(v)); } catch (e) {} }
function ler(k, def) {
  try {
    var v = window.localStorage.getItem("bmprof_" + k);
    if (v === null) { return def; }
    return JSON.parse(v);
  } catch (e) { return def; }
}
function botao(cls, txt, fn) {
  var b = el("button", cls, txt); b.type = "button";
  if (fn) { b.addEventListener("click", fn); }
  return b;
}

var nivel = ler("nivel", "B2");
if (NIVEIS.indexOf(nivel) < 0) { nivel = "B2"; }
var prog = ler("prog", {});
if (!prog || typeof prog !== "object") { prog = {}; }
var livros = [];
var cache = {};
var atual = null;
var app = $("app");

function palavras(s) {
  var p = s.replace(/^\s+|\s+$/g, "");
  if (p.length === 0) { return 0; }
  return p.split(/\s+/).length;
}
function niveisDe(lv) { return (lv && lv.levels && lv.levels.length) ? lv.levels : NIVEIS; }
function barra(pct) {
  var pg = el("div", "prog");
  pg.setAttribute("role", "progressbar");
  pg.setAttribute("aria-valuemin", "0"); pg.setAttribute("aria-valuemax", "100");
  pg.setAttribute("aria-valuenow", String(pct));
  var sp = el("span"); sp.style.width = pct + "%"; pg.appendChild(sp);
  return pg;
}
function achar(id) {
  for (var i = 0; i < livros.length; i++) { if (livros[i].id === id) { return livros[i]; } }
  return null;
}
function pedir(ficheiro, cb) {
  if (cache[ficheiro]) { cb(null, cache[ficheiro]); return; }
  fetch("lessons/" + ficheiro).then(function (r) {
    if (!r.ok) { throw new Error("http " + r.status); }
    return r.json();
  }).then(function (j) {
    cache[ficheiro] = j; cb(null, j);
  }).catch(function () { cb(ERRO_LEITURA, null); });
}
function mostrarErro(msg, tentar) {
  limpa(app);
  var p = el("p", "erro", msg); p.setAttribute("role", "alert");
  app.appendChild(p);
  if (tentar) { app.appendChild(botao("btn", "Tentar novamente", tentar)); }
}

/* NIVEL SELECCIONADO */
function desenharNiveis() {
  var g = $("niveis"); limpa(g);
  for (var i = 0; i < NIVEIS.length; i++) {
    (function (n) {
      var b = botao(n === nivel ? "nivel on" : "nivel", n, function () {
        nivel = n; guardar("nivel", n); desenharNiveis(); refrescar();
      });
      b.setAttribute("aria-pressed", n === nivel ? "true" : "false");
      g.appendChild(b);
    })(NIVEIS[i]);
  }
}
function refrescar() { if (atual) { atual(); } }
function irPara(v) {
  var abas = $("abas").getElementsByTagName("button");
  for (var i = 0; i < abas.length; i++) {
    var on = abas[i].getAttribute("data-v") === v;
    abas[i].className = on ? "aba on" : "aba";
    abas[i].setAttribute("aria-current", on ? "page" : "false");
  }
  if (v === "leituras") { atual = listaLivros; }
  if (v === "teste") { atual = testeNivel; }
  if (v === "progresso") { atual = meuProgresso; }
  atual();
  try { window.scrollTo(0, 0); } catch (e) {}
}
var abas0 = $("abas").getElementsByTagName("button");
for (var a = 0; a < abas0.length; a++) {
  abas0[a].addEventListener("click", function () { irPara(this.getAttribute("data-v")); });
}
function abrirLeitura(lv) {
  atual = function () { abrir(lv); };
  atual();
  try { window.scrollTo(0, 0); } catch (e) {}
}

/* LISTA DE LEITURAS */
function selosDe(lv) {
  var s = el("div", "selos");
  var ns = niveisDe(lv);
  for (var k = 0; k < ns.length; k++) {
    var p = prog[lv.id + "|" + ns[k]];
    var feito = p ? p.f === true : false;
    var emCurso = p && !feito;
    s.appendChild(el("span", feito ? "selo feito" : "selo", ns[k] + (feito ? ": concluída" : (emCurso ? ": em curso" : ": por fazer"))));
  }
  return s;
}
function listaLivros() {
  limpa(app);
  if (livros.length === 0) { app.appendChild(el("p", "nota", "A carregar as leituras...")); return; }
  var ult = ler("ultima", null);
  var lvU = ult ? achar(ult.id) : null;
  if (lvU && NIVEIS.indexOf(ult.nivel) >= 0) {
    var cb = el("div", "card continuar");
    cb.appendChild(el("p", "nota", "Última lição aberta"));
    cb.appendChild(el("p", "pq", lvU.title + " (" + ult.nivel + ")"));
    cb.appendChild(botao("btn", "Continuar", function () {
      nivel = ult.nivel; guardar("nivel", nivel); desenharNiveis(); abrirLeitura(lvU);
    }));
    app.appendChild(cb);
  }
  app.appendChild(el("p", "nota", "Escolhe um livro. Cada leitura tem três níveis (B2, C1 e C2); vês o nível seleccionado em cima."));
  for (var i = 0; i < livros.length; i++) {
    (function (lv) {
      var c = el("div", "card livro");
      c.setAttribute("role", "button"); c.setAttribute("tabindex", "0");
      c.appendChild(el("h2", "", lv.title));
      c.appendChild(el("p", "autor", lv.author));
      var meta = [];
      if (lv.category) { meta.push(lv.category); }
      if (lv.period) { meta.push(lv.period); }
      if (meta.length) { c.appendChild(el("p", "autor", meta.join(" | "))); }
      if (lv.description) { c.appendChild(el("p", "desc", lv.description)); }
      c.appendChild(selosDe(lv));
      var abre = function () { abrirLeitura(lv); };
      c.addEventListener("click", abre);
      c.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abre(); }
      });
      app.appendChild(c);
    })(livros[i]);
  }
}

/* BLOCOS DA LICAO (partilhados por todos os livros) */
function listaGlossario(g) {
  var box = el("div", "gloss");
  for (var i = 0; i < g.length; i++) {
    var sp = el("span"); sp.appendChild(el("b", "", g[i][0])); sp.appendChild(document.createTextNode(": " + g[i][1]));
    box.appendChild(sp);
  }
  return box;
}
function blocoPerguntas(d, chave, st) {
  var total = d.questions.length;
  var info = el("p", "nota", "Respondidas: 0 de " + total);
  info.setAttribute("role", "status");
  var frag = document.createDocumentFragment();
  for (var q = 0; q < total; q++) {
    (function (qq, num) {
      var box = el("div", "card");
      if (qq.type && TIPOS[qq.type]) { box.appendChild(el("p", "tipo", num + ". " + TIPOS[qq.type])); }
      box.appendChild(el("p", "pq", qq.q));
      var fechado = false; var bs = [];
      var fb = el("div", "feedback"); fb.setAttribute("aria-live", "polite");
      for (var o = 0; o < qq.options.length; o++) {
        (function (idx) {
          var b = botao("op", qq.options[idx]); bs.push(b);
          b.addEventListener("click", function () {
            if (fechado) { return; }
            fechado = true; st.resp++;
            bs[qq.answer].className = "op certa";
            var certa = idx === qq.answer;
            if (certa) { st.certas++; } else { b.className = "op errada"; }
            fb.appendChild(el("p", "nota", (certa ? "Certo. " : "Resposta certa marcada a verde. ") + qq.why));
            info.textContent = "Respondidas: " + st.resp + " de " + total + " | Certas: " + st.certas;
            var antigo = prog[chave];
            prog[chave] = { c: st.certas, t: total, f: antigo ? antigo.f === true : false };
            guardar("prog", prog);
          });
          box.appendChild(b);
        })(o);
      }
      box.appendChild(fb);
      frag.appendChild(box);
    })(d.questions[q], q + 1);
  }
  frag.appendChild(info);
  return frag;
}
function blocoEscrita(d, chave, st) {
  var frag = document.createDocumentFragment();
  var ta = el("textarea"); ta.setAttribute("placeholder", "Write here..."); ta.setAttribute("aria-label", "Área de escrita");
  var cont = el("p", "nota", "0 palavras");
  ta.addEventListener("input", function () { cont.textContent = palavras(ta.value) + " palavras"; });
  frag.appendChild(ta); frag.appendChild(cont);
  frag.appendChild(el("p", "nota", "Dica: relê o teu texto e confirma o tempo dos verbos, os artigos e a pontuação. O texto não é enviado para lado nenhum."));
  var jaFeito = prog[chave] && prog[chave].f === true;
  var fim = botao("btn", jaFeito ? "Lição concluída" : "Marcar lição como concluída", function () {
    var antigo = prog[chave] || { c: st.certas, t: d.questions.length, f: false };
    prog[chave] = { c: antigo.c, t: d.questions.length, f: true };
    guardar("prog", prog);
    fim.textContent = "Lição concluída"; fim.disabled = true;
  });
  if (jaFeito) { fim.disabled = true; }
  frag.appendChild(fim);
  return frag;
}
function cabecalhoLeitura(livro) {
  var voltar = botao("btn sec", "Voltar aos livros", function () { irPara("leituras"); });
  app.appendChild(voltar);
  app.appendChild(el("h2", "", livro.title));
}

/* LEITURA NORMAL (adaptação original graduada) */
function telaLicao(livro) {
  var d = livro.levels ? livro.levels[nivel] : null;
  if (!d) { mostrarErro(ERRO_LEITURA); return; }
  var chave = livro.id + "|" + nivel;
  guardar("ultima", { id: livro.id, nivel: nivel });
  cabecalhoLeitura(livro);
  app.appendChild(el("p", "autor", livro.author + " | Nível " + nivel));
  app.appendChild(el("p", "nota", livro.intro));
  app.appendChild(el("h3", "", "1. Lê o texto"));
  app.appendChild(el("div", "leitura", d.text));
  app.appendChild(el("p", "nota", "Texto de estudo: adaptação original escrita para este projecto, graduada para o nível " + nivel + "."));
  app.appendChild(el("h3", "", "Vocabulário"));
  app.appendChild(listaGlossario(d.glossary));
  app.appendChild(el("h3", "", "2. Compreensão"));
  var st = { certas: 0, resp: 0 };
  app.appendChild(blocoPerguntas(d, chave, st));
  app.appendChild(el("h3", "", "3. Fala e pensa"));
  app.appendChild(el("p", "", d.discussion));
  app.appendChild(el("h3", "", "4. Escreve"));
  app.appendChild(el("p", "", d.writing));
  app.appendChild(blocoEscrita(d, chave, st));
}

/* OBRA DE REFERENCIA (Alcorão): texto-fonte integral, separado do material pedagógico */
function caixaFonte(src) {
  var c = el("div", "fonte");
  c.appendChild(el("p", "fonte-t", "Source text and licence"));
  var linhas = [
    ["Translation", src.title], ["Translator", src.translator], ["Publisher", src.publisher],
    ["Edition", src.edition], ["Licence", src.license], ["Website", src.website]
  ];
  for (var i = 0; i < linhas.length; i++) {
    var p = el("p", "fonte-l"); p.appendChild(el("b", "", linhas[i][0] + ": ")); p.appendChild(document.createTextNode(linhas[i][1] || ""));
    c.appendChild(p);
  }
  c.appendChild(el("p", "fonte-l", "O texto inglês é reproduzido sem alterações, tal como na edição indicada. A licença não permite uso comercial nem obras derivadas; o material pedagógico está sempre separado do texto."));
  return c;
}
function versiculos(surah, de, ate, alvo) {
  var f = document.createDocumentFragment();
  for (var i = 0; i < surah.verses.length; i++) {
    var v = surah.verses[i];
    if (v.number < de || v.number > ate) { continue; }
    var p = el("p", "verso");
    p.appendChild(el("span", "vn", String(v.number)));
    p.appendChild(document.createTextNode(" " + v.text));
    f.appendChild(p);
  }
  alvo.appendChild(f);
}
function tituloSurah(s) { return "Surah " + s.number + ": " + s.name + " (" + s.translit + ")"; }
function leitorIntegral(livro, alvo) {
  var S = livro.surahs;
  alvo.appendChild(el("h3", "", "Obra integral: ler por surata e versículos"));
  alvo.appendChild(el("p", "nota", "Escolhe uma surata e, se quiseres, um intervalo de versículos. O texto aparece exactamente como na tradução."));
  var linha = el("div", "seletor");
  var lb1 = el("label", "", "Surata"); lb1.setAttribute("for", "sel-surata");
  var sel = el("select"); sel.id = "sel-surata";
  for (var i = 0; i < S.length; i++) {
    var op = el("option", "", S[i].number + ". " + S[i].name + " (" + S[i].translit + ")"); op.value = String(i);
    sel.appendChild(op);
  }
  var lb2 = el("label", "", "Do versículo"); lb2.setAttribute("for", "sel-de");
  var de = el("input"); de.type = "number"; de.id = "sel-de"; de.min = "1";
  var lb3 = el("label", "", "Ao versículo"); lb3.setAttribute("for", "sel-ate");
  var ate = el("input"); ate.type = "number"; ate.id = "sel-ate"; ate.min = "1";
  var saida = el("div", "texto-fonte"); saida.setAttribute("aria-live", "polite");
  function repor() {
    var s = S[parseInt(sel.value, 10)];
    de.max = String(s.verses.length); ate.max = String(s.verses.length);
    de.value = "1"; ate.value = String(s.verses.length);
  }
  function mostrar() {
    var s = S[parseInt(sel.value, 10)];
    var a = parseInt(de.value, 10), b = parseInt(ate.value, 10);
    if (isNaN(a)) { a = 1; } if (isNaN(b)) { b = s.verses.length; }
    a = Math.max(1, Math.min(a, s.verses.length)); b = Math.max(1, Math.min(b, s.verses.length));
    if (a > b) { var t = a; a = b; b = t; }
    de.value = String(a); ate.value = String(b);
    limpa(saida);
    saida.appendChild(el("h4", "", tituloSurah(s) + ", versículos " + a + " a " + b));
    versiculos(s, a, b, saida);
  }
  sel.addEventListener("change", function () { repor(); mostrar(); });
  var bt = botao("btn", "Mostrar", mostrar);
  var ant = botao("btn sec", "Surata anterior", function () { var k = parseInt(sel.value, 10); if (k > 0) { sel.value = String(k - 1); repor(); mostrar(); } });
  var seg = botao("btn sec", "Surata seguinte", function () { var k = parseInt(sel.value, 10); if (k < S.length - 1) { sel.value = String(k + 1); repor(); mostrar(); } });
  var g1 = el("div", "campo"); g1.appendChild(lb1); g1.appendChild(sel);
  var g2 = el("div", "campo"); g2.appendChild(lb2); g2.appendChild(de);
  var g3 = el("div", "campo"); g3.appendChild(lb3); g3.appendChild(ate);
  linha.appendChild(g1); linha.appendChild(g2); linha.appendChild(g3);
  alvo.appendChild(linha);
  var bs = el("div", "acoes"); bs.appendChild(bt); bs.appendChild(ant); bs.appendChild(seg);
  alvo.appendChild(bs);
  alvo.appendChild(saida);
  sel.value = "0"; repor(); mostrar();
}
function telaReferencia(livro) {
  var d = livro.levels ? livro.levels[nivel] : null;
  if (!d || !d.passage || !livro.surahs) { mostrarErro(ERRO_LEITURA); return; }
  var chave = livro.id + "|" + nivel;
  guardar("ultima", { id: livro.id, nivel: nivel });
  var p = d.passage;
  var surah = livro.surahs[p.surah - 1];
  cabecalhoLeitura(livro);
  app.appendChild(el("p", "autor", livro.author + " | Nível " + nivel));
  app.appendChild(el("p", "nota", livro.intro));
  app.appendChild(caixaFonte(livro.source));
  app.appendChild(el("h3", "", "SOURCE TEXT"));
  app.appendChild(el("p", "nota", tituloSurah(surah) + ", versículos " + p.from + " a " + p.to));
  var tf = el("div", "texto-fonte");
  versiculos(surah, p.from, p.to, tf);
  app.appendChild(tf);
  app.appendChild(el("p", "nota", "O nível " + nivel + " muda as notas, perguntas e actividades. O texto-fonte nunca é simplificado."));
  app.appendChild(el("h3", "", "LANGUAGE NOTES"));
  app.appendChild(listaGlossario(d.glossary));
  app.appendChild(el("h3", "", "COMPREHENSION"));
  var st = { certas: 0, resp: 0 };
  app.appendChild(blocoPerguntas(d, chave, st));
  app.appendChild(el("h3", "", "DISCUSSION"));
  app.appendChild(el("p", "", d.discussion));
  app.appendChild(el("h3", "", "WRITING"));
  app.appendChild(el("p", "", d.writing));
  app.appendChild(blocoEscrita(d, chave, st));
  var integral = el("div", "integral");
  app.appendChild(integral);
  leitorIntegral(livro, integral);
}
function abrir(lv) {
  limpa(app);
  app.appendChild(el("p", "nota", lv.reference ? "A carregar a obra (ficheiro grande, pode demorar alguns segundos)..." : "A carregar..."));
  pedir(lv.file, function (err, livro) {
    if (err) { mostrarErro(err, function () { abrir(lv); }); return; }
    limpa(app);
    if (livro.type === "reference") { telaReferencia(livro); } else { telaLicao(livro); }
  });
}

/* TESTE DE NIVEL */
var ti = 0; var porNivel = { B2: 0, C1: 0, C2: 0 };
function recomendar(pn) {
  if (pn.B2 < LIMIAR) { return "B2"; }
  if (pn.C1 < LIMIAR) { return "B2"; }
  if (pn.C2 < LIMIAR) { return "C1"; }
  return "C2";
}
function testeNivel() {
  limpa(app);
  if (ti >= TESTE.length) {
    var rec = recomendar(porNivel);
    guardar("teste", { rec: rec, B2: porNivel.B2, C1: porNivel.C1, C2: porNivel.C2, total: TESTE.length });
    var card = el("div", "card");
    card.appendChild(el("p", "nota", "Recommended starting level (nível de partida recomendado):"));
    card.appendChild(el("span", "badge", rec));
    card.appendChild(el("p", "", "B2: " + porNivel.B2 + " de 10; C1: " + porNivel.C1 + " de 10; C2: " + porNivel.C2 + " de 10. Usa este nível como ponto de partida e sobe quando as leituras te parecerem fáceis."));
    card.appendChild(el("p", "nota", "Esta indicação baseia-se no teu desempenho nestas 30 perguntas. Não é uma certificação oficial do QECR."));
    var acoes = el("div", "acoes");
    acoes.appendChild(botao("btn", "Usar este nível nas leituras", function () {
      nivel = rec; guardar("nivel", rec); desenharNiveis(); irPara("leituras");
    }));
    acoes.appendChild(botao("btn sec", "Repetir o teste", function () { ti = 0; porNivel = { B2: 0, C1: 0, C2: 0 }; testeNivel(); }));
    card.appendChild(acoes);
    app.appendChild(card);
    return;
  }
  var q = TESTE[ti];
  var ant = ler("teste", null);
  if (ti === 0) {
    app.appendChild(el("p", "nota", "Teste de nível com " + TESTE.length + " perguntas (10 de B2, 10 de C1 e 10 de C2). O resultado é uma sugestão de nível de partida, não uma certificação."));
    if (ant) {
      var txt = typeof ant === "string" ? ant : (ant.rec + " (B2: " + ant.B2 + ", C1: " + ant.C1 + ", C2: " + ant.C2 + ")");
      app.appendChild(el("p", "nota", "Último resultado guardado: " + txt));
    }
  }
  app.appendChild(el("p", "nota", "Pergunta " + (ti + 1) + " de " + TESTE.length));
  app.appendChild(barra(Math.round(ti * 100 / TESTE.length)));
  app.appendChild(el("p", "pq", q.q));
  var fechado = false; var bs = [];
  for (var i = 0; i < q.o.length; i++) {
    (function (idx) {
      var b = botao("op", q.o[idx]); bs.push(b);
      b.addEventListener("click", function () {
        if (fechado) { return; }
        fechado = true;
        bs[q.a].className = "op certa";
        if (idx === q.a) { porNivel[q.n]++; } else { b.className = "op errada"; }
        var nx = botao("btn", ti + 1 >= TESTE.length ? "Ver resultado" : "Seguinte", function () { ti++; testeNivel(); });
        nx.style.marginTop = "10px";
        app.appendChild(nx); nx.focus();
      });
      app.appendChild(b);
    })(i);
  }
}

/* PROGRESSO */
function meuProgresso() {
  limpa(app);
  if (livros.length === 0) { app.appendChild(el("p", "nota", "A carregar...")); return; }
  var feitas = 0, totalL = 0, i, n, k;
  var porN = { B2: [0, 0], C1: [0, 0], C2: [0, 0] };
  for (i = 0; i < livros.length; i++) {
    var ns = niveisDe(livros[i]);
    for (k = 0; k < ns.length; k++) {
      totalL++; if (porN[ns[k]]) { porN[ns[k]][1]++; }
      var p = prog[livros[i].id + "|" + ns[k]];
      if (p && p.f === true) { feitas++; if (porN[ns[k]]) { porN[ns[k]][0]++; } }
    }
  }
  var t = ler("teste", null);
  if (t) {
    var rc = typeof t === "string" ? t : t.rec;
    var c0 = el("div", "card");
    c0.appendChild(el("p", "nota", "Recommended starting level (teste de nível)"));
    c0.appendChild(el("span", "badge", rc));
    app.appendChild(c0);
  }
  app.appendChild(el("h3", "", "Progresso total"));
  app.appendChild(el("p", "", "Lições concluídas: " + feitas + " de " + totalL));
  app.appendChild(barra(totalL ? Math.round(feitas * 100 / totalL) : 0));
  app.appendChild(el("h3", "", "Progresso por nível"));
  for (n = 0; n < NIVEIS.length; n++) {
    var pn = porN[NIVEIS[n]];
    app.appendChild(el("p", "nota", NIVEIS[n] + ": " + pn[0] + " de " + pn[1] + " concluídas"));
    app.appendChild(barra(pn[1] ? Math.round(pn[0] * 100 / pn[1]) : 0));
  }
  var ult = ler("ultima", null);
  var lvU = ult ? achar(ult.id) : null;
  if (lvU) {
    var cu = el("div", "card continuar");
    cu.appendChild(el("p", "nota", "Última lição aberta"));
    cu.appendChild(el("p", "pq", lvU.title + " (" + ult.nivel + ")"));
    cu.appendChild(botao("btn", "Continuar", function () {
      nivel = ult.nivel; guardar("nivel", nivel); desenharNiveis(); irPara("leituras"); abrirLeitura(lvU);
    }));
    app.appendChild(cu);
  }
  app.appendChild(el("h3", "", "Por livro"));
  for (i = 0; i < livros.length; i++) {
    var c = el("div", "card");
    c.appendChild(el("h3", "", livros[i].title));
    var nl = niveisDe(livros[i]);
    for (n = 0; n < nl.length; n++) {
      var pr = prog[livros[i].id + "|" + nl[n]];
      var txt = pr ? (pr.f ? "concluída" : "em curso") + ", " + pr.c + " de " + pr.t + " certas" : "por fazer";
      c.appendChild(el("p", "nota", nl[n] + ": " + txt));
    }
    app.appendChild(c);
  }
  app.appendChild(el("p", "nota", "O progresso fica guardado neste navegador e neste aparelho. Nada é enviado para servidores."));
}

/* ARRANQUE */
function carregarIndice() {
  fetch("lessons/index.json").then(function (r) {
    if (!r.ok) { throw new Error("http " + r.status); }
    return r.json();
  }).then(function (j) {
    livros = j; refrescar();
  }).catch(function () { mostrarErro(ERRO_INDICE, carregarIndice); });
}
desenharNiveis();
atual = listaLivros;
atual();
carregarIndice();
})();
