# winnetou_slidescreen

Winnetou SlideScreen é um plugin WinnetouJs feito para adicionar o efeito de transição de tela em um aplicativo.

Por ser um plugin winnetou, sua utilização é muito facilitada. 

## Instalação

Para instalar, faça o clone do repositório e coloque o arquivo slideScreen.html na sua pasta de constructos e o arquivo slideScreen.js na sua pasta de origem js.

O slideScreen usa o winnetou.js como dependêcia, então tenha cuidado de colocar apenas a um diretório abaixo.

## Utilização

O slideScreen é composto por um constructo pai chamado slideScreen e por constructos filhos chamados screen. Dentro do constructo pai se pode colocar quantas screens se quiser. Após isso deve-se chamar a função inicializadora slideScreen() e para se alterar entre telas a função screenScroll().

Use junto com o Winnetou.navigate() ou pass() para obter o voltar com botão físico.

## Exemplo de uso

main.js
```javascript
// importação do WinnetouJs
import { Winnetou, Constructos, Strings } from "../winnetou.js";
// importação do plugin
import { screenScroll, slideScreen } from "./slideScreen.js";

// criação do constructo pai
let ss = Constructos.slideScreen();
Winnetou.create(ss.code, "#app");

// criação das telas 
let tela1 = Constructos.screen();
let tela2 = Constructos.screen();
Winnetou.create(tela1.code + tela2.code, ss.ids.slideScreen);

// Inicialização slideScreen
slideScreen(ss.ids.slideScreen, "#app");

// criação de conteúdo das telas
let bt = Constructos.btSimples({
  text: "Sou a tela 1",
  action: `Winnetou.navigate('/pagina2')`,
});
Winnetou.create(bt.code, tela1.ids.screen);
let bt2 = Constructos.btSimples({
  text: "Sou a tela 2",
  action: `Winnetou.navigate('/')`,
});
Winnetou.create(bt2.code, tela2.ids.screen);

// estilização opicional para ver o efeito melhor
Winnetou.select(tela1.ids.screen).css("backgroundColor", "red");

// Winnetou Routes
Winnetou.createRoutes({
  "/": () => {
    screenScroll(tela1.ids.screen);
  },
  "/pagina2": () => {
    screenScroll(tela2.ids.screen);
  },
});



```

