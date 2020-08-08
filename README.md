# win-slidescreen

Winnetou SlideScreen é um plugin WinnetouJs feito para adicionar o efeito de transição de tela em um aplicativo.

Por ser um plugin winnetou, sua utilização é muito facilitada.

## Instalação

Na pasta raiz do seu projeto (onde se encontra o wbr)

```
npm i win-slidescreen
```

O caminho relativo será

```
./node_modules/win-slidescreen/src/
```

## Imports

O slidescreen possui 3 arquivos: slideScreen.html (que contém os constructos necessários), slideScreen.js (plugin a ser importado para o nosso entry point) e slideScreen.scss (estilos a ser importado para o nosso entry point sass).

### slideScreen.html

Os constructos dos plugins winnetou são automaticamente compilados pelo wbr. Não é necessário nenhum tipo de configuração. Basta rodar

```
node wbr
```

e os constructos do slidescreen já estarão disponíveis para uso.

### slideScreen.js

Para usar, faça o import dos métodos screenScroll e slideScreen:

```javascript
import {
  screenScroll,
  slideScreen,
} from "../node_modules/win-slidescreen/src/slideScreen.js";
```

### slideScreen.scss

No seu entry point sass, faça o import da seguinte maneira:

```css
@import "../node_modules/win-slidescreen/src/slideScreen.scss";
```

Após, compile o projeto com node wbr.

## Utilização

O slideScreen é composto por um constructo pai chamado "slideScreen" e por constructos filhos chamados "screen". Dentro do constructo pai se pode colocar quantas screens se quiser. Após isso deve-se chamar a função inicializadora slideScreen() e para se alterar entre telas a função screenScroll().

Use junto com o Winnetou.navigate() ou pass() para obter o voltar com botão físico.

## Exemplo de uso

main.js

```javascript
// supondo que seu código esteja na pasta ./js
// importação do winnetou
import { Winnetou, Constructos, Strings } from "../winnetou.js";

// importação do slidescreen
import {
  screenScroll,
  slideScreen,
} from "../node_modules/win-slidescreen/src/slideScreen.js";

// importante para testar antes de compilar com o wbr
//@ts-ignore
window.Winnetou = Winnetou;

/**
 * Cria o container do slidescreen e
 * adiciona ao app
 */
let ss = Constructos.slideScreen();
Winnetou.create(ss.code, "#app");

// Cria as telas
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

// estilização opcional para ver o efeito melhor
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
