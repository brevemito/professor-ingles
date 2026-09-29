# Professor de Inglês | Brevemito

Aplicação web gratuita para aprender inglês através da leitura de grandes obras da humanidade. Começa no nível B2 do QECR e avança para C1 e C2.
publicado: https://brevemito.github.io/professor-ingles/
Não tem contas, pagamentos, chaves API nem servidor. Usa apenas HTML, CSS, JavaScript e JSON, e guarda o progresso no próprio navegador (`localStorage`). Nesta versão não há voz nem inteligência artificial.

## Estrutura

```
professor-ingles/
├── index.html
├── style.css
├── app.js
├── README.md
└── lessons/
    ├── index.json
    ├── republica.json
    ├── odisseia.json
    ├── iliada.json
    └── alcorao.json
```

O código procura os conteúdos em `lessons/index.json` e em `lessons/[ficheiro].json`. Os cinco ficheiros JSON têm de estar dentro da pasta `lessons`, nunca na raiz.

## Níveis

Existem só três níveis formais: **B2, C1 e C2**. Não existem níveis fictícios para além do C2. Se no futuro for preciso mais dificuldade, será através de categorias como Advanced Reading, Academic Reading ou Classical Texts.

A diferença entre níveis não está só no tamanho dos textos:

- **B2:** compreensão literal, vocabulário contextual, informação, inferência simples, paráfrase.
- **C1:** significado implícito, relações causais, intenção, estrutura argumentativa, contraste, escolha lexical.
- **C2:** ambiguidade, conotação, pressuposição, registo, estrutura retórica, ironia, síntese e interpretação.

## Como funciona

Cada lição tem: `text`, `glossary`, `questions`, `discussion` e `writing`.

Cada nível tem **5 perguntas**, sempre por esta ordem: literal comprehension, vocabulary in context, inference, meaning / structure, interpretation / critical reading. Em cada pergunta há opções, resposta certa (`answer`, índice a começar em 0) e explicação (`why`).

O **teste de nível** tem 30 perguntas (10 B2, 10 C1, 10 C2). O resultado é apresentado como *Recommended starting level*, uma sugestão baseada no desempenho nessas perguntas. **Não é uma certificação oficial do QECR.** O resultado fica guardado localmente.

O **progresso** mostra lições concluídas, progresso total, progresso por nível, nível recomendado e a última lição aberta.

## Livros

1. **A República**, Platão (alegoria da caverna)
2. **A Odisseia**, Homero (Ulisses e o Ciclope)
3. **A Ilíada**, Homero (a ira de Aquiles)
4. **O Alcorão** (obra integral de referência)

Os textos de A República, A Odisseia e A Ilíada são **adaptações originais** escritas para este projecto, graduadas por nível. Não são citações das obras.

## O Alcorão e a sua fonte

O texto inglês do Alcorão **não é uma adaptação**. É a tradução integral fornecida em PDF, reproduzida sem reescrever, resumir ou simplificar:

- **Título da edição:** Quran English Translation: Clear, Pure, Easy to Read Modern English
- **Tradutor:** Talal Itani
- **Editora:** ClearQuran (Dallas, Beirut)
- **Edição:** Edition A (usa a palavra "Allah"; a Edition B usa "God")
- **Site:** www.ClearQuran.com
- **Ficheiro:** `quran-english-translation-clearquran-edition-allah.pdf` (254 páginas)
- **Ano de edição:** o texto do PDF não o indica, por isso não é indicado aqui.

O ficheiro `lessons/alcorao.json` tem as **114 suratas e 6236 versículos**, numerados como na edição, com este formato: `source` (dados bibliográficos), `surahs` (`number`, `name`, `translit`, `verses` com `number` e `text`) e `levels` (material pedagógico). A aplicação permite escolher surata, versículo inicial e versículo final.

O texto-fonte e o material pedagógico estão **sempre separados**: SOURCE TEXT, LANGUAGE NOTES, COMPREHENSION, DISCUSSION e WRITING. B2, C1 e C2 diferem nas notas, perguntas e actividades sobre excertos da Surata 12 (Yusuf/José); o texto nunca é simplificado.

Na conversão do PDF para JSON só se separaram colunas e versículos e se reconstituíram palavras hifenizadas no fim das linhas. Confirmou-se que o número de versículos de cada uma das 114 suratas coincide com o esperado e que todas as palavras do PDF estão no JSON.

### Direitos de autor e licença (ler antes de publicar)

A página de direitos do PDF indica que a tradução é fornecida sob **Creative Commons Attribution, NonCommercial, NoDerivs (CC BY-NC-ND)**. Isto significa:

- **Attribution:** o tradutor e a edição têm de ser identificados (a aplicação faz isso na página do Alcorão e no rodapé).
- **NonCommercial:** não pode haver uso comercial. **Antes de publicar, confirma se o Brevemito.com tem publicidade, patrocínios ou outra monetização na página onde o iframe for colocado.** Se tiver, contacta o tradutor (o email está no PDF, `talal@ClearQuran.com`) ou reduz o texto publicado.
- **NoDerivs:** o texto não pode ser alterado. Por isso não se mexeu nas palavras, e o material pedagógico está separado. Divisão em suratas e versículos é apenas organização; se quiseres ter a certeza jurídica, pergunta ao tradutor.

Este README não é aconselhamento jurídico. Como a publicação num repositório público e num site pode ter implicações, a verificação final é tua.

## Publicar no GitHub Pages (passo a passo)

1. Entra em github.com e cria o repositório **público** `professor-ingles` (New repository).
2. Clica em *uploading an existing file* e envia `index.html`, `style.css`, `app.js` e `README.md`.
3. Envia também a pasta `lessons` com os 5 ficheiros lá dentro e confirma que aparecem como `lessons/index.json`, `lessons/republica.json` e assim por diante. Faz Commit changes.
4. Abre **Settings** do repositório.
5. Abre **Pages**.
6. Em Source escolhe **Deploy from a branch**.
7. Em Branch escolhe **main**.
8. Em pasta escolhe **/ (root)**.
9. Clica em **Save**.
10. Aguarda 1 a 2 minutos e actualiza a página.
11. Abre o endereço que aparece, no formato `https://UTILIZADOR.github.io/professor-ingles/`.
12. **Testa todas as leituras**: os 4 livros, em B2, C1 e C2, mais o teste de nível e o separador de progresso.
13. Só depois de tudo funcionar, coloca o iframe no WordPress.

Nota: se abrires o `index.html` directamente no computador (duplo clique), as leituras podem não carregar porque o navegador bloqueia a leitura dos ficheiros JSON. Usa sempre o endereço do GitHub Pages.

## Colocar no Brevemito.com

Numa página do WordPress, adiciona um bloco **HTML Personalizado** e cola este código, trocando `UTILIZADOR` pelo teu nome de utilizador do GitHub (ainda não é conhecido, por isso ficou por preencher):

```html
<iframe
  src="https://UTILIZADOR.github.io/professor-ingles/"
  title="Professor de Inglês"
  loading="lazy"
  style="width:100%;height:1000px;border:0;"
></iframe>
```

A aplicação continua alojada no GitHub Pages; o Brevemito só mostra o iframe.

## Como acrescentar um livro

1. Em `lessons`, cria um ficheiro novo copiando a estrutura de `iliada.json`.
2. Preenche título, autor, `intro` e os três níveis (`text`, `glossary`, `questions`, `discussion`, `writing`), com 5 perguntas por nível.
3. Acrescenta uma entrada em `lessons/index.json` (`id`, `file`, `title`, `author`, `category`, `period`, `description`, `levels`).
4. Cuidado com as aspas dentro do texto (usa aspas simples) e com as vírgulas entre itens.

## Limitações actuais

- Sem voz e sem inteligência artificial: o exercício de escrita não é corrigido automaticamente.
- O teste de nível é curto e indicativo; não é um exame nem uma certificação.
- As lições dos três clássicos são adaptações curtas, não os textos originais.
- O ficheiro do Alcorão tem cerca de 900 KB e demora alguns segundos a abrir em ligações lentas.
- O progresso fica só no navegador e no aparelho usados; limpar os dados do navegador apaga-o.

## Funcionalidades futuras possíveis

Mais excertos e obras, categorias de leitura avançada (Advanced Reading, Academic Reading, Classical Texts), pesquisa no Alcorão, exportação do progresso e, mais tarde, voz e correcção assistida, se vierem a ser gratuitas e compatíveis com o GitHub Pages.
